import { jsonSchema } from 'ai'
import type { AgentTool, VBIAgentWorkspace } from '../types.js'
import { createExperimentTool } from './experiment-tool.js'
import { createBuiltinSkillTools } from './skill-tools.js'
import { clipJson, clipOutput, describeScriptResult, pluralize, runWorkspaceScript } from './workspace-script.js'

const formatBuilderDisplay = (logs: string[], result: unknown) =>
  [
    'Status: succeeded',
    `Logs: ${logs.length ? pluralize(logs.length, 'entry') : 'none'}`,
    ...(logs.length ? ['', 'Log output:', '```text', clipOutput(logs.join('\n')), '```'] : []),
    '',
    'Result:',
    '```json',
    clipJson(result ?? null),
    '```',
  ].join('\n')

export const createBuilderTools = (workspace: VBIAgentWorkspace): AgentTool[] => [
  {
    name: 'vbi_builder',
    descriptor: {
      description:
        'Run JavaScript against the injected VBI Builder workspace. Globals: workspace, chart, report, json, assert, console. Use chart.open(id?) or report.open(id?) to open builders; use chart.snapshot(id?) or report.snapshot(id?) to read current DSL snapshots; use workspace.connectors when builder APIs need connector registration such as builder.getSchema(); if no startup id was provided, pass a resource id found with vbi_resource.',
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
      const result = await runWorkspaceScript(workspace, input.code)
      const content = clipJson({ logs: result.logs, result: result.result ?? null })
      return {
        content,
        display: formatBuilderDisplay(result.logs, result.result),
        summary: `vbi_builder succeeded: ${pluralize(result.logs.length, 'log')}, ${describeScriptResult(result.result)}`,
      }
    },
  },
  createExperimentTool(workspace),
  ...createBuiltinSkillTools(),
]
