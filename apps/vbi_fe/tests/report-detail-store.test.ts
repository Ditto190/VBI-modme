import { beforeEach, describe, expect, rs, test } from '@rstest/core'

const connectResourceSession = rs.fn()
const releaseResourceSession = rs.fn()

rs.mock('../src/application/resources/session', () => ({
  connectResourceSession,
  releaseResourceSession,
}))

const { useReportBuilderModel } = await import('./application-test-stores')
const { useReportDetailStore } = await import('./application-test-stores')
const initialReportBuilderState = useReportBuilderModel.getState()
const initialReportDetailState = useReportDetailStore.getState()
const getReportDetailSnapshot = () => useReportDetailStore.getState()

const createReportBuilder = (
  initialPages = [
    {
      chartId: 'chart-1',
      id: 'page-1',
      insightId: 'insight-1',
      title: 'Page 1',
    },
  ],
) => {
  const pages = [
    ...initialPages.map((page) => ({
      ...page,
    })),
  ]

  return {
    build: () => ({
      pages,
    }),
    page: {
      remove: (pageId: string) => {
        const pageIndex = pages.findIndex((item) => item.id === pageId)
        if (pageIndex >= 0) pages.splice(pageIndex, 1)
      },
      update: (pageId: string, callback: (page: { setChartId(chartId: string): void }) => void) => {
        const page = pages.find((item) => item.id === pageId)
        if (!page) throw new Error(`Page ${pageId} not found`)
        callback({
          setChartId: (chartId: string) => {
            page.chartId = chartId
          },
        })
      },
    },
  }
}

