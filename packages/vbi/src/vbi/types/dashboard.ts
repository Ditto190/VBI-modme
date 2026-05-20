import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed/types'
import type { VBIDashboardBuilder } from 'src/dashboard-builder/builder'
import type { VBIDashboardBuilderOptions, VBIDashboardDSL, VBIDashboardDSLInput } from 'src/types'

/** @description VBI 实例上的仪表盘命名空间，负责创建 Dashboard Builder 和空 dashboard DSL。 */
export interface VBIDashboardNamespace<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL> {
  /** @description 使用 dashboard DSL 创建 VBIDashboardBuilder。 */
  create(
    dashboard: VBIDashboardDSLInput,
    builderOptions?: VBIDashboardBuilderOptions<TQueryDSL, TSeedDSL>,
  ): VBIDashboardBuilder<TQueryDSL, TSeedDSL>
  /** @description 创建一个空 dashboard DSL。 */
  createEmpty(uuid?: string): VBIDashboardDSL
}
