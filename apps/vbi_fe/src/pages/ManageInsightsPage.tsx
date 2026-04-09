import { Button, Drawer, Input, Modal, Popconfirm, Space, message } from 'antd';
import { useEffect } from 'react';
import { useInsightBuilderModel } from '../models';
import { useManageInsightsStore } from '../stores/manage-insights.store';
import { ManageResourcePageShell } from './manage-resource/ManageResourcePageShell';
import { matchesResourceSearch } from './manage-resource/state';
import type { ResourceItem } from '../types';
import { getSessionUserName } from '../utils/collaboration';

const userName = getSessionUserName();

export const ManageInsightsPage = () => {
  const createContent = useManageInsightsStore((state) => state.createContent);
  const createName = useManageInsightsStore((state) => state.createName);
  const createOpen = useManageInsightsStore((state) => state.createOpen);
  const editorName = useManageInsightsStore((state) => state.editorName);
  const items = useManageInsightsStore((state) => state.items);
  const searchText = useManageInsightsStore((state) => state.searchText);
  const selectedId = useManageInsightsStore((state) => state.selectedId);
  const selectedRowKeys = useManageInsightsStore(
    (state) => state.selectedRowKeys,
  );
  const bootstrap = useManageInsightsStore((state) => state.bootstrap);
  const clearSelection = useManageInsightsStore(
    (state) => state.clearSelection,
  );
  const closeCreate = useManageInsightsStore((state) => state.closeCreate);
  const closeDetail = useManageInsightsStore((state) => state.closeDetail);
  const create = useManageInsightsStore((state) => state.create);
  const deleteOne = useManageInsightsStore((state) => state.deleteOne);
  const deleteSelected = useManageInsightsStore(
    (state) => state.deleteSelected,
  );
  const dispose = useManageInsightsStore((state) => state.dispose);
  const openCreate = useManageInsightsStore((state) => state.openCreate);
  const openDetail = useManageInsightsStore((state) => state.openDetail);
  const renameSelected = useManageInsightsStore(
    (state) => state.renameSelected,
  );
  const selectAllFiltered = useManageInsightsStore(
    (state) => state.selectAllFiltered,
  );
  const setCreateContent = useManageInsightsStore(
    (state) => state.setCreateContent,
  );
  const setCreateName = useManageInsightsStore((state) => state.setCreateName);
  const setEditorName = useManageInsightsStore((state) => state.setEditorName);
  const setSearchText = useManageInsightsStore((state) => state.setSearchText);
  const setSelectedRowKeys = useManageInsightsStore(
    (state) => state.setSelectedRowKeys,
  );
  const insightSession = useInsightBuilderModel(
    (state) => state.sessions[selectedId],
  );
  const insightContent = insightSession?.builder?.build().content ?? '';
  const filteredItems = items.filter((item) =>
    matchesResourceSearch(item, searchText),
  );

  useEffect(() => {
    void bootstrap(userName);
    return () => {
      void dispose();
    };
  }, [bootstrap, dispose]);

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
          <Button onClick={() => void openDetail(record.id)}>编辑</Button>
          <Popconfirm
            title="删除 insight"
            onConfirm={async () => deleteOne(record.id)}
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
      onBatchDelete={async () => {
        if (!selectedRowKeys.length) return;
        await deleteSelected();
      }}
      onClearSelection={clearSelection}
      onCreate={openCreate}
      onSearchTextChange={setSearchText}
      onSelectAllFiltered={selectAllFiltered}
      rowSelection={{
        selectedRowKeys,
        onChange: (keys) => setSelectedRowKeys(keys.map(String)),
      }}
      searchText={searchText}
      selectedRowKeys={selectedRowKeys}
      title="Insights"
    >
      <Modal
        open={createOpen}
        title="新建 Insight"
        onOk={async () => {
          if (!createName.trim()) {
            message.warning('请输入 Insight 标题');
            return;
          }
          await create();
        }}
        onCancel={closeCreate}
      >
        <Space direction="vertical" style={{ width: '100%' }} size={12}>
          <Input
            value={createName}
            placeholder="标题"
            onChange={(event) => setCreateName(event.target.value)}
          />
          <Input.TextArea
            rows={6}
            value={createContent}
            placeholder="正文"
            onChange={(event) => setCreateContent(event.target.value)}
          />
        </Space>
      </Modal>
      <Drawer
        size={560}
        open={!!selectedId}
        title={editorName || 'Insight Editor'}
        onClose={() => void closeDetail()}
        extra={<Button onClick={() => void closeDetail()}>关闭</Button>}
      >
        <Space direction="vertical" style={{ width: '100%' }} size={12}>
          <Input
            value={editorName}
            placeholder="标题"
            onChange={(event) => setEditorName(event.target.value)}
            onBlur={() => void renameSelected()}
            onPressEnter={() => void renameSelected()}
          />
          <Input.TextArea
            autoSize={{ minRows: 10, maxRows: 20 }}
            value={insightContent}
            placeholder="输入正文，内容会实时同步"
            onChange={(event) => {
              insightSession?.builder?.setContent(event.target.value);
            }}
          />
        </Space>
      </Drawer>
    </ManageResourcePageShell>
  );
};
