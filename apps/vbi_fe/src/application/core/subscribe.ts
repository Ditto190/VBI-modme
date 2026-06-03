import { useAgentConversationsStore } from '../../stores/agent-conversations.store'
import { useAgentPanelStore } from '../../stores/agent-panel.store'
import { useAppPreferencesStore } from '../../stores/app-preferences.store'
import { useManageSidebarStore } from '../../stores/manage-sidebar.store'
import { useNavigationStore } from '../../stores/navigation.store'
import { getLazyAgentApplication, bindAgentLazyApplicationEmitter } from '../agent/lazy'
import { getLayoutApplication } from '../layout/application'
import { getI18nApplication, getThemeApplication } from '../preferences/application'
import { getLazyReportDetailApplication, bindReportDetailLazyApplicationEmitter } from '../report-detail/lazy'
import {
  bindResourcesLazyApplicationEmitter,
  getLazyChartApplication,
  getLazyInsightApplication,
  getLazyReportApplication,
} from '../resources/lazy'
import { applicationObjectIs } from './equality'
import type {
  ApplicationEquality,
  ApplicationSelector,
  ApplicationState,
  ApplicationSubscribeOptions,
  ApplicationUnsubscribe,
} from './store'

type InternalStore = {
  subscribe?: (listener: () => void) => unknown
}

let snapshot: ApplicationState | null = null
const listeners = new Set<() => void>()
let storesSubscribed = false

const subscribeInternalStore = (store: InternalStore | undefined) => {
  store?.subscribe?.(emitApplicationChange)
}

const createSnapshot = (): ApplicationState => ({
  agent: getLazyAgentApplication(),
  chart: getLazyChartApplication(),
  i18n: getI18nApplication(),
  insight: getLazyInsightApplication(),
  layout: getLayoutApplication(),
  report: getLazyReportApplication(),
  reportDetail: getLazyReportDetailApplication(),
  theme: getThemeApplication(),
})

const subscribeAllInternalStores = () => {
  if (storesSubscribed) return
  storesSubscribed = true
  bindAgentLazyApplicationEmitter(emitApplicationChange)
  bindResourcesLazyApplicationEmitter(emitApplicationChange)
  bindReportDetailLazyApplicationEmitter(emitApplicationChange)
  subscribeInternalStore(useAgentConversationsStore)
  subscribeInternalStore(useAgentPanelStore)
  subscribeInternalStore(useAppPreferencesStore)
  subscribeInternalStore(useManageSidebarStore)
  subscribeInternalStore(useNavigationStore)
}

export const getApplicationSnapshot = () => {
  subscribeAllInternalStores()
  snapshot ??= createSnapshot()
  return snapshot
}

export const emitApplicationChange = () => {
  snapshot = createSnapshot()
  listeners.forEach((listener) => listener())
}

export const subscribeApplicationSnapshot = (listener: () => void): ApplicationUnsubscribe => {
  subscribeAllInternalStores()
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export const subscribeApplicationSelector = <TSelected>(
  selector: ApplicationSelector<TSelected>,
  listener: (selected: TSelected, previous: TSelected) => void,
  options: ApplicationSubscribeOptions<TSelected> = {},
): ApplicationUnsubscribe => {
  const equality: ApplicationEquality<TSelected> = options.equality ?? applicationObjectIs
  let previous = selector(getApplicationSnapshot())

  if (options.fireImmediately) listener(previous, previous)

  return subscribeApplicationSnapshot(() => {
    const selected = selector(getApplicationSnapshot())
    if (equality(selected, previous)) return
    const last = previous
    previous = selected
    listener(selected, last)
  })
}
