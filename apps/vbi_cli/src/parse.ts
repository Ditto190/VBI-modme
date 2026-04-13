import { parseArgs } from './flags.js'
import type { CliCommand, ReportPageCommand } from './types.js'

const requireValue = (value: string | undefined, message: string) => {
  if (!value) throw new Error(message)
  return value
}

const parseReportPage = (positionals: string[], flags: Record<string, string>): ReportPageCommand => {
  const action = requireValue(positionals[2], 'report page action is required')
  const reportId = requireValue(positionals[3], 'report id is required')

  if (action === 'add') return { action, kind: 'report-page', reportId, title: flags['--title'] }
  if (action === 'remove')
    return { action, kind: 'report-page', pageId: requireValue(positionals[4], 'page id is required'), reportId }
  if (action === 'reorder') {
    const raw = requireValue(flags['--page-ids'], '--page-ids is required')
    return {
      action,
      kind: 'report-page',
      pageIds: raw
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      reportId,
    }
  }
  if (action === 'update') {
    return {
      action,
      chartId: flags['--chart-id'],
      insightId: flags['--insight-id'],
      kind: 'report-page',
      pageId: requireValue(positionals[4], 'page id is required'),
      reportId,
      title: flags['--title'],
    }
  }
  throw new Error(`unknown report page action: ${action}`)
}

export const parseCommand = (argv: string[]): CliCommand => {
  const { flags, positionals } = parseArgs(argv)
  const resource = positionals[0]
  const action = positionals[1]

  if (!resource || flags['--help'] === 'true') return { kind: 'help' }
  if (resource === 'chart') {
    if (action === 'list') return { action, kind: 'chart' }
    if (action === 'create') return { action, kind: 'chart', name: flags['--name'] }
    if (action === 'get' || action === 'remove')
      return { action, id: requireValue(positionals[2], 'chart id is required'), kind: 'chart' }
    if (action === 'update')
      return {
        action,
        id: requireValue(positionals[2], 'chart id is required'),
        kind: 'chart',
        name: requireValue(flags['--name'], '--name is required'),
      }
  }
  if (resource === 'insight') {
    if (action === 'list') return { action, kind: 'insight' }
    if (action === 'create') return { action, content: flags['--content'], kind: 'insight', name: flags['--name'] }
    if (action === 'get' || action === 'remove')
      return { action, id: requireValue(positionals[2], 'insight id is required'), kind: 'insight' }
    if (action === 'update')
      return {
        action,
        content: flags['--content'],
        id: requireValue(positionals[2], 'insight id is required'),
        kind: 'insight',
        name: flags['--name'],
      }
  }
  if (resource === 'report') {
    if (action === 'page') return parseReportPage(positionals, flags)
    if (action === 'list') return { action, kind: 'report' }
    if (action === 'create') return { action, kind: 'report', name: flags['--name'] }
    if (action === 'get' || action === 'remove' || action === 'snapshot')
      return { action, id: requireValue(positionals[2], 'report id is required'), kind: 'report' }
    if (action === 'update')
      return {
        action,
        id: requireValue(positionals[2], 'report id is required'),
        kind: 'report',
        name: requireValue(flags['--name'], '--name is required'),
      }
  }

  throw new Error(`unknown command: ${positionals.join(' ')}`)
}
