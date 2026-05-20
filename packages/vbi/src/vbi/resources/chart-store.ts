import type { VBIChartBuilder } from 'src/chart-builder/builder'
import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed/types'
import type { VBIChartBuilderOptions, VBIChartDSL } from 'src/types'
import { createChartBuilderFromVBIChartDSLInput } from '../from/from-vbi-dsl-input'
import { createResourceStore, type ResourceStore } from './resource-store'

export type ChartStore<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL> = ResourceStore<
  VBIChartBuilder<TQueryDSL, TSeedDSL>,
  VBIChartDSL,
  VBIChartBuilderOptions<TQueryDSL, TSeedDSL>
>

export const createChartStore = <TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL>() => {
  return createResourceStore<
    VBIChartBuilder<TQueryDSL, TSeedDSL>,
    VBIChartDSL,
    VBIChartBuilderOptions<TQueryDSL, TSeedDSL>
  >((dsl, options) => createChartBuilderFromVBIChartDSLInput<TQueryDSL, TSeedDSL>(dsl, options))
}
