import { describe, expect, rs, test } from '@rstest/core'
import { VBI } from '@visactor/vbi'
import { createVBIProviderWorkspace } from '@visactor/headless-bi-provider'

describe('createProviderWorkspace', () => {
  test('adapts selected provider resources into builder workspace slots', async () => {
    const chartBuilder = { build: () => ({ chartType: 'line' }) }
    const reportBuilder = { build: () => ({ pages: [] }) }
    const chart = {
      close: rs.fn(async () => {}),
      getSummary: rs.fn(async () => ({ id: 'chart-1', name: 'Chart' })),
      open: rs.fn(async () => chartBuilder),
      snapshot: rs.fn(async () => ({ dsl: {}, resource: { id: 'chart-1' } })),
    }
    const report = {
      close: rs.fn(async () => {}),
      getSummary: rs.fn(async () => ({ id: 'report-1', name: 'Report' })),
      open: rs.fn(async () => reportBuilder),
      snapshot: rs.fn(async () => ({ dsl: {}, resource: { id: 'report-1' } })),
    }
    const client = {
      chart: rs.fn(() => chart),
      report: rs.fn(() => report),
    }

    const workspace = createVBIProviderWorkspace({ chartId: 'chart-1', client: client as never, reportId: 'report-1' })

    await expect(workspace.chart?.open()).resolves.toBe(chartBuilder)
    await expect(workspace.report?.describe?.()).resolves.toEqual({ id: 'report-1', name: 'Report' })
    await expect(workspace.chart?.snapshot?.()).resolves.toMatchObject({ resource: { id: 'chart-1' } })
    await workspace.chart?.close?.()
    expect(client.chart).toHaveBeenCalledWith('chart-1')
    expect(client.report).toHaveBeenCalledWith('report-1')
    expect(chart.snapshot).toHaveBeenCalledTimes(1)
    expect(chart.close).toHaveBeenCalledTimes(1)
  })

  test('lets builder scripts open resources by id without startup ids', async () => {
    const chartBuilder = { build: () => ({ chartType: 'bar' }) }
    const chart = {
      close: rs.fn(async () => {}),
      getSummary: rs.fn(async () => ({ id: 'chart-2', name: 'Chart 2' })),
      open: rs.fn(async () => chartBuilder),
      snapshot: rs.fn(async () => ({ dsl: {}, resource: { id: 'chart-2' } })),
    }
    const client = {
      chart: rs.fn(() => chart),
      report: rs.fn(),
    }

    const workspace = createVBIProviderWorkspace({ client: client as never })

    await expect(workspace.chart?.open('chart-2')).resolves.toBe(chartBuilder)
    await expect(workspace.chart?.open()).rejects.toThrow('chart id is required')
    expect(client.chart).toHaveBeenCalledWith('chart-2')
  })

  test('injects connector helpers into provider workspace', async () => {
    const schema = [{ name: 'sales', type: 'number' }]
    const client = {
      chart: rs.fn(),
      report: rs.fn(),
    }

    const workspace = createVBIProviderWorkspace({ client: client as never })
    const connectorId = workspace.connectors?.register('cli-test-direct', {
      discoverSchema: async () => schema,
      query: async () => ({ dataset: [] }),
    })

    expect(connectorId).toBe('cli-test-direct')
    const connector = await VBI.connectors.get('cli-test-direct')
    await expect(connector.discoverSchema()).resolves.toEqual(schema)
  })

  test('registers connector for the selected chart connector id', async () => {
    const schema = [{ name: 'profit', type: 'number' }]
    const chartBuilder = VBI.chart.create(VBI.chart.createEmpty('cli-test-chart'))
    const chart = {
      open: rs.fn(async () => chartBuilder),
    }
    const client = {
      chart: rs.fn(() => chart),
      report: rs.fn(),
    }

    const workspace = createVBIProviderWorkspace({ chartId: 'chart-3', client: client as never })
    await expect(
      workspace.connectors?.registerChart?.(undefined, {
        discoverSchema: async () => schema,
        query: async () => ({ dataset: [] }),
      }),
    ).resolves.toBe('cli-test-chart')
    await expect(chartBuilder.getSchema()).resolves.toEqual(schema)
    expect(client.chart).toHaveBeenCalledWith('chart-3')
  })
})
