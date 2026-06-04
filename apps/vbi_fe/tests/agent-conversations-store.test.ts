import { beforeEach, describe, expect, test } from '@rstest/core'
import { useAgentConversationsStore } from './application-test-stores'
import { setVbiAgentIndexedDBFactoryForTests } from '../src/application/agent/agent-storage'

const metadata = {
  id: 'conversation-1',
  title: 'Revenue follow-up',
  createdAt: '2026-05-26T01:00:00.000Z',
  lastModified: '2026-05-26T01:02:00.000Z',
  messageCount: 2,
  preview: 'Continue the revenue analysis',
  thinkingLevel: 'high' as const,
  usage: {
    cacheRead: 0,
    cacheWrite: 0,
    cost: { cacheRead: 0, cacheWrite: 0, input: 0, output: 0, total: 0 },
    input: 0,
    output: 0,
    totalTokens: 0,
  },
}

describe('agent conversations store', () => {
  beforeEach(() => {
    const records = new Map<string, { metadata: typeof metadata; session: { id: string; title: string } }>()
    records.set(metadata.id, {
      metadata,
      session: { id: metadata.id, title: metadata.title },
    })
    setVbiAgentIndexedDBFactoryForTests(async () => ({
      get: async (id) => records.get(id) ?? null,
      getAll: async () => [...records.values()],
      put: async (record) => {
        records.set(record.session.id, record as never)
      },
      delete: async (id) => {
        records.delete(id)
      },
    }))
    useAgentConversationsStore.setState({
      activeConversationId: '',
      conversations: [],
      handledNewConversationRequestSeq: 0,
      isInitialized: false,
      isLoading: false,
      newConversationRequestSeq: 0,
    })
  })

  test('tracks sidebar conversation selection and new conversation requests', () => {
    useAgentConversationsStore.getState().upsertConversation(metadata, 'completed')
    useAgentConversationsStore.getState().selectConversation('conversation-1')
    useAgentConversationsStore.getState().requestNewConversation()
    useAgentConversationsStore.getState().clearActiveConversation()

    expect(useAgentConversationsStore.getState().activeConversationId).toBe('')
    expect(useAgentConversationsStore.getState().newConversationRequestSeq).toBe(1)
    expect(useAgentConversationsStore.getState().conversations).toMatchObject([
      {
        id: 'conversation-1',
        status: 'completed',
        title: 'Revenue follow-up',
      },
    ])
  })

  test('ignores selecting the already active conversation', () => {
    const calls: string[] = []
    const unsubscribe = useAgentConversationsStore.subscribe((state) => {
      calls.push(state.activeConversationId)
    })

    useAgentConversationsStore.getState().selectConversation('conversation-1')
    useAgentConversationsStore.getState().selectConversation('conversation-1')
    unsubscribe()

    expect(calls).toEqual(['conversation-1'])
    expect(useAgentConversationsStore.getState().activeConversationId).toBe('conversation-1')
  })

  test('renames conversations and selects the next item when deleting the active one', async () => {
    const newer = {
      ...metadata,
      id: 'conversation-2',
      title: 'Second conversation',
      lastModified: '2026-05-26T01:03:00.000Z',
    }
    useAgentConversationsStore.getState().upsertConversation(metadata, 'completed')
    useAgentConversationsStore.getState().upsertConversation(newer, 'completed')
    useAgentConversationsStore.getState().selectConversation('conversation-1')

    await useAgentConversationsStore.getState().renameConversation('conversation-1', 'Renamed analysis')

    expect(useAgentConversationsStore.getState().conversations).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: 'conversation-1', title: 'Renamed analysis' })]),
    )

    await useAgentConversationsStore.getState().deleteConversation('conversation-1')

    expect(useAgentConversationsStore.getState().activeConversationId).toBe('conversation-2')
    expect(useAgentConversationsStore.getState().conversations.map((conversation) => conversation.id)).toEqual([
      'conversation-2',
    ])
  })
})
