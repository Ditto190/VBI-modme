import { beforeEach, describe, expect, test, vi } from 'vitest'
import type { ModelTurnResult } from '../src/agent/types.js'

const createStream = (...chunks: unknown[]) => ({
  async *[Symbol.asyncIterator]() {
    yield* chunks
  },
})
const create = vi.fn()
const openAiConstructor = vi.fn(() => ({ chat: { completions: { create } } }))

vi.mock('openai', () => ({ default: openAiConstructor }))

describe('createDeepSeekModelProvider', () => {
  beforeEach(() => {
    openAiConstructor.mockClear()
    create.mockReset()
  })

  test('streams final assistant text through the OpenAI-compatible client', async () => {
    create.mockReturnValue(
      createStream(
        { choices: [{ delta: { reasoning_content: 'reasoning' } }] },
        { choices: [{ delta: { content: 'final ' } }] },
        { choices: [{ delta: { content: 'answer' } }] },
      ),
    )
    const { createDeepSeekModelProvider } = await import('../src/agent/model/deepseek-provider.js')
    const provider = createDeepSeekModelProvider({
      apiKey: 'test-key',
      baseUrl: 'https://api.deepseek.com',
      model: 'deepseek-chat',
    })
    const chunks: string[] = []
    const result = (await provider.streamTurn({
      handlers: { onTextDelta: (chunk) => void chunks.push(chunk) },
      history: [{ content: 'hello', role: 'user' }],
      tools: [],
    })) as ModelTurnResult
    expect(openAiConstructor).toHaveBeenCalledWith({ apiKey: 'test-key', baseURL: 'https://api.deepseek.com' })
    expect(create).toHaveBeenCalledWith(expect.objectContaining({ model: 'deepseek-chat' }))
    expect(chunks).toEqual(['final ', 'answer'])
    expect(result.assistant.reasoningContent).toBe('reasoning')
    expect(result.outcome).toEqual({ content: 'final answer', type: 'final' })
  })

  test('passes stored reasoning content back to thinking-mode APIs', async () => {
    create.mockReturnValue(createStream({ choices: [{ delta: { content: 'done' } }] }))
    const { createDeepSeekModelProvider } = await import('../src/agent/model/deepseek-provider.js')
    const provider = createDeepSeekModelProvider({
      apiKey: 'test-key',
      baseUrl: 'https://api.deepseek.com',
      model: 'deepseek-reasoner',
    })
    await provider.streamTurn({
      history: [{ content: 'use tool', reasoningContent: 'kept reasoning', role: 'assistant' }],
      tools: [],
    })
    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({
        messages: [expect.objectContaining({ reasoning_content: 'kept reasoning' })],
      }),
    )
  })

  test('parses a single function tool call', async () => {
    create.mockReturnValue(
      createStream(
        { choices: [{ delta: { content: 'use tool' } }] },
        { choices: [{ delta: { tool_calls: [{ function: { name: 'bash' }, id: 'call-1', index: 0 }] } }] },
        { choices: [{ delta: { tool_calls: [{ function: { arguments: '{"command":"pwd"}' }, index: 0 }] } }] },
      ),
    )
    const { createDeepSeekModelProvider } = await import('../src/agent/model/deepseek-provider.js')
    const provider = createDeepSeekModelProvider({
      apiKey: 'test-key',
      baseUrl: 'https://api.deepseek.com/v1',
      model: 'deepseek-reasoner',
    })
    const result = await provider.streamTurn({ history: [{ content: 'where am i', role: 'user' }], tools: [] })
    expect(result.outcome).toEqual({
      calls: [{ arguments: { command: 'pwd' }, id: 'call-1', name: 'bash', rawArguments: '{"command":"pwd"}' }],
      type: 'tool',
    })
  })

  test('parses multiple function tool calls', async () => {
    create.mockReturnValue(
      createStream(
        {
          choices: [
            {
              delta: {
                tool_calls: [
                  { function: { name: 'bash' }, id: 'call-1', index: 0 },
                  { function: { name: 'bash' }, id: 'call-2', index: 1 },
                ],
              },
            },
          ],
        },
        {
          choices: [
            {
              delta: {
                tool_calls: [
                  { function: { arguments: '{"command":"pwd"}' }, index: 0 },
                  { function: { arguments: '{"command":"ls"}' }, index: 1 },
                ],
              },
            },
          ],
        },
      ),
    )
    const { createDeepSeekModelProvider } = await import('../src/agent/model/deepseek-provider.js')
    const provider = createDeepSeekModelProvider({
      apiKey: 'test-key',
      baseUrl: 'https://api.deepseek.com/v1',
      model: 'deepseek-reasoner',
    })
    const result = await provider.streamTurn({ history: [{ content: 'inspect', role: 'user' }], tools: [] })
    expect(result.outcome).toEqual({
      calls: [
        { arguments: { command: 'pwd' }, id: 'call-1', name: 'bash', rawArguments: '{"command":"pwd"}' },
        { arguments: { command: 'ls' }, id: 'call-2', name: 'bash', rawArguments: '{"command":"ls"}' },
      ],
      type: 'tool',
    })
  })
})
