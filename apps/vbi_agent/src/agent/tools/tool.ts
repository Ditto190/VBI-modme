import process from 'node:process'
import { createBashTool } from './bash-tool.js'
import { createVbiCodeTool } from './vbi-code-tool.js'
import type { AgentTool, AgentToolKit, PendingToolCall, ToolExecutionResult } from '../types.js'

interface CreateToolInput {
  cwd?: string
  timeoutMs?: number
  tools?: AgentTool[]
}

export interface RuntimeTool extends AgentToolKit {
  bash(input: Record<string, unknown>): Promise<ToolExecutionResult>
  vbiCode(input: Record<string, unknown>): Promise<ToolExecutionResult>
}

const toErrorMessage = (error: unknown) => (error instanceof Error ? error.message : String(error))

const toToolError = (name: string, error: unknown): ToolExecutionResult => {
  const message = toErrorMessage(error)
  return {
    content: JSON.stringify({ error: message, ok: false, tool: name }),
    display: message,
    summary: `${name} failed`,
  }
}

const createDefaultTools = (input: CreateToolInput) => [
  createBashTool(input.cwd ?? process.cwd(), input.timeoutMs),
  createVbiCodeTool(input.timeoutMs),
]

export const createTool = (input: CreateToolInput = {}): RuntimeTool => {
  const tools = input.tools ?? createDefaultTools(input)
  const toolMap = new Map(tools.map((tool) => [tool.definition.name, tool]))

  const getTool = (name: string) => {
    const tool = toolMap.get(name)
    if (!tool) throw new Error(`unknown tool: ${name}`)
    return tool
  }

  const executeByName = async (name: string, args: Record<string, unknown>) => {
    try {
      return await getTool(name).execute(args)
    } catch (error) {
      return toToolError(name, error)
    }
  }

  return {
    bash: (args) => executeByName('bash', args),
    definitions: () => tools.map((tool) => tool.definition),
    execute: (call: PendingToolCall) => executeByName(call.name, call.arguments),
    vbiCode: (args) => executeByName('vbi_code', args),
  }
}
