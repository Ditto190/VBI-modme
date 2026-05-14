import { z } from 'zod'

export const zVBIDashboardBreakpoint = z.enum(['xxl', 'xl', 'lg', 'md', 'sm', 'xs'])

export const zVBIDashboardBreakpoints = z.record(zVBIDashboardBreakpoint, z.number().int())

export const VBIDashboardDefaultBreakpoints = {
  xxl: 1600,
  xl: 1200,
  lg: 992,
  md: 768,
  sm: 576,
  xs: 0,
} as const

export type VBIDashboardBreakpoint = z.output<typeof zVBIDashboardBreakpoint>
export type VBIDashboardBreakpoints = z.output<typeof zVBIDashboardBreakpoints>
