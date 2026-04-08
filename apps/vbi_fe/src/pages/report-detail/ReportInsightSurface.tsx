import { Typography } from 'antd';
import { EditableSurface } from './EditableSurface';

export const ReportInsightSurface = ({
  content,
  onEdit,
}: {
  content: string;
  onEdit: () => void;
}) => (
  <EditableSurface onEdit={onEdit}>
    <div className="report-detail-insight-panel">
      <Typography.Paragraph className="report-detail-insight">
        {content || '暂无洞察'}
      </Typography.Paragraph>
    </div>
  </EditableSurface>
);
