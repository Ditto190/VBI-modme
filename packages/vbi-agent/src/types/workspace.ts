import type { VBIChartBuilder, VBIReportBuilder } from '@visactor/vbi'
import type { ModelProvider } from './model.js'
import type { VBITool } from './tool.js'

export interface VBIWorkspaceSlot<TBuilder = unknown> {
  describe?(id?: string): Promise<unknown> | unknown
  open(id?: string): Promise<TBuilder>
  save?(id?: string): Promise<void>
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
