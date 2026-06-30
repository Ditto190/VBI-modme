import { type VBIChartBuilder } from '@visactor/vbi'
import { createChartBuilderStore, type ChartBuilderStore } from './builder'
import { createChartConfigStore, type ChartConfigStore } from './config'

export interface ChartStore {
  chartBuilder: ChartBuilderStore
  chartConfig: ChartConfigStore
}

export function createChartStore(builder: VBIChartBuilder): ChartStore {
  return {
    chartBuilder: createChartBuilderStore(builder),
    chartConfig: createChartConfigStore(),
  }
}
