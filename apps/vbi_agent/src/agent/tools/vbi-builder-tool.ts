import { clipText, stringifyJson } from './shared.js'
import { executeInWorker } from './vbi-builder-worker.js'
import type { AgentTool } from '../types.js'

const outputLimit = 12000

export const createVbiBuilderTool = (timeoutMs = 30000): AgentTool => ({
  definition: {
    description:
      'Run JavaScript against VBI providers. Globals: client, resource, resourceId, json, assert, console. Open a provider and call Builder APIs directly. Example: const provider = client.chart(resourceId); const builder = await provider.open(); builder.chartType.changeChartType("line"); builder.dimensions.add("area", n => n.setEncoding("xAxis")); return json({ chartType: builder.chartType.getChartType(), dsl: builder.build() }); Providers auto-close after the script returns.',
    inputSchema: {
      additionalProperties: false,
      properties: {
        code: { type: 'string' },
        resource: { enum: ['chart', 'insight', 'report'], type: 'string' },
        resourceId: { type: 'string' },
      },
      required: ['code'],
      type: 'object',
    },
    name: 'vbi_builder',
  },
  execute: async (input) => {
    const result = await executeInWorker({
      code: input.code as string,
      resource: input.resource as string | undefined,
      resourceId: input.resourceId as string | undefined,
      timeoutMs,
    })
    if (!result.ok) throw new Error(result.error || 'vbi_builder failed')
    const content = clipText(stringifyJson({ logs: result.logs ?? [], result: result.result ?? null }), outputLimit)
    return {
      content,
      display: content,
      summary: `vbi_builder executed (${(result.logs ?? []).length} logs)`,
    }
  },
})
