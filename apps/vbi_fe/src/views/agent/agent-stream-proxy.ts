import { EventStream, parseStreamingJson } from './pi-ai-browser'

type AgentModel = {
  api: string
  id: string
  provider: string
}

type Usage = {
  cacheRead: number
  cacheWrite: number
  cost: {
    cacheRead: number
    cacheWrite: number
    input: number
    output: number
    total: number
  }
  input: number
  output: number
  totalTokens: number
}

type AssistantMessage = {
  api: string
  content: Array<Record<string, unknown>>
  errorMessage?: string
  model: string
  provider: string
  role: 'assistant'
  stopReason: 'stop' | 'length' | 'toolUse' | 'error' | 'aborted'
  timestamp: number
  usage: Usage
}

type ProxyAssistantMessageEvent =
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

type AssistantMessageEvent =
  | { type: 'start'; partial: AssistantMessage }
  | { type: 'text_start'; contentIndex: number; partial: AssistantMessage }
  | { type: 'text_delta'; contentIndex: number; delta: string; partial: AssistantMessage }
  | { type: 'text_end'; contentIndex: number; content: string; partial: AssistantMessage }
  | { type: 'thinking_start'; contentIndex: number; partial: AssistantMessage }
  | { type: 'thinking_delta'; contentIndex: number; delta: string; partial: AssistantMessage }
  | { type: 'thinking_end'; contentIndex: number; content: string; partial: AssistantMessage }
  | { type: 'toolcall_start'; contentIndex: number; partial: AssistantMessage }
  | { type: 'toolcall_delta'; contentIndex: number; delta: string; partial: AssistantMessage }
  | { type: 'toolcall_end'; contentIndex: number; toolCall: Record<string, unknown>; partial: AssistantMessage }
  | { type: 'done'; reason: 'stop' | 'length' | 'toolUse'; message: AssistantMessage }
  | { type: 'error'; reason: 'aborted' | 'error'; error: AssistantMessage }

type StreamProxyOptions = Record<string, unknown> & {
  authToken: string
  proxyUrl: string
  signal?: AbortSignal
}

const emptyUsage = (): Usage => ({
  input: 0,
  output: 0,
  cacheRead: 0,
  cacheWrite: 0,
  totalTokens: 0,
  cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0 },
})

