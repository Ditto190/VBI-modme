import { Button, Drawer, Input, Spin } from 'antd';
import { useTranslation } from '../../i18n';
import { useInsightBuilderModel } from '../../models';
import { useReportDetailStore } from '../../stores/report-detail.store';

export const InsightEditorDrawer = () => {
  const { t } = useTranslation();
  const closeInsightEditor = useReportDetailStore(
    (state) => state.closeInsightEditor,
  );
  const insightId = useReportDetailStore((state) => state.connectedInsightId);
  const open = useReportDetailStore((state) => state.insightEditorOpen);
  const setInsightContent = useReportDetailStore(
    (state) => state.setInsightContent,
  );
  const insightSession = useInsightBuilderModel(
    (state) => state.sessions[insightId],
  );
  const insightBuilder = insightSession?.builder ?? null;
  const content = insightBuilder?.build().content ?? '';

  return (
    <Drawer
      destroyOnHidden
      extra={<Button onClick={closeInsightEditor}>{t('common.close')}</Button>}
      open={open}
      title={t('reportDetail.editInsight')}
      width="min(720px, 92vw)"
      onClose={closeInsightEditor}
    >
      {insightBuilder ? (
        <Input.TextArea
          autoSize={{ minRows: 12, maxRows: 20 }}
          value={content}
          placeholder={t('reportDetail.insightPlaceholder')}
          onChange={(event) => setInsightContent(event.target.value)}
        />
      ) : (
        <div className="report-detail-placeholder">
          <Spin tip={t('reportDetail.connectingInsightEditor')} />
        </div>
      )}
    </Drawer>
  );
};
