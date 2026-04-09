import { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
  Typography,
  message,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  createResource,
  listResources,
  removeResource,
  renameResource,
} from '../services/resourceApi';
import type { ResourceItem } from '../types';

const { Title } = Typography;

export const ReportsPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [createName, setCreateName] = useState('');
  const [editing, setEditing] = useState<ResourceItem | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [renameValue, setRenameValue] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await listResources('report'));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const handleCreate = async () => {
    if (!createName.trim()) {
      message.warning('请输入报告名称');
      return;
    }
    try {
      const report = await createResource('report', createName.trim());
      setIsCreateOpen(false);
      setCreateName('');
      await load();
      navigate(`/reports/${report.id}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleRename = async () => {
    if (!editing) return;
    try {
      await renameResource(
        'report',
        editing.id,
        renameValue.trim() || editing.name || 'Untitled Report',
      );
      setEditing(null);
      setRenameValue('');
      await load();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      render: (value: string | null) => value || 'Untitled Report',
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
            type="primary"
            onClick={() => navigate(`/reports/${record.id}`)}
          >
            打开
          </Button>
          <Button
            onClick={() => {
              setEditing(record);
              setRenameValue(record.name || '');
            }}
          >
            重命名
          </Button>
          <Popconfirm
            title="删除报告"
            onConfirm={async () => {
              try {
                await removeResource('report', record.id);
                await load();
              } catch (error) {
                console.error(error);
              }
            }}
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
        <Title level={2} style={{ margin: 0 }}>
          Reports
        </Title>
        <Space>
          <Button onClick={() => navigate('/manage/charts')}>管理资源</Button>
          <Button type="primary" onClick={() => setIsCreateOpen(true)}>
            新建报告
          </Button>
        </Space>
      </Space>
      <Table
        rowKey="id"
        loading={loading}
        dataSource={items}
        columns={columns}
      />
      <Modal
        open={isCreateOpen}
        title="新建报告"
        onOk={handleCreate}
        onCancel={() => setIsCreateOpen(false)}
      >
        <Input
          value={createName}
          onChange={(event) => setCreateName(event.target.value)}
        />
      </Modal>
      <Modal
        open={!!editing}
        title="重命名报告"
        onOk={handleRename}
        onCancel={() => setEditing(null)}
      >
        <Input
          value={renameValue}
          onChange={(event) => setRenameValue(event.target.value)}
        />
      </Modal>
    </div>
  );
};
