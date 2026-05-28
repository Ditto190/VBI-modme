import type { AgentConversationSession } from './agent-storage'
import type { ThinkingLevel } from '@earendil-works/pi-agent-core'

export type AgentModelInput = {
  model?: string
  provider?: string
}

export type AgentModelId = 'deepseek-v4-flash' | 'deepseek-v4-pro'
export type AgentThinkingLevel = Extract<ThinkingLevel, 'high' | 'xhigh'>

const defaultAgentProvider = 'deepseek'
export const defaultAgentModel: AgentModelId = 'deepseek-v4-flash'
export const defaultAgentThinkingLevel: AgentThinkingLevel = 'high'
const defaultAgentProxyUrl = '/api/v1/agent'

const agentModelConfigById: Record<
  AgentModelId,
  {
    cost: { input: number; output: number; cacheRead: number; cacheWrite: number }
    contextWindow: number
    maxTokens: number
    name: string
  }
> = {
  'deepseek-v4-flash': {
    name: 'DeepSeek V4 Flash',
    cost: { input: 0.14, output: 0.28, cacheRead: 0.0028, cacheWrite: 0 },
    contextWindow: 1_000_000,
    maxTokens: 384_000,
  },
  'deepseek-v4-pro': {
    name: 'DeepSeek V4 Pro',
    cost: { input: 0.435, output: 0.87, cacheRead: 0.003625, cacheWrite: 0 },
    contextWindow: 1_000_000,
    maxTokens: 384_000,
  },
}

export const agentModelOptions = [
  { id: 'deepseek-v4-flash' as const, labelKey: 'agent.modelFlash' },
  { id: 'deepseek-v4-pro' as const, labelKey: 'agent.modelPro' },
]

export const agentThinkingLevelOptions = [
  { id: 'high' as const, labelKey: 'agent.thinkingHigh' },
  { id: 'xhigh' as const, labelKey: 'agent.thinkingMax' },
]

export const isAgentModelId = (value: unknown): value is AgentModelId =>
  value === 'deepseek-v4-flash' || value === 'deepseek-v4-pro'

export const resolveAgentModelId = (value: unknown): AgentModelId => {
  if (value === 'deepseek-chat') return 'deepseek-v4-flash'
  if (value === 'deepseek-reasoner') return 'deepseek-v4-pro'
  return isAgentModelId(value) ? value : defaultAgentModel
}

export const resolveAgentThinkingLevel = (value: unknown): AgentThinkingLevel =>
  value === 'xhigh' ? 'xhigh' : defaultAgentThinkingLevel

export const resolveAgentModelInput = (input: AgentModelInput = {}) => {
  const provider = input.provider?.trim() || defaultAgentProvider
  const model = resolveAgentModelId(input.model?.trim())
  return { provider, model }
}

export const resolveAgentProxyUrl = (value: string | undefined) =>
  (value?.trim() || defaultAgentProxyUrl).replace(/\/+$/, '')

export const createAgentModel = ({ provider, model }: Required<AgentModelInput>) => ({
  id: resolveAgentModelId(model),
  name: agentModelConfigById[resolveAgentModelId(model)].name,
  api: 'openai-completions',
  provider,
  baseUrl: '',
  reasoning: true,
  thinkingLevelMap: { minimal: null, low: null, medium: null, high: 'high', xhigh: 'max' },
  input: ['text' as const],
  cost: agentModelConfigById[resolveAgentModelId(model)].cost,
  contextWindow: agentModelConfigById[resolveAgentModelId(model)].contextWindow,
  maxTokens: agentModelConfigById[resolveAgentModelId(model)].maxTokens,
})

const readPositiveNumber = (value: unknown) =>
  typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : 0

export const resolveAgentModel = (
  loadedModel: AgentConversationSession['model'] | undefined,
  input: Required<AgentModelInput>,
) => {
  const loadedModelId = resolveAgentModelId(loadedModel?.id)
  const defaults = createAgentModel({
    provider: loadedModel?.provider || input.provider,
    model: loadedModel ? loadedModelId : input.model,
  })
  if (!loadedModel) return defaults

  return {
    ...loadedModel,
    ...defaults,
    contextWindow: readPositiveNumber(loadedModel.contextWindow) || defaults.contextWindow,
    maxTokens: readPositiveNumber(loadedModel.maxTokens) || defaults.maxTokens,
  }
}
