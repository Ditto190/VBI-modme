import { describe, expect, test } from 'vitest'
import { parseAgentCommand } from '../src/parse.js'

describe('parseAgentCommand', () => {
  test('parses flags and short aliases without a subcommand', () => {
    expect(parseAgentCommand(['-t', 'fix cli', '--model', 'deepseek-reasoner', '--cwd', 'apps/vbi_cli'])).toEqual({
      cwd: 'apps/vbi_cli',
      kind: 'agent',
      model: 'deepseek-reasoner',
      task: 'fix cli',
    })
  })

  test('treats positional text as the initial task', () => {
    expect(parseAgentCommand(['inspect', 'the', 'workspace'])).toEqual({
      cwd: undefined,
      kind: 'agent',
      model: undefined,
      task: 'inspect the workspace',
    })
  })

  test('accepts the legacy agent prefix as part of the TUI path', () => {
    expect(parseAgentCommand(['agent', '-t', 'fix cli'])).toEqual({
      cwd: undefined,
      kind: 'agent',
      model: undefined,
      task: 'fix cli',
    })
  })
})
