import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed/types'
import { zVBIChartDSL } from 'src/types/chartDSL/vbi/vbi'
import { zVBIInsightDSL } from 'src/types/insightDSL/insight'
import type { VBIResourceRegistry } from '../resources'
import type { VBIResourceNamespace } from '../types'

export const createVBIResourceNamespace = <TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL>(
  resourceRegistry: VBIResourceRegistry<TQueryDSL, TSeedDSL>,
): VBIResourceNamespace => {
  const registerChart: VBIResourceNamespace['registerChart'] = (vbi) => {
    const chart = zVBIChartDSL.parse(vbi)
    if (!chart.uuid) {
      throw new Error('Chart resource requires a uuid')
    }
    resourceRegistry.charts.registerDSL(chart.uuid, chart)
    return chart
  }
  const registerInsight: VBIResourceNamespace['registerInsight'] = (insight) => {
    const normalized = zVBIInsightDSL.parse(insight)
    if (!normalized.uuid) {
      throw new Error('Insight resource requires a uuid')
    }
    resourceRegistry.insights.registerDSL(normalized.uuid, normalized)
    return normalized
  }

  return {
    registerChart,
    registerInsight,
    register: (resources) => ({
      charts: resources.charts?.map(registerChart) ?? [],
      insights: resources.insights?.map(registerInsight) ?? [],
    }),
  }
}
