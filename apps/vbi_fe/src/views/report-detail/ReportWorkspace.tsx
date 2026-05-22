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
    <section className='report-detail-stage report-detail-stage-empty'>
      <Spinner />
    </section>
  ),
  ssr: false,
})

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
      <div className='report-detail-shell'>
        <PageSidebar pages={[]} />
        <div className='report-detail-stage report-detail-stage-empty'>
          <Empty description={t('reportDetail.emptyReport')} />
        </div>
      </div>
    )
  }

  return (
    <div className='report-detail-shell'>
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
