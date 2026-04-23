import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Layout, Spin } from 'antd';
import { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Collaborators } from '../components/Collaborators';
import { useReportBuilderModel } from '../models';
import { useNavigationStore } from '../stores/navigation.store';
import { useReportDetailStore } from '../stores/report-detail.store';
import { getSessionUserName } from '../utils/collaboration';
import { ReportWorkspace } from './report-detail/ReportWorkspace';
import './report-detail/report-detail.css';

const { Header, Content } = Layout;
const userName = getSessionUserName();

export const ReportDetailPage = memo(() => {
  const { id = '' } = useParams();
  const go = useNavigationStore((state) => state.go);
  const bootstrap = useReportDetailStore((state) => state.bootstrap);
  const dispose = useReportDetailStore((state) => state.dispose);
  const syncActivePage = useReportDetailStore((state) => state.syncActivePage);
  const reportSession = useReportBuilderModel((state) => state.sessions[id]);

  useEffect(() => {
    void bootstrap(id, userName);
    return () => {
      void dispose();
    };
  }, [bootstrap, dispose, id]);

  useEffect(() => {
    if (!id || !reportSession?.builder) return;
    void syncActivePage();
  }, [id, reportSession?.version, reportSession?.builder, syncActivePage]);

  if (!id) return <div>Invalid report id</div>;
  if (!reportSession?.builder) return <Spin fullscreen size="large" />;

  return (
    <Layout className="report-detail-layout">
      <Header className="report-detail-app-header">
        <Button
          className="report-detail-back"
          icon={<ArrowLeftOutlined />}
          size="large"
          type="text"
          onClick={() => go('/reports')}
        />
        <div className="report-detail-app-meta">
          {reportSession.provider ? (
            <Collaborators provider={reportSession.provider} />
          ) : null}
        </div>
      </Header>
      <Content className="report-detail-content">
        <ReportWorkspace />
      </Content>
    </Layout>
  );
});
