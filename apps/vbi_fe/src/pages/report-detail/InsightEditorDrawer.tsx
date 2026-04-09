import { Button, Drawer, Input } from 'antd';

export const InsightEditorDrawer = ({
  content,
  onChange,
  onClose,
  open,
}: {
  content: string;
  onChange: (value: string) => void;
  onClose: () => void;
  open: boolean;
}) => (
  <Drawer
    destroyOnHidden
    extra={<Button onClick={onClose}>关闭</Button>}
    open={open}
    title="编辑 Insight"
    size={480}
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
