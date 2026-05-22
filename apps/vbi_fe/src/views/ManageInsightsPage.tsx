'use client'

import { useShallow } from 'zustand/shallow'
import { useTranslation } from '../i18n'
import { useUserStoreLifecycle } from '../hooks/useStoreLifecycle'
import { selectManageInsightsPageState, useManageInsightsStore } from '../stores/manage-insights.store'
import { ManageResourcePageShell } from './manage-resource/ManageResourcePageShell'
import { useResourceColumns } from './manage-resource/resource-columns'
import { InsightResourceModals } from './manage-resource/InsightResourceModals'

export const ManageInsightsPage = () => {
  const { locale, t } = useTranslation()
  const state = useManageInsightsStore(useShallow(selectManageInsightsPageState))
  const {
    bootstrap: bootstrapStore,
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
    selectedId,
    selectedRowKeys,
    setCreateContent,
    setCreateName,
    setEditorName,
    setSearchText,
    setSelectedRowKeys,
  } = state
  useUserStoreLifecycle(bootstrapStore, dispose)
  const columns = useResourceColumns({
    deleteTitle: t('insights.deleteTitle'),
    fallbackName: t('insights.untitled'),
    locale,
    onEdit: openDetail,
    onRemove: deleteOne,
    t,
  })

  return (
    <ManageResourcePageShell
      columns={columns}
      createLabel={t('insights.create')}
      dataSource={filteredItems}
      loading={loading}
      onCreate={openCreate}
      onDeleteSelected={deleteSelected}
      onSearchTextChange={setSearchText}
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
        renameSelected={renameSelected}
        selectedId={selectedId}
        setCreateContent={setCreateContent}
        setCreateName={setCreateName}
        setEditorName={setEditorName}
        t={t}
      />
    </ManageResourcePageShell>
  )
}
