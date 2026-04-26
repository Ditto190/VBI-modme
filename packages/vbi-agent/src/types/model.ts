import type { ModelMessage, ToolSet } from 'ai'

export interface AgentModelConfig {
  apiKey?: string
  baseUrl?: string
  model?: string
}

export interface PendingToolCall {
  arguments: Record<string, unknown>
  id: string
  name: string
}

export interface ModelTurnResult {
  assistant: ModelMessage
  outcome: { content: string; type: 'final' } | { calls: PendingToolCall[]; type: 'tool' }
}

export interface ModelStreamHandlers {
  onTextDelta?(chunk: string): void
}

export interface ModelProvider {
  streamTurn(input: {
    history: ModelMessage[]
    handlers?: ModelStreamHandlers
    tools: ToolSet
  }): Promise<ModelTurnResult>
}
