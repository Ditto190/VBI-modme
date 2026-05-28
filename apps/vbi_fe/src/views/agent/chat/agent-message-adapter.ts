'use client'

import type { AppendMessage, ThreadMessageLike } from '@assistant-ui/react'
import type { AgentMessage } from '@earendil-works/pi-agent-core'
import { readAgentContentText } from '../agent-storage'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

type AssistantContentPart = Exclude<ThreadMessageLike['content'], string>[number]

export type AgentThreadMessage = (AgentMessage | Record<string, unknown>) & object

export const largeUserMessagePreviewLength = 4_000
export const largeUserMessageThreshold = 20_000

export const stringifyJson = (value: unknown) => {
  try {
    return JSON.stringify(value ?? {}, null, 2)
  } catch {
    return '{}'
  }
}

const readToolCallId = (part: unknown) => {
  if (!isRecord(part)) return ''
  if (typeof part.id === 'string') return part.id
  if (typeof part.toolCallId === 'string') return part.toolCallId
  return ''
}

const readToolName = (part: unknown) => {
  if (!isRecord(part)) return ''
  if (typeof part.name === 'string') return part.name
  if (typeof part.toolName === 'string') return part.toolName
  return ''
}

const isToolCallBlock = (part: unknown) => isRecord(part) && part.type === 'toolCall'

const readMessageRole = (message: unknown) =>
  isRecord(message) && typeof message.role === 'string' ? message.role : ''

export const createAgentThreadMessageId = (conversationId: string, message: unknown, index: number) => {
  const timestamp = isRecord(message) && typeof message.timestamp === 'number' ? message.timestamp : index
  const role = isRecord(message) && typeof message.role === 'string' ? message.role : 'message'
  return `${conversationId}:${index}:${timestamp}:${role}`
}

const mergeToolResultIntoAssistantMessage = (message: Record<string, unknown>, result: Record<string, unknown>) => {
  if (message.role !== 'assistant' || !Array.isArray(message.content)) return null

  const toolCallId = typeof result.toolCallId === 'string' ? result.toolCallId : ''
  const toolName = typeof result.toolName === 'string' ? result.toolName : ''
  const toolResult = {
    content: result.content,
    details: isRecord(result.details) ? result.details : undefined,
    isError: result.isError === true,
  }
  let matched = false
  const nextContent = message.content.map((part) => {
    if (!isToolCallBlock(part)) return part
    const isIdMatch = toolCallId && readToolCallId(part) === toolCallId
    const isNameFallback = !toolCallId && toolName && readToolName(part) === toolName && !isRecord(part.result)
    if (!isIdMatch && !isNameFallback) return part
    matched = true
    return {
      ...part,
      isError: toolResult.isError,
      result: {
        content: toolResult.content,
        details: toolResult.details,
      },
    }
  })

  return matched ? { ...message, content: nextContent } : null
}

export const mergeAgentToolResults = (messages: AgentMessage[]): AgentThreadMessage[] => {
  const mergedMessages: AgentThreadMessage[] = []

  for (const message of messages) {
    const record = message as unknown
    if (!isRecord(record) || record.role !== 'toolResult') {
      mergedMessages.push(message)
      continue
    }

    let merged = false
    for (let index = mergedMessages.length - 1; index >= 0; index -= 1) {
      const candidate = mergedMessages[index]
      if (!isRecord(candidate)) continue
      const nextMessage = mergeToolResultIntoAssistantMessage(candidate, record)
      if (!nextMessage) continue
      mergedMessages[index] = nextMessage
      merged = true
      break
    }

    if (!merged) {
      mergedMessages.push(message)
    }
  }

  return mergedMessages
}

const mapAssistantPart = (part: unknown): AssistantContentPart | null => {
  if (!isRecord(part) || typeof part.type !== 'string') return null

  if (part.type === 'text' && typeof part.text === 'string') {
    return { type: 'text', text: part.text }
  }
  if (part.type === 'thinking' || part.type === 'reasoning') {
    const text =
      (typeof part.thinking === 'string' && part.thinking) ||
      (typeof part.reasoning === 'string' && part.reasoning) ||
      (typeof part.reasoning_content === 'string' && part.reasoning_content) ||
      (typeof part.text === 'string' && part.text) ||
      ''
    if (text) return { type: 'reasoning', text }
  }
  if (part.type === 'toolCall' && typeof part.name === 'string') {
    const args = isRecord(part.arguments) ? part.arguments : {}
    const result = isRecord(part.result)
      ? {
          content: part.result.content,
          details: isRecord(part.result.details) ? part.result.details : undefined,
        }
      : undefined
    return {
      type: 'tool-call',
      toolCallId: typeof part.id === 'string' ? part.id : `${part.name}:${stringifyJson(args)}`,
      toolName: part.name,
      args: args as never,
      argsText: stringifyJson(args),
      ...(result ? { result } : {}),
      ...(part.isError === true ? { isError: true } : {}),
    }
  }

  const text = readAgentContentText([part])
  return text ? { type: 'text', text } : null
}

const isChainOfThoughtPart = (part: AssistantContentPart) => part.type === 'reasoning' || part.type === 'tool-call'

const countChainOfThoughtRuns = (parts: AssistantContentPart[]) => {
  let runs = 0
  let inRun = false

  for (const part of parts) {
    if (isChainOfThoughtPart(part)) {
      if (!inRun) runs += 1
      inRun = true
      continue
    }

    inRun = false
  }

  return runs
}

