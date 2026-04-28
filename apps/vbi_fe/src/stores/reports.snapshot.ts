import { useReportsStore } from './reports.store'

export const getReportsSnapshot = () => {
  const state = useReportsStore.getState()
  return {
    createName: state.createName,
    editingId: state.editing?.id ?? '',
    filteredItems: state.filteredItems,
    isCreateOpen: state.isCreateOpen,
    items: state.items,
    loading: state.loading,
    renameValue: state.renameValue,
    searchText: state.searchText,
    selectedRowKeys: state.selectedRowKeys,
  }
}
