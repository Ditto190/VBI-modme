'use client'

import { useShallow } from 'zustand/shallow'
import { useTranslation } from '../i18n'
import { selectReportsPageState, useReportsStore } from '../stores/reports.store'
import { useStoreLifecycle } from '../hooks/useStoreLifecycle'
import { ReportResourceModals } from './reports/ReportResourceModals'
import { ResourceManagementPage } from './manage-resource/ResourceManagementPage'

export const ReportsPage = () => {
  const { locale, t } = useTranslation()
  const state = useReportsStore(useShallow(selectReportsPageState))

  const {
    bootstrap,
    closeCreate,
    closeDetail,
    create,
    createName,
    deleteSelected,
    dispose,
    editorName,
    filteredItems,
    isCreateOpen,
    loading,
    openCreate,
    openDetail,
    renameSelected,
    remove,
    searchText,
    selectedId,
    selectedRowKeys,
    setCreateName,
    setEditorName,
    setSearchText,
    setSelectedRowKeys,
  } = state

  useStoreLifecycle(bootstrap, dispose)

  return (
    <ResourceManagementPage
      createLabel={t('reports.create')}
      deleteTitle={t('reports.deleteTitle')}
      fallbackName={t('reports.untitled')}
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
      title={t('reports.title')}
      t={t}
      onRemove={remove}
    >
      <ReportResourceModals
        createName={createName}
        editorName={editorName}
        isCreateOpen={isCreateOpen}
        selectedId={selectedId}
        onCloseCreate={closeCreate}
        onCloseDetail={closeDetail}
        onConfirmCreate={create}
        onCreateNameChange={setCreateName}
        onEditorNameChange={setEditorName}
        onRenameSelected={renameSelected}
      />
    </ResourceManagementPage>
  )
}
