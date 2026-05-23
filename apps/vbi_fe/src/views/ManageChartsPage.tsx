'use client'

import { useShallow } from 'zustand/shallow'
import { useTranslation } from '../i18n'
import { useUserStoreLifecycle } from '../hooks/useStoreLifecycle'
import { selectManageChartsPageState, useManageChartsStore } from '../stores/manage-charts.store'
import { ChartResourceModals } from './manage-resource/ChartResourceModals'
import { ResourceManagementPage } from './manage-resource/ResourceManagementPage'

export const ManageChartsPage = () => {
  const { locale, t } = useTranslation()
  const state = useManageChartsStore(useShallow(selectManageChartsPageState))
  const {
    bootstrap: bootstrapStore,
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
    selectedId,
    selectedRowKeys,
    setCreateName,
    setEditorName,
    setSearchText,
    setSelectedRowKeys,
  } = state
  useUserStoreLifecycle(bootstrapStore, dispose)
  return (
    <ResourceManagementPage
      createLabel={t('charts.create')}
      deleteTitle={t('charts.deleteTitle')}
      fallbackName={t('charts.untitled')}
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
      title={t('charts.title')}
      t={t}
      onRemove={deleteOne}
    >
      <ChartResourceModals
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
        t={t}
      />
    </ResourceManagementPage>
  )
}
