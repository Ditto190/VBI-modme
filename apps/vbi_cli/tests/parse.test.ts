import { describe, expect, test } from '@rstest/core'
import { parseAgentCommand } from '../src/parse.js'

describe('parseAgentCommand', () => {
  test('parses long flags', () => {
    expect(parseAgentCommand(['--task', 'fix cli', '--model', 'deepseek-reasoner', '--cwd', 'apps/vbi_cli'])).toEqual({
      apiBaseUrl: undefined,
      cwd: 'apps/vbi_cli',
      mode: 'prompt',
      model: 'deepseek-reasoner',
      task: 'fix cli',
    })
  })

  test('joins positionals as the task', () => {
    expect(parseAgentCommand(['inspect', 'the', 'workspace'])).toEqual({
      apiBaseUrl: undefined,
      cwd: undefined,
      mode: 'prompt',
      model: undefined,
      task: 'inspect the workspace',
    })
  })

  test('parses provider api flag', () => {
    expect(parseAgentCommand(['--api-base-url', 'http://localhost:3030/api/v1'])).toEqual({
      apiBaseUrl: 'http://localhost:3030/api/v1',
      cwd: undefined,
      mode: 'tui',
      model: undefined,
      task: undefined,
    })
  })

  test('parses -p as prompt mode', () => {
    expect(parseAgentCommand(['-p', '查询Chart1的图表类型'])).toEqual({
      apiBaseUrl: undefined,
      cwd: undefined,
      mode: 'prompt',
      model: undefined,
      task: '查询Chart1的图表类型',
    })
  })

  test('parses tui as explicit TUI mode', () => {
    expect(parseAgentCommand(['tui'])).toEqual({
      apiBaseUrl: undefined,
      cwd: undefined,
      mode: 'tui',
      model: undefined,
      task: undefined,
    })
  })

  test('lets -p override a tui positional', () => {
    expect(parseAgentCommand(['tui', '-p', '查询Chart1的图表类型'])).toEqual({
      apiBaseUrl: undefined,
      cwd: undefined,
      mode: 'prompt',
      model: undefined,
      task: '查询Chart1的图表类型',
    })
  })
})
