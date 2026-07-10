import { type VBIChartBuilder } from '@visactor/vbi'
import { createTranslationStore, type TranslationStore } from 'src/i18n'
import { createChartBuilderStore, type ChartBuilderStore } from './builder'
import { createChartConfigStore, type ChartConfigStore } from './config'
import { createChartDimensionsStore, type ChartDimensionsStore } from './dimensions'
import { createChartMeasuresStore, type ChartMeasuresStore } from './measures'
import { createChartSchemaFieldsStore, type ChartSchemaFieldsStore } from './schema-fields'
import { createChartTypeStore, type ChartTypeStore } from './type'
import { createChartUndoStore, type ChartUndoStore } from './undo'
import { createChartVSeedStore, type ChartVSeedStore } from './vseed'
import { createChartWhereFilterStore, type ChartWhereFilterStore } from './where-filter'

export interface ChartStore {
  chartBuilder: ChartBuilderStore
  chartConfig: ChartConfigStore
  chartUndo: ChartUndoStore
  chartType: ChartTypeStore
  chartDimensions: ChartDimensionsStore
  chartMeasures: ChartMeasuresStore
  chartSchemaFields: ChartSchemaFieldsStore
  chartVSeed: ChartVSeedStore
  chartWhereFilter: ChartWhereFilterStore
  translation: TranslationStore
  initialize: (nextBuilder?: VBIChartBuilder) => () => void
}

export function createChartStore(builder: VBIChartBuilder): ChartStore {
  const chartBuilder = createChartBuilderStore(builder)
  const chartConfig = createChartConfigStore(chartBuilder)
  const chartUndo = createChartUndoStore(chartBuilder)
  const chartType = createChartTypeStore(chartBuilder)
  const chartDimensions = createChartDimensionsStore(chartBuilder)
  const chartMeasures = createChartMeasuresStore(chartBuilder)
  const chartSchemaFields = createChartSchemaFieldsStore(chartBuilder)
  const chartVSeed = createChartVSeedStore(chartBuilder, chartConfig)
  const chartWhereFilter = createChartWhereFilterStore(chartBuilder)
  const translation = createTranslationStore(chartBuilder)

  const initialize = (nextBuilder: VBIChartBuilder = builder) => {
    chartBuilder.initialize(nextBuilder)
    return () => {
      chartBuilder.dispose()
      chartConfig.dispose()
      chartUndo.dispose()
      chartType.dispose()
      chartDimensions.dispose()
      chartMeasures.dispose()
      chartSchemaFields.dispose()
      chartVSeed.dispose()
      chartWhereFilter.dispose()
      translation.dispose()
    }
  }

  return {
    chartBuilder,
    chartConfig,
    chartUndo,
    chartType,
    chartDimensions,
    chartMeasures,
    chartSchemaFields,
    chartVSeed,
    chartWhereFilter,
    translation,
    initialize,
  }
}
