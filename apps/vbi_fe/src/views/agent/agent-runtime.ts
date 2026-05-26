/* 'use client' keeps Pi Web UI's browser-only modules out of the Next server graph. */
'use client'

import type { AgentOptions, VBIAgent } from '@visactor/vbi-agent'
import { createAgentProviderKit } from './agent-provider-kit'
import {
  loadAgentConversation,
  saveAgentConversation,
  setupPiAgentIndexedDBStorage,
  type AgentConversationMetadata,
  type AgentConversationSession,
  type AgentConversationStatus,
  type PiAgentStorage,
} from './agent-storage'
import {
  resolveAgentModel,
  resolveAgentModelInput,
  resolveAgentProxyUrl,
  type AgentModelInput,
} from './agent-model-config'
import { streamProxy } from './agent-stream-proxy'
import { attachAgentUsageDisplay } from './agent-usage-display'

export type AgentChatPanelRuntime = {
  agent: VBIAgent
  conversationId: string
  destroy(): void
  persist(): Promise<AgentConversationMetadata>
  panel: HTMLElement
}

export type AgentConversationRuntimeUpdate = {
  id: string
  metadata?: AgentConversationMetadata
  status: AgentConversationStatus
}

type CreateAgentChatPanelOptions = {
  conversationId?: string
  fallbackTitle?: string
  onConversationChange?: (update: AgentConversationRuntimeUpdate) => void
  session?: AgentConversationSession | null
  storage?: PiAgentStorage
}

type AgentPanelElement = HTMLElement & {
  agentInterface?: { requestUpdate?: () => void }
  requestUpdate?: () => void
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

export const createAgentChatPanel = async ({
  conversationId = crypto.randomUUID(),
  fallbackTitle = 'New Conversation',
  onConversationChange,
  session = null,
  storage,
}: CreateAgentChatPanelOptions = {}): Promise<AgentChatPanelRuntime> => {
  const piStorage = storage ?? (await setupPiAgentIndexedDBStorage())
  const loadedSession = session ?? (await loadAgentConversation(piStorage, conversationId))

  const [{ ChatPanel }, { VBIAgent }] = await Promise.all([
    import('../../../node_modules/@earendil-works/pi-web-ui/dist/ChatPanel.js'),
    import('../../../node_modules/@visactor/vbi-agent/dist/index.js'),
  ])

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
  const baseTools = agent.state.tools
  const panel = new ChatPanel()
  panel.classList.add('vbi-pi-chat-panel')
  const panelRefreshTarget = panel as AgentPanelElement
  let usageDisplay: ReturnType<typeof attachAgentUsageDisplay> | null = null
  const createdAt = loadedSession?.createdAt ?? new Date().toISOString()
  const persist = async () =>
    saveAgentConversation(piStorage, {
      createdAt,
      fallbackTitle,
      id: conversationId,
      state: agent.state,
      title: loadedSession?.messages.length ? loadedSession.title : undefined,
    })
  const notify = (status: AgentConversationStatus, metadata?: AgentConversationMetadata) => {
    onConversationChange?.({ id: conversationId, metadata, status })
  }
  const refreshPanel = () => {
    agent.state.messages = [...agent.state.messages]
    panelRefreshTarget.requestUpdate?.()
    panelRefreshTarget.agentInterface?.requestUpdate?.()
    usageDisplay?.refresh()
  }
  const unsubscribeMessageRefresh = agent.subscribe(async (event) => {
    if (event.type === 'agent_start') notify('running')
    if (event.type === 'message_end') refreshPanel()
    if (event.type === 'agent_end') {
      void agent.waitForIdle().then(async () => {
        refreshPanel()
        notify('completed', await persist())
      })
    }
  })

  await panel.setAgent(agent, {
    onBeforeSend: async () => notify('running'),
    onApiKeyRequired: async () => true,
    toolsFactory: () => baseTools,
  })
  usageDisplay = attachAgentUsageDisplay(panel, () => agent.state)

  return {
    agent,
    conversationId,
    panel,
    persist,
    destroy: () => {
      usageDisplay?.disconnect()
      unsubscribeMessageRefresh()
      agent.abort()
      panel.remove()
    },
  }
}
