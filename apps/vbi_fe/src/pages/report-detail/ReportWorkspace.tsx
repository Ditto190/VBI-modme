import type { VBIChartBuilder } from '@visactor/vbi';
import { Typography } from 'antd';
import type { ReportPage } from '../../services/types';
import { InsightEditorDrawer } from './InsightEditorDrawer';
import { PageSidebar } from './PageSidebar';
import { ReportEditorDrawer } from './ReportEditorDrawer';
import { ReportStage } from './ReportStage';

type Props = {
  activePageId: string;
  busy: boolean;
  chartBuilder: VBIChartBuilder | null;
  chartEditorOpen: boolean;
  insightContent: string;
  insightDraft: string;
  insightEditorOpen: boolean;
  page?: ReportPage;
  pages: ReportPage[];
  onAddPage: () => void;
  onChangePage: (pageId: string) => void;
  onCloseChartEditor: () => void;
  onCloseInsightEditor: () => void;
  onDeletePage: (pageId: string) => void;
  onInsightDraftChange: (value: string) => void;
  onOpenChartEditor: () => void;
  onOpenInsightEditor: () => void;
  onSaveInsight: () => void;
};

export const ReportWorkspace = ({
  activePageId,
  busy,
  chartBuilder,
  chartEditorOpen,
  insightContent,
  insightDraft,
  insightEditorOpen,
  page,
  pages,
  onAddPage,
  onChangePage,
  onCloseChartEditor,
  onCloseInsightEditor,
  onDeletePage,
  onInsightDraftChange,
  onOpenChartEditor,
  onOpenInsightEditor,
  onSaveInsight,
}: Props) => (
  <div className="report-detail-shell">
    {page ? (
      <>
        <PageSidebar
          activePageId={activePageId}
          busy={busy}
          pages={pages}
          onAddPage={onAddPage}
          onChangePage={onChangePage}
          onDeletePage={onDeletePage}
        />
        <ReportStage
          chartBuilder={chartBuilder}
          insightContent={insightContent}
          onOpenChartEditor={onOpenChartEditor}
          onOpenInsightEditor={onOpenInsightEditor}
        />
        <ReportEditorDrawer
          builder={chartBuilder}
          open={chartEditorOpen}
          title={page.title || 'Chart Editor'}
          onClose={onCloseChartEditor}
        />
        <InsightEditorDrawer
          content={insightDraft}
          loading={busy}
          open={insightEditorOpen}
          onChange={onInsightDraftChange}
          onClose={onCloseInsightEditor}
          onSave={onSaveInsight}
        />
      </>
    ) : (
      <div className="report-detail-empty">
        <Typography.Text type="secondary">
          当前报告没有可用页面。
        </Typography.Text>
      </div>
    )}
  </div>
);
