import { parseArgs } from './flags.js'
import type { AgentCommand } from './types.js'

const getFlag = (flags: Record<string, string>, ...names: string[]) => names.map((name) => flags[name]).find(Boolean)

const readTask = (flags: Record<string, string>, positionals: string[]) => {
  const explicitTask = getFlag(flags, '--task', '-t')
  if (explicitTask) return explicitTask
  const taskTokens = positionals[0] === 'agent' ? positionals.slice(1) : positionals
  return taskTokens.length ? taskTokens.join(' ') : undefined
}

export const parseAgentCommand = (argv: string[]): AgentCommand => {
  const { flags, positionals } = parseArgs(argv)
  return {
    cwd: getFlag(flags, '--cwd', '-C'),
    kind: 'agent',
    model: getFlag(flags, '--model', '-m'),
    task: readTask(flags, positionals),
  }
}
