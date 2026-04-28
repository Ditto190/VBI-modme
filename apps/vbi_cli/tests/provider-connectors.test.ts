import { describe, expect, rs, test } from '@rstest/core'
import { VBI } from '@visactor/vbi'
import { createVBIProviderWorkspace } from '@visactor/headless-bi-provider'

describe('provider workspace connectors', () => {
  test('auto-registers the demo connector when opening a demo chart', async () => {
    VBI.connectorMap.delete('demo')
    const chartBuilder = VBI.chart.create(VBI.chart.createEmpty('demo'))
    const chart = {
      open: rs.fn(async () => chartBuilder),
    }
    const client = {
      chart: rs.fn(() => chart),
      report: rs.fn(),
    }

    const workspace = createVBIProviderWorkspace({ chartId: 'chart-1', client: client as never })
    const openedBuilder = await workspace.chart?.open()

    await expect(openedBuilder?.getSchema()).resolves.toEqual(
      expect.arrayContaining([
        { name: 'order_date', type: 'date' },
        { name: 'area', type: 'string' },
        { name: 'sales', type: 'number' },
        { name: 'profit', type: 'number' },
      ]),
    )
    expect(client.chart).toHaveBeenCalledWith('chart-1')
  })

  test('builds seed dsl through the demo connector', async () => {
    VBI.connectorMap.delete('demo')
    const chartBuilder = VBI.chart.create(VBI.chart.createEmpty('demo'))
    chartBuilder.chartType.changeChartType('bar')
    chartBuilder.dimensions.add('area', (node) => node.setAlias('area').setEncoding('xAxis'))
    chartBuilder.measures.add('sales', (node) =>
      node.setAlias('sales').setEncoding('yAxis').setAggregate({ func: 'sum' }),
    )
    chartBuilder.limit.setLimit(1)

    const client = {
      chart: rs.fn(() => ({ open: rs.fn(async () => chartBuilder) })),
      report: rs.fn(),
    }
    const workspace = createVBIProviderWorkspace({ chartId: 'chart-1', client: client as never })
    const openedBuilder = await workspace.chart.open()
    const seedDSL = await openedBuilder.buildVSeed()

    expect(seedDSL).toMatchObject({
      chartType: 'bar',
      dataset: [expect.any(Object)],
    })
    expect(Object.values(seedDSL.dataset[0])).toEqual(expect.arrayContaining(['东北', 2681567.469000001]))
  })

  test('rejects empty connector registrations', () => {
    const client = {
      chart: rs.fn(),
      report: rs.fn(),
    }
    const workspace = createVBIProviderWorkspace({ client: client as never })

    expect(() => workspace.connectors?.register('broken', undefined as never)).toThrow(
      'connector registration is required',
    )
  })
})
