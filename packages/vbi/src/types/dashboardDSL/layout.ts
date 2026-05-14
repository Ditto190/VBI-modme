import { z } from 'zod'
import { zVBIDashboardBreakpoint } from './breakpoint'

export const zVBIDashboardItemLayout = z.object({
  id: z.string(),
  widgetId: z.string(),
  x: z.number().int(),
  y: z.number().int(),
  w: z.number().int().positive(),
  h: z.number().int().positive(),
  static: z.boolean().optional(),
})

export const zVBIDashboardLayout = z.record(zVBIDashboardBreakpoint, z.array(zVBIDashboardItemLayout).optional())

export type VBIDashboardItemLayout = z.output<typeof zVBIDashboardItemLayout>
export type VBIDashboardLayout = z.output<typeof zVBIDashboardLayout>
