import { describe, expect, test } from '@rstest/core'
import { parseAgentCommand } from '../src/parse.js'

describe('parseAgentCommand', () => {
  test('parses long flags', () => {
    expect(parseAgentCommand(['--task', 'fix cli', '--model', 'deepseek-reasoner', '--cwd', 'apps/vbi_cli'])).toEqual({
      apiBaseUrl: undefined,
      chartId: undefined,
      cwd: 'apps/vbi_cli',
      mode: 'prompt',
      model: 'deepseek-reasoner',
      reportId: undefined,
      task: 'fix cli',
    })
  })

  test('joins positionals as the task', () => {
    expect(parseAgentCommand(['inspect', 'the', 'workspace'])).toEqual({
      apiBaseUrl: undefined,
      chartId: undefined,
      cwd: undefined,
      mode: 'prompt',
      model: undefined,
      reportId: undefined,
      task: 'inspect the workspace',
    })
  })

  test('parses provider workspace flags', () => {
    expect(
      parseAgentCommand([
        '--api-base-url',
        'http://localhost:3030/api/v1',
        '--chart-id',
        'chart-1',
        '--report-id',
        'report-1',
      ]),
    ).toEqual({
      apiBaseUrl: 'http://localhost:3030/api/v1',
      chartId: 'chart-1',
      cwd: undefined,
      mode: 'tui',
      model: undefined,
      reportId: 'report-1',
      task: undefined,
    })
  })

  test('parses -p as prompt mode', () => {
    expect(parseAgentCommand(['-p', '查询Chart1的图表类型'])).toEqual({
      apiBaseUrl: undefined,
      chartId: undefined,
      cwd: undefined,
      mode: 'prompt',
      model: undefined,
      reportId: undefined,
      task: '查询Chart1的图表类型',
    })
  })

  test('parses tui as explicit TUI mode', () => {
    expect(parseAgentCommand(['tui'])).toEqual({
      apiBaseUrl: undefined,
      chartId: undefined,
      cwd: undefined,
      mode: 'tui',
      model: undefined,
      reportId: undefined,
      task: undefined,
    })
  })

  test('lets -p override a tui positional', () => {
    expect(parseAgentCommand(['tui', '-p', '查询Chart1的图表类型'])).toEqual({
      apiBaseUrl: undefined,
      chartId: undefined,
      cwd: undefined,
      mode: 'prompt',
      model: undefined,
      reportId: undefined,
      task: '查询Chart1的图表类型',
    })
  })
})
