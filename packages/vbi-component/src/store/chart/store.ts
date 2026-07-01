import { type VBIChartBuilder } from '@visactor/vbi'
import { createChartBuilderStore, type ChartBuilderStore } from './builder'
import { createChartConfigStore, type ChartConfigStore } from './config'

export interface ChartStore {
  chartBuilder: ChartBuilderStore
  chartConfig: ChartConfigStore
  initialize: (nextBuilder?: VBIChartBuilder) => () => void
}

export function createChartStore(builder: VBIChartBuilder): ChartStore {
  const chartBuilder = createChartBuilderStore(builder)
  const chartConfig = createChartConfigStore(chartBuilder)

  const initialize = (nextBuilder: VBIChartBuilder = builder) => {
    chartBuilder.initialize(nextBuilder)
    return () => {
      chartBuilder.dispose()
      chartConfig.dispose()
    }
  }

  return {
    chartBuilder,
    chartConfig,
    initialize,
  }
}
