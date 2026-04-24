import type OpenAI from 'openai'
import type { AgentAssistantMessage, AgentHistoryEntry, AgentToolCall } from '../types.js'

type AssistantMessageParam = OpenAI.Chat.ChatCompletionAssistantMessageParam & { reasoning_content?: string }

const toToolCalls = (
  toolCalls?: AgentToolCall[],
): OpenAI.Chat.Completions.ChatCompletionMessageToolCall[] | undefined =>
  toolCalls?.map((call) => ({
    function: { arguments: call.arguments, name: call.name },
    id: call.id,
    type: 'function',
  }))

const toAssistant = (entry: AgentAssistantMessage): AssistantMessageParam => ({
  content: entry.content,
  role: 'assistant',
  ...(entry.reasoningContent ? { reasoning_content: entry.reasoningContent } : {}),
  ...(entry.toolCalls ? { tool_calls: toToolCalls(entry.toolCalls) } : {}),
})

export const toOpenAiMessages = (history: AgentHistoryEntry[]): OpenAI.Chat.ChatCompletionMessageParam[] =>
  history.map((entry) => {
    if (entry.role === 'assistant') return toAssistant(entry)
    if (entry.role === 'tool') return { content: entry.content, role: 'tool', tool_call_id: entry.toolCallId }
    if (entry.role === 'system') return { content: entry.content, role: 'system' }
    return { content: entry.content, role: 'user' }
  })
