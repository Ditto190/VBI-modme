import { Fragment, memo, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { Empty } from '../../components/ui/empty'
import { ReportPageDivider } from './ReportPageDivider'
import type { ReportPageRendererProps, ReportRendererProps } from './ReportStage.types'

const ReportChartPanel = dynamic(() => import('./ReportChartPanel').then((module) => module.ReportChartPanel), {
  ssr: false,
})
const ReportInsightPanel = dynamic(() => import('./ReportInsightPanel').then((module) => module.ReportInsightPanel), {
  ssr: false,
})

const VerticalReportPage = memo(
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
        className={`report-detail-vertical-page ${page.id === activePageId ? 'is-active' : ''}`}
        data-report-page-id={page.id}
        ref={onPageRef(page.id)}
      >
        <div className='report-detail-vertical-slide'>
          {hasInsight ? (
            <ReportInsightPanel builder={insightBuilder} insightId={page.insightId} onEdit={editInsight} />
          ) : null}
          {hasChart ? <ReportChartPanel builder={chartBuilder} onEdit={editChart} /> : null}
          {!hasChart && !hasInsight ? <Empty description={emptyDescription} /> : null}
        </div>
      </article>
    )
  },
)

export const VerticalReportRenderer = memo(
  ({ activePageId, emptyDescription, onEditChart, onEditInsight, onPageRef, pages, stageRef }: ReportRendererProps) => (
    <section ref={stageRef} className='report-detail-stage report-detail-vertical-stage'>
      <div className='report-detail-vertical-track'>
        {pages.map((page, index) => (
          <Fragment key={page.page.id}>
            {index > 0 ? <ReportPageDivider index={index} title={page.page.title} /> : null}
            <VerticalReportPage
              {...page}
              activePageId={activePageId}
              emptyDescription={emptyDescription}
              onEditChart={onEditChart}
              onEditInsight={onEditInsight}
              onPageRef={onPageRef}
            />
          </Fragment>
        ))}
      </div>
    </section>
  ),
)
