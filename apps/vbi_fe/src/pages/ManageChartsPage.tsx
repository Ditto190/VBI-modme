import { APP as StandardAPP } from 'standard';
import {
  Button,
  Drawer,
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
  createChart,
  deleteChart,
  fetchCharts,
  updateChart,
} from '../services/chartApi';
import type { ResourceItem } from '../services/types';
import { getSessionUserName } from '../utils/collaboration';
import { useCollaborativeBuilder } from '../hooks/useCollaborativeBuilder';

const userName = getSessionUserName();

export const ManageChartsPage = () => {
  const [items, setItems] = useState<ResourceItem[]>([]);
  const [selected, setSelected] = useState<ResourceItem | null>(null);
  const [createName, setCreateName] = useState('');
  const [editingName, setEditingName] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const { builder } = useCollaborativeBuilder(
    'chart',
    selected?.id || '',
    userName,
  );

  const load = useCallback(async () => {
    try {
      setItems(await fetchCharts());
    } catch (error) {
      console.error(error);
      message.error('加载 chart 列表失败');
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void load();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      render: (value: string | null) => value || 'Untitled Chart',
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
          <Button
            onClick={() => {
              setSelected(record);
              setEditingName(record.name || '');
            }}
          >
            编辑
          </Button>
          <Popconfirm
            title="删除 chart"
            onConfirm={() => deleteChart(record.id).then(load)}
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
          Charts
        </Typography.Title>
        <Button type="primary" onClick={() => setCreateOpen(true)}>
          新建 Chart
        </Button>
      </Space>
      <Table rowKey="id" dataSource={items} columns={columns} />
      <Modal
        open={createOpen}
        title="新建 Chart"
        onOk={async () => {
          await createChart(createName || 'Untitled Chart');
          setCreateName('');
          setCreateOpen(false);
          await load();
        }}
        onCancel={() => setCreateOpen(false)}
      >
        <Input
          value={createName}
          onChange={(event) => setCreateName(event.target.value)}
        />
      </Modal>
      <Drawer
        width="88vw"
        open={!!selected}
        title={selected?.name || 'Chart Editor'}
        onClose={() => setSelected(null)}
        extra={
          <Button
            type="primary"
            onClick={async () => {
              if (!selected) return;
              await updateChart(
                selected.id,
                editingName || selected.name || 'Untitled Chart',
              );
              await load();
              setSelected({ ...selected, name: editingName || selected.name });
            }}
          >
            保存名称
          </Button>
        }
      >
        <Input
          style={{ marginBottom: 16 }}
          value={editingName}
          onChange={(event) => setEditingName(event.target.value)}
          placeholder="Chart Name"
        />
        {builder ? (
          <StandardAPP builder={builder} mode="edit" />
        ) : (
          <Typography.Text>连接图表中...</Typography.Text>
        )}
      </Drawer>
    </div>
  );
};
