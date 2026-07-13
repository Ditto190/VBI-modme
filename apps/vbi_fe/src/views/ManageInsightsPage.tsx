'use client'

import { useEffect } from 'react'
import { applicationShallowEqual, useApplication } from '../application'
import { useTranslation } from '../i18n'
import { getSessionUserName } from '../utils/collaboration'
import { ResourceManagementPage } from './manage-resource/ResourceManagementPage'

export const ManageInsightsPage = () => {
  const { locale, t } = useTranslation()
  const {
    activateStore,
    create,
    deleteOne,
    deleteSelected,
    filteredItems,
    loading,
    open,
    searchText,
    selectedRowKeys,
    setSearchText,
    setSelectedRowKeys,
  } = useApplication(
    (applicationState) => ({
      activateStore: applicationState.insight.activate,
      create: applicationState.insight.create,
      deleteOne: applicationState.insight.delete,
      deleteSelected: applicationState.insight.records.deleteSelected,
      filteredItems: applicationState.insight.records.visibleItems,
      loading: applicationState.insight.records.loading,
      open: applicationState.insight.open,
      searchText: applicationState.insight.records.searchText,
      selectedRowKeys: applicationState.insight.records.selectedIds,
      setSearchText: applicationState.insight.records.search,
      setSelectedRowKeys: applicationState.insight.records.select,
    }),
    { equality: applicationShallowEqual },
  )
  useEffect(() => activateStore({ userName: getSessionUserName() }), [activateStore])
  return (
    <ResourceManagementPage
      createLabel={t('insights.create')}
      deleteTitle={t('insights.deleteTitle')}
      fallbackName={t('insights.untitled')}
      locale={locale}
      state={{
        create,
        deleteSelected,
        filteredItems,
        loading,
        openDetail: open,
        searchText,
        selectedRowKeys,
        setSearchText,
        setSelectedRowKeys,
      }}
      title={t('insights.title')}
      t={t}
      onRemove={deleteOne}
    />
  )
}
