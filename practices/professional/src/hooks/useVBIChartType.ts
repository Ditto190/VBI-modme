import { useCallback } from 'react'
import type { VBIChartBuilder } from '@visactor/vbi'
import { useBuilderDocState } from './useBuilderDocState'

const HIDDEN_CHART_TYPE_ENTRIES = new Set(['boxPlot', 'histogram'])

export const useVBIChartType = (builder: VBIChartBuilder | undefined) => {
  const chartType = useBuilderDocState({
    builder,
    fallback: 'table',
    getSnapshot: (activeBuilder) => activeBuilder.chartType.getChartType(),
  })

  const changeChartType = useCallback((type: string) => builder?.chartType.changeChartType(type), [builder])

  return {
    chartType,
    changeChartType,
    availableChartTypes:
      builder?.chartType.getAvailableChartTypes().filter((type) => !HIDDEN_CHART_TYPE_ENTRIES.has(type)) ?? [],
  }
}
