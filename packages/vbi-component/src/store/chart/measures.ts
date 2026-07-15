import { createStore } from '@stencil/store'
import { type VBIMeasure as CoreVBIMeasure, type VBIMeasureFormat, type VBISort } from '@visactor/vbi'
import { type ChartBuilderStore } from './builder'

export type VBIMeasure = Omit<CoreVBIMeasure, 'encoding' | 'aggregate'> & {
  encoding?: CoreVBIMeasure['encoding']
  aggregate?: CoreVBIMeasure['aggregate']
}

export type MeasureNodeLike = {
  getEncoding?: () => VBIMeasure['encoding']
  setEncoding: (encoding: NonNullable<VBIMeasure['encoding']>) => unknown
  getSort?: () => VBISort | undefined
  setSort: (sort: VBISort) => unknown
  clearSort: () => unknown
  setAlias: (alias: string) => unknown
  setAggregate: (aggregate: NonNullable<VBIMeasure['aggregate']>) => unknown
  setFormat: (format: VBIMeasureFormat) => unknown
  getFormat?: () => VBIMeasureFormat | undefined
  clearFormat: () => unknown
}

export type MeasureNodeMutator = (node: MeasureNodeLike) => void

export interface ChartMeasuresState {
  measures: VBIMeasure[]
}

export interface ChartMeasuresStore {
  state: ChartMeasuresState
  onChange: <Key extends keyof ChartMeasuresState>(
    propName: Key,
    cb: (newValue: ChartMeasuresState[Key]) => void,
  ) => void
  dispose: () => void
  addMeasure: (field: string, callback?: MeasureNodeMutator) => void
  removeMeasure: (id: string) => void
  updateMeasure: (id: string, callback: MeasureNodeMutator) => void
  findMeasure: (id: string) => MeasureNodeLike | undefined
}

export function createChartMeasuresStore(chartBuilder: ChartBuilderStore): ChartMeasuresStore {
  const {
    state,
    onChange,
    dispose: storeDispose,
  } = createStore<ChartMeasuresState>({
    measures: [],
  })

  const updateState = () => {
    const builder = chartBuilder.builder
    if (builder) {
      state.measures = builder.measures.toJSON() as VBIMeasure[]
    } else {
      state.measures = []
    }
  }

  updateState()

  const addMeasure = (field: string, callback?: MeasureNodeMutator) => {
    const builder = chartBuilder.builder
    if (builder) {
      builder.doc.transact(() => {
        builder.measures.add(field, (node: any) => {
          callback?.(node)
        })
      })
    }
  }

  const removeMeasure = (id: string) => {
    const builder = chartBuilder.builder
    if (builder) {
      builder.doc.transact(() => {
        builder.measures.remove(id)
      })
    }
  }

  const updateMeasure = (id: string, callback: MeasureNodeMutator) => {
    const builder = chartBuilder.builder
    if (builder) {
      builder.doc.transact(() => {
        builder.measures.update(id, callback as any)
      })
    }
  }

  const findMeasure = (id: string): MeasureNodeLike | undefined => {
    const builder = chartBuilder.builder
    if (builder) {
      return builder.measures.find((node: any) => node.getId() === id) as any
    }
    return undefined
  }

  // Sync state
  let currentBuilder = chartBuilder.builder
  let unobserveMeasures = currentBuilder?.measures ? currentBuilder.measures.observe(updateState) : undefined

  chartBuilder.onChange('dsl', () => {
    if (currentBuilder !== chartBuilder.builder) {
      unobserveMeasures?.()
      updateState()
      currentBuilder = chartBuilder.builder
      unobserveMeasures = currentBuilder.measures.observe(updateState)
    }
  })

  const dispose = () => {
    unobserveMeasures?.()
    unobserveMeasures = undefined
    storeDispose()
  }

  return { state, onChange, dispose, addMeasure, removeMeasure, updateMeasure, findMeasure }
}
