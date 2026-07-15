import { createStore } from '@stencil/store'
import { type ChartBuilderStore } from './builder'

export interface ChartTypeState {
  chartType: string
}

export interface ChartTypeStore {
  state: ChartTypeState
  onChange: <Key extends keyof ChartTypeState>(propName: Key, cb: (newValue: ChartTypeState[Key]) => void) => void
  dispose: () => void
  changeChartType: (type: string) => void
  getAvailableChartTypes: () => string[]
}

export function createChartTypeStore(chartBuilder: ChartBuilderStore): ChartTypeStore {
  const {
    state,
    onChange,
    dispose: storeDispose,
  } = createStore<ChartTypeState>({
    chartType: 'table',
  })

  const updateState = () => {
    const builder = chartBuilder.builder
    if (builder && builder.chartType) {
      state.chartType = builder.chartType.getChartType()
    } else {
      state.chartType = 'table'
    }
  }

  updateState()

  const changeChartType = (type: string) => {
    const builder = chartBuilder.builder
    if (builder && builder.chartType) {
      builder.chartType.changeChartType(type)
      updateState()
    }
  }

  const getAvailableChartTypes = () => {
    const builder = chartBuilder.builder
    if (builder && builder.chartType) {
      return builder.chartType.getAvailableChartTypes()
    }
    return []
  }

  // Sync state
  let currentBuilder = chartBuilder.builder
  let unobserveChartType = currentBuilder?.chartType ? currentBuilder.chartType.observe(updateState) : undefined

  chartBuilder.onChange('dsl', () => {
    if (currentBuilder !== chartBuilder.builder) {
      unobserveChartType?.()
      currentBuilder = chartBuilder.builder
      unobserveChartType = currentBuilder.chartType.observe(updateState)
      updateState()
    }
  })

  const dispose = () => {
    unobserveChartType?.()
    unobserveChartType = undefined
    storeDispose()
  }

  return { state, onChange, dispose, changeChartType, getAvailableChartTypes }
}
