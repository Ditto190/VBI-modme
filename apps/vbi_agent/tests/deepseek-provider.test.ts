import { beforeEach, describe, expect, test, vi } from 'vitest'
import type { ModelTurnResult } from '../src/agent/types.js'

const createStream = (...chunks: unknown[]) => ({
  async *[Symbol.asyncIterator]() {
    yield* chunks
  },
})

const deepseekModel = { modelId: 'mock-model' }
const deepseekProvider = vi.fn(() => deepseekModel)
const createDeepSeek = vi.fn(() => deepseekProvider)
const jsonSchema = vi.fn((schema: unknown) => ({ jsonSchema: schema }))
const streamText = vi.fn()

vi.mock('@ai-sdk/deepseek', () => ({ createDeepSeek }))
vi.mock('ai', () => ({ jsonSchema, streamText }))

describe('createDeepSeekModelProvider', () => {
  beforeEach(() => {
    createDeepSeek.mockClear()
    deepseekProvider.mockClear()
    jsonSchema.mockClear()
    streamText.mockReset()
  })

  test('streams final assistant text through the AI SDK DeepSeek provider', async () => {
    streamText.mockReturnValue({
      fullStream: createStream(
        { text: 'reasoning', type: 'reasoning-delta' },
        { text: 'final ', type: 'text-delta' },
        { text: 'answer', type: 'text-delta' },
      ),
    })
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
    expect(createDeepSeek).toHaveBeenCalledWith({ apiKey: 'test-key', baseURL: 'https://api.deepseek.com' })
    expect(deepseekProvider).toHaveBeenCalledWith('deepseek-chat')
    expect(streamText).toHaveBeenCalledWith(
      expect.objectContaining({
        messages: [{ content: 'hello', role: 'user' }],
        model: deepseekModel,
        tools: {},
      }),
    )
    expect(chunks).toEqual(['final ', 'answer'])
    expect(result.assistant.reasoningContent).toBe('reasoning')
    expect(result.outcome).toEqual({ content: 'final answer', type: 'final' })
  })

  test('passes stored reasoning content back to thinking-mode APIs', async () => {
    streamText.mockReturnValue({ fullStream: createStream({ text: 'done', type: 'text-delta' }) })
    const { createDeepSeekModelProvider } = await import('../src/agent/model/deepseek-provider.js')
    const provider = createDeepSeekModelProvider({
      apiKey: 'test-key',
      baseUrl: 'https://api.deepseek.com',
      model: 'deepseek-reasoner',
    })
    await provider.streamTurn({
      history: [
        { content: 'use tool', role: 'user' },
        {
          content: 'using tool',
          reasoningContent: 'kept reasoning',
          role: 'assistant',
          toolCalls: [{ arguments: '{"command":"pwd"}', id: 'call-1', name: 'bash' }],
        },
        { content: 'ok', name: 'bash', role: 'tool', toolCallId: 'call-1' },
      ],
      tools: [],
    })
    expect(streamText).toHaveBeenCalledWith(
      expect.objectContaining({
        messages: [
          { content: 'use tool', role: 'user' },
          {
            content: [
              { text: 'kept reasoning', type: 'reasoning' },
              { text: 'using tool', type: 'text' },
              { input: { command: 'pwd' }, toolCallId: 'call-1', toolName: 'bash', type: 'tool-call' },
            ],
            role: 'assistant',
          },
          {
            content: [
              { output: { type: 'text', value: 'ok' }, toolCallId: 'call-1', toolName: 'bash', type: 'tool-result' },
            ],
            role: 'tool',
          },
        ],
      }),
    )
  })

  test('exposes agent tools as AI SDK tools', async () => {
    streamText.mockReturnValue({ fullStream: createStream({ text: 'done', type: 'text-delta' }) })
    const { createDeepSeekModelProvider } = await import('../src/agent/model/deepseek-provider.js')
    const provider = createDeepSeekModelProvider({
      apiKey: 'test-key',
      baseUrl: 'https://api.deepseek.com/v1',
      model: 'deepseek-chat',
    })
    const inputSchema = { properties: { command: { type: 'string' } }, required: ['command'], type: 'object' }
    await provider.streamTurn({
      history: [{ content: 'where am i', role: 'user' }],
      tools: [{ description: 'Run a shell command', inputSchema, name: 'bash' }],
    })
    expect(jsonSchema).toHaveBeenCalledWith(inputSchema)
    expect(streamText).toHaveBeenCalledWith(
      expect.objectContaining({
        tools: {
          bash: {
            description: 'Run a shell command',
            inputSchema: { jsonSchema: inputSchema },
            strict: true,
          },
        },
      }),
    )
  })

  test('parses a single function tool call', async () => {
    streamText.mockReturnValue({
      fullStream: createStream(
        { text: 'use tool', type: 'text-delta' },
        { input: { command: 'pwd' }, toolCallId: 'call-1', toolName: 'bash', type: 'tool-call' },
      ),
    })
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
    streamText.mockReturnValue({
      fullStream: createStream(
        { input: { command: 'pwd' }, toolCallId: 'call-1', toolName: 'bash', type: 'tool-call' },
        { input: { command: 'ls' }, toolCallId: 'call-2', toolName: 'bash', type: 'tool-call' },
      ),
    })
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
