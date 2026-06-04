import type { HocuspocusProvider } from '@hocuspocus/provider'
import type { StoreApi } from 'zustand/vanilla'
import { createLatestApplicationLifecycle } from '../core/lifecycle'
import { goApplicationPath } from '../routing/navigation-bridge'
import type { ResourceItem, ResourceKind } from '../../types'
import { setCollaborativeUser } from '../../utils/collaboration'
import { matchesResourceSearch } from '../../utils/resource-list'
import {
  bumpSessionVersion,
  createBuilderSession,
  resetSessionConnection,
  setConnectedSession,
  setSessionOpening,
  setSessionRefs,
} from './resource-builder.session'
import type { BuilderByKind, BuilderSession, BuilderStoreState } from './resource-builder.types'
import type {
  ResourceApplication,
  ResourceBuilderProjection,
  ResourceCreateInput,
  ResourceRenameInput,
} from './contract'
import { resolveResourceDetailRoute, resolveResourceListRoute } from './route'

type ResourceAdapter<TItem extends ResourceItem, TKind extends ResourceKind> = {
  kind: TKind
  getFallbackName(): string
  create(
    state: ResourceApplicationStoreState<TItem, BuilderByKind[TKind]>,
    name: string,
    input: ResourceCreateInput,
  ): Promise<unknown>
  list(): Promise<TItem[]>
  remove(id: string): Promise<unknown>
  rename(id: string, name: string): Promise<unknown>
}

export type ResourceApplicationStoreState<TItem extends ResourceItem, TBuilder> = ResourceApplication<TItem, TBuilder> &
  BuilderStoreState<TBuilder> & {
    editorName: string
    filteredItems: TItem[]
    items: TItem[]
    loading: boolean
    searchText: string
    selectedId: string
    selectedRowKeys: string[]
    userName: string
    bootstrap(userName?: string): Promise<void>
    clearSelection(): void
    closeDetail(): Promise<void>
    deleteOne(id: string): Promise<void>
    deleteSelected(): Promise<void>
    dispose(): Promise<void>
    load(): Promise<void>
    openDetail(id: string): Promise<void>
    renameOne(id: string, name: string): Promise<void>
    renameSelected(): Promise<void>
    selectAllFiltered(): void
    setEditorName(name: string): void
    setSearchText(searchText: string): void
    setSelectedRowKeys(keys: string[]): void
  }

type SetState<TState> = StoreApi<TState>['setState']
type GetState<TState> = StoreApi<TState>['getState']

const resolveCreateName = (fallbackName: () => string, name: string | undefined) => name?.trim() || fallbackName()

const getFilteredItems = <TItem extends ResourceItem>(items: TItem[], searchText: string) =>
  items.filter((item) => matchesResourceSearch(item, searchText))

const getBuilderProjections = <TBuilder>(
  sessions: Record<string, BuilderSession<TBuilder>>,
): Record<string, ResourceBuilderProjection<TBuilder>> =>
  Object.fromEntries(
    Object.entries(sessions).map(([id, session]) => [id, { builder: session.builder, version: session.version }]),
  )

const createPublicPatch = <TItem extends ResourceItem, TBuilder>(
  state: ResourceApplicationStoreState<TItem, TBuilder>,
) => ({
  editor: {
    ...state.editor,
    builders: getBuilderProjections(state.sessions),
  },
  records: {
    ...state.records,
    loading: state.loading,
    searchText: state.searchText,
    selectedIds: state.selectedRowKeys,
    visibleItems: state.filteredItems,
  },
})

const releaseDelayMs = 0

