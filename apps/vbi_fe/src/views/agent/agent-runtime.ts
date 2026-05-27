/* 'use client' keeps Pi Agent's browser runtime out of the Next server graph. */
'use client'

import type { AgentMessage } from '@earendil-works/pi-agent-core'
import type { AgentOptions, VBIAgent } from '@visactor/vbi-agent'
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
  resolveAgentModel,
  resolveAgentModelInput,
  resolveAgentProxyUrl,
  type AgentModelInput,
} from './agent-model-config'
import { streamProxy } from './agent-stream-proxy'

export type AgentConversationRuntimeSnapshot = {
  errorMessage?: string
  isRunning: boolean
  messages: AgentMessage[]
}

export type AgentConversationRuntime = {
  agent: VBIAgent
  conversationId: string
  destroy(): void
  getSnapshot(): AgentConversationRuntimeSnapshot
  persist(options?: AgentConversationPersistOptions): Promise<AgentConversationMetadata>
  send(input: string): Promise<void>
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
  onConversationChange?: (update: AgentConversationRuntimeUpdate) => void
  session?: AgentConversationSession | null
  storage?: VbiAgentStorage
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

const getRuntimeMessages = (agent: VBIAgent): AgentMessage[] => [
  ...agent.state.messages,
  ...(agent.state.streamingMessage ? [agent.state.streamingMessage] : []),
]

export const createAgentConversationRuntime = async ({
  conversationId = crypto.randomUUID(),
  fallbackTitle = 'New Conversation',
  onConversationChange,
  session = null,
  storage,
}: CreateAgentConversationRuntimeOptions = {}): Promise<AgentConversationRuntime> => {
  const vbiStorage = storage ?? (await setupVbiAgentIndexedDBStorage())
  const loadedSession = session ?? (await loadAgentConversation(vbiStorage, conversationId))

  const { VBIAgent } = await import('../../../node_modules/@visactor/vbi-agent/dist/index.js')
  const publicConfig = await readPublicAgentConfig()
  const modelInput = resolveAgentModelInput({
    provider: process.env.NEXT_PUBLIC_AGENT_PROVIDER ?? publicConfig.provider,
    model: process.env.NEXT_PUBLIC_AGENT_MODEL ?? publicConfig.model,
  })
  const model = resolveAgentModel(loadedSession?.model, modelInput)

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
              thinkingLevel: loadedSession.thinkingLevel,
            }
          : {}),
        tools: providerKit.tools,
      },
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
    if (event.type === 'agent_start') notify('running')
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
