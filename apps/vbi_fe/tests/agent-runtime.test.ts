import { describe, expect, rs, test } from '@rstest/core'
import {
  createAgentModelOptions,
  createAgentModel,
  defaultAgentModel,
  fallbackAgentBackendConfig,
  readAgentBackendConfig,
  resolveAgentModelId,
  resolveAgentThinkingLevel,
} from '../src/application/agent/agent-model-config'
import { loadVBIAgentModule } from '../src/application/agent/agent-runtime'
import { formatAgentContextUsage, resolveAgentContextUsage } from '../src/application/agent/agent-usage-display'

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

  test('normalizes legacy DeepSeek backend model ids before exposing model options', async () => {
    const originalFetch = globalThis.fetch
    globalThis.fetch = rs.fn(async () => {
      return new Response(
        JSON.stringify({
          data: {
            provider: 'deepseek',
            model: 'deepseek-v3.1:volcengine',
            models: ['deepseek-v3.1:volcengine'],
            modelAliases: {},
            modelDescriptors: [],
          },
        }),
      )
    }) as typeof fetch

    try {
      const config = await readAgentBackendConfig()

      expect(config.model).toBe(defaultAgentModel)
      expect(config.models).toEqual([defaultAgentModel])
      expect(resolveAgentModelId('deepseek-v3.1:volcengine', config)).toBe(defaultAgentModel)
      expect(createAgentModelOptions(config)).toEqual([
        expect.objectContaining({
          id: defaultAgentModel,
          labelKey: 'agent.modelFlash',
        }),
      ])
    } finally {
      globalThis.fetch = originalFetch
    }
  })

  test('normalizes legacy Volcengine backend model ids before exposing model options', async () => {
    const originalFetch = globalThis.fetch
    globalThis.fetch = rs.fn(async () => {
      return new Response(
        JSON.stringify({
          data: {
            provider: 'volcengine',
            model: 'deepseek-v3.1:volcengine',
            models: ['deepseek-v3.1:volcengine'],
            modelAliases: {},
            modelDescriptors: [],
          },
        }),
      )
    }) as typeof fetch

    try {
      const config = await readAgentBackendConfig()

      expect(config.model).toBe(defaultAgentModel)
      expect(config.models).toEqual([defaultAgentModel])
      expect(resolveAgentModelId('deepseek-v3.1:volcengine', config)).toBe(defaultAgentModel)
      expect(createAgentModelOptions(config)).toEqual([
        expect.objectContaining({
          id: defaultAgentModel,
          labelKey: 'agent.modelFlash',
        }),
      ])
    } finally {
      globalThis.fetch = originalFetch
    }
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
