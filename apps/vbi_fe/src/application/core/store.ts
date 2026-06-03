import type { AgentApplication } from '../agent/contract'
import type { I18nApplication, ThemeApplication } from '../preferences/contract'
import type { ReportDetailApplication } from '../report-detail/contract'
import type { ChartApplication, InsightApplication, ReportApplication } from '../resources/contract'
import { getApplicationSnapshot, subscribeApplicationSelector, subscribeApplicationSnapshot } from './subscribe'

export type ApplicationSelector<TSelected> = (state: ApplicationState) => TSelected

export type ApplicationEquality<TSelected> = (left: TSelected, right: TSelected) => boolean

export type ApplicationSubscribeOptions<TSelected> = {
  equality?: ApplicationEquality<TSelected>
  fireImmediately?: boolean
}

export type ApplicationHookOptions<TSelected> = {
  equality?: ApplicationEquality<TSelected>
}

export type ApplicationUnsubscribe = () => void

export type ApplicationCleanup = () => void

export type ApplicationStore = {
  getState(): ApplicationState
  select<TSelected>(selector: ApplicationSelector<TSelected>): TSelected
  subscribe(listener: () => void): ApplicationUnsubscribe
  subscribe<TSelected>(
    selector: ApplicationSelector<TSelected>,
    listener: (selected: TSelected, previous: TSelected) => void,
    options?: ApplicationSubscribeOptions<TSelected>,
  ): ApplicationUnsubscribe
}

export type UseApplication = <TSelected>(
  selector: ApplicationSelector<TSelected>,
  options?: ApplicationHookOptions<TSelected>,
) => TSelected

export type ApplicationModuleContext = {
  emit(): void
  getState(): ApplicationState
}

export type ApplicationModuleFactory<TModule> = (context: ApplicationModuleContext) => TModule

export type ApplicationState = {
  agent: AgentApplication
  chart: ChartApplication
  i18n: I18nApplication
  insight: InsightApplication
  report: ReportApplication
  reportDetail: ReportDetailApplication
  theme: ThemeApplication
}

export type Application = ApplicationState & ApplicationStore

const storeApi = {
  getState: getApplicationSnapshot,
  select: <TSelected>(selector: ApplicationSelector<TSelected>) => selector(getApplicationSnapshot()),
  subscribe: <TSelected>(
    selectorOrListener: ApplicationSelector<TSelected> | (() => void),
    listener?: (selected: TSelected, previous: TSelected) => void,
    options?: ApplicationSubscribeOptions<TSelected>,
  ) => {
    if (listener)
      return subscribeApplicationSelector(selectorOrListener as ApplicationSelector<TSelected>, listener, options)
    return subscribeApplicationSnapshot(selectorOrListener as () => void)
  },
}

export const application = Object.defineProperties(storeApi, {
  agent: { get: () => getApplicationSnapshot().agent },
  chart: { get: () => getApplicationSnapshot().chart },
  i18n: { get: () => getApplicationSnapshot().i18n },
  insight: { get: () => getApplicationSnapshot().insight },
  report: { get: () => getApplicationSnapshot().report },
  reportDetail: { get: () => getApplicationSnapshot().reportDetail },
  theme: { get: () => getApplicationSnapshot().theme },
}) as Application
