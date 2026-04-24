import OpenAI from 'openai'
import { readDeepSeekStream } from './deepseek-stream.js'
import { toOpenAiMessages } from './openai-history.js'
import { toOpenAiTools } from './openai-tools.js'
import type { DeepSeekMessage } from './deepseek-stream.js'
import type { AgentModelConfig, ModelProvider, ModelTurnResult } from '../types.js'

const createClient = (config: AgentModelConfig) => new OpenAI({ apiKey: config.apiKey, baseURL: config.baseUrl })

const parseArguments = (value: string) => {
  try {
    return JSON.parse(value) as Record<string, unknown>
  } catch (error) {
    throw new Error(`model returned invalid tool arguments: ${error instanceof Error ? error.message : String(error)}`)
  }
}

const readReasoningContent = (completion: DeepSeekMessage) =>
  completion.reasoning_content ? { reasoningContent: completion.reasoning_content } : {}

const readToolResult = (completion: DeepSeekMessage): ModelTurnResult => {
  const toolCalls = completion.tool_calls?.filter((call) => call.type === 'function') ?? []
  if (toolCalls.length === 0)
    return {
      assistant: { content: completion.content ?? '', ...readReasoningContent(completion), role: 'assistant' },
      outcome: { content: completion.content ?? '', type: 'final' },
    }
  return {
    assistant: {
      content: completion.content ?? '',
      ...readReasoningContent(completion),
      role: 'assistant',
      toolCalls: toolCalls.map((toolCall) => ({
        arguments: toolCall.function.arguments,
        id: toolCall.id,
        name: toolCall.function.name,
      })),
    },
    outcome: {
      calls: toolCalls.map((toolCall) => ({
        arguments: parseArguments(toolCall.function.arguments),
        id: toolCall.id,
        name: toolCall.function.name,
        rawArguments: toolCall.function.arguments,
      })),
      type: 'tool',
    },
  }
}

export const createDeepSeekModelProvider = (config: AgentModelConfig): ModelProvider => ({
  streamTurn: async ({ handlers, history, tools }) => {
    if (!config.apiKey) throw new Error('AGENT_API_KEY is required for agent mode')
    const stream = await createClient(config).chat.completions.create({
      messages: toOpenAiMessages(history),
      model: config.model,
      stream: true,
      tools: toOpenAiTools(tools),
    })
    const message = await readDeepSeekStream(stream, handlers?.onTextDelta)
    return readToolResult(message)
  },
})
