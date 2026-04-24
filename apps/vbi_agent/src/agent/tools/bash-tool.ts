import path from 'node:path'
import { runBashCommand } from './bash-run.js'
import { clipText, stringifyJson } from './shared.js'
import type { AgentTool } from '../types.js'

const resolveCwd = (baseCwd: string, cwd?: unknown) =>
  typeof cwd === 'string' && cwd.trim() ? path.resolve(baseCwd, cwd) : baseCwd

const readCommand = (input: Record<string, unknown>) => {
  if (typeof input.command === 'string' && input.command.trim()) return input.command
  throw new Error('bash.command is required')
}

const readTimeout = (input: Record<string, unknown>, defaultTimeout: number) =>
  typeof input.timeoutMs === 'number' && input.timeoutMs > 0 ? input.timeoutMs : defaultTimeout

export const createBashTool = (baseCwd: string, timeoutMs = 30000): AgentTool => ({
  definition: {
    description: 'Run one shell command in a fresh process and return stdout/stderr.',
    inputSchema: {
      additionalProperties: false,
      properties: {
        command: { type: 'string' },
        cwd: { type: 'string' },
        timeoutMs: { type: 'number' },
      },
      required: ['command'],
      type: 'object',
    },
    name: 'bash',
  },
  execute: async (input) => {
    const command = readCommand(input)
    const cwd = resolveCwd(baseCwd, input.cwd)
    const result = await runBashCommand(command, cwd, readTimeout(input, timeoutMs))
    return {
      content: stringifyJson({
        command,
        cwd,
        exitCode: result.exitCode,
        output: clipText(result.output || '<no output>'),
        signal: result.signal,
      }),
      summary: `bash ${result.exitCode === 0 ? 'succeeded' : 'finished with errors'} in ${cwd}`,
    }
  },
})
