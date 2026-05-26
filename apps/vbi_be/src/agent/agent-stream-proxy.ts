import { BadRequestException } from '@nestjs/common'
import type { AssistantMessageEvent, Model, SimpleStreamOptions, Usage } from '@earendil-works/pi-ai'

export type ProxyAssistantMessageEvent =
  | { type: 'start' }
  | { type: 'text_start'; contentIndex: number }
  | { type: 'text_delta'; contentIndex: number; delta: string }
  | { type: 'text_end'; contentIndex: number; contentSignature?: string }
  | { type: 'thinking_start'; contentIndex: number }
  | { type: 'thinking_delta'; contentIndex: number; delta: string }
  | { type: 'thinking_end'; contentIndex: number; contentSignature?: string }
  | { type: 'toolcall_start'; contentIndex: number; id: string; toolName: string }
  | { type: 'toolcall_delta'; contentIndex: number; delta: string }
  | { type: 'toolcall_end'; contentIndex: number }
  | { type: 'done'; reason: 'stop' | 'length' | 'toolUse'; usage: Usage }
  | { type: 'error'; reason: 'aborted' | 'error'; errorMessage?: string; usage: Usage }

const allowedStreamOptionKeys = [
  'cacheRetention',
  'maxRetryDelayMs',
  'maxTokens',
  'metadata',
  'reasoning',
  'sessionId',
  'temperature',
  'thinkingBudgets',
  'transport',
] as const

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const readToolCallBlock = (event: Extract<AssistantMessageEvent, { type: 'toolcall_start' }>) => {
  const block = event.partial.content[event.contentIndex]
  if (!block || block.type !== 'toolCall') {
    throw new BadRequestException('Invalid tool call event from provider stream')
  }
  return block
}

const readTextSignature = (
  event: Extract<AssistantMessageEvent, { type: 'text_end' | 'thinking_end' }>,
): string | undefined => {
  const block = event.partial.content[event.contentIndex]
  if (event.type === 'text_end' && block?.type === 'text') return block.textSignature
  if (event.type === 'thinking_end' && block?.type === 'thinking') return block.thinkingSignature
  return undefined
}

export const sanitizeStreamOptions = (options: unknown): Partial<SimpleStreamOptions> => {
  if (!isRecord(options)) return {}
  return Object.fromEntries(
    allowedStreamOptionKeys.filter((key) => options[key] !== undefined).map((key) => [key, options[key]]),
  ) as Partial<SimpleStreamOptions>
}

export const emptyUsage = (): Usage => ({
  input: 0,
  output: 0,
  cacheRead: 0,
  cacheWrite: 0,
  totalTokens: 0,
  cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0 },
})

export const toProxyAssistantMessageEvent = (event: AssistantMessageEvent): ProxyAssistantMessageEvent => {
  if (event.type === 'start') return { type: 'start' }
  if (event.type === 'text_start') return { type: 'text_start', contentIndex: event.contentIndex }
  if (event.type === 'text_delta') {
    return { type: 'text_delta', contentIndex: event.contentIndex, delta: event.delta }
  }
  if (event.type === 'text_end') {
    const contentSignature = readTextSignature(event)
    return {
      type: 'text_end',
      contentIndex: event.contentIndex,
      ...(contentSignature ? { contentSignature } : {}),
    }
  }
  if (event.type === 'thinking_start') return { type: 'thinking_start', contentIndex: event.contentIndex }
  if (event.type === 'thinking_delta') {
    return { type: 'thinking_delta', contentIndex: event.contentIndex, delta: event.delta }
  }
  if (event.type === 'thinking_end') {
    const contentSignature = readTextSignature(event)
    return {
      type: 'thinking_end',
      contentIndex: event.contentIndex,
      ...(contentSignature ? { contentSignature } : {}),
    }
  }
  if (event.type === 'toolcall_start') {
    const toolCall = readToolCallBlock(event)
    return {
      type: 'toolcall_start',
      contentIndex: event.contentIndex,
      id: toolCall.id,
      toolName: toolCall.name,
    }
  }
  if (event.type === 'toolcall_delta') {
    return { type: 'toolcall_delta', contentIndex: event.contentIndex, delta: event.delta }
  }
  if (event.type === 'toolcall_end') return { type: 'toolcall_end', contentIndex: event.contentIndex }
  if (event.type === 'done') {
    return { type: 'done', reason: event.reason, usage: event.message.usage }
  }
  return {
    type: 'error',
    reason: event.reason,
    errorMessage: event.error.errorMessage,
    usage: event.error.usage ?? emptyUsage(),
  }
}

export const resolveModelIdAlias = (provider: string, modelId: string) => {
  if (provider === 'deepseek' && modelId === 'deepseek-chat') return 'deepseek-v4-flash'
  if (provider === 'deepseek' && modelId === 'deepseek-reasoner') return 'deepseek-v4-pro'
  return modelId
}

export const sanitizeModel = <TApi extends string>(model: Model<TApi>, baseUrl?: string): Model<TApi> =>
  baseUrl ? ({ ...model, baseUrl } as Model<TApi>) : model
