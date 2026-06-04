import type { ResourceItem } from '../../types'
import { runLazyCommand, runLazyLifecycleCommand, subscribeLazyStore } from '../core/lazy'
import type { ApplicationCleanup } from '../core/store'
import type * as ResourcesModuleExports from './application'
import type { ChartApplication, InsightApplication, ReportApplication, ResourceApplication } from './contract'

type ResourcesModule = typeof ResourcesModuleExports

const emitApplicationChangeListeners = new Set<() => void>()
let resourcesModule: ResourcesModule | null = null
let resourcesModulePromise: Promise<ResourcesModule> | null = null

const subscribedStores = new WeakSet<object>()
const emit = () => {
  emitApplicationChangeListeners.forEach((listener) => listener())
}

const loadResourcesModule = async () => {
  if (resourcesModule) return resourcesModule
  resourcesModulePromise ??= import('./application').then(async (module) => {
    resourcesModule = module
    module.bindResourceApplicationEmitter(emit)
    const [
      { useManageChartsStore },
      { useManageInsightsStore },
      { useReportsStore },
      { useChartBuilderModel, useInsightBuilderModel, useReportBuilderModel },
    ] = await Promise.all([
      import('../../stores/manage-charts.store'),
      import('../../stores/manage-insights.store'),
      import('../../stores/reports.store'),
      import('../../models'),
    ])
    subscribeLazyStore(useManageChartsStore, emit, subscribedStores)
    subscribeLazyStore(useManageInsightsStore, emit, subscribedStores)
    subscribeLazyStore(useReportsStore, emit, subscribedStores)
    subscribeLazyStore(useChartBuilderModel, emit, subscribedStores)
    subscribeLazyStore(useInsightBuilderModel, emit, subscribedStores)
    subscribeLazyStore(useReportBuilderModel, emit, subscribedStores)
    emit()
    return module
  })
  return resourcesModulePromise
}

const runResourceCommand = async <TItem extends ResourceItem, TApplication extends ResourceApplication<TItem>, TResult>(
  getApplication: (module: ResourcesModule) => TApplication,
  command: (application: TApplication) => TResult | Promise<TResult>,
) => runLazyCommand(loadResourcesModule, getApplication, command)

const runResourceLifecycleCommand = <TItem extends ResourceItem, TApplication extends ResourceApplication<TItem>>(
  getApplication: (module: ResourcesModule) => TApplication,
  command: (application: TApplication) => ApplicationCleanup,
): ApplicationCleanup => runLazyLifecycleCommand(loadResourcesModule, getApplication, command)

const createLazyResourceApplication = <TItem extends ResourceItem>(
  getApplication: (module: ResourcesModule) => ResourceApplication<TItem>,
): ResourceApplication<TItem> => ({
  activate: (options) => {
    return runResourceLifecycleCommand(getApplication, (application) => application.activate(options))
  },
  create: (input) => runResourceCommand(getApplication, (application) => application.create(input)),
  delete: (id) => runResourceCommand(getApplication, (application) => application.delete(id)),
  list: () => runResourceCommand(getApplication, (application) => application.list()),
  open: (id) => runResourceCommand(getApplication, (application) => application.open(id)),
  rename: (input) => runResourceCommand(getApplication, (application) => application.rename(input)),
  editor: {
    builders: {},
    connect: (id, userName) =>
      runResourceLifecycleCommand(getApplication, (application) => application.editor.connect(id, userName)),
    release: (id) => runResourceCommand(getApplication, (application) => application.editor.release(id)),
  },
  records: {
    loading: false,
    searchText: '',
    selectedIds: [],
    visibleItems: [],
    activate: (options) =>
      runResourceLifecycleCommand(getApplication, (application) => application.records.activate(options)),
    deleteSelected: () => runResourceCommand(getApplication, (application) => application.records.deleteSelected()),
    search: (searchText) => {
      void runResourceCommand(getApplication, (application) => application.records.search(searchText))
    },
    select: (ids) => {
      void runResourceCommand(getApplication, (application) => application.records.select(ids))
    },
  },
})

const lazyChartApplication = createLazyResourceApplication((module) => module.getChartApplication())
const lazyInsightApplication = createLazyResourceApplication((module) => module.getInsightApplication())
const lazyReportApplication = createLazyResourceApplication((module) => module.getReportApplication())

export const bindResourcesLazyApplicationEmitter = (nextEmit: () => void) => {
  emitApplicationChangeListeners.add(nextEmit)
  resourcesModule?.bindResourceApplicationEmitter(emit)
}

export const getLazyChartApplication = (): ChartApplication =>
  (resourcesModule?.getChartApplication() ?? lazyChartApplication) as ChartApplication

export const getLazyInsightApplication = (): InsightApplication =>
  (resourcesModule?.getInsightApplication() ?? lazyInsightApplication) as InsightApplication

export const getLazyReportApplication = (): ReportApplication =>
  (resourcesModule?.getReportApplication() ?? lazyReportApplication) as ReportApplication
