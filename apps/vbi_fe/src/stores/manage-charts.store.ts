import { create } from 'zustand'
import { createResource, listResources, removeResource, renameResource } from '../services/resourceApi'
import { tRuntime } from '../i18n'
import {
  createResourceListActions,
  createResourceListState,
  loadResourceItems,
  type ResourceListActions,
  type ResourceListState,
} from './resource-list.model'

const connectChartSession = async (resourceId: string, userName: string) => {
  const { connectResourceSession } = await import('./resource-session.store')
  await connectResourceSession('chart', resourceId, userName)
}

const releaseChartSession = async (resourceId: string) => {
  const { releaseResourceSession } = await import('./resource-session.store')
  await releaseResourceSession('chart', resourceId)
}

type ManageChartsState = ResourceListState &
  ResourceListActions & {
    createName: string
    createOpen: boolean
    editorName: string
    loading: boolean
    selectedId: string
    userName: string
    bootstrap(userName: string): Promise<void>
    closeCreate(): void
    closeDetail(): Promise<void>
    create(): Promise<void>
    deleteOne(id: string): Promise<void>
    deleteSelected(): Promise<void>
    dispose(): Promise<void>
    load(): Promise<void>
    openCreate(): void
    openDetail(id: string): Promise<void>
    renameSelected(): Promise<void>
    setCreateName(createName: string): void
    setEditorName(editorName: string): void
  }

const getNextChartName = (name: string) => name.trim() || tRuntime('charts.untitled')

export const useManageChartsStore = create<ManageChartsState>((set, get) => ({
  ...createResourceListState(),
  createName: '',
  createOpen: false,
  editorName: '',
  loading: false,
  selectedId: '',
  userName: '',
  ...createResourceListActions(set),
  bootstrap: async (userName) => {
    set({ userName })
    await get().load()
  },
  closeCreate: () => set({ createOpen: false }),
  closeDetail: async () => {
    const { selectedId } = get()
    await releaseChartSession(selectedId)
    set({ editorName: '', selectedId: '' })
  },
  create: async () => {
    await createResource('chart', getNextChartName(get().createName))
    set({ createName: '', createOpen: false })
    await get().load()
  },
  deleteOne: async (id) => {
    await removeResource('chart', id)
    if (get().selectedId === id) {
      await get().closeDetail()
    }
    set((state) => ({
      selectedRowKeys: state.selectedRowKeys.filter((key) => key !== id),
    }))
    await get().load()
  },
  deleteSelected: async () => {
    const ids = [...get().selectedRowKeys]
    await Promise.all(ids.map((id) => removeResource('chart', id)))
    if (ids.includes(get().selectedId)) {
      await get().closeDetail()
    }
    set({ selectedRowKeys: [] })
    await get().load()
  },
  dispose: async () => {
    await releaseChartSession(get().selectedId)
    set({
      createName: '',
      createOpen: false,
      editorName: '',
      searchText: '',
      selectedId: '',
      selectedRowKeys: [],
      userName: '',
    })
  },
  load: async () => {
    await loadResourceItems(set, () => listResources('chart'))
  },
  openCreate: () => set({ createOpen: true }),
  openDetail: async (id) => {
    const { items, selectedId, userName } = get()
    if (selectedId === id) return
    if (selectedId && selectedId !== id) {
      await releaseChartSession(selectedId)
    }
    set({
      editorName: items.find((item) => item.id === id)?.name || tRuntime('charts.untitled'),
      selectedId: id,
    })
    await connectChartSession(id, userName)
  },
  renameSelected: async () => {
    const { editorName, items, selectedId } = get()
    if (!selectedId) return
    const current = items.find((item) => item.id === selectedId)
    await renameResource('chart', selectedId, getNextChartName(editorName || current?.name || ''))
    await get().load()
  },
  setCreateName: (createName) => set({ createName }),
  setEditorName: (editorName) => set({ editorName }),
}))

export const selectManageChartsPageState = (state: ManageChartsState) => ({
  bootstrap: state.bootstrap,
  clearSelection: state.clearSelection,
  closeCreate: state.closeCreate,
  closeDetail: state.closeDetail,
  create: state.create,
  createName: state.createName,
  createOpen: state.createOpen,
  deleteOne: state.deleteOne,
  deleteSelected: state.deleteSelected,
  dispose: state.dispose,
  editorName: state.editorName,
  filteredItems: state.filteredItems,
  loading: state.loading,
  openCreate: state.openCreate,
  openDetail: state.openDetail,
  renameSelected: state.renameSelected,
  searchText: state.searchText,
  selectAllFiltered: state.selectAllFiltered,
  selectedId: state.selectedId,
  selectedRowKeys: state.selectedRowKeys,
  setCreateName: state.setCreateName,
  setEditorName: state.setEditorName,
  setSearchText: state.setSearchText,
  setSelectedRowKeys: state.setSelectedRowKeys,
})

export const getManageChartsSnapshot = () => {
  const state = useManageChartsStore.getState()
  return {
    createName: state.createName,
    createOpen: state.createOpen,
    editorName: state.editorName,
    filteredItems: state.filteredItems,
    items: state.items,
    loading: state.loading,
    searchText: state.searchText,
    selectedId: state.selectedId,
    selectedRowKeys: state.selectedRowKeys,
  }
}
