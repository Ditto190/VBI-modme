import { Empty } from 'antd'
import { memo, useCallback, useMemo } from 'react'
import { useShallow } from 'zustand/shallow'
import { useTranslation } from '../../i18n'
import { useChartBuilderModel, useInsightBuilderModel, useReportBuilderModel } from '../../models'
import { useReportDetailStore } from '../../stores/report-detail.store'
import { InsightEditorDrawer } from './InsightEditorDrawer'
import { PageSidebar } from './PageSidebar'
import { ReportEditorDrawer } from './ReportEditorDrawer'
import { ReportStage } from './ReportStage'
import { useReportStageScroll } from './useReportStageScroll'

export const ReportWorkspace = memo(() => {
  const { t } = useTranslation()
  const { activePageId, openChartEditor, openInsightEditor, reportId, selectPage, setScrolledPage, viewMode } =
    useReportDetailStore(
      useShallow((state) => ({
        activePageId: state.activePageId,
        openChartEditor: state.openChartEditor,
        openInsightEditor: state.openInsightEditor,
        reportId: state.reportId,
        selectPage: state.selectPage,
        setScrolledPage: state.setScrolledPage,
        viewMode: state.viewMode,
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
    viewMode,
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
        <PageSidebar />
        <div className='report-detail-stage report-detail-stage-empty'>
          <Empty description={t('reportDetail.emptyReport')} image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      </div>
    )
  }

  return (
    <div className='report-detail-shell'>
      <PageSidebar />
      <ReportStage
        activePageId={activePageId}
        onEditChart={editChart}
        onEditInsight={editInsight}
        onPageRef={setPageNode}
        pageSections={viewPages}
        stageRef={stageRef}
        viewMode={viewMode}
      />
      <ReportEditorDrawer />
      <InsightEditorDrawer />
    </div>
  )
})
