import { createStore } from 'zustand/vanilla'
import { bindResourcesLazyApplicationEmitter, getLazyInsightApplication } from '../resources/lazy'
import type { InsightApplication } from './contract'

export const insightApplicationStore = createStore<InsightApplication>()(() => getLazyInsightApplication())

bindResourcesLazyApplicationEmitter(() => {
  insightApplicationStore.setState(getLazyInsightApplication(), true)
})
