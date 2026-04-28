import { Empty } from 'antd'
import { Fragment, memo, useCallback } from 'react'
import { ReportChartPanel } from './ReportChartPanel'
import { ReportInsightPanel } from './ReportInsightPanel'
import { ReportPageDivider } from './ReportPageDivider'
import type { ReportPageRendererProps, ReportRendererProps } from './ReportStage.types'

const HorizontalReportPage = memo(
  ({
    activePageId,
    chartBuilder,
    emptyDescription,
    hasChart,
    hasInsight,
    insightBuilder,
    onEditChart,
    onEditInsight,
    onPageRef,
    page,
  }: ReportPageRendererProps) => {
    const editChart = useCallback(() => {
      onEditChart(page.id)
    }, [onEditChart, page.id])
    const editInsight = useCallback(() => {
      onEditInsight(page.id)
    }, [onEditInsight, page.id])
    return (
      <article
        className={`report-detail-horizontal-page ${page.id === activePageId ? 'is-active' : ''}`}
        data-report-page-id={page.id}
        ref={onPageRef(page.id)}
      >
        <div className='report-detail-horizontal-slide'>
          {hasInsight ? (
            <ReportInsightPanel builder={insightBuilder} insightId={page.insightId} onEdit={editInsight} />
          ) : null}
          {hasChart ? <ReportChartPanel builder={chartBuilder} onEdit={editChart} /> : null}
          {!hasChart && !hasInsight ? (
            <Empty description={emptyDescription} image={Empty.PRESENTED_IMAGE_SIMPLE} />
          ) : null}
        </div>
      </article>
    )
  },
)

export const HorizontalReportRenderer = memo(
  ({ activePageId, emptyDescription, onEditChart, onEditInsight, onPageRef, pages, stageRef }: ReportRendererProps) => (
    <section ref={stageRef} className='report-detail-stage report-detail-horizontal-stage'>
      <div className='report-detail-horizontal-track'>
        {pages.map((page, index) => (
          <Fragment key={page.page.id}>
            <HorizontalReportPage
              {...page}
              activePageId={activePageId}
              emptyDescription={emptyDescription}
              onEditChart={onEditChart}
              onEditInsight={onEditInsight}
              onPageRef={onPageRef}
            />
            <ReportPageDivider index={index} mode='horizontal' title={page.page.title} />
          </Fragment>
        ))}
      </div>
    </section>
  ),
)
