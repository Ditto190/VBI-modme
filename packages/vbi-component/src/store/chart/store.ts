import { type VBIChartBuilder } from '@visactor/vbi'
import { createTranslationStore, type TranslationStore } from 'src/i18n'
import { createChartBuilderStore, type ChartBuilderStore } from './builder'
import { createChartConfigStore, type ChartConfigStore } from './config'
import { createChartUndoStore, type ChartUndoStore } from './undo'
import { createChartTypeStore, type ChartTypeStore } from './type'

export interface ChartStore {
  chartBuilder: ChartBuilderStore
  chartConfig: ChartConfigStore
  chartUndo: ChartUndoStore
  chartType: ChartTypeStore
  translation: TranslationStore
  initialize: (nextBuilder?: VBIChartBuilder) => () => void
}

export function createChartStore(builder: VBIChartBuilder): ChartStore {
  const chartBuilder = createChartBuilderStore(builder)
  const chartConfig = createChartConfigStore(chartBuilder)
  const chartUndo = createChartUndoStore(chartBuilder)
  const chartType = createChartTypeStore(chartBuilder)
  const translation = createTranslationStore(chartBuilder)

  const initialize = (nextBuilder: VBIChartBuilder = builder) => {
    chartBuilder.initialize(nextBuilder)
    return () => {
      chartBuilder.dispose()
      chartConfig.dispose()
      chartUndo.dispose()
      chartType.dispose()
      translation.dispose()
    }
  }

  return {
    chartBuilder,
    chartConfig,
    chartUndo,
    chartType,
    translation,
    initialize,
  }
}
