'use client'

import { useEffect } from 'react'
import { applicationShallowEqual, useApplication } from '../application'
import { useTranslation } from '../i18n'
import { getSessionUserName } from '../utils/collaboration'
import { ResourceManagementPage } from './manage-resource/ResourceManagementPage'

export const ManageChartsPage = () => {
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
      activateStore: applicationState.chart.activate,
      create: applicationState.chart.create,
      deleteOne: applicationState.chart.delete,
      deleteSelected: applicationState.chart.records.deleteSelected,
      filteredItems: applicationState.chart.records.visibleItems,
      loading: applicationState.chart.records.loading,
      open: applicationState.chart.open,
      searchText: applicationState.chart.records.searchText,
      selectedRowKeys: applicationState.chart.records.selectedIds,
      setSearchText: applicationState.chart.records.search,
      setSelectedRowKeys: applicationState.chart.records.select,
    }),
    { equality: applicationShallowEqual },
  )
  useEffect(() => activateStore({ userName: getSessionUserName() }), [activateStore])
  return (
    <ResourceManagementPage
      createLabel={t('charts.create')}
      deleteTitle={t('charts.deleteTitle')}
      fallbackName={t('charts.untitled')}
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
      title={t('charts.title')}
      t={t}
      onRemove={deleteOne}
    />
  )
}
