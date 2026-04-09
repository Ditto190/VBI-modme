import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Layout, Spin } from 'antd';
import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Collaborators } from '../components/Collaborators';
import {
  useBuilderSnapshot,
  useBuilderVersion,
} from '../hooks/useBuilderSnapshot';
import { useResourceBuilder } from '../hooks/useResourceBuilder';
import { createInsight } from '../services/insightApi';
import { createResource } from '../services/resourceApi';
import type { ReportPage } from '../types';
import { getSessionUserName } from '../utils/collaboration';
import { resolveActivePageId } from './report-detail/page-state';
import { ReportWorkspace } from './report-detail/ReportWorkspace';
import './report-detail/report-detail.css';

const { Header, Content } = Layout;
const userName = getSessionUserName();
const EMPTY_PAGES: ReportPage[] = [];

const getNextPageTitle = (pages: ReportPage[]) => `Page ${pages.length + 1}`;

export const ReportDetailPage = memo(() => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const [activePageId, setActivePageId] = useState('');
  const [busy, setBusy] = useState(false);
  const [chartEditorOpen, setChartEditorOpen] = useState(false);
  const [insightEditorOpen, setInsightEditorOpen] = useState(false);
  const { provider, builder: reportBuilder } = useResourceBuilder(
    'report',
    id,
    userName,
  );
  useBuilderVersion(reportBuilder);
  const pages = reportBuilder?.build().pages ?? EMPTY_PAGES;
  const activePage = pages.find((page) => page.id === activePageId);
  const { builder: chartBuilder } = useResourceBuilder(
    'chart',
    activePage?.chartId || '',
    userName,
  );
  const { builder: insightBuilder } = useResourceBuilder(
    'insight',
    activePage?.insightId || '',
    userName,
  );
  const insightContent = useBuilderSnapshot(
    insightBuilder,
    (builder) => builder.build().content?.trim() ?? '',
    '',
  );

  const runAction = useCallback(async (action: () => Promise<void>) => {
    setBusy(true);
    try {
      await action();
    } catch (error) {
      console.error(error);
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    setActivePageId((value) => resolveActivePageId(pages, value));
  }, [pages]);

  useEffect(() => {
    setChartEditorOpen(false);
    setInsightEditorOpen(false);
  }, [activePage?.id]);

  if (!id) return <div>Invalid report id</div>;
  if (!reportBuilder) return <Spin fullscreen size="large" />;

  return (
    <Layout className="report-detail-layout">
      <Header className="report-detail-app-header">
        <Button
          className="report-detail-back"
          icon={<ArrowLeftOutlined />}
          size="large"
          type="text"
          onClick={() => navigate('/reports')}
        />
        <div className="report-detail-app-meta">
          {provider ? <Collaborators provider={provider} /> : null}
        </div>
      </Header>
      <Content className="report-detail-content">
        <ReportWorkspace
          activePageId={activePageId}
          busy={busy}
          chartBuilder={chartBuilder}
          chartEditorOpen={chartEditorOpen}
          insightContent={insightContent}
          insightEditorOpen={insightEditorOpen}
          page={activePage}
          pages={pages}
          onAddPage={() =>
            void runAction(async () => {
              const pageTitle = getNextPageTitle(pages);
              const chart = await createResource('chart', `${pageTitle} Chart`);
              const insight = await createInsight({
                name: `${pageTitle} Insight`,
                content: '',
              });

              reportBuilder.page.add(
                pageTitle,
                (page: {
                  getId(): string;
                  setChartId(chartId: string): void;
                  setInsightId(insightId: string): void;
                }) => {
                  page.setChartId(chart.id);
                  page.setInsightId(insight.id);
                  setActivePageId(page.getId());
                },
              );
            })
          }
          onChangePage={setActivePageId}
          onCloseChartEditor={() => setChartEditorOpen(false)}
          onCloseInsightEditor={() => setInsightEditorOpen(false)}
          onDeletePage={(pageId) =>
            void runAction(async () => {
              reportBuilder.page.remove(pageId);
            })
          }
          onInsightDraftChange={(value) => {
            if (!insightBuilder) return;
            insightBuilder.setContent(value);
          }}
          onOpenChartEditor={() => setChartEditorOpen(true)}
          onOpenInsightEditor={() => setInsightEditorOpen(true)}
        />
      </Content>
    </Layout>
  );
});
