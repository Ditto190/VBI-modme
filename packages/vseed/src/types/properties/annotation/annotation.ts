import { z } from 'zod'
import { zAnnotationPoint } from './zAnnotationPoint'
import { zAnnotationVerticalLine } from './zAnnotationVerticalLine'
import { zAnnotationHorizontalLine } from './zAnnotationHorizontalLine'
import { zAnnotationArea } from './zAnnotationArea'
import { zAnnotationDifferenceLine } from './zAnnotationDifferenceLine'

export const zAnnotation = z.object({
  annotationPoint: zAnnotationPoint.or(z.array(zAnnotationPoint)).nullish(),
  annotationVerticalLine: zAnnotationVerticalLine.or(z.array(zAnnotationVerticalLine)).nullish(),
  annotationHorizontalLine: zAnnotationHorizontalLine.or(z.array(zAnnotationHorizontalLine)).nullish(),
  annotationArea: zAnnotationArea.or(z.array(zAnnotationArea)).nullish(),
  annotationDifferenceLine: zAnnotationDifferenceLine.or(z.array(zAnnotationDifferenceLine)).nullish(),
})

export type Annotation = z.infer<typeof zAnnotation>
