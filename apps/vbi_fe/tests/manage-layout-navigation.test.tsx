import { afterEach, beforeEach, describe, expect, test } from '@rstest/core'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ManageLayoutPage } from '../src/views/ManageLayoutPage'
import { useAgentConversationsStore } from '../src/stores/agent-conversations.store'
import { useAppPreferencesStore } from '../src/stores/app-preferences.store'
import { useNavigationStore } from '../src/stores/navigation.store'
import { resetVbiAgentStorageForTests, setVbiAgentIndexedDBFactoryForTests } from '../src/views/agent/agent-storage'

const emptyUsage = {
  cacheRead: 0,
  cacheWrite: 0,
  cost: { cacheRead: 0, cacheWrite: 0, input: 0, output: 0, total: 0 },
  input: 0,
  output: 0,
  totalTokens: 0,
}

const conversationMetadata = {
  id: 'conversation-1',
  title: 'Revenue follow-up',
  createdAt: '2026-05-26T01:00:00.000Z',
  lastModified: '2026-05-26T01:02:00.000Z',
  messageCount: 4,
  preview: 'Continue the revenue analysis',
  thinkingLevel: 'off' as const,
  usage: emptyUsage,
}

const seedConversationStorage = () => {
  const records = new Map([
    [
      conversationMetadata.id,
      {
        metadata: conversationMetadata,
        schemaVersion: 1 as const,
        session: {
          id: conversationMetadata.id,
          title: conversationMetadata.title,
          createdAt: conversationMetadata.createdAt,
          lastModified: conversationMetadata.lastModified,
          messages: [],
          model: { id: 'test-model' },
          thinkingLevel: conversationMetadata.thinkingLevel,
        },
      },
    ],
  ])
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
  resetVbiAgentStorageForTests()
}

