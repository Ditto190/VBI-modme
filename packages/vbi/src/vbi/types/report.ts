import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed/types'
import type { VBIReportBuilder } from 'src/report-builder/builder'
import type { VBIReportBuilderOptions, VBIReportDSL, VBIReportDSLInput, VBIReportPageDSL } from 'src/types'

/** @description VBI 实例上的报表命名空间，负责创建 Report Builder、空报表和空页面。 */
export interface VBIReportNamespace<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL> {
  /** @description 使用 report DSL 创建 VBIReportBuilder。 */
  create(
    report: VBIReportDSLInput,
    builderOptions?: VBIReportBuilderOptions<TQueryDSL, TSeedDSL>,
  ): VBIReportBuilder<TQueryDSL, TSeedDSL>
  /** @description 创建一个空 report DSL。 */
  createEmpty(uuid?: string): VBIReportDSL
  /** @description 创建一个空 report page DSL。 */
  createEmptyPage(pageId?: string): VBIReportPageDSL
}
