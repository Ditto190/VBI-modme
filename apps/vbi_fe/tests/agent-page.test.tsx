import { afterEach, beforeEach, describe, expect, rs, test } from '@rstest/core'
import { act, cleanup, render, waitFor } from '@testing-library/react'

type ConversationMetadata = {
  createdAt: string
  id: string
  lastModified: string
  messageCount: number
  preview: string
  thinkingLevel: 'off'
  title: string
  usage: {
    cacheRead: number
    cacheWrite: number
    cost: { cacheRead: number; cacheWrite: number; input: number; output: number; total: number }
    input: number
    output: number
    totalTokens: number
  }
}

type Runtime = {
  agent: { state: { isStreaming: boolean } }
  conversationId: string
  destroy: ReturnType<typeof rs.fn>
  panel: HTMLElement
  persist: ReturnType<typeof rs.fn>
}

const emptyUsage = {
  cacheRead: 0,
  cacheWrite: 0,
  cost: { cacheRead: 0, cacheWrite: 0, input: 0, output: 0, total: 0 },
  input: 0,
  output: 0,
  totalTokens: 0,
}

let metadataList: ConversationMetadata[] = []

const createMetadata = (id: string, lastModified: string): ConversationMetadata => ({
  id,
  title: `Conversation ${id}`,
  createdAt: '2026-05-26T01:00:00.000Z',
  lastModified,
  messageCount: 1,
  preview: `Preview ${id}`,
  thinkingLevel: 'off',
  usage: emptyUsage,
})

const createDeferred = <T,>() => {
  let resolve!: (value: T) => void
  const promise = new Promise<T>((next) => {
    resolve = next
  })
  return { promise, resolve }
}

const sortAgentConversations = <T extends { lastModified: string }>(items: T[]) =>
  [...items].sort((left, right) => right.lastModified.localeCompare(left.lastModified))

const mapAgentConversationMetadata = (metadata: ConversationMetadata, status = 'completed') => ({
  ...metadata,
  status,
})

const setupPiAgentIndexedDBStorage = rs.fn(async () => ({
  backend: {},
  sessions: {
    getAllMetadata: rs.fn(async () => metadataList),
  },
}))

const createAgentConversationId = rs.fn(() => 'conversation-new')
const listAgentConversations = rs.fn(
  async (storage: { sessions: { getAllMetadata(): Promise<ConversationMetadata[]> } }) =>
    sortAgentConversations((await storage.sessions.getAllMetadata()).map((item) => mapAgentConversationMetadata(item))),
)

const pendingRuntimes = new Map<string, ReturnType<typeof createDeferred<Runtime>>>()
const createRuntime = (conversationId: string): Runtime => {
  const panel = document.createElement('div')
  panel.textContent = `panel:${conversationId}`

  return {
    agent: { state: { isStreaming: false } },
    conversationId,
    destroy: rs.fn(),
    panel,
    persist: rs.fn(async () => createMetadata(conversationId, '2026-05-26T01:05:00.000Z')),
  }
}

const createAgentChatPanel = rs.fn(({ conversationId }: { conversationId: string }) => {
  const deferred = createDeferred<Runtime>()
  pendingRuntimes.set(conversationId, deferred)
  return deferred.promise
})

rs.mock('../src/views/agent/agent-storage', () => ({
  createAgentConversationId,
  listAgentConversations,
  mapAgentConversationMetadata,
  setupPiAgentIndexedDBStorage,
  sortAgentConversations,
}))

rs.mock('../src/views/agent/agent-runtime', () => ({
  createAgentChatPanel,
}))

const { useAppPreferencesStore } = await import('../src/stores/app-preferences.store')
const { useAgentConversationsStore } = await import('../src/stores/agent-conversations.store')
const { AgentPage } = await import('../src/views/AgentPage')

describe('AgentPage', () => {
  beforeEach(() => {
    rs.clearAllMocks()
    pendingRuntimes.clear()
    metadataList = [
      createMetadata('conversation-a', '2026-05-26T01:00:00.000Z'),
      createMetadata('conversation-b', '2026-05-26T01:01:00.000Z'),
    ]
    useAppPreferencesStore.setState({ locale: 'en-US', themeMode: 'slate' })
    useAgentConversationsStore.setState({
      activeConversationId: '',
      conversations: [],
      handledNewConversationRequestSeq: 0,
      isInitialized: false,
      isLoading: false,
      newConversationRequestSeq: 0,
    })
  })

  afterEach(() => {
    cleanup()
  })

  test('keeps the latest selected conversation visible when an older activation resolves later', async () => {
    render(<AgentPage />)

    await waitFor(() =>
      expect(createAgentChatPanel).toHaveBeenCalledWith(expect.objectContaining({ conversationId: 'conversation-b' })),
    )

    await act(async () => {
      useAgentConversationsStore.getState().selectConversation('conversation-a')
    })

    await waitFor(() =>
      expect(createAgentChatPanel).toHaveBeenCalledWith(expect.objectContaining({ conversationId: 'conversation-a' })),
    )

    await act(async () => {
      pendingRuntimes.get('conversation-a')?.resolve(createRuntime('conversation-a'))
    })
    await waitFor(() =>
      expect(document.querySelector('.vbi-agent-panel-host')?.textContent).toBe('panel:conversation-a'),
    )

    await act(async () => {
      pendingRuntimes.get('conversation-b')?.resolve(createRuntime('conversation-b'))
    })

    await waitFor(() =>
      expect(document.querySelector('.vbi-agent-panel-host')?.textContent).toBe('panel:conversation-a'),
    )
    expect(useAgentConversationsStore.getState().activeConversationId).toBe('conversation-a')
  })
})
