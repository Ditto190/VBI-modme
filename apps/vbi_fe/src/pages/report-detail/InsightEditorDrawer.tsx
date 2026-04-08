import { Button, Drawer, Input, Space } from 'antd';

export const InsightEditorDrawer = ({
  content,
  loading,
  onChange,
  onClose,
  onSave,
  open,
}: {
  content: string;
  loading: boolean;
  onChange: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
  open: boolean;
}) => (
  <Drawer
    destroyOnHidden
    extra={
      <Space>
        <Button onClick={onClose}>取消</Button>
        <Button loading={loading} type="primary" onClick={onSave}>
          保存洞察
        </Button>
      </Space>
    }
    open={open}
    title="编辑 Insight"
    width={480}
    onClose={onClose}
  >
    <Input.TextArea
      autoSize={{ minRows: 12, maxRows: 20 }}
      value={content}
      placeholder="输入这页的叙事、结论或备注"
      onChange={(event) => onChange(event.target.value)}
    />
  </Drawer>
);