export const createResourceApplicationStoreState = <TItem extends ResourceItem, TKind extends ResourceKind>(
  set: SetState<ResourceApplicationStoreState<TItem, BuilderByKind[TKind]>>,
  get: GetState<ResourceApplicationStoreState<TItem, BuilderByKind[TKind]>>,
  adapter: ResourceAdapter<TItem, TKind>,
): ResourceApplicationStoreState<TItem, BuilderByKind[TKind]> => {
  const lifecycle = createLatestApplicationLifecycle()
  const releaseTimers = new Map<string, ReturnType<typeof setTimeout>>()

  const setWithPublicPatch = (
    partial:
      | Partial<ResourceApplicationStoreState<TItem, BuilderByKind[TKind]>>
      | ((
          state: ResourceApplicationStoreState<TItem, BuilderByKind[TKind]>,
        ) => Partial<ResourceApplicationStoreState<TItem, BuilderByKind[TKind]>>),
  ) => {
    set((state) => {
      const patch = typeof partial === 'function' ? partial(state) : partial
      const nextState = { ...state, ...patch }
      return {
        ...patch,
        ...createPublicPatch(nextState),
      }
    })
  }

  const cancelRelease = (resourceId: string) => {
    const timer = releaseTimers.get(resourceId)
    if (!timer) return
    clearTimeout(timer)
    releaseTimers.delete(resourceId)
  }

  const scheduleRelease = (resourceId: string, session: BuilderSession<BuilderByKind[TKind]>) => {
    cancelRelease(resourceId)
    releaseTimers.set(
      resourceId,
      setTimeout(() => {
        releaseTimers.delete(resourceId)
        const current = get().sessions[resourceId]
        if (!current || current.refs > 0) return
        current.stopSync?.()
        setWithPublicPatch((state) => {
          const sessions = { ...state.sessions }
          delete sessions[resourceId]
          return { sessions }
        })
        void session.handle.close().catch(console.error)
      }, releaseDelayMs),
    )
  }

  const retain = (resourceId: string) => {
    if (!resourceId) return
    cancelRelease(resourceId)
    setWithPublicPatch((state) => ({
      sessions: {
        ...state.sessions,
        [resourceId]: setSessionRefs(
          state.sessions[resourceId] ?? createBuilderSession(adapter.kind, resourceId),
          (state.sessions[resourceId]?.refs ?? 0) + 1,
        ),
      },
    }))
  }

  const release = async (resourceId: string) => {
    if (!resourceId) return
    cancelRelease(resourceId)
    const session = get().sessions[resourceId]
    if (!session) return
    if (session.refs > 1) {
      setWithPublicPatch((state) => ({
        sessions: {
          ...state.sessions,
          [resourceId]: setSessionRefs(session, session.refs - 1),
        },
      }))
      return
    }
    setWithPublicPatch((state) => {
      const current = state.sessions[resourceId]
      if (!current) return {}
      return {
        sessions: {
          ...state.sessions,
          [resourceId]: setSessionRefs(current, 0),
        },
      }
    })
    scheduleRelease(resourceId, session)
  }

  const connect = async (resourceId: string) => {
    const current = get().sessions[resourceId]
    if (!current || current.builder) return
    if (current.opening) return current.opening
    const opening = (async () => {
      const builder = (await current.handle.open()) as BuilderByKind[TKind]
      const provider = await current.handle.getCollaborationProvider()
      const onUpdate = () => {
        setWithPublicPatch((state) => {
          const session = state.sessions[resourceId]
          if (!session || session.handle !== current.handle) return {}
          return {
            sessions: {
              ...state.sessions,
              [resourceId]: bumpSessionVersion(session),
            },
          }
        })
      }
      builder.doc.on('update', onUpdate)
      const stopSync = () => {
        builder.doc.off('update', onUpdate)
      }
      setWithPublicPatch((state) => {
        const session = state.sessions[resourceId]
        if (!session || session.handle !== current.handle) return {}
        return {
          sessions: {
            ...state.sessions,
            [resourceId]: setConnectedSession(session, builder, provider as HocuspocusProvider | null, stopSync),
          },
        }
      })
    })().catch((error) => {
      get().sessions[resourceId]?.stopSync?.()
      setWithPublicPatch((state) => {
        const session = state.sessions[resourceId]
        if (!session || session.handle !== current.handle) return {}
        return {
          sessions: {
            ...state.sessions,
            [resourceId]: resetSessionConnection(session),
          },
        }
      })
      throw error
    })
    setWithPublicPatch((state) => ({
      sessions: {
        ...state.sessions,
        [resourceId]: setSessionOpening(current, opening),
      },
    }))
    return opening
  }

  const connectResourceSession = async (resourceId: string, userName: string) => {
    if (!resourceId) return
    retain(resourceId)
    await connect(resourceId)
    setCollaborativeUser(get().sessions[resourceId]?.provider, userName)
  }

  const releaseResourceSession = async (resourceId: string) => {
    if (!resourceId) return
    await release(resourceId)
  }

  const load = async () => {
    setWithPublicPatch({ loading: true })
    try {
      const items = await adapter.list()
      setWithPublicPatch((state) => ({
        filteredItems: getFilteredItems(items, state.searchText),
        items,
      }))
    } finally {
      setWithPublicPatch({ loading: false })
    }
  }

  const closeDetail = async () => {
    const { selectedId } = get()
    if (selectedId) await releaseResourceSession(selectedId)
    setWithPublicPatch({ editorName: '', selectedId: '' })
  }

  const deleteOne = async (id: string) => {
    await adapter.remove(id)
    if (get().selectedId === id) await closeDetail()
    setWithPublicPatch((state) => ({
      selectedRowKeys: state.selectedRowKeys.filter((key) => key !== id),
    }))
    await load()
  }

  const renameOne = async (id: string, name: string) => {
    const current = get().items.find((item) => item.id === id)
    const nextName = name.trim() || current?.name || adapter.getFallbackName()
    await adapter.rename(id, nextName)
    await load()
  }

  const deleteSelected = async () => {
    const ids = [...get().selectedRowKeys]
    await Promise.all(ids.map((id) => adapter.remove(id)))
    if (ids.includes(get().selectedId)) await closeDetail()
    setWithPublicPatch({ selectedRowKeys: [] })
    await load()
  }

  const activate = (options?: { userName?: string }) => {
    goApplicationPath(resolveResourceListRoute(adapter.kind))
    return lifecycle.start(
      () => get().bootstrap(options?.userName),
      () => get().dispose(),
    )
  }

  const editorConnect = (id: string, userName: string) => {
    let connected = false
    let disposed = false
    const connection = import('./session')
      .then((module) => module.connectResourceSession(adapter.kind, id, userName))
      .then(() => {
        connected = true
      })
      .catch(() => undefined)

    return () => {
      if (disposed) return
      disposed = true
      void connection
        .then(() =>
          connected ? import('./session').then((module) => module.releaseResourceSession(adapter.kind, id)) : undefined,
        )
        .catch(() => undefined)
    }
  }

  const state = {
    editorName: '',
    filteredItems: [],
    items: [],
    loading: false,
    searchText: '',
    selectedId: '',
    selectedRowKeys: [],
    sessions: {},
    userName: '',
    editor: {
      builders: {},
      connect: editorConnect,
      release: releaseResourceSession,
    },
    records: {
      loading: false,
      searchText: '',
      selectedIds: [],
      visibleItems: [],
      activate: (options?: { userName?: string }) =>
        lifecycle.start(
          () => get().bootstrap(options?.userName),
          () => get().dispose(),
        ),
      deleteSelected,
      search: (searchText: string) => get().setSearchText(searchText),
      select: (ids: string[]) => get().setSelectedRowKeys(ids),
    },
    activate,
    bootstrap: async (userName = '') => {
      setWithPublicPatch({ userName })
      await get().load()
    },
    clearSelection: () => setWithPublicPatch({ selectedRowKeys: [] }),
    closeDetail,
    connect,
    create: async (input: ResourceCreateInput = {}) => {
      const nextName = resolveCreateName(adapter.getFallbackName, input.name)
      await adapter.create(get(), nextName, input)
      await get().load()
    },
    delete: deleteOne,
    deleteOne,
    deleteSelected,
    dispose: async () => {
      const { selectedId } = get()
      if (selectedId) await releaseResourceSession(selectedId)
      setWithPublicPatch({
        editorName: '',
        searchText: '',
        selectedId: '',
        selectedRowKeys: [],
        userName: '',
      })
    },
    list: async () => {
      await get().load()
      return get().items
    },
    load,
    open: async (id: string) => {
      goApplicationPath(resolveResourceDetailRoute(adapter.kind, id))
    },
    openDetail: async (id: string) => {
      const { items, selectedId, userName } = get()
      if (selectedId === id) return
      if (selectedId && selectedId !== id) await releaseResourceSession(selectedId)
      setWithPublicPatch({
        editorName: items.find((item) => item.id === id)?.name || adapter.getFallbackName(),
        selectedId: id,
      })
      await connectResourceSession(id, userName)
    },
    release,
    rename: async (input: ResourceRenameInput) => {
      await renameOne(input.id, input.name)
    },
    renameOne,
    renameSelected: async () => {
      const { editorName, items, selectedId } = get()
      if (!selectedId) return
      const current = items.find((item) => item.id === selectedId)
      const nextName = editorName.trim() || current?.name || adapter.getFallbackName()
      await adapter.rename(selectedId, nextName)
      await get().load()
    },
    retain,
    selectAllFiltered: () =>
      setWithPublicPatch((current) => ({
        selectedRowKeys: getFilteredItems(current.items, current.searchText).map((item) => item.id),
      })),
    setEditorName: (editorName: string) => setWithPublicPatch({ editorName }),
    setSearchText: (searchText: string) =>
      setWithPublicPatch((current) => ({
        filteredItems: getFilteredItems(current.items, searchText),
        searchText,
      })),
    setSelectedRowKeys: (selectedRowKeys: string[]) => setWithPublicPatch({ selectedRowKeys }),
  } satisfies ResourceApplicationStoreState<TItem, BuilderByKind[TKind]>

  return state
}
