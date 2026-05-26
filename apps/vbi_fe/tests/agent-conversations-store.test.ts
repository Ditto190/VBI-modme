import { beforeEach, describe, expect, test } from '@rstest/core'
import { useAgentConversationsStore } from '../src/stores/agent-conversations.store'

const metadata = {
  id: 'conversation-1',
  title: 'Revenue follow-up',
  createdAt: '2026-05-26T01:00:00.000Z',
  lastModified: '2026-05-26T01:02:00.000Z',
  messageCount: 2,
  preview: 'Continue the revenue analysis',
  thinkingLevel: 'off' as const,
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

    expect(useAgentConversationsStore.getState().activeConversationId).toBe('conversation-1')
    expect(useAgentConversationsStore.getState().newConversationRequestSeq).toBe(1)
    expect(useAgentConversationsStore.getState().conversations).toMatchObject([
      {
        id: 'conversation-1',
        status: 'completed',
        title: 'Revenue follow-up',
      },
    ])
  })
})
