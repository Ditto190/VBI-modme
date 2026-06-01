import type { Key, ReactNode } from 'react'
import type { AppLocale, Translate } from '../../i18n'
import { ManageResourcePageShell } from './ManageResourcePageShell'
import { useResourceColumns } from './resource-columns'
import type { ResourceItem } from '../../types'

export type ResourceManagementPageState = {
  filteredItems: ResourceItem[]
  loading: boolean
  searchText: string
  selectedRowKeys: Key[]
  deleteSelected(): Promise<void>
  openCreate(): void
  openDetail(id: string): void | Promise<void>
  setSearchText(searchText: string): void
  setSelectedRowKeys(selectedRowKeys: string[]): void
}

type ResourceManagementPageProps = {
  children: ReactNode
  createLabel: string
  deleteTitle: string
  fallbackName: string
  locale: AppLocale
  state: ResourceManagementPageState
  title: string
  t: Translate
  onRemove(id: string): Promise<void>
}

export const ResourceManagementPage = ({
  children,
  createLabel,
  deleteTitle,
  fallbackName,
  locale,
  state,
  title,
  t,
  onRemove,
}: ResourceManagementPageProps) => {
  const columns = useResourceColumns({
    deleteTitle,
    fallbackName,
    locale,
    onEdit: state.openDetail,
    onRemove,
    t,
  })

  return (
    <ManageResourcePageShell
      columns={columns}
      createLabel={createLabel}
      dataSource={state.filteredItems}
      deleteTitle={deleteTitle}
      loading={state.loading}
      onCreate={state.openCreate}
      onDeleteSelected={state.deleteSelected}
      onSearchTextChange={state.setSearchText}
      searchText={state.searchText}
      selectedRowKeys={state.selectedRowKeys}
      setSelectedRowKeys={state.setSelectedRowKeys}
      title={title}
    >
      {children}
    </ManageResourcePageShell>
  )
}
