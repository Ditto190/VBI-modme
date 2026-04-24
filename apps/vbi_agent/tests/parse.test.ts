import { describe, expect, test } from 'vitest'
import { parseAgentCommand } from '../src/parse.js'

describe('parseAgentCommand', () => {
  test('parses long flags', () => {
    expect(parseAgentCommand(['--task', 'fix cli', '--model', 'deepseek-reasoner', '--cwd', 'apps/vbi_cli'])).toEqual({
      cwd: 'apps/vbi_cli',
      model: 'deepseek-reasoner',
      task: 'fix cli',
    })
  })

  test('joins positionals as the task', () => {
    expect(parseAgentCommand(['inspect', 'the', 'workspace'])).toEqual({
      cwd: undefined,
      model: undefined,
      task: 'inspect the workspace',
    })
  })
})
