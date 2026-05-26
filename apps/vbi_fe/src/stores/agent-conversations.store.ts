import { create } from 'zustand'
import {
  listAgentConversations,
  mapAgentConversationMetadata,
  setupPiAgentIndexedDBStorage,
  sortAgentConversations,
  type AgentConversationMetadata,
  type AgentConversationStatus,
  type AgentConversationSummary,
} from '../views/agent/agent-storage'

type AgentConversationsState = {
  activeConversationId: string
  conversations: AgentConversationSummary[]
  handledNewConversationRequestSeq: number
  isInitialized: boolean
  isLoading: boolean
  newConversationRequestSeq: number
  initialize(): Promise<AgentConversationSummary[]>
  markNewConversationRequestHandled(seq: number): void
  refresh(): Promise<AgentConversationSummary[]>
  requestNewConversation(): void
  selectConversation(id: string): void
  setConversationStatus(id: string, status: AgentConversationStatus): void
  upsertConversation(metadata: AgentConversationMetadata, status: AgentConversationStatus): void
}

const mergeConversation = (
  conversations: AgentConversationSummary[],
  metadata: AgentConversationMetadata,
  status: AgentConversationStatus,
) =>
  sortAgentConversations([
    mapAgentConversationMetadata(metadata, status),
    ...conversations.filter((conversation) => conversation.id !== metadata.id),
  ])

const withPreservedStatuses = (conversations: AgentConversationSummary[], current: AgentConversationSummary[]) => {
  const statuses = new Map(current.map((conversation) => [conversation.id, conversation.status]))
  return conversations.map((conversation) => ({
    ...conversation,
    status: statuses.get(conversation.id) ?? conversation.status,
  }))
}

export const useAgentConversationsStore = create<AgentConversationsState>((set, get) => ({
  activeConversationId: '',
  conversations: [],
  handledNewConversationRequestSeq: 0,
  isInitialized: false,
  isLoading: false,
  newConversationRequestSeq: 0,
  initialize: async () => {
    const state = get()
    if (state.isInitialized) return state.conversations
    if (state.isLoading) return state.conversations

    set({ isLoading: true })
    try {
      const storage = await setupPiAgentIndexedDBStorage()
      const conversations = withPreservedStatuses(await listAgentConversations(storage), get().conversations)
      set({ conversations, isInitialized: true, isLoading: false })
      return conversations
    } catch (error) {
      set({ isLoading: false })
      throw error
    }
  },
  markNewConversationRequestHandled: (seq) => {
    set((state) => ({
      handledNewConversationRequestSeq: Math.max(state.handledNewConversationRequestSeq, seq),
    }))
  },
  refresh: async () => {
    const storage = await setupPiAgentIndexedDBStorage()
    const conversations = withPreservedStatuses(await listAgentConversations(storage), get().conversations)
    set({ conversations, isInitialized: true })
    return conversations
  },
  requestNewConversation: () => {
    set((state) => ({
      newConversationRequestSeq: state.newConversationRequestSeq + 1,
    }))
  },
  selectConversation: (id) => {
    set({ activeConversationId: id })
  },
  setConversationStatus: (id, status) => {
    set((state) => ({
      conversations: state.conversations.map((conversation) =>
        conversation.id === id ? { ...conversation, status } : conversation,
      ),
    }))
  },
  upsertConversation: (metadata, status) => {
    set((state) => ({
      conversations: mergeConversation(state.conversations, metadata, status),
    }))
  },
}))
