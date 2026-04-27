import { beforeEach, describe, expect, rs, test } from '@rstest/core'
import { createOpenAI, createStream, jsonSchema, resetOpenAIMocks, streamText } from './openai-provider.mock.js'

rs.mock('@ai-sdk/openai', () => ({ createOpenAI }))
rs.mock('ai', () => ({ jsonSchema, streamText }))

describe('createOpenAIModelProvider tools', () => {
  beforeEach(resetOpenAIMocks)

  test('passes tool set directly to streamText', async () => {
    streamText.mockReturnValue({ fullStream: createStream({ text: 'done', type: 'text-delta' }) })
    const { createOpenAIModelProvider } = await import('../src/model/openai-provider.js')
    const tools = {
      bash: { description: 'Run a shell command', inputSchema: jsonSchema({ type: 'object' }), strict: true },
    }
    await createOpenAIModelProvider({ apiKey: 'test-key', model: 'gpt-5-mini' }).streamTurn({
      history: [{ content: 'where am i', role: 'user' }],
      tools,
    })
    expect(streamText).toHaveBeenCalledWith(expect.objectContaining({ tools }))
  })

  test('parses function tool calls', async () => {
    streamText.mockReturnValue({
      fullStream: createStream(
        { input: { command: 'pwd' }, toolCallId: 'call-1', toolName: 'bash', type: 'tool-call' },
        { input: { command: 'ls' }, toolCallId: 'call-2', toolName: 'bash', type: 'tool-call' },
      ),
    })
    const { createOpenAIModelProvider } = await import('../src/model/openai-provider.js')
    const result = await createOpenAIModelProvider({ apiKey: 'test-key', model: 'gpt-5-mini' }).streamTurn({
      history: [{ content: 'inspect', role: 'user' }],
      tools: {},
    })
    expect(result.outcome).toEqual({
      calls: [
        { arguments: { command: 'pwd' }, id: 'call-1', name: 'bash' },
        { arguments: { command: 'ls' }, id: 'call-2', name: 'bash' },
      ],
      type: 'tool',
    })
  })
})
