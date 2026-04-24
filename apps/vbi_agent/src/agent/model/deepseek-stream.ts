import type OpenAI from 'openai'
import type { AgentToolCall } from '../types.js'

export type DeepSeekMessage = OpenAI.Chat.Completions.ChatCompletionMessage & { reasoning_content?: string }

type DeepSeekToolDelta = {
  function?: { arguments?: string; name?: string }
  id?: string
  index: number
}

type DeepSeekDelta = {
  content?: string | null
  reasoning_content?: string | null
  tool_calls?: DeepSeekToolDelta[]
}

type DeepSeekChunk = OpenAI.Chat.Completions.ChatCompletionChunk & { choices: { delta?: DeepSeekDelta }[] }

const appendToolCallDeltas = (toolCalls: AgentToolCall[], deltas?: DeepSeekToolDelta[]) => {
  for (const delta of deltas ?? []) {
    const current = (toolCalls[delta.index] ??= { arguments: '', id: '', name: '' })
    if (delta.id) current.id = delta.id
    if (delta.function?.name) current.name = delta.function.name
    if (delta.function?.arguments) current.arguments += delta.function.arguments
  }
}

const toCompletionMessage = (content: string, reasoningContent: string, toolCalls: AgentToolCall[]): DeepSeekMessage =>
  ({
    content,
    ...(reasoningContent ? { reasoning_content: reasoningContent } : {}),
    role: 'assistant',
    ...(toolCalls.length
      ? {
          tool_calls: toolCalls.map((call) => ({
            function: { arguments: call.arguments, name: call.name },
            id: call.id,
            type: 'function',
          })),
        }
      : {}),
  }) as DeepSeekMessage

export const readDeepSeekStream = async (
  stream: AsyncIterable<DeepSeekChunk>,
  onTextDelta?: (chunk: string) => void,
) => {
  let content = ''
  let reasoningContent = ''
  const toolCalls: AgentToolCall[] = []
  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta
    if (!delta) continue
    if (delta.reasoning_content) reasoningContent += delta.reasoning_content
    if (delta.content) {
      content += delta.content
      onTextDelta?.(delta.content)
    }
    appendToolCallDeltas(toolCalls, delta.tool_calls)
  }
  return toCompletionMessage(content, reasoningContent, toolCalls)
}
