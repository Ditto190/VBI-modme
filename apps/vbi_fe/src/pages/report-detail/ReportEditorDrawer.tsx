import { APP as StandardAPP } from 'standard';
import { Drawer, Spin, Typography } from 'antd';
import { useChartBuilderModel, useReportBuilderModel } from '../../models';
import { useReportDetailStore } from '../../stores/report-detail.store';

export const ReportEditorDrawer = () => {
  const chartId = useReportDetailStore((state) => state.connectedChartId);
  const closeChartEditor = useReportDetailStore(
    (state) => state.closeChartEditor,
  );
  const open = useReportDetailStore((state) => state.chartEditorOpen);
  const reportId = useReportDetailStore((state) => state.reportId);
  const activePageId = useReportDetailStore((state) => state.activePageId);
  const chartBuilder = useChartBuilderModel(
    (state) => state.sessions[chartId]?.builder ?? null,
  );
  const reportSession = useReportBuilderModel(
    (state) => state.sessions[reportId],
  );
  const title =
    reportSession?.builder
      ?.build()
      .pages.find((page) => page.id === activePageId)?.title || 'Chart Editor';

  return (
    <Drawer
      destroyOnHidden
      open={open}
      title={title}
      style={{ width: '92vw' }}
      onClose={closeChartEditor}
    >
      <div className="report-detail-editor">
        {chartBuilder ? (
          <StandardAPP builder={chartBuilder} mode="edit" />
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
};
