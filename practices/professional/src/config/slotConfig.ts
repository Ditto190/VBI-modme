import type { VBIDimension, VBIMeasure, VBIChartBuilder } from '@visactor/vbi'
import type { FieldSlot } from 'src/types'
import { getEncodingTitle } from './encodingLabels'

type DimensionEncoding = NonNullable<VBIDimension['encoding']>
type MeasureEncoding = NonNullable<VBIMeasure['encoding']>
type SlotDefinition = { dimensionEncoding?: DimensionEncoding; measureEncoding?: MeasureEncoding }

const slots: SlotDefinition[] = [
  { dimensionEncoding: 'xAxis', measureEncoding: 'xAxis' },
  { dimensionEncoding: 'yAxis', measureEncoding: 'yAxis' },
  { measureEncoding: 'primaryYAxis' },
  { measureEncoding: 'secondaryYAxis' },
  { dimensionEncoding: 'angle', measureEncoding: 'angle' },
  { measureEncoding: 'radius' },
  { measureEncoding: 'size' },
  { measureEncoding: 'value' },
  { measureEncoding: 'q1' },
  { measureEncoding: 'q3' },
  { measureEncoding: 'min' },
  { measureEncoding: 'max' },
  { measureEncoding: 'median' },
  { measureEncoding: 'outliers' },
  { measureEncoding: 'x0' },
  { measureEncoding: 'x1' },
  { dimensionEncoding: 'color', measureEncoding: 'color' },
  { dimensionEncoding: 'tooltip', measureEncoding: 'tooltip' },
  { dimensionEncoding: 'label', measureEncoding: 'label' },
  { dimensionEncoding: 'player' },
  { dimensionEncoding: 'hierarchy' },
  { dimensionEncoding: 'detail', measureEncoding: 'detail' },
  { dimensionEncoding: 'row' },
  { dimensionEncoding: 'column', measureEncoding: 'column' },
]

export const getFieldSlots = (builder: VBIChartBuilder): FieldSlot[] => {
  const dimensionEncodings = builder.chartType.getSupportedDimensionEncodings()
  const measureEncodings = builder.chartType.getSupportedMeasureEncodings()

  return slots.flatMap((slot) => {
    const accepts: FieldSlot['accepts'] = [
      ...(slot.dimensionEncoding && dimensionEncodings.includes(slot.dimensionEncoding) ? ['dimension' as const] : []),
      ...(slot.measureEncoding && measureEncodings.includes(slot.measureEncoding) ? ['measure' as const] : []),
    ]
    if (!accepts.length) return []
    const visibleSlot = {
      accepts,
      dimensionEncoding: accepts.includes('dimension') ? slot.dimensionEncoding : undefined,
      measureEncoding: accepts.includes('measure') ? slot.measureEncoding : undefined,
    }
    return [{ ...visibleSlot, title: getEncodingTitle(visibleSlot) }]
  })
}
