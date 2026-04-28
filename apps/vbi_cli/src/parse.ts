import { parseArgs } from 'node:util'
import type { AgentCommand } from './types/index.js'

export const parseAgentCommand = (argv: string[]): AgentCommand => {
  const { positionals, values } = parseArgs({
    allowPositionals: true,
    args: argv,
    options: {
      'api-base-url': { type: 'string' },
      cwd: { type: 'string' },
      model: { type: 'string' },
      prompt: { short: 'p', type: 'string' },
      task: { type: 'string' },
    },
  })
  const isTui = positionals[0] === 'tui'
  const positionalTask = (isTui ? positionals.slice(1) : positionals).join(' ') || undefined
  const task = values.prompt ?? values.task ?? positionalTask
  const mode = isTui && !values.prompt && !values.task ? 'tui' : task ? 'prompt' : 'tui'
  return {
    apiBaseUrl: values['api-base-url'],
    cwd: values.cwd,
    mode,
    model: values.model,
    task,
  }
}
