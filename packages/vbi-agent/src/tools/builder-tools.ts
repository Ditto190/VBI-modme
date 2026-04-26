import { executeAgentScript } from '../script/runtime.js'
import type { AgentTool, VBIAgentWorkspace } from '../types.js'
import { howToUseVbiBuilderContent } from './how-to-use-vbi-builder-content.js'
import { clipText, stringifyJson } from './shared.js'

const outputLimit = 12000

export const createBuilderTools = (workspace: VBIAgentWorkspace): AgentTool[] => [
  {
    definition: {
      description:
        'Run JavaScript against the injected VBI Builder workspace. Globals: workspace, chart, report, json, assert, console. Use chart.open(id?) or report.open(id?) to open builders; if no startup id was provided, pass a resource id found with vbi_resource.',
      inputSchema: {
        additionalProperties: false,
        properties: {
          code: { type: 'string' },
        },
        required: ['code'],
        type: 'object',
      },
      name: 'vbi_builder',
    },
    execute: async (input) => {
      if (typeof input.code !== 'string' || !input.code.trim()) throw new Error('vbi_builder.code is required')
      const result = await executeAgentScript({
        code: input.code,
        globals: {
          chart: workspace.chart,
          report: workspace.report,
          workspace,
        },
      })
      const content = clipText(stringifyJson({ logs: result.logs, result: result.result ?? null }), outputLimit)
      return {
        content,
        display: content,
        summary: `vbi_builder executed (${result.logs.length} logs)`,
      }
    },
  },
  {
    definition: {
      description:
        'Return a concise guide for the vbi_builder tool: runtime globals, Chart/Report builder APIs, encodings, filters, and examples. Call this once before writing vbi_builder scripts.',
      inputSchema: {
        additionalProperties: false,
        properties: {},
        type: 'object',
      },
      name: 'how_to_use_vbi_builder',
    },
    execute: async () => ({
      content: howToUseVbiBuilderContent,
      display: howToUseVbiBuilderContent,
      summary: 'vbi builder teaching guide returned',
    }),
  },
]
