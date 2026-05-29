import type { Model, SimpleStreamOptions, Usage } from '@earendil-works/pi-ai'

export const agentStreamOptionKeys = [
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

const supportedDeepSeekModelIds = ['deepseek-v4-flash', 'deepseek-v4-pro'] as const
const deepSeekModelAliases = {
  'deepseek-chat': 'deepseek-v4-flash',
  'deepseek-reasoner': 'deepseek-v4-pro',
} as const

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

export const sanitizeStreamOptions = (options: unknown): Partial<SimpleStreamOptions> => {
  if (!isRecord(options)) return {}
  return Object.fromEntries(
    agentStreamOptionKeys.filter((key) => options[key] !== undefined).map((key) => [key, options[key]]),
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
  if (provider === 'deepseek' && modelId in deepSeekModelAliases) {
    return deepSeekModelAliases[modelId as keyof typeof deepSeekModelAliases]
  }
  return modelId
}

export const getSupportedAgentModelIds = (provider: string, configuredModelId: string) =>
  provider === 'deepseek' ? [...supportedDeepSeekModelIds] : [configuredModelId]

export const getAgentModelAliases = (provider: string): Record<string, string> =>
  provider === 'deepseek' ? { ...deepSeekModelAliases } : {}

export const sanitizeModel = <TApi extends string>(model: Model<TApi>, baseUrl?: string): Model<TApi> =>
  baseUrl ? ({ ...model, baseUrl } as Model<TApi>) : model
