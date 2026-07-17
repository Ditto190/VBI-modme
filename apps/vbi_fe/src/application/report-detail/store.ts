import type { HocuspocusProvider } from '@hocuspocus/provider'
import type { ReportPageBuilder, VBIChartBuilder, VBIInsightBuilder, VBIReportBuilder } from '@visactor/vbi'
import { createStore } from 'zustand/vanilla'
import type { StoreApi } from 'zustand/vanilla'
import { createInsight } from '../../services/insightApi'
import { createResource } from '../../services/resourceApi'
import type { ReportPage } from '../../types'
import { createLatestApplicationLifecycle, noopApplicationCleanup } from '../core/lifecycle'
import type { ApplicationCleanup } from '../core/store'
import { chartApplicationStore } from '../chart/store'
import { insightApplicationStore } from '../insight/store'
import { reportApplicationStore } from '../report/store'
import { goApplicationPath } from '../routing/navigation-bridge'
import { resolveApplicationRoute } from '../routing/route'
import { resolveActivePageId } from './page-state'
import type { ReportDetailApplication, ReportDetailPageSection } from './contract'

type ReportDetailApplicationStoreState = ReportDetailApplication & {
  stopReportSync: (() => void) | null
  userName: string
  bootstrap(reportId: string, userName: string): Promise<void>
  dispose(): Promise<void>
}

const reportDetailLifecycle = createLatestApplicationLifecycle()
let reportDetailLifecycleToken = 0

const getReportSession = (reportId: string) => reportApplicationStore.getState().sessions[reportId]
const getReportBuilder = (reportId: string) => getReportSession(reportId)?.builder ?? null
const getReportPages = (reportId: string): ReportPage[] => getReportBuilder(reportId)?.build().pages ?? []

const getReportPageSections = (reportId: string): ReportDetailPageSection[] => {
  const pages = getReportPages(reportId)
  const chartSessions = chartApplicationStore.getState().sessions
  const insightSessions = insightApplicationStore.getState().sessions

  return pages.map((page) => ({
    chartBuilder: page.chartId ? ((chartSessions[page.chartId]?.builder ?? null) as VBIChartBuilder | null) : null,
    hasChart: !!page.chartId,
    hasInsight: !!page.insightId,
    insightBuilder: page.insightId
      ? ((insightSessions[page.insightId]?.builder ?? null) as VBIInsightBuilder | null)
      : null,
    page,
  }))
}

const uniqueResourceIds = (pages: ReportPage[], key: 'chartId' | 'insightId') =>
  [...new Set(pages.map((page) => page[key]).filter(Boolean))] as string[]

const isSameIdList = (first: string[], second: string[]) =>
  first.length === second.length && first.every((id, index) => id === second[index])

const diffIds = (source: string[], target: string[]) => source.filter((id) => !target.includes(id))

const getConnectedIds = (ids: string[], activeId: string) => (ids.length || !activeId ? ids : [activeId])

const getNextPageTitle = (pages: ReportPage[]) => `Page ${pages.length + 1}`

const getActivePage = (reportId: string, activePageId: string) =>
  getReportPages(reportId).find((page) => page.id === activePageId)

const updatePageResource = (reportId: string, pageId: string, callback: (page: ReportPageBuilder) => void) => {
  getReportBuilder(reportId)?.page.update(pageId, callback)
}

const connectResourceSession = async (kind: 'chart' | 'insight' | 'report', resourceId: string, userName: string) => {
  const { connectResourceSession: connectSession } = await import('../resources/session')
  await connectSession(kind, resourceId, userName)
}

const releaseResourceSession = async (kind: 'chart' | 'insight' | 'report', resourceId: string) => {
  const { releaseResourceSession: releaseSession } = await import('../resources/session')
  await releaseSession(kind, resourceId)
}

const createProjectionPatch = (state: ReportDetailApplicationStoreState) => {
  const reportSession = getReportSession(state.reportId)

  return {
    pageSections: getReportPageSections(state.reportId),
    pages: getReportPages(state.reportId),
    provider: (reportSession?.provider ?? null) as HocuspocusProvider | null,
    reportBuilder: (reportSession?.builder ?? null) as VBIReportBuilder | null,
  }
}

const refreshReportDetailProjection = () => {
  const state = reportDetailApplicationStore.getState()
  reportDetailApplicationStore.setState(createProjectionPatch(state))
}

const createReportDetailResetPatch = () => ({
  activePageId: '',
  connectedChartId: '',
  connectedChartIds: [],
  connectedInsightId: '',
  connectedInsightIds: [],
  pageActionBusy: false,
  reportId: '',
  stopReportSync: null,
  userName: '',
  pageSections: [],
  pages: [],
  provider: null,
  reportBuilder: null,
})

