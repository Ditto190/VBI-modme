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

export interface AgentTool {
  definition: AgentToolDefinition
  execute(input: Record<string, unknown>): Promise<ToolExecutionResult>
}

export interface AgentToolKit {
  definitions(): AgentToolDefinition[]
  execute(call: PendingToolCall): Promise<ToolExecutionResult>
}

export interface AgentActivity {
  detail?: string
  kind: 'assistant' | 'tool' | 'user'
  text: string
}

export interface AgentState {
  activities: AgentActivity[]
  error?: string
}

export interface AgentRuntimeController {
  getState(): AgentState
  start(task?: string): Promise<void>
  subscribe(listener: (snapshot: AgentState) => void): () => void
}
