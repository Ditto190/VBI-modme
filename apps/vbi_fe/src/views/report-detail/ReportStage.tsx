import { memo } from 'react'
import type { RefObject } from 'react'
import { Empty } from '../../components/ui/empty'
import { useTranslation } from '../../i18n'
import type { ReportStagePage } from './ReportStage.types'
import { VerticalReportRenderer } from './VerticalReportRenderer'

type ReportStageProps = {
  activePageId: string
  onEditChart: (pageId: string) => void
  onEditInsight: (pageId: string) => void
  onPageRef: (pageId: string) => (node: HTMLDivElement | null) => void
  pageSections: ReportStagePage[]
  stageRef: RefObject<HTMLDivElement | null>
}

export const ReportStage = memo(
  ({ activePageId, onEditChart, onEditInsight, onPageRef, pageSections, stageRef }: ReportStageProps) => {
    const { t } = useTranslation()
    const emptyDescription = t('reportDetail.emptyStage')

    if (!pageSections.length) {
      return (
        <section className='flex min-h-0 flex-1 items-center justify-center overflow-auto overscroll-contain scroll-smooth [contain:layout] [overflow-anchor:none] [scrollbar-gutter:stable]'>
          <Empty description={emptyDescription} />
        </section>
      )
    }

    const rendererProps = {
      activePageId,
      emptyDescription,
      onEditChart,
      onEditInsight,
      onPageRef,
      pages: pageSections,
      stageRef,
    }

    return <VerticalReportRenderer {...rendererProps} />
  },
)
