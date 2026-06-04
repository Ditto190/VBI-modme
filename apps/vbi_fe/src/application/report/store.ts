import { createStore } from 'zustand/vanilla'
import { bindResourcesLazyApplicationEmitter, getLazyReportApplication } from '../resources/lazy'
import type { ReportApplication } from './contract'

export const reportApplicationStore = createStore<ReportApplication>()(() => getLazyReportApplication())

bindResourcesLazyApplicationEmitter(() => {
  reportApplicationStore.setState(getLazyReportApplication(), true)
})
