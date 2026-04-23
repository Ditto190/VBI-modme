import { runChartCommand } from './chart-command.js'
import { runInsightCommand } from './insight-command.js'
import { runReportCommand, runReportPageCommand } from './report-command.js'
import type { CliCommand, CliCommandDeps } from './types.js'

export const executeCommand = (deps: CliCommandDeps, command: Exclude<CliCommand, { kind: 'help' }>) => {
  if (command.kind === 'chart') return runChartCommand(deps, command)
  if (command.kind === 'insight') return runInsightCommand(deps, command)
  if (command.kind === 'report') return runReportCommand(deps, command)
  return runReportPageCommand(deps, command)
}
