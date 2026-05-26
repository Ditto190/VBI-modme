import type { AgentConversationSession } from './agent-storage'

export type AgentModelInput = {
  model?: string
  provider?: string
}

const defaultAgentProvider = 'deepseek'
const defaultAgentModel = 'deepseek-v4-flash'
const defaultAgentProxyUrl = '/api/v1/agent'
const defaultContextWindowByModel: Record<string, number> = {
  'deepseek-v4-flash': 1_000_000,
  'deepseek-v4-pro': 1_000_000,
}
const defaultMaxTokensByModel: Record<string, number> = {
  'deepseek-v4-flash': 384_000,
  'deepseek-v4-pro': 384_000,
}

export const resolveAgentModelInput = (input: AgentModelInput = {}) => {
  const provider = input.provider?.trim() || defaultAgentProvider
  const model = input.model?.trim() || defaultAgentModel
  if (provider === 'deepseek' && model === 'deepseek-chat') return { provider, model: 'deepseek-v4-flash' }
  if (provider === 'deepseek' && model === 'deepseek-reasoner') return { provider, model: 'deepseek-v4-pro' }
  return { provider, model }
}

export const resolveAgentProxyUrl = (value: string | undefined) =>
  (value?.trim() || defaultAgentProxyUrl).replace(/\/+$/, '')

export const createAgentModel = ({ provider, model }: Required<AgentModelInput>) => ({
  id: model,
  name: model,
  api: 'openai-completions',
  provider,
  baseUrl: '',
  reasoning: true,
  thinkingLevelMap: {},
  input: ['text' as const],
  cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
  contextWindow: defaultContextWindowByModel[model] ?? 0,
  maxTokens: defaultMaxTokensByModel[model] ?? 0,
})

const readPositiveNumber = (value: unknown) =>
  typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : 0

export const resolveAgentModel = (
  loadedModel: AgentConversationSession['model'] | undefined,
  input: Required<AgentModelInput>,
) => {
  const defaults = createAgentModel(input)
  if (!loadedModel) return defaults

  return {
    ...defaults,
    ...loadedModel,
    contextWindow: readPositiveNumber(loadedModel.contextWindow) || defaults.contextWindow,
    maxTokens: readPositiveNumber(loadedModel.maxTokens) || defaults.maxTokens,
  }
}
