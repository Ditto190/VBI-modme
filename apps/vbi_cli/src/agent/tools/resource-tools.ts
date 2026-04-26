import type { AgentTool } from '@visactor/vbi-agent'
import type { VBIProviderClient } from '@visactor/headless-bi-provider'
import { executeInsightUpdate, executeReportPageAction, executeResourceAction } from './resource-actions.js'
import { readString, stringifyJson } from './resource-readers.js'

const inputSchema = {
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
}

const executeCliResourceAction = async (client: VBIProviderClient, input: Record<string, unknown>) => {
  const action = readString(input, 'action')
  if (action === 'update' && input.resource === 'insight') return executeInsightUpdate(client, input)
  if (action === 'page' && input.resource === 'report') return executeReportPageAction(client, input)
  return executeResourceAction(client, input)
}

export const createResourceTools = (client: VBIProviderClient): AgentTool[] => [
  {
    definition: {
      description:
        'Manage VBI platform resources. Supports resource actions list/create/get/rename/remove/snapshot/references for chart, insight, and report. Also supports insight update and report page operations.',
      inputSchema,
      name: 'vbi_resource',
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
