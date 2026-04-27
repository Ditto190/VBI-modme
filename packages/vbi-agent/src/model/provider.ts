import { streamText, type LanguageModel } from 'ai'
import type { AgentModelConfig, ModelProvider, RequiredModelConfig } from '../types/index.js'
import { readAiStream } from './stream.js'

const validateConfig = (config: AgentModelConfig): RequiredModelConfig => {
  if (!config.apiKey) throw new Error('AGENT_API_KEY is required for agent mode')
  if (!config.model) throw new Error('AGENT_MODEL is required for agent mode')
  return config as RequiredModelConfig
}

export const createAiSdkModelProvider = (
  input: AgentModelConfig,
  createModel: (config: RequiredModelConfig) => LanguageModel,
): ModelProvider => {
  const model = createModel(validateConfig(input))
  return {
    streamTurn: async ({ handlers, history, tools }) => {
      const result = streamText({
        messages: history,
        model,
        tools,
      })
      return readAiStream(result.fullStream, handlers?.onTextDelta)
    },
  }
}
