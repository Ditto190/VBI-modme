import { parseArgs } from 'node:util'

export type AgentCommandMode = 'prompt' | 'tui'

export interface AgentCommand {
  apiBaseUrl?: string
  cwd?: string
  mode: AgentCommandMode
  model?: string
  task?: string
}

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
