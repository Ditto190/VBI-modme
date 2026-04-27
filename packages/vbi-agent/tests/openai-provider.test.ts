import { beforeEach, describe, expect, rs, test } from '@rstest/core'
import {
  chatMethod,
  createOpenAI,
  createStream,
  openaiModel,
  resetOpenAIMocks,
  streamText,
} from './openai-provider.mock.js'

rs.mock('@ai-sdk/openai', () => ({ createOpenAI }))
rs.mock('ai', () => ({ jsonSchema: rs.fn(), streamText }))

describe('createOpenAIModelProvider', () => {
  beforeEach(resetOpenAIMocks)

  test('streams text through an OpenAI-compatible model', async () => {
    streamText.mockReturnValue({
      fullStream: createStream(
        { text: 'reasoning', type: 'reasoning-delta' },
        { text: 'final ', type: 'text-delta' },
        { text: 'answer', type: 'text-delta' },
      ),
    })
    const { createOpenAIModelProvider } = await import('../src/model/openai-provider.js')
    const provider = createOpenAIModelProvider({
      apiKey: 'test-key',
      baseUrl: 'https://api.deepseek.com',
      model: 'deepseek-chat',
    })
    const chunks: string[] = []
    const result = await provider.streamTurn({
      handlers: { onTextDelta: (chunk) => void chunks.push(chunk) },
      history: [{ content: 'hello', role: 'user' }],
      tools: {},
    })
    expect(createOpenAI).toHaveBeenCalledWith({ apiKey: 'test-key', baseURL: 'https://api.deepseek.com' })
    expect(chatMethod).toHaveBeenCalledWith('deepseek-chat')
    expect(streamText).toHaveBeenCalledWith(
      expect.objectContaining({ messages: [{ content: 'hello', role: 'user' }], model: openaiModel, tools: {} }),
    )
    expect(chunks).toEqual(['final ', 'answer'])
    const reasoningPart = (result.assistant.content as Array<{ type: string; text: string }>).find(
      (p) => p.type === 'reasoning',
    )
    expect(reasoningPart?.text).toBe('reasoning')
    expect(result.outcome).toEqual({ content: 'final answer', type: 'final' })
  })

  test('preserves reasoning and tool messages for deepseek reasoner', async () => {
    streamText.mockReturnValue({ fullStream: createStream({ text: 'done', type: 'text-delta' }) })
    const { createOpenAIModelProvider } = await import('../src/model/openai-provider.js')
    const provider = createOpenAIModelProvider({
      apiKey: 'test-key',
      baseUrl: 'https://api.deepseek.com',
      model: 'deepseek-reasoner',
    })
    await provider.streamTurn({
      history: [
        { content: 'use tool', role: 'user' },
        {
          content: [
            { type: 'reasoning', text: 'kept reasoning' },
            { type: 'text', text: 'using tool' },
            { type: 'tool-call', toolCallId: 'call-1', toolName: 'bash', input: { command: 'pwd' } },
          ],
          role: 'assistant',
        },
        {
          content: [
            { type: 'tool-result', toolCallId: 'call-1', toolName: 'bash', output: { type: 'text', value: 'ok' } },
          ],
          role: 'tool',
        },
      ],
      tools: {},
    })
    expect(streamText).toHaveBeenCalledWith(
      expect.objectContaining({
        messages: expect.arrayContaining([
          expect.objectContaining({
            content: expect.arrayContaining([{ text: 'kept reasoning', type: 'reasoning' }]),
            role: 'assistant',
          }),
        ]),
      }),
    )
  })
})
