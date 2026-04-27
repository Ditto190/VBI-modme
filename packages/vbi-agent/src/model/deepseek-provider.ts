import { createDeepSeek } from '@ai-sdk/deepseek'
import type { AgentModelConfig, ModelProvider } from '../types.js'
import { createAiSdkModelProvider } from './provider.js'

export const createDeepSeekModelProvider = (input: AgentModelConfig): ModelProvider =>
  createAiSdkModelProvider(input, (config) =>
    createDeepSeek({ apiKey: config.apiKey, baseURL: config.baseUrl }).chat(config.model),
  )
