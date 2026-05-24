import { describe, expect, test } from '@rstest/core'
import { parseAgentCommand } from '../src/parse.js'

describe('parseAgentCommand', () => {
  test('parses long flags', () => {
    expect(parseAgentCommand(['--task', 'fix tui', '--model', 'deepseek-v4-pro'])).toEqual({
      apiBaseUrl: undefined,
      mode: 'prompt',
      model: 'deepseek-v4-pro',
      provider: undefined,
      task: 'fix tui',
    })
  })

  test('joins positionals as the task', () => {
    expect(parseAgentCommand(['inspect', 'the', 'workspace'])).toEqual({
      apiBaseUrl: undefined,
      mode: 'prompt',
      model: undefined,
      provider: undefined,
      task: 'inspect the workspace',
    })
  })

  test('parses provider api flag', () => {
    expect(parseAgentCommand(['--api-base-url', 'http://localhost:3030/api/v1'])).toEqual({
      apiBaseUrl: 'http://localhost:3030/api/v1',
      mode: 'tui',
      model: undefined,
      provider: undefined,
      task: undefined,
    })
  })

  test('parses -p as prompt mode', () => {
    expect(parseAgentCommand(['-p', '查询Chart1的图表类型'])).toEqual({
      apiBaseUrl: undefined,
      mode: 'prompt',
      model: undefined,
      provider: undefined,
      task: '查询Chart1的图表类型',
    })
  })

  test('parses tui as explicit TUI mode', () => {
    expect(parseAgentCommand(['tui'])).toEqual({
      apiBaseUrl: undefined,
      mode: 'tui',
      model: undefined,
      provider: undefined,
      task: undefined,
    })
  })

  test('lets -p override a tui positional', () => {
    expect(parseAgentCommand(['tui', '-p', '查询Chart1的图表类型'])).toEqual({
      apiBaseUrl: undefined,
      mode: 'prompt',
      model: undefined,
      provider: undefined,
      task: '查询Chart1的图表类型',
    })
  })

  test('keeps explicit empty prompt in prompt mode', () => {
    expect(parseAgentCommand(['-p', ''])).toEqual({
      apiBaseUrl: undefined,
      mode: 'prompt',
      model: undefined,
      provider: undefined,
      task: '',
    })
  })

  test('parses provider flag', () => {
    expect(parseAgentCommand(['--provider', 'openai', '--model', 'gpt-5-mini'])).toEqual({
      apiBaseUrl: undefined,
      mode: 'tui',
      model: 'gpt-5-mini',
      provider: 'openai',
      task: undefined,
    })
  })
})
