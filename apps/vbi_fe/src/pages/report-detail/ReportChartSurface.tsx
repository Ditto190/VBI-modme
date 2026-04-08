import { APP as StandardAPP } from 'standard';
import type { VBIChartBuilder } from '@visactor/vbi';
import { Spin } from 'antd';
import { EditableSurface } from './EditableSurface';

export const ReportChartSurface = ({
  builder,
  onEdit,
}: {
  builder: VBIChartBuilder | null;
  onEdit: () => void;
}) => (
  <EditableSurface onEdit={onEdit}>
    {builder ? (
      <StandardAPP builder={builder} mode="view" />
    ) : (
      <div className="report-detail-placeholder">
        <Spin tip="连接图表中..." />
      </div>
    )}
  </EditableSurface>
);
