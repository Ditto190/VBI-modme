import type { HocuspocusProvider } from '@hocuspocus/provider'
import type { VBIChartBuilder, VBIInsightBuilder, VBIReportBuilder } from '@visactor/vbi'
import { useChartBuilderModel, useInsightBuilderModel, useReportBuilderModel } from '../../models'
import { useReportDetailStore } from '../../stores/report-detail.store'
import { useNavigationStore } from '../../stores/navigation.store'
import type { ReportPage } from '../../types'
import { createLatestApplicationLifecycle, noopApplicationCleanup } from '../core/lifecycle'
import { resolveApplicationRoute } from '../routing/route'
import type { ReportDetailApplication, ReportDetailPageSection } from './contract'

type BuilderSessionStore<TBuilder = unknown, TProvider = unknown> = {
  getState?: () => {
    sessions?: Record<string, { builder?: TBuilder; provider?: TProvider }>
  }
}

const reportDetailLifecycle = createLatestApplicationLifecycle()

const getBuilderSessions = <TBuilder, TProvider = unknown>(
  store: BuilderSessionStore<TBuilder, TProvider> | undefined,
) => store?.getState?.().sessions ?? {}

const getReportPages = (reportId: string) =>
  getBuilderSessions(useReportBuilderModel as BuilderSessionStore<VBIReportBuilder>)[reportId]?.builder?.build()
    .pages ?? []

const getReportPageSections = (reportId: string): ReportDetailPageSection[] => {
  const pages = getReportPages(reportId)
  const chartSessions = getBuilderSessions(useChartBuilderModel as BuilderSessionStore<VBIChartBuilder>)
  const insightSessions = getBuilderSessions(useInsightBuilderModel as BuilderSessionStore<VBIInsightBuilder>)

  return pages.map((page) => ({
    chartBuilder: page.chartId ? (chartSessions[page.chartId]?.builder ?? null) : null,
    hasChart: !!page.chartId,
    hasInsight: !!page.insightId,
    insightBuilder: page.insightId ? (insightSessions[page.insightId]?.builder ?? null) : null,
    page,
  }))
}

const activateReportDetail = (reportId: string, userName: string) => {
  if (!reportId) return noopApplicationCleanup
  useNavigationStore.getState().go(resolveApplicationRoute({ name: 'reportDetail', id: reportId }))
  return connectReportDetail(reportId, userName)
}

const connectReportDetail = (reportId: string, userName: string) => {
  if (!reportId) return noopApplicationCleanup
  return reportDetailLifecycle.start(
    () => useReportDetailStore.getState().bootstrap(reportId, userName),
    () => useReportDetailStore.getState().dispose(),
  )
}

export const getReportDetailApplication = (): ReportDetailApplication => {
  const state = useReportDetailStore.getState()
  const reportSession = getBuilderSessions(
    useReportBuilderModel as BuilderSessionStore<VBIReportBuilder, HocuspocusProvider>,
  )[state.reportId]

  return {
    activePageId: state.activePageId,
    connectedChartId: state.connectedChartId,
    connectedChartIds: state.connectedChartIds,
    connectedInsightId: state.connectedInsightId,
    connectedInsightIds: state.connectedInsightIds,
    pageActionBusy: state.pageActionBusy,
    pageSections: getReportPageSections(state.reportId),
    pages: getReportPages(state.reportId) as ReportPage[],
    provider: reportSession?.provider ?? null,
    reportBuilder: reportSession?.builder ?? null,
    reportId: state.reportId,
    addChart: state.addChart,
    addInsight: state.addInsight,
    addPage: state.addPage,
    activate: activateReportDetail,
    connect: connectReportDetail,
    removeChart: state.removeChart,
    removeInsight: state.removeInsight,
    removePage: state.removePage,
    selectPage: state.selectPage,
    setScrolledPage: state.setScrolledPage,
    syncActivePage: state.syncActivePage,
  }
}
