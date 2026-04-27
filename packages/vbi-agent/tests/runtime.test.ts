import { describe, expect, test } from '@rstest/core'
import { createAgentRuntime } from '../src/runtime.js'
import { createToolKit } from '../src/tools/toolkit.js'
import type { AgentTool, ModelProvider, ModelTurnResult } from '../src/types.js'

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
    name: 'bash',
    descriptor: {
      description: 'demo',
      inputSchema: { jsonSchema: { type: 'object' } },
      strict: true,
    } as AgentTool['descriptor'],
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
            content: [
              { type: 'text', text: 'run ls' },
              { type: 'tool-call', toolCallId: '1', toolName: 'bash', input: { command: 'ls' } },
            ],
            role: 'assistant',
          },
          outcome: {
            calls: [{ arguments: { command: 'ls' }, id: '1', name: 'bash' }],
            type: 'tool',
          },
        },
        { assistant: { content: 'done', role: 'assistant' }, outcome: { content: 'done', type: 'final' } },
      ),
      tool,
    })
    await runtime.start('list files')
    expect(calls).toEqual([{ command: 'ls' }])
    const assistantActivity = runtime.getState().activities.find((activity) => activity.kind === 'assistant')
    expect(assistantActivity?.text).toBe('run ls')
    expect(assistantActivity?.detail).toContain('1. bash')
    expect(assistantActivity?.detail).toContain('"command": "ls"')
    expect(runtime.getState().activities.at(-1)?.text).toBe('done')
  })

  test('runs risky-looking commands without manual approval', async () => {
    const { calls, tool } = createFakeTool()
    const runtime = createAgentRuntime({
      model: createModel(
        {
          assistant: {
            content: [
              { type: 'text', text: 'dangerous' },
              { type: 'tool-call', toolCallId: '1', toolName: 'bash', input: { command: 'rm -rf tmp' } },
            ],
            role: 'assistant',
          },
          outcome: {
            calls: [{ arguments: { command: 'rm -rf tmp' }, id: '1', name: 'bash' }],
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
            content: [
              { type: 'text', text: 'inspect project' },
              { type: 'tool-call', toolCallId: '1', toolName: 'bash', input: { command: 'pwd' } },
              { type: 'tool-call', toolCallId: '2', toolName: 'bash', input: { command: 'ls' } },
            ],
            role: 'assistant',
          },
          outcome: {
            calls: [
              { arguments: { command: 'pwd' }, id: '1', name: 'bash' },
              { arguments: { command: 'ls' }, id: '2', name: 'bash' },
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
      name: 'bash',
      descriptor: {
        description: 'demo',
        inputSchema: { jsonSchema: { type: 'object' } },
        strict: true,
      } as AgentTool['descriptor'],
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
                content: [
                  { type: 'text', text: 'run command' },
                  { type: 'tool-call', toolCallId: '1', toolName: 'bash', input: { command: 'bad' } },
                ],
                role: 'assistant',
              },
              outcome: {
                calls: [{ arguments: { command: 'bad' }, id: '1', name: 'bash' }],
                type: 'tool',
              },
            }
          }
          const last = history.at(-1)!
          expect(last.role).toBe('tool')
          const contentPart = (last.content as Array<Record<string, unknown>>)[0]
          expect(contentPart.type).toBe('tool-result')
          expect(contentPart.toolCallId).toBe('1')
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
    const failedActivity = runtime.getState().activities.find((activity) => activity.kind === 'tool')
    expect(failedActivity?.text).toBe('bash failed: command failed')
    expect(failedActivity?.detail).toContain('Status: failed')
    expect(failedActivity?.detail).toContain('Error: command failed')
    expect(failedActivity?.detail).toContain('"command": "bad"')
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
                content: [
                  { type: 'reasoning', text: 'need to inspect files' },
                  { type: 'tool-call', toolCallId: '1', toolName: 'bash', input: { command: 'ls' } },
                ],
                role: 'assistant',
              },
              outcome: {
                calls: [{ arguments: { command: 'ls' }, id: '1', name: 'bash' }],
                type: 'tool',
              },
            }
          }
          const prevAssistant = history.at(-2)!
          const reasoning = (prevAssistant.content as Array<{ type: string; text: string }>).find(
            (p) => p.type === 'reasoning',
          )
          expect(reasoning?.text).toBe('need to inspect files')
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
          const prev = history.find((entry) => entry.role === 'assistant')
          const reasoning = prev
            ? (prev.content as Array<{ type: string; text: string }>).find((p) => p.type === 'reasoning')?.text
            : undefined
          previousReasoning.push(reasoning)
          return {
            assistant: {
              content: [
                { type: 'reasoning', text: 'private turn reasoning' },
                { type: 'text', text: `turn ${previousReasoning.length}` },
              ],
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
