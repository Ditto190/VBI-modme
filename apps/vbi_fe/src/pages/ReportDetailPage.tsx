import { ArrowLeftOutlined, FileTextOutlined } from '@ant-design/icons';
import { Button, Layout, Spin } from 'antd';
import { memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';
import { Collaborators } from '../components/Collaborators';
import { useStoreLifecycle } from '../hooks/useStoreLifecycle';
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
  const { bootstrap, dispose } = useReportDetailStore(
    useShallow((state) => ({
      bootstrap: state.bootstrap,
      dispose: state.dispose,
    })),
  );
  const reportSession = useReportBuilderModel(
    useShallow((state) => {
      const session = state.sessions[id];
      return {
        builder: session?.builder ?? null,
        provider: session?.provider ?? null,
      };
    }),
  );

  const bootReport = useCallback(
    () => bootstrap(id, userName),
    [bootstrap, id],
  );
  useStoreLifecycle(bootReport, dispose);

  if (!id) return <div>{t('reportDetail.invalidId')}</div>;
  if (!reportSession.builder) return <Spin fullscreen size="large" />;

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
