import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed/types'
import type { VBIChartBuilderOptions, VBIReportBuilderOptions } from 'src/types'
import { createEmptyReport } from '../create-empty-report'
import { createEmptyReportPage } from '../create-empty-report-page'
import { createReportBuilderFromVBIReportDSLInput } from '../from/from-vbi-report-dsl-input'
import type { VBIResourceRegistry } from '../resources/resource-registry'
import type { VBIReportNamespace } from '../types'
import { mergeChartBuilderOptions } from './chart'

const mergeReportBuilderOptions = <TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL>(
  base?: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>,
  overrides?: VBIReportBuilderOptions<TQueryDSL, TSeedDSL>,
) => {
  const chart = mergeChartBuilderOptions(base, overrides?.chart)
  return chart ? { chart } : undefined
}

export const createVBIReportNamespace = <TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL>(
  defaultBuilderOptions: VBIChartBuilderOptions<TQueryDSL, TSeedDSL> | undefined,
  resourceRegistry: VBIResourceRegistry<TQueryDSL, TSeedDSL>,
): VBIReportNamespace<TQueryDSL, TSeedDSL> => ({
  create: (report, builderOptions) => {
    const options = mergeReportBuilderOptions(defaultBuilderOptions, builderOptions)
    return createReportBuilderFromVBIReportDSLInput(report, options, resourceRegistry)
  },
  createEmpty: createEmptyReport,
  createEmptyPage: createEmptyReportPage,
})
