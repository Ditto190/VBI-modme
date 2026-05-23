import { Fragment, memo, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { Empty } from '../../components/ui/empty'
import { cn } from '../../lib/utils'
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
        className={cn(
          'vbi-motion-soft-reveal block w-full scroll-mt-2 max-[900px]:scroll-mt-24',
          page.id === activePageId && 'is-active',
        )}
        data-report-page-id={page.id}
        data-active={page.id === activePageId}
        ref={onPageRef(page.id)}
      >
        <div className='grid w-full min-w-0 content-start justify-items-stretch gap-[18px] max-[640px]:gap-2.5'>
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
    <section
      ref={stageRef}
      className='flex min-h-0 flex-1 flex-col items-center justify-start overflow-auto overflow-x-hidden overscroll-contain px-3.5 pb-[26px] pt-2.5 scroll-smooth [contain:layout] [overflow-anchor:none] [scrollbar-gutter:stable] max-[1100px]:min-h-0'
      data-report-stage='vertical'
    >
      <div className='vbi-motion-panel flex min-h-0 w-[min(100%,1040px)] min-w-0 shrink-0 flex-col gap-5 rounded-lg border border-[var(--vbi-border)] bg-[color-mix(in_srgb,var(--vbi-surface-solid)_96%,var(--vbi-bg-solid))] px-[30px] pb-8 pt-7 shadow-[0_18px_44px_color-mix(in_srgb,var(--vbi-text-strong)_5%,transparent)] max-[640px]:px-3.5 max-[640px]:pb-[22px] max-[640px]:pt-[18px]'>
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
