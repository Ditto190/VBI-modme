import { createStore } from 'zustand/vanilla'
import { bindResourcesLazyApplicationEmitter, getLazyChartApplication } from '../resources/lazy'
import type { ChartApplication } from './contract'

export const chartApplicationStore = createStore<ChartApplication>()(() => getLazyChartApplication())

bindResourcesLazyApplicationEmitter(() => {
  chartApplicationStore.setState(getLazyChartApplication(), true)
})
