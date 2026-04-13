import type { CliCommandDeps, ReportCommand, ReportPageCommand } from './types.js'

const toPageUpdate = (command: Extract<ReportPageCommand, { action: 'update' }>) => ({
  ...(command.chartId === undefined ? {} : { chartId: command.chartId }),
  ...(command.insightId === undefined ? {} : { insightId: command.insightId }),
  ...(command.title === undefined ? {} : { title: command.title }),
})

export const runReportCommand = (deps: CliCommandDeps, command: ReportCommand) => {
  if (command.action === 'list')
    return deps.client.listReports?.() ?? Promise.reject(new Error('report list is not supported'))
  if (command.action === 'create') return deps.client.report().create(command.name ? { name: command.name } : undefined)
  if (command.action === 'get') return deps.client.report(command.id).getDetail()
  if (command.action === 'update') return deps.client.report(command.id).rename(command.name)
  if (command.action === 'snapshot') return deps.client.report(command.id).exportSnapshot()
  return deps.client.report(command.id).remove()
}

export const runReportPageCommand = (deps: CliCommandDeps, command: ReportPageCommand) => {
  if (command.action === 'add')
    return deps.client.report(command.reportId).createPage(command.title ? { title: command.title } : undefined)
  if (command.action === 'remove') return deps.client.report(command.reportId).removePage(command.pageId)
  if (command.action === 'reorder') return deps.client.report(command.reportId).reorderPages(command.pageIds)
  return deps.client.report(command.reportId).updatePage(command.pageId, toPageUpdate(command))
}
