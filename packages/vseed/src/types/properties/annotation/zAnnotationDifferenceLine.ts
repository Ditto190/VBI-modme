import { z } from 'zod'
import { zDimensionSelector, zMeasureSelector, zPartialSelector } from '../../dataSelector'

export const zDifferenceSelector = z.union([zPartialSelector, zMeasureSelector, zDimensionSelector])
export const zDifferenceSelectors = z.array(zDifferenceSelector)

export const zDifferenceAnchor = z.object({
  selector: z.union([zDifferenceSelector, zDifferenceSelectors]),
})

export const zAnnotationDifferenceLine = z.object({
  start: zDifferenceAnchor,
  end: zDifferenceAnchor,
  differenceType: z.enum(['absolute', 'percent']).nullish(),
  textFontSize: z.number().nullish(),
  textColor: z.string().nullish(),
  textBackgroundColor: z.string().nullish(),
  lineColor: z.string().nullish(),
  lineStyle: z.enum(['solid', 'dashed', 'dotted']).nullish(),
})
