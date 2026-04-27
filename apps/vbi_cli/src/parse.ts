export interface AgentCommand {
  apiBaseUrl?: string
  chartId?: string
  cwd?: string
  model?: string
  reportId?: string
  task?: string
}

export const parseAgentCommand = (argv: string[]): AgentCommand => {
  const flags: Record<string, string> = {}
  const positionals: string[] = []
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      flags[argv[i].slice(2)] = argv[++i]
    } else {
      positionals.push(argv[i])
    }
  }
  return {
    apiBaseUrl: flags['api-base-url'],
    chartId: flags['chart-id'],
    cwd: flags.cwd,
    model: flags.model,
    reportId: flags['report-id'],
    task: flags.task ?? (positionals.length ? positionals.join(' ') : undefined),
  }
}
