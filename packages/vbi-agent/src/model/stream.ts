import type { ModelMessage, TextStreamPart, ToolSet } from 'ai'
import type { ModelTurnResult, PendingToolCall } from '../types.js'

export const extractText = (message: ModelMessage): string => {
  if (typeof message.content === 'string') return message.content
  return message.content
    .filter((part): part is { type: 'text'; text: string } => part.type === 'text')
    .map((part) => part.text)
    .join('')
}

const parseArguments = (value: string) => {
  try {
    return JSON.parse(value) as Record<string, unknown>
  } catch (error) {
    throw new Error(`model returned invalid tool arguments: ${error instanceof Error ? error.message : String(error)}`)
  }
}

const createAssistantMessage = (content: string, reasoningContent: string, calls: PendingToolCall[]): ModelMessage => ({
  role: 'assistant',
  content: [
    ...(reasoningContent ? [{ type: 'reasoning' as const, text: reasoningContent }] : []),
    ...(content ? [{ type: 'text' as const, text: content }] : []),
    ...calls.map((call) => ({
      type: 'tool-call' as const,
      toolCallId: call.id,
      toolName: call.name,
      input: call.arguments,
    })),
  ],
})

const readTurnResult = (content: string, reasoningContent: string, calls: PendingToolCall[]): ModelTurnResult => ({
  assistant: createAssistantMessage(content, reasoningContent, calls),
  outcome: calls.length === 0 ? { content, type: 'final' } : { calls, type: 'tool' },
})

export const readAiStream = async (
  stream: AsyncIterable<TextStreamPart<ToolSet>>,
  onTextDelta?: (chunk: string) => void,
) => {
  let content = ''
  let reasoningContent = ''
  const calls: PendingToolCall[] = []
  for await (const part of stream) {
    if (part.type === 'reasoning-delta') reasoningContent += part.text
    if (part.type === 'text-delta') {
      content += part.text
      onTextDelta?.(part.text)
    }
    if (part.type === 'tool-call') {
      calls.push({
        arguments: parseArguments(typeof part.input === 'string' ? part.input : JSON.stringify(part.input ?? {})),
        id: part.toolCallId,
        name: part.toolName,
      })
    }
    if (part.type === 'error') throw part.error
  }
  return readTurnResult(content, reasoningContent, calls)
}
