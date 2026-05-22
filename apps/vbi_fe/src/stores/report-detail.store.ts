import { create } from 'zustand'
import type { ReportPageBuilder } from '@visactor/vbi'
import { createInsight } from '../services/insightApi'
import { createResource } from '../services/resourceApi'
import { useInsightBuilderModel, useReportBuilderModel } from '../models'
import { resolveActivePageId } from '../views/report-detail/page-state'
import { connectResourceSession, releaseResourceSession } from './resource-session.store'
import type { ReportPage } from '../types'

type ReportDetailState = {
  activePageId: string
  chartEditorOpen: boolean
  connectedChartId: string
  connectedChartIds: string[]
  connectedInsightId: string
  connectedInsightIds: string[]
  insightEditorOpen: boolean
  pageActionBusy: boolean
  reportId: string
  stopReportSync: (() => void) | null
  userName: string
  addPage(): Promise<void>
  bootstrap(reportId: string, userName: string): Promise<void>
  closeChartEditor(): void
  closeInsightEditor(): void
  dispose(): Promise<void>
  openChartEditor(): void
  openInsightEditor(): void
  addChart(pageId: string): Promise<void>
  addInsight(pageId: string): Promise<void>
  removeChart(pageId?: string): Promise<void>
  removeInsight(pageId?: string): Promise<void>
  removePage(pageId: string): Promise<void>
  selectPage(pageId: string): Promise<void>
  setInsightContent(value: string): void
  setScrolledPage(pageId: string): void
  syncActivePage(): Promise<void>
}

const getReportPages = (reportId: string): ReportPage[] =>
  useReportBuilderModel.getState().sessions[reportId]?.builder?.build().pages ?? []

const getReportBuilder = (reportId: string) => useReportBuilderModel.getState().sessions[reportId]?.builder

const getInsightBuilder = (insightId: string) => useInsightBuilderModel.getState().sessions[insightId]?.builder

const getActivePage = (reportId: string, activePageId: string) =>
  getReportPages(reportId).find((page) => page.id === activePageId)

const getNextPageTitle = (pages: ReportPage[]) => `Page ${pages.length + 1}`

const updatePageResource = (reportId: string, pageId: string, callback: (page: ReportPageBuilder) => void) => {
  getReportBuilder(reportId)?.page.update(pageId, callback)
}

const uniqueResourceIds = (pages: ReportPage[], key: 'chartId' | 'insightId') =>
  [...new Set(pages.map((page) => page[key]).filter(Boolean))] as string[]

const isSameIdList = (first: string[], second: string[]) =>
  first.length === second.length && first.every((id, index) => id === second[index])

const diffIds = (source: string[], target: string[]) => source.filter((id) => !target.includes(id))

const getConnectedIds = (ids: string[], activeId: string) => (ids.length || !activeId ? ids : [activeId])

const syncReportResources = async (state: ReportDetailState, pages: ReportPage[]) => {
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
    useReportDetailStore.setState({
      connectedChartId: nextChartId,
      connectedChartIds: nextChartIds,
      connectedInsightId: nextInsightId,
      connectedInsightIds: nextInsightIds,
    })
  }

  await Promise.all([
    ...diffIds(prevChartIds, nextChartIds).map((id) => releaseResourceSession('chart', id)),
    ...diffIds(prevInsightIds, nextInsightIds).map((id) => releaseResourceSession('insight', id)),
    ...diffIds(nextChartIds, prevChartIds).map((id) => connectResourceSession('chart', id, state.userName)),
    ...diffIds(nextInsightIds, prevInsightIds).map((id) => connectResourceSession('insight', id, state.userName)),
  ])
}

const subscribeReportSession = (reportId: string) => {
  let current = useReportBuilderModel.getState().sessions[reportId]
  let lastBuilder = current?.builder ?? null
  let lastVersion = current?.version ?? 0

  return useReportBuilderModel.subscribe((modelState) => {
    current = modelState.sessions[reportId]
    const nextBuilder = current?.builder ?? null
    const nextVersion = current?.version ?? 0
    if (nextBuilder === lastBuilder && nextVersion === lastVersion) return
    lastBuilder = nextBuilder
    lastVersion = nextVersion
    void useReportDetailStore.getState().syncActivePage()
  })
}

