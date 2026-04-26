import type { ToolSet } from 'ai'
import type { AgentTool, AgentToolKit, PendingToolCall, ToolExecutionResult } from '../types.js'

const toErrorMessage = (error: unknown) => (error instanceof Error ? error.message : String(error))

const toToolError = (name: string, error: unknown): ToolExecutionResult => {
  const message = toErrorMessage(error)
  return {
    content: JSON.stringify({ error: message, ok: false, tool: name }),
    display: message,
    summary: `${name} failed`,
  }
}

export const createToolKit = (tools: AgentTool[]): AgentToolKit => {
  const toolMap = new Map(tools.map((tool) => [tool.name, tool]))
  return {
    definitions: () => Object.fromEntries(tools.map((tool) => [tool.name, tool.descriptor])) as ToolSet,
    execute: async (call: PendingToolCall) => {
      const tool = toolMap.get(call.name)
      if (!tool) return toToolError(call.name, new Error(`unknown tool: ${call.name}`))
      try {
        return await tool.execute(call.arguments)
      } catch (error) {
        return toToolError(call.name, error)
      }
    },
  }
}
