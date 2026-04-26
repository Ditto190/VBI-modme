import { describe, expect, test, vi } from 'vitest'
import { createProviderWorkspace } from '../src/agent/provider-workspace.js'

describe('createProviderWorkspace', () => {
  test('adapts selected provider resources into builder workspace slots', async () => {
    const chartBuilder = { build: () => ({ chartType: 'line' }) }
    const reportBuilder = { build: () => ({ pages: [] }) }
    const chart = {
      getSummary: vi.fn(async () => ({ id: 'chart-1', name: 'Chart' })),
      open: vi.fn(async () => chartBuilder),
      snapshot: vi.fn(async () => ({ dsl: {}, resource: { id: 'chart-1' } })),
    }
    const report = {
      getSummary: vi.fn(async () => ({ id: 'report-1', name: 'Report' })),
      open: vi.fn(async () => reportBuilder),
      snapshot: vi.fn(async () => ({ dsl: {}, resource: { id: 'report-1' } })),
    }
    const client = {
      chart: vi.fn(() => chart),
      report: vi.fn(() => report),
    }

    const workspace = createProviderWorkspace({ chartId: 'chart-1', client: client as never, reportId: 'report-1' })

    await expect(workspace.chart?.open()).resolves.toBe(chartBuilder)
    await expect(workspace.report?.describe?.()).resolves.toEqual({ id: 'report-1', name: 'Report' })
    await workspace.chart?.save?.()
    expect(client.chart).toHaveBeenCalledWith('chart-1')
    expect(client.report).toHaveBeenCalledWith('report-1')
    expect(chart.snapshot).toHaveBeenCalledTimes(1)
  })

  test('lets builder scripts open resources by id without startup ids', async () => {
    const chartBuilder = { build: () => ({ chartType: 'bar' }) }
    const chart = {
      getSummary: vi.fn(async () => ({ id: 'chart-2', name: 'Chart 2' })),
      open: vi.fn(async () => chartBuilder),
      snapshot: vi.fn(async () => ({ dsl: {}, resource: { id: 'chart-2' } })),
    }
    const client = {
      chart: vi.fn(() => chart),
      report: vi.fn(),
    }

    const workspace = createProviderWorkspace({ client: client as never })

    await expect(workspace.chart?.open('chart-2')).resolves.toBe(chartBuilder)
    await expect(workspace.chart?.open()).rejects.toThrow('chart id is required')
    expect(client.chart).toHaveBeenCalledWith('chart-2')
  })
})
