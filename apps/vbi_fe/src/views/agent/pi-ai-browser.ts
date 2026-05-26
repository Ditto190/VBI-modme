type AssistantMessage = {
  content: unknown[]
  errorMessage?: string
  role: 'assistant'
  stopReason: 'stop' | 'length' | 'toolUse' | 'error' | 'aborted'
  timestamp: number
  usage: {
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
}

type AssistantMessageEvent =
  | { type: 'done'; message: AssistantMessage }
  | { type: 'error'; error: AssistantMessage }
  | { type: string; [key: string]: unknown }

type StreamResult<TEvent, TResult> = IteratorResult<TEvent, undefined> | IteratorResult<TEvent, TResult>

const defaultModels = [
  {
    id: 'deepseek-v4-flash',
    name: 'DeepSeek V4 Flash',
    api: 'openai-completions',
    provider: 'deepseek',
    baseUrl: '',
    reasoning: true,
    thinkingLevelMap: {},
    input: ['text'],
    cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
    contextWindow: 1000000,
    maxTokens: 384000,
  },
]

export const getProviders = () => ['deepseek']

export const getModels = (provider: string) => defaultModels.filter((model) => model.provider === provider)

export const getModel = (provider: string, modelId: string) => getModels(provider).find((model) => model.id === modelId)

export const modelsAreEqual = (
  left: { id?: string; provider?: string } | null | undefined,
  right: { id?: string; provider?: string } | null | undefined,
) => left?.id === right?.id && left?.provider === right?.provider

export const StringEnum = (values: string[], options?: Record<string, unknown>) => ({
  type: 'string',
  enum: values,
  ...options,
})

export class EventStream<TEvent, TResult> {
  private readonly extractResult: (event: TEvent) => TResult
  private readonly isComplete: (event: TEvent) => boolean
  private readonly queue: TEvent[] = []
  private readonly waiting: ((result: StreamResult<TEvent, TResult>) => void)[] = []
  private done = false
  private readonly finalResultPromise: Promise<TResult>
  private resolveFinalResult!: (result: TResult) => void

  constructor(isComplete: (event: TEvent) => boolean, extractResult: (event: TEvent) => TResult) {
    this.isComplete = isComplete
    this.extractResult = extractResult
    this.finalResultPromise = new Promise((resolve) => {
      this.resolveFinalResult = resolve
    })
  }

  push(event: TEvent) {
    if (this.done) return
    if (this.isComplete(event)) {
      this.done = true
      this.resolveFinalResult(this.extractResult(event))
    }
    const waiter = this.waiting.shift()
    if (waiter) {
      waiter({ value: event, done: false })
    } else {
      this.queue.push(event)
    }
  }

  end(result?: TResult) {
    this.done = true
    if (result !== undefined) this.resolveFinalResult(result)
    while (this.waiting.length > 0) {
      this.waiting.shift()?.({ value: undefined, done: true })
    }
  }

  async *[Symbol.asyncIterator]() {
    while (true) {
      if (this.queue.length > 0) {
        yield this.queue.shift() as TEvent
      } else if (this.done) {
        return
      } else {
        const result = await new Promise<StreamResult<TEvent, TResult>>((resolve) => this.waiting.push(resolve))
        if (result.done) return
        yield result.value
      }
    }
  }

  result() {
    return this.finalResultPromise
  }
}

export class AssistantMessageEventStream extends EventStream<AssistantMessageEvent, AssistantMessage> {
  constructor() {
    super(
      (event) => event.type === 'done' || event.type === 'error',
      (event) => {
        if (event.type === 'done') return (event as { message: AssistantMessage }).message
        if (event.type === 'error') return (event as { error: AssistantMessage }).error
        throw new Error('Unexpected event type for final result')
      },
    )
  }
}

export const createAssistantMessageEventStream = () => new AssistantMessageEventStream()

export const parseStreamingJson = <T = Record<string, unknown>>(partialJson: string | undefined): T => {
  if (!partialJson?.trim()) return {} as T
  try {
    return JSON.parse(partialJson) as T
  } catch {
    return {} as T
  }
}

export const validateToolArguments = (tool: { parameters?: unknown }, toolCall: { arguments?: unknown }) => {
  const args = structuredClone(toolCall.arguments ?? {})
  if (!tool.parameters || typeof tool.parameters !== 'object') return args
  return args
}

export const streamSimple = () => {
  const stream = new AssistantMessageEventStream()
  queueMicrotask(() => {
    stream.push({
      type: 'error',
      reason: 'error',
      error: {
        role: 'assistant',
        content: [],
        stopReason: 'error',
        errorMessage: 'Frontend streamSimple is disabled; use the configured proxy streamFn.',
        usage: {
          input: 0,
          output: 0,
          cacheRead: 0,
          cacheWrite: 0,
          totalTokens: 0,
          cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0 },
        },
        timestamp: Date.now(),
      },
    })
    stream.end()
  })
  return stream
}

export const complete = async () => ({
  role: 'assistant',
  content: [{ type: 'text', text: '' }],
  stopReason: 'error',
  errorMessage: 'Frontend complete is disabled.',
  usage: {
    input: 0,
    output: 0,
    cacheRead: 0,
    cacheWrite: 0,
    totalTokens: 0,
    cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0 },
  },
  timestamp: Date.now(),
})
