import type { ResourceItem, ResourceKind } from '../types'
import {
  createResourceListActions,
  createResourceListState,
  loadResourceItems,
  type ResourceListActions,
  type ResourceListState,
} from './resource-list.model'

type SetState<TState> = (partial: Partial<TState> | TState | ((state: TState) => Partial<TState> | TState)) => void
type GetState<TState> = () => TState

export type ResourceCreateInput = {
  content?: string
  name?: string
}

export type ResourceManagementState = ResourceListState &
  ResourceListActions & {
    editorName: string
    loading: boolean
    selectedId: string
    userName: string
    bootstrap(userName?: string): Promise<void>
    closeDetail(): Promise<void>
    create(input?: ResourceCreateInput): Promise<void>
    deleteOne(id: string): Promise<void>
    deleteSelected(): Promise<void>
    dispose(): Promise<void>
    load(): Promise<void>
    openDetail(id: string): Promise<void>
    renameOne(id: string, name: string): Promise<void>
    renameSelected(): Promise<void>
    setEditorName(editorName: string): void
  }

type ResourceManagementAdapter<TState extends ResourceManagementState> = {
  kind: ResourceKind
  getFallbackName(): string
  create(state: TState, name: string, input: ResourceCreateInput): Promise<unknown>
  list(): Promise<ResourceItem[]>
  remove(id: string): Promise<unknown>
  rename(id: string, name: string): Promise<unknown>
  connectSession?(resourceId: string, userName: string): Promise<void>
  getDisposeResetPatch?(): Partial<TState>
  getInitialPatch?(): Partial<TState>
  releaseSession?(resourceId: string): Promise<void>
}

const resolveCreateName = (fallbackName: () => string, name: string | undefined) => name?.trim() || fallbackName()

const releaseSelectedResource = async <TState extends ResourceManagementState>(
  state: TState,
  releaseSession?: (resourceId: string) => Promise<void>,
) => {
  if (!state.selectedId || !releaseSession) return
  await releaseSession(state.selectedId)
}

export const createResourceManagementState = <TState extends ResourceManagementState>(
  set: SetState<TState>,
  get: GetState<TState>,
  adapter: ResourceManagementAdapter<TState>,
): TState => {
  return {
    ...createResourceListState(),
    editorName: '',
    loading: false,
    selectedId: '',
    userName: '',
    ...adapter.getInitialPatch?.(),
    ...createResourceListActions(set),
    bootstrap: async (userName = '') => {
      set({ userName } as Partial<TState>)
      await get().load()
    },
    closeDetail: async () => {
      await releaseSelectedResource(get(), adapter.releaseSession)
      set({ editorName: '', selectedId: '' } as Partial<TState>)
    },
    create: async (input = {}) => {
      const nextName = resolveCreateName(adapter.getFallbackName, input.name)
      await adapter.create(get(), nextName, input)
      await get().load()
    },
    deleteOne: async (id) => {
      await adapter.remove(id)
      if (get().selectedId === id) {
        await get().closeDetail()
      }
      set(
        (state) =>
          ({
            selectedRowKeys: state.selectedRowKeys.filter((key) => key !== id),
          }) as Partial<TState>,
      )
      await get().load()
    },
    deleteSelected: async () => {
      const ids = [...get().selectedRowKeys]
      await Promise.all(ids.map((id) => adapter.remove(id)))
      if (ids.includes(get().selectedId)) {
        await get().closeDetail()
      }
      set({ selectedRowKeys: [] } as unknown as Partial<TState>)
      await get().load()
    },
    dispose: async () => {
      await releaseSelectedResource(get(), adapter.releaseSession)
      set({
        editorName: '',
        searchText: '',
        selectedId: '',
        selectedRowKeys: [],
        userName: '',
        ...adapter.getDisposeResetPatch?.(),
      } as Partial<TState>)
    },
    load: async () => {
      await loadResourceItems(set, adapter.list)
    },
    openDetail: async (id) => {
      const { items, selectedId, userName } = get()
      if (selectedId === id) return
      if (selectedId && selectedId !== id && adapter.releaseSession) {
        await adapter.releaseSession(selectedId)
      }
      set({
        editorName: items.find((item) => item.id === id)?.name || adapter.getFallbackName(),
        selectedId: id,
      } as Partial<TState>)
      await adapter.connectSession?.(id, userName)
    },
    renameOne: async (id, name) => {
      const current = get().items.find((item) => item.id === id)
      const nextName = name.trim() || current?.name || adapter.getFallbackName()
      await adapter.rename(id, nextName)
      await get().load()
    },
    renameSelected: async () => {
      const { editorName, items, selectedId } = get()
      if (!selectedId) return
      const current = items.find((item) => item.id === selectedId)
      const nextName = editorName.trim() || current?.name || adapter.getFallbackName()
      await adapter.rename(selectedId, nextName)
      await get().load()
    },
    setEditorName: (editorName) => set({ editorName } as Partial<TState>),
  } as TState
}

export const selectResourceManagementPageState = <TState extends ResourceManagementState>(state: TState) => ({
  bootstrap: state.bootstrap,
  clearSelection: state.clearSelection,
  closeDetail: state.closeDetail,
  create: state.create,
  deleteOne: state.deleteOne,
  deleteSelected: state.deleteSelected,
  dispose: state.dispose,
  editorName: state.editorName,
  filteredItems: state.filteredItems,
  loading: state.loading,
  openDetail: state.openDetail,
  renameSelected: state.renameSelected,
  renameOne: state.renameOne,
  searchText: state.searchText,
  selectAllFiltered: state.selectAllFiltered,
  selectedId: state.selectedId,
  selectedRowKeys: state.selectedRowKeys,
  setEditorName: state.setEditorName,
  setSearchText: state.setSearchText,
  setSelectedRowKeys: state.setSelectedRowKeys,
})
