import { type VBIChartBuilder } from '@visactor/vbi'
import { createTranslationStore, type TranslationStore } from 'src/i18n'
import { createChartBuilderStore, type ChartBuilderStore } from './builder'
import { createChartConfigStore, type ChartConfigStore } from './config'

export interface ChartStore {
  chartBuilder: ChartBuilderStore
  chartConfig: ChartConfigStore
  translation: TranslationStore
  initialize: (nextBuilder?: VBIChartBuilder) => () => void
}

export function createChartStore(builder: VBIChartBuilder): ChartStore {
  const chartBuilder = createChartBuilderStore(builder)
  const chartConfig = createChartConfigStore(chartBuilder)
  const translation = createTranslationStore(chartBuilder)

  const initialize = (nextBuilder: VBIChartBuilder = builder) => {
    chartBuilder.initialize(nextBuilder)
    return () => {
      chartBuilder.dispose()
      chartConfig.dispose()
      translation.dispose()
    }
  }

  return {
    chartBuilder,
    chartConfig,
    translation,
    initialize,
  }
}
