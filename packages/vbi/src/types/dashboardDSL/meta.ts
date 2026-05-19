import { z } from 'zod'

export const zVBIDashboardMeta = z.object({
  title: z.string(),
  description: z.string().optional(),
  theme: z.enum(['dark', 'light']).default('light'),
})

export type VBIDashboardMeta = z.output<typeof zVBIDashboardMeta>
