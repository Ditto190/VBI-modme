import { describe, expect, test } from '@rstest/core'
import { VBI } from '@visactor/vbi'
import { createBuilderWorkspace, VBIAgent } from '@visactor/vbi-agent'
import { runPromptAgent } from '../src/cli-runner.js'
import type { AgentOptions, StreamFn } from '@visactor/vbi-agent'

const usage = {
  cacheRead: 0,
  cacheWrite: 0,
  cost: { cacheRead: 0, cacheWrite: 0, input: 0, output: 0, total: 0 },
  input: 0,
  output: 0,
  totalTokens: 0,
}

type InitialState = NonNullable<AgentOptions['initialState']>

const model = {
  api: 'openai-completions',
  baseUrl: '',
  contextWindow: 1000,
  cost: { cacheRead: 0, cacheWrite: 0, input: 0, output: 0 },
  id: 'test-model',
  input: ['text'],
  maxTokens: 1000,
  name: 'Test Model',
  provider: 'test',
  reasoning: false,
} as Exclude<InitialState['model'], undefined>

type ScriptedAssistantMessage = {
  stopReason: 'stop' | 'toolUse'
}

const assistantMessage = (content: unknown[], stopReason: 'stop' | 'toolUse' = 'stop'): ScriptedAssistantMessage =>
  ({
    api: model.api,
    content,
    model: model.id,
    provider: model.provider,
    role: 'assistant',
    stopReason,
    timestamp: Date.now(),
    usage,
  }) as unknown as ScriptedAssistantMessage

const createStreamResult = (message: ScriptedAssistantMessage) =>
  ({
    async *[Symbol.asyncIterator]() {
      yield { message, reason: message.stopReason, type: 'done' }
    },
    result: async () => message,
  }) as unknown as ReturnType<StreamFn>

const chartTypeScript = [
  "const builder = await chart.open('Chart1')",
  'return json({ chartType: builder.chartType.getChartType() })',
].join('\n')

const createChartTypeOptions = () => {
  const messages = [
    assistantMessage(
      [
        { text: '查询 Chart1', type: 'text' },
        {
          arguments: { code: chartTypeScript },
          id: 'call-1',
          name: 'vbi_chart_builder',
          type: 'toolCall',
        },
      ],
      'toolUse',
    ),
    assistantMessage([{ text: 'Chart1 的图表类型是 line', type: 'text' }]),
  ]
  const streamFn: StreamFn = () => {
    const message = messages.shift()
    if (!message) throw new Error('no scripted assistant message left')
    return createStreamResult(message)
  }
  return { initialState: { model }, streamFn } satisfies AgentOptions & { initialState: { model: typeof model } }
}

describe('runPromptAgent', () => {
  test('runs a no-TUI prompt through Pi Agent and builder tool events', async () => {
    const builder = VBI.chart.create(VBI.chart.createEmpty('demo'))
    builder.chartType.changeChartType('line')
    const workspace = createBuilderWorkspace({ chart: builder })
    const agent = new VBIAgent(createChartTypeOptions(), workspace)
    const output: string[] = []

    const code = await runPromptAgent(agent, '查询Chart1的图表类型', { writeOutput: (text) => output.push(text) })

    expect(code).toBe(0)
    expect(output[0]).toBe('[user] 查询Chart1的图表类型')
    expect(output[1]).toContain('[assistant] 查询 Chart1')
    expect(output[2]).toContain('[tool] vbi_chart_builder running')
    expect(output[3]).toContain('[tool] vbi_chart_builder succeeded')
    expect(output[4]).toBe('[assistant] Chart1 的图表类型是 line')
    expect(output.at(-1)).toBe('执行成功')
    expect(agent.state.messages.map((message) => message.role)).toEqual([
      'user',
      'assistant',
      'toolResult',
      'assistant',
    ])
  })

  test('reports Pi Agent failures without throwing', async () => {
    const streamFn: StreamFn = () => {
      throw new Error('Chart Chart1 not found')
    }
    const agent = new VBIAgent({ initialState: { model }, streamFn }, {})
    const errors: string[] = []

    const code = await runPromptAgent(agent, '查询Chart1的图表类型', { writeError: (text) => errors.push(text) })

    expect(code).toBe(1)
    expect(errors).toEqual(['执行失败: Chart Chart1 not found'])
  })
})
