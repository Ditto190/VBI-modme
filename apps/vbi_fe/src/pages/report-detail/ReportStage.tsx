import { Empty } from 'antd'
import { memo } from 'react'
import type { RefObject } from 'react'
import { useTranslation } from '../../i18n'
import { HorizontalReportRenderer } from './HorizontalReportRenderer'
import type { ReportStagePage } from './ReportStage.types'
import { VerticalReportRenderer } from './VerticalReportRenderer'

type ReportStageProps = {
  activePageId: string
  onEditChart: (pageId: string) => void
  onEditInsight: (pageId: string) => void
  onPageRef: (pageId: string) => (node: HTMLDivElement | null) => void
  pageSections: ReportStagePage[]
  stageRef: RefObject<HTMLDivElement | null>
  viewMode: 'horizontal' | 'vertical'
}

export const ReportStage = memo(
  ({ activePageId, onEditChart, onEditInsight, onPageRef, pageSections, stageRef, viewMode }: ReportStageProps) => {
    const { t } = useTranslation()
    const emptyDescription = t('reportDetail.emptyStage')

    if (!pageSections.length) {
      return (
        <section className="report-detail-stage report-detail-stage-empty">
          <Empty description={emptyDescription} image={Empty.PRESENTED_IMAGE_SIMPLE} />
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

    return viewMode === 'horizontal' ? (
      <HorizontalReportRenderer {...rendererProps} />
    ) : (
      <VerticalReportRenderer {...rendererProps} />
    )
  },
)
