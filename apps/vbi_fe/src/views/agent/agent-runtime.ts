/* 'use client' keeps Pi Agent's browser runtime out of the Next server graph. */
'use client'

import { convertToLlm, type AgentMessage, type AgentOptions, type AgentState } from '@earendil-works/pi-agent-core'
import { createAgentProviderKit } from './agent-provider-kit'
import {
  loadAgentConversation,
  saveAgentConversation,
  setupVbiAgentIndexedDBStorage,
  type AgentConversationMetadata,
  type AgentConversationSession,
  type AgentConversationStatus,
  type VbiAgentStorage,
} from './agent-storage'
import {
  createAgentModel,
  defaultAgentThinkingLevel,
  resolveAgentModel,
  resolveAgentModelId,
  resolveAgentModelInput,
  resolveAgentProxyUrl,
  resolveAgentThinkingLevel,
  type AgentModelId,
  type AgentModelInput,
  type AgentThinkingLevel,
} from './agent-model-config'
import { streamProxy } from './agent-stream-proxy'

export type AgentConversationRuntimeSnapshot = {
  errorMessage?: string
  isRunning: boolean
  messages: AgentMessage[]
  modelId: AgentModelId
  thinkingLevel: AgentThinkingLevel
}

type BrowserVBIAgent = {
  abort(): void
  prompt(input: string): Promise<void>
  state: Omit<AgentState, 'tools'> & {
    errorMessage?: string
    isStreaming: boolean
    streamingMessage?: AgentMessage
    tools: unknown[]
  }
  subscribe(listener: (event: { type: string }) => void): () => void
  waitForIdle(): Promise<void>
}

type BrowserVBIAgentConstructor = new (
  options: AgentOptions,
  workspace: ReturnType<typeof createAgentProviderKit>['workspace'],
) => BrowserVBIAgent

type BrowserVBIAgentModule = {
  VBIAgent: BrowserVBIAgentConstructor
}

export type AgentConversationRuntime = {
  agent: BrowserVBIAgent
  conversationId: string
  destroy(): void
  getSnapshot(): AgentConversationRuntimeSnapshot
  persist(options?: AgentConversationPersistOptions): Promise<AgentConversationMetadata>
  send(input: string): Promise<void>
  setModel(modelId: AgentModelId): Promise<void>
  setThinkingLevel(thinkingLevel: AgentThinkingLevel): Promise<void>
  setTitle(title: string): void
  subscribe(listener: (snapshot: AgentConversationRuntimeSnapshot) => void): () => void
}

export type AgentConversationPersistOptions = {
  touch?: boolean
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
  session?: AgentConversationSession | null
  storage?: VbiAgentStorage
  thinkingLevel?: AgentThinkingLevel
}

const defaultProviderApiBaseUrl = '/api/v1'

const readAgentProxyToken = () => {
  if (typeof window === 'undefined') return ''
  return window.localStorage.getItem('vbi.agent.proxyToken') ?? process.env.NEXT_PUBLIC_AGENT_PROXY_TOKEN ?? ''
}

const readPublicAgentConfig = async (): Promise<AgentModelInput> => {
  try {
    const response = await fetch('/api/v1/agent/config')
    if (!response.ok) return {}
    const payload = (await response.json()) as { data?: AgentModelInput }
    return payload.data ?? {}
  } catch {
    return {}
  }
}

const getRuntimeMessages = (agent: BrowserVBIAgent): AgentMessage[] => [
  ...agent.state.messages,
  ...(agent.state.streamingMessage ? [agent.state.streamingMessage] : []),
]

