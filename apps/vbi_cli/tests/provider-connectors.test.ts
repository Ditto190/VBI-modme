import { describe, expect, rs, test } from '@rstest/core'
import { VBI } from '@visactor/vbi'
import { createProviderWorkspace } from '../src/agent/provider.js'

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

    const workspace = createProviderWorkspace({ chartId: 'chart-1', client: client as never })
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

  test('rejects empty connector registrations', () => {
    const client = {
      chart: rs.fn(),
      report: rs.fn(),
    }
    const workspace = createProviderWorkspace({ client: client as never })

    expect(() => workspace.connectors?.register('broken', undefined as never)).toThrow(
      'connector registration is required',
    )
  })
})
