import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed/types'
import type { VBIChartBuilderOptions } from 'src/types'
import { createEmptyChart } from '../create-empty-chart'
import { createChartBuilderFromVBIChartDSLInput } from '../from/from-vbi-dsl-input'
import type { VBIResourceRegistry } from '../resources/resource-registry'
import type { VBIChartNamespace } from '../types'

export const mergeChartBuilderOptions = <TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL>(
  base?: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>,
  overrides?: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>,
) => {
  if (!base) {
    return overrides
  }
  if (!overrides) {
    return base
  }
  return {
    ...base,
    ...overrides,
    adapters: {
      ...base.adapters,
      ...overrides.adapters,
    },
  }
}

export const createVBIChartNamespace = <TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL>(
  defaultBuilderOptions: VBIChartBuilderOptions<TQueryDSL, TSeedDSL> | undefined,
  resourceRegistry: VBIResourceRegistry<TQueryDSL, TSeedDSL>,
): VBIChartNamespace<TQueryDSL, TSeedDSL> => ({
  create: (vbi, builderOptions) => {
    const options = mergeChartBuilderOptions(defaultBuilderOptions, builderOptions)
    const builder = createChartBuilderFromVBIChartDSLInput<TQueryDSL, TSeedDSL>(vbi, options)
    resourceRegistry.charts.registerBuilder(builder.getUUID(), builder)
    return builder
  },
  createEmpty: createEmptyChart,
})