export const coalesceReasoningParts = (parts: AssistantContentPart[]): AssistantContentPart[] => {
  const reasoningParts = parts.filter((part) => part.type === 'reasoning')
  const chainRunCount = countChainOfThoughtRuns(parts)
  if (reasoningParts.length <= 1 && chainRunCount <= 1) return parts

  const reasoningText = reasoningParts
    .map((part) => part.text.trim())
    .filter(Boolean)
    .join('\n\n')
  let insertedReasoning = false
  const chainParts: AssistantContentPart[] = []

  for (const part of parts) {
    if (part.type === 'tool-call') {
      chainParts.push(part)
      continue
    }

    if (part.type === 'reasoning' && !insertedReasoning && reasoningText) {
      insertedReasoning = true
      chainParts.push({ type: 'reasoning', text: reasoningText } as AssistantContentPart)
    }
  }

  let insertedChain = false
  const coalescedParts: AssistantContentPart[] = []
  for (const part of parts) {
    if (!isChainOfThoughtPart(part)) {
      coalescedParts.push(part)
      continue
    }

    if (!insertedChain) {
      insertedChain = true
      coalescedParts.push(...chainParts)
    }
  }

  return coalescedParts
}

const mapToolResultMessage = (message: Record<string, unknown>): ThreadMessageLike['content'] => {
  const toolName = typeof message.toolName === 'string' ? message.toolName : 'tool'
  const toolCallId = typeof message.toolCallId === 'string' ? message.toolCallId : `${toolName}:result`
  const details = isRecord(message.details) ? message.details : undefined

  return [
    {
      type: 'tool-call',
      toolCallId,
      toolName,
      args: {},
      argsText: '{}',
      result: {
        content: message.content,
        details,
      },
      isError: message.isError === true,
    },
  ]
}

export const convertAgentMessageToThreadMessage = (
  conversationId: string,
  message: AgentThreadMessage,
  index: number,
): ThreadMessageLike => {
  const record = message as unknown
  const timestamp = isRecord(record) && typeof record.timestamp === 'number' ? record.timestamp : Date.now()
  const createdAt = new Date(timestamp)
  const id = createAgentThreadMessageId(conversationId, record, index)

  if (!isRecord(record)) {
    return { id, role: 'assistant', content: '', createdAt }
  }

  if (record.role === 'user') {
    return {
      id,
      role: 'user',
      content: [{ type: 'text', text: readAgentContentText(record.content) }],
      createdAt,
    }
  }

  if (record.role === 'toolResult') {
    return {
      id,
      role: 'assistant',
      content: mapToolResultMessage(record),
      createdAt,
      status:
        record.isError === true
          ? { type: 'incomplete', reason: 'error', error: 'Tool execution failed' }
          : { type: 'complete', reason: 'stop' },
    }
  }

  if (record.role === 'assistant') {
    const content = Array.isArray(record.content)
      ? coalesceReasoningParts(
          record.content.map(mapAssistantPart).filter((part): part is AssistantContentPart => Boolean(part)),
        )
      : [{ type: 'text' as const, text: readAgentContentText(record.content) }]

    return {
      id,
      role: 'assistant',
      content,
      createdAt,
      ...(typeof record.errorMessage === 'string'
        ? { status: { type: 'incomplete' as const, reason: 'error' as const, error: record.errorMessage } }
        : {}),
    }
  }

  return {
    id,
    role: 'assistant',
    content: readAgentContentText(record.content),
    createdAt,
  }
}

export const findLatestAssistantMessageId = (conversationId: string, messages: readonly AgentThreadMessage[]) => {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index]
    if (readMessageRole(message) !== 'assistant') continue
    return createAgentThreadMessageId(conversationId, message, index)
  }

  return ''
}

export const findLatestCopyableAssistantMessageId = (
  conversationId: string,
  messages: readonly AgentThreadMessage[],
  isRunning: boolean,
) => {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index]
    if (readMessageRole(message) !== 'assistant') continue
    if (isRunning && index === messages.length - 1) continue
    return createAgentThreadMessageId(conversationId, message, index)
  }

  return ''
}

export const readAppendMessageText = (message: AppendMessage) => {
  const text = message.content
    .map((part) => {
      if (part.type === 'text') return part.text
      if (part.type === 'image') return part.filename ? `[Image: ${part.filename}]` : '[Image attached]'
      if (part.type === 'file') return `[File: ${part.filename || part.mimeType}]`
      return ''
    })
    .filter(Boolean)
    .join('\n')
    .trim()
  const attachments = (message.attachments ?? [])
    .map((attachment) => `- ${attachment.type}: ${attachment.name}`)
    .filter(Boolean)
    .join('\n')

  if (!attachments) return text
  return [text, `Attached files:\n${attachments}`].filter(Boolean).join('\n\n').trim()
}

const escapeMarkdownTableCell = (value: string) => value.replace(/\\/g, '\\\\').replace(/\|/g, '\\|').trim()

export const normalizeTabSeparatedTables = (text: string) => {
  const lines = text.split('\n')
  const normalizedLines: string[] = []

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    if (!line.includes('\t')) {
      normalizedLines.push(line)
      continue
    }

    const tableLines: string[] = []
    while (index < lines.length && lines[index].includes('\t') && lines[index].trim()) {
      tableLines.push(lines[index])
      index += 1
    }
    index -= 1

    const rows = tableLines.map((row) => row.split('\t').map(escapeMarkdownTableCell))
    const columnCount = Math.max(...rows.map((row) => row.length))
    if (rows.length < 2 || columnCount < 2) {
      normalizedLines.push(...tableLines)
      continue
    }

    const padRow = (row: string[]) => Array.from({ length: columnCount }, (_, columnIndex) => row[columnIndex] ?? '')
    const [header, ...body] = rows.map(padRow)
    normalizedLines.push(`| ${header.join(' | ')} |`)
    normalizedLines.push(`| ${header.map(() => '---').join(' | ')} |`)
    body.forEach((row) => normalizedLines.push(`| ${row.join(' | ')} |`))
  }

  return normalizedLines.join('\n')
}
