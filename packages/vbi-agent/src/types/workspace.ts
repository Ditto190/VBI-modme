import type { VBIChartBuilder, VBIReportBuilder } from '@visactor/vbi'

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