const connectReportResourceIfCurrent = async (
  kind: 'chart' | 'insight',
  resourceId: string,
  userName: string,
  reportId: string,
) => {
  if (reportDetailApplicationStore.getState().reportId !== reportId) return
  await connectResourceSession(kind, resourceId, userName)
  if (reportDetailApplicationStore.getState().reportId !== reportId) {
    await releaseResourceSession(kind, resourceId)
  }
}

const syncReportResources = async (state: ReportDetailApplicationStoreState, pages: ReportPage[]) => {
  if (!state.reportId || reportDetailApplicationStore.getState().reportId !== state.reportId) return
  const activePage = pages.find((page) => page.id === state.activePageId)
  const nextChartIds = uniqueResourceIds(pages, 'chartId')
  const nextInsightIds = uniqueResourceIds(pages, 'insightId')
  const prevChartIds = getConnectedIds(state.connectedChartIds, state.connectedChartId)
  const prevInsightIds = getConnectedIds(state.connectedInsightIds, state.connectedInsightId)
  const nextChartId = activePage?.chartId ?? ''
  const nextInsightId = activePage?.insightId ?? ''

  if (
    state.connectedChartId !== nextChartId ||
    state.connectedInsightId !== nextInsightId ||
    !isSameIdList(prevChartIds, nextChartIds) ||
    !isSameIdList(prevInsightIds, nextInsightIds)
  ) {
    reportDetailApplicationStore.setState({
      connectedChartId: nextChartId,
      connectedChartIds: nextChartIds,
      connectedInsightId: nextInsightId,
      connectedInsightIds: nextInsightIds,
    })
  }

  void Promise.all([
    ...diffIds(prevChartIds, nextChartIds).map((id) => releaseResourceSession('chart', id)),
    ...diffIds(prevInsightIds, nextInsightIds).map((id) => releaseResourceSession('insight', id)),
    ...diffIds(nextChartIds, prevChartIds).map((id) =>
      connectReportResourceIfCurrent('chart', id, state.userName, state.reportId),
    ),
    ...diffIds(nextInsightIds, prevInsightIds).map((id) =>
      connectReportResourceIfCurrent('insight', id, state.userName, state.reportId),
    ),
  ]).catch(console.error)
}

const subscribeReportSession = (reportId: string) => {
  let current = getReportSession(reportId)
  let lastBuilder = current?.builder ?? null
  let lastVersion = current?.version ?? 0

  return reportApplicationStore.subscribe((modelState) => {
    current = modelState.sessions[reportId]
    const nextBuilder = current?.builder ?? null
    const nextVersion = current?.version ?? 0
    if (nextBuilder === lastBuilder && nextVersion === lastVersion) return
    lastBuilder = nextBuilder
    lastVersion = nextVersion
    void reportDetailApplicationStore.getState().syncActivePage()
  })
}

const subscribeReportDetailSources = (reportId: string) => {
  const unsubscribeChart = chartApplicationStore.subscribe(refreshReportDetailProjection)
  const unsubscribeInsight = insightApplicationStore.subscribe(refreshReportDetailProjection)
  const unsubscribeReport = subscribeReportSession(reportId)

  return () => {
    unsubscribeChart()
    unsubscribeInsight()
    unsubscribeReport()
  }
}

const activateReportDetail = (reportId: string, userName: string): ApplicationCleanup => {
  if (!reportId) return noopApplicationCleanup
  goApplicationPath(resolveApplicationRoute({ name: 'reportDetail', id: reportId }))
  return connectReportDetail(reportId, userName)
}

const connectReportDetail = (reportId: string, userName: string): ApplicationCleanup => {
  if (!reportId) return noopApplicationCleanup
  return reportDetailLifecycle.start(
    () => reportDetailApplicationStore.getState().bootstrap(reportId, userName),
    () => reportDetailApplicationStore.getState().dispose(),
  )
}

