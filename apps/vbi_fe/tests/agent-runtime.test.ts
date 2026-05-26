import { describe, expect, test } from '@rstest/core'
import { resolveAgentModelInput, resolveAgentProxyUrl } from '../src/views/agent/agent-model-config'
import { formatAgentContextUsage, resolveAgentContextUsage } from '../src/views/agent/agent-usage-display'

describe('agent runtime helpers', () => {
  test('resolves legacy DeepSeek model aliases before creating the browser agent', () => {
    expect(resolveAgentModelInput({ provider: 'deepseek', model: 'deepseek-chat' })).toEqual({
      provider: 'deepseek',
      model: 'deepseek-v4-flash',
    })
    expect(resolveAgentModelInput({ provider: 'deepseek', model: 'deepseek-reasoner' })).toEqual({
      provider: 'deepseek',
      model: 'deepseek-v4-pro',
    })
  })

  test('uses the streamProxy-compatible backend route prefix', () => {
    expect(resolveAgentProxyUrl(undefined)).toBe('/api/v1/agent')
    expect(resolveAgentProxyUrl('https://example.com/api/v1/agent/')).toBe('https://example.com/api/v1/agent')
  })

  test('formats usage as used tokens, context window, and percentage only', () => {
    const usage = resolveAgentContextUsage({
      model: { contextWindow: 1_000_000 },
      messages: [
        {
          role: 'assistant',
          usage: {
            cacheRead: 19_000,
            input: 351,
            output: 339,
            totalTokens: 19_690,
          },
        },
      ],
    })

    const text = formatAgentContextUsage(usage)

    expect(text).toBe('19.7K / 1M · 2%')
    expect(text).not.toContain('$')
    expect(text).not.toContain('↑')
    expect(text).not.toContain('↓')
    expect(text).not.toContain('R')
  })
})
