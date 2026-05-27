import { EventStream } from './pi-ai-browser'

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

const waitForNextPaint = () =>
  new Promise<void>((resolve) => {
    if (typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(() => resolve())
      return
    }

    setTimeout(resolve, 0)
  })

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

const createErrorMessage = (model: AgentModel, error: unknown, stopReason: 'error' | 'aborted'): AssistantMessage => ({
  role: 'assistant',
  stopReason,
  content: [],
  api: model.api,
  provider: model.provider,
  model: model.id,
  errorMessage: error instanceof Error ? error.message : String(error),
  usage: emptyUsage(),
  timestamp: Date.now(),
})

const readProxyError = async (response: Response) => {
  const fallback = `Proxy error: ${response.status} ${response.statusText}`
  try {
    const payload = (await response.json()) as { error?: unknown }
    return typeof payload.error === 'string' && payload.error ? `Proxy error: ${payload.error}` : fallback
  } catch {
    return fallback
  }
}

export const streamProxy = (model: AgentModel, context: unknown, options: StreamProxyOptions) => {
  const stream = new ProxyMessageEventStream()

  void (async () => {
    let reader: ReadableStreamDefaultReader<Uint8Array> | undefined
    const abortHandler = () => {
      void reader?.cancel('Request aborted by user')
    }

    try {
      options.signal?.addEventListener('abort', abortHandler)
      await waitForNextPaint()
      const response = await fetch(`${options.proxyUrl}/stream`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${options.authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ model, context, options: buildProxyRequestOptions(options) }),
        signal: options.signal,
      })

      if (!response.ok) throw new Error(await readProxyError(response))

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
          stream.push(JSON.parse(data) as AssistantMessageEvent)
        }
      }
      stream.end()
    } catch (error) {
      const reason = options.signal?.aborted ? 'aborted' : 'error'
      stream.push({ type: 'error', reason, error: createErrorMessage(model, error, reason) })
      stream.end()
    } finally {
      options.signal?.removeEventListener('abort', abortHandler)
    }
  })()

  return stream
}
