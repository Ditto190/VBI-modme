import type { InsightUpdateInput, ReportPageInput, VBIProviderClient } from '@visactor/headless-bi-provider'
import { createInput, readAction, readResource, readString, requireString } from './resource-readers.js'
import type { ResourceAction } from './resource-readers.js'

const executeChartAction = (client: VBIProviderClient, action: ResourceAction, input: Record<string, unknown>) => {
  if (action === 'list') return client.listCharts()
  const provider = client.chart(readString(input, 'id'))
  if (action === 'create') return provider.create(createInput(input))
  if (action === 'get') return provider.getDetail()
  if (action === 'rename') return provider.rename(requireString(input, 'name'))
  if (action === 'remove') return provider.remove()
  if (action === 'snapshot') return provider.snapshot()
  return provider.getReferences()
}

const executeInsightAction = (client: VBIProviderClient, action: ResourceAction, input: Record<string, unknown>) => {
  if (action === 'list') return client.listInsights()
  const provider = client.insight(readString(input, 'id'))
  if (action === 'create') return provider.create({ ...createInput(input), content: readString(input, 'content') })
  if (action === 'get') return provider.getDetail()
  if (action === 'rename') return provider.rename(requireString(input, 'name'))
  if (action === 'remove') return provider.remove()
  if (action === 'snapshot') return provider.snapshot()
  return provider.getReferences()
}

const executeReportAction = (client: VBIProviderClient, action: ResourceAction, input: Record<string, unknown>) => {
  if (action === 'list') return client.listReports()
  const provider = client.report(readString(input, 'id'))
  if (action === 'create') return provider.create(createInput(input))
  if (action === 'get') return provider.getDetail()
  if (action === 'rename') return provider.rename(requireString(input, 'name'))
  if (action === 'remove') return provider.remove()
  if (action === 'snapshot') return provider.snapshot()
  return provider.exportSnapshot()
}

export const executeResourceAction = (client: VBIProviderClient, input: Record<string, unknown>) => {
  const action = readAction(input)
  const resource = readResource(input)
  if (resource === 'chart') return executeChartAction(client, action, input)
  if (resource === 'insight') return executeInsightAction(client, action, input)
  return executeReportAction(client, action, input)
}

export const executeInsightUpdate = (client: VBIProviderClient, input: Record<string, unknown>) =>
  client.insight(requireString(input, 'id')).update({
    ...(readString(input, 'content') ? { content: readString(input, 'content') } : {}),
    ...(readString(input, 'name') ? { name: readString(input, 'name') } : {}),
  } satisfies InsightUpdateInput)

export const executeReportPageAction = (client: VBIProviderClient, input: Record<string, unknown>) => {
  const provider = client.report(requireString(input, 'id'))
  const pageAction = requireString(input, 'pageAction')
  if (pageAction === 'create') return provider.createPage({ title: readString(input, 'title') })
  if (pageAction === 'remove') return provider.removePage(requireString(input, 'pageId'))
  if (pageAction === 'reorder' && Array.isArray(input.pageIds)) return provider.reorderPages(input.pageIds as string[])
  if (pageAction === 'update') return provider.updatePage(requireString(input, 'pageId'), readPageInput(input))
  throw new Error('vbi_resource.pageAction must be create, remove, reorder, or update')
}

const readPageInput = (input: Record<string, unknown>): ReportPageInput => ({
  chartId: readString(input, 'chartId'),
  insightId: readString(input, 'insightId'),
  title: readString(input, 'title'),
})
