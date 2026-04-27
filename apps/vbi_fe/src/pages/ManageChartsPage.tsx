import { useShallow } from 'zustand/shallow';
import { useTranslation } from '../i18n';
import { useStandardAppProps } from '../hooks/useStandardAppProps';
import { useUserStoreLifecycle } from '../hooks/useStoreLifecycle';
import { useChartBuilderModel } from '../models';
import { ManageResourcePageShell } from './manage-resource/ManageResourcePageShell';
import {
  selectManageChartsPageState,
  useManageChartsStore,
} from '../stores/manage-charts.store';
import { useResourceColumns } from './manage-resource/resource-columns';
import { ChartResourceModals } from './manage-resource/ChartResourceModals';

export const ManageChartsPage = () => {
  const { locale, t } = useTranslation();
  const standardAppProps = useStandardAppProps();
  const state = useManageChartsStore(useShallow(selectManageChartsPageState));
  const {
    bootstrap: bootstrapStore,
    clearSelection,
    closeCreate,
    closeDetail,
    create,
    createName,
    createOpen,
    deleteOne,
    deleteSelected,
    dispose,
    editorName,
    filteredItems,
    loading,
    openCreate,
    openDetail,
    renameSelected,
    searchText,
    selectAllFiltered,
    selectedId,
    selectedRowKeys,
    setCreateName,
    setEditorName,
    setSearchText,
    setSelectedRowKeys,
  } = state;
  const builder = useChartBuilderModel(
    (store) => store.sessions[selectedId]?.builder ?? null,
  );
  useUserStoreLifecycle(bootstrapStore, dispose);
  const columns = useResourceColumns({
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
      onClearSelection={clearSelection}
      onCreate={openCreate}
      onDeleteSelected={deleteSelected}
      onSearchTextChange={setSearchText}
      onSelectAllFiltered={selectAllFiltered}
      searchText={searchText}
      selectedRowKeys={selectedRowKeys}
      setSelectedRowKeys={setSelectedRowKeys}
      title={t('charts.title')}
    >
      <ChartResourceModals
        builder={builder}
        closeCreate={closeCreate}
        closeDetail={closeDetail}
        create={create}
        createName={createName}
        createOpen={createOpen}
        editorName={editorName}
        renameSelected={renameSelected}
        selectedId={selectedId}
        setCreateName={setCreateName}
        setEditorName={setEditorName}
        standardAppProps={standardAppProps}
        t={t}
      />
    </ManageResourcePageShell>
  );
};
