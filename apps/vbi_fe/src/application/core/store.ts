import { subscribeWithSelector } from 'zustand/middleware'
import { createStore } from 'zustand/vanilla'
import { agentApplicationStore } from '../agent/store'
import type { AgentApplication } from '../agent/contract'
import { chartApplicationStore } from '../chart/store'
import type { ChartApplication } from '../chart/contract'
import { i18nApplicationStore } from '../i18n/store'
import type { I18nApplication } from '../i18n/contract'
import type { LayoutApplication } from '../layout/contract'
import { layoutApplicationStore } from '../layout/store'
import { insightApplicationStore } from '../insight/store'
import type { InsightApplication } from '../insight/contract'
import { reportApplicationStore } from '../report/store'
import type { ReportApplication } from '../report/contract'
import type { ReportDetailApplication } from '../report-detail/contract'
import { reportDetailApplicationStore } from '../report-detail/store'
import { themeApplicationStore } from '../theme/store'
import type { ThemeApplication } from '../theme/contract'

export type ApplicationSelector<TSelected> = (state: ApplicationState) => TSelected

export type ApplicationEquality<TSelected> = (left: TSelected, right: TSelected) => boolean

export type ApplicationHookOptions<TSelected> = {
  equality?: ApplicationEquality<TSelected>
}

export type ApplicationCleanup = () => void

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

type InternalStore = {
  subscribe?: (listener: () => void) => unknown
}

const subscribedInternalStores = new WeakSet<object>()

const createApplicationState = (): ApplicationState => ({
  agent: agentApplicationStore.getState(),
  chart: chartApplicationStore.getState(),
  i18n: i18nApplicationStore.getState(),
  insight: insightApplicationStore.getState(),
  layout: layoutApplicationStore.getState(),
  report: reportApplicationStore.getState(),
  reportDetail: reportDetailApplicationStore.getState(),
  theme: themeApplicationStore.getState(),
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
  subscribeInternalStore(agentApplicationStore)
  subscribeInternalStore(chartApplicationStore)
  subscribeInternalStore(i18nApplicationStore)
  subscribeInternalStore(insightApplicationStore)
  subscribeInternalStore(layoutApplicationStore)
  subscribeInternalStore(reportApplicationStore)
  subscribeInternalStore(reportDetailApplicationStore)
  subscribeInternalStore(themeApplicationStore)
}

bindApplicationSources()

export const application = applicationStore

export type Application = typeof application
