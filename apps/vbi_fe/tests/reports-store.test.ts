import { beforeEach, describe, expect, rs, test } from '@rstest/core'
import { useReportsStore } from '../src/stores/reports.store'

rs.mock('../src/services/resourceApi', () => ({
  createResource: rs.fn(),
  listResources: rs.fn(),
  removeResource: rs.fn(),
  renameResource: rs.fn(),
}))

const resourceApi = await import('../src/services/resourceApi')
const initialReportsState = useReportsStore.getState()
const getReportsSnapshot = () => useReportsStore.getState()
const mockedListResources = resourceApi.listResources as unknown as {
  mockResolvedValue(value: unknown): void
}
const mockedCreateResource = resourceApi.createResource as unknown as {
  mockResolvedValue(value: unknown): void
}
const createReportItem = (id: string, name: string) => ({
  id,
  name,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-02T00:00:00.000Z',
})

describe('reports store', () => {
  beforeEach(() => {
    rs.clearAllMocks()
    useReportsStore.setState(initialReportsState, true)
  })

  test('load stores fetched report items', async () => {
    mockedListResources.mockResolvedValue([createReportItem('report-1', 'Sales Report')])

    await useReportsStore.getState().load()

    expect(resourceApi.listResources).toHaveBeenCalledWith('report')
    expect(getReportsSnapshot().items).toHaveLength(1)
    expect(getReportsSnapshot().items[0]?.id).toBe('report-1')
  })

  test('create keeps report management on the list page', async () => {
    mockedCreateResource.mockResolvedValue({
      id: 'report-2',
      name: 'Revenue',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    })
    mockedListResources.mockResolvedValue([])
    useReportsStore.getState().setCreateName(' Revenue ')

    await useReportsStore.getState().create()

    expect(resourceApi.createResource).toHaveBeenCalledWith('report', 'Revenue')
    expect(getReportsSnapshot().selectedId).toBe('')
    expect(getReportsSnapshot().createName).toBe('')
    expect(getReportsSnapshot().isCreateOpen).toBe(false)
  })
})
