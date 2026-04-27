import type { VBIChartBuilder, VBIReportBuilder } from '@visactor/vbi'
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

export interface VBIWorkspaceSlot<TBuilder = unknown> {
  close?(id?: string): Promise<void>
  describe?(id?: string): Promise<unknown> | unknown
  open(id?: string): Promise<TBuilder>
  snapshot?(id?: string): Promise<unknown> | unknown
}

export interface VBIWorkspaceConnector {
  discoverSchema(): Promise<unknown>
  query(queryProps: unknown): Promise<unknown>
}

export type VBIWorkspaceConnectorRegistration = VBIWorkspaceConnector | (() => Promise<VBIWorkspaceConnector>)

export interface VBIWorkspaceConnectors {
  getChartConnectorId?(chartId?: string): Promise<string>
  register(id: string, connector: VBIWorkspaceConnectorRegistration): string
  registerChart?(chartId: string | undefined, connector: VBIWorkspaceConnectorRegistration): Promise<string>
}

export interface VBIAgentWorkspace {
  chart?: VBIWorkspaceSlot<VBIChartBuilder>
  connectors?: VBIWorkspaceConnectors
  report?: VBIWorkspaceSlot<VBIReportBuilder>
}

export interface VBIBuilderAgentInput {
  model: ModelProvider
  tools?: VBITool[]
  workspace: VBIAgentWorkspace
}
