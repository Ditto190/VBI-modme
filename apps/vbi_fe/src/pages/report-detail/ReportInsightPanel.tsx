import { EditOutlined, FileSearchOutlined } from '@ant-design/icons'
import { Empty, Spin } from 'antd'
import type { VBIInsightBuilder } from '@visactor/vbi'
import { memo, useMemo } from 'react'
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
        icon: <EditOutlined />,
        onClick: onEdit,
      },
    ],
    [onEdit, t],
  )

  return (
    <div className='report-detail-slide-note'>
      <EditableSurface actions={actions}>
        <div className='report-detail-insight-panel'>
          {showLoading ? (
            <div className='report-detail-placeholder'>
              <Spin />
            </div>
          ) : content ? (
            <MarkdownContent content={content} />
          ) : (
            <Empty
              className='report-detail-insight-empty'
              description={t('reportDetail.emptyInsight')}
              image={<FileSearchOutlined />}
            />
          )}
        </div>
      </EditableSurface>
    </div>
  )
})
