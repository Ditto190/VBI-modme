import { jsonSchema } from 'ai'
import { executeAgentScript } from '../script/runtime.js'
import { clipText, stringifyJson } from '../text-format.js'
import type { AgentTool, VBIAgentWorkspace } from '../types.js'
import { createExperimentTool } from './experiment-tool.js'
import { createBuiltinSkillTools } from './skill-tools.js'

const outputLimit = 12000

const pluralize = (count: number, name: string) => `${count} ${name}${count === 1 ? '' : 's'}`

const describeResult = (value: unknown) => {
  if (value === null || value === undefined) return 'null result'
  if (Array.isArray(value)) return `array result (${value.length} items)`
  return `${typeof value} result`
}

const formatBuilderDisplay = (logs: string[], result: unknown) =>
  [
    'Status: succeeded',
    `Logs: ${logs.length ? pluralize(logs.length, 'entry') : 'none'}`,
    ...(logs.length ? ['', 'Log output:', '```text', clipText(logs.join('\n'), outputLimit), '```'] : []),
    '',
    'Result:',
    '```json',
    clipText(stringifyJson(result ?? null), outputLimit),
    '```',
  ].join('\n')

export const createBuilderTools = (workspace: VBIAgentWorkspace): AgentTool[] => [
  {
    name: 'vbi_builder',
    descriptor: {
      description:
        'Run JavaScript against the injected VBI Builder workspace. Globals: workspace, chart, report, json, assert, console. Use chart.open(id?) or report.open(id?) to open builders; use workspace.connectors when builder APIs need connector registration such as builder.getSchema(); if no startup id was provided, pass a resource id found with vbi_resource.',
      inputSchema: jsonSchema({
        additionalProperties: false,
        properties: {
          code: { type: 'string' },
        },
        required: ['code'],
        type: 'object',
      }),
      strict: true,
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
        display: formatBuilderDisplay(result.logs, result.result),
        summary: `vbi_builder succeeded: ${pluralize(result.logs.length, 'log')}, ${describeResult(result.result)}`,
      }
    },
  },
  createExperimentTool(workspace),
  ...createBuiltinSkillTools(),
]
