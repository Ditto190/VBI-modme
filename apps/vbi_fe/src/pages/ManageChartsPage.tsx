import { APP as StandardAPP } from 'standard';
import {
  Button,
  Drawer,
  Input,
  Modal,
  Popconfirm,
  Space,
  Typography,
} from 'antd';
import type { Key } from 'react';
import { useCallback, useState } from 'react';
import { useResourceBuilder } from '../hooks/useResourceBuilder';
import type { ResourceItem } from '../types';
import { getSessionUserName } from '../utils/collaboration';
import { ManageResourcePageShell } from './manage-resource/ManageResourcePageShell';
import {
  createResource,
  listResources,
  removeResource,
  renameResource,
} from '../services/resourceApi';
import {
  confirmBatchDelete,
  deleteResources,
  useResourceList,
} from './manage-resource/state';

const userName = getSessionUserName();

export const ManageChartsPage = () => {
  const [selected, setSelected] = useState<ResourceItem | null>(null);
  const [createName, setCreateName] = useState('');
  const [editingName, setEditingName] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const { builder } = useResourceBuilder('chart', selected?.id || '', userName);
  const {
    filteredItems,
    reload,
    searchText,
    selectedRowKeys,
    setSearchText,
    setSelectedRowKeys,
  } = useResourceList(() => listResources('chart'));

  const saveSelectedName = useCallback(async () => {
    if (!selected) return;
    const nextName = editingName.trim() || selected.name || 'Untitled Chart';
    try {
      await renameResource('chart', selected.id, nextName);
      await reload();
      setSelected({ ...selected, name: nextName });
    } catch (error) {
      console.error(error);
    }
  }, [editingName, reload, selected]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: Key[]) => setSelectedRowKeys(keys),
  };

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
            onConfirm={async () => {
              try {
                await deleteResources({
                  deleteOne: (id) => removeResource('chart', id),
                  ids: [record.id],
                  onSuccess: () => {
                    if (selected?.id === record.id) {
                      setSelected(null);
                    }
                  },
                  reload,
                  resourceLabel: 'chart',
                });
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
    <ManageResourcePageShell
      columns={columns}
      createLabel="新建 Chart"
      dataSource={filteredItems}
      onBatchDelete={() =>
        confirmBatchDelete({
          deleteOne: (id) => removeResource('chart', id),
          ids: selectedRowKeys.map(String),
          onSuccess: (deletedIds) => {
            setSelectedRowKeys((keys) =>
              keys.filter((key) => !deletedIds.includes(String(key))),
            );
            if (selected && deletedIds.includes(selected.id)) {
              setSelected(null);
            }
          },
          reload,
          resourceLabel: 'chart',
          title: '批量删除 chart',
        })
      }
      onClearSelection={() => setSelectedRowKeys([])}
      onCreate={() => setCreateOpen(true)}
      onSearchTextChange={setSearchText}
      onSelectAllFiltered={() =>
        setSelectedRowKeys(filteredItems.map((item) => item.id))
      }
      rowSelection={rowSelection}
      searchText={searchText}
      selectedRowKeys={selectedRowKeys}
      title="Charts"
    >
      <Modal
        open={createOpen}
        title="新建 Chart"
        onOk={async () => {
          try {
            await createResource('chart', createName || 'Untitled Chart');
            setCreateName('');
            setCreateOpen(false);
            await reload();
          } catch (error) {
            console.error(error);
            throw error;
          }
        }}
        onCancel={() => setCreateOpen(false)}
      >
        <Input
          value={createName}
          onChange={(event) => setCreateName(event.target.value)}
        />
      </Modal>
      <Drawer
        style={{ width: '88vw' }}
        open={!!selected}
        title={selected?.name || 'Chart Editor'}
        onClose={() => setSelected(null)}
      >
        <Input
          style={{ marginBottom: 16 }}
          value={editingName}
          onChange={(event) => setEditingName(event.target.value)}
          placeholder="Chart Name"
          onBlur={() => void saveSelectedName()}
          onPressEnter={() => void saveSelectedName()}
        />
        {builder ? (
          <StandardAPP builder={builder} mode="edit" />
        ) : (
          <Typography.Text>连接图表中...</Typography.Text>
        )}
      </Drawer>
    </ManageResourcePageShell>
  );
};
