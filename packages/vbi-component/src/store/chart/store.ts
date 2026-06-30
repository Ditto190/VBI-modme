import { type VBIChartBuilder } from '@visactor/vbi'
import { createChartBuilderStore, type ChartBuilderStore } from './builder'

export interface ChartStore {
  chartBuilder: ChartBuilderStore
}

export function createChartStore(builder: VBIChartBuilder): ChartStore {
  return {
    chartBuilder: createChartBuilderStore(builder),
  }
}
