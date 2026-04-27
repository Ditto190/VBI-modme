import type { AgentActivity, AgentRuntimeController } from '@visactor/vbi-agent'
import type { CliIO } from './types/index.js'

const labelByKind: Record<AgentActivity['kind'], string> = {
  assistant: 'assistant',
  tool: 'tool',
  user: 'user',
}

const formatActivity = (activity: AgentActivity) => {
  const lines = [`[${labelByKind[activity.kind]}] ${activity.text}`]
  if (activity.detail) lines.push(activity.detail)
  return lines.join('\n')
}

export const printPromptProgress = (runtime: AgentRuntimeController, io: CliIO) => {
  let printedCount = runtime.getState().activities.length
  return runtime.subscribe((state) => {
    const nextActivities = state.activities.slice(printedCount)
    printedCount = state.activities.length
    nextActivities.forEach((activity) => io.writeOutput?.(formatActivity(activity)))
  })
}