export const createAgentConversationRuntime = async ({
  conversationId = crypto.randomUUID(),
  fallbackTitle = 'New Conversation',
  modelId,
  onConversationChange,
  session = null,
  storage,
  thinkingLevel,
}: CreateAgentConversationRuntimeOptions = {}): Promise<AgentConversationRuntime> => {
  const vbiStorage = storage ?? (await setupVbiAgentIndexedDBStorage())
  const loadedSession = session ?? (await loadAgentConversation(vbiStorage, conversationId))

  // @ts-ignore The built browser bundle may not have declarations until workspace dependencies are built; importing the source package breaks Next's client graph.
  const { VBIAgent } =
    (await import('../../../node_modules/@visactor/vbi-agent/dist/index.js')) as BrowserVBIAgentModule
  const publicConfig = await readPublicAgentConfig()
  const modelInput = resolveAgentModelInput({
    provider: process.env.NEXT_PUBLIC_AGENT_PROVIDER ?? publicConfig.provider,
    model: modelId ?? process.env.NEXT_PUBLIC_AGENT_MODEL ?? publicConfig.model,
  })
  const model = resolveAgentModel(loadedSession?.model, modelInput)
  const initialThinkingLevel = resolveAgentThinkingLevel(loadedSession?.thinkingLevel ?? thinkingLevel)

  const providerKit = createAgentProviderKit({
    baseUrl: process.env.NEXT_PUBLIC_VBI_API_BASE_URL?.trim() || defaultProviderApiBaseUrl,
  })
  const streamFn: NonNullable<AgentOptions['streamFn']> = (streamModel, context, options) =>
    streamProxy(streamModel, context, {
      ...options,
      authToken: readAgentProxyToken(),
      proxyUrl: resolveAgentProxyUrl(process.env.NEXT_PUBLIC_AGENT_PROXY_URL),
    }) as unknown as ReturnType<NonNullable<AgentOptions['streamFn']>>
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
      streamFn,
    },
    providerKit.workspace,
  )
  const createdAt = loadedSession?.createdAt ?? new Date().toISOString()
  let lastModified = loadedSession?.lastModified ?? createdAt
  let hasStoredConversation = loadedSession !== null
  let conversationTitle = loadedSession?.messages.length ? loadedSession.title : undefined
  const listeners = new Set<(snapshot: AgentConversationRuntimeSnapshot) => void>()
  const getSnapshot = (): AgentConversationRuntimeSnapshot => ({
    errorMessage: agent.state.errorMessage,
    isRunning: agent.state.isStreaming,
    messages: getRuntimeMessages(agent),
    modelId: resolveAgentModelId(agent.state.model.id),
    thinkingLevel: resolveAgentThinkingLevel(agent.state.thinkingLevel),
  })
  const emit = () => {
    const snapshot = getSnapshot()
    listeners.forEach((listener) => listener(snapshot))
  }
  const persist = async ({ touch = true }: AgentConversationPersistOptions = {}) => {
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
  const unsubscribeAgent = agent.subscribe((event) => {
    if (event.type === 'agent_start') {
      notify('running')
    }
    emit()

    if (event.type === 'agent_end') {
      void agent.waitForIdle().then(async () => {
        emit()
        notify('completed', await persist())
      })
    }
  })

  return {
    agent,
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
      emit()
      await agent.prompt(prompt)
    },
    setModel: async (nextModelId: AgentModelId) => {
      if (agent.state.isStreaming) return
      const resolvedModelId = resolveAgentModelId(nextModelId)
      agent.state.model = createAgentModel({
        provider: agent.state.model.provider || modelInput.provider,
        model: resolvedModelId,
      })
      agent.state.thinkingLevel = resolveAgentThinkingLevel(agent.state.thinkingLevel || defaultAgentThinkingLevel)
      emit()
      if (hasStoredConversation) {
        notify('completed', await persist({ touch: false }))
      }
    },
    setThinkingLevel: async (nextThinkingLevel: AgentThinkingLevel) => {
      if (agent.state.isStreaming) return
      agent.state.thinkingLevel = resolveAgentThinkingLevel(nextThinkingLevel)
      emit()
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
      listeners.clear()
      unsubscribeAgent()
      agent.abort()
    },
  }
}
