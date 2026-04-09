import { useEffect } from 'react';
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
import { useNavigationStore } from '../stores/navigation.store';
import { useReportsStore } from '../stores/reports.store';
import type { ResourceItem } from '../types';

const { Title } = Typography;

export const ReportsPage = () => {
  const createName = useReportsStore((state) => state.createName);
  const editing = useReportsStore((state) => state.editing);
  const isCreateOpen = useReportsStore((state) => state.isCreateOpen);
  const items = useReportsStore((state) => state.items);
  const loading = useReportsStore((state) => state.loading);
  const renameValue = useReportsStore((state) => state.renameValue);
  const closeCreate = useReportsStore((state) => state.closeCreate);
  const confirmRename = useReportsStore((state) => state.confirmRename);
  const create = useReportsStore((state) => state.create);
  const load = useReportsStore((state) => state.load);
  const openCreate = useReportsStore((state) => state.openCreate);
  const openReport = useReportsStore((state) => state.openReport);
  const remove = useReportsStore((state) => state.remove);
  const setCreateName = useReportsStore((state) => state.setCreateName);
  const setRenameValue = useReportsStore((state) => state.setRenameValue);
  const startRename = useReportsStore((state) => state.startRename);
  const stopRename = useReportsStore((state) => state.stopRename);
  const go = useNavigationStore((state) => state.go);

  useEffect(() => {
    void load();
  }, [load]);

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
          <Button type="primary" onClick={() => openReport(record.id)}>
            打开
          </Button>
          <Button
            onClick={() => {
              startRename(record);
            }}
          >
            重命名
          </Button>
          <Popconfirm
            title="删除报告"
            onConfirm={async () => remove(record.id)}
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
          <Button onClick={() => go('/manage/charts')}>管理资源</Button>
          <Button type="primary" onClick={openCreate}>
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
        onOk={async () => {
          if (!createName.trim()) {
            message.warning('请输入报告名称');
            return;
          }
          await create();
        }}
        onCancel={closeCreate}
      >
        <Input
          value={createName}
          onChange={(event) => setCreateName(event.target.value)}
        />
      </Modal>
      <Modal
        open={!!editing}
        title="重命名报告"
        onOk={confirmRename}
        onCancel={stopRename}
      >
        <Input
          value={renameValue}
          onChange={(event) => setRenameValue(event.target.value)}
        />
      </Modal>
    </div>
  );
};
