import { ArrowLeftOutlined, FileTextOutlined } from '@ant-design/icons';
import { Button, Layout, Spin } from 'antd';
import { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Collaborators } from '../components/Collaborators';
import { useTranslation } from '../i18n';
import { useReportBuilderModel } from '../models';
import { useNavigationStore } from '../stores/navigation.store';
import { useReportDetailStore } from '../stores/report-detail.store';
import { getSessionUserName } from '../utils/collaboration';
import { ReportWorkspace } from './report-detail/ReportWorkspace';
import './report-detail/report-detail.css';

const { Header, Content } = Layout;
const userName = getSessionUserName();

export const ReportDetailPage = memo(() => {
  const { t } = useTranslation();
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

  if (!id) return <div>{t('reportDetail.invalidId')}</div>;
  if (!reportSession?.builder) return <Spin fullscreen size="large" />;

  return (
    <Layout className="report-detail-layout">
      <Header className="report-detail-app-header">
        <div className="report-detail-heading">
          <Button
            className="report-detail-back"
            icon={<ArrowLeftOutlined />}
            size="large"
            type="text"
            onClick={() => go('/manage/reports')}
          />
          <div className="report-detail-title-block">
            <span className="report-detail-kicker">
              <FileTextOutlined />
              {t('reportDetail.kicker')}
            </span>
            <h1 className="report-detail-title">{t('reportDetail.title')}</h1>
            <span className="report-detail-subtitle" title={id}>
              {id}
            </span>
          </div>
        </div>
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
