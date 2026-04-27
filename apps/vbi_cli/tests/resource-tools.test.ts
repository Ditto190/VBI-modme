import { describe, expect, rs, test } from '@rstest/core'
import { createResourceTools } from '../src/agent/tools/resource-tools.js'

describe('createResourceTools', () => {
  test('lists resources through the injected provider client', async () => {
    const client = {
      listCharts: rs.fn(async () => [{ id: 'chart-1', name: 'Chart' }]),
    }
    const [tool] = createResourceTools(client as never)

    const result = await tool.execute({ action: 'list', resource: 'chart' })

    expect(JSON.parse(result.content)).toEqual([{ id: 'chart-1', name: 'Chart' }])
    expect(client.listCharts).toHaveBeenCalledTimes(1)
  })

  test('updates report pages without entering the agent package', async () => {
    const updatePage = rs.fn(async () => ({ id: 'report-1', pages: [{ id: 'page-1', title: 'Updated' }] }))
    const client = {
      report: rs.fn(() => ({ updatePage })),
    }
    const [tool] = createResourceTools(client as never)

    const result = await tool.execute({
      action: 'page',
      id: 'report-1',
      pageAction: 'update',
      pageId: 'page-1',
      resource: 'report',
      title: 'Updated',
    })

    expect(JSON.parse(result.content)).toEqual({ id: 'report-1', pages: [{ id: 'page-1', title: 'Updated' }] })
    expect(updatePage).toHaveBeenCalledWith('page-1', {
      chartId: undefined,
      insightId: undefined,
      title: 'Updated',
    })
  })
})
