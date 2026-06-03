import { useNavigationStore } from '../../stores/navigation.store'
import { runLazyCommand, runLazyLifecycleCommand, subscribeLazyStore } from '../core/lazy'
import type { ApplicationCleanup } from '../core/store'
import { resolveApplicationRoute } from '../routing/route'
import type * as ReportDetailModuleExports from './application'
import type { ReportDetailApplication } from './contract'

type ReportDetailModule = typeof ReportDetailModuleExports

let emitApplicationChange: (() => void) | null = null
let reportDetailModule: ReportDetailModule | null = null
let reportDetailModulePromise: Promise<ReportDetailModule> | null = null

const subscribedStores = new WeakSet<object>()
const emit = () => emitApplicationChange?.()

const loadReportDetailModule = async () => {
  if (reportDetailModule) return reportDetailModule
  reportDetailModulePromise ??= import('./application').then(async (module) => {
    reportDetailModule = module
    const [{ useReportDetailStore }, { useChartBuilderModel, useInsightBuilderModel, useReportBuilderModel }] =
      await Promise.all([import('../../stores/report-detail.store'), import('../../models')])
    subscribeLazyStore(useReportDetailStore, emit, subscribedStores)
    subscribeLazyStore(useChartBuilderModel, emit, subscribedStores)
    subscribeLazyStore(useInsightBuilderModel, emit, subscribedStores)
    subscribeLazyStore(useReportBuilderModel, emit, subscribedStores)
    emit()
    return module
  })
  return reportDetailModulePromise
}

const getReportDetailApplication = (module: ReportDetailModule) => module.getReportDetailApplication()

const runReportDetailCommand = async <TResult>(
  command: (application: ReportDetailApplication) => TResult | Promise<TResult>,
) => runLazyCommand(loadReportDetailModule, getReportDetailApplication, command)

const runReportDetailLifecycleCommand = (
  command: (application: ReportDetailApplication) => ApplicationCleanup,
): ApplicationCleanup => runLazyLifecycleCommand(loadReportDetailModule, getReportDetailApplication, command)

const lazyReportDetailApplication: ReportDetailApplication = {
  activePageId: '',
  connectedChartId: '',
  connectedChartIds: [],
  connectedInsightId: '',
  connectedInsightIds: [],
  pageActionBusy: false,
  pageSections: [],
  pages: [],
  provider: null,
  reportBuilder: null,
  reportId: '',
  addChart: (pageId) => runReportDetailCommand((application) => application.addChart(pageId)),
  addInsight: (pageId) => runReportDetailCommand((application) => application.addInsight(pageId)),
  addPage: () => runReportDetailCommand((application) => application.addPage()),
  activate: (reportId, userName) => {
    if (reportId) useNavigationStore.getState().go(resolveApplicationRoute({ name: 'reportDetail', id: reportId }))
    return runReportDetailLifecycleCommand((application) => application.activate(reportId, userName))
  },
  removeChart: (pageId) => runReportDetailCommand((application) => application.removeChart(pageId)),
  removeInsight: (pageId) => runReportDetailCommand((application) => application.removeInsight(pageId)),
  removePage: (pageId) => runReportDetailCommand((application) => application.removePage(pageId)),
  selectPage: (pageId) => runReportDetailCommand((application) => application.selectPage(pageId)),
  setScrolledPage: (pageId) => {
    void runReportDetailCommand((application) => application.setScrolledPage(pageId))
  },
  syncActivePage: () => runReportDetailCommand((application) => application.syncActivePage()),
}

export const bindReportDetailLazyApplicationEmitter = (nextEmit: () => void) => {
  emitApplicationChange = nextEmit
}

export const getLazyReportDetailApplication = () =>
  reportDetailModule?.getReportDetailApplication() ?? lazyReportDetailApplication
