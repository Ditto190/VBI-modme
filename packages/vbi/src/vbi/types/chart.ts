import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed/types'
import type { VBIChartBuilder } from 'src/chart-builder/builder'
import type { VBIChartBuilderOptions, VBIChartDSL, VBIChartDSLInput } from 'src/types'
import type { VBIConnectorId } from 'src/types/connector/connector'

/** @description VBI 实例上的图表命名空间，负责创建图表 Builder 和空图表 DSL。 */
export interface VBIChartNamespace<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL> {
  /** @description 使用图表 DSL 创建 VBIChartBuilder。 */
  create(
    vbi: VBIChartDSLInput,
    builderOptions?: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>,
  ): VBIChartBuilder<TQueryDSL, TSeedDSL>
  /** @description 创建一个最小可用的图表 DSL。 */
  createEmpty(connectorId: VBIConnectorId, uuid?: string): VBIChartDSL
}

export type VBIChartBuilderFactory<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL> = (
  vbi: VBIChartDSLInput,
  builderOptions?: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>,
) => VBIChartBuilder<TQueryDSL, TSeedDSL>
