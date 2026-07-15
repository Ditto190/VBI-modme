import { createStore } from '@stencil/store'
import { type ChartBuilderStore } from './builder'

export type FilterRootType = 'where' | 'having'
export type FilterRootOperator = 'and' | 'or'

export const FILTER_ROOT_KEY = {
  where: 'whereFilter',
  having: 'havingFilter',
} as const

export interface ChartFilterRootOperatorState {
  whereOperator: FilterRootOperator
  havingOperator: FilterRootOperator
}

export interface ChartFilterRootOperatorStore {
  state: ChartFilterRootOperatorState
  onChange: <Key extends keyof ChartFilterRootOperatorState>(
    propName: Key,
    cb: (newValue: ChartFilterRootOperatorState[Key]) => void,
  ) => void
  dispose: () => void
  getOperator: (type: FilterRootType) => FilterRootOperator
  setOperator: (type: FilterRootType, nextOperator: FilterRootOperator) => void
}

export function createChartFilterRootOperatorStore(chartBuilder: ChartBuilderStore): ChartFilterRootOperatorStore {
  const {
    state,
    onChange,
    dispose: storeDispose,
  } = createStore<ChartFilterRootOperatorState>({
    whereOperator: 'and',
    havingOperator: 'and',
  })

  const updateState = () => {
    const builder = chartBuilder.builder
    if (builder) {
      state.whereOperator = builder.whereFilter.toJSON().op === 'or' ? 'or' : 'and'
      state.havingOperator = builder.havingFilter.toJSON().op === 'or' ? 'or' : 'and'
    } else {
      state.whereOperator = 'and'
      state.havingOperator = 'and'
    }
  }

  updateState()

  const getOperator = (type: FilterRootType): FilterRootOperator => {
    return type === 'where' ? state.whereOperator : state.havingOperator
  }

  const setOperator = (type: FilterRootType, nextOperator: FilterRootOperator) => {
    const builder = chartBuilder.builder
    if (!builder) {
      return
    }

    const currentOperator = getOperator(type)
    if (nextOperator === currentOperator) {
      return
    }

    builder.doc.transact(() => {
      const rootNode = builder.dsl.get(FILTER_ROOT_KEY[type]) as
        | { set: (key: string, value: unknown) => void }
        | undefined
      rootNode?.set('op', nextOperator)
    })
  }

  let currentBuilder = chartBuilder.builder

  const onDocUpdate = () => {
    updateState()
  }

  if (currentBuilder && currentBuilder.doc) {
    currentBuilder.doc.on('update', onDocUpdate)
  }

  chartBuilder.onChange('dsl', () => {
    if (currentBuilder !== chartBuilder.builder) {
      if (currentBuilder && currentBuilder.doc) {
        currentBuilder.doc.off('update', onDocUpdate)
      }
      currentBuilder = chartBuilder.builder
      if (currentBuilder && currentBuilder.doc) {
        currentBuilder.doc.on('update', onDocUpdate)
      }
    }
    updateState()
  })

  const dispose = () => {
    if (currentBuilder && currentBuilder.doc) {
      currentBuilder.doc.off('update', onDocUpdate)
    }
    storeDispose()
  }

  return {
    state,
    onChange,
    dispose,
    getOperator,
    setOperator,
  }
}
