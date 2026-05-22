import { useReportsStore } from './reports.store'

export const getReportsSnapshot = () => {
  const state = useReportsStore.getState()
  return {
    createName: state.createName,
    editorName: state.editorName,
    filteredItems: state.filteredItems,
    isCreateOpen: state.isCreateOpen,
    items: state.items,
    loading: state.loading,
    searchText: state.searchText,
    selectedId: state.selectedId,
    selectedRowKeys: state.selectedRowKeys,
  }
}
