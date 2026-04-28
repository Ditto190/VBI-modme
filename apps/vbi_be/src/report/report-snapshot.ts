import type { VBIChartDSL, VBIInsightDSL, VBIReportDSL, VBIReportSnapshotDSL } from '@visactor/vbi'

type SnapshotChart = { id: string; dsl: VBIChartDSL }
type SnapshotInsight = { id: string; dsl: VBIInsightDSL }

const indexById = <T extends { id: string }>(items: T[]) =>
  items.reduce<Record<string, T>>((result, item) => {
    result[item.id] = item
    return result
  }, {})

export const buildReportSnapshot = (
  report: VBIReportDSL,
  charts: SnapshotChart[],
  insights: SnapshotInsight[],
): VBIReportSnapshotDSL => {
  const chartMap = indexById(charts)
  const insightMap = indexById(insights)
  const snapshotCharts: VBIReportSnapshotDSL['charts'] = {}
  const snapshotInsights: VBIReportSnapshotDSL['insights'] = {}

  for (const page of report.pages) {
    const chart = chartMap[page.chartId]
    if (!chart) {
      throw new Error(`Missing chart resource "${page.chartId}"`)
    }
    const insight = insightMap[page.insightId]
    if (!insight) {
      throw new Error(`Missing insight resource "${page.insightId}"`)
    }
    snapshotCharts[page.chartId] = chart.dsl
    snapshotInsights[page.insightId] = insight.dsl
  }

  return {
    report,
    charts: snapshotCharts,
    insights: snapshotInsights,
  }
}
