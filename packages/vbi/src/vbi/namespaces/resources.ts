import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed/types'
import { zVBIChartDSL } from 'src/types/chartDSL/vbi/vbi'
import { zVBIInsightDSL } from 'src/types/insightDSL/insight'
import type { VBIResourceRegistry } from '../resources/resource-registry'
import type { VBIResourceNamespace } from '../types'

export const createVBIResourceNamespace = <TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL>(
  resourceRegistry: VBIResourceRegistry<TQueryDSL, TSeedDSL>,
): VBIResourceNamespace => {
  const chart: VBIResourceNamespace['chart'] = {
    register: (vbi) => {
      const chart = zVBIChartDSL.parse(vbi)
      if (!chart.uuid) {
        throw new Error('Chart resource requires a uuid')
      }
      resourceRegistry.charts.registerDSL(chart.uuid, chart)
      return chart
    },
    get: (uuid) => resourceRegistry.charts.build(uuid),
    list: () => resourceRegistry.charts.entries().map(([, chart]) => chart),
    has: (uuid) => resourceRegistry.charts.has(uuid),
    unregister: (uuid) => resourceRegistry.charts.delete(uuid),
  }

  const insight: VBIResourceNamespace['insight'] = {
    register: (insight) => {
      const normalized = zVBIInsightDSL.parse(insight)
      if (!normalized.uuid) {
        throw new Error('Insight resource requires a uuid')
      }
      resourceRegistry.insights.registerDSL(normalized.uuid, normalized)
      return normalized
    },
    get: (uuid) => resourceRegistry.insights.build(uuid),
    list: () => resourceRegistry.insights.entries().map(([, insight]) => insight),
    has: (uuid) => resourceRegistry.insights.has(uuid),
    unregister: (uuid) => resourceRegistry.insights.delete(uuid),
  }

  return {
    chart,
    insight,
    register: (resources) => ({
      charts: resources.charts?.map(chart.register) ?? [],
      insights: resources.insights?.map(insight.register) ?? [],
    }),
    clear: () => {
      resourceRegistry.charts.clear()
      resourceRegistry.insights.clear()
    },
    snapshot: () => ({
      charts: Object.fromEntries(resourceRegistry.charts.entries()),
      insights: Object.fromEntries(resourceRegistry.insights.entries()),
    }),
  }
}
