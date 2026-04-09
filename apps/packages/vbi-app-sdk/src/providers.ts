import type {
  VBIChartBuilder,
  VBIChartDSL,
  VBIInsightBuilder,
  VBIInsightDSL,
  VBIReportBuilder,
  VBIReportDSL,
} from '@visactor/vbi'

export interface ProviderResource {
  id: string
  name: string | null
  createdAt: string
  updatedAt: string
}

export interface ResourceSnapshot<TDSL> {
  resource: ProviderResource
  dsl: TDSL
}

export type ChartSummary = ProviderResource
export type InsightSummary = ProviderResource
export type ReportSummary = ProviderResource

export interface ChartDetail extends ProviderResource {
  dsl: VBIChartDSL
}

export interface InsightDetail extends ProviderResource {
  dsl: VBIInsightDSL
}

export interface ReportDetail extends ProviderResource {
  dsl: VBIReportDSL
}

export interface ChartProvider {
  create(name?: string): Promise<ChartSummary>
  remove(): Promise<ChartSummary>
  rename(name: string): Promise<ChartSummary>
  open(): Promise<VBIChartBuilder>
  close(): Promise<void>
  getBuilder(): Promise<VBIChartBuilder>
  getSummary(): Promise<ChartSummary>
  getDetail(): Promise<ChartDetail>
  snapshot(): Promise<ResourceSnapshot<VBIChartDSL>>
}

export interface InsightProvider {
  create(name?: string): Promise<InsightSummary>
  remove(): Promise<InsightSummary>
  rename(name: string): Promise<InsightSummary>
  open(): Promise<VBIInsightBuilder>
  close(): Promise<void>
  getBuilder(): Promise<VBIInsightBuilder>
  getSummary(): Promise<InsightSummary>
  getDetail(): Promise<InsightDetail>
  snapshot(): Promise<ResourceSnapshot<VBIInsightDSL>>
}

export interface ReportProvider {
  create(name?: string): Promise<ReportSummary>
  remove(): Promise<ReportSummary>
  rename(name: string): Promise<ReportSummary>
  open(): Promise<VBIReportBuilder>
  close(): Promise<void>
  getBuilder(): Promise<VBIReportBuilder>
  getSummary(): Promise<ReportSummary>
  getDetail(): Promise<ReportDetail>
  snapshot(): Promise<ResourceSnapshot<VBIReportDSL>>
}
