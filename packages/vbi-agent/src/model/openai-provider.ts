import { createOpenAI } from '@ai-sdk/openai'
import { streamText } from 'ai'
import type { AgentModelConfig, ModelProvider } from '../types.js'
import { readAiStream } from './stream.js'

const createModel = (
  config: Required<Pick<AgentModelConfig, 'apiKey' | 'model'>> & Pick<AgentModelConfig, 'baseUrl'>,
) => createOpenAI({ apiKey: config.apiKey, baseURL: config.baseUrl }).chat(config.model)

const validateConfig = (config: AgentModelConfig) => {
  if (!config.apiKey) throw new Error('AGENT_API_KEY is required for agent mode')
  if (!config.model) throw new Error('AGENT_MODEL is required for agent mode')
  return config as Required<Pick<AgentModelConfig, 'apiKey' | 'model'>> & Pick<AgentModelConfig, 'baseUrl'>
}

export const createOpenAIModelProvider = (input: AgentModelConfig): ModelProvider => {
  const config = validateConfig(input)
  const model = createModel(config)
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
