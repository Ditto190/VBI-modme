import { jsonSchema } from 'ai'
import { executeAgentScript } from '../script/runtime.js'
import { clipText, stringifyJson } from '../text-format.js'
import type { AgentTool, VBIAgentWorkspace } from '../types.js'

const outputLimit = 12000

const createDisplay = (results: Record<string, unknown>[]) =>
  ['Status: succeeded', '', 'Experiments:', '```json', clipText(stringifyJson(results), outputLimit), '```'].join('\n')

export const createExperimentTool = (workspace: VBIAgentWorkspace): AgentTool => ({
  name: 'vbi_experiment',
  descriptor: {
    description:
      'Run a batch of hypothesis experiments against the injected VBI Builder workspace. Each experiment receives workspace, chart, report, experiment, json, assert, console.',
    inputSchema: jsonSchema({
      additionalProperties: false,
      properties: {
        experiments: {
          items: {
            additionalProperties: false,
            properties: { code: { type: 'string' }, goal: { type: 'string' }, hypothesis: { type: 'string' } },
            required: ['hypothesis', 'code'],
            type: 'object',
          },
          minItems: 1,
          type: 'array',
        },
      },
      required: ['experiments'],
      type: 'object',
    }),
    strict: true,
  },
  execute: async (input) => {
    if (!Array.isArray(input.experiments) || input.experiments.length === 0) {
      throw new Error('vbi_experiment.experiments is required')
    }
    const results: Record<string, unknown>[] = []
    for (const [index, value] of input.experiments.entries()) {
      const experiment = value as Record<string, unknown>
      try {
        const executed = await executeAgentScript({
          code: String(experiment.code),
          globals: { chart: workspace.chart, experiment, report: workspace.report, workspace },
        })
        results.push({
          goal: experiment.goal,
          hypothesis: experiment.hypothesis,
          index,
          logs: executed.logs,
          result: executed.result ?? null,
          status: 'succeeded',
        })
      } catch (error) {
        results.push({
          error: error instanceof Error ? error.message : String(error),
          goal: experiment.goal,
          hypothesis: experiment.hypothesis,
          index,
          status: 'failed',
        })
      }
    }
    const failed = results.filter((item) => item.status === 'failed').length
    const succeeded = results.length - failed
    return {
      content: clipText(stringifyJson({ results }), outputLimit),
      display: createDisplay(results),
      summary: `vbi_experiment finished: ${succeeded} succeeded, ${failed} failed`,
    }
  },
})
