import { memo, useCallback, useMemo } from 'react'
import { useShallow } from 'zustand/shallow'
import dynamic from 'next/dynamic'
import { Empty } from '../../components/ui/empty'
import { Spinner } from '../../components/ui/spinner'
import { useTranslation } from '../../i18n'
import { useChartBuilderModel, useInsightBuilderModel, useReportBuilderModel } from '../../models'
import { useReportDetailStore } from '../../stores/report-detail.store'
import { PageSidebar } from './PageSidebar'
import { useReportStageScroll } from './useReportStageScroll'

const InsightEditorDrawer = dynamic(
  () => import('./InsightEditorDrawer').then((module) => module.InsightEditorDrawer),
  {
    ssr: false,
  },
)
const ReportEditorDrawer = dynamic(() => import('./ReportEditorDrawer').then((module) => module.ReportEditorDrawer), {
  ssr: false,
})
const ReportStage = dynamic(() => import('./ReportStage').then((module) => module.ReportStage), {
  loading: () => (
    <section className='flex min-h-0 flex-1 items-center justify-center overflow-auto overscroll-contain scroll-smooth [contain:layout] [overflow-anchor:none] [scrollbar-gutter:stable]'>
      <Spinner />
    </section>
  ),
  ssr: false,
})

const reportShellClassName =
  'vbi-motion-presence grid h-full min-h-0 flex-1 grid-cols-[216px_minmax(0,1fr)] gap-2.5 py-2 pl-2.5 pr-3.5 max-[1100px]:grid-cols-[190px_minmax(0,1fr)] max-[1100px]:gap-2 max-[1100px]:p-2.5 max-[900px]:grid-cols-[minmax(0,1fr)] max-[900px]:grid-rows-[auto_minmax(0,1fr)] max-[640px]:gap-2.5 max-[640px]:p-2.5'

const emptyStageClassName =
  'flex min-h-0 flex-1 items-center justify-center overflow-auto overscroll-contain scroll-smooth [contain:layout] [overflow-anchor:none] [scrollbar-gutter:stable]'

export const ReportWorkspace = memo(() => {
  const { t } = useTranslation()
  const {
    activePageId,
    chartEditorOpen,
    insightEditorOpen,
    openChartEditor,
    openInsightEditor,
    reportId,
    selectPage,
    setScrolledPage,
  } = useReportDetailStore(
    useShallow((state) => ({
      activePageId: state.activePageId,
      chartEditorOpen: state.chartEditorOpen,
      insightEditorOpen: state.insightEditorOpen,
      openChartEditor: state.openChartEditor,
      openInsightEditor: state.openInsightEditor,
      reportId: state.reportId,
      selectPage: state.selectPage,
      setScrolledPage: state.setScrolledPage,
    })),
  )

  const reportSession = useReportBuilderModel((state) => state.sessions[reportId])
  const reportBuilder = reportSession?.builder
  const reportVersion = reportSession?.version ?? 0
  const pages = useMemo(() => {
    void reportVersion
    return reportBuilder?.build().pages ?? []
  }, [reportBuilder, reportVersion])
  const pageIds = useMemo(() => pages.map((page) => page.id), [pages])
  const chartBuilders = useChartBuilderModel(
    useShallow((state) =>
      Object.fromEntries(
        pages
          .map((page) => page.chartId)
          .filter(Boolean)
          .map((id) => [id, state.sessions[id]?.builder ?? null]),
      ),
    ),
  )
  const insightBuilders = useInsightBuilderModel(
    useShallow((state) =>
      Object.fromEntries(
        pages
          .map((page) => page.insightId)
          .filter(Boolean)
          .map((id) => [id, state.sessions[id]?.builder ?? null]),
      ),
    ),
  )

  const { setPageNode, stageRef } = useReportStageScroll({
    activePageId,
    pageIds,
    resetKey: reportId,
    setScrolledPage,
  })

  const viewPages = useMemo(
    () =>
      pages.map((page) => ({
        chartBuilder: page.chartId && page.chartId in chartBuilders ? (chartBuilders[page.chartId] ?? null) : null,
        hasChart: !!page.chartId,
        hasInsight: !!page.insightId,
        insightBuilder:
          page.insightId && page.insightId in insightBuilders ? (insightBuilders[page.insightId] ?? null) : null,
        page,
      })),
    [chartBuilders, insightBuilders, pages],
  )

  const editChart = useCallback(
    (pageId: string) => {
      void (async () => {
        await selectPage(pageId)
        openChartEditor()
      })()
    },
    [openChartEditor, selectPage],
  )

  const editInsight = useCallback(
    (pageId: string) => {
      void (async () => {
        await selectPage(pageId)
        openInsightEditor()
      })()
    },
    [openInsightEditor, selectPage],
  )

  if (!pages.length) {
    return (
      <div className={reportShellClassName}>
        <PageSidebar pages={[]} />
        <div className={emptyStageClassName}>
          <Empty description={t('reportDetail.emptyReport')} />
        </div>
      </div>
    )
  }

  return (
    <div className={reportShellClassName}>
      <PageSidebar pages={pages} />
      <ReportStage
        activePageId={activePageId}
        onEditChart={editChart}
        onEditInsight={editInsight}
        onPageRef={setPageNode}
        pageSections={viewPages}
        stageRef={stageRef}
      />
      {chartEditorOpen ? <ReportEditorDrawer /> : null}
      {insightEditorOpen ? <InsightEditorDrawer /> : null}
    </div>
  )
})
