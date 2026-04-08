import {
  Button,
  Drawer,
  Form,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
  Typography,
  message,
} from 'antd';
import { useCallback, useEffect, useState } from 'react';
import {
  createInsight,
  deleteInsight,
  fetchInsight,
  fetchInsights,
  updateInsight,
} from '../services/insightApi';
import type { InsightDetail, ResourceItem } from '../services/types';

export const ManageInsightsPage = () => {
  const [items, setItems] = useState<ResourceItem[]>([]);
  const [selected, setSelected] = useState<InsightDetail | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [createForm] = Form.useForm<{ name?: string; content?: string }>();
  const [editForm] = Form.useForm<{ name?: string; content?: string }>();

  const load = useCallback(async () => {
    try {
      setItems(await fetchInsights());
    } catch (error) {
      console.error(error);
      message.error('加载 insight 列表失败');
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void load();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  const openInsight = async (id: string) => {
    const detail = await fetchInsight(id);
    setSelected(detail);
    editForm.setFieldsValue({
      name: detail.name ?? undefined,
      content: detail.content,
    });
  };

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      render: (value: string | null) => value || 'Untitled Insight',
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (value: string) => new Date(value).toLocaleString(),
    },
    {
      title: '操作',
      key: 'actions',
      render: (_: unknown, record: ResourceItem) => (
        <Space>
          <Button onClick={() => void openInsight(record.id)}>编辑</Button>
          <Popconfirm
            title="删除 insight"
            onConfirm={() => deleteInsight(record.id).then(load)}
          >
            <Button danger>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Space
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <Typography.Title level={2} style={{ margin: 0 }}>
          Insights
        </Typography.Title>
        <Button type="primary" onClick={() => setCreateOpen(true)}>
          新建 Insight
        </Button>
      </Space>
      <Table rowKey="id" dataSource={items} columns={columns} />
      <Modal
        open={createOpen}
        title="新建 Insight"
        onOk={async () => {
          const values = await createForm.validateFields();
          await createInsight({
            name: values.name || 'Untitled Insight',
            content: values.content,
          });
          createForm.resetFields();
          setCreateOpen(false);
          await load();
        }}
        onCancel={() => setCreateOpen(false)}
      >
        <Form form={createForm} layout="vertical">
          <Form.Item name="name" label="标题">
            <Input />
          </Form.Item>
          <Form.Item name="content" label="正文">
            <Input.TextArea rows={6} />
          </Form.Item>
        </Form>
      </Modal>
      <Drawer
        width={560}
        open={!!selected}
        title={selected?.name || 'Insight Editor'}
        onClose={() => setSelected(null)}
        extra={
          <Button
            type="primary"
            onClick={async () => {
              if (!selected) return;
              const values = await editForm.validateFields();
              await updateInsight(selected.id, {
                name: values.name,
                content: values.content,
              });
              await load();
            }}
          >
            保存
          </Button>
        }
      >
        <Form form={editForm} layout="vertical">
          <Form.Item name="name" label="标题">
            <Input />
          </Form.Item>
          <Form.Item name="content" label="正文">
            <Input.TextArea rows={10} />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};
