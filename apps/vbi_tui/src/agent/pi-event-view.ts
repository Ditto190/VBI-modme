import { stringifyJson } from './text.js'
import type { AgentEvent, AgentMessage, AgentToolResult } from '@visactor/vbi-agent'

export type AgentTranscriptKind = 'assistant' | 'error' | 'tool' | 'user'

export interface AgentTranscriptItem {
  detail?: string
  id?: string
  kind: AgentTranscriptKind
  status?: 'failed' | 'running' | 'succeeded'
  text: string
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

export const readMessageText = (message: AgentMessage) => {
  const content = 'content' in message ? message.content : undefined
  if (typeof content === 'string') return content
  if (!Array.isArray(content)) return ''
  return content
    .filter((part): part is { text: string; type: 'text' } => isRecord(part) && part.type === 'text')
    .map((part) => part.text)
    .join('')
}

const readToolCalls = (message: AgentMessage) => {
  const content = 'content' in message ? message.content : undefined
  if (!Array.isArray(content)) return []
  return content.filter(
    (part): part is { arguments: Record<string, unknown>; id: string; name: string; type: 'toolCall' } =>
      isRecord(part) && part.type === 'toolCall',
  )
}

const readToolResultText = (result: AgentToolResult<unknown>) =>
  result.content
    .filter((part): part is { text: string; type: 'text' } => isRecord(part) && part.type === 'text')
    .map((part) => part.text)
    .join('')

const readToolDetails = (result: AgentToolResult<unknown>) =>
  isRecord(result.details) && typeof result.details.summary === 'string'
    ? {
        display: typeof result.details.display === 'string' ? result.details.display : undefined,
        summary: result.details.summary,
      }
    : undefined

const formatToolCalls = (message: AgentMessage) => {
  const calls = readToolCalls(message)
  if (!calls.length) return undefined
  return {
    detail: calls
      .map((call, index) =>
        [`${index + 1}. ${call.name}`, 'Arguments:', '```json', stringifyJson(call.arguments), '```'].join('\n'),
      )
      .join('\n\n'),
    text: `Calling tool: ${calls.map((call) => call.name).join(', ')}`,
  }
}

export const transcriptItemFromEvent = (event: AgentEvent): AgentTranscriptItem | undefined => {
  if (event.type === 'message_end') {
    if (event.message.role === 'user') {
      return { kind: 'user', text: readMessageText(event.message) }
    }
    if (event.message.role === 'assistant') {
      const text = readMessageText(event.message)
      const calls = formatToolCalls(event.message)
      return { detail: calls?.detail, kind: 'assistant', text: text || calls?.text || '<empty response>' }
    }
  }
  if (event.type === 'tool_execution_start') {
    return {
      detail: ['Arguments:', '```json', stringifyJson(event.args), '```'].join('\n'),
      id: event.toolCallId,
      kind: 'tool',
      status: 'running',
      text: `${event.toolName} running`,
    }
  }
  if (event.type === 'tool_execution_end') {
    const result = event.result as AgentToolResult<unknown>
    const details = readToolDetails(result)
    return {
      detail: details?.display || readToolResultText(result) || stringifyJson(result.content),
      id: event.toolCallId,
      kind: 'tool',
      status: event.isError ? 'failed' : 'succeeded',
      text: details?.summary ?? `${event.toolName} ${event.isError ? 'failed' : 'completed'}`,
    }
  }
  if (event.type === 'turn_end' && event.message.role === 'assistant' && event.message.errorMessage) {
    return { kind: 'error', text: event.message.errorMessage }
  }
  return undefined
}

export class AgentTranscriptView {
  private readonly toolIndexes = new Map<string, number>()
  items: AgentTranscriptItem[] = []
  streamingAssistant = ''

  clear() {
    this.toolIndexes.clear()
    this.items = []
    this.streamingAssistant = ''
  }

  apply(event: AgentEvent) {
    if (event.type === 'message_update' && event.message.role === 'assistant') {
      this.streamingAssistant = readMessageText(event.message)
      return
    }
    if (event.type === 'message_end' && event.message.role === 'assistant') {
      this.streamingAssistant = ''
    }
    const item = transcriptItemFromEvent(event)
    if (!item) return
    if (item.kind === 'tool' && item.id) {
      const existingIndex = this.toolIndexes.get(item.id)
      if (existingIndex !== undefined) {
        this.items[existingIndex] = item
        return
      }
      this.toolIndexes.set(item.id, this.items.length)
    }
    this.items.push(item)
  }
}
