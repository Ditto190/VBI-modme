import { afterEach, describe, expect, rs, test } from '@rstest/core'
import { cleanup, render, screen } from '@testing-library/react'

const navigationMock = rs.hoisted(() => ({
  pathname: '/agent/conversation-1',
  redirect: rs.fn(),
}))

rs.mock('next/navigation', () => ({
  redirect: navigationMock.redirect,
  usePathname: () => navigationMock.pathname,
}))

rs.mock('next/dynamic', () => ({
  default: () => () => <div data-testid='agent-page' />,
}))

rs.mock('../src/views/agent/AgentConversationSidebarSection', () => ({
  AgentConversationSidebarSection: () => <div data-testid='agent-conversation-sidebar' />,
}))

const { default: AgentLayout } = await import('../src/app/(workspace)/agent/layout')
const { default: AgentDraftPage } = await import('../src/app/(workspace)/agent/page')
const { default: AgentConversationPage } = await import('../src/app/(workspace)/agent/[conversationId]/page')
const { default: LegacyManageAgentPage } = await import('../src/app/(workspace)/manage/agent/page')
const { default: WorkspaceLayout } = await import('../src/app/(workspace)/layout')
const { useAppPreferencesStore } = await import('../src/stores/app-preferences.store')
const { useNavigationStore } = await import('../src/stores/navigation.store')

describe('agent app routes', () => {
  afterEach(() => {
    cleanup()
    navigationMock.redirect.mockReset()
  })

  test('keeps the managed sidebar mounted across agent and manager routes', () => {
    useAppPreferencesStore.setState({ locale: 'en-US', themeMode: 'slate' })
    navigationMock.pathname = '/agent/conversation-1'
    useNavigationStore.setState({ navigate: null, pathname: '/agent/conversation-1' })

    const { container, rerender } = render(
      <WorkspaceLayout>
        <AgentLayout>
          <AgentConversationPage />
        </AgentLayout>
      </WorkspaceLayout>,
    )

    const initialAside = container.querySelector('aside')
    expect(initialAside).not.toBeNull()
    expect(screen.getByTestId('agent-page')).toBeInTheDocument()
    expect(screen.queryByTestId('manager-page')).not.toBeInTheDocument()

    navigationMock.pathname = '/manage/reports'
    useNavigationStore.setState({ pathname: '/manage/reports' })
    rerender(
      <WorkspaceLayout>
        <div data-testid='manager-page' />
      </WorkspaceLayout>,
    )

    expect(container.querySelector('aside')).toBe(initialAside)
    expect(screen.getByTestId('manager-page')).toBeInTheDocument()
    expect(screen.queryByTestId('agent-page')).not.toBeInTheDocument()
  })

  test('lets segment layouts own the persistent sidebar, header chrome, and agent workspace', () => {
    useAppPreferencesStore.setState({ locale: 'en-US', themeMode: 'slate' })
    useNavigationStore.setState({ navigate: null, pathname: '/agent' })

    render(
      <WorkspaceLayout>
        <AgentLayout>
          <AgentDraftPage />
        </AgentLayout>
      </WorkspaceLayout>,
    )

    expect(screen.getByTestId('agent-page')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /hide sidebar/i })).toBeInTheDocument()

    cleanup()
    useNavigationStore.setState({ pathname: '/manage/reports' })
    render(
      <WorkspaceLayout>
        <div data-testid='manager-child' />
      </WorkspaceLayout>,
    )

    expect(screen.getByTestId('manager-child')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /hide sidebar/i })).toBeInTheDocument()

    cleanup()
    const { container: draftContainer } = render(<AgentDraftPage />)
    expect(draftContainer).toBeEmptyDOMElement()

    cleanup()
    const { container: conversationContainer } = render(<AgentConversationPage />)
    expect(conversationContainer).toBeEmptyDOMElement()
  })

  test('redirects the legacy manage agent route to the explicit agent route', () => {
    render(<LegacyManageAgentPage />)

    expect(navigationMock.redirect).toHaveBeenCalledWith('/agent')
  })
})
