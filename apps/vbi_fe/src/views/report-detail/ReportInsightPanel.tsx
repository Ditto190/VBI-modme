import type { VBIInsightBuilder } from '@visactor/vbi'
import { memo } from 'react'
import { CenteredState } from '../../components/ui/centered-state'
import { Empty } from '../../components/ui/empty'
import { FileSearch } from '../../components/ui/icons'
import { Spinner } from '../../components/ui/spinner'
import { MarkdownContent } from './MarkdownContent'
import { useInsightPreview } from './useInsightPreview'
import { useTranslation } from '../../i18n'

type ReportInsightPanelProps = {
  builder: VBIInsightBuilder | null
  insightId: string
}

export const ReportInsightPanel = memo(({ builder, insightId }: ReportInsightPanelProps) => {
  const { content, loading } = useInsightPreview(insightId, builder)
  const showLoading = loading && !content
  const { t } = useTranslation()

  return (
    <div className='vbi-motion-row w-[min(100%,820px)] justify-self-center' data-report-panel='insight'>
      <div className='grid min-h-24 content-start gap-2 overflow-visible py-1'>
        {showLoading ? (
          <CenteredState minHeight='sm'>
            <Spinner />
          </CenteredState>
        ) : content ? (
          <MarkdownContent content={content} />
        ) : (
          <Empty description={t('reportDetail.emptyInsight')} icon={<FileSearch className='h-5 w-5' />} />
        )}
      </div>
    </div>
  )
})
