import { sanitizeStreamOptions } from './agent-stream-proxy'

describe('agent stream proxy', () => {
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
