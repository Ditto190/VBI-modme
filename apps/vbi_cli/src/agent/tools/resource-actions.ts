import { executeCommonResourceAction } from './resource-common.js'
import { readString, requireString } from './resource-input.js'
import type { InsightUpdateInput, ReportPageInput, VBIProviderClient } from '@visactor/headless-bi-provider'
import type { Resource, ResourceInput } from '../../types/index.js'

const readResource = (input: ResourceInput): Resource => {
  const value = input.resource
  if (value === 'chart' || value === 'insight' || value === 'report') return value
  throw new Error('vbi_resource.resource must be chart, insight, or report')
}

const readPageInput = (input: ResourceInput): ReportPageInput => ({
  chartId: readString(input, 'chartId'),
  insightId: readString(input, 'insightId'),
  title: readString(input, 'title'),
})

const createInput = (resource: Resource, input: ResourceInput) => {
  const base = readString(input, 'name') ? { name: readString(input, 'name') } : {}
  return resource === 'insight' ? { ...base, content: readString(input, 'content') } : base
}

const listResources = (client: VBIProviderClient, resource: Resource) =>
  ({ chart: client.listCharts, insight: client.listInsights, report: client.listReports })[resource].call(client)

const executeChartAction = (client: VBIProviderClient, action: string, input: ResourceInput) => {
  const chart = client.chart(readString(input, 'id'))
  return executeCommonResourceAction(chart, action, input, createInput('chart', input), () => chart.getReferences())
}

const executeInsightAction = (client: VBIProviderClient, action: string, input: ResourceInput) => {
  const insight = client.insight(readString(input, 'id'))
  return executeCommonResourceAction(insight, action, input, createInput('insight', input), () =>
    insight.getReferences(),
  )
}

const executeReportAction = (client: VBIProviderClient, action: string, input: ResourceInput) => {
  const report = client.report(readString(input, 'id'))
  return executeCommonResourceAction(report, action, input, createInput('report', input), () => report.exportSnapshot())
}

const executeResourceAction = (client: VBIProviderClient, input: ResourceInput) => {
  const resource = readResource(input)
  const action = requireString(input, 'action')
  if (action === 'list') return listResources(client, resource)
  if (resource === 'chart') return executeChartAction(client, action, input)
  if (resource === 'insight') return executeInsightAction(client, action, input)
  return executeReportAction(client, action, input)
}

const executeInsightUpdate = (client: VBIProviderClient, input: ResourceInput) =>
  client.insight(requireString(input, 'id')).update({
    ...(readString(input, 'content') ? { content: readString(input, 'content') } : {}),
    ...(readString(input, 'name') ? { name: readString(input, 'name') } : {}),
  } satisfies InsightUpdateInput)

const executeReportPageAction = (client: VBIProviderClient, input: ResourceInput) => {
  const report = client.report(requireString(input, 'id'))
  const pageAction = requireString(input, 'pageAction')
  if (pageAction === 'create') return report.createPage({ title: readString(input, 'title') })
  if (pageAction === 'remove') return report.removePage(requireString(input, 'pageId'))
  if (pageAction === 'reorder' && Array.isArray(input.pageIds)) return report.reorderPages(input.pageIds as string[])
  if (pageAction === 'update') return report.updatePage(requireString(input, 'pageId'), readPageInput(input))
  throw new Error('vbi_resource.pageAction must be create, remove, reorder, or update')
}

export const executeCliResourceAction = (client: VBIProviderClient, input: ResourceInput) => {
  if (input.action === 'update' && input.resource === 'insight') return executeInsightUpdate(client, input)
  if (input.action === 'page' && input.resource === 'report') return executeReportPageAction(client, input)
  return executeResourceAction(client, input)
}
