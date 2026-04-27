import type { ToolSet } from 'ai'
import { clipText, stringifyJson } from '../text-format.js'
import type { AgentTool, AgentToolKit, PendingToolCall, ToolExecutionResult } from '../types.js'

const toErrorMessage = (error: unknown) => (error instanceof Error ? error.message : String(error))

const formatErrorDisplay = (call: PendingToolCall, message: string) =>
  [
    'Status: failed',
    `Tool: ${call.name}`,
    `Error: ${message}`,
    '',
    'Arguments:',
    '```json',
    clipText(stringifyJson(call.arguments)),
    '```',
  ].join('\n')

const toToolError = (call: PendingToolCall, error: unknown): ToolExecutionResult => {
  const message = toErrorMessage(error)
  return {
    content: stringifyJson({ error: message, ok: false, tool: call.name }),
    display: formatErrorDisplay(call, message),
    summary: `${call.name} failed: ${message}`,
  }
}

export const createToolKit = (tools: AgentTool[]): AgentToolKit => {
  const toolMap = new Map(tools.map((tool) => [tool.name, tool]))
  return {
    definitions: () => Object.fromEntries(tools.map((tool) => [tool.name, tool.descriptor])) as ToolSet,
    execute: async (call: PendingToolCall) => {
      const tool = toolMap.get(call.name)
      if (!tool) return toToolError(call, new Error(`unknown tool: ${call.name}`))
      try {
        return await tool.execute(call.arguments)
      } catch (error) {
        return toToolError(call, error)
      }
    },
  }
}