describe('report detail store', () => {
  beforeEach(() => {
    rs.clearAllMocks()
    releaseResourceSession.mockResolvedValue(undefined)
    useReportBuilderModel.setState(initialReportBuilderState, true)
    useReportDetailStore.setState(initialReportDetailState, true)
  })

  test('syncs insight id before chart connection settles', async () => {
    let resolveChart: () => void = () => {}
    connectResourceSession.mockImplementation((kind: string) =>
      kind === 'chart'
        ? new Promise<void>((resolve) => {
            resolveChart = resolve
          })
        : Promise.resolve(),
    )
    useReportBuilderModel.setState({
      sessions: {
        'report-1': {
          builder: createReportBuilder(),
        },
      },
    })
    useReportDetailStore.setState({
      activePageId: '',
      reportId: 'report-1',
      userName: 'user-1',
    })

    const sync = useReportDetailStore.getState().syncActivePage()
    expect(getReportDetailSnapshot().connectedChartId).toBe('chart-1')
    expect(getReportDetailSnapshot().connectedInsightId).toBe('insight-1')

    resolveChart()
    await sync
  })

  test('does not reconnect unchanged active page resources', async () => {
    connectResourceSession.mockResolvedValue(undefined)
    useReportBuilderModel.setState({
      sessions: {
        'report-1': {
          builder: createReportBuilder(),
        },
      },
    })
    useReportDetailStore.setState({
      activePageId: '',
      reportId: 'report-1',
      userName: 'user-1',
    })

    await useReportDetailStore.getState().syncActivePage()
    await useReportDetailStore.getState().syncActivePage()

    expect(getReportDetailSnapshot().connectedChartIds).toEqual(['chart-1'])
    expect(getReportDetailSnapshot().connectedInsightIds).toEqual(['insight-1'])
    expect(releaseResourceSession).not.toHaveBeenCalled()
  })

  test('connects resources for every report page in scroll view', async () => {
    connectResourceSession.mockResolvedValue(undefined)
    useReportBuilderModel.setState({
      sessions: {
        'report-1': {
          builder: createReportBuilder([
            {
              chartId: 'chart-1',
              id: 'page-1',
              insightId: 'insight-1',
              title: 'Page 1',
            },
            {
              chartId: 'chart-2',
              id: 'page-2',
              insightId: 'insight-2',
              title: 'Page 2',
            },
          ]),
        },
      },
    })
    useReportDetailStore.setState({
      activePageId: '',
      reportId: 'report-1',
      userName: 'user-1',
    })

    await useReportDetailStore.getState().syncActivePage()

    expect(getReportDetailSnapshot().connectedChartIds).toEqual(['chart-1', 'chart-2'])
    expect(getReportDetailSnapshot().connectedInsightIds).toEqual(['insight-1', 'insight-2'])
  })

  test('updates active resource ids when scrolling to another report DSL page', async () => {
    connectResourceSession.mockResolvedValue(undefined)
    useReportBuilderModel.setState({
      sessions: {
        'report-1': {
          builder: createReportBuilder([
            {
              chartId: 'chart-1',
              id: 'page-1',
              insightId: 'insight-1',
              title: 'Page 1',
            },
            {
              chartId: 'chart-2',
              id: 'page-2',
              insightId: 'insight-2',
              title: 'Page 2',
            },
          ]),
        },
      },
    })
    useReportDetailStore.setState({
      activePageId: 'page-1',
      connectedChartId: 'chart-1',
      connectedInsightId: 'insight-1',
      reportId: 'report-1',
      userName: 'user-1',
    })

    useReportDetailStore.getState().setScrolledPage('page-2')

    expect(getReportDetailSnapshot().activePageId).toBe('page-2')
    expect(getReportDetailSnapshot().connectedChartId).toBe('chart-2')
    expect(getReportDetailSnapshot().connectedInsightId).toBe('insight-2')
  })

  test('removes chart from active page and releases chart session', async () => {
    connectResourceSession.mockResolvedValue(undefined)
    const reportBuilder = createReportBuilder()
    useReportBuilderModel.setState({
      sessions: {
        'report-1': {
          builder: reportBuilder,
        },
      },
    })
    useReportDetailStore.setState({
      activePageId: 'page-1',
      connectedChartId: 'chart-1',
      connectedInsightId: 'insight-1',
      reportId: 'report-1',
      userName: 'user-1',
    })

    await useReportDetailStore.getState().removeChart()

    expect(reportBuilder.build().pages[0].chartId).toBe('')
    expect(getReportDetailSnapshot().connectedChartId).toBe('')
    expect(releaseResourceSession).toHaveBeenCalledWith('chart', 'chart-1')
    expect(connectResourceSession).not.toHaveBeenCalled()
  })

  test('does not leave stale report subscriptions when disposed before bootstrap finishes', async () => {
    let resolveReportConnection: () => void = () => {}
    connectResourceSession.mockImplementation((kind: string) =>
      kind === 'report'
        ? new Promise<void>((resolve) => {
            resolveReportConnection = resolve
          })
        : Promise.resolve(),
    )
    useReportBuilderModel.setState({
      sessions: {
        'report-1': {
          builder: createReportBuilder(),
        },
      },
    })

    const bootstrap = useReportDetailStore.getState().bootstrap('report-1', 'user-1')
    for (let index = 0; index < 10; index += 1) {
      if (connectResourceSession.mock.calls.some(([kind]) => kind === 'report')) break
      await Promise.resolve()
    }
    expect(getReportDetailSnapshot().reportId).toBe('report-1')

    const dispose = useReportDetailStore.getState().dispose()
    resolveReportConnection()
    await bootstrap
    await dispose

    expect(getReportDetailSnapshot().reportId).toBe('')
    expect(getReportDetailSnapshot().stopReportSync).toBeNull()
    expect(releaseResourceSession).toHaveBeenCalledWith('report', 'report-1')
  })

  test('does not remove the final report page through the store', async () => {
    const reportBuilder = createReportBuilder([
      {
        chartId: '',
        id: 'page-1',
        insightId: '',
        title: 'Page 1',
      },
    ])
    useReportBuilderModel.setState({
      sessions: {
        'report-1': {
          builder: reportBuilder,
        },
      },
    })
    useReportDetailStore.setState({
      activePageId: 'page-1',
      reportId: 'report-1',
      userName: 'user-1',
    })

    await useReportDetailStore.getState().removePage('page-1')

    expect(reportBuilder.build().pages).toHaveLength(1)
    expect(releaseResourceSession).not.toHaveBeenCalled()
  })
})
