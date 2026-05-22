import { create } from 'zustand'
import { tRuntime } from '../i18n'
import * as resourceApi from '../services/resourceApi'
import {
  createResourceListActions,
  createResourceListState,
  loadResourceItems,
  type ResourceListActions,
  type ResourceListState,
} from './resource-list.model'

type ReportsState = ResourceListState &
  ResourceListActions & {
    createName: string
    editorName: string
    isCreateOpen: boolean
    loading: boolean
    selectedId: string
    bootstrap(): Promise<void>
    closeCreate(): void
    closeDetail(): Promise<void>
    create(): Promise<void>
    deleteSelected(): Promise<void>
    load(): Promise<void>
    openCreate(): void
    openDetail(id: string): Promise<void>
    renameSelected(): Promise<void>
    remove(id: string): Promise<void>
    setCreateName(createName: string): void
    setEditorName(editorName: string): void
  }

const getNextReportName = (name: string) => name.trim() || tRuntime('reports.untitled')

export const useReportsStore = create<ReportsState>((set, get) => ({
  ...createResourceListState(),
  createName: '',
  editorName: '',
  isCreateOpen: false,
  loading: false,
  selectedId: '',
  ...createResourceListActions(set),
  bootstrap: async () => {
    await get().load()
  },
  closeCreate: () => set({ isCreateOpen: false }),
  closeDetail: async () => {
    set({ editorName: '', selectedId: '' })
  },
  create: async () => {
    const createName = get().createName.trim()
    if (!createName) return
    await resourceApi.createResource('report', createName)
    set({ createName: '', isCreateOpen: false })
    await get().load()
  },
  deleteSelected: async () => {
    const ids = [...get().selectedRowKeys]
    await Promise.all(ids.map((id) => resourceApi.removeResource('report', id)))
    if (ids.includes(get().selectedId)) {
      await get().closeDetail()
    }
    set({ selectedRowKeys: [] })
    await get().load()
  },
  load: async () => {
    await loadResourceItems(set, () => resourceApi.listResources('report'))
  },
  openCreate: () => set({ isCreateOpen: true }),
  openDetail: async (id) => {
    const { items, selectedId } = get()
    if (selectedId === id) return
    set({
      editorName: items.find((item) => item.id === id)?.name || tRuntime('reports.untitled'),
      selectedId: id,
    })
  },
  renameSelected: async () => {
    const { editorName, items, selectedId } = get()
    if (!selectedId) return
    const current = items.find((item) => item.id === selectedId)
    await resourceApi.renameResource('report', selectedId, getNextReportName(editorName || current?.name || ''))
    await get().load()
  },
  remove: async (id) => {
    await resourceApi.removeResource('report', id)
    if (get().selectedId === id) {
      await get().closeDetail()
    }
    set((state) => ({
      selectedRowKeys: state.selectedRowKeys.filter((key) => key !== id),
    }))
    await get().load()
  },
  setCreateName: (createName) => set({ createName }),
  setEditorName: (editorName) => set({ editorName }),
}))

export const selectReportsPageState = (state: ReportsState) => ({
  bootstrap: state.bootstrap,
  clearSelection: state.clearSelection,
  closeCreate: state.closeCreate,
  closeDetail: state.closeDetail,
  create: state.create,
  createName: state.createName,
  deleteSelected: state.deleteSelected,
  editorName: state.editorName,
  filteredItems: state.filteredItems,
  isCreateOpen: state.isCreateOpen,
  loading: state.loading,
  openCreate: state.openCreate,
  openDetail: state.openDetail,
  renameSelected: state.renameSelected,
  remove: state.remove,
  searchText: state.searchText,
  selectAllFiltered: state.selectAllFiltered,
  selectedId: state.selectedId,
  selectedRowKeys: state.selectedRowKeys,
  setCreateName: state.setCreateName,
  setEditorName: state.setEditorName,
  setSearchText: state.setSearchText,
  setSelectedRowKeys: state.setSelectedRowKeys,
})
