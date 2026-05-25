import { Type, type TSchema } from 'typebox'
import type {
  ChartProvider,
  InsightCreateInput,
  InsightProvider,
  ReportPageInput,
  ReportProvider,
  ResourceCreateInput,
  VBIProviderClient,
} from '../types'

type VBIResource = 'chart' | 'insight' | 'report'
type VBIResourceInput = Record<string, unknown>

type VBIProviderAgentToolResult = {
  content: Array<{ text: string; type: 'text' }>
  details: { display: string; summary: string }
}

export type VBIProviderAgentTool = {
  description: string
  execute(toolCallId: string, input: unknown): Promise<VBIProviderAgentToolResult>
  label: string
  name: string
  parameters: TSchema
}

const standardActions = 'list, create, get, rename, remove, references, exportSnapshot, or page'

const stripDsl = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(stripDsl)
  if (typeof value !== 'object' || value === null) return value
  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => key !== 'dsl')
      .map(([key, entry]) => [key, stripDsl(entry)]),
  )
}

const stringifyJson = (value: unknown) => JSON.stringify(value, null, 2)

const asResourceInput = (value: unknown): VBIResourceInput => {
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) return value as VBIResourceInput
  throw new Error('vbi_resource input must be an object')
}

const readString = (input: VBIResourceInput, key: string) => {
  const value = input[key]
  return typeof value === 'string' && value ? value : undefined
}

const requireString = (input: VBIResourceInput, key: string) => {
  const value = readString(input, key)
  if (!value) throw new Error(`vbi_resource.${key} is required`)
  return value
}

const readResource = (input: VBIResourceInput): VBIResource => {
  const value = input.resource
  if (value === 'chart' || value === 'insight' || value === 'report') return value
  throw new Error('vbi_resource.resource must be chart, insight, or report')
}

const readPageInput = (input: VBIResourceInput): ReportPageInput => ({
  chartId: readString(input, 'chartId'),
  insightId: readString(input, 'insightId'),
  title: readString(input, 'title'),
})

const createInput = (resource: VBIResource, input: VBIResourceInput): ResourceCreateInput | InsightCreateInput => {
  const base = readString(input, 'name') ? { name: readString(input, 'name') } : {}
  return resource === 'insight' ? { ...base, content: readString(input, 'content') } : base
}

const executeCommonResourceAction = (
  provider: ChartProvider | InsightProvider | ReportProvider,
  action: string,
  input: VBIResourceInput,
  createValue: ResourceCreateInput | InsightCreateInput,
  fallback: () => Promise<unknown>,
) => {
  if (action === 'create') return provider.create(createValue)
  if (action === 'get') return provider.getSummary()
  if (action === 'remove') return provider.remove()
  if (action === 'rename') return provider.rename(requireString(input, 'name'))
  return fallback()
}

const executeChartAction = (client: VBIProviderClient, action: string, input: VBIResourceInput) => {
  const chart = client.chart(readString(input, 'id'))
  return executeCommonResourceAction(chart, action, input, createInput('chart', input), () => {
    if (action === 'references') return chart.getReferences()
    throw new Error(`vbi_resource.action must be ${standardActions}`)
  })
}

const executeInsightAction = (client: VBIProviderClient, action: string, input: VBIResourceInput) => {
  const insight = client.insight(readString(input, 'id'))
  return executeCommonResourceAction(insight, action, input, createInput('insight', input), () => {
    if (action === 'references') return insight.getReferences()
    throw new Error(`vbi_resource.action must be ${standardActions}`)
  })
}

const executeReportAction = (client: VBIProviderClient, action: string, input: VBIResourceInput) => {
  const report = client.report(readString(input, 'id'))
  return executeCommonResourceAction(report, action, input, createInput('report', input), () => {
    if (action === 'exportSnapshot') return report.exportSnapshot()
    throw new Error(`vbi_resource.action must be ${standardActions}`)
  })
}

const executeStandardResourceAction = (client: VBIProviderClient, input: VBIResourceInput) => {
  const resource = readResource(input)
  const action = requireString(input, 'action')
  if (action === 'list') {
    return { chart: client.listCharts, insight: client.listInsights, report: client.listReports }[resource].call(client)
  }
  if (resource === 'chart') return executeChartAction(client, action, input)
  if (resource === 'insight') return executeInsightAction(client, action, input)
  return executeReportAction(client, action, input)
}

const executeReportPageAction = (client: VBIProviderClient, input: VBIResourceInput) => {
  const report = client.report(requireString(input, 'id'))
  const pageAction = requireString(input, 'pageAction')
  if (pageAction === 'create') return report.createPage({ title: readString(input, 'title') })
  if (pageAction === 'remove') return report.removePage(requireString(input, 'pageId'))
  if (pageAction === 'reorder' && Array.isArray(input.pageIds)) return report.reorderPages(input.pageIds as string[])
  if (pageAction === 'update') return report.updatePage(requireString(input, 'pageId'), readPageInput(input))
  throw new Error('vbi_resource.pageAction must be create, remove, reorder, or update')
}

const executeVBIProviderResourceAction = (client: VBIProviderClient, input: VBIResourceInput) => {
  if (input.action === 'page' && input.resource === 'report') return executeReportPageAction(client, input)
  return executeStandardResourceAction(client, input)
}

const createVBIResourceInputSchema = () =>
  Type.Object(
    {
      action: Type.Union([
        Type.Literal('create'),
        Type.Literal('exportSnapshot'),
        Type.Literal('get'),
        Type.Literal('list'),
        Type.Literal('page'),
        Type.Literal('references'),
        Type.Literal('remove'),
        Type.Literal('rename'),
      ]),
      chartId: Type.Optional(Type.String()),
      content: Type.Optional(Type.String()),
      id: Type.Optional(Type.String()),
      insightId: Type.Optional(Type.String()),
      name: Type.Optional(Type.String()),
      pageAction: Type.Optional(Type.String()),
      pageId: Type.Optional(Type.String()),
      pageIds: Type.Optional(Type.Array(Type.String())),
      resource: Type.Union([Type.Literal('chart'), Type.Literal('insight'), Type.Literal('report')]),
      title: Type.Optional(Type.String()),
    },
    { additionalProperties: true },
  )

export const createVBIProviderResourceTools = (client: VBIProviderClient): VBIProviderAgentTool[] => [
  {
    description:
      'Discover and manage VBI provider resources. Examples: list charts with { "resource": "chart", "action": "list" }; list reports with { "resource": "report", "action": "list" }; read metadata with { "resource": "chart", "action": "get", "id": "..." }. Supports list/create/get/rename/remove for chart, insight, and report, references for chart and insight, report page operations, and report exportSnapshot. To inspect or mutate DSL, use vbi_chart_builder with chart.open/chart.snapshot, vbi_insight_builder with insight.open/insight.snapshot, or vbi_report_builder with report.open/report.snapshot.',
    execute: async (_toolCallId, input) => {
      const params = asResourceInput(input)
      const result = stripDsl(await executeVBIProviderResourceAction(client, params))
      const content = stringifyJson(result)
      return {
        content: [{ text: content, type: 'text' }],
        details: {
          display: content,
          summary: `vbi_resource ${params.resource}.${params.action} completed`,
        },
      }
    },
    label: 'VBI Resource',
    name: 'vbi_resource',
    parameters: createVBIResourceInputSchema(),
  },
]