export const useReportDetailStore = create<ReportDetailState>((set, get) => ({
  activePageId: '',
  chartEditorOpen: false,
  connectedChartId: '',
  connectedChartIds: [],
  connectedInsightId: '',
  connectedInsightIds: [],
  insightEditorOpen: false,
  pageActionBusy: false,
  reportId: '',
  stopReportSync: null,
  userName: '',
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
      set({
        activePageId: nextPageId,
        chartEditorOpen: false,
        insightEditorOpen: false,
      })
      await get().syncActivePage()
    } finally {
      set({ pageActionBusy: false })
    }
  },
  bootstrap: async (reportId, userName) => {
    await get().dispose()
    if (!reportId) return
    set({ reportId, userName })
    await connectResourceSession('report', reportId, userName)
    set({ stopReportSync: subscribeReportSession(reportId) })
    await get().syncActivePage()
  },
  closeChartEditor: () => set({ chartEditorOpen: false }),
  closeInsightEditor: () => set({ insightEditorOpen: false }),
  dispose: async () => {
    const state = get()
    state.stopReportSync?.()
    const chartIds = getConnectedIds(state.connectedChartIds, state.connectedChartId)
    const insightIds = getConnectedIds(state.connectedInsightIds, state.connectedInsightId)
    await Promise.all([
      ...chartIds.map((id) => releaseResourceSession('chart', id)),
      ...insightIds.map((id) => releaseResourceSession('insight', id)),
    ])
    await releaseResourceSession('report', state.reportId)
    set({
      activePageId: '',
      chartEditorOpen: false,
      connectedChartId: '',
      connectedChartIds: [],
      connectedInsightId: '',
      connectedInsightIds: [],
      insightEditorOpen: false,
      pageActionBusy: false,
      reportId: '',
      stopReportSync: null,
      userName: '',
    })
  },
  openChartEditor: () => set({ chartEditorOpen: true }),
  openInsightEditor: () => set({ insightEditorOpen: true }),
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
      if (targetPageId === state.activePageId) set({ chartEditorOpen: false })
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
      if (targetPageId === state.activePageId) {
        set({ insightEditorOpen: false })
      }
      await get().syncActivePage()
    } finally {
      set({ pageActionBusy: false })
    }
  },
  removePage: async (pageId) => {
    const reportBuilder = getReportBuilder(get().reportId)
    if (!reportBuilder) return
    set({ pageActionBusy: true })
    try {
      reportBuilder.page.remove(pageId)
      await get().syncActivePage()
    } finally {
      set({ pageActionBusy: false })
    }
  },
  selectPage: async (pageId) => {
    set({
      activePageId: pageId,
      chartEditorOpen: false,
      insightEditorOpen: false,
    })
    await get().syncActivePage()
  },
  setInsightContent: (value) => {
    getInsightBuilder(get().connectedInsightId)?.setContent(value)
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
    set((current) => ({
      activePageId: nextActivePageId,
      chartEditorOpen: current.activePageId === nextActivePageId ? current.chartEditorOpen : false,
      insightEditorOpen: current.activePageId === nextActivePageId ? current.insightEditorOpen : false,
    }))
    await syncReportResources({ ...get(), activePageId: nextActivePageId }, pages)
  },
}))

export const getReportDetailSnapshot = () => {
  const state = useReportDetailStore.getState()
  const activePage = getActivePage(state.reportId, state.activePageId)
  return {
    activePage,
    activePageId: state.activePageId,
    chartEditorOpen: state.chartEditorOpen,
    connectedChartId: state.connectedChartId,
    connectedChartIds: state.connectedChartIds,
    connectedInsightId: state.connectedInsightId,
    connectedInsightIds: state.connectedInsightIds,
    insightEditorOpen: state.insightEditorOpen,
    pageActionBusy: state.pageActionBusy,
    pages: getReportPages(state.reportId),
    reportId: state.reportId,
  }
}

export const getReportDetailView = () => {
  const state = useReportDetailStore.getState()
  const activePage = getActivePage(state.reportId, state.activePageId)
  const insightBuilder = getInsightBuilder(activePage?.insightId ?? '')
  return {
    activePage,
    insightContent: insightBuilder?.build().content?.trim() ?? '',
    pages: getReportPages(state.reportId),
  }
}
