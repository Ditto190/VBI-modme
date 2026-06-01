/* 'use client' keeps Pi Agent's browser runtime out of the Next server graph. */
'use client'

import { convertToLlm, type AgentMessage, type AgentOptions } from '@earendil-works/pi-agent-core'
import { createVBIProviderAgentKit } from '@visactor/headless-bi-provider'
import type { VBIAgent as BrowserVBIAgent } from '@visactor/vbi-agent'
import {
  saveAgentConversation,
  setupVbiAgentIndexedDBStorage,
  type AgentConversationMetadata,
  type AgentConversationStatus,
  type VbiAgentStorage,
} from './agent-storage'
import { formatAgentContextUsage, resolveAgentContextUsage } from './agent-usage-display'
import {
  createAgentModel,
  readAgentBackendConfig,
  resolveAgentModel,
  resolveAgentModelId,
  resolveAgentThinkingLevel,
  type AgentBackendConfig,
  type AgentModelId,
  type AgentThinkingLevel,
} from './agent-model-config'
import { streamProxy } from './agent-stream-proxy'

export type AgentConversationRuntimeSnapshot = {
  errorMessage?: string
  isRunning: boolean
  messages: AgentMessage[]
  modelId: AgentModelId
  thinkingLevel: AgentThinkingLevel
  usageText: string
}

type BrowserVBIAgentConstructor = new (
  options: AgentOptions,
  workspace: ReturnType<typeof createVBIProviderAgentKit>['workspace'],
) => BrowserVBIAgent

type VBIAgentModule = {
  VBIAgent: BrowserVBIAgentConstructor
}

export const loadVBIAgentModule = async (): Promise<VBIAgentModule> => import('@visactor/vbi-agent')

export type AgentConversationRuntime = {
  cancel(): Promise<void>
  conversationId: string
  destroy(): void
  getSnapshot(): AgentConversationRuntimeSnapshot
  persist(options?: { touch?: boolean }): Promise<AgentConversationMetadata>
  send(input: string): Promise<void>
  setModel(modelId: AgentModelId): Promise<void>
  setThinkingLevel(thinkingLevel: AgentThinkingLevel): Promise<void>
  setTitle(title: string): void
  subscribe(listener: (snapshot: AgentConversationRuntimeSnapshot) => void): () => void
}

export type AgentConversationRuntimeUpdate = {
  id: string
  metadata?: AgentConversationMetadata
  status: AgentConversationStatus
}

type CreateAgentConversationRuntimeOptions = {
  conversationId?: string
  fallbackTitle?: string
  modelId?: AgentModelId
  onConversationChange?: (update: AgentConversationRuntimeUpdate) => void
  agentConfig?: AgentBackendConfig
  storage?: VbiAgentStorage
  thinkingLevel?: AgentThinkingLevel
}

const defaultProviderApiBaseUrl = '/api/v1'

const getRuntimeMessages = (agent: BrowserVBIAgent): AgentMessage[] => [
  ...agent.state.messages,
  ...(agent.state.streamingMessage ? [agent.state.streamingMessage] : []),
]

