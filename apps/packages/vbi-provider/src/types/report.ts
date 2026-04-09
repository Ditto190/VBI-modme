import type { HocuspocusProvider } from '@hocuspocus/provider'
import type { VBIReportBuilder, VBIReportDSL, VBIReportSnapshotDSL } from '@visactor/vbi'
import type { ProviderResource, ResourceCreateInput, ResourceSnapshot } from './resource'

export type ReportSummary = ProviderResource

export interface ReportDetail extends ProviderResource {
  dsl: VBIReportDSL
}

export interface ReportPageInput {
  title?: string
  chartId?: string
  insightId?: string
}

export interface ReportResponse extends ReportSummary {
  pages?: ReportDetail['dsl']['pages']
}

export interface ReportProvider {
  getResourceId(): string | null
  create(input?: ResourceCreateInput): Promise<ReportSummary>
  remove(): Promise<ReportSummary>
  rename(name: string): Promise<ReportSummary>
  open(): Promise<VBIReportBuilder>
  close(): Promise<void>
  getBuilder(): Promise<VBIReportBuilder>
  getCollaborationProvider(): Promise<HocuspocusProvider | null>
  getSummary(): Promise<ReportSummary>
  getDetail(): Promise<ReportDetail>
  snapshot(): Promise<ResourceSnapshot<VBIReportDSL>>
  exportSnapshot(): Promise<VBIReportSnapshotDSL>
  createPage(input?: { title?: string }): Promise<ReportDetail>
  reorderPages(pageIds: string[]): Promise<ReportDetail>
  updatePage(pageId: string, input: ReportPageInput): Promise<ReportDetail>
  removePage(pageId: string): Promise<ReportDetail>
}
