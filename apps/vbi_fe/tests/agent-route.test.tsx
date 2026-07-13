import { beforeEach, describe, expect, rs, test } from '@rstest/core'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'

rs.mock('../src/views/ManageLayoutPage', () => ({
  ManageLayoutPage: ({ children }: { children: ReactNode }) => <div data-testid='workspace-layout'>{children}</div>,
}))

rs.mock('../src/views/AgentPage', () => ({
  AgentPage: () => <div data-testid='agent-page' />,
}))

rs.mock('../src/views/ReportsPage', () => ({
  ReportsPage: () => <div data-testid='reports-page' />,
}))

rs.mock('../src/views/ManageChartsPage', () => ({
  ManageChartsPage: () => <div data-testid='charts-page' />,
}))

rs.mock('../src/views/ManageInsightsPage', () => ({
  ManageInsightsPage: () => <div data-testid='insights-page' />,
}))

rs.mock('../src/views/manage-resource/ChartEditorPage', () => ({
  ChartEditorPage: ({ id }: { id: string }) => <div data-testid='chart-editor'>{id}</div>,
}))

rs.mock('../src/views/manage-resource/InsightEditorPage', () => ({
  InsightEditorPage: ({ id }: { id: string }) => <div data-testid='insight-editor'>{id}</div>,
}))

rs.mock('../src/views/ReportDetailPage', () => ({
  ReportDetailPage: ({ id }: { id: string }) => <div data-testid='report-detail'>{id}</div>,
}))

const { App } = await import('../src/App')
const { useAppPreferencesStore } = await import('../src/stores/app-preferences.store')
const { useNavigationStore } = await import('../src/stores/navigation.store')

describe('rsbuild app routes', () => {
  beforeEach(() => {
    cleanup()
    useAppPreferencesStore.setState({ locale: 'en-US', themeMode: 'slate' })
    useNavigationStore.setState({ navigate: null, pathname: '' })
  })

  test('renders the persistent workspace shell and agent route', async () => {
    window.history.replaceState(null, '', '/agent/conversation-1')

    render(<App />)

    expect(screen.getByTestId('workspace-layout')).toBeInTheDocument()
    expect(await screen.findByTestId('agent-page')).toBeInTheDocument()
  })

  test('maps browser paths to resource pages', async () => {
    window.history.replaceState(null, '', '/manage/charts/chart%201')
    const { rerender } = render(<App />)

    expect(await screen.findByTestId('chart-editor')).toHaveTextContent('chart 1')

    window.history.pushState(null, '', '/manage/insights')
    window.dispatchEvent(new PopStateEvent('popstate'))
    rerender(<App />)
    expect(await screen.findByTestId('insights-page')).toBeInTheDocument()

    window.history.pushState(null, '', '/manage/reports/report-1')
    window.dispatchEvent(new PopStateEvent('popstate'))
    rerender(<App />)
    await waitFor(() => expect(screen.getByTestId('report-detail')).toHaveTextContent('report-1'))
  })
})
