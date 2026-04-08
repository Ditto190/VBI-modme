import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Layout, Spin, message } from 'antd';
import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Collaborators } from '../components/Collaborators';
import { useCollaborativeBuilder } from '../hooks/useCollaborativeBuilder';
import { fetchInsight, updateInsight } from '../services/insightApi';
import {
  createReportPage,
  deleteReportPage,
  fetchReport,
} from '../services/reportApi';
import type { InsightDetail, ReportDetail } from '../services/types';
import { getSessionUserName } from '../utils/collaboration';
import { resolveActivePageId } from './report-detail/page-state';
import { ReportWorkspace } from './report-detail/ReportWorkspace';
import './report-detail/report-detail.css';
const { Header, Content } = Layout;
const userName = getSessionUserName();
export const ReportDetailPage = memo(() => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const [activePageId, setActivePageId] = useState('');
  const [busy, setBusy] = useState(false);
  const [chartEditorOpen, setChartEditorOpen] = useState(false);
  const [detail, setDetail] = useState<ReportDetail | null>(null);
  const [insightDraft, setInsightDraft] = useState('');
  const [insightEditorOpen, setInsightEditorOpen] = useState(false);
  const [insightDetail, setInsightDetail] = useState<InsightDetail | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [revision, setRevision] = useState(0);
  const { provider } = useCollaborativeBuilder(
    'report',
    id,
    userName,
    revision,
  );
  const activePage = detail?.pages.find((page) => page.id === activePageId);
  const { builder: chartBuilder } = useCollaborativeBuilder(
    'chart',
    activePage?.chartId || '',
    userName,
  );
  const { builder: insightBuilder } = useCollaborativeBuilder(
    'insight',
    activePage?.insightId || '',
    userName,
  );
  const insightContent =
    insightDetail?.content ?? insightBuilder?.build().content?.trim() ?? '';
  const reload = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      setDetail(await fetchReport(id));
      setRevision((value) => value + 1);
    } catch (error) {
      console.error(error);
      message.error('加载报告失败');
    } finally {
      setLoading(false);
    }
  }, [id]);
  const runAction = useCallback(
    async (action: () => Promise<void>, text: string) => {
      setBusy(true);
      try {
        await action();
        await reload();
      } catch (error) {
        console.error(error);
        message.error(text);
      } finally {
        setBusy(false);
      }
    },
    [reload],
  );

  const loadInsight = useCallback(async (insightId: string) => {
    try {
      const nextInsight = await fetchInsight(insightId);
      setInsightDetail(nextInsight);
      setInsightDraft(nextInsight.content);
    } catch (error) {
      console.error(error);
      setInsightDetail(null);
      setInsightDraft('');
      message.error('加载洞察失败');
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);
  useEffect(() => {
    if (detail)
      setActivePageId((value) => resolveActivePageId(detail.pages, value));
  }, [detail]);
  useEffect(() => {
    setChartEditorOpen(false);
    setInsightEditorOpen(false);
    if (activePage?.insightId) {
      void loadInsight(activePage.insightId);
      return;
    }
    setInsightDetail(null);
    setInsightDraft('');
  }, [activePage?.id, activePage?.insightId, activePage?.title, loadInsight]);

  const saveInsight = useCallback(() => {
    if (!activePage) return;
    void runAction(async () => {
      const nextInsight = await updateInsight(activePage.insightId, {
        content: insightDraft,
      });
      setInsightDetail(nextInsight);
      setInsightDraft(nextInsight.content);
      setInsightEditorOpen(false);
    }, '保存洞察失败');
  }, [activePage, insightDraft, runAction]);

  if (!id) return <div>Invalid report id</div>;
  if (loading && !detail) return <Spin fullscreen size="large" />;
  if (!detail) return <div>Report not found</div>;
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
          busy={busy || loading}
          chartBuilder={chartBuilder}
          chartEditorOpen={chartEditorOpen}
          insightContent={insightContent}
          insightDraft={insightDraft}
          insightEditorOpen={insightEditorOpen}
          page={activePage}
          pages={detail.pages}
          onAddPage={() =>
            void runAction(async () => {
              await createReportPage(id);
            }, '创建页面失败')
          }
          onChangePage={setActivePageId}
          onCloseChartEditor={() => setChartEditorOpen(false)}
          onCloseInsightEditor={() => setInsightEditorOpen(false)}
          onDeletePage={(pageId) =>
            void runAction(async () => {
              await deleteReportPage(id, pageId);
            }, '删除页面失败')
          }
          onInsightDraftChange={setInsightDraft}
          onOpenChartEditor={() => setChartEditorOpen(true)}
          onOpenInsightEditor={() => setInsightEditorOpen(true)}
          onSaveInsight={saveInsight}
        />
      </Content>
    </Layout>
  );
});
