import { Button, Drawer, Input } from 'antd';
import { useInsightBuilderModel } from '../../models';
import { useReportDetailStore } from '../../stores/report-detail.store';

export const InsightEditorDrawer = () => {
  const closeInsightEditor = useReportDetailStore(
    (state) => state.closeInsightEditor,
  );
  const insightId = useReportDetailStore((state) => state.connectedInsightId);
  const open = useReportDetailStore((state) => state.insightEditorOpen);
  const setInsightContent = useReportDetailStore(
    (state) => state.setInsightContent,
  );
  const insightBuilder = useInsightBuilderModel(
    (state) => state.sessions[insightId]?.builder ?? null,
  );
  const content = insightBuilder?.build().content?.trim() ?? '';

  return (
    <Drawer
      destroyOnHidden
      extra={<Button onClick={closeInsightEditor}>关闭</Button>}
      open={open}
      title="编辑 Insight"
      size={480}
      onClose={closeInsightEditor}
    >
      <Input.TextArea
        autoSize={{ minRows: 12, maxRows: 20 }}
        value={content}
        placeholder="输入这页的叙事、结论或备注"
        onChange={(event) => setInsightContent(event.target.value)}
      />
    </Drawer>
  );
};
