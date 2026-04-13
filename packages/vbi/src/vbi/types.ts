import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed/types'
import type { VBIChartBuilder } from 'src/chart-builder/builder'
import type { VBIInsightBuilder } from 'src/insight-builder/builder'
import type { VBIReportBuilder } from 'src/report-builder/builder'
import type {
  VBIChartBuilderOptions,
  VBIChartDSLInput,
  VBIInsightDSLInput,
  VBIReportBuilderOptions,
  VBIReportDSLInput,
} from 'src/types'
import type { connectorMap, getConnector, registerConnector } from 'src/chart-builder/connector'
import type { generateEmptyChartDSL } from './generate-empty-dsl'
import type { generateEmptyInsightDSL } from './generate-empty-insight-dsl'
import type { generateEmptyReportDSL } from './generate-empty-report-dsl'
import type { generateEmptyReportPageDSL } from './generate-empty-report-page-dsl'

export interface VBIChartNamespace<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL> {
  create: (
    vbi: VBIChartDSLInput,
    builderOptions?: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>,
  ) => VBIChartBuilder<TQueryDSL, TSeedDSL>
  generateEmptyDSL: typeof generateEmptyChartDSL
}

export interface VBIInsightNamespace {
  create: (insight: VBIInsightDSLInput) => VBIInsightBuilder
  generateEmptyDSL: typeof generateEmptyInsightDSL
}

export interface VBIReportNamespace<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL> {
  create: (
    report: VBIReportDSLInput,
    builderOptions?: VBIReportBuilderOptions<TQueryDSL, TSeedDSL>,
  ) => VBIReportBuilder<TQueryDSL, TSeedDSL>
  generateEmptyDSL: typeof generateEmptyReportDSL
  generateEmptyPageDSL: typeof generateEmptyReportPageDSL
}

export type VBIChartBuilderFactory<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL> = (
  vbi: VBIChartDSLInput,
  builderOptions?: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>,
) => VBIChartBuilder<TQueryDSL, TSeedDSL>

export interface VBIInstance<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL> {
  connectorMap: typeof connectorMap
  registerConnector: typeof registerConnector
  getConnector: typeof getConnector
  chart: VBIChartNamespace<TQueryDSL, TSeedDSL>
  insight: VBIInsightNamespace
  report: VBIReportNamespace<TQueryDSL, TSeedDSL>
}
