import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed/types'
import type { VBIChartBuilder } from 'src/chart-builder/builder'
import type { VBIChartBuilderOptions, VBIChartDSLInput } from 'src/types'
import type { createEmptyChart } from '../create-empty-chart'

export interface VBIChartNamespace<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL> {
  create: (
    vbi: VBIChartDSLInput,
    builderOptions?: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>,
  ) => VBIChartBuilder<TQueryDSL, TSeedDSL>
  createEmpty: typeof createEmptyChart
}

export type VBIChartBuilderFactory<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL> = (
  vbi: VBIChartDSLInput,
  builderOptions?: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>,
) => VBIChartBuilder<TQueryDSL, TSeedDSL>
