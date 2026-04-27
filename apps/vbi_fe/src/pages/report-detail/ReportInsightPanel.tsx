import { EditOutlined, FileSearchOutlined } from '@ant-design/icons';
import { Empty, Spin } from 'antd';
import type { VBIInsightBuilder } from '@visactor/vbi';
import { EditableSurface } from './EditableSurface';
import { MarkdownContent } from './MarkdownContent';
import { useInsightPreview } from './useInsightPreview';
import { useTranslation } from '../../i18n';

type ReportInsightPanelProps = {
  builder: VBIInsightBuilder | null;
  insightId: string;
  onEdit: () => void;
};

export const ReportInsightPanel = ({
  builder,
  insightId,
  onEdit,
}: ReportInsightPanelProps) => {
  const { content, loading } = useInsightPreview(insightId, builder);
  const showLoading = loading && !content;
  const { t } = useTranslation();

  return (
    <div className="report-detail-slide-note">
      <EditableSurface
        actions={[
          {
            ariaLabel: t('reportDetail.editInsight'),
            icon: <EditOutlined />,
            onClick: onEdit,
          },
        ]}
      >
        <div className="report-detail-insight-panel">
          <h2 className="report-detail-insight-title">
            {t('reportDetail.insightSummary')}
          </h2>
          {showLoading ? (
            <div className="report-detail-placeholder">
              <Spin />
            </div>
          ) : content ? (
            <MarkdownContent content={content} />
          ) : (
            <Empty
              className="report-detail-insight-empty"
              description={t('reportDetail.emptyInsight')}
              image={<FileSearchOutlined />}
            />
          )}
        </div>
      </EditableSurface>
    </div>
  );
};
