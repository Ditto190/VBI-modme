import type { AgentState, ThinkingLevel } from '@earendil-works/pi-agent-core'

type AgentModelInput = {
  model?: string
  provider?: string
}

type AgentBackendConfigPayload = AgentModelInput & {
  modelAliases?: Record<string, string>
  models?: string[]
  modelDescriptors?: AgentState['model'][]
}

export type AgentBackendConfig = Required<AgentModelInput> & {
  modelAliases: Record<string, string>
  modelDescriptors: AgentState['model'][]
  models: string[]
}

export type AgentModelId = string
export type AgentModelOption = {
  id: AgentModelId
  label: string
  labelKey?: string
}
export type AgentThinkingLevel = Extract<ThinkingLevel, 'high' | 'xhigh'>

const defaultAgentProvider = 'deepseek'
export const defaultAgentModel: AgentModelId = 'deepseek-v4-flash'
export const defaultAgentThinkingLevel: AgentThinkingLevel = 'high'
const knownAgentModelConfigById: Record<
  string,
  {
    cost: { input: number; output: number; cacheRead: number; cacheWrite: number }
    contextWindow: number
    labelKey?: string
    maxTokens: number
    name: string
  }
> = {
  'deepseek-v4-flash': {
    name: 'DeepSeek V4 Flash',
    labelKey: 'agent.modelFlash',
    cost: { input: 0.14, output: 0.28, cacheRead: 0.0028, cacheWrite: 0 },
    contextWindow: 1_000_000,
    maxTokens: 384_000,
  },
  'deepseek-v4-pro': {
    name: 'DeepSeek V4 Pro',
    labelKey: 'agent.modelPro',
    cost: { input: 0.435, output: 0.87, cacheRead: 0.003625, cacheWrite: 0 },
    contextWindow: 1_000_000,
    maxTokens: 384_000,
  },
}

const fallbackAgentModelIds = Object.keys(knownAgentModelConfigById)

export const fallbackAgentBackendConfig: AgentBackendConfig = {
  provider: defaultAgentProvider,
  model: defaultAgentModel,
  modelAliases: {},
  modelDescriptors: [],
  models: [...fallbackAgentModelIds],
}

const readStringArray = (value: unknown) =>
  Array.isArray(value)
    ? value.flatMap((item) => (typeof item === 'string' && item.trim().length > 0 ? [item.trim()] : []))
    : []

const readStringRecord = (value: unknown): Record<string, string> => {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return {}
  return Object.fromEntries(
    Object.entries(value)
      .map(([key, item]) => [key, typeof item === 'string' ? item.trim() : ''] as const)
      .filter((entry): entry is [string, string] => entry[1].length > 0),
  )
}

const normalizeAgentBackendConfig = (input: AgentBackendConfigPayload = {}): AgentBackendConfig => {
  const provider = input.provider?.trim() || defaultAgentProvider
  const configuredModels = readStringArray(input.models)
  const modelAliases = readStringRecord(input.modelAliases)
  const modelDescriptors = Array.isArray(input.modelDescriptors) ? input.modelDescriptors : []
  const model = input.model?.trim() || configuredModels[0] || defaultAgentModel
  const models = configuredModels.length
    ? configuredModels
    : provider === defaultAgentProvider
      ? [...fallbackAgentModelIds]
      : [model]

  return {
    provider,
    model,
    modelAliases,
    modelDescriptors,
    models,
  }
}

export const readAgentBackendConfig = async (): Promise<AgentBackendConfig> => {
  try {
    const response = await fetch('/api/v1/agent/config')
    if (!response.ok) return fallbackAgentBackendConfig
    const payload = (await response.json()) as unknown
    if (typeof payload !== 'object' || payload === null) return fallbackAgentBackendConfig
    return normalizeAgentBackendConfig(
      ('data' in payload ? payload.data : payload) as AgentBackendConfigPayload | undefined,
    )
  } catch {
    return fallbackAgentBackendConfig
  }
}

export const resolveAgentModelId = (
  value: unknown,
  config: AgentBackendConfig = fallbackAgentBackendConfig,
): AgentModelId => {
  const requested = typeof value === 'string' && value.trim() ? value.trim() : ''
  const resolved = config.modelAliases[requested] ?? requested
  if (resolved && config.models.includes(resolved)) return resolved
  if (config.models.includes(config.model)) return config.model
  return config.models[0] ?? defaultAgentModel
}

export const resolveAgentThinkingLevel = (value: unknown): AgentThinkingLevel =>
  value === 'xhigh' ? 'xhigh' : defaultAgentThinkingLevel

const createFallbackModelConfig = (model: string) =>
  knownAgentModelConfigById[model] ?? {
    name: model,
    cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
    contextWindow: 128_000,
    maxTokens: 32_000,
  }

export const createAgentModel = (
  { provider, model }: Required<AgentModelInput>,
  config: AgentBackendConfig = fallbackAgentBackendConfig,
) => {
  const id = resolveAgentModelId(model, config)
  const defaults = createFallbackModelConfig(id)
  const descriptor = config.modelDescriptors.find((item) => item.id === id)

  return {
    id,
    name: descriptor?.name || defaults.name,
    api: descriptor?.api || 'openai-completions',
    provider: descriptor?.provider || provider,
    baseUrl: descriptor?.baseUrl || '',
    reasoning: descriptor?.reasoning ?? true,
    thinkingLevelMap: descriptor?.thinkingLevelMap || {
      minimal: null,
      low: null,
      medium: null,
      high: 'high',
      xhigh: 'max',
    },
    input: descriptor?.input || (['text'] as const),
    cost: descriptor?.cost || defaults.cost,
    contextWindow: readPositiveNumber(descriptor?.contextWindow) || defaults.contextWindow,
    maxTokens: readPositiveNumber(descriptor?.maxTokens) || defaults.maxTokens,
  }
}

const readPositiveNumber = (value: unknown) =>
  typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : 0

export const resolveAgentModel = (
  loadedModel: AgentState['model'] | undefined,
  input: Required<AgentModelInput>,
  config: AgentBackendConfig = fallbackAgentBackendConfig,
) => {
  const loadedModelId = resolveAgentModelId(loadedModel?.id, config)
  const defaults = createAgentModel(
    {
      provider: loadedModel?.provider || input.provider,
      model: loadedModel ? loadedModelId : input.model,
    },
    config,
  )
  if (!loadedModel) return defaults

  return {
    ...loadedModel,
    ...defaults,
    contextWindow: readPositiveNumber(loadedModel.contextWindow) || defaults.contextWindow,
    maxTokens: readPositiveNumber(loadedModel.maxTokens) || defaults.maxTokens,
  }
}

export const createAgentModelOptions = (
  config: AgentBackendConfig = fallbackAgentBackendConfig,
): AgentModelOption[] => {
  return config.models.map((id) => ({
    id,
    labelKey: knownAgentModelConfigById[id]?.labelKey,
    label: config.modelDescriptors.find((item) => item.id === id)?.name || createFallbackModelConfig(id).name,
  }))
}
