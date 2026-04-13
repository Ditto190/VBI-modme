import { APP as StandardAPP } from 'standard';
import {
  Button,
  Drawer,
  Input,
  Modal,
  message,
  Popconfirm,
  Space,
  Typography,
} from 'antd';
import { useEffect } from 'react';
import type { Key } from 'react';
import { useChartBuilderModel } from '../models';
import type { ResourceItem } from '../types';
import { getSessionUserName } from '../utils/collaboration';
import { ManageResourcePageShell } from './manage-resource/ManageResourcePageShell';
import { useManageChartsStore } from '../stores/manage-charts.store';
import { matchesResourceSearch } from './manage-resource/state';

const userName = getSessionUserName();

export const ManageChartsPage = () => {
  const createName = useManageChartsStore((state) => state.createName);
  const createOpen = useManageChartsStore((state) => state.createOpen);
  const editorName = useManageChartsStore((state) => state.editorName);
  const items = useManageChartsStore((state) => state.items);
  const searchText = useManageChartsStore((state) => state.searchText);
  const selectedId = useManageChartsStore((state) => state.selectedId);
  const selectedRowKeys = useManageChartsStore(
    (state) => state.selectedRowKeys,
  );
  const bootstrap = useManageChartsStore((state) => state.bootstrap);
  const clearSelection = useManageChartsStore((state) => state.clearSelection);
  const closeCreate = useManageChartsStore((state) => state.closeCreate);
  const closeDetail = useManageChartsStore((state) => state.closeDetail);
  const create = useManageChartsStore((state) => state.create);
  const deleteOne = useManageChartsStore((state) => state.deleteOne);
  const deleteSelected = useManageChartsStore((state) => state.deleteSelected);
  const dispose = useManageChartsStore((state) => state.dispose);
  const openCreate = useManageChartsStore((state) => state.openCreate);
  const openDetail = useManageChartsStore((state) => state.openDetail);
  const renameSelected = useManageChartsStore((state) => state.renameSelected);
  const selectAllFiltered = useManageChartsStore(
    (state) => state.selectAllFiltered,
  );
  const setCreateName = useManageChartsStore((state) => state.setCreateName);
  const setEditorName = useManageChartsStore((state) => state.setEditorName);
  const setSearchText = useManageChartsStore((state) => state.setSearchText);
  const setSelectedRowKeys = useManageChartsStore(
    (state) => state.setSelectedRowKeys,
  );
  const builder = useChartBuilderModel(
    (state) => state.sessions[selectedId]?.builder ?? null,
  );
  const filteredItems = items.filter((item) =>
    matchesResourceSearch(item, searchText),
  );

  useEffect(() => {
    void bootstrap(userName);
    return () => {
      void dispose();
    };
  }, [bootstrap, dispose]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: Key[]) => setSelectedRowKeys(keys.map(String)),
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
          <Button onClick={() => void openDetail(record.id)}>编辑</Button>
          <Popconfirm
            title="删除 chart"
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
      createLabel="新建 Chart"
      dataSource={filteredItems}
      onBatchDelete={async () => {
        if (!selectedRowKeys.length) return;
        await deleteSelected();
      }}
      onClearSelection={clearSelection}
      onCreate={openCreate}
      onSearchTextChange={setSearchText}
      onSelectAllFiltered={selectAllFiltered}
      rowSelection={rowSelection}
      searchText={searchText}
      selectedRowKeys={selectedRowKeys}
      title="Charts"
    >
      <Modal
        open={createOpen}
        title="新建 Chart"
        onOk={async () => {
          if (!createName.trim()) {
            message.warning('请输入图表名称');
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
      <Drawer
        style={{ width: '88vw' }}
        open={!!selectedId}
        title={editorName || 'Chart Editor'}
        onClose={() => void closeDetail()}
      >
        <Input
          style={{ marginBottom: 16 }}
          value={editorName}
          onChange={(event) => setEditorName(event.target.value)}
          placeholder="Chart Name"
          onBlur={() => void renameSelected()}
          onPressEnter={() => void renameSelected()}
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
