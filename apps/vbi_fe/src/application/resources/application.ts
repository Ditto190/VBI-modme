import type { VBIChartBuilder, VBIInsightBuilder, VBIReportBuilder } from '@visactor/vbi'
import { useManageChartsStore } from '../../stores/manage-charts.store'
import { useManageInsightsStore } from '../../stores/manage-insights.store'
import { useReportsStore } from '../../stores/reports.store'
import type { InsightRecord, ResourceItem, ResourceKind } from '../../types'
import type {
  ResourceApplication,
  ResourceBuilderProjection,
  ResourceCreateInput,
  ResourceEditorApplication,
  ResourceRecordsApplication,
  ResourceRenameInput,
} from './contract'
import { useNavigationStore } from '../../stores/navigation.store'
import type * as ModelsModuleExports from '../../models'
import type * as ResourceSessionModuleExports from '../../stores/resource-session.store'
import { createLatestApplicationLifecycle } from '../core/lifecycle'
import { resolveResourceDetailRoute, resolveResourceListRoute } from './route'

type ResourceStoreState<TItem extends ResourceItem> = {
  editorName: string
  filteredItems: TItem[]
  items: TItem[]
  loading: boolean
  searchText: string
  selectedId: string
  selectedRowKeys: string[]
  bootstrap(userName?: string): Promise<void>
  clearSelection(): void
  closeDetail(): Promise<void>
  create(input?: ResourceCreateInput): Promise<void>
  deleteOne?(id: string): Promise<void>
  deleteSelected(): Promise<void>
  dispose(): Promise<void>
  load(): Promise<void>
  remove?(id: string): Promise<void>
  renameOne?(id: string, name: string): Promise<void>
  renameSelected(): Promise<void>
  selectAllFiltered(): void
  setEditorName(name: string): void
  setSearchText(searchText: string): void
  setSelectedRowKeys(keys: string[]): void
}

type ResourceStore<TItem extends ResourceItem> = {
  getState(): ResourceStoreState<TItem>
  setState(partial: Partial<ResourceStoreState<TItem>>): void
  subscribe(listener: () => void): unknown
}
type ResourceStoreResolver<TItem extends ResourceItem> = () => ResourceStore<TItem>
type BuilderSessionStore<TBuilder> = {
  getState?: () => {
    sessions?: Record<string, { builder: TBuilder; version: number }>
  }
  subscribe?: (listener: () => void) => unknown
}
type ModelsModule = typeof ModelsModuleExports
type ResourceSessionModule = typeof ResourceSessionModuleExports
type ResourceActions<TItem extends ResourceItem> = Pick<
  ResourceApplication<TItem>,
  'activate' | 'create' | 'delete' | 'list' | 'open' | 'rename'
> & {
  editor: Pick<ResourceEditorApplication, 'connect' | 'release'>
  records: Pick<ResourceRecordsApplication<TItem>, 'deleteSelected' | 'search' | 'select'>
}

let modelsModule: ModelsModule | null = null
let modelsModulePromise: Promise<ModelsModule> | null = null
let resourceSessionModule: ResourceSessionModule | null = null
let resourceSessionModulePromise: Promise<ResourceSessionModule> | null = null
let emitApplicationChange: (() => void) | null = null
const subscribedBuilderStores = new WeakSet<object>()

const emit = () => emitApplicationChange?.()

const subscribeBuilderStore = (store: { subscribe?: (listener: () => void) => unknown } | undefined) => {
  if (!store || subscribedBuilderStores.has(store)) return
  store.subscribe?.(emit)
  subscribedBuilderStores.add(store)
}

const loadModelsModule = async () => {
  if (modelsModule) return modelsModule
  modelsModulePromise ??= import('../../models').then((module) => {
    modelsModule = module
    subscribeBuilderStore(module.useChartBuilderModel)
    subscribeBuilderStore(module.useInsightBuilderModel)
    subscribeBuilderStore(module.useReportBuilderModel)
    emit()
    return module
  })
  return modelsModulePromise
}

const loadResourceSessionModule = async () => {
  if (resourceSessionModule) return resourceSessionModule
  resourceSessionModulePromise ??= import('../../stores/resource-session.store').then((module) => {
    resourceSessionModule = module
    return module
  })
  return resourceSessionModulePromise
}

export const bindResourceApplicationEmitter = (nextEmit: () => void) => {
  emitApplicationChange = nextEmit
  if (!modelsModule) return

  subscribeBuilderStore(modelsModule.useChartBuilderModel)
  subscribeBuilderStore(modelsModule.useInsightBuilderModel)
  subscribeBuilderStore(modelsModule.useReportBuilderModel)
}

