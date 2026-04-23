import type { CliCommandDeps, InsightCommand } from './types.js'

const toCreateInput = (command: Extract<InsightCommand, { action: 'create' }>) =>
  command.name || command.content ? { content: command.content, name: command.name } : undefined

const toUpdateInput = (command: Extract<InsightCommand, { action: 'update' }>) => ({
  ...(command.content === undefined ? {} : { content: command.content }),
  ...(command.name === undefined ? {} : { name: command.name }),
})

export const runInsightCommand = (deps: CliCommandDeps, command: InsightCommand) => {
  if (command.action === 'list')
    return deps.client.listInsights?.() ?? Promise.reject(new Error('insight list is not supported'))
  if (command.action === 'create') return deps.client.insight().create(toCreateInput(command))
  if (command.action === 'get') return deps.client.insight(command.id).getDetail()
  if (command.action === 'update') return deps.client.insight(command.id).update(toUpdateInput(command))
  return deps.client.insight(command.id).remove()
}
