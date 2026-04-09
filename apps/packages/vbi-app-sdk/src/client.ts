import type { ChartProvider, InsightProvider, ReportProvider } from './providers'
import type { VBIPlatformClient, VBIPlatformClientConfig } from './types'

export const createVBIPlatformClient = (config: VBIPlatformClientConfig): VBIPlatformClient => ({
  chart: (id: string): ChartProvider => config.chartProvider(id),
  insight: (id: string): InsightProvider => config.insightProvider(id),
  report: (id: string): ReportProvider => config.reportProvider(id),
})
