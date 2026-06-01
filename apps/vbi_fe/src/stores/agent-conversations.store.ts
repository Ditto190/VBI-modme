import { create } from 'zustand'
import {
  setupVbiAgentIndexedDBStorage,
  type AgentConversationMetadata,
  type AgentConversationStatus,
  type VbiAgentStorage,
} from '../views/agent/agent-storage'

export type AgentConversationSummary = AgentConversationMetadata & {
  status: AgentConversationStatus
}

type AgentConversationsState = {
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

export const useAgentConversationsStore = create<AgentConversationsState>((set, get) => ({
  activeConversationId: '',
  conversations: [],
  handledNewConversationRequestSeq: 0,
  isInitialized: false,
  isLoading: false,
  newConversationRequestSeq: 0,
  clearActiveConversation: () => {
    set((state) => (state.activeConversationId ? { activeConversationId: '' } : state))
  },
  deleteConversation: async (id) => {
    const storage = await setupVbiAgentIndexedDBStorage()
    await storage.conversations.delete(id)
    set((state) => {
      const conversations = state.conversations.filter((conversation) => conversation.id !== id)

      return {
        activeConversationId:
          state.activeConversationId === id ? (conversations[0]?.id ?? '') : state.activeConversationId,
        conversations,
      }
    })
  },
  initialize: async () => {
    const state = get()
    if (state.isInitialized) return state.conversations
    if (state.isLoading) return state.conversations

    set({ isLoading: true })
    try {
      const storage = await setupVbiAgentIndexedDBStorage()
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
    const storage = await setupVbiAgentIndexedDBStorage()
    const conversations = withPreservedStatuses(await listAgentConversations(storage), get().conversations)
    set({ conversations, isInitialized: true })
    return conversations
  },
  renameConversation: async (id, title) => {
    const nextTitle = title.trim()
    if (!nextTitle) return

    const storage = await setupVbiAgentIndexedDBStorage()
    const metadata = await storage.conversations.rename(id, nextTitle)
    if (!metadata) return

    set((state) => ({
      conversations: sortAgentConversations(
        state.conversations.map((conversation) =>
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
    set((state) => ({
      newConversationRequestSeq: state.newConversationRequestSeq + 1,
    }))
  },
  selectConversation: (id) => {
    set((state) => (state.activeConversationId === id ? state : { activeConversationId: id }))
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
