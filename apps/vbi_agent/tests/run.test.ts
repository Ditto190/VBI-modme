import { describe, expect, test, vi } from 'vitest'
import { runCli } from '../src/run.js'

describe('runCli', () => {
  test('starts the agent TUI immediately when no argv is provided', async () => {
    const runAgent = vi.fn(async () => 0)

    await expect(runCli([], { runAgent })).resolves.toBe(0)

    expect(runAgent).toHaveBeenCalledWith({
      cwd: undefined,
      kind: 'agent',
      model: undefined,
      task: undefined,
    })
  })

  test('passes agent options directly to the TUI path', async () => {
    const runAgent = vi.fn(async () => 0)

    await expect(
      runCli(['-t', 'inspect workspace', '-m', 'deepseek-reasoner', '-C', 'apps/vbi_cli'], { runAgent }),
    ).resolves.toBe(0)

    expect(runAgent).toHaveBeenCalledWith({
      cwd: 'apps/vbi_cli',
      kind: 'agent',
      model: 'deepseek-reasoner',
      task: 'inspect workspace',
    })
  })

  test('reports startup errors without legacy command usage', async () => {
    const stderr: string[] = []
    const runAgent = vi.fn(async () => {
      throw new Error('agent failed')
    })

    await expect(runCli([], { runAgent, stderr: { write: (value: string) => void stderr.push(value) } })).resolves.toBe(
      1,
    )

    expect(stderr.join('')).toBe('agent failed\n')
  })
})
