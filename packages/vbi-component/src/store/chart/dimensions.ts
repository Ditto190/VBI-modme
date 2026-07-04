import { createStore } from '@stencil/store'
import { type VBIDimension as CoreVBIDimension, type VBISort } from '@visactor/vbi'
import { type ChartBuilderStore } from './builder'

export type VBIDimension = CoreVBIDimension

export type DimensionNodeLike = {
  getEncoding?: () => VBIDimension['encoding']
  setEncoding: (encoding: NonNullable<VBIDimension['encoding']>) => unknown
  getSort?: () => VBISort | undefined
  setSort: (sort: VBISort) => unknown
  clearSort: () => unknown
  setAlias: (alias: string) => unknown
  setAggregate: (aggregate: NonNullable<VBIDimension['aggregate']>) => unknown
  clearAggregate?: () => unknown
}
export type DimensionNodeMutator = (node: DimensionNodeLike) => void

export interface ChartDimensionsState {
  dimensions: VBIDimension[]
}

export interface ChartDimensionsStore {
  state: ChartDimensionsState
  onChange: <Key extends keyof ChartDimensionsState>(
    propName: Key,
    cb: (newValue: ChartDimensionsState[Key]) => void,
  ) => void
  dispose: () => void
  addDimension: (field: string, callback?: DimensionNodeMutator) => void
  removeDimension: (id: string) => void
  updateDimension: (id: string, callback: DimensionNodeMutator) => void
  findDimension: (id: string) => DimensionNodeLike | undefined
}

export function createChartDimensionsStore(chartBuilder: ChartBuilderStore): ChartDimensionsStore {
  const {
    state,
    onChange,
    dispose: storeDispose,
  } = createStore<ChartDimensionsState>({
    dimensions: [],
  })

  const updateState = () => {
    const builder = chartBuilder.builder
    if (builder) {
      state.dimensions = builder.dimensions.toJSON() as VBIDimension[]
    } else {
      state.dimensions = []
    }
  }

  updateState()

  const addDimension = (field: string, callback?: DimensionNodeMutator) => {
    const builder = chartBuilder.builder
    if (builder) {
      builder.doc.transact(() => {
        builder.dimensions.add(field, (node: any) => {
          callback?.(node)
        })
      })
    }
  }

  const removeDimension = (id: string) => {
    const builder = chartBuilder.builder
    if (builder) {
      builder.doc.transact(() => {
        builder.dimensions.remove(id)
      })
    }
  }

  const updateDimension = (id: string, callback: DimensionNodeMutator) => {
    const builder = chartBuilder.builder
    if (builder) {
      builder.doc.transact(() => {
        builder.dimensions.update(id, callback as any)
      })
    }
  }

  const findDimension = (id: string): DimensionNodeLike | undefined => {
    const builder = chartBuilder.builder
    if (builder) {
      return builder.dimensions.find((node: any) => node.getId() === id) as any
    }
    return undefined
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

  return { state, onChange, dispose, addDimension, removeDimension, updateDimension, findDimension }
}
