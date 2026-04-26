import type { PendingToolCall } from './model.js'

export interface AgentToolDefinition {
  description: string
  inputSchema: Record<string, unknown>
  name: string
}

export interface ToolExecutionResult {
  content: string
  display?: string
  summary: string
}

export interface VBITool {
  definition: AgentToolDefinition
  execute(input: Record<string, unknown>): Promise<ToolExecutionResult>
}

export type AgentTool = VBITool

export interface AgentToolKit {
  definitions(): AgentToolDefinition[]
  execute(call: PendingToolCall): Promise<ToolExecutionResult>
}
