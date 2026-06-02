import type { HocuspocusProvider } from '@hocuspocus/provider'
import type { VBIChartBuilder, VBIInsightBuilder, VBIReportBuilder } from '@visactor/vbi'
import type { ReportPage } from '../../types'
import type { ApplicationCleanup } from '../core/store'

export type ReportDetailPageSection = {
  chartBuilder: VBIChartBuilder | null
  hasChart: boolean
  hasInsight: boolean
  insightBuilder: VBIInsightBuilder | null
  page: ReportPage
}

export type ReportDetailApplication = {
  activePageId: string
  connectedChartId: string
  connectedChartIds: string[]
  connectedInsightId: string
  connectedInsightIds: string[]
  pageActionBusy: boolean
  pageSections: ReportDetailPageSection[]
  pages: ReportPage[]
  provider: HocuspocusProvider | null
  reportBuilder: VBIReportBuilder | null
  reportId: string
  addChart(pageId: string): Promise<void>
  addInsight(pageId: string): Promise<void>
  addPage(): Promise<void>
  activate(reportId: string, userName: string): ApplicationCleanup
  removeChart(pageId?: string): Promise<void>
  removeInsight(pageId?: string): Promise<void>
  removePage(pageId: string): Promise<void>
  selectPage(pageId: string): Promise<void>
  setScrolledPage(pageId: string): void
  syncActivePage(): Promise<void>
}
