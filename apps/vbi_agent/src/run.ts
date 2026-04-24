import process from 'node:process'
import { parseAgentCommand } from './parse.js'
import type { CliRunDeps } from './types.js'
import { runAgentCommand } from './agent-command.js'

const formatError = (error: unknown) => (error instanceof Error ? error.message : String(error))

export const runCli = async (argv: string[], deps: CliRunDeps = {}) => {
  try {
    const runAgent = deps.runAgent ?? runAgentCommand
    return await runAgent(parseAgentCommand(argv))
  } catch (error) {
    const stderr = deps.stderr ?? process.stderr
    stderr.write(`${formatError(error)}\n`)
    return 1
  }
}
