import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed/types'
import type { VBIReportDSL, VBIReportSnapshotDSL } from 'src/types'
import type { VBIResourceRegistry } from 'src/vbi/resources'

export const buildVBIReportSnapshotDSL = <TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL>(
  report: VBIReportDSL,
  resourceRegistry: VBIResourceRegistry<TQueryDSL, TSeedDSL>,
): VBIReportSnapshotDSL => {
  const charts: VBIReportSnapshotDSL['charts'] = {}
  const insights: VBIReportSnapshotDSL['insights'] = {}

  for (const page of report.pages) {
    const chart = resourceRegistry.charts.build(page.chartId)
    if (!chart) {
      throw new Error(`Missing chart resource "${page.chartId}"`)
    }
    const insight = resourceRegistry.insights.build(page.insightId)
    if (!insight) {
      throw new Error(`Missing insight resource "${page.insightId}"`)
    }
    charts[page.chartId] = chart
    insights[page.insightId] = insight
  }

  return { report, charts, insights }
}
