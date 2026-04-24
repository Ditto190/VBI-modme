import type OpenAI from 'openai'
import type { AgentToolDefinition } from '../types.js'

const toFunctionTool = (tool: AgentToolDefinition): OpenAI.Chat.Completions.ChatCompletionTool => ({
  function: {
    description: tool.description,
    name: tool.name,
    parameters: tool.inputSchema,
    strict: true,
  },
  type: 'function',
})

export const toOpenAiTools = (tools: AgentToolDefinition[]) => tools.map(toFunctionTool)
