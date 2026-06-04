import { subscribeWithSelector } from 'zustand/middleware'
import { createStore, type Mutate, type StoreApi } from 'zustand/vanilla'
import { useAgentConversationsStore } from '../../stores/agent-conversations.store'
import { useAppPreferencesStore } from '../../stores/app-preferences.store'
import { useManageSidebarStore } from '../../stores/manage-sidebar.store'
import { useNavigationStore } from '../../stores/navigation.store'
import { useWorkspaceSidePanelStore } from '../../stores/workspace-side-panel.store'
import type { AgentApplication } from '../agent/contract'
import { bindAgentLazyApplicationEmitter, getLazyAgentApplication } from '../agent/lazy'
import type { LayoutApplication } from '../layout/contract'
import { getLayoutApplication } from '../layout/application'
import type { I18nApplication, ThemeApplication } from '../preferences/contract'
import { getI18nApplication, getThemeApplication } from '../preferences/application'
import type { ReportDetailApplication } from '../report-detail/contract'
import { bindReportDetailLazyApplicationEmitter, getLazyReportDetailApplication } from '../report-detail/lazy'
import type { ChartApplication, InsightApplication, ReportApplication } from '../resources/contract'
import {
  bindResourcesLazyApplicationEmitter,
  getLazyChartApplication,
  getLazyInsightApplication,
  getLazyReportApplication,
} from '../resources/lazy'

export type ApplicationSelector<TSelected> = (state: ApplicationState) => TSelected

export type ApplicationEquality<TSelected> = (left: TSelected, right: TSelected) => boolean

export type ApplicationSubscribeOptions<TSelected> = {
  equalityFn?: ApplicationEquality<TSelected>
  fireImmediately?: boolean
}

export type ApplicationHookOptions<TSelected> = {
  equality?: ApplicationEquality<TSelected>
}

export type ApplicationUnsubscribe = () => void

export type ApplicationCleanup = () => void

export type ApplicationStore = Mutate<StoreApi<ApplicationState>, [['zustand/subscribeWithSelector', never]]>

export type UseApplication = <TSelected>(
  selector: ApplicationSelector<TSelected>,
  options?: ApplicationHookOptions<TSelected>,
) => TSelected

export type ApplicationState = {
  agent: AgentApplication
  chart: ChartApplication
  i18n: I18nApplication
  insight: InsightApplication
  layout: LayoutApplication
  report: ReportApplication
  reportDetail: ReportDetailApplication
  theme: ThemeApplication
}

export type Application = ApplicationStore

type InternalStore = {
  subscribe?: (listener: () => void) => unknown
}

const subscribedInternalStores = new WeakSet<object>()

const createApplicationState = (): ApplicationState => ({
  agent: getLazyAgentApplication(),
  chart: getLazyChartApplication(),
  i18n: getI18nApplication(),
  insight: getLazyInsightApplication(),
  layout: getLayoutApplication(),
  report: getLazyReportApplication(),
  reportDetail: getLazyReportDetailApplication(),
  theme: getThemeApplication(),
})

const applicationStore = createStore<ApplicationState>()(subscribeWithSelector(() => createApplicationState()))

export const refreshApplicationState = () => {
  applicationStore.setState(createApplicationState(), true)
}

const subscribeInternalStore = (store: InternalStore | undefined) => {
  if (!store || subscribedInternalStores.has(store)) return
  store.subscribe?.(refreshApplicationState)
  subscribedInternalStores.add(store)
}

const bindApplicationSources = () => {
  bindAgentLazyApplicationEmitter(refreshApplicationState)
  bindResourcesLazyApplicationEmitter(refreshApplicationState)
  bindReportDetailLazyApplicationEmitter(refreshApplicationState)
  subscribeInternalStore(useAgentConversationsStore)
  subscribeInternalStore(useAppPreferencesStore)
  subscribeInternalStore(useManageSidebarStore)
  subscribeInternalStore(useNavigationStore)
  subscribeInternalStore(useWorkspaceSidePanelStore)
}

bindApplicationSources()

export const application = applicationStore as Application
