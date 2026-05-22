'use client'

import { useShallow } from 'zustand/shallow'
import { useTranslation } from '../i18n'
import { selectReportsPageState, useReportsStore } from '../stores/reports.store'
import { useStoreLifecycle } from '../hooks/useStoreLifecycle'
import { ManageResourcePageShell } from './manage-resource/ManageResourcePageShell'
import { useResourceColumns } from './manage-resource/resource-columns'
import { ReportResourceModals } from './reports/ReportResourceModals'

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

  useStoreLifecycle(bootstrap)

  const columns = useResourceColumns({
    deleteTitle: t('reports.deleteTitle'),
    fallbackName: t('reports.untitled'),
    locale,
    onEdit: (id) => void openDetail(id),
    onRemove: remove,
    t,
  })

  return (
    <ManageResourcePageShell
      columns={columns}
      createLabel={t('reports.create')}
      dataSource={filteredItems}
      loading={loading}
      onCreate={openCreate}
      onDeleteSelected={deleteSelected}
      onSearchTextChange={setSearchText}
      searchText={searchText}
      selectedRowKeys={selectedRowKeys}
      setSelectedRowKeys={setSelectedRowKeys}
      title={t('reports.title')}
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
    </ManageResourcePageShell>
  )
}
