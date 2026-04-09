import type { ChartProvider, InsightProvider, ReportProvider } from './providers'

export interface VBIPlatformClient {
  chart(id: string): ChartProvider
  insight(id: string): InsightProvider
  report(id: string): ReportProvider
}

export interface VBIPlatformClientConfig {
  chartProvider(id: string): ChartProvider
  insightProvider(id: string): InsightProvider
  reportProvider(id: string): ReportProvider
}
