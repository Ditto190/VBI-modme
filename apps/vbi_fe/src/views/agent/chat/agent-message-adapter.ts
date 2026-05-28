'use client'

import type { AppendMessage, ThreadMessageLike } from '@assistant-ui/react'
import type { AgentMessage } from '@earendil-works/pi-agent-core'
import { readAgentContentText } from '../agent-storage'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

type AssistantContentPart = Exclude<ThreadMessageLike['content'], string>[number]

export type AgentThreadMessage = (AgentMessage | Record<string, unknown>) & object

type AgentToolResult = {
  content: unknown
  details?: Record<string, unknown>
  isError: boolean
}

export type AgentMessageConversionContext = {
  conversationId: string
  indices: WeakMap<object, number>
  toolResultsById: Map<string, AgentToolResult>
  toolResultsByPart: WeakMap<object, AgentToolResult>
}

export type PreparedAgentMessages = {
  context: AgentMessageConversionContext
  messages: AgentThreadMessage[]
}

export type ProjectedAgentThreadMessage = {
  source: AgentThreadMessage
  threadMessage: ThreadMessageLike
}

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

export const createAgentThreadMessageId = (conversationId: string, message: unknown, index: number) => {
  const timestamp = isRecord(message) && typeof message.timestamp === 'number' ? message.timestamp : index
  const role = isRecord(message) && typeof message.role === 'string' ? message.role : 'message'
  return `${conversationId}:${index}:${timestamp}:${role}`
}

export const createAgentMessageConversionContext = (
  conversationId: string,
  messages: readonly AgentThreadMessage[],
  toolResults: Pick<AgentMessageConversionContext, 'toolResultsById' | 'toolResultsByPart'> = {
    toolResultsById: new Map(),
    toolResultsByPart: new WeakMap(),
  },
): AgentMessageConversionContext => {
  const indices = new WeakMap<object, number>()

  messages.forEach((message, index) => {
    indices.set(message, index)
  })

  return {
    conversationId,
    indices,
    toolResultsById: toolResults.toolResultsById,
    toolResultsByPart: toolResults.toolResultsByPart,
  }
}

const readToolResult = (message: Record<string, unknown>): AgentToolResult => ({
  content: message.content,
  details: isRecord(message.details) ? message.details : undefined,
  isError: message.isError === true,
})

const mergeToolResultIntoAssistantMessage = (message: Record<string, unknown>, result: Record<string, unknown>) => {
  if (message.role !== 'assistant' || !Array.isArray(message.content)) return null

  const toolCallId = typeof result.toolCallId === 'string' ? result.toolCallId : ''
  const toolName = typeof result.toolName === 'string' ? result.toolName : ''
  const toolResult = readToolResult(result)
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

/** @deprecated UI rendering uses prepareAgentMessagesForAssistantUi to project tool results without rewriting messages. */
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

const collectRawToolCalls = (messages: readonly AgentMessage[]) => {
  const toolCallsById = new Map<string, Record<string, unknown>>()
  const toolCallsByName = new Map<string, Record<string, unknown>[]>()

  for (const message of messages) {
    const record = message as unknown
    if (!isRecord(record) || !Array.isArray(record.content)) continue

    for (const part of record.content) {
      if (!isToolCallBlock(part)) continue
      const toolCallId = readToolCallId(part)
      const toolName = readToolName(part)
      if (toolCallId) toolCallsById.set(toolCallId, part)
      if (toolName) {
        const toolCalls = toolCallsByName.get(toolName) ?? []
        toolCalls.push(part)
        toolCallsByName.set(toolName, toolCalls)
      }
    }
  }

  return { toolCallsById, toolCallsByName }
}

const shouldProjectToolResultIntoToolCall = (
  message: Record<string, unknown>,
  toolCalls: ReturnType<typeof collectRawToolCalls>,
) => {
  const toolCallId = typeof message.toolCallId === 'string' ? message.toolCallId : ''
  const toolName = typeof message.toolName === 'string' ? message.toolName : ''

  if (toolCallId) return toolCalls.toolCallsById.has(toolCallId)
  return toolName ? toolCalls.toolCallsByName.has(toolName) : false
}

export const prepareAgentMessagesForAssistantUi = (
  conversationId: string,
  messages: readonly AgentMessage[],
): PreparedAgentMessages => {
  const projectedMessages: AgentThreadMessage[] = []
  const toolResultsById = new Map<string, AgentToolResult>()
  const toolResultsByPart = new WeakMap<object, AgentToolResult>()
  const consumedNameFallbacks = new Map<string, number>()
  const toolCalls = collectRawToolCalls(messages)

  for (const message of messages) {
    const record = message as unknown
    if (!isRecord(record) || record.role !== 'toolResult' || !shouldProjectToolResultIntoToolCall(record, toolCalls)) {
      projectedMessages.push(message)
      continue
    }

    const toolResult = readToolResult(record)
    const toolCallId = typeof record.toolCallId === 'string' ? record.toolCallId : ''
    const toolName = typeof record.toolName === 'string' ? record.toolName : ''
    if (toolCallId) {
      toolResultsById.set(toolCallId, toolResult)
      const toolCall = toolCalls.toolCallsById.get(toolCallId)
      if (toolCall) toolResultsByPart.set(toolCall, toolResult)
      continue
    }

    const nameFallbacks = toolName ? toolCalls.toolCallsByName.get(toolName) : undefined
    if (nameFallbacks?.length) {
      const fallbackIndex = consumedNameFallbacks.get(toolName) ?? 0
      const toolCall = nameFallbacks[fallbackIndex]
      consumedNameFallbacks.set(toolName, fallbackIndex + 1)
      if (toolCall) toolResultsByPart.set(toolCall, toolResult)
    }
  }

  return {
    context: createAgentMessageConversionContext(conversationId, projectedMessages, {
      toolResultsById,
      toolResultsByPart,
    }),
    messages: projectedMessages,
  }
}

const resolveProjectedToolResult = (
  part: Record<string, unknown>,
  context: AgentMessageConversionContext,
): AgentToolResult | undefined => {
  if (isRecord(part.result)) {
    return {
      content: part.result.content,
      details: isRecord(part.result.details) ? part.result.details : undefined,
      isError: part.isError === true,
    }
  }

  const directResult = context.toolResultsByPart.get(part)
  if (directResult) return directResult

  const toolCallId = readToolCallId(part)
  if (toolCallId) return context.toolResultsById.get(toolCallId)
  return undefined
}

const mapAssistantPart = (
  part: unknown,
  context: AgentMessageConversionContext,
): AssistantContentPart | null => {
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
    const result = resolveProjectedToolResult(part, context)
    return {
      type: 'tool-call',
      toolCallId: typeof part.id === 'string' ? part.id : `${part.name}:${stringifyJson(args)}`,
      toolName: part.name,
      args: args as never,
      argsText: stringifyJson(args),
      ...(result ? { result: { content: result.content, details: result.details } } : {}),
      ...(result?.isError || part.isError === true ? { isError: true } : {}),
    }
  }

  const text = readAgentContentText([part])
  return text ? { type: 'text', text } : null
}

