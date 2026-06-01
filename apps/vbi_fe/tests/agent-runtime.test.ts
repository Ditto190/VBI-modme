import { describe, expect, test } from '@rstest/core'
import {
  createAgentModel,
  fallbackAgentBackendConfig,
  resolveAgentModelId,
  resolveAgentThinkingLevel,
} from '../src/views/agent/agent-model-config'
import { loadVBIAgentModule } from '../src/views/agent/agent-runtime'
import { formatAgentContextUsage, resolveAgentContextUsage } from '../src/views/agent/agent-usage-display'

describe('agent runtime helpers', () => {
  test('resolves model aliases from the backend agent config before creating the browser agent', () => {
    const backendConfig = {
      ...fallbackAgentBackendConfig,
      provider: 'deepseek',
      model: 'deepseek-v4-flash',
      models: ['deepseek-v4-flash', 'deepseek-v4-pro'],
      modelAliases: {
        'deepseek-chat': 'deepseek-v4-flash',
        'deepseek-reasoner': 'deepseek-v4-pro',
      },
    }

    expect(resolveAgentModelId('deepseek-chat', backendConfig)).toBe('deepseek-v4-flash')
    expect(resolveAgentModelId('deepseek-reasoner', backendConfig)).toBe('deepseek-v4-pro')
  })

  test('keeps DeepSeek reasoning enabled with high and max thinking levels', () => {
    expect(resolveAgentThinkingLevel(undefined)).toBe('high')
    expect(resolveAgentThinkingLevel('off')).toBe('high')
    expect(resolveAgentThinkingLevel('xhigh')).toBe('xhigh')
    expect(createAgentModel({ provider: 'deepseek', model: 'deepseek-v4-pro' })).toMatchObject({
      id: 'deepseek-v4-pro',
      name: 'DeepSeek V4 Pro',
      reasoning: true,
      thinkingLevelMap: { high: 'high', xhigh: 'max' },
    })
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

  test('loads the browser VBI agent through the package export', async () => {
    await expect(loadVBIAgentModule()).resolves.toMatchObject({
      VBIAgent: expect.any(Function),
    })
  })
})
