import { createRemoteChartProvider } from './chart/remote-provider'
import { createRemoteInsightProvider } from './insight/remote-provider'
import { createRemoteReportProvider } from './report/remote-provider'
import { requestRemote } from './remote/http'
import type { ChartSummary, InsightSummary, ReportSummary, VBIProviderClient, VBIProviderClientOptions } from './types'

export const createVBIProviderClient = (config: VBIProviderClientOptions): VBIProviderClient => {
  return {
    chart: (id?: string) => createRemoteChartProvider(config, id),
    insight: (id?: string) => createRemoteInsightProvider(config, id),
    report: (id?: string) => createRemoteReportProvider(config, id),
    listCharts: () => requestRemote<ChartSummary[]>(config, '/charts'),
    listInsights: () => requestRemote<InsightSummary[]>(config, '/insights'),
    listReports: () => requestRemote<ReportSummary[]>(config, '/reports'),
  }
}
