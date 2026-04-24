import OpenAI from 'openai'
import { readDeepSeekStream } from './deepseek-stream.js'
import type { DeepSeekMessage } from './deepseek-stream.js'
import type {
  AgentAssistantMessage,
  AgentHistoryEntry,
  AgentModelConfig,
  AgentToolCall,
  AgentToolDefinition,
  ModelProvider,
  ModelTurnResult,
} from '../types.js'

const toToolCall = (call: AgentToolCall): OpenAI.Chat.Completions.ChatCompletionMessageToolCall => ({
  function: { arguments: call.arguments, name: call.name },
  id: call.id,
  type: 'function',
})

const toAssistant = (entry: AgentAssistantMessage) => ({
  content: entry.content,
  role: 'assistant' as const,
  ...(entry.reasoningContent ? { reasoning_content: entry.reasoningContent } : {}),
  ...(entry.toolCalls ? { tool_calls: entry.toolCalls.map(toToolCall) } : {}),
})

const toOpenAiMessages = (history: AgentHistoryEntry[]): OpenAI.Chat.ChatCompletionMessageParam[] =>
  history.map((entry) => {
    if (entry.role === 'assistant') return toAssistant(entry)
    if (entry.role === 'tool') return { content: entry.content, role: 'tool', tool_call_id: entry.toolCallId }
    if (entry.role === 'system') return { content: entry.content, role: 'system' }
    return { content: entry.content, role: 'user' }
  })

const toOpenAiTools = (tools: AgentToolDefinition[]): OpenAI.Chat.Completions.ChatCompletionTool[] =>
  tools.map((tool) => ({
    function: { description: tool.description, name: tool.name, parameters: tool.inputSchema, strict: true },
    type: 'function',
  }))

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
    if (!config.model) throw new Error('AGENT_MODEL is required for agent mode')
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
