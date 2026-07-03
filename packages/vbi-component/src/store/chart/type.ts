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

  let currentBuilder = chartBuilder.builder

  const onDslUpdate = () => {
    updateState()
  }

  if (currentBuilder && currentBuilder.dsl) {
    currentBuilder.dsl.observe(onDslUpdate)
  }

  chartBuilder.onChange('dsl', () => {
    if (currentBuilder !== chartBuilder.builder) {
      if (currentBuilder && currentBuilder.dsl) {
        currentBuilder.dsl.unobserve(onDslUpdate)
      }
      currentBuilder = chartBuilder.builder
      if (currentBuilder && currentBuilder.dsl) {
        currentBuilder.dsl.observe(onDslUpdate)
      }
    }
    updateState()
  })

  const dispose = () => {
    if (currentBuilder && currentBuilder.dsl) {
      currentBuilder.dsl.unobserve(onDslUpdate)
    }
    storeDispose()
  }

  return { state, onChange, dispose, changeChartType, getAvailableChartTypes }
}
