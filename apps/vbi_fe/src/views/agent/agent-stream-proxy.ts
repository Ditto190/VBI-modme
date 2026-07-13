import type { AgentOptions } from '@earendil-works/pi-agent-core'

type StreamFn = NonNullable<AgentOptions['streamFn']>
type AgentModel = Parameters<StreamFn>[0]
type StreamContext = Parameters<StreamFn>[1]
type StreamProxyOptions = NonNullable<Parameters<StreamFn>[2]>
type StreamResponse = Awaited<ReturnType<StreamFn>>
type BrowserStreamFn = (model: AgentModel, context: StreamContext, options?: StreamProxyOptions) => StreamResponse
type AssistantMessageEvent = StreamResponse extends AsyncIterable<infer Event> ? Event : never
type AssistantMessage = Awaited<ReturnType<StreamResponse['result']>>

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

const agentStreamProxyUrl = '/api/v1/agent/stream'

type StreamResult<TEvent, TResult> = IteratorResult<TEvent, undefined> | IteratorResult<TEvent, TResult>

class AssistantMessageEventStream implements AsyncIterable<AssistantMessageEvent> {
  private done = false
  private readonly queue: AssistantMessageEvent[] = []
  private readonly waiting: ((result: StreamResult<AssistantMessageEvent, AssistantMessage>) => void)[] = []
  private readonly finalResultPromise: Promise<AssistantMessage>
  private resolveFinalResult!: (result: AssistantMessage) => void

  constructor() {
    this.finalResultPromise = new Promise((resolve) => {
      this.resolveFinalResult = resolve
    })
  }

  push(event: AssistantMessageEvent) {
    if (this.done) return
    if (event.type === 'done' || event.type === 'error') {
      this.done = true
      this.resolveFinalResult(event.type === 'done' ? event.message : event.error)
    }

    const waiter = this.waiting.shift()
    if (waiter) {
      waiter({ value: event, done: false })
    } else {
      this.queue.push(event)
    }
  }

  end(result?: AssistantMessage) {
    this.done = true
    if (result) this.resolveFinalResult(result)
    while (this.waiting.length > 0) {
      this.waiting.shift()?.({ value: undefined, done: true })
    }
  }

  async *[Symbol.asyncIterator]() {
    while (true) {
      if (this.queue.length > 0) {
        yield this.queue.shift() as AssistantMessageEvent
        continue
      }
      if (this.done) return

      const result = await new Promise<StreamResult<AssistantMessageEvent, AssistantMessage>>((resolve) =>
        this.waiting.push(resolve),
      )
      if (result.done) return
      yield result.value
    }
  }

  result() {
    return this.finalResultPromise
  }
}

const emptyUsage = (): Usage => ({
  input: 0,
  output: 0,
  cacheRead: 0,
  cacheWrite: 0,
  totalTokens: 0,
  cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0 },
})

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

export const streamProxy: BrowserStreamFn = (model, context, options = {}) => {
  const stream = new AssistantMessageEventStream()

  void (async () => {
    let reader: ReadableStreamDefaultReader<Uint8Array> | undefined
    let hasTerminalEvent = false
    const pushEvent = (event: AssistantMessageEvent) => {
      if (event.type === 'done' || event.type === 'error') hasTerminalEvent = true
      stream.push(event)
    }
    const abortHandler = () => {
      void reader?.cancel('Request aborted by user')
    }

    try {
      options.signal?.addEventListener('abort', abortHandler)
      await waitForNextPaint()
      const response = await fetch(agentStreamProxyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
          pushEvent(JSON.parse(data) as AssistantMessageEvent)
        }
      }
      if (!hasTerminalEvent) {
        const reason = options.signal?.aborted ? 'aborted' : 'error'
        pushEvent({
          type: 'error',
          reason,
          error: createErrorMessage(
            model,
            reason === 'aborted' ? 'Request aborted by user' : 'Proxy stream ended without a terminal event',
            reason,
          ),
        })
      }
      stream.end()
    } catch (error) {
      const reason = options.signal?.aborted ? 'aborted' : 'error'
      pushEvent({ type: 'error', reason, error: createErrorMessage(model, error, reason) })
      stream.end()
    } finally {
      options.signal?.removeEventListener('abort', abortHandler)
    }
  })()

  return stream as unknown as StreamResponse
}
