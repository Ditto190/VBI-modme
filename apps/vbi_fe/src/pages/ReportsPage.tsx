import { useEffect } from 'react';
import { useTranslation } from '../i18n';
import { useReportsStore } from '../stores/reports.store';
import { ManageResourcePageShell } from './manage-resource/ManageResourcePageShell';
import { createResourceColumns } from './manage-resource/resource-columns';
import { matchesResourceSearch } from '../utils/resource-list';
import { ReportResourceModals } from './reports/ReportResourceModals';

export const ReportsPage = () => {
  const { locale, t } = useTranslation();
  const createName = useReportsStore((state) => state.createName);
  const editing = useReportsStore((state) => state.editing);
  const isCreateOpen = useReportsStore((state) => state.isCreateOpen);
  const items = useReportsStore((state) => state.items);
  const loading = useReportsStore((state) => state.loading);
  const renameValue = useReportsStore((state) => state.renameValue);
  const searchText = useReportsStore((state) => state.searchText);
  const selectedRowKeys = useReportsStore((state) => state.selectedRowKeys);
  const clearSelection = useReportsStore((state) => state.clearSelection);
  const closeCreate = useReportsStore((state) => state.closeCreate);
  const confirmRename = useReportsStore((state) => state.confirmRename);
  const create = useReportsStore((state) => state.create);
  const deleteSelected = useReportsStore((state) => state.deleteSelected);
  const load = useReportsStore((state) => state.load);
  const openCreate = useReportsStore((state) => state.openCreate);
  const openReport = useReportsStore((state) => state.openReport);
  const remove = useReportsStore((state) => state.remove);
  const selectAllFiltered = useReportsStore((state) => state.selectAllFiltered);
  const setCreateName = useReportsStore((state) => state.setCreateName);
  const setRenameValue = useReportsStore((state) => state.setRenameValue);
  const setSearchText = useReportsStore((state) => state.setSearchText);
  const setSelectedRowKeys = useReportsStore(
    (state) => state.setSelectedRowKeys,
  );
  const startRename = useReportsStore((state) => state.startRename);
  const stopRename = useReportsStore((state) => state.stopRename);
  const filteredItems = items.filter((item) =>
    matchesResourceSearch(item, searchText),
  );

  useEffect(() => {
    void load();
  }, [load]);

  const columns = createResourceColumns({
    deleteTitle: t('reports.deleteTitle'),
    fallbackName: t('reports.untitled'),
    locale,
    onOpen: openReport,
    onRemove: remove,
    onRename: startRename,
    t,
  });

  return (
    <ManageResourcePageShell
      columns={columns}
      createLabel={t('reports.create')}
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
      rowSelection={{
        selectedRowKeys,
        onChange: (keys) => setSelectedRowKeys(keys.map(String)),
      }}
      searchText={searchText}
      selectedRowKeys={selectedRowKeys}
      title={t('reports.title')}
    >
      <ReportResourceModals
        createName={createName}
        editing={editing}
        isCreateOpen={isCreateOpen}
        renameValue={renameValue}
        onCloseCreate={closeCreate}
        onConfirmCreate={create}
        onConfirmRename={confirmRename}
        onCreateNameChange={setCreateName}
        onRenameCancel={stopRename}
        onRenameValueChange={setRenameValue}
      />
    </ManageResourcePageShell>
  );
};