describe('manage layout navigation', () => {
  beforeEach(() => {
    seedConversationStorage()
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
      pathname: '/agent/conversation-1',
    })
  })

  afterEach(() => {
    cleanup()
  })

  test('places conversations in the sidebar and removes the agent nav route', () => {
    const navigatedTo: string[] = []
    useNavigationStore.getState().setNavigate((path) => navigatedTo.push(path))
    useAgentConversationsStore.getState().upsertConversation(
      {
        ...conversationMetadata,
        lastModified: new Date(Date.now() - 16 * 60 * 1000).toISOString(),
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
    const conversations = screen.getByRole('button', { name: /conversations/i })
    const conversation = screen.getByRole('button', { name: /^Revenue follow-up$/i })

    expect(screen.queryByText('VBI Console')).not.toBeInTheDocument()
    expect(screen.queryByText('Resource Management')).not.toBeInTheDocument()
    expect(newConversation).toHaveAttribute('data-active', 'false')
    expect(resources).toHaveAttribute('aria-expanded', 'false')
    expect(resources).toHaveAttribute('data-active', 'false')
    expect(conversations).toHaveAttribute('data-active', 'false')
    expect(conversation.closest('[data-active]')).toHaveAttribute('data-active', 'true')
    expect(newConversation.compareDocumentPosition(resources) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(resources.compareDocumentPosition(conversations) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(conversations.compareDocumentPosition(conversation) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(screen.queryByRole('button', { name: 'Agent' })).not.toBeInTheDocument()
    expect(screen.queryByText('Continue the revenue analysis')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Reports' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Charts' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Insights' })).not.toBeInTheDocument()
    expect(conversation.querySelector('svg')).toBeNull()
    expect(screen.getByText('16m')).toBeInTheDocument()

    fireEvent.click(resources)
    expect(resources).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('button', { name: 'Reports' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Charts' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Insights' })).toBeInTheDocument()

    fireEvent.click(conversation)
    expect(navigatedTo).toEqual([])
    expect(useAgentConversationsStore.getState().activeConversationId).toBe('conversation-1')

    fireEvent.click(newConversation)
    expect(navigatedTo).toEqual(['/agent'])
    expect(useAgentConversationsStore.getState().activeConversationId).toBe('')
    expect(useAgentConversationsStore.getState().newConversationRequestSeq).toBe(0)
  })

  test('auto-expands resource navigation when landing on a resource list route', () => {
    useNavigationStore.setState({ pathname: '/manage/charts' })

    render(
      <ManageLayoutPage>
        <div>Workspace</div>
      </ManageLayoutPage>,
    )

    expect(screen.getByRole('button', { name: /resources/i })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('button', { name: /resources/i })).toHaveAttribute('data-active', 'false')
    expect(screen.getByRole('button', { name: 'Reports' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Charts' })).toHaveAttribute('data-active', 'true')
    expect(screen.getByRole('button', { name: 'Insights' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /conversations/i })).toHaveAttribute('data-active', 'false')
  })

  test('keeps active styling tied to the current route instead of conversation state', () => {
    useNavigationStore.setState({ pathname: '/manage/reports' })
    useAgentConversationsStore.getState().upsertConversation(conversationMetadata, 'completed')
    useAgentConversationsStore.getState().selectConversation('conversation-1')

    render(
      <ManageLayoutPage>
        <div>Workspace</div>
      </ManageLayoutPage>,
    )

    expect(screen.getByRole('button', { name: /new conversation/i })).toHaveAttribute('data-active', 'false')
    expect(screen.getByRole('button', { name: /resources/i })).toHaveAttribute('data-active', 'false')
    expect(screen.getByRole('button', { name: 'Reports' })).toHaveAttribute('data-active', 'true')
    expect(screen.getByRole('button', { name: /conversations/i })).toHaveAttribute('data-active', 'false')
    expect(screen.getByRole('button', { name: /^Revenue follow-up$/i }).closest('[data-active]')).toHaveAttribute(
      'data-active',
      'false',
    )
  })

  test('marks report navigation active on report detail routes', () => {
    useNavigationStore.setState({ pathname: '/manage/reports/report-1' })

    render(
      <ManageLayoutPage>
        <div>Workspace</div>
      </ManageLayoutPage>,
    )

    expect(screen.getByRole('button', { name: /resources/i })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('button', { name: /resources/i })).toHaveAttribute('data-active', 'false')
    expect(screen.getByRole('button', { name: 'Reports' })).toHaveAttribute('data-active', 'true')
    expect(screen.getByRole('button', { name: 'Charts' })).toHaveAttribute('data-active', 'false')
    expect(screen.getByRole('button', { name: 'Insights' })).toHaveAttribute('data-active', 'false')
  })

  test('marks the new conversation item active on the agent root route', () => {
    useNavigationStore.setState({ pathname: '/agent' })

    render(
      <ManageLayoutPage>
        <div>Workspace</div>
      </ManageLayoutPage>,
    )

    expect(screen.getByRole('button', { name: /new conversation/i })).toHaveAttribute('data-active', 'true')
    expect(screen.getByRole('button', { name: /resources/i })).toHaveAttribute('data-active', 'false')
    expect(screen.getByRole('button', { name: /conversations/i })).toHaveAttribute('data-active', 'false')
  })

  test('toggles sidebar visibility and keeps the active conversation title visible', () => {
    useAgentConversationsStore.getState().upsertConversation(conversationMetadata, 'completed')
    useAgentConversationsStore.getState().selectConversation('conversation-1')

    render(
      <ManageLayoutPage>
        <div>Workspace</div>
      </ManageLayoutPage>,
    )

    expect(screen.getByRole('button', { name: /hide sidebar/i })).toBeInTheDocument()
    expect(screen.getAllByText('Revenue follow-up')).toHaveLength(2)

    fireEvent.click(screen.getByRole('button', { name: /hide sidebar/i }))

    expect(screen.queryByRole('button', { name: /new conversation/i })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /show sidebar/i })).toBeInTheDocument()
    expect(screen.getByText('Revenue follow-up')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /show sidebar/i }))

    expect(screen.getByRole('button', { name: /hide sidebar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /new conversation/i })).toBeInTheDocument()
  })

  test('keeps the running conversation indicator on the row action side', () => {
    useAgentConversationsStore.getState().upsertConversation(conversationMetadata, 'running')

    render(
      <ManageLayoutPage>
        <div>Workspace</div>
      </ManageLayoutPage>,
    )

    const conversation = screen.getByRole('button', { name: /^Revenue follow-up$/i })
    const runningStatus = screen.getByRole('status', { name: /running/i })

    expect(conversation.querySelector('svg')).toBeNull()
    expect(conversation.compareDocumentPosition(runningStatus) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(screen.queryByText(/\d+m|\d+h|\d+d/)).not.toBeInTheDocument()
  })

  test('navigates to the agent page when a conversation is opened from another route', () => {
    const navigatedTo: string[] = []
    useNavigationStore.setState({ pathname: '/manage/reports' })
    useNavigationStore.getState().setNavigate((path) => navigatedTo.push(path))
    useAgentConversationsStore.getState().upsertConversation(conversationMetadata, 'completed')

    render(
      <ManageLayoutPage>
        <div>Workspace</div>
      </ManageLayoutPage>,
    )

    fireEvent.click(screen.getByRole('button', { name: /^Revenue follow-up$/i }))
    expect(navigatedTo).toEqual(['/agent/conversation-1'])
  })

  test('renames conversations in a modal and deletes them from a confirmation popover', async () => {
    useAgentConversationsStore.getState().upsertConversation(conversationMetadata, 'completed')

    render(
      <ManageLayoutPage>
        <div>Workspace</div>
      </ManageLayoutPage>,
    )

    fireEvent.click(screen.getByRole('button', { name: /rename revenue follow-up/i }))
    expect(screen.getByRole('dialog', { name: /rename conversation/i })).toBeInTheDocument()

    const input = screen.getByRole('textbox', { name: /conversation title/i })
    fireEvent.change(input, { target: { value: 'Renamed analysis' } })
    fireEvent.click(screen.getByRole('button', { name: /^save$/i }))

    expect(await screen.findByRole('button', { name: /^Renamed analysis$/i })).toBeInTheDocument()

    const deleteButton = screen.getByRole('button', { name: /delete renamed analysis/i })
    expect(
      screen.getByRole('button', { name: /rename renamed analysis/i }).closest('[data-tooltip-side]'),
    ).toHaveAttribute('data-tooltip-side', 'right')
    expect(deleteButton.closest('[data-tooltip-side]')).toHaveAttribute('data-tooltip-side', 'right')

    fireEvent.click(deleteButton)
    expect(screen.getByText(/delete conversation/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^Renamed analysis$/i })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /^delete$/i }))

    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /^Renamed analysis$/i })).not.toBeInTheDocument()
    })
  })
})
