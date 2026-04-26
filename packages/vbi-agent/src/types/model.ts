import type { AgentToolDefinition } from './tool.js'

export interface AgentModelConfig {
  apiKey?: string
  baseUrl?: string
  model?: string
}

export type AgentRole = 'assistant' | 'system' | 'tool' | 'user'

export interface AgentTextMessage {
  content: string
  role: Extract<AgentRole, 'system' | 'user'>
}

export interface AgentToolCall {
  arguments: string
  id: string
  name: string
}

export interface AgentAssistantMessage {
  content: string
  reasoningContent?: string
  role: 'assistant'
  toolCalls?: AgentToolCall[]
}

export interface AgentToolMessage {
  content: string
  name: string
  role: 'tool'
  toolCallId: string
}

export type AgentHistoryEntry = AgentAssistantMessage | AgentTextMessage | AgentToolMessage

export interface PendingToolCall {
  arguments: Record<string, unknown>
  id: string
  name: string
  rawArguments: string
}

export interface ModelTurnResult {
  assistant: AgentAssistantMessage
  outcome: { content: string; type: 'final' } | { calls: PendingToolCall[]; type: 'tool' }
}

export interface ModelStreamHandlers {
  onTextDelta?(chunk: string): void
}

export interface ModelProvider {
  streamTurn(input: {
    history: AgentHistoryEntry[]
    handlers?: ModelStreamHandlers
    tools: AgentToolDefinition[]
  }): Promise<ModelTurnResult>
}
