'use client'

import { useShallow } from 'zustand/shallow'
import { useTranslation } from '../i18n'
import { selectReportsPageState, useReportsStore } from '../stores/reports.store'
import { useStoreLifecycle } from '../hooks/useStoreLifecycle'
import { useNavigationStore } from '../stores/navigation.store'
import { ReportResourceModals } from './reports/ReportResourceModals'
import { ResourceManagementPage } from './manage-resource/ResourceManagementPage'

export const ReportsPage = () => {
  const { locale, t } = useTranslation()
  const openReport = useNavigationStore((state) => state.openReport)
  const state = useReportsStore(useShallow(selectReportsPageState))

  const {
    bootstrap,
    closeCreate,
    create,
    createName,
    deleteSelected,
    dispose,
    filteredItems,
    isCreateOpen,
    loading,
    openCreate,
    remove,
    searchText,
    selectedRowKeys,
    setCreateName,
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
        openDetail: openReport,
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
        isCreateOpen={isCreateOpen}
        onCloseCreate={closeCreate}
        onConfirmCreate={create}
        onCreateNameChange={setCreateName}
      />
    </ResourceManagementPage>
  )
}
