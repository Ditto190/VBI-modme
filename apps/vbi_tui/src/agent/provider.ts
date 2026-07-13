import { getModel, getModels, streamSimple } from '@earendil-works/pi-ai'
import type { AgentOptions, StreamFn } from '@visactor/vbi-agent'
import type { createAgentConfig } from './config.js'

type AgentConfig = ReturnType<typeof createAgentConfig>
type InitialAgentState = NonNullable<AgentOptions['initialState']>

export interface CliAgentProvider {
  getApiKey: NonNullable<AgentOptions['getApiKey']>
  model: Exclude<InitialAgentState['model'], undefined>
  streamFn: StreamFn
}

const requireValue = (name: string, value?: string) => {
  if (!value) throw new Error(`${name} is required for agent mode`)
  return value
}

const legacyModelAliases: Record<string, Record<string, string>> = {
  deepseek: {
    'deepseek-chat': 'deepseek-v4-flash',
    'deepseek-reasoner': 'deepseek-v4-pro',
  },
}

const resolveModelId = (provider: string, modelId: string) => legacyModelAliases[provider]?.[modelId] ?? modelId

const resolveModel = (config: AgentConfig): CliAgentProvider['model'] => {
  const provider = requireValue('AGENT_PROVIDER', config.model.provider)
  const modelId = resolveModelId(provider, requireValue('AGENT_MODEL', config.model.model))
  const model = getModel(provider as never, modelId as never)
  if (!model) {
    const available = getModels(provider as never)
      .map((item) => item.id)
      .join(', ')
    throw new Error(`Unsupported agent model: ${provider}/${modelId}${available ? `. Available: ${available}` : ''}`)
  }
  return config.model.baseUrl ? { ...model, baseUrl: config.model.baseUrl } : model
}

export const createCliAgentProvider = (config: AgentConfig): CliAgentProvider => {
  const apiKey = requireValue('AGENT_API_KEY', config.model.apiKey)
  return {
    getApiKey: () => apiKey,
    model: resolveModel(config),
    streamFn: streamSimple,
  }
}
