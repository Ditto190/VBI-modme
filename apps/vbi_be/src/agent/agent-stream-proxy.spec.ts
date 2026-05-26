import { sanitizeStreamOptions, toProxyAssistantMessageEvent } from './agent-stream-proxy'

describe('agent stream proxy', () => {
  test('strips partial payloads from text delta events', () => {
    expect(
      toProxyAssistantMessageEvent({
        type: 'text_delta',
        contentIndex: 0,
        delta: 'hello',
        partial: {
          role: 'assistant',
          content: [{ type: 'text', text: 'hello' }],
          api: 'openai-responses',
          provider: 'openai',
          model: 'gpt-test',
          usage: {
            input: 1,
            output: 2,
            cacheRead: 0,
            cacheWrite: 0,
            totalTokens: 3,
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0 },
          },
          stopReason: 'stop',
          timestamp: 1,
        },
      }),
    ).toEqual({ type: 'text_delta', contentIndex: 0, delta: 'hello' })
  })

  test('includes tool metadata on tool call start events', () => {
    expect(
      toProxyAssistantMessageEvent({
        type: 'toolcall_start',
        contentIndex: 1,
        partial: {
          role: 'assistant',
          content: [
            { type: 'text', text: 'checking' },
            { type: 'toolCall', id: 'tool-1', name: 'vbi_resource', arguments: {} },
          ],
          api: 'openai-responses',
          provider: 'openai',
          model: 'gpt-test',
          usage: {
            input: 0,
            output: 0,
            cacheRead: 0,
            cacheWrite: 0,
            totalTokens: 0,
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0 },
          },
          stopReason: 'toolUse',
          timestamp: 1,
        },
      }),
    ).toEqual({ type: 'toolcall_start', contentIndex: 1, id: 'tool-1', toolName: 'vbi_resource' })
  })

  test('keeps terminal usage while omitting the full assistant message', () => {
    const usage = {
      input: 8,
      output: 13,
      cacheRead: 0,
      cacheWrite: 0,
      totalTokens: 21,
      cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0 },
    }

    expect(
      toProxyAssistantMessageEvent({
        type: 'done',
        reason: 'stop',
        message: {
          role: 'assistant',
          content: [{ type: 'text', text: 'done' }],
          api: 'openai-responses',
          provider: 'openai',
          model: 'gpt-test',
          usage,
          stopReason: 'stop',
          timestamp: 1,
        },
      }),
    ).toEqual({ type: 'done', reason: 'stop', usage })
  })

  test('drops client supplied credentials and custom headers from stream options', () => {
    expect(
      sanitizeStreamOptions({
        apiKey: 'client-key',
        headers: { authorization: 'Bearer client-key' },
        maxTokens: 1024,
        metadata: { userId: 'user-1' },
        reasoning: 'low',
        temperature: 0.2,
      }),
    ).toEqual({
      maxTokens: 1024,
      metadata: { userId: 'user-1' },
      reasoning: 'low',
      temperature: 0.2,
    })
  })
})
