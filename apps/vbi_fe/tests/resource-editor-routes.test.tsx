import { afterEach, beforeEach, describe, expect, rs, test } from '@rstest/core'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'

const connectResourceSession = rs.fn()
const releaseResourceSession = rs.fn()
const navigate = rs.fn()

rs.mock('../src/services/resourceApi', () => ({
  listResources: rs.fn(),
  renameResource: rs.fn(),
}))

rs.mock('../src/services/insightApi', () => ({
  updateInsight: rs.fn(),
}))

rs.mock('../src/application/resources/session', () => ({
  connectResourceSession,
  releaseResourceSession,
}))

rs.mock('../src/views/agent/AgentConversationSidebarSection', () => ({
  AgentConversationSidebarSection: () => <div data-testid='agent-conversation-sidebar' />,
}))

rs.mock('../src/views/agent/AgentPage', () => ({
  AgentChatSurface: ({ className }: { className?: string }) => (
    <div className={className} data-testid='agent-chat-surface' />
  ),
}))

rs.mock('../src/views/workspace/ManagePreferences', () => ({
  ManagePreferences: () => <div data-testid='manage-preferences' />,
}))

rs.mock('../src/views/resources/chart/ChartResourceEditor', () => ({
  ChartResourceEditor: () => <div data-testid='chart-resource-editor' />,
}))

rs.mock('../src/views/resources/insight/InsightResourceEditor', () => ({
  InsightResourceEditor: () => <div data-testid='insight-resource-editor' />,
}))

const resourceApi = await import('../src/services/resourceApi')
const insightApi = await import('../src/services/insightApi')
const { useAppPreferencesStore } = await import('./application-test-stores')
const { useNavigationStore } = await import('./application-test-stores')
const { ManageLayoutPage } = await import('../src/views/workspace/ManageLayoutPage')
const { ChartEditorPage } = await import('../src/views/resources/chart/ChartEditorPage')
const { InsightEditorPage } = await import('../src/views/resources/insight/InsightEditorPage')

describe('resource editor routes', () => {
  beforeEach(() => {
    rs.clearAllMocks()
    useAppPreferencesStore.setState({ locale: 'en-US', themeMode: 'slate' })
    useNavigationStore.setState({ navigate, pathname: '' })
    ;(resourceApi.listResources as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue([
      {
        createdAt: '2026-05-01T01:00:00.000Z',
        id: 'chart-1',
        name: 'Revenue Chart',
        updatedAt: '2026-05-01T02:00:00.000Z',
      },
      {
        createdAt: '2026-05-01T01:00:00.000Z',
        id: 'insight-1',
        name: 'Revenue Insight',
        updatedAt: '2026-05-01T02:00:00.000Z',
      },
    ])
    ;(resourceApi.renameResource as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue(undefined)
    ;(insightApi.updateInsight as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue(undefined)
    connectResourceSession.mockResolvedValue(undefined)
    releaseResourceSession.mockResolvedValue(undefined)
  })

  afterEach(() => {
    cleanup()
  })

  test('chart editor route owns chart session lifecycle and rename', async () => {
    useNavigationStore.setState({ pathname: '/manage/chart/chart-1' })

    const view = render(
      <ManageLayoutPage>
        <ChartEditorPage id='chart-1' />
      </ManageLayoutPage>,
    )

    await waitFor(() => expect(connectResourceSession).toHaveBeenCalledWith('chart', 'chart-1', expect.any(String)))
    expect(await screen.findByText('Revenue Chart')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Charts' })).toHaveAttribute('data-active', 'true')
    expect(screen.getByRole('button', { name: 'Hide Sidebar' }).closest('aside')).not.toBeNull()
    expect(screen.getByRole('button', { name: 'Back' }).closest('header')).not.toBeNull()

    fireEvent.click(screen.getByRole('button', { name: 'Hide Sidebar' }))
    const showSidebarButton = screen.getByRole('button', { name: 'Show Sidebar' })
    const routeTitleGroup = screen.getByRole('button', { name: 'Back' }).closest('[data-workspace-slot-title-group]')
    expect(showSidebarButton.closest('[data-manage-sidebar-rail]')).not.toBeNull()
    expect(showSidebarButton.closest('header')).toBeNull()
    expect(routeTitleGroup).not.toBeNull()
    expect(routeTitleGroup).not.toHaveClass('pl-12')
    expect(screen.getByRole('button', { name: 'Back' })).toHaveTextContent('Back')
    expect(screen.getByRole('button', { name: 'Back' }).closest('header')).not.toBeNull()
    expect(screen.getByRole('heading', { name: 'Revenue Chart' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Rename' }))
    fireEvent.change(screen.getByDisplayValue('Revenue Chart'), { target: { value: 'Revenue Chart Updated' } })
    fireEvent.blur(screen.getByDisplayValue('Revenue Chart Updated'))

    await waitFor(() =>
      expect(resourceApi.renameResource).toHaveBeenCalledWith('chart', 'chart-1', 'Revenue Chart Updated'),
    )

    fireEvent.click(screen.getByRole('button', { name: 'Back' }))
    expect(navigate).toHaveBeenCalledWith('/manage/chart')

    view.unmount()
    await waitFor(() => expect(releaseResourceSession).toHaveBeenCalledWith('chart', 'chart-1'))
  })

  test('insight editor route owns insight session lifecycle and rename', async () => {
    useNavigationStore.setState({ pathname: '/manage/insight/insight-1' })

    const view = render(
      <ManageLayoutPage>
        <InsightEditorPage id='insight-1' />
      </ManageLayoutPage>,
    )

    await waitFor(() => expect(connectResourceSession).toHaveBeenCalledWith('insight', 'insight-1', expect.any(String)))
    expect(await screen.findByText('Revenue Insight')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Insights' })).toHaveAttribute('data-active', 'true')

    fireEvent.click(screen.getByRole('button', { name: 'Rename' }))
    fireEvent.change(screen.getByDisplayValue('Revenue Insight'), { target: { value: 'Revenue Insight Updated' } })
    fireEvent.blur(screen.getByDisplayValue('Revenue Insight Updated'))

    await waitFor(() =>
      expect(insightApi.updateInsight).toHaveBeenCalledWith('insight-1', { name: 'Revenue Insight Updated' }),
    )

    fireEvent.click(screen.getByRole('button', { name: 'Back' }))
    expect(navigate).toHaveBeenCalledWith('/manage/insight')

    view.unmount()
    await waitFor(() => expect(releaseResourceSession).toHaveBeenCalledWith('insight', 'insight-1'))
  })
})
