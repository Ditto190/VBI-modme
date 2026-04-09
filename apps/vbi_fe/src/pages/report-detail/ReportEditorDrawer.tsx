import { APP as StandardAPP } from 'standard';
import type { VBIChartBuilder } from '@visactor/vbi';
import { Drawer, Spin, Typography } from 'antd';

export const ReportEditorDrawer = ({
  builder,
  onClose,
  open,
  title,
}: {
  builder: VBIChartBuilder | null;
  onClose: () => void;
  open: boolean;
  title: string;
}) => (
  <Drawer
    destroyOnHidden
    open={open}
    title={title}
    style={{ width: '92vw' }}
    onClose={onClose}
  >
    <div className="report-detail-editor">
      {builder ? (
        <StandardAPP builder={builder} mode="edit" />
      ) : (
        <div className="report-detail-placeholder">
          <Spin tip="连接图表编辑器中..." />
          <Typography.Text type="secondary">
            图表协同连接建立后会自动进入编辑态。
          </Typography.Text>
        </div>
      )}
    </div>
  </Drawer>
);
