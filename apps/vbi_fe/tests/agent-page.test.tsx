import { afterEach, beforeEach, describe, expect, rs, test } from '@rstest/core'
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'

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

type RuntimeSnapshot = {
  isRunning: boolean
  messages: unknown[]
}

type Runtime = {
  agent: {
    state: { isStreaming: boolean; messages: unknown[]; model: { contextWindow: number } }
    abort: ReturnType<typeof rs.fn>
  }
  conversationId: string
  destroy: ReturnType<typeof rs.fn>
  getSnapshot: ReturnType<typeof rs.fn>
  persist: ReturnType<typeof rs.fn>
  send: ReturnType<typeof rs.fn>
  setTitle: ReturnType<typeof rs.fn>
  subscribe: ReturnType<typeof rs.fn>
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
let persistCounter = 5

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

const setupVbiAgentIndexedDBStorage = rs.fn(async () => ({
  conversations: {
    getAllMetadata: rs.fn(async () => metadataList),
  },
}))

const createAgentConversationId = rs.fn(() => 'conversation-new')
const readAgentContentText = (content: unknown) => {
  if (typeof content === 'string') return content
  if (!Array.isArray(content)) return ''
  return content
    .map((part) => (typeof part === 'object' && part && 'text' in part ? String(part.text) : ''))
    .filter(Boolean)
    .join(' ')
}
const listAgentConversations = rs.fn(
  async (storage: { conversations: { getAllMetadata(): Promise<ConversationMetadata[]> } }) =>
    sortAgentConversations(
      (await storage.conversations.getAllMetadata()).map((item) => mapAgentConversationMetadata(item)),
    ),
)

const pendingRuntimes = new Map<string, ReturnType<typeof createDeferred<Runtime>>>()
const createRuntime = (
  conversationId: string,
  options: { isRunning?: boolean; messages?: unknown[] } = {},
): Runtime => {
  const snapshot: RuntimeSnapshot = {
    isRunning: options.isRunning ?? false,
    messages: options.messages ?? [
      {
        role: 'user',
        content: [{ type: 'text', text: `panel:${conversationId}` }],
        timestamp: 1,
      },
    ],
  }

  return {
    agent: {
      state: { isStreaming: false, messages: [], model: { contextWindow: 1000 } },
      abort: rs.fn(),
    },
    conversationId,
    destroy: rs.fn(),
    getSnapshot: rs.fn(() => snapshot),
    persist: rs.fn(async (options?: { touch?: boolean }) => {
      const lastModified =
        options?.touch === false
          ? conversationId === 'conversation-b'
            ? '2026-05-26T01:01:00.000Z'
            : '2026-05-26T01:00:00.000Z'
          : `2026-05-26T01:${String(persistCounter++).padStart(2, '0')}:00.000Z`
      return createMetadata(conversationId, lastModified)
    }),
    send: rs.fn(),
    setTitle: rs.fn(),
    subscribe: rs.fn((listener: (value: RuntimeSnapshot) => void) => {
      listener(snapshot)
      return rs.fn()
    }),
  }
}

const createAgentConversationRuntime = rs.fn(({ conversationId }: { conversationId: string }) => {
  const deferred = createDeferred<Runtime>()
  pendingRuntimes.set(conversationId, deferred)
  return deferred.promise
})

rs.mock('../src/views/agent/agent-storage', () => ({
  createAgentConversationId,
  listAgentConversations,
  mapAgentConversationMetadata,
  readAgentContentText,
  setupVbiAgentIndexedDBStorage,
  sortAgentConversations,
}))

rs.mock('../src/views/agent/agent-runtime', () => ({
  createAgentConversationRuntime,
}))

const { useAppPreferencesStore } = await import('../src/stores/app-preferences.store')
const { useAgentConversationsStore } = await import('../src/stores/agent-conversations.store')
const { useNavigationStore } = await import('../src/stores/navigation.store')
const { AgentPage } = await import('../src/views/AgentPage')

describe('AgentPage', () => {
  beforeEach(() => {
    rs.clearAllMocks()
    Object.defineProperty(globalThis, 'ResizeObserver', {
      configurable: true,
      value: class ResizeObserver {
        disconnect() {}
        observe() {}
        unobserve() {}
      },
    })
    Element.prototype.scrollTo = rs.fn()
    pendingRuntimes.clear()
    persistCounter = 5
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
    useNavigationStore.setState({
      navigate: null,
      pathname: '/agent/conversation-b',
    })
  })

  afterEach(() => {
    cleanup()
  })

  test('keeps the latest selected conversation visible when an older activation resolves later', async () => {
    render(<AgentPage />)

    await waitFor(() =>
      expect(createAgentConversationRuntime).toHaveBeenCalledWith(
        expect.objectContaining({ conversationId: 'conversation-b' }),
      ),
    )

    await act(async () => {
      useNavigationStore.setState({ pathname: '/agent/conversation-a' })
    })

    await waitFor(() =>
      expect(createAgentConversationRuntime).toHaveBeenCalledWith(
        expect.objectContaining({ conversationId: 'conversation-a' }),
      ),
    )

    await act(async () => {
      pendingRuntimes.get('conversation-a')?.resolve(createRuntime('conversation-a'))
    })
    await waitFor(() => expect(screen.getByText('panel:conversation-a')).toBeTruthy())

    await act(async () => {
      pendingRuntimes.get('conversation-b')?.resolve(createRuntime('conversation-b'))
    })

    await waitFor(() => expect(screen.getByText('panel:conversation-a')).toBeTruthy())
    expect(screen.queryByText('panel:conversation-b')).toBeNull()
    expect(useAgentConversationsStore.getState().activeConversationId).toBe('conversation-a')
  })

  test('shows a centered welcome composer when no conversation has content yet', async () => {
    metadataList = []
    useNavigationStore.setState({ pathname: '/agent' })

    render(<AgentPage />)

    expect(await screen.findByRole('heading', { name: /what should we do/i })).toBeInTheDocument()
    expect(screen.queryByText(/chart and insight resources/i)).not.toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /agent/i })).toHaveAttribute('rows', '2')
    expect(screen.getByPlaceholderText(/attach an image/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /attach image/i })).toBeInTheDocument()
  })

  test('keeps the new conversation route as a draft until the first message is sent', async () => {
    metadataList = []
    const navigatedTo: string[] = []
    useNavigationStore.setState({ pathname: '/agent' })
    useNavigationStore.getState().setNavigate((path) => {
      navigatedTo.push(path)
      useNavigationStore.setState({ pathname: path })
    })

    render(<AgentPage />)

    expect(await screen.findByRole('heading', { name: /what should we do/i })).toBeInTheDocument()
    expect(createAgentConversationRuntime).not.toHaveBeenCalled()

    fireEvent.change(screen.getByRole('textbox', { name: /agent/i }), {
      target: { value: '当前洞察资源列表' },
    })
    fireEvent.click(screen.getByRole('button', { name: /^send$/i }))

    await waitFor(() =>
      expect(createAgentConversationRuntime).toHaveBeenCalledWith(
        expect.objectContaining({
          conversationId: 'conversation-new',
          fallbackTitle: '当前洞察资源列表',
        }),
      ),
    )
    expect(screen.queryByText('Connecting agent...')).not.toBeInTheDocument()

    const runtime = createRuntime('conversation-new', { messages: [] })
    await act(async () => {
      pendingRuntimes.get('conversation-new')?.resolve(runtime)
    })

    await waitFor(() => expect(runtime.send).toHaveBeenCalledWith('当前洞察资源列表'))
    expect(navigatedTo).toEqual(['/agent/conversation-new'])
    expect(useAgentConversationsStore.getState().activeConversationId).toBe('conversation-new')
  })

  test('uses one composer action slot for sending and stopping', async () => {
    metadataList = [createMetadata('conversation-running', '2026-05-26T01:00:00.000Z')]
    useNavigationStore.setState({ pathname: '/agent/conversation-running' })

    render(<AgentPage />)

    await waitFor(() =>
      expect(createAgentConversationRuntime).toHaveBeenCalledWith(
        expect.objectContaining({ conversationId: 'conversation-running' }),
      ),
    )
    await act(async () => {
      pendingRuntimes.get('conversation-running')?.resolve(createRuntime('conversation-running', { isRunning: true }))
    })

    await waitFor(() => expect(screen.getByRole('button', { name: /^stop$/i })).toBeInTheDocument())
    expect(screen.queryByRole('button', { name: /^send$/i })).not.toBeInTheDocument()
  })

  test('renders very large user messages as compact previews', async () => {
    metadataList = [createMetadata('conversation-large', '2026-05-26T01:00:00.000Z')]
    useNavigationStore.setState({ pathname: '/agent/conversation-large' })
    const largeText = `${'a'.repeat(25_000)} tail-marker`

    render(<AgentPage />)

    await waitFor(() =>
      expect(createAgentConversationRuntime).toHaveBeenCalledWith(
        expect.objectContaining({ conversationId: 'conversation-large' }),
      ),
    )
    await act(async () => {
      pendingRuntimes.get('conversation-large')?.resolve(
        createRuntime('conversation-large', {
          messages: [{ role: 'user', content: [{ type: 'text', text: largeText }], timestamp: 1 }],
        }),
      )
    })

    expect(await screen.findByText(/25K chars/)).toBeInTheDocument()
    expect(screen.queryByText(/tail-marker/)).not.toBeInTheDocument()
  })

  test('shows user message copy and sent time only on hover', async () => {
    metadataList = [createMetadata('conversation-user-actions', '2026-05-26T01:00:00.000Z')]
    useNavigationStore.setState({ pathname: '/agent/conversation-user-actions' })

    render(<AgentPage />)

    await waitFor(() =>
      expect(createAgentConversationRuntime).toHaveBeenCalledWith(
        expect.objectContaining({ conversationId: 'conversation-user-actions' }),
      ),
    )
    await act(async () => {
      pendingRuntimes.get('conversation-user-actions')?.resolve(createRuntime('conversation-user-actions'))
    })

    const userMessage = await screen.findByText('panel:conversation-user-actions')
    const messageRoot = userMessage.closest('.vbi-agent-message')
    expect(messageRoot).toBeTruthy()
    expect(messageRoot?.querySelector('.vbi-agent-message-action-slot')).toBeTruthy()
    expect(screen.queryByRole('button', { name: /copy message/i })).not.toBeInTheDocument()

    fireEvent.mouseEnter(messageRoot!)

    expect(await screen.findByRole('button', { name: /copy message/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/sent at \d{2}:\d{2}/i)).toBeInTheDocument()
  })

  test('groups resource tool calls and keeps technical tool result logs out of the transcript', async () => {
    metadataList = [createMetadata('conversation-tools', '2026-05-26T01:00:00.000Z')]
    useNavigationStore.setState({ pathname: '/agent/conversation-tools' })
    const resourceToolMessages = [
      {
        role: 'user',
        content: [{ type: 'text', text: '当前有多少数据资源?' }],
        timestamp: 0,
      },
      {
        role: 'assistant',
        content: [
          { type: 'text', text: '我来查看一下当前的数据资源数量。' },
          {
            type: 'toolCall',
            id: 'tool-chart',
            name: 'vbi_resource',
            arguments: { action: 'list', resource: 'chart' },
          },
          {
            type: 'toolCall',
            id: 'tool-insight',
            name: 'vbi_resource',
            arguments: { action: 'list', resource: 'insight' },
          },
          {
            type: 'toolCall',
            id: 'tool-report',
            name: 'vbi_resource',
            arguments: { action: 'list', resource: 'report' },
          },
        ],
        timestamp: 10_000,
      },
      {
        role: 'toolResult',
        toolCallId: 'tool-chart',
        toolName: 'vbi_resource',
        content: [{ type: 'text', text: '{"items":[{"name":"我的折线图"}]}' }],
        details: {
          display: '{"items":[{"name":"我的折线图"}]}',
          summary: 'vbi_resource chart.list completed',
        },
        timestamp: 40_000,
      },
      {
        role: 'toolResult',
        toolCallId: 'tool-insight',
        toolName: 'vbi_resource',
        content: [{ type: 'text', text: '{"items":[{"name":"关于公式"}]}' }],
        details: {
          display: '{"items":[{"name":"关于公式"}]}',
          summary: 'vbi_resource insight.list completed',
        },
        timestamp: 70_000,
      },
      {
        role: 'toolResult',
        toolCallId: 'tool-report',
        toolName: 'vbi_resource',
        content: [{ type: 'text', text: '{"items":[]}' }],
        details: {
          display: '{"items":[]}',
          summary: 'vbi_resource report.list completed',
        },
        timestamp: 100_000,
      },
      {
        role: 'assistant',
        content: [
          {
            type: 'text',
            text: '当前共有 **2 个数据资源**：\n\n类型\t名称\t创建时间\n图表\t我的折线图\t2026-05-26\n洞察\t关于公式\t2026-05-26\n\n没有报告资源。',
          },
        ],
        timestamp: 120_000,
      },
    ]

    render(<AgentPage />)

    await waitFor(() =>
      expect(createAgentConversationRuntime).toHaveBeenCalledWith(
        expect.objectContaining({ conversationId: 'conversation-tools' }),
      ),
    )
    await act(async () => {
      pendingRuntimes
        .get('conversation-tools')
        ?.resolve(createRuntime('conversation-tools', { messages: resourceToolMessages }))
    })

    expect(await screen.findByText('3 tool calls')).toBeInTheDocument()
    expect(screen.getByText('chart.list')).toBeInTheDocument()
    expect(screen.getByText('insight.list')).toBeInTheDocument()
    expect(screen.getByText('report.list')).toBeInTheDocument()
    expect(screen.queryByText('vbi_resource chart.list completed')).not.toBeInTheDocument()
    expect(screen.queryByText('vbi_resource insight.list completed')).not.toBeInTheDocument()
    expect(screen.queryByText('vbi_resource report.list completed')).not.toBeInTheDocument()
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: '类型' })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /copy response/i })).toHaveLength(1)
    expect(screen.getByLabelText(/completed at \d{2}:\d{2}/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /message timing/i })).toHaveTextContent('120.00s')

    const earlierAssistantMessage = screen.getByText('我来查看一下当前的数据资源数量。').closest('.vbi-agent-message')
    expect(earlierAssistantMessage).toBeTruthy()
    expect(earlierAssistantMessage?.querySelector('.vbi-agent-message-action-slot')).toBeTruthy()

    fireEvent.mouseEnter(earlierAssistantMessage!)

    expect(await screen.findByText('10.00s')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /copy response/i })).toHaveLength(2)
  })

  test('does not reorder conversations just because the user switches between them', async () => {
    render(<AgentPage />)

    await waitFor(() =>
      expect(createAgentConversationRuntime).toHaveBeenCalledWith(
        expect.objectContaining({ conversationId: 'conversation-b' }),
      ),
    )
    await act(async () => {
      pendingRuntimes.get('conversation-b')?.resolve(createRuntime('conversation-b'))
    })
    await waitFor(() => expect(screen.getByText('panel:conversation-b')).toBeTruthy())

    await act(async () => {
      useNavigationStore.setState({ pathname: '/agent/conversation-a' })
    })
    await waitFor(() =>
      expect(createAgentConversationRuntime).toHaveBeenCalledWith(
        expect.objectContaining({ conversationId: 'conversation-a' }),
      ),
    )
    await act(async () => {
      pendingRuntimes.get('conversation-a')?.resolve(createRuntime('conversation-a'))
    })
    await waitFor(() => expect(screen.getByText('panel:conversation-a')).toBeTruthy())

    await act(async () => {
      useNavigationStore.setState({ pathname: '/agent/conversation-b' })
    })
    await waitFor(() => expect(screen.getByText('panel:conversation-b')).toBeTruthy())

    expect(pendingRuntimes.get('conversation-a')).toBeDefined()
    expect(createAgentConversationRuntime).toHaveBeenCalledWith(
      expect.objectContaining({ conversationId: 'conversation-a' }),
    )

    expect(useAgentConversationsStore.getState().conversations.map((conversation) => conversation.id)).toEqual([
      'conversation-b',
      'conversation-a',
    ])
  })
})
