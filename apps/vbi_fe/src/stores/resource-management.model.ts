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

export type ResourceManagementState = ResourceListState &
  ResourceListActions & {
    createName: string
    editorName: string
    loading: boolean
    selectedId: string
    userName: string
    bootstrap(userName?: string): Promise<void>
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

type ResourceManagementAdapter<TState extends ResourceManagementState> = {
  kind: ResourceKind
  getCreateOpenPatch(open: boolean): Partial<TState>
  getFallbackName(): string
  create(state: TState, name: string): Promise<unknown>
  list(): Promise<ResourceItem[]>
  remove(id: string): Promise<unknown>
  rename(id: string, name: string): Promise<unknown>
  connectSession?(resourceId: string, userName: string): Promise<void>
  getCreateResetPatch?(): Partial<TState>
  getDisposeResetPatch?(): Partial<TState>
  getInitialPatch?(): Partial<TState>
  releaseSession?(resourceId: string): Promise<void>
  resolveCreateName?(name: string): string | null
}

export const resolveNamedResourceCreateName =
  (fallbackName: () => string, allowEmptyFallback = true) =>
  (name: string) => {
    const trimmedName = name.trim()
    if (trimmedName) return trimmedName
    return allowEmptyFallback ? fallbackName() : null
  }

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
  const resolveCreateName = adapter.resolveCreateName ?? resolveNamedResourceCreateName(adapter.getFallbackName, true)

  return {
    ...createResourceListState(),
    createName: '',
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
    closeCreate: () => set(adapter.getCreateOpenPatch(false)),
    closeDetail: async () => {
      await releaseSelectedResource(get(), adapter.releaseSession)
      set({ editorName: '', selectedId: '' } as Partial<TState>)
    },
    create: async () => {
      const nextName = resolveCreateName(get().createName)
      if (!nextName) return
      await adapter.create(get(), nextName)
      set({ createName: '', ...adapter.getCreateOpenPatch(false), ...adapter.getCreateResetPatch?.() })
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
        createName: '',
        editorName: '',
        searchText: '',
        selectedId: '',
        selectedRowKeys: [],
        userName: '',
        ...adapter.getCreateOpenPatch(false),
        ...adapter.getCreateResetPatch?.(),
        ...adapter.getDisposeResetPatch?.(),
      })
    },
    load: async () => {
      await loadResourceItems(set, adapter.list)
    },
    openCreate: () => set(adapter.getCreateOpenPatch(true)),
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
    renameSelected: async () => {
      const { editorName, items, selectedId } = get()
      if (!selectedId) return
      const current = items.find((item) => item.id === selectedId)
      const nextName = editorName.trim() || current?.name || adapter.getFallbackName()
      await adapter.rename(selectedId, nextName)
      await get().load()
    },
    setCreateName: (createName) => set({ createName } as Partial<TState>),
    setEditorName: (editorName) => set({ editorName } as Partial<TState>),
  } as TState
}

export const selectResourceManagementPageState = <TState extends ResourceManagementState>(state: TState) => ({
  bootstrap: state.bootstrap,
  clearSelection: state.clearSelection,
  closeCreate: state.closeCreate,
  closeDetail: state.closeDetail,
  create: state.create,
  createName: state.createName,
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
