import { beforeEach, describe, expect, test } from '@rstest/core'
import { fireEvent, render, screen } from '@testing-library/react'
import { ManageLayoutPage } from '../src/views/ManageLayoutPage'
import { useAgentConversationsStore } from '../src/stores/agent-conversations.store'
import { useAppPreferencesStore } from '../src/stores/app-preferences.store'
import { useNavigationStore } from '../src/stores/navigation.store'

describe('manage layout navigation', () => {
  beforeEach(() => {
    useAppPreferencesStore.setState({ locale: 'en-US', themeMode: 'slate' })
    useAgentConversationsStore.setState({
      activeConversationId: '',
      conversations: [],
      handledNewConversationRequestSeq: 0,
      isInitialized: true,
      isLoading: false,
      newConversationRequestSeq: 0,
    })
    useNavigationStore.setState({
      navigate: null,
      pathname: '/manage/agent',
    })
  })

  test('places conversations in the sidebar and removes the agent nav route', () => {
    const navigatedTo: string[] = []
    useNavigationStore.getState().setNavigate((path) => navigatedTo.push(path))
    useAgentConversationsStore.getState().upsertConversation(
      {
        id: 'conversation-1',
        title: 'Revenue follow-up',
        createdAt: '2026-05-26T01:00:00.000Z',
        lastModified: '2026-05-26T01:02:00.000Z',
        messageCount: 4,
        preview: 'Continue the revenue analysis',
        thinkingLevel: 'off',
        usage: {
          cacheRead: 0,
          cacheWrite: 0,
          cost: { cacheRead: 0, cacheWrite: 0, input: 0, output: 0, total: 0 },
          input: 0,
          output: 0,
          totalTokens: 0,
        },
      },
      'completed',
    )

    render(
      <ManageLayoutPage>
        <div>Workspace</div>
      </ManageLayoutPage>,
    )

    const newConversation = screen.getByRole('button', { name: /new conversation/i })
    const resources = screen.getByRole('button', { name: /resources/i })
    const conversation = screen.getByRole('button', { name: /revenue follow-up/i })

    expect(newConversation.compareDocumentPosition(resources) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(resources.compareDocumentPosition(conversation) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(screen.queryByRole('button', { name: 'Agent' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Reports' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Charts' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Insights' })).not.toBeInTheDocument()

    fireEvent.click(resources)
    expect(screen.getByRole('button', { name: 'Reports' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Charts' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Insights' })).toBeInTheDocument()

    fireEvent.click(conversation)
    expect(navigatedTo).toEqual(['/manage/agent'])
    expect(useAgentConversationsStore.getState().activeConversationId).toBe('conversation-1')

    fireEvent.click(newConversation)
    expect(navigatedTo).toEqual(['/manage/agent', '/manage/agent'])
    expect(useAgentConversationsStore.getState().newConversationRequestSeq).toBe(1)
  })
})
