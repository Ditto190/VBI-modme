import { beforeEach, describe, expect, rs, test } from '@rstest/core'

const model = {
  api: 'openai-completions',
  baseUrl: 'https://default.example',
  contextWindow: 1000,
  cost: { cacheRead: 0, cacheWrite: 0, input: 0, output: 0 },
  id: 'deepseek-v4-flash',
  input: ['text'],
  maxTokens: 1000,
  name: 'DeepSeek V4 Flash',
  provider: 'deepseek',
  reasoning: false,
}

const getModel = rs.fn(() => model as never)
const getModels = rs.fn(() => [model] as never)
const streamSimple = rs.fn()

rs.mock('@earendil-works/pi-ai', () => ({ getModel, getModels, streamSimple }))

describe('createCliAgentProvider', () => {
  beforeEach(() => {
    getModel.mockClear()
    getModels.mockClear()
    streamSimple.mockClear()
  })

  test('creates a pi-ai provider from CLI/env config', async () => {
    const { createCliAgentProvider } = await import('../src/agent/provider.js')
    const provider = createCliAgentProvider({
      model: {
        apiKey: 'test-key',
        baseUrl: 'https://override.example',
        model: 'deepseek-chat',
        provider: 'deepseek',
      },
      provider: { apiBaseUrl: 'http://localhost:3030/api/v1' },
    })

    expect(getModel).toHaveBeenCalledWith('deepseek', 'deepseek-v4-flash')
    expect(provider.model).toMatchObject({ baseUrl: 'https://override.example', id: 'deepseek-v4-flash' })
    expect(provider.getApiKey?.('deepseek')).toBe('test-key')
    expect(provider.streamFn).toBe(streamSimple)
  })

  test('reports unsupported provider/model combinations', async () => {
    getModel.mockReturnValueOnce(undefined as never)
    const { createCliAgentProvider } = await import('../src/agent/provider.js')

    expect(() =>
      createCliAgentProvider({
        model: { apiKey: 'test-key', baseUrl: undefined, model: 'missing-model', provider: 'deepseek' },
        provider: { apiBaseUrl: 'http://localhost:3030/api/v1' },
      }),
    ).toThrow('Unsupported agent model: deepseek/missing-model')
    expect(getModels).toHaveBeenCalledWith('deepseek')
  })
})
