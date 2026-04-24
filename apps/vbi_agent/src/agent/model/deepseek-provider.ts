import { createDeepSeek } from '@ai-sdk/deepseek'
import { jsonSchema, streamText } from 'ai'
import type { ModelMessage, TextStreamPart, ToolSet } from 'ai'
import type {
  AgentAssistantMessage,
  AgentHistoryEntry,
  AgentModelConfig,
  AgentToolDefinition,
  ModelProvider,
  ModelTurnResult,
  PendingToolCall,
} from '../types.js'

type AgentToolSet = ToolSet

const parseArguments = (value: string) => {
  try {
    return JSON.parse(value) as Record<string, unknown>
  } catch (error) {
    throw new Error(`model returned invalid tool arguments: ${error instanceof Error ? error.message : String(error)}`)
  }
}

const toRawArguments = (input: unknown) => (typeof input === 'string' ? input : JSON.stringify(input ?? {}))

const toAssistantContent = (entry: AgentAssistantMessage): ModelMessage => ({
  content: [
    ...(entry.reasoningContent ? [{ text: entry.reasoningContent, type: 'reasoning' as const }] : []),
    ...(entry.content ? [{ text: entry.content, type: 'text' as const }] : []),
    ...(entry.toolCalls ?? []).map((call) => ({
      input: parseArguments(call.arguments),
      toolCallId: call.id,
      toolName: call.name,
      type: 'tool-call' as const,
    })),
  ],
  role: 'assistant',
})

const toModelMessages = (history: AgentHistoryEntry[]): ModelMessage[] =>
  history.map((entry) => {
    if (entry.role === 'assistant') return toAssistantContent(entry)
    if (entry.role === 'tool')
      return {
        content: [
          {
            output: { type: 'text', value: entry.content },
            toolCallId: entry.toolCallId,
            toolName: entry.name,
            type: 'tool-result',
          },
        ],
        role: 'tool',
      }
    return { content: entry.content, role: entry.role }
  })

const toAiTools = (tools: AgentToolDefinition[]): AgentToolSet =>
  Object.fromEntries(
    tools.map((tool) => [
      tool.name,
      {
        description: tool.description,
        inputSchema: jsonSchema(tool.inputSchema),
        strict: true,
      },
    ]),
  ) as AgentToolSet

const readToolResult = (content: string, reasoningContent: string, toolCalls: PendingToolCall[]): ModelTurnResult => {
  if (toolCalls.length === 0)
    return {
      assistant: { content, ...(reasoningContent ? { reasoningContent } : {}), role: 'assistant' },
      outcome: { content, type: 'final' },
    }
  return {
    assistant: {
      content,
      ...(reasoningContent ? { reasoningContent } : {}),
      role: 'assistant',
      toolCalls: toolCalls.map((call) => ({ arguments: call.rawArguments, id: call.id, name: call.name })),
    },
    outcome: { calls: toolCalls, type: 'tool' },
  }
}

const readAiStream = async (
  stream: AsyncIterable<TextStreamPart<AgentToolSet>>,
  onTextDelta?: (chunk: string) => void,
) => {
  let content = ''
  let reasoningContent = ''
  const toolCalls: PendingToolCall[] = []
  for await (const part of stream) {
    if (part.type === 'reasoning-delta') reasoningContent += part.text
    if (part.type === 'text-delta') {
      content += part.text
      onTextDelta?.(part.text)
    }
    if (part.type === 'tool-call') {
      const rawArguments = toRawArguments(part.input)
      toolCalls.push({
        arguments: parseArguments(rawArguments),
        id: part.toolCallId,
        name: part.toolName,
        rawArguments,
      })
    }
    if (part.type === 'error') throw part.error
  }
  return readToolResult(content, reasoningContent, toolCalls)
}

const createModel = (config: AgentModelConfig) =>
  createDeepSeek({ apiKey: config.apiKey, baseURL: config.baseUrl })(config.model ?? '')

export const createDeepSeekModelProvider = (config: AgentModelConfig): ModelProvider => ({
  streamTurn: async ({ handlers, history, tools }) => {
    if (!config.apiKey) throw new Error('AGENT_API_KEY is required for agent mode')
    if (!config.model) throw new Error('AGENT_MODEL is required for agent mode')
    const result = streamText({
      messages: toModelMessages(history),
      model: createModel(config),
      tools: toAiTools(tools),
    })
    return readAiStream(result.fullStream, handlers?.onTextDelta)
  },
})
