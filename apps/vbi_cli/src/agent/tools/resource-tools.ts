import { jsonSchema, type AgentTool } from '@visactor/vbi-agent'
import type { InsightUpdateInput, ReportPageInput, VBIProviderClient } from '@visactor/headless-bi-provider'

const stringifyJson = (value: unknown) => JSON.stringify(value, null, 2)

const readString = (input: Record<string, unknown>, key: string) =>
  typeof input[key] === 'string' && input[key].trim() ? input[key] : undefined

const requireString = (input: Record<string, unknown>, key: string) => {
  const value = readString(input, key)
  if (!value) throw new Error(`vbi_resource.${key} is required`)
  return value
}

const readResource = (input: Record<string, unknown>) => {
  const value = input.resource
  if (value === 'chart' || value === 'insight' || value === 'report') return value
  throw new Error('vbi_resource.resource must be chart, insight, or report')
}

const executeAction = (client: VBIProviderClient, input: Record<string, unknown>) => {
  const action = requireString(input, 'action')
  const resource = readResource(input)
  const id = readString(input, 'id')

  if (action === 'list') {
    if (resource === 'chart') return client.listCharts()
    if (resource === 'insight') return client.listInsights()
    return client.listReports()
  }

  const provider =
    resource === 'chart' ? client.chart(id) : resource === 'insight' ? client.insight(id) : client.report(id)

  if (action === 'create') {
    const input_ = readString(input, 'name') ? { name: readString(input, 'name') } : {}
    return provider.create(resource === 'insight' ? { ...input_, content: readString(input, 'content') } : input_)
  }
  if (action === 'get') return provider.getDetail()
  if (action === 'rename') return provider.rename(requireString(input, 'name'))
  if (action === 'remove') return provider.remove()
  if (action === 'snapshot') return provider.snapshot()
  return resource === 'report' ? provider.exportSnapshot() : provider.getReferences()
}

const executeInsightUpdate = (client: VBIProviderClient, input: Record<string, unknown>) =>
  client.insight(requireString(input, 'id')).update({
    ...(readString(input, 'content') ? { content: readString(input, 'content') } : {}),
    ...(readString(input, 'name') ? { name: readString(input, 'name') } : {}),
  } satisfies InsightUpdateInput)

const executeReportPageAction = (client: VBIProviderClient, input: Record<string, unknown>) => {
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

const executeCliResourceAction = async (client: VBIProviderClient, input: Record<string, unknown>) => {
  const action = readString(input, 'action')
  if (action === 'update' && input.resource === 'insight') return executeInsightUpdate(client, input)
  if (action === 'page' && input.resource === 'report') return executeReportPageAction(client, input)
  return executeAction(client, input)
}

export const createResourceTools = (client: VBIProviderClient): AgentTool[] => [
  {
    name: 'vbi_resource',
    descriptor: {
      description:
        'Manage VBI platform resources. Supports resource actions list/create/get/rename/remove/snapshot/references for chart, insight, and report. Also supports insight update and report page operations.',
      inputSchema: jsonSchema({
        additionalProperties: true,
        properties: {
          action: { type: 'string' },
          chartId: { type: 'string' },
          content: { type: 'string' },
          id: { type: 'string' },
          insightId: { type: 'string' },
          name: { type: 'string' },
          pageAction: { type: 'string' },
          pageId: { type: 'string' },
          pageIds: { items: { type: 'string' }, type: 'array' },
          resource: { enum: ['chart', 'insight', 'report'], type: 'string' },
          title: { type: 'string' },
        },
        required: ['action', 'resource'],
        type: 'object',
      }),
      strict: false,
    },
    execute: async (input) => {
      const result = await executeCliResourceAction(client, input)
      return {
        content: stringifyJson(result),
        display: stringifyJson(result),
        summary: `vbi_resource ${input.resource}.${input.action} completed`,
      }
    },
  },
]
