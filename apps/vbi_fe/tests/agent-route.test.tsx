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

const { default: AgentLayout } = await import('../src/app/agent/layout')
const { default: AgentDraftPage } = await import('../src/app/agent/page')
const { default: AgentConversationPage } = await import('../src/app/agent/[conversationId]/page')
const { default: LegacyManageAgentPage } = await import('../src/app/manage/agent/page')
const { default: ManageLayout } = await import('../src/app/manage/layout')
const { useAppPreferencesStore } = await import('../src/stores/app-preferences.store')
const { useNavigationStore } = await import('../src/stores/navigation.store')
const { ManagedRouteShell } = await import('../src/views/ManagedRouteShell')

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
      <ManagedRouteShell>
        <AgentConversationPage />
      </ManagedRouteShell>,
    )
    const sidebar = container.querySelector('aside')

    expect(sidebar).not.toBeNull()
    expect(screen.getByTestId('agent-page')).toBeInTheDocument()
    expect(screen.queryByTestId('manager-page')).not.toBeInTheDocument()

    navigationMock.pathname = '/manage/reports'
    useNavigationStore.setState({ pathname: '/manage/reports' })
    rerender(
      <ManagedRouteShell>
        <div data-testid='manager-page' />
      </ManagedRouteShell>,
    )

    expect(container.querySelector('aside')).toBe(sidebar)
    expect(screen.getByTestId('manager-page')).toBeInTheDocument()
    expect(screen.queryByTestId('agent-page')).not.toBeInTheDocument()
  })

  test('keeps segment layouts thin because the shared shell owns the chrome', () => {
    render(
      <AgentLayout>
        <div data-testid='agent-child' />
      </AgentLayout>,
    )

    expect(screen.getByTestId('agent-child')).toBeInTheDocument()

    cleanup()
    render(
      <ManageLayout>
        <div data-testid='manager-child' />
      </ManageLayout>,
    )

    expect(screen.getByTestId('manager-child')).toBeInTheDocument()

    cleanup()
    const { container: draftContainer } = render(<AgentDraftPage />)
    expect(draftContainer).not.toBeEmptyDOMElement()
    expect(screen.getByTestId('agent-page')).toBeInTheDocument()

    cleanup()
    const { container: conversationContainer } = render(<AgentConversationPage />)
    expect(conversationContainer).not.toBeEmptyDOMElement()
    expect(screen.getByTestId('agent-page')).toBeInTheDocument()
  })

  test('redirects the legacy manage agent route to the explicit agent route', () => {
    render(<LegacyManageAgentPage />)

    expect(navigationMock.redirect).toHaveBeenCalledWith('/agent')
  })
})
