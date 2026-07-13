'use client'

import { useEffect } from 'react'
import { applicationShallowEqual, useApplication } from '../application'
import { useTranslation } from '../i18n'
import { ResourceManagementPage } from './manage-resource/ResourceManagementPage'

export const ReportsPage = () => {
  const { locale, t } = useTranslation()
  const {
    activate,
    create,
    deleteSelected,
    filteredItems,
    loading,
    open,
    remove,
    searchText,
    selectedRowKeys,
    setSearchText,
    setSelectedRowKeys,
  } = useApplication(
    (applicationState) => ({
      activate: applicationState.report.activate,
      create: applicationState.report.create,
      deleteSelected: applicationState.report.records.deleteSelected,
      filteredItems: applicationState.report.records.visibleItems,
      loading: applicationState.report.records.loading,
      open: applicationState.report.open,
      remove: applicationState.report.delete,
      searchText: applicationState.report.records.searchText,
      selectedRowKeys: applicationState.report.records.selectedIds,
      setSearchText: applicationState.report.records.search,
      setSelectedRowKeys: applicationState.report.records.select,
    }),
    { equality: applicationShallowEqual },
  )

  useEffect(() => activate(), [activate])

  return (
    <ResourceManagementPage
      createLabel={t('reports.create')}
      deleteTitle={t('reports.deleteTitle')}
      fallbackName={t('reports.untitled')}
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
      title={t('reports.title')}
      t={t}
      onRemove={remove}
    />
  )
}
