import { createDeepSeek, type DeepSeekLanguageModelOptions } from '@ai-sdk/deepseek'
import type { AgentModelConfig, ModelProvider } from '../types/index.js'
import { createAiSdkModelProvider } from './provider.js'

const deepSeekOptions = {
  thinking: { type: 'disabled' },
} satisfies DeepSeekLanguageModelOptions

export const createDeepSeekModelProvider = (input: AgentModelConfig): ModelProvider =>
  createAiSdkModelProvider(
    input,
    (config) => createDeepSeek({ apiKey: config.apiKey, baseURL: config.baseUrl }).chat(config.model),
    { providerOptions: { deepseek: deepSeekOptions } },
  )