export const createAgentConversationRuntime = async ({
  conversationId = crypto.randomUUID(),
  fallbackTitle = 'New Conversation',
  agentConfig,
  modelId,
  onConversationChange,
  storage,
  thinkingLevel,
}: CreateAgentConversationRuntimeOptions = {}): Promise<AgentConversationRuntime> => {
  const vbiStorage = storage ?? (await setupVbiAgentIndexedDBStorage())
  const loadedSession = await vbiStorage.conversations.get(conversationId)

  const { VBIAgent } = await loadVBIAgentModule()
  const publicConfig = agentConfig ?? (await readAgentBackendConfig())
  const modelInput = {
    provider: process.env.NEXT_PUBLIC_AGENT_PROVIDER?.trim() || publicConfig.provider,
    model: resolveAgentModelId(modelId ?? process.env.NEXT_PUBLIC_AGENT_MODEL ?? publicConfig.model, publicConfig),
  }
  const model = resolveAgentModel(loadedSession?.model, modelInput, publicConfig)
  const initialThinkingLevel = resolveAgentThinkingLevel(loadedSession?.thinkingLevel ?? thinkingLevel)

  const providerKit = createVBIProviderAgentKit({
    baseUrl: process.env.NEXT_PUBLIC_VBI_API_BASE_URL?.trim() || defaultProviderApiBaseUrl,
  })
  const agent = new VBIAgent(
    {
      initialState: {
        model,
        ...(loadedSession
          ? {
              messages: loadedSession.messages,
              thinkingLevel: initialThinkingLevel,
            }
          : { thinkingLevel: initialThinkingLevel }),
      },
      convertToLlm,
      sessionId: conversationId,
      streamFn: streamProxy,
    },
    providerKit.workspace,
  )
  const createdAt = loadedSession?.createdAt ?? new Date().toISOString()
  let lastModified = loadedSession?.lastModified ?? createdAt
  let hasStoredConversation = loadedSession !== null
  let conversationTitle = loadedSession?.messages.length ? loadedSession.title : undefined
  const listeners = new Set<(snapshot: AgentConversationRuntimeSnapshot) => void>()
  let emitFrame: number | null = null
  let emitTimeout: ReturnType<typeof setTimeout> | null = null
  const getSnapshot = (): AgentConversationRuntimeSnapshot => ({
    errorMessage: agent.state.errorMessage,
    isRunning: agent.state.isStreaming,
    messages: getRuntimeMessages(agent),
    modelId: resolveAgentModelId(agent.state.model.id, publicConfig),
    thinkingLevel: resolveAgentThinkingLevel(agent.state.thinkingLevel),
    usageText: formatAgentContextUsage(
      resolveAgentContextUsage({
        messages: agent.state.messages,
        model: agent.state.model,
      }),
    ),
  })
  const clearScheduledEmit = () => {
    if (emitFrame !== null && typeof cancelAnimationFrame === 'function') {
      cancelAnimationFrame(emitFrame)
    }
    if (emitTimeout !== null) {
      clearTimeout(emitTimeout)
    }
    emitFrame = null
    emitTimeout = null
  }
  const emitNow = () => {
    clearScheduledEmit()
    const snapshot = getSnapshot()
    listeners.forEach((listener) => listener(snapshot))
  }
  const scheduleEmit = () => {
    if (emitFrame !== null || emitTimeout !== null) return
    if (typeof requestAnimationFrame === 'function') {
      emitFrame = requestAnimationFrame(() => {
        emitFrame = null
        emitNow()
      })
      return
    }
    emitTimeout = setTimeout(() => {
      emitTimeout = null
      emitNow()
    }, 16)
  }
  const persist = async ({ touch = true }: { touch?: boolean } = {}) => {
    const metadata = await saveAgentConversation(vbiStorage, {
      createdAt,
      fallbackTitle,
      id: conversationId,
      lastModified: touch ? undefined : lastModified,
      state: agent.state,
      title: conversationTitle,
    })
    lastModified = metadata.lastModified
    hasStoredConversation = true
    return metadata
  }
  const notify = (status: AgentConversationStatus, metadata?: AgentConversationMetadata) => {
    onConversationChange?.({ id: conversationId, metadata, status })
  }
  let isDestroying = false
  let finishRunPromise: Promise<void> | null = null
  const finishRun = async () => {
    if (finishRunPromise) return finishRunPromise

    finishRunPromise = (async () => {
      emitNow()
      await agent.waitForIdle()
      emitNow()
      if (!isDestroying) {
        notify('completed', await persist())
      }
    })()

    try {
      await finishRunPromise
    } finally {
      finishRunPromise = null
    }
  }
  const unsubscribeAgent = agent.subscribe((event: { type: string }) => {
    if (isDestroying) return

    if (event.type === 'agent_start') {
      notify('running')
    }

    if (event.type === 'agent_end') {
      void finishRun()
      return
    }

    scheduleEmit()
  })

  return {
    cancel: async () => {
      if (!agent.state.isStreaming) return
      agent.abort()
      await finishRun()
    },
    conversationId,
    getSnapshot,
    persist,
    send: async (input: string) => {
      const prompt = input.trim()
      if (!prompt) return
      if (agent.state.isStreaming) {
        throw new Error('Agent is already processing a prompt')
      }

      notify('running')
      if (!hasStoredConversation) {
        notify('running', await persist())
      }
      emitNow()
      await agent.prompt(prompt)
    },
    setModel: async (nextModelId: AgentModelId) => {
      if (agent.state.isStreaming) return
      const resolvedModelId = resolveAgentModelId(nextModelId, publicConfig)
      agent.state.model = createAgentModel(
        {
          provider: agent.state.model.provider || modelInput.provider,
          model: resolvedModelId,
        },
        publicConfig,
      )
      agent.state.thinkingLevel = resolveAgentThinkingLevel(agent.state.thinkingLevel)
      emitNow()
      if (hasStoredConversation) {
        notify('completed', await persist({ touch: false }))
      }
    },
    setThinkingLevel: async (nextThinkingLevel: AgentThinkingLevel) => {
      if (agent.state.isStreaming) return
      agent.state.thinkingLevel = resolveAgentThinkingLevel(nextThinkingLevel)
      emitNow()
      if (hasStoredConversation) {
        notify('completed', await persist({ touch: false }))
      }
    },
    setTitle: (title: string) => {
      conversationTitle = title.trim() || undefined
    },
    subscribe: (listener) => {
      listeners.add(listener)
      listener(getSnapshot())
      return () => listeners.delete(listener)
    },
    destroy: () => {
      isDestroying = true
      clearScheduledEmit()
      listeners.clear()
      unsubscribeAgent()
      agent.abort()
    },
  }
}
