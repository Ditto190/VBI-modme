import { useMemo } from 'react'
import type { VBIDimension, VBIChartBuilder } from '@visactor/vbi'

import { useBuilderObserver } from '../internal'

export type UseDimensionsConfig = {
  aggregate?: NonNullable<VBIDimension['aggregate']> | null
  alias?: VBIDimension['alias']
  encoding?: NonNullable<VBIDimension['encoding']>
}

export interface UseDimensionsReturn {
  addDimension: (field: string, config?: UseDimensionsConfig) => void
  dimensions: VBIDimension[]
  removeDimension: (id: string) => void
  updateDimension: (id: string, config: UseDimensionsConfig) => void
}

export function useDimensions(builder: VBIChartBuilder): UseDimensionsReturn {
  const serializedDimensions = useBuilderObserver(
    (callback) => builder.dimensions.observe(() => callback()),
    () => JSON.stringify(builder.dimensions.toJSON()),
  )
  const dimensions = useMemo(() => JSON.parse(serializedDimensions) as VBIDimension[], [serializedDimensions])

  return {
    addDimension: (field, config = {}) => {
      builder.dimensions.add(field, (node) => {
        if (config.alias !== undefined) {
          node.setAlias(config.alias)
        }
        if (config.encoding !== undefined) {
          node.setEncoding(config.encoding)
        }
        if (config.aggregate !== undefined && config.aggregate !== null) {
          node.setAggregate(config.aggregate)
        }
      })
    },
    dimensions,
    removeDimension: (id) => {
      builder.dimensions.remove(id)
    },
    updateDimension: (id, config) => {
      builder.dimensions.update(id, (node) => {
        if (config.alias !== undefined) {
          node.setAlias(config.alias)
        }
        if (config.encoding !== undefined) {
          node.setEncoding(config.encoding)
        }
        if (config.aggregate === null) {
          node.clearAggregate()
        } else if (config.aggregate !== undefined) {
          node.setAggregate(config.aggregate)
        }
      })
    },
  }
}
