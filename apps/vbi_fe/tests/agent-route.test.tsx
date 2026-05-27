import { afterEach, describe, expect, rs, test } from '@rstest/core'
import { cleanup, render, screen } from '@testing-library/react'

rs.mock('next/dynamic', () => ({
  default: () => () => <div data-testid='agent-page' />,
}))

rs.mock('../src/views/agent/AgentConversationSidebarSection', () => ({
  AgentConversationSidebarSection: () => <div data-testid='agent-conversation-sidebar' />,
}))

const { default: AgentLayout } = await import('../src/app/agent/layout')
const { default: AgentDraftPage } = await import('../src/app/agent/page')
const { default: AgentConversationPage } = await import('../src/app/agent/[conversationId]/page')
const { useAppPreferencesStore } = await import('../src/stores/app-preferences.store')
const { useNavigationStore } = await import('../src/stores/navigation.store')

describe('agent app routes', () => {
  afterEach(() => {
    cleanup()
  })

  test('keeps the agent runtime in the segment layout across conversation routes', () => {
    useAppPreferencesStore.setState({ locale: 'en-US', themeMode: 'slate' })
    useNavigationStore.setState({ navigate: null, pathname: '/agent' })

    const { rerender } = render(
      <AgentLayout>
        <div data-testid='route-child' />
      </AgentLayout>,
    )

    expect(screen.getByTestId('agent-page')).toBeInTheDocument()
    expect(screen.getByTestId('agent-conversation-sidebar')).toBeInTheDocument()
    expect(screen.queryByTestId('route-child')).not.toBeInTheDocument()

    useNavigationStore.setState({ pathname: '/agent/conversation-1' })
    rerender(<AgentLayout />)

    expect(screen.getByTestId('agent-page')).toBeInTheDocument()
  })

  test('keeps leaf pages empty so navigation does not remount the agent runtime', () => {
    const { container: draftContainer } = render(<AgentDraftPage />)
    expect(draftContainer).toBeEmptyDOMElement()

    cleanup()
    const { container: conversationContainer } = render(<AgentConversationPage />)
    expect(conversationContainer).toBeEmptyDOMElement()
  })
})
