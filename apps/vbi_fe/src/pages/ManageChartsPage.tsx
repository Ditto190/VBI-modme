import { APP as StandardAPP } from 'standard';
import { Drawer, Input, Modal, message, Typography } from 'antd';
import { useEffect } from 'react';
import type { Key } from 'react';
import { useTranslation } from '../i18n';
import { useStandardAppProps } from '../hooks/useStandardAppProps';
import { useChartBuilderModel } from '../models';
import { getSessionUserName } from '../utils/collaboration';
import { ManageResourcePageShell } from './manage-resource/ManageResourcePageShell';
import { useManageChartsStore } from '../stores/manage-charts.store';
import { matchesResourceSearch } from '../utils/resource-list';
import { createResourceColumns } from './manage-resource/resource-columns';

const userName = getSessionUserName();
const chartEditorDrawerWidth = 'min(1440px, 92vw)';

export const ManageChartsPage = () => {
  const { locale, t } = useTranslation();
  const standardAppProps = useStandardAppProps();
  const createName = useManageChartsStore((state) => state.createName);
  const createOpen = useManageChartsStore((state) => state.createOpen);
  const editorName = useManageChartsStore((state) => state.editorName);
  const items = useManageChartsStore((state) => state.items);
  const loading = useManageChartsStore((state) => state.loading);
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

  const columns = createResourceColumns({
    deleteTitle: t('charts.deleteTitle'),
    fallbackName: t('charts.untitled'),
    locale,
    onEdit: openDetail,
    onRemove: deleteOne,
    t,
  });

  return (
    <ManageResourcePageShell
      columns={columns}
      createLabel={t('charts.create')}
      dataSource={filteredItems}
      loading={loading}
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
      title={t('charts.title')}
    >
      <Modal
        open={createOpen}
        title={t('charts.createTitle')}
        onOk={async () => {
          if (!createName.trim()) {
            message.warning(t('charts.nameRequired'));
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
        width={chartEditorDrawerWidth}
        open={!!selectedId}
        title={editorName || t('charts.editorTitle')}
        onClose={() => void closeDetail()}
      >
        <Input
          style={{ marginBottom: 16 }}
          value={editorName}
          onChange={(event) => setEditorName(event.target.value)}
          placeholder={t('charts.namePlaceholder')}
          onBlur={() => void renameSelected()}
          onPressEnter={() => void renameSelected()}
        />
        {builder ? (
          <StandardAPP builder={builder} mode="edit" {...standardAppProps} />
        ) : (
          <Typography.Text>{t('charts.connecting')}</Typography.Text>
        )}
      </Drawer>
    </ManageResourcePageShell>
  );
};
