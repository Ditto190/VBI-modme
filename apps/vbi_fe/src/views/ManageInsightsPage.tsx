'use client'

import { useShallow } from 'zustand/shallow'
import { useTranslation } from '../i18n'
import { useUserStoreLifecycle } from '../hooks/useStoreLifecycle'
import { selectManageInsightsPageState, useManageInsightsStore } from '../stores/manage-insights.store'
import { useNavigationStore } from '../stores/navigation.store'
import { InsightResourceModals } from './manage-resource/InsightResourceModals'
import { ResourceManagementPage } from './manage-resource/ResourceManagementPage'

export const ManageInsightsPage = () => {
  const { locale, t } = useTranslation()
  const openInsight = useNavigationStore((state) => state.openInsight)
  const state = useManageInsightsStore(useShallow(selectManageInsightsPageState))
  const {
    bootstrap: bootstrapStore,
    closeCreate,
    create,
    createContent,
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
    setCreateContent,
    setCreateName,
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
        openDetail: openInsight,
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
        create={create}
        createContent={createContent}
        createName={createName}
        createOpen={createOpen}
        setCreateContent={setCreateContent}
        setCreateName={setCreateName}
        t={t}
      />
    </ResourceManagementPage>
  )
}
