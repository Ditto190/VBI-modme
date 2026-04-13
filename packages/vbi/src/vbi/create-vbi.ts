import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed/types'
import { connectorMap, getConnector, registerConnector } from 'src/chart-builder/connector'
import type {
  VBIChartBuilderOptions,
  VBIChartDSLInput,
  VBIInsightDSLInput,
  VBIReportBuilderOptions,
  VBIReportDSLInput,
} from 'src/types'
import { createChartBuilderFromVBIChartDSLInput } from './from/from-vbi-dsl-input'
import { createInsightBuilderFromVBIInsightDSLInput } from './from/from-vbi-insight-dsl-input'
import { createReportBuilderFromVBIReportDSLInput } from './from/from-vbi-report-dsl-input'
import { generateEmptyChartDSL } from './generate-empty-dsl'
import { generateEmptyInsightDSL } from './generate-empty-insight-dsl'
import { generateEmptyReportDSL } from './generate-empty-report-dsl'
import { generateEmptyReportPageDSL } from './generate-empty-report-page-dsl'
import { mergeBuilderOptions, mergeReportBuilderOptions } from './merge-builder-options'
import { createVBIResourceRegistry } from './resource-registry'
import type { VBIInstance } from './types'

export type { VBIInstance } from './types'

export function createVBI(): VBIInstance<DefaultVBIQueryDSL, DefaultVBISeedDSL>
export function createVBI<TQueryDSL, TSeedDSL>(
  defaultBuilderOptions: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>,
): VBIInstance<TQueryDSL, TSeedDSL>
export function createVBI<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL>(
  defaultBuilderOptions?: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>,
) {
  const resourceRegistry = createVBIResourceRegistry()

  const createChart = (vbi: VBIChartDSLInput, builderOptions?: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>) => {
    const options = mergeBuilderOptions(defaultBuilderOptions, builderOptions)
    const builder = createChartBuilderFromVBIChartDSLInput(vbi, options)
    resourceRegistry.charts.set(builder.getUUID(), builder)
    return builder
  }
  const createInsight = (insight: VBIInsightDSLInput) => {
    const builder = createInsightBuilderFromVBIInsightDSLInput(insight)
    resourceRegistry.insights.set(builder.getUUID(), builder)
    return builder
  }
  const createReport = (report: VBIReportDSLInput, builderOptions?: VBIReportBuilderOptions<TQueryDSL, TSeedDSL>) => {
    const options = mergeReportBuilderOptions(defaultBuilderOptions, builderOptions)
    return createReportBuilderFromVBIReportDSLInput(report, options, resourceRegistry)
  }

  return {
    connectorMap,
    registerConnector,
    getConnector,
    chart: {
      create: createChart,
      generateEmptyDSL: generateEmptyChartDSL,
    },
    insight: {
      create: createInsight,
      generateEmptyDSL: generateEmptyInsightDSL,
    },
    report: {
      create: createReport,
      generateEmptyDSL: generateEmptyReportDSL,
      generateEmptyPageDSL: generateEmptyReportPageDSL,
    },
  } satisfies VBIInstance<TQueryDSL, TSeedDSL>
}
