import { Empty } from 'antd';
import { useTranslation } from '../../i18n';
import {
  useChartBuilderModel,
  useInsightBuilderModel,
  useReportBuilderModel,
} from '../../models';
import { useReportDetailStore } from '../../stores/report-detail.store';
import { InsightEditorDrawer } from './InsightEditorDrawer';
import { PageSidebar } from './PageSidebar';
import { ReportEditorDrawer } from './ReportEditorDrawer';
import { ReportStage } from './ReportStage';

export const ReportWorkspace = () => {
  const { t } = useTranslation();
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
  const pages = reportSession?.builder?.build().pages ?? [];
  const page = pages.find((item) => item.id === activePageId);
  const chartBuilder = useChartBuilderModel(
    (state) => state.sessions[chartId]?.builder ?? null,
  );
  const insightBuilder = useInsightBuilderModel(
    (state) => state.sessions[insightId]?.builder ?? null,
  );

  if (!page) {
    return (
      <div className="report-detail-empty">
        <Empty
          description={t('reportDetail.emptyReport')}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </div>
    );
  }

  return (
    <div className="report-detail-shell">
      <PageSidebar />
      <ReportStage
        chartBuilder={chartBuilder}
        hasChart={!!page.chartId}
        hasInsight={!!page.insightId}
        insightBuilder={insightBuilder}
        insightId={page.insightId}
        onEditChart={openChartEditor}
        onEditInsight={openInsightEditor}
      />
      <ReportEditorDrawer />
      <InsightEditorDrawer />
    </div>
  );
};
