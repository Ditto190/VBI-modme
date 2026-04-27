export type AgentCommandMode = 'prompt' | 'tui'

export interface AgentCommand {
  apiBaseUrl?: string
  chartId?: string
  cwd?: string
  mode: AgentCommandMode
  model?: string
  reportId?: string
  task?: string
}

const readFlag = (argv: string[], index: number) => argv[index + 1]

export const parseAgentCommand = (argv: string[]): AgentCommand => {
  const flags: Record<string, string | undefined> = {}
  const positionals: string[] = []
  let hasPromptFlag = false
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]!
    if (arg === '-p') {
      hasPromptFlag = true
      flags.prompt = readFlag(argv, i)
      i++
    } else if (arg.startsWith('--')) {
      if (arg === '--prompt') hasPromptFlag = true
      flags[arg.slice(2)] = readFlag(argv, i)
      i++
    } else {
      positionals.push(arg)
    }
  }
  const isTui = positionals[0] === 'tui'
  const positionalTask = (isTui ? positionals.slice(1) : positionals).join(' ') || undefined
  const task = flags.prompt ?? flags.task ?? positionalTask
  const mode = isTui && !hasPromptFlag && !flags.task ? 'tui' : task ? 'prompt' : 'tui'
  return {
    apiBaseUrl: flags['api-base-url'],
    chartId: flags['chart-id'],
    cwd: flags.cwd,
    mode,
    model: flags.model,
    reportId: flags['report-id'],
    task,
  }
}
