import { describe, expect, test } from 'vitest'
import { parseAgentCommand } from '../src/parse.js'

describe('parseAgentCommand', () => {
  test('parses long flags', () => {
    expect(parseAgentCommand(['--task', 'fix cli', '--model', 'deepseek-reasoner', '--cwd', 'apps/vbi_cli'])).toEqual({
      apiBaseUrl: undefined,
      chartId: undefined,
      cwd: 'apps/vbi_cli',
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
      model: undefined,
      reportId: 'report-1',
      task: undefined,
    })
  })
})
