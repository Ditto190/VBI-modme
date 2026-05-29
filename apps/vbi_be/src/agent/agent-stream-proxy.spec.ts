import {
  agentStreamOptionKeys,
  getAgentModelAliases,
  getSupportedAgentModelIds,
  resolveModelIdAlias,
  sanitizeStreamOptions,
} from './agent-stream-proxy'

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

  test('supports DeepSeek flash and pro model selection through the proxy', () => {
    expect(resolveModelIdAlias('deepseek', 'deepseek-chat')).toBe('deepseek-v4-flash')
    expect(resolveModelIdAlias('deepseek', 'deepseek-reasoner')).toBe('deepseek-v4-pro')
    expect(getAgentModelAliases('deepseek')).toEqual({
      'deepseek-chat': 'deepseek-v4-flash',
      'deepseek-reasoner': 'deepseek-v4-pro',
    })
    expect(getSupportedAgentModelIds('deepseek', 'deepseek-v4-flash')).toEqual(['deepseek-v4-flash', 'deepseek-v4-pro'])
    expect(getSupportedAgentModelIds('custom', 'custom-model')).toEqual(['custom-model'])
    expect(agentStreamOptionKeys).toContain('temperature')
  })
})
