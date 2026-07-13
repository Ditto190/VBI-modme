'use client'

import type { ThreadMessageLike } from '@assistant-ui/react'
import type { AgentMessage } from '@earendil-works/pi-agent-core'
import { readAgentContentText } from '../agent-storage'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

type AssistantContentPart = Exclude<ThreadMessageLike['content'], string>[number]

type AgentThreadMessage = (AgentMessage | Record<string, unknown>) & object

type AgentToolResult = {
  content: unknown
  details?: Record<string, unknown>
  isError: boolean
}

type AgentMessageConversionContext = {
  conversationId: string
  indices: WeakMap<object, number>
  toolResultsByPart: WeakMap<object, AgentToolResult>
}

type PreparedAgentMessages = {
  context: AgentMessageConversionContext
  messages: AgentThreadMessage[]
}

const stringifyJson = (value: unknown) => {
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

const createAgentThreadMessageId = (conversationId: string, message: unknown, index: number) => {
  const timestamp = isRecord(message) && typeof message.timestamp === 'number' ? message.timestamp : index
  const role = isRecord(message) && typeof message.role === 'string' ? message.role : 'message'
  return `${conversationId}:${index}:${timestamp}:${role}`
}

const readToolResult = (message: Record<string, unknown>): AgentToolResult => ({
  content: message.content,
  details: isRecord(message.details) ? message.details : undefined,
  isError: message.isError === true,
})

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

const prepareAgentMessagesForAssistantUi = (
  conversationId: string,
  messages: readonly AgentMessage[],
): PreparedAgentMessages => {
  const projectedMessages: AgentThreadMessage[] = []
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

  const indices = new WeakMap<object, number>()
  projectedMessages.forEach((message, index) => {
    indices.set(message, index)
  })

  return {
    context: {
      conversationId,
      indices,
      toolResultsByPart,
    },
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
  return undefined
}

const mapAssistantPart = (part: unknown, context: AgentMessageConversionContext): AssistantContentPart | null => {
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

function convertAgentMessageToThreadMessage(
  context: AgentMessageConversionContext,
  message: AgentThreadMessage,
): ThreadMessageLike {
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

export const projectAgentMessagesForAssistantUi = ({
  conversationId,
  messages,
}: {
  conversationId: string
  messages: readonly AgentMessage[]
}): ThreadMessageLike[] => {
  const prepared = prepareAgentMessagesForAssistantUi(conversationId, messages)
  return prepared.messages.map((message) => convertAgentMessageToThreadMessage(prepared.context, message))
}
