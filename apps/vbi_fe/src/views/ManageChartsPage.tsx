'use client'

import { useShallow } from 'zustand/shallow'
import { useTranslation } from '../i18n'
import { useUserStoreLifecycle } from '../hooks/useStoreLifecycle'
import { selectManageChartsPageState, useManageChartsStore } from '../stores/manage-charts.store'
import { useNavigationStore } from '../stores/navigation.store'
import { ChartResourceModals } from './manage-resource/ChartResourceModals'
import { ResourceManagementPage } from './manage-resource/ResourceManagementPage'

export const ManageChartsPage = () => {
  const { locale, t } = useTranslation()
  const openChart = useNavigationStore((state) => state.openChart)
  const state = useManageChartsStore(useShallow(selectManageChartsPageState))
  const {
    bootstrap: bootstrapStore,
    closeCreate,
    create,
    createName,
    createOpen,
    deleteOne,
    deleteSelected,
    dispose,
    filteredItems,
    loading,
    openCreate,
    searchText,
    selectedRowKeys,
    setCreateName,
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
        openDetail: openChart,
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
        create={create}
        createName={createName}
        createOpen={createOpen}
        setCreateName={setCreateName}
        t={t}
      />
    </ResourceManagementPage>
  )
}
