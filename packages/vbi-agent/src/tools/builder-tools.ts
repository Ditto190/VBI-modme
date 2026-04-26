import { jsonSchema } from 'ai'
import { executeAgentScript } from '../script/runtime.js'
import type { AgentTool, VBIAgentWorkspace } from '../types.js'
import { createBuiltinSkillTools, renderBuiltinSkill } from './skill-tools.js'
import { clipText, stringifyJson } from './shared.js'

const outputLimit = 12000

export const createBuilderTools = (workspace: VBIAgentWorkspace): AgentTool[] => [
  {
    name: 'vbi_builder',
    descriptor: {
      description:
        'Run JavaScript against the injected VBI Builder workspace. Globals: workspace, chart, report, json, assert, console. Use chart.open(id?) or report.open(id?) to open builders; if no startup id was provided, pass a resource id found with vbi_resource.',
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
        display: content,
        summary: `vbi_builder executed (${result.logs.length} logs)`,
      }
    },
  },
  ...createBuiltinSkillTools(),
  {
    name: 'how_to_use_vbi_builder',
    descriptor: {
      description:
        'Return the vbi-builder builtin skill. Pass references to include selected reference files before writing vbi_builder scripts.',
      inputSchema: jsonSchema({
        additionalProperties: false,
        properties: {
          references: { items: { type: 'string' }, type: 'array' },
        },
        type: 'object',
      }),
      strict: true,
    },
    execute: async (input) => {
      const content = renderBuiltinSkill('vbi-builder', input.references)
      return { content, display: content, summary: 'vbi builder skill returned' }
    },
  },
]
