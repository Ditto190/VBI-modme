import {
  setupVbiAgentIndexedDBStorage,
  type AgentConversationMetadata,
  type AgentConversationStatus,
  type VbiAgentStorage,
} from './agent-storage'

export type AgentConversationSummary = AgentConversationMetadata & {
  status: AgentConversationStatus
}

export type AgentConversationsState = {
  activeConversationId: string
  conversations: AgentConversationSummary[]
  handledNewConversationRequestSeq: number
  isInitialized: boolean
  isLoading: boolean
  newConversationRequestSeq: number
  clearActiveConversation(): void
  deleteConversation(id: string): Promise<void>
  initialize(): Promise<AgentConversationSummary[]>
  markNewConversationRequestHandled(seq: number): void
  renameConversation(id: string, title: string): Promise<void>
  refresh(): Promise<AgentConversationSummary[]>
  requestNewConversation(): void
  selectConversation(id: string): void
  setConversationStatus(id: string, status: AgentConversationStatus): void
  upsertConversation(metadata: AgentConversationMetadata, status: AgentConversationStatus): void
}

const listeners = new Set<(state: AgentConversationsState, previous: AgentConversationsState) => void>()

const sortAgentConversations = <T extends Pick<AgentConversationMetadata, 'lastModified'>>(items: T[]) =>
  [...items].sort((left, right) => right.lastModified.localeCompare(left.lastModified))

const listAgentConversations = async (storage: VbiAgentStorage) =>
  sortAgentConversations(
    (await storage.conversations.getAllMetadata()).map((metadata) => ({ ...metadata, status: 'completed' as const })),
  )

const mergeConversation = (
  conversations: AgentConversationSummary[],
  metadata: AgentConversationMetadata,
  status: AgentConversationStatus,
) =>
  sortAgentConversations([
    { ...metadata, status },
    ...conversations.filter((conversation) => conversation.id !== metadata.id),
  ])

const withPreservedStatuses = (conversations: AgentConversationSummary[], current: AgentConversationSummary[]) => {
  const statuses = new Map(current.map((conversation) => [conversation.id, conversation.status]))
  return conversations.map((conversation) => ({
    ...conversation,
    status: statuses.get(conversation.id) ?? conversation.status,
  }))
}

const emit = (previous: AgentConversationsState) => {
  listeners.forEach((listener) => listener(state, previous))
}

const setState = (
  partial:
    | Partial<AgentConversationsState>
    | AgentConversationsState
    | ((state: AgentConversationsState) => Partial<AgentConversationsState> | AgentConversationsState),
) => {
  const patch = typeof partial === 'function' ? partial(state) : partial
  if (Object.keys(patch).length === 0) return
  const previous = state
  state = {
    ...state,
    ...patch,
  }
  emit(previous)
}

let state: AgentConversationsState = {
  activeConversationId: '',
  conversations: [],
  handledNewConversationRequestSeq: 0,
  isInitialized: false,
  isLoading: false,
  newConversationRequestSeq: 0,
  clearActiveConversation: () => {
    setState((current) => (current.activeConversationId ? { activeConversationId: '' } : {}))
  },
  deleteConversation: async (id) => {
    const storage = await setupVbiAgentIndexedDBStorage()
    await storage.conversations.delete(id)
    setState((current) => {
      const conversations = current.conversations.filter((conversation) => conversation.id !== id)

      return {
        activeConversationId:
          current.activeConversationId === id ? (conversations[0]?.id ?? '') : current.activeConversationId,
        conversations,
      }
    })
  },
  initialize: async () => {
    if (state.isInitialized || state.isLoading) return state.conversations

    setState({ isLoading: true })
    try {
      const storage = await setupVbiAgentIndexedDBStorage()
      const conversations = withPreservedStatuses(await listAgentConversations(storage), state.conversations)
      setState({ conversations, isInitialized: true, isLoading: false })
      return conversations
    } catch (error) {
      setState({ isLoading: false })
      throw error
    }
  },
  markNewConversationRequestHandled: (seq) => {
    setState((current) => ({
      handledNewConversationRequestSeq: Math.max(current.handledNewConversationRequestSeq, seq),
    }))
  },
  refresh: async () => {
    const storage = await setupVbiAgentIndexedDBStorage()
    const conversations = withPreservedStatuses(await listAgentConversations(storage), state.conversations)
    setState({ conversations, isInitialized: true })
    return conversations
  },
  renameConversation: async (id, title) => {
    const nextTitle = title.trim()
    if (!nextTitle) return

    const storage = await setupVbiAgentIndexedDBStorage()
    const metadata = await storage.conversations.rename(id, nextTitle)
    if (!metadata) return

    setState((current) => ({
      conversations: sortAgentConversations(
        current.conversations.map((conversation) =>
          conversation.id === id
            ? {
                ...conversation,
                ...metadata,
                status: conversation.status,
              }
            : conversation,
        ),
      ),
    }))
  },
  requestNewConversation: () => {
    setState((current) => ({
      newConversationRequestSeq: current.newConversationRequestSeq + 1,
    }))
  },
  selectConversation: (id) => {
    setState((current) => (current.activeConversationId === id ? {} : { activeConversationId: id }))
  },
  setConversationStatus: (id, status) => {
    setState((current) => ({
      conversations: current.conversations.map((conversation) =>
        conversation.id === id ? { ...conversation, status } : conversation,
      ),
    }))
  },
  upsertConversation: (metadata, status) => {
    setState((current) => ({
      conversations: mergeConversation(current.conversations, metadata, status),
    }))
  },
}

export const getAgentConversationsState = () => state

export const setAgentConversationsState = setState

export const subscribeAgentConversations = (
  listener: (state: AgentConversationsState, previous: AgentConversationsState) => void,
) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