const serializableOptionKeys = [
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

const buildProxyRequestOptions = (options: StreamProxyOptions) =>
  Object.fromEntries(
    serializableOptionKeys.filter((key) => options[key] !== undefined).map((key) => [key, options[key]]),
  )

class ProxyMessageEventStream extends EventStream<AssistantMessageEvent, AssistantMessage> {
  constructor() {
    super(
      (event) => event.type === 'done' || event.type === 'error',
      (event) => {
        if (event.type === 'done') return event.message
        if (event.type === 'error') return event.error
        throw new Error('Unexpected event type')
      },
    )
  }
}

const createPartialMessage = (model: AgentModel): AssistantMessage => ({
  role: 'assistant',
  stopReason: 'stop',
  content: [],
  api: model.api,
  provider: model.provider,
  model: model.id,
  usage: emptyUsage(),
  timestamp: Date.now(),
})

const processProxyEvent = (
  proxyEvent: ProxyAssistantMessageEvent,
  partial: AssistantMessage,
): AssistantMessageEvent | undefined => {
  if (proxyEvent.type === 'start') return { type: 'start', partial }
  if (proxyEvent.type === 'text_start') {
    partial.content[proxyEvent.contentIndex] = { type: 'text', text: '' }
    return { type: 'text_start', contentIndex: proxyEvent.contentIndex, partial }
  }
  if (proxyEvent.type === 'text_delta') {
    const content = partial.content[proxyEvent.contentIndex]
    if (content?.type !== 'text') throw new Error('Received text_delta for non-text content')
    content.text = `${content.text ?? ''}${proxyEvent.delta}`
    return { type: 'text_delta', contentIndex: proxyEvent.contentIndex, delta: proxyEvent.delta, partial }
  }
  if (proxyEvent.type === 'text_end') {
    const content = partial.content[proxyEvent.contentIndex]
    if (content?.type !== 'text') throw new Error('Received text_end for non-text content')
    if (proxyEvent.contentSignature) content.textSignature = proxyEvent.contentSignature
    return { type: 'text_end', contentIndex: proxyEvent.contentIndex, content: String(content.text ?? ''), partial }
  }
  if (proxyEvent.type === 'thinking_start') {
    partial.content[proxyEvent.contentIndex] = { type: 'thinking', thinking: '' }
    return { type: 'thinking_start', contentIndex: proxyEvent.contentIndex, partial }
  }
  if (proxyEvent.type === 'thinking_delta') {
    const content = partial.content[proxyEvent.contentIndex]
    if (content?.type !== 'thinking') throw new Error('Received thinking_delta for non-thinking content')
    content.thinking = `${content.thinking ?? ''}${proxyEvent.delta}`
    return { type: 'thinking_delta', contentIndex: proxyEvent.contentIndex, delta: proxyEvent.delta, partial }
  }
  if (proxyEvent.type === 'thinking_end') {
    const content = partial.content[proxyEvent.contentIndex]
    if (content?.type !== 'thinking') throw new Error('Received thinking_end for non-thinking content')
    if (proxyEvent.contentSignature) content.thinkingSignature = proxyEvent.contentSignature
    return {
      type: 'thinking_end',
      contentIndex: proxyEvent.contentIndex,
      content: String(content.thinking ?? ''),
      partial,
    }
  }
  if (proxyEvent.type === 'toolcall_start') {
    partial.content[proxyEvent.contentIndex] = {
      type: 'toolCall',
      id: proxyEvent.id,
      name: proxyEvent.toolName,
      arguments: {},
      partialJson: '',
    }
    return { type: 'toolcall_start', contentIndex: proxyEvent.contentIndex, partial }
  }
  if (proxyEvent.type === 'toolcall_delta') {
    const content = partial.content[proxyEvent.contentIndex]
    if (content?.type !== 'toolCall') throw new Error('Received toolcall_delta for non-toolCall content')
    content.partialJson = `${content.partialJson ?? ''}${proxyEvent.delta}`
    content.arguments = parseStreamingJson(String(content.partialJson))
    partial.content[proxyEvent.contentIndex] = { ...content }
    return { type: 'toolcall_delta', contentIndex: proxyEvent.contentIndex, delta: proxyEvent.delta, partial }
  }
  if (proxyEvent.type === 'toolcall_end') {
    const content = partial.content[proxyEvent.contentIndex]
    if (content?.type !== 'toolCall') return undefined
    delete content.partialJson
    return { type: 'toolcall_end', contentIndex: proxyEvent.contentIndex, toolCall: content, partial }
  }
  if (proxyEvent.type === 'done') {
    partial.stopReason = proxyEvent.reason
    partial.usage = proxyEvent.usage
    return { type: 'done', reason: proxyEvent.reason, message: partial }
  }
  partial.stopReason = proxyEvent.reason
  partial.errorMessage = proxyEvent.errorMessage
  partial.usage = proxyEvent.usage
  return { type: 'error', reason: proxyEvent.reason, error: partial }
}

export const streamProxy = (model: AgentModel, context: unknown, options: StreamProxyOptions) => {
  const stream = new ProxyMessageEventStream()

  void (async () => {
    const partial = createPartialMessage(model)
    let reader: ReadableStreamDefaultReader<Uint8Array> | undefined
    const abortHandler = () => {
      void reader?.cancel('Request aborted by user')
    }

    try {
      options.signal?.addEventListener('abort', abortHandler)
      const response = await fetch(`${options.proxyUrl}/api/stream`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${options.authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ model, context, options: buildProxyRequestOptions(options) }),
        signal: options.signal,
      })

      if (!response.ok) throw new Error(`Proxy error: ${response.status} ${response.statusText}`)

      reader = response.body?.getReader()
      if (!reader) throw new Error('Proxy response body is empty')

      const decoder = new TextDecoder()
      let buffer = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim()
          if (!data) continue
          const event = processProxyEvent(JSON.parse(data) as ProxyAssistantMessageEvent, partial)
          if (event) stream.push(event)
        }
      }
      stream.end()
    } catch (error) {
      partial.stopReason = options.signal?.aborted ? 'aborted' : 'error'
      partial.errorMessage = error instanceof Error ? error.message : String(error)
      stream.push({ type: 'error', reason: partial.stopReason, error: partial })
      stream.end()
    } finally {
      options.signal?.removeEventListener('abort', abortHandler)
    }
  })()

  return stream
}
