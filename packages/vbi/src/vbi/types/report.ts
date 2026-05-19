import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed/types'
import type { VBIReportBuilder } from 'src/report-builder/builder'
import type { VBIReportBuilderOptions, VBIReportDSLInput } from 'src/types'
import type { createEmptyReport } from '../create-empty-report'
import type { createEmptyReportPage } from '../create-empty-report-page'

export interface VBIReportNamespace<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL> {
  create: (
    report: VBIReportDSLInput,
    builderOptions?: VBIReportBuilderOptions<TQueryDSL, TSeedDSL>,
  ) => VBIReportBuilder<TQueryDSL, TSeedDSL>
  createEmpty: typeof createEmptyReport
  createEmptyPage: typeof createEmptyReportPage
}
