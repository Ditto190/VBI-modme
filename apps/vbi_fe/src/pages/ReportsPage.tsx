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
    clearSelection,
    closeCreate,
    confirmRename,
    create,
    createName,
    deleteSelected,
    editing,
    filteredItems,
    isCreateOpen,
    loading,
    openCreate,
    openReport,
    remove,
    renameValue,
    searchText,
    selectAllFiltered,
    selectedRowKeys,
    setCreateName,
    setRenameValue,
    setSearchText,
    setSelectedRowKeys,
    startRename,
    stopRename,
  } = state

  useStoreLifecycle(bootstrap)

  const columns = useResourceColumns({
    deleteTitle: t('reports.deleteTitle'),
    fallbackName: t('reports.untitled'),
    locale,
    onOpen: openReport,
    onRemove: remove,
    onRename: startRename,
    t,
  })

  return (
    <ManageResourcePageShell
      columns={columns}
      createLabel={t('reports.create')}
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
  )
}
