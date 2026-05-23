import type { VBIInsightBuilder } from '@visactor/vbi'
import { memo, useMemo } from 'react'
import { CenteredState } from '../../components/ui/centered-state'
import { Empty } from '../../components/ui/empty'
import { FileSearch, Pencil } from '../../components/ui/icons'
import { Spinner } from '../../components/ui/spinner'
import { EditableSurface } from './EditableSurface'
import type { EditableSurfaceAction } from './EditableSurface'
import { MarkdownContent } from './MarkdownContent'
import { useInsightPreview } from './useInsightPreview'
import { useTranslation } from '../../i18n'

type ReportInsightPanelProps = {
  builder: VBIInsightBuilder | null
  insightId: string
  onEdit: () => void
}

export const ReportInsightPanel = memo(({ builder, insightId, onEdit }: ReportInsightPanelProps) => {
  const { content, loading } = useInsightPreview(insightId, builder)
  const showLoading = loading && !content
  const { t } = useTranslation()
  const actions = useMemo<EditableSurfaceAction[]>(
    () => [
      {
        ariaLabel: t('reportDetail.editInsight'),
        icon: <Pencil className='h-4 w-4' />,
        onClick: onEdit,
      },
    ],
    [onEdit, t],
  )

  return (
    <div className='vbi-motion-row w-[min(100%,820px)] justify-self-center' data-report-panel='insight'>
      <EditableSurface actions={actions}>
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
      </EditableSurface>
    </div>
  )
})
