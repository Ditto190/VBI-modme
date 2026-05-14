import { z } from 'zod'

export const zVBIDashboardBaseWidget = z.object({
  id: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
})

export const zVBIDashboardChartWidget = zVBIDashboardBaseWidget.extend({
  type: z.literal('chart'),
  chartId: z.string(),
})

export const zVBIDashboardInsightWidget = zVBIDashboardBaseWidget.extend({
  type: z.literal('insight'),
  insightId: z.string(),
})

export const zVBIDashboardWidget = z.discriminatedUnion('type', [zVBIDashboardChartWidget, zVBIDashboardInsightWidget])

export type VBIDashboardWidget = z.output<typeof zVBIDashboardWidget>
