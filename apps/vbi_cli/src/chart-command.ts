import type { ChartCommand, CliCommandDeps } from './types.js'

export const runChartCommand = (deps: CliCommandDeps, command: ChartCommand) => {
  if (command.action === 'list')
    return deps.client.listCharts?.() ?? Promise.reject(new Error('chart list is not supported'))
  if (command.action === 'create') return deps.client.chart().create(command.name ? { name: command.name } : undefined)
  if (command.action === 'get') return deps.client.chart(command.id).getDetail()
  if (command.action === 'update') return deps.client.chart(command.id).rename(command.name)
  return deps.client.chart(command.id).remove()
}
