import type { VBIChartBuilder, VBIInsightBuilder, VBIReportBuilder } from '@visactor/vbi'

export type VBIResourceKind = 'chart' | 'insight' | 'report'

export type VBIResourceSummary = {
  id: string
  name?: string | null
}

export type VBIResourceCreateInput = {
  content?: string
  name?: string
}

export type VBIReportPageInput = {
  chartId?: string
  insightId?: string
  title?: string
}

export interface VBIWorkspaceSlot<TBuilder = unknown> {
  close?(id?: string): Promise<void>
  create?(input?: VBIResourceCreateInput): Promise<unknown> | unknown
  describe?(id?: string): Promise<unknown> | unknown
  list?(): Promise<VBIResourceSummary[]> | VBIResourceSummary[]
  open(id?: string): Promise<TBuilder>
  remove?(id: string): Promise<unknown> | unknown
  rename?(id: string, name: string): Promise<unknown> | unknown
  snapshot?(id?: string): Promise<unknown> | unknown
}

export interface VBIReferenceWorkspaceSlot<TBuilder = unknown> extends VBIWorkspaceSlot<TBuilder> {
  references?(id: string): Promise<unknown> | unknown
}

export interface VBIReportWorkspaceSlot<TBuilder = unknown> extends VBIWorkspaceSlot<TBuilder> {
  createPage?(id: string, input?: { title?: string }): Promise<unknown> | unknown
  exportSnapshot?(id: string): Promise<unknown> | unknown
  removePage?(id: string, pageId: string): Promise<unknown> | unknown
  reorderPages?(id: string, pageIds: string[]): Promise<unknown> | unknown
  updatePage?(id: string, pageId: string, input: VBIReportPageInput): Promise<unknown> | unknown
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
  chart?: VBIReferenceWorkspaceSlot<VBIChartBuilder>
  connectors?: VBIWorkspaceConnectors
  insight?: VBIReferenceWorkspaceSlot<VBIInsightBuilder>
  report?: VBIReportWorkspaceSlot<VBIReportBuilder>
}
