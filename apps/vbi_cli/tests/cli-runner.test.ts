import { describe, expect, rs, test } from '@rstest/core'
import { VBI } from '@visactor/vbi'
import { createAgentRuntime, createBuilderTools, createToolKit } from '@visactor/vbi-agent'
import { createProviderWorkspace } from '../src/agent/provider.js'
import { runPromptAgent } from '../src/cli-runner.js'
import type { ModelProvider } from '@visactor/vbi-agent'

const chartTypeScript = [
  "const builder = await chart.open('Chart1')",
  'return { chartType: builder.chartType.getChartType() }',
].join('\n')

const createChartTypeModel = (): ModelProvider => ({
  streamTurn: async ({ history }) => {
    if (history.length === 2) {
      return {
        assistant: {
          content: [
            { type: 'text', text: '查询 Chart1' },
            {
              input: {
                code: chartTypeScript,
              },
              toolCallId: 'call-1',
              toolName: 'vbi_builder',
              type: 'tool-call',
            },
          ],
          role: 'assistant',
        },
        outcome: {
          calls: [
            {
              arguments: {
                code: chartTypeScript,
              },
              id: 'call-1',
              name: 'vbi_builder',
            },
          ],
          type: 'tool',
        },
      }
    }
    return {
      assistant: { content: 'Chart1 的图表类型是 line', role: 'assistant' },
      outcome: { content: 'Chart1 的图表类型是 line', type: 'final' },
    }
  },
})

describe('runPromptAgent', () => {
  test('runs a no-TUI prompt through the real agent runtime and builder tool', async () => {
    const builder = VBI.chart.create(VBI.chart.createEmpty('demo'))
    builder.chartType.changeChartType('line')
    const client = {
      chart: rs.fn(() => ({ open: rs.fn(async () => builder) })),
      report: rs.fn(),
    }
    const workspace = createProviderWorkspace({ client: client as never })
    const runtime = createAgentRuntime({
      model: createChartTypeModel(),
      tool: createToolKit(createBuilderTools(workspace)),
    })
    const output: string[] = []

    const code = await runPromptAgent(runtime, '查询Chart1的图表类型', { writeOutput: (text) => output.push(text) })

    expect(code).toBe(0)
    expect(output).toEqual(['Chart1 的图表类型是 line', '执行成功'])
    expect(client.chart).toHaveBeenCalledWith('Chart1')
    expect(runtime.getState().activities.map((activity) => activity.kind)).toEqual([
      'user',
      'assistant',
      'tool',
      'assistant',
    ])
  })
})
