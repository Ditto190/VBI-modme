import { transcriptItemFromEvent } from './agent/pi-event-view.js'
import type { Agent, AgentEvent } from '@visactor/vbi-agent'
import type { CliIO } from './types/index.js'

const formatItem = (event: AgentEvent) => {
  const item = transcriptItemFromEvent(event)
  if (!item) return undefined
  const lines = [`[${item.kind}] ${item.text}`]
  if (item.detail) lines.push(item.detail)
  return lines.join('\n')
}

export const printPromptProgress = (agent: Agent, io: CliIO) =>
  agent.subscribe((event) => {
    const text = formatItem(event)
    if (text) io.writeOutput?.(text)
  })
