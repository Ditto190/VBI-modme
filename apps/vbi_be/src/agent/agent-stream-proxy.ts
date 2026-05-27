import type { Model, SimpleStreamOptions, Usage } from '@earendil-works/pi-ai'

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

export const resolveModelIdAlias = (provider: string, modelId: string) => {
  if (provider === 'deepseek' && modelId === 'deepseek-chat') return 'deepseek-v4-flash'
  if (provider === 'deepseek' && modelId === 'deepseek-reasoner') return 'deepseek-v4-pro'
  return modelId
}

export const sanitizeModel = <TApi extends string>(model: Model<TApi>, baseUrl?: string): Model<TApi> =>
  baseUrl ? ({ ...model, baseUrl } as Model<TApi>) : model
