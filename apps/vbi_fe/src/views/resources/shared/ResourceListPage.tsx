'use client'

import { useEffect } from 'react'
import { applicationShallowEqual, useApplication } from '../../../application'
import { useTranslation } from '../../../i18n'
import type { ResourceKind } from '../../../types'
import { getSessionUserName } from '../../../utils/collaboration'
import { ResourceManagementPage } from './ResourceManagementPage'

type ResourceListPageLabels = {
  create: string
  deleteTitle: string
  title: string
  untitled: string
}

type ResourceListPageProps = {
  kind: ResourceKind
  labels: ResourceListPageLabels
  userNameActivation?: boolean
}

export const ResourceListPage = ({ kind, labels, userNameActivation = false }: ResourceListPageProps) => {
  const { locale, t } = useTranslation()
  const {
    create,
    deleteOne,
    deleteSelected,
    filteredItems,
    activateRecords,
    loading,
    open,
    searchText,
    selectedRowKeys,
    setSearchText,
    setSelectedRowKeys,
  } = useApplication(
    (applicationState) => {
      const resource = applicationState[kind]

      return {
        activate: resource.activate,
        create: resource.create,
        deleteOne: resource.delete,
        deleteSelected: resource.records.deleteSelected,
        filteredItems: resource.records.visibleItems,
        activateRecords: resource.records.activate,
        loading: resource.records.loading,
        open: resource.open,
        searchText: resource.records.searchText,
        selectedRowKeys: resource.records.selectedIds,
        setSearchText: resource.records.search,
        setSelectedRowKeys: resource.records.select,
      }
    },
    { equality: applicationShallowEqual },
  )

  useEffect(
    () => activateRecords(userNameActivation ? { userName: getSessionUserName() } : undefined),
    [activateRecords, userNameActivation],
  )

  return (
    <ResourceManagementPage
      createLabel={t(labels.create)}
      deleteTitle={t(labels.deleteTitle)}
      fallbackName={t(labels.untitled)}
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
      title={t(labels.title)}
      t={t}
      onRemove={deleteOne}
    />
  )
}
