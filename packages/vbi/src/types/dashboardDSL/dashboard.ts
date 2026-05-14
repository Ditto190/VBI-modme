import { z } from 'zod'
import { zVBIDashboardBreakpoints } from './breakpoint'
import { zVBIDashboardLayout } from './layout'
import { zVBIDashboardMeta } from './meta'
import { zVBIDashboardWidget } from './widget'

export const zVBIDashboardDSL = z.object({
  uuid: z.string().optional().default(''),
  widgets: z.array(zVBIDashboardWidget).optional().default([]),
  breakpoints: zVBIDashboardBreakpoints,
  layout: zVBIDashboardLayout,
  meta: zVBIDashboardMeta,
  version: z.number().int().min(0).optional().default(0),
})

export type VBIDashboardDSLInput = z.input<typeof zVBIDashboardDSL>
export type VBIDashboardDSL = z.output<typeof zVBIDashboardDSL>
