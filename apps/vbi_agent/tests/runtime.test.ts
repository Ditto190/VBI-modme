import { describe, expect, test } from 'vitest'
import { createAgentRuntime } from '../src/agent/runtime.js'
import { createToolKit } from '../src/agent/tools/tool.js'
import type { AgentTool, ModelProvider, ModelTurnResult } from '../src/agent/types.js'

const createModel = (...turns: ModelTurnResult[]): ModelProvider => {
  const queue = [...turns]
  return {
    streamTurn: async ({ handlers }) => {
      handlers?.onTextDelta?.('delta')
      const next = queue.shift()
      if (!next) throw new Error('no scripted turn left')
      return next
    },
  }
}

const createFakeTool = () => {
  const calls: Record<string, unknown>[] = []
  const agentTool: AgentTool = {
    definition: { description: 'demo', inputSchema: { type: 'object' }, name: 'bash' },
    execute: async (input) => {
      calls.push(input)
      return { content: JSON.stringify({ ok: true }), summary: 'bash succeeded' }
    },
  }
  const tool = createToolKit([agentTool])
  return { calls, tool }
}

describe('createAgentRuntime', () => {
  test('dispatches tool calls by name', async () => {
    const { calls, tool } = createFakeTool()
    const result = await tool.execute({
      arguments: { command: 'pwd' },
      id: '1',
      name: 'bash',
      rawArguments: '{"command":"pwd"}',
    })
    expect(calls).toEqual([{ command: 'pwd' }])
    expect(result.summary).toBe('bash succeeded')
  })

  test('runs tool calls before final response', async () => {
    const { calls, tool } = createFakeTool()
    const runtime = createAgentRuntime({
      model: createModel(
        {
          assistant: {
            content: 'run ls',
            role: 'assistant',
            toolCalls: [{ arguments: '{"command":"ls"}', id: '1', name: 'bash' }],
          },
          outcome: {
            calls: [{ arguments: { command: 'ls' }, id: '1', name: 'bash', rawArguments: '{"command":"ls"}' }],
            type: 'tool',
          },
        },
        { assistant: { content: 'done', role: 'assistant' }, outcome: { content: 'done', type: 'final' } },
      ),
      tool,
    })
    await runtime.start('list files')
    expect(calls).toEqual([{ command: 'ls' }])
    expect(runtime.getState().activities.at(-1)?.text).toBe('done')
  })

  test('runs risky-looking commands without manual approval', async () => {
    const { calls, tool } = createFakeTool()
    const runtime = createAgentRuntime({
      model: createModel(
        {
          assistant: {
            content: 'dangerous',
            role: 'assistant',
            toolCalls: [{ arguments: '{"command":"rm -rf tmp"}', id: '1', name: 'bash' }],
          },
          outcome: {
            calls: [
              { arguments: { command: 'rm -rf tmp' }, id: '1', name: 'bash', rawArguments: '{"command":"rm -rf tmp"}' },
            ],
            type: 'tool',
          },
        },
        { assistant: { content: 'ok, done', role: 'assistant' }, outcome: { content: 'ok, done', type: 'final' } },
      ),
      tool,
    })
    await runtime.start('clean up')
    expect(calls).toEqual([{ command: 'rm -rf tmp' }])
    expect(runtime.getState().activities.at(-1)?.text).toBe('ok, done')
  })

  test('runs multiple tool calls from one model turn', async () => {
    const { calls, tool } = createFakeTool()
    const runtime = createAgentRuntime({
      model: createModel(
        {
          assistant: {
            content: 'inspect project',
            role: 'assistant',
            toolCalls: [
              { arguments: '{"command":"pwd"}', id: '1', name: 'bash' },
              { arguments: '{"command":"ls"}', id: '2', name: 'bash' },
            ],
          },
          outcome: {
            calls: [
              { arguments: { command: 'pwd' }, id: '1', name: 'bash', rawArguments: '{"command":"pwd"}' },
              { arguments: { command: 'ls' }, id: '2', name: 'bash', rawArguments: '{"command":"ls"}' },
            ],
            type: 'tool',
          },
        },
        { assistant: { content: 'done', role: 'assistant' }, outcome: { content: 'done', type: 'final' } },
      ),
      tool,
    })
    await runtime.start('inspect')
    expect(calls).toEqual([{ command: 'pwd' }, { command: 'ls' }])
    expect(runtime.getState().activities.filter((activity) => activity.kind === 'tool')).toHaveLength(2)
  })

  test('returns tool error messages to the model when execution fails', async () => {
    const historyRoles: string[][] = []
    const agentTool: AgentTool = {
      definition: { description: 'demo', inputSchema: { type: 'object' }, name: 'bash' },
      execute: async () => {
        throw new Error('command failed')
      },
    }
    const runtime = createAgentRuntime({
      model: {
        streamTurn: async ({ history }) => {
          historyRoles.push(history.map((entry) => entry.role))
          if (historyRoles.length === 1) {
            return {
              assistant: {
                content: 'run command',
                role: 'assistant',
                toolCalls: [{ arguments: '{"command":"bad"}', id: '1', name: 'bash' }],
              },
              outcome: {
                calls: [{ arguments: { command: 'bad' }, id: '1', name: 'bash', rawArguments: '{"command":"bad"}' }],
                type: 'tool',
              },
            }
          }
          expect(history.at(-1)).toMatchObject({
            content: JSON.stringify({ error: 'command failed', ok: false, tool: 'bash' }),
            role: 'tool',
            toolCallId: '1',
          })
          return {
            assistant: { content: 'handled failure', role: 'assistant' },
            outcome: { content: 'handled failure', type: 'final' },
          }
        },
      },
      tool: createToolKit([agentTool]),
    })
    await runtime.start('run bad command')
    expect(historyRoles).toEqual([
      ['system', 'user'],
      ['system', 'user', 'assistant', 'tool'],
    ])
    expect(runtime.getState().activities.map((activity) => activity.text)).toContain('bash failed')
    expect(runtime.getState().activities.at(-1)?.text).toBe('handled failure')
  })

  test('keeps reasoning content during a tool-call loop', async () => {
    const { tool } = createFakeTool()
    const runtime = createAgentRuntime({
      model: {
        streamTurn: async ({ history }) => {
          if (history.length === 2) {
            return {
              assistant: {
                content: '',
                reasoningContent: 'need to inspect files',
                role: 'assistant',
                toolCalls: [{ arguments: '{"command":"ls"}', id: '1', name: 'bash' }],
              },
              outcome: {
                calls: [{ arguments: { command: 'ls' }, id: '1', name: 'bash', rawArguments: '{"command":"ls"}' }],
                type: 'tool',
              },
            }
          }
          expect(history.at(-2)).toMatchObject({
            reasoningContent: 'need to inspect files',
            role: 'assistant',
          })
          return { assistant: { content: 'done', role: 'assistant' }, outcome: { content: 'done', type: 'final' } }
        },
      },
      tool,
    })
    await runtime.start('inspect')
    expect(runtime.getState().activities.at(-1)?.text).toBe('done')
  })

  test('supports follow-up turns with preserved history', async () => {
    const historySizes: number[] = []
    const runtime = createAgentRuntime({
      model: {
        streamTurn: async ({ history }) => {
          historySizes.push(history.length)
          return {
            assistant: { content: `turn ${historySizes.length}`, role: 'assistant' },
            outcome: { content: `turn ${historySizes.length}`, type: 'final' },
          }
        },
      },
      tool: createToolKit([]),
    })
    await runtime.start('first turn')
    await runtime.start('second turn')
    expect(historySizes).toEqual([2, 4])
    expect(
      runtime
        .getState()
        .activities.filter((activity) => activity.kind === 'user')
        .map((activity) => activity.text),
    ).toEqual(['first turn', 'second turn'])
  })

  test('preserves reasoning content across follow-up user turns', async () => {
    const previousReasoning: Array<string | undefined> = []
    const runtime = createAgentRuntime({
      model: {
        streamTurn: async ({ history }) => {
          previousReasoning.push(history.find((entry) => entry.role === 'assistant')?.reasoningContent)
          return {
            assistant: {
              content: `turn ${previousReasoning.length}`,
              reasoningContent: 'private turn reasoning',
              role: 'assistant',
            },
            outcome: { content: `turn ${previousReasoning.length}`, type: 'final' },
          }
        },
      },
      tool: createToolKit([]),
    })
    await runtime.start('first turn')
    await runtime.start('second turn')
    expect(previousReasoning).toEqual([undefined, 'private turn reasoning'])
  })
})
