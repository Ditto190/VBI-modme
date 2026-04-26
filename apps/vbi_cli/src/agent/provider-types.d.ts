declare module '@visactor/headless-bi-provider' {
  import type {
    VBIChartBuilder,
    VBIChartDSL,
    VBIReportBuilder,
    VBIReportDSL,
    VBIReportSnapshotDSL,
  } from '@visactor/vbi'

  export interface ProviderResource {
    id: string
    name: string
  }

  export type ChartSummary = ProviderResource
  export type InsightSummary = ProviderResource
  export type ReportSummary = ProviderResource

  export interface ResourceCreateInput {
    name?: string
  }

  export interface ResourceSnapshot<TDsl> {
    dsl: TDsl
    resource: ProviderResource
  }

  export interface ReportReference {
    id: string
    name: string
  }

  export interface InsightCreateInput extends ResourceCreateInput {
    content?: string
  }

  export interface InsightUpdateInput {
    content?: string
    name?: string
  }

  export interface ReportPageInput {
    chartId?: string
    insightId?: string
    title?: string
  }

  export interface ChartProvider {
    create(input?: ResourceCreateInput): Promise<ChartSummary>
    getDetail(): Promise<unknown>
    getReferences(): Promise<ReportReference[]>
    getSummary(): Promise<ChartSummary>
    open(): Promise<VBIChartBuilder>
    remove(): Promise<ChartSummary>
    rename(name: string): Promise<ChartSummary>
    snapshot(): Promise<ResourceSnapshot<VBIChartDSL>>
  }

  export interface InsightProvider {
    create(input?: InsightCreateInput): Promise<InsightSummary>
    getDetail(): Promise<unknown>
    getReferences(): Promise<ReportReference[]>
    remove(): Promise<InsightSummary>
    rename(name: string): Promise<InsightSummary>
    snapshot(): Promise<ResourceSnapshot<unknown>>
    update(input: InsightUpdateInput): Promise<unknown>
  }

  export interface ReportProvider {
    create(input?: ResourceCreateInput): Promise<ReportSummary>
    createPage(input?: { title?: string }): Promise<unknown>
    exportSnapshot(): Promise<VBIReportSnapshotDSL>
    getDetail(): Promise<unknown>
    getSummary(): Promise<ReportSummary>
    open(): Promise<VBIReportBuilder>
    remove(): Promise<ReportSummary>
    removePage(pageId: string): Promise<unknown>
    rename(name: string): Promise<ReportSummary>
    reorderPages(pageIds: string[]): Promise<unknown>
    snapshot(): Promise<ResourceSnapshot<VBIReportDSL>>
    updatePage(pageId: string, input: ReportPageInput): Promise<unknown>
  }

  export interface VBIProviderClient {
    chart(id?: string): ChartProvider
    insight(id?: string): InsightProvider
    listCharts(): Promise<ChartSummary[]>
    listInsights(): Promise<InsightSummary[]>
    listReports(): Promise<ReportSummary[]>
    report(id?: string): ReportProvider
  }

  export interface VBIProviderClientOptions {
    baseUrl: string
    webSocketPolyfill?: unknown
  }

  export function createVBIProviderClient(options: VBIProviderClientOptions): VBIProviderClient
}
