import { createOpenAI } from '@ai-sdk/openai'
import type { AgentModelConfig, ModelProvider } from '../types.js'
import { createAiSdkModelProvider } from './provider.js'

export const createOpenAIModelProvider = (input: AgentModelConfig): ModelProvider =>
  createAiSdkModelProvider(input, (config) =>
    createOpenAI({ apiKey: config.apiKey, baseURL: config.baseUrl }).chat(config.model),
  )
