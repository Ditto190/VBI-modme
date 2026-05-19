import type { VBIChartDSL, VBIChartDSLInput, VBIInsightDSL, VBIInsightDSLInput } from 'src/types'

export interface VBIResourceNamespace {
  registerChart: (chart: VBIChartDSLInput) => VBIChartDSL
  registerInsight: (insight: VBIInsightDSLInput) => VBIInsightDSL
  register: (resources: { charts?: VBIChartDSLInput[]; insights?: VBIInsightDSLInput[] }) => {
    charts: VBIChartDSL[]
    insights: VBIInsightDSL[]
  }
}
