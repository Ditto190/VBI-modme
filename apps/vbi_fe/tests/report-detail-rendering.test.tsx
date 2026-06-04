import { afterEach, beforeEach, describe, expect, rs, test } from '@rstest/core'
import { cleanup, render } from '@testing-library/react'

const connectResourceSession = rs.fn()
const releaseResourceSession = rs.fn()

rs.mock('../src/stores/resource-session.store', () => ({
  connectResourceSession,
  releaseResourceSession,
}))

const { application } = await import('../src/application')
const { useAppPreferencesStore } = await import('../src/stores/app-preferences.store')
const { useReportBuilderModel } = await import('../src/models')
const { useReportDetailStore } = await import('../src/stores/report-detail.store')
const { ReportDetailPage } = await import('../src/views/report-detail/ReportDetailPage')
const { ReportWorkspace } = await import('../src/views/report-detail/ReportWorkspace')
const initialReportBuilderState = useReportBuilderModel.getState()
const initialReportDetailState = useReportDetailStore.getState()

const createReportBuilder = () => ({
  build: () => ({
    pages: [],
  }),
})

describe('report detail rendering', () => {
  beforeEach(async () => {
    rs.clearAllMocks()
    connectResourceSession.mockResolvedValue(undefined)
    releaseResourceSession.mockResolvedValue(undefined)
    useAppPreferencesStore.setState({ locale: 'en-US', themeMode: 'slate' })
    useReportBuilderModel.setState(initialReportBuilderState, true)
    useReportDetailStore.setState(initialReportDetailState, true)
    await application.getState().reportDetail.syncActivePage()
  })

  afterEach(() => {
    cleanup()
  })

  test('renders the report workspace without a page-level presence animation', () => {
    useReportBuilderModel.setState({
      sessions: {
        'report-1': {
          builder: createReportBuilder(),
        },
      },
    })
    useReportDetailStore.setState({
      reportId: 'report-1',
    })

    const { container } = render(<ReportWorkspace />)
    const workspace = container.querySelector('[data-report-workspace]')

    expect(workspace).not.toBeNull()
    expect(workspace).not.toHaveClass('vbi-motion-presence')
  })

  test('keeps report loading scoped to the main content area', () => {
    const { container } = render(<ReportDetailPage id='report-1' />)
    const loadingSurface = container.firstElementChild

    expect(loadingSurface).not.toBeNull()
    expect(loadingSurface).toHaveClass('h-full')
    expect(loadingSurface).not.toHaveClass('fixed')
    expect(container.querySelector('.fixed.inset-0')).toBeNull()
  })
})
