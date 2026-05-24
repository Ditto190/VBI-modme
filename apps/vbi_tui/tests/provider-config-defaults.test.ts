import { afterEach, describe, expect, test } from '@rstest/core'
import { createAgentConfig } from '../src/agent/config.js'

const envKeys = ['AGENT_API_KEY', 'AGENT_BASE_URL', 'AGENT_MODEL', 'AGENT_PROVIDER'] as const
const previousEnv = new Map<string, string | undefined>()

const restoreEnv = () => {
  for (const key of envKeys) {
    const value = previousEnv.get(key)
    if (value === undefined) {
      delete process.env[key]
    } else {
      process.env[key] = value
    }
  }
}

describe('createAgentConfig', () => {
  afterEach(restoreEnv)

  test('defaults AGENT_PROVIDER and AGENT_MODEL to a pi-ai deepseek model', () => {
    for (const key of envKeys) {
      previousEnv.set(key, process.env[key])
      delete process.env[key]
    }

    expect(createAgentConfig({ mode: 'tui' }).model).toMatchObject({
      model: 'deepseek-v4-flash',
      provider: 'deepseek',
    })
  })

  test('lets CLI provider and model override env values', () => {
    for (const key of envKeys) previousEnv.set(key, process.env[key])
    process.env.AGENT_PROVIDER = 'deepseek'
    process.env.AGENT_MODEL = 'deepseek-v4-flash'

    const config = createAgentConfig({ mode: 'prompt', model: 'gpt-5-mini', provider: 'openai', task: 'inspect' })

    expect(config.model.provider).toBe('openai')
    expect(config.model.model).toBe('gpt-5-mini')
  })
})
