'use client'

import { useShallow } from 'zustand/shallow'
import { useTranslation } from '../i18n'
import { useUserStoreLifecycle } from '../hooks/useStoreLifecycle'
import { selectManageInsightsPageState, useManageInsightsStore } from '../stores/manage-insights.store'
import { InsightResourceModals } from './manage-resource/InsightResourceModals'
import { ResourceManagementPage } from './manage-resource/ResourceManagementPage'

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
  return (
    <ResourceManagementPage
      createLabel={t('insights.create')}
      deleteTitle={t('insights.deleteTitle')}
      fallbackName={t('insights.untitled')}
      locale={locale}
      state={{
        deleteSelected,
        filteredItems,
        loading,
        openCreate,
        openDetail,
        searchText,
        selectedRowKeys,
        setSearchText,
        setSelectedRowKeys,
      }}
      title={t('insights.title')}
      t={t}
      onRemove={deleteOne}
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
    </ResourceManagementPage>
  )
}
