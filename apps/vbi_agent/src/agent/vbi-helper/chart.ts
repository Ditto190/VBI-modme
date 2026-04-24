import type { VBIProviderClient } from '@visactor/vbi-provider'

export const createChartHelpers = (client: VBIProviderClient) => ({
  changeChartType: (builder: { chartType: { changeChartType(chartType: string): void } }, chartType: string) => {
    builder.chartType.changeChartType(chartType)
    return chartType
  },
  chart: (id?: string) => client.chart(id),
  getBuilder: (provider: { open(): Promise<unknown> }) => provider.open(),
  getChartState: (builder: {
    build(): unknown
    chartType: { getAvailableChartTypes(): string[]; getChartType(): string }
    dimensions: { toJSON(): unknown[] }
    measures: { toJSON(): unknown[] }
  }) => ({
    availableChartTypes: builder.chartType.getAvailableChartTypes(),
    chartType: builder.chartType.getChartType(),
    dimensions: builder.dimensions.toJSON(),
    dsl: builder.build(),
    measures: builder.measures.toJSON(),
  }),
  openChart: async (id?: string) => {
    const provider = client.chart(id)
    const builder = await provider.open()
    return { builder, provider }
  },
  openInsight: async (id?: string) => {
    const provider = client.insight(id)
    const builder = await provider.open()
    return { builder, provider }
  },
  openReport: async (id?: string) => {
    const provider = client.report(id)
    const builder = await provider.open()
    return { builder, provider }
  },
  insight: (id?: string) => client.insight(id),
  report: (id?: string) => client.report(id),
})