export const reportDetailApplicationStore: StoreApi<ReportDetailApplicationStoreState> =
  createStore<ReportDetailApplicationStoreState>()((set, get) => ({
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
    stopReportSync: null,
    userName: '',
    activate: activateReportDetail,
    addChart: async (pageId) => {
      const state = get()
      const page = getActivePage(state.reportId, pageId)
      if (!page || page.chartId) return
      set({ pageActionBusy: true })
      try {
        const chart = await createResource('chart', `${page.title} Chart`)
        updatePageResource(state.reportId, pageId, (builder) => {
          builder.setChartId(chart.id)
        })
        await get().syncActivePage()
      } finally {
        set({ pageActionBusy: false })
      }
    },
    addInsight: async (pageId) => {
      const state = get()
      const page = getActivePage(state.reportId, pageId)
      if (!page || page.insightId) return
      set({ pageActionBusy: true })
      try {
        const insight = await createInsight({
          content: '',
          name: `${page.title} Insight`,
        })
        updatePageResource(state.reportId, pageId, (builder) => {
          builder.setInsightId(insight.id)
        })
        await get().syncActivePage()
      } finally {
        set({ pageActionBusy: false })
      }
    },
    addPage: async () => {
      const state = get()
      const reportBuilder = getReportBuilder(state.reportId)
      if (!reportBuilder) return
      set({ pageActionBusy: true })
      try {
        const pages = getReportPages(state.reportId)
        const pageTitle = getNextPageTitle(pages)
        const chart = await createResource('chart', `${pageTitle} Chart`)
        const insight = await createInsight({
          content: '',
          name: `${pageTitle} Insight`,
        })
        let nextPageId = ''
        reportBuilder.page.add(
          pageTitle,
          (page: { getId(): string; setChartId(chartId: string): void; setInsightId(insightId: string): void }) => {
            page.setChartId(chart.id)
            page.setInsightId(insight.id)
            nextPageId = page.getId()
          },
        )
        set({ activePageId: nextPageId })
        await get().syncActivePage()
      } finally {
        set({ pageActionBusy: false })
      }
    },
    bootstrap: async (reportId, userName) => {
      await get().dispose()
      if (!reportId) return
      const lifecycleToken = ++reportDetailLifecycleToken
      set({ reportId, userName })
      await connectResourceSession('report', reportId, userName)
      if (lifecycleToken !== reportDetailLifecycleToken || get().reportId !== reportId) {
        await releaseResourceSession('report', reportId)
        return
      }
      const stopReportSync = subscribeReportDetailSources(reportId)
      if (lifecycleToken !== reportDetailLifecycleToken || get().reportId !== reportId) {
        stopReportSync()
        await releaseResourceSession('report', reportId)
        return
      }
      set({ stopReportSync, ...createProjectionPatch(get()) })
      await get().syncActivePage()
    },
    connect: connectReportDetail,
    dispose: async () => {
      reportDetailLifecycleToken += 1
      const state = get()
      state.stopReportSync?.()
      const chartIds = getConnectedIds(state.connectedChartIds, state.connectedChartId)
      const insightIds = getConnectedIds(state.connectedInsightIds, state.connectedInsightId)
      set(createReportDetailResetPatch())
      await Promise.all([
        ...chartIds.map((id) => releaseResourceSession('chart', id)),
        ...insightIds.map((id) => releaseResourceSession('insight', id)),
        releaseResourceSession('report', state.reportId),
      ])
    },
    removeChart: async (pageId) => {
      const state = get()
      const targetPageId = pageId ?? state.activePageId
      const page = getActivePage(state.reportId, targetPageId)
      if (!page?.chartId) return
      set({ pageActionBusy: true })
      try {
        updatePageResource(state.reportId, targetPageId, (builder) => {
          builder.setChartId('')
        })
        await get().syncActivePage()
      } finally {
        set({ pageActionBusy: false })
      }
    },
    removeInsight: async (pageId) => {
      const state = get()
      const targetPageId = pageId ?? state.activePageId
      const page = getActivePage(state.reportId, targetPageId)
      if (!page?.insightId) return
      set({ pageActionBusy: true })
      try {
        updatePageResource(state.reportId, targetPageId, (builder) => {
          builder.setInsightId('')
        })
        await get().syncActivePage()
      } finally {
        set({ pageActionBusy: false })
      }
    },
    removePage: async (pageId) => {
      const reportBuilder = getReportBuilder(get().reportId)
      if (!reportBuilder) return
      if (getReportPages(get().reportId).length <= 1) return
      set({ pageActionBusy: true })
      try {
        reportBuilder.page.remove(pageId)
        await get().syncActivePage()
      } finally {
        set({ pageActionBusy: false })
      }
    },
    selectPage: async (pageId) => {
      set({ activePageId: pageId })
      await get().syncActivePage()
    },
    setScrolledPage: (pageId) => {
      const state = get()
      if (!pageId || pageId === state.activePageId) return
      const page = getActivePage(state.reportId, pageId)
      if (!page) return
      set({
        activePageId: pageId,
        connectedChartId: page.chartId ?? '',
        connectedInsightId: page.insightId ?? '',
      })
    },
    syncActivePage: async () => {
      const state = get()
      const pages = getReportPages(state.reportId)
      const nextActivePageId = resolveActivePageId(pages, state.activePageId)
      set({
        activePageId: nextActivePageId,
        ...createProjectionPatch({ ...get(), activePageId: nextActivePageId }),
      })
      await syncReportResources({ ...get(), activePageId: nextActivePageId }, pages)
    },
  }))
