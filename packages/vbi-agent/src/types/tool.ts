import type { ToolSet } from 'ai'
import type { PendingToolCall } from './model.js'

export interface ToolExecutionResult {
  content: string
  display?: string
  summary: string
}

export interface VBITool {
  name: string
  descriptor: ToolSet[string]
  execute(input: Record<string, unknown>): Promise<ToolExecutionResult>
}

export type AgentTool = VBITool

export interface AgentToolKit {
  definitions(): ToolSet
  execute(call: PendingToolCall): Promise<ToolExecutionResult>
}
