import { useShallow } from 'zustand/shallow';
import { useTranslation } from '../i18n';
import { useUserStoreLifecycle } from '../hooks/useStoreLifecycle';
import { useInsightBuilderModel } from '../models';
import {
  selectManageInsightsPageState,
  useManageInsightsStore,
} from '../stores/manage-insights.store';
import { ManageResourcePageShell } from './manage-resource/ManageResourcePageShell';
import { useResourceColumns } from './manage-resource/resource-columns';
import { InsightResourceModals } from './manage-resource/InsightResourceModals';

export const ManageInsightsPage = () => {
  const { locale, t } = useTranslation();
  const state = useManageInsightsStore(
    useShallow(selectManageInsightsPageState),
  );
  const {
    bootstrap: bootstrapStore,
    clearSelection,
    closeCreate,
    closeDetail,
    create,
    createContent,
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
    setCreateContent,
    setCreateName,
    setEditorName,
    setSearchText,
    setSelectedRowKeys,
  } = state;
  const insightSession = useInsightBuilderModel(
    (store) => store.sessions[selectedId],
  );
  const insightContent = insightSession?.builder?.build().content ?? '';
  useUserStoreLifecycle(bootstrapStore, dispose);
  const columns = useResourceColumns({
    deleteTitle: t('insights.deleteTitle'),
    fallbackName: t('insights.untitled'),
    locale,
    onEdit: openDetail,
    onRemove: deleteOne,
    t,
  });

  return (
    <ManageResourcePageShell
      columns={columns}
      createLabel={t('insights.create')}
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
      title={t('insights.title')}
    >
      <InsightResourceModals
        closeCreate={closeCreate}
        closeDetail={closeDetail}
        create={create}
        createContent={createContent}
        createName={createName}
        createOpen={createOpen}
        editorName={editorName}
        insightContent={insightContent}
        insightSession={insightSession}
        renameSelected={renameSelected}
        selectedId={selectedId}
        setCreateContent={setCreateContent}
        setCreateName={setCreateName}
        setEditorName={setEditorName}
        t={t}
      />
    </ManageResourcePageShell>
  );
};
