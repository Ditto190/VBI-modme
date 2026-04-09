import { APP as StandardAPP } from 'standard';
import type { VBIChartBuilder } from '@visactor/vbi';
import { Spin, Typography } from 'antd';
import type { ReportPage } from '../../types';
import { InsightEditorDrawer } from './InsightEditorDrawer';
import { PageSidebar } from './PageSidebar';
import { ReportEditorDrawer } from './ReportEditorDrawer';
import { EditableSurface } from './EditableSurface';

type Props = {
  activePageId: string;
  busy: boolean;
  chartBuilder: VBIChartBuilder | null;
  chartEditorOpen: boolean;
  insightContent: string;
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
};

export const ReportWorkspace = ({
  activePageId,
  busy,
  chartBuilder,
  chartEditorOpen,
  insightContent,
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
        <section className="report-detail-stage">
          <div className="report-detail-slide">
            <div className="report-detail-slide-chart">
              <EditableSurface onEdit={onOpenChartEditor}>
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
              <EditableSurface onEdit={onOpenInsightEditor}>
                <div className="report-detail-insight-panel">
                  <Typography.Paragraph className="report-detail-insight">
                    {insightContent || '暂无洞察'}
                  </Typography.Paragraph>
                </div>
              </EditableSurface>
            </div>
          </div>
        </section>
        <ReportEditorDrawer
          builder={chartBuilder}
          open={chartEditorOpen}
          title={page.title || 'Chart Editor'}
          onClose={onCloseChartEditor}
        />
        <InsightEditorDrawer
          content={insightContent}
          open={insightEditorOpen}
          onChange={onInsightDraftChange}
          onClose={onCloseInsightEditor}
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
