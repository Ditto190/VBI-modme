import { describe, expect, rs, test } from '@rstest/core'
import { VBI } from '@visactor/vbi'
import { createVBIProviderWorkspace } from '@visactor/headless-bi-provider'
import { createAgentRuntime, createBuilderTools, createToolKit } from '@visactor/vbi-agent'
import { runPromptAgent } from '../src/cli-runner.js'
import type { AgentRuntimeController, ModelProvider } from '@visactor/vbi-agent'

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
    const workspace = createVBIProviderWorkspace({ client: client as never })
    const runtime = createAgentRuntime({
      model: createChartTypeModel(),
      tool: createToolKit(createBuilderTools(workspace)),
    })
    const output: string[] = []

    const code = await runPromptAgent(runtime, '查询Chart1的图表类型', { writeOutput: (text) => output.push(text) })

    expect(code).toBe(0)
    expect(output).toHaveLength(5)
    expect(output[0]).toBe('[user] 查询Chart1的图表类型')
    expect(output[1]).toContain('[assistant] 查询 Chart1')
    expect(output[2]).toContain('[tool]')
    expect(output[3]).toBe('[assistant] Chart1 的图表类型是 line')
    expect(output[4]).toBe('执行成功')
    expect(client.chart).toHaveBeenCalledWith('Chart1')
    expect(runtime.getState().activities.map((activity) => activity.kind)).toEqual([
      'user',
      'assistant',
      'tool',
      'assistant',
    ])
  })

  test('reports runtime failures without throwing', async () => {
    const runtime = {
      getState: () => ({ activities: [] }),
      start: rs.fn(async () => {
        throw new Error('Chart Chart1 not found')
      }),
      subscribe: rs.fn(() => () => undefined),
    } as unknown as AgentRuntimeController
    const errors: string[] = []

    const code = await runPromptAgent(runtime, '查询Chart1的图表类型', { writeError: (text) => errors.push(text) })

    expect(code).toBe(1)
    expect(errors).toEqual(['执行失败: Chart Chart1 not found'])
  })
})