/** @deprecated assistant-ui GroupedParts now preserves stream order and groups adjacent progress parts. */
export const coalesceReasoningParts = (parts: AssistantContentPart[]): AssistantContentPart[] => {
  return parts
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

export function convertAgentMessageToThreadMessage(
  context: AgentMessageConversionContext,
  message: AgentThreadMessage,
): ThreadMessageLike
export function convertAgentMessageToThreadMessage(
  conversationId: string,
  message: AgentThreadMessage,
  index: number,
): ThreadMessageLike
export function convertAgentMessageToThreadMessage(
  contextOrConversationId: AgentMessageConversionContext | string,
  message: AgentThreadMessage,
  legacyIndex = 0,
): ThreadMessageLike {
  const context =
    typeof contextOrConversationId === 'string'
      ? createAgentMessageConversionContext(contextOrConversationId, [message])
      : contextOrConversationId
  if (typeof contextOrConversationId === 'string') context.indices.set(message, legacyIndex)

  const record = message as unknown
  const index = context.indices.get(message) ?? 0
  const timestamp = isRecord(record) && typeof record.timestamp === 'number' ? record.timestamp : Date.now()
  const createdAt = new Date(timestamp)
  const id = createAgentThreadMessageId(context.conversationId, record, index)

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
      ? record.content
          .map((part) => mapAssistantPart(part, context))
          .filter((part): part is AssistantContentPart => Boolean(part))
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

export const convertAgentMessageForAssistantUi = (
  context: AgentMessageConversionContext,
  message: AgentThreadMessage,
): ThreadMessageLike => convertAgentMessageToThreadMessage(context, message)

export const projectAgentMessagesForAssistantUi = ({
  conversationId,
  isRunning,
  messages,
}: {
  conversationId: string
  isRunning: boolean
  messages: readonly AgentMessage[]
}): ProjectedAgentThreadMessage[] => {
  const nextMessages =
    isRunning && messages.length > 0
      ? messages.map((message, index) =>
          index === messages.length - 1 && isRecord(message) ? ({ ...message } as AgentMessage) : message,
        )
      : messages
  const prepared = prepareAgentMessagesForAssistantUi(conversationId, nextMessages)

  return prepared.messages.map((message) => ({
    source: message,
    threadMessage: convertAgentMessageForAssistantUi(prepared.context, message),
  }))
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
