import { z } from 'zod'

const zRegionPaddingObject = z
  .object({
    top: z.number().nonnegative().nullish(),
    right: z.number().nonnegative().nullish(),
    bottom: z.number().nonnegative().nullish(),
    left: z.number().nonnegative().nullish(),
  })
  .partial()

export const zRegionPadding = z.number().nonnegative().or(zRegionPaddingObject)
