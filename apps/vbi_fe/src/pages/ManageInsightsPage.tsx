import { Button, Drawer, Form, Input, Modal, Popconfirm, Space } from 'antd';
import type { Key } from 'react';
import { useCallback, useState } from 'react';
import { useBuilderSnapshot } from '../hooks/useBuilderSnapshot';
import { useResourceBuilder } from '../hooks/useResourceBuilder';
import {
  createInsight,
  deleteInsight,
  fetchInsight,
  fetchInsights,
  updateInsight,
} from '../services/insightApi';
import type { InsightRecord, ResourceItem } from '../types';
import { getSessionUserName } from '../utils/collaboration';
import { ManageResourcePageShell } from './manage-resource/ManageResourcePageShell';
import {
  confirmBatchDelete,
  deleteResources,
  useResourceList,
} from './manage-resource/state';

const userName = getSessionUserName();

export const ManageInsightsPage = () => {
  const [selected, setSelected] = useState<InsightRecord | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [editingName, setEditingName] = useState('');
  const [createForm] = Form.useForm<{ name?: string; content?: string }>();
  const { builder: insightBuilder } = useResourceBuilder(
    'insight',
    selected?.id || '',
    userName,
  );
  const insightContent = useBuilderSnapshot(
    insightBuilder,
    (builder) => builder.build().content ?? '',
    selected?.content ?? '',
  );
  const {
    filteredItems,
    reload,
    searchText,
    selectedRowKeys,
    setSearchText,
    setSelectedRowKeys,
  } = useResourceList(fetchInsights);

  const openInsight = async (id: string) => {
    try {
      const detail = await fetchInsight(id);
      setSelected(detail);
      setEditingName(detail.name ?? '');
    } catch (error) {
      console.error(error);
    }
  };

  const saveSelectedName = useCallback(async () => {
    if (!selected) return;
    const nextName = editingName.trim() || selected.name || 'Untitled Insight';
    try {
      await updateInsight(selected.id, {
        name: nextName,
      });
      await reload();
      setSelected({ ...selected, name: nextName });
    } catch (error) {
      console.error(error);
    }
  }, [editingName, reload, selected]);

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
            onConfirm={async () => {
              try {
                await deleteResources({
                  deleteOne: deleteInsight,
                  ids: [record.id],
                  onSuccess: () => {
                    if (selected?.id === record.id) {
                      setSelected(null);
                    }
                  },
                  reload,
                  resourceLabel: 'insight',
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
      createLabel="新建 Insight"
      dataSource={filteredItems}
      onBatchDelete={() =>
        confirmBatchDelete({
          deleteOne: deleteInsight,
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
          resourceLabel: 'insight',
          title: '批量删除 insight',
        })
      }
      onClearSelection={() => setSelectedRowKeys([])}
      onCreate={() => setCreateOpen(true)}
      onSearchTextChange={setSearchText}
      onSelectAllFiltered={() =>
        setSelectedRowKeys(filteredItems.map((item) => item.id))
      }
      rowSelection={{
        selectedRowKeys,
        onChange: (keys: Key[]) => setSelectedRowKeys(keys),
      }}
      searchText={searchText}
      selectedRowKeys={selectedRowKeys}
      title="Insights"
    >
      <Modal
        open={createOpen}
        title="新建 Insight"
        onOk={async () => {
          try {
            const values = await createForm.validateFields();
            await createInsight({
              name: values.name || 'Untitled Insight',
              content: values.content,
            });
            createForm.resetFields();
            setCreateOpen(false);
            await reload();
          } catch (error) {
            console.error(error);
            throw error;
          }
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
        size={560}
        open={!!selected}
        title={selected?.name || 'Insight Editor'}
        onClose={() => setSelected(null)}
        extra={<Button onClick={() => setSelected(null)}>关闭</Button>}
      >
        <Space orientation="vertical" style={{ width: '100%' }} size={12}>
          <Input
            value={editingName}
            placeholder="标题"
            onChange={(event) => setEditingName(event.target.value)}
            onBlur={() => void saveSelectedName()}
            onPressEnter={() => void saveSelectedName()}
          />
          <Input.TextArea
            autoSize={{ minRows: 10, maxRows: 20 }}
            value={insightContent}
            placeholder="输入正文，内容会实时同步"
            onChange={(event) => {
              insightBuilder?.setContent(event.target.value);
            }}
          />
        </Space>
      </Drawer>
    </ManageResourcePageShell>
  );
};
