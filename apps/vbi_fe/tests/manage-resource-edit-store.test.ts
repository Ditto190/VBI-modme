import { beforeEach, describe, expect, rs, test } from '@rstest/core'

const connectResourceSession = rs.fn()
const releaseResourceSession = rs.fn()

rs.mock('../src/services/insightApi', () => ({
  createInsight: rs.fn(),
  deleteInsight: rs.fn(),
  fetchInsights: rs.fn(),
  updateInsight: rs.fn(),
}))

rs.mock('../src/services/resourceApi', () => ({
  createResource: rs.fn(),
  listResources: rs.fn(),
  removeResource: rs.fn(),
  renameResource: rs.fn(),
}))

rs.mock('../src/stores/resource-session.store', () => ({
  connectResourceSession,
  releaseResourceSession,
}))

const insightApi = await import('../src/services/insightApi')
const resourceApi = await import('../src/services/resourceApi')
const { useManageChartsStore } = await import('../src/stores/manage-charts.store')
const { useManageInsightsStore } = await import('../src/stores/manage-insights.store')
const { useReportsStore } = await import('../src/stores/reports.store')

const initialChartsState = useManageChartsStore.getState()
const initialInsightsState = useManageInsightsStore.getState()
const initialReportsState = useReportsStore.getState()

const createResourceItem = (id: string, name: string) => ({
  id,
  name,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-02T00:00:00.000Z',
})

describe('manage resource edit stores', () => {
  beforeEach(() => {
    rs.clearAllMocks()
    connectResourceSession.mockResolvedValue(undefined)
    releaseResourceSession.mockResolvedValue(undefined)
    ;(insightApi.fetchInsights as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue([])
    ;(resourceApi.listResources as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue([])
    useManageChartsStore.setState(initialChartsState, true)
    useManageInsightsStore.setState(initialInsightsState, true)
    useReportsStore.setState(initialReportsState, true)
  })

  test('renames reports from the manage reports page', async () => {
    useReportsStore.setState({
      items: [createResourceItem('report-1', 'Q1 Report')],
      editorName: ' Q1 Report Updated ',
      selectedId: 'report-1',
    })

    await useReportsStore.getState().renameSelected()

    expect(resourceApi.renameResource).toHaveBeenCalledWith('report', 'report-1', 'Q1 Report Updated')
  })

  test('opens and renames chart editor sessions', async () => {
    useManageChartsStore.setState({
      items: [createResourceItem('chart-1', 'Old Chart'), createResourceItem('chart-2', 'Revenue Chart')],
      selectedId: 'chart-1',
      userName: 'user-1',
    })

    await useManageChartsStore.getState().openDetail('chart-2')
    useManageChartsStore.getState().setEditorName('Revenue Chart Updated')
    await useManageChartsStore.getState().renameSelected()

    expect(releaseResourceSession).toHaveBeenCalledWith('chart', 'chart-1')
    expect(connectResourceSession).toHaveBeenCalledWith('chart', 'chart-2', 'user-1')
    expect(resourceApi.renameResource).toHaveBeenCalledWith('chart', 'chart-2', 'Revenue Chart Updated')
  })

  test('opens and renames insight editor sessions', async () => {
    useManageInsightsStore.setState({
      items: [createResourceItem('insight-1', 'Old Insight'), createResourceItem('insight-2', 'Insight')],
      selectedId: 'insight-1',
      userName: 'user-1',
    })

    await useManageInsightsStore.getState().openDetail('insight-2')
    useManageInsightsStore.getState().setEditorName('Insight Updated')
    await useManageInsightsStore.getState().renameSelected()

    expect(releaseResourceSession).toHaveBeenCalledWith('insight', 'insight-1')
    expect(connectResourceSession).toHaveBeenCalledWith('insight', 'insight-2', 'user-1')
    expect(insightApi.updateInsight).toHaveBeenCalledWith('insight-2', {
      name: 'Insight Updated',
    })
  })
})
