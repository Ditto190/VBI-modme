import { createVBIProviderAgentAdapter, createVBIProviderResourceTools } from '../src'
import { describe, expect, rs, test } from '@rstest/core'

const readText = (result: Awaited<ReturnType<ReturnType<typeof createVBIProviderResourceTools>[number]['execute']>>) =>
  result.content.find((part) => part.type === 'text')?.text ?? ''

describe('createVBIProviderAgentAdapter', () => {
  test('exposes provider workspace slots and explicit resource tools', async () => {
    const chartBuilder = { build: () => ({ chartType: 'line' }) }
    const insightBuilder = { build: () => ({ content: 'summary' }) }
    const client = {
      chart: rs.fn(() => ({
        getSummary: rs.fn(async () => ({ id: 'chart-1', name: 'Chart' })),
        open: rs.fn(async () => chartBuilder),
        snapshot: rs.fn(async () => ({ dsl: { chartType: 'line' }, resource: { id: 'chart-1' } })),
      })),
      insight: rs.fn(() => ({
        open: rs.fn(async () => insightBuilder),
        snapshot: rs.fn(async () => ({ dsl: { content: 'summary' }, resource: { id: 'insight-1' } })),
      })),
      report: rs.fn(),
    }

    const adapter = createVBIProviderAgentAdapter({
      chartId: 'chart-1',
      client: client as never,
      insightId: 'insight-1',
    })

    expect(adapter.tools.map((tool) => tool.name)).toEqual(['vbi_resource'])
    await expect(adapter.workspace.chart.open()).resolves.toBe(chartBuilder)
    await expect(adapter.workspace.insight.open()).resolves.toBe(insightBuilder)
    await expect(adapter.workspace.chart.describe()).resolves.toEqual({ id: 'chart-1', name: 'Chart' })
    expect(client.chart).toHaveBeenCalledWith('chart-1')
    expect(client.insight).toHaveBeenCalledWith('insight-1')
  })
})

describe('createVBIProviderResourceTools', () => {
  test('lists resources through the provider client', async () => {
    const listCharts = rs.fn(async () => [{ id: 'chart-1', name: 'Chart' }])
    const client = {
      listCharts,
    }
    const [tool] = createVBIProviderResourceTools(client as never)

    const result = await tool.execute('call-1', { action: 'list', resource: 'chart' })

    expect(JSON.parse(readText(result))).toEqual([{ id: 'chart-1', name: 'Chart' }])
    expect(listCharts).toHaveBeenCalledTimes(1)
  })

  test('reads resource metadata without returning DSL', async () => {
    const getDetail = rs.fn(async () => ({ dsl: { chartType: 'line' }, id: 'chart-1', name: 'Chart' }))
    const getSummary = rs.fn(async () => ({ id: 'chart-1', name: 'Chart' }))
    const client = {
      chart: rs.fn(() => ({ getDetail, getSummary })),
    }
    const [tool] = createVBIProviderResourceTools(client as never)

    const result = await tool.execute('call-1', { action: 'get', id: 'chart-1', resource: 'chart' })

    expect(JSON.parse(readText(result))).toEqual({ id: 'chart-1', name: 'Chart' })
    expect(getSummary).toHaveBeenCalledTimes(1)
    expect(getDetail).not.toHaveBeenCalled()
  })

  test('rejects resource snapshot so DSL must come from builder workspace', async () => {
    const snapshot = rs.fn(async () => ({ dsl: { chartType: 'line' }, resource: { id: 'chart-1' } }))
    const client = {
      chart: rs.fn(() => ({ getReferences: rs.fn(), snapshot })),
    }
    const [tool] = createVBIProviderResourceTools(client as never)

    await expect(tool.execute('call-1', { action: 'snapshot', id: 'chart-1', resource: 'chart' })).rejects.toThrow(
      'vbi_resource.action must be list, create, get, rename, remove, references, exportSnapshot, or page',
    )
    expect(snapshot).not.toHaveBeenCalled()
  })

  test('updates report pages through provider resource tools', async () => {
    const updatePage = rs.fn(async () => ({
      dsl: { pages: [{ id: 'page-1', title: 'Updated' }] },
      id: 'report-1',
      name: 'Report',
    }))
    const client = {
      report: rs.fn(() => ({ updatePage })),
    }
    const [tool] = createVBIProviderResourceTools(client as never)

    const result = await tool.execute('call-1', {
      action: 'page',
      id: 'report-1',
      pageAction: 'update',
      pageId: 'page-1',
      resource: 'report',
      title: 'Updated',
    })

    expect(JSON.parse(readText(result))).toEqual({ id: 'report-1', name: 'Report' })
    expect(updatePage).toHaveBeenCalledWith('page-1', {
      chartId: undefined,
      insightId: undefined,
      title: 'Updated',
    })
  })

  test('exports report snapshots when the caller explicitly requests it', async () => {
    const exportSnapshot = rs.fn(async () => ({
      charts: { 'chart-1': { chartType: 'line' } },
      insights: { 'insight-1': { content: 'summary' } },
      report: { pages: [] },
    }))
    const client = {
      report: rs.fn(() => ({ exportSnapshot })),
    }
    const [tool] = createVBIProviderResourceTools(client as never)

    const result = await tool.execute('call-1', {
      action: 'exportSnapshot',
      id: 'report-1',
      resource: 'report',
    })

    expect(JSON.parse(readText(result))).toEqual({
      charts: { 'chart-1': { chartType: 'line' } },
      insights: { 'insight-1': { content: 'summary' } },
      report: { pages: [] },
    })
    expect(exportSnapshot).toHaveBeenCalledTimes(1)
  })
})