const createResourceActions = <TItem extends ResourceItem>(
  kind: ResourceKind,
  resolveStore: ResourceStoreResolver<TItem>,
): ResourceActions<TItem> => {
  const activationLifecycle = createLatestApplicationLifecycle()
  const releaseEditor = async (id: string) => {
    const [, resourceSession] = await Promise.all([loadModelsModule(), loadResourceSessionModule()])
    await resourceSession.releaseResourceSession(kind, id)
    emit()
  }

  return {
    activate: (options) => {
      useNavigationStore.getState().go(resolveResourceListRoute(kind))
      const store = resolveStore()
      return activationLifecycle.start(
        () => store.getState().bootstrap(options?.userName),
        () => store.getState().dispose(),
      )
    },
    create: async (input?: ResourceCreateInput) => {
      const store = resolveStore()
      await store.getState().create(input)
    },
    delete: async (id) => {
      const store = resolveStore()
      const state = store.getState()
      await (state.deleteOne ?? state.remove)?.(id)
    },
    list: async () => {
      const store = resolveStore()
      await store.getState().load()
      return store.getState().items
    },
    open: async (id) => {
      useNavigationStore.getState().go(resolveResourceDetailRoute(kind, id))
    },
    rename: async (input: ResourceRenameInput) => {
      const store = resolveStore()
      const state = store.getState()
      if (state.renameOne) {
        await state.renameOne(input.id, input.name)
        return
      }
      store.setState({ editorName: input.name, selectedId: input.id } as Partial<ResourceStoreState<TItem>>)
      await store.getState().renameSelected()
    },
    editor: {
      connect: (id, userName) => {
        let connected = false
        let disposed = false
        const connection = Promise.all([loadModelsModule(), loadResourceSessionModule()])
          .then(([, resourceSession]) => resourceSession.connectResourceSession(kind, id, userName))
          .then(() => {
            connected = true
            emit()
          })
          .catch(() => undefined)

        return () => {
          if (disposed) return
          disposed = true
          void connection.then(() => (connected ? releaseEditor(id) : undefined)).catch(() => undefined)
        }
      },
      release: releaseEditor,
    },
    records: {
      deleteSelected: () => resolveStore().getState().deleteSelected(),
      search: (searchText) => resolveStore().getState().setSearchText(searchText),
      select: (ids) => resolveStore().getState().setSelectedRowKeys(ids),
    },
  }
}

const getChartStore = () => useManageChartsStore as unknown as ResourceStore<ResourceItem>
const getInsightStore = () => useManageInsightsStore as unknown as ResourceStore<InsightRecord>
const getReportStore = () => useReportsStore as unknown as ResourceStore<ResourceItem>

const chartActions = createResourceActions('chart', getChartStore)
const insightActions = createResourceActions('insight', getInsightStore)
const reportActions = createResourceActions('report', getReportStore)

const getBuilderSessions = <TBuilder>(
  store: BuilderSessionStore<TBuilder> | undefined,
): Record<string, ResourceBuilderProjection<TBuilder>> => {
  const sessions = store?.getState?.().sessions ?? {}
  return Object.fromEntries(
    Object.entries(sessions).map(([id, session]) => [id, { builder: session.builder, version: session.version }]),
  )
}

const getChartBuilderSessions = (): Record<string, ResourceBuilderProjection<VBIChartBuilder>> =>
  getBuilderSessions(modelsModule?.useChartBuilderModel as BuilderSessionStore<VBIChartBuilder> | undefined)

const getInsightBuilderSessions = (): Record<string, ResourceBuilderProjection<VBIInsightBuilder>> =>
  getBuilderSessions(modelsModule?.useInsightBuilderModel as BuilderSessionStore<VBIInsightBuilder> | undefined)

const getReportBuilderSessions = (): Record<string, ResourceBuilderProjection<VBIReportBuilder>> =>
  getBuilderSessions(modelsModule?.useReportBuilderModel as BuilderSessionStore<VBIReportBuilder> | undefined)

const createResourceApplication = <TItem extends ResourceItem, TBuilder>(
  store: ResourceStore<TItem>,
  actions: ResourceActions<TItem>,
  builderSessions: Record<string, ResourceBuilderProjection<TBuilder>>,
): ResourceApplication<TItem, TBuilder> => {
  const state = store.getState()

  return {
    activate: actions.activate,
    create: actions.create,
    delete: actions.delete,
    list: actions.list,
    open: actions.open,
    rename: actions.rename,
    editor: {
      ...actions.editor,
      builders: builderSessions,
    },
    records: {
      ...actions.records,
      loading: state.loading,
      searchText: state.searchText,
      selectedIds: state.selectedRowKeys,
      visibleItems: state.filteredItems,
    },
  }
}

export const getChartApplication = () =>
  createResourceApplication(getChartStore(), chartActions, getChartBuilderSessions())

export const getInsightApplication = () =>
  createResourceApplication(getInsightStore(), insightActions, getInsightBuilderSessions())

export const getReportApplication = () =>
  createResourceApplication(getReportStore(), reportActions, getReportBuilderSessions())
