import { APP as StandardAPP } from 'standard';
import { Spin, Typography } from 'antd';
import {
  useChartBuilderModel,
  useInsightBuilderModel,
  useReportBuilderModel,
} from '../../models';
import { useReportDetailStore } from '../../stores/report-detail.store';
import { InsightEditorDrawer } from './InsightEditorDrawer';
import { PageSidebar } from './PageSidebar';
import { ReportEditorDrawer } from './ReportEditorDrawer';
import { EditableSurface } from './EditableSurface';

export const ReportWorkspace = () => {
  const activePageId = useReportDetailStore((state) => state.activePageId);
  const chartId = useReportDetailStore((state) => state.connectedChartId);
  const insightId = useReportDetailStore((state) => state.connectedInsightId);
  const openChartEditor = useReportDetailStore(
    (state) => state.openChartEditor,
  );
  const openInsightEditor = useReportDetailStore(
    (state) => state.openInsightEditor,
  );
  const reportId = useReportDetailStore((state) => state.reportId);
  const reportSession = useReportBuilderModel(
    (state) => state.sessions[reportId],
  );
  const chartBuilder = useChartBuilderModel(
    (state) => state.sessions[chartId]?.builder ?? null,
  );
  const insightBuilder = useInsightBuilderModel(
    (state) => state.sessions[insightId]?.builder ?? null,
  );
  const pages = reportSession?.builder?.build().pages ?? [];
  const page = pages.find((item) => item.id === activePageId);
  const insightContent = insightBuilder?.build().content?.trim() ?? '';

  if (!page) {
    return (
      <div className="report-detail-empty">
        <Typography.Text type="secondary">
          当前报告没有可用页面。
        </Typography.Text>
      </div>
    );
  }

  return (
    <div className="report-detail-shell">
      <PageSidebar />
      <section className="report-detail-stage">
        <div className="report-detail-slide">
          <div className="report-detail-slide-chart">
            <EditableSurface onEdit={openChartEditor}>
              {chartBuilder ? (
                <StandardAPP builder={chartBuilder} mode="view" />
              ) : (
                <div className="report-detail-placeholder">
                  <Spin tip="连接图表中..." />
                </div>
              )}
            </EditableSurface>
          </div>
          <div className="report-detail-slide-note">
            <EditableSurface onEdit={openInsightEditor}>
              <div className="report-detail-insight-panel">
                <Typography.Paragraph className="report-detail-insight">
                  {insightContent || '暂无洞察'}
                </Typography.Paragraph>
              </div>
            </EditableSurface>
          </div>
        </div>
      </section>
      <ReportEditorDrawer />
      <InsightEditorDrawer />
    </div>
  );
};
