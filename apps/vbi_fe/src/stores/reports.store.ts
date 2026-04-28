import { create } from 'zustand'
import { tRuntime } from '../i18n'
import * as resourceApi from '../services/resourceApi'
import { useNavigationStore } from './navigation.store'
import type { ResourceItem } from '../types'
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
    editing: ResourceItem | null
    isCreateOpen: boolean
    loading: boolean
    renameValue: string
    bootstrap(): Promise<void>
    closeCreate(): void
    confirmRename(): Promise<void>
    create(): Promise<void>
    deleteSelected(): Promise<void>
    load(): Promise<void>
    openCreate(): void
    openReport(id: string): void
    remove(id: string): Promise<void>
    setCreateName(createName: string): void
    setRenameValue(renameValue: string): void
    startRename(item: ResourceItem): void
    stopRename(): void
  }

export const useReportsStore = create<ReportsState>((set, get) => ({
  ...createResourceListState(),
  createName: '',
  editing: null,
  isCreateOpen: false,
  loading: false,
  renameValue: '',
  ...createResourceListActions(set),
  bootstrap: async () => {
    await get().load()
  },
  closeCreate: () => set({ isCreateOpen: false }),
  confirmRename: async () => {
    const { editing, renameValue } = get()
    if (!editing) return
    await resourceApi.renameResource(
      'report',
      editing.id,
      renameValue.trim() || editing.name || tRuntime('reports.untitled'),
    )
    set({ editing: null, renameValue: '' })
    await get().load()
  },
  create: async () => {
    const createName = get().createName.trim()
    if (!createName) return
    const report = await resourceApi.createResource('report', createName)
    set({ createName: '', isCreateOpen: false })
    await get().load()
    get().openReport(report.id)
  },
  deleteSelected: async () => {
    const ids = [...get().selectedRowKeys]
    await Promise.all(ids.map((id) => resourceApi.removeResource('report', id)))
    set({ selectedRowKeys: [] })
    await get().load()
  },
  load: async () => {
    await loadResourceItems(set, () => resourceApi.listResources('report'))
  },
  openCreate: () => set({ isCreateOpen: true }),
  openReport: (id) => useNavigationStore.getState().openReport(id),
  remove: async (id) => {
    await resourceApi.removeResource('report', id)
    set((state) => ({
      selectedRowKeys: state.selectedRowKeys.filter((key) => key !== id),
    }))
    await get().load()
  },
  setCreateName: (createName) => set({ createName }),
  setRenameValue: (renameValue) => set({ renameValue }),
  startRename: (editing) => set({ editing, renameValue: editing.name || '' }),
  stopRename: () => set({ editing: null, renameValue: '' }),
}))

export const selectReportsPageState = (state: ReportsState) => ({
  bootstrap: state.bootstrap,
  clearSelection: state.clearSelection,
  closeCreate: state.closeCreate,
  confirmRename: state.confirmRename,
  create: state.create,
  createName: state.createName,
  deleteSelected: state.deleteSelected,
  editing: state.editing,
  filteredItems: state.filteredItems,
  isCreateOpen: state.isCreateOpen,
  loading: state.loading,
  openCreate: state.openCreate,
  openReport: state.openReport,
  remove: state.remove,
  renameValue: state.renameValue,
  searchText: state.searchText,
  selectAllFiltered: state.selectAllFiltered,
  selectedRowKeys: state.selectedRowKeys,
  setCreateName: state.setCreateName,
  setRenameValue: state.setRenameValue,
  setSearchText: state.setSearchText,
  setSelectedRowKeys: state.setSelectedRowKeys,
  startRename: state.startRename,
  stopRename: state.stopRename,
})
