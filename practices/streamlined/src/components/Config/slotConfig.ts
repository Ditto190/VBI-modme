import type { VBIDimension, VBIMeasure, VBIChartBuilder } from '@visactor/vbi'
import { getEncodingTitle } from './encodingLabels'
import type { StreamLabels } from 'src/i18n'
import type { FieldSlot } from 'src/types'

type DimensionEncoding = NonNullable<VBIDimension['encoding']>
type MeasureEncoding = NonNullable<VBIMeasure['encoding']>

type SlotDefinition = Omit<FieldSlot, 'accepts' | 'title'> & {
  dimensionEncoding?: DimensionEncoding
  measureEncoding?: MeasureEncoding
}
type VisibleSlot = FieldSlot

const slotDefinitions: SlotDefinition[] = [
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
  { dimensionEncoding: 'source' },
  { dimensionEncoding: 'target' },
  { dimensionEncoding: 'tooltip', measureEncoding: 'tooltip' },
  { dimensionEncoding: 'label', measureEncoding: 'label' },
  { dimensionEncoding: 'player' },
  { dimensionEncoding: 'hierarchy' },
  { dimensionEncoding: 'detail', measureEncoding: 'detail' },
  { dimensionEncoding: 'row' },
  { dimensionEncoding: 'column', measureEncoding: 'column' },
]
const facetEncodings = new Set(['row', 'column'])
const tableChartTypes = new Set(['table', 'pivotTable'])

const isFacetSlot = (slot: FieldSlot, chartType: string) => {
  if (tableChartTypes.has(chartType)) return false
  return Boolean(
    (slot.dimensionEncoding && facetEncodings.has(slot.dimensionEncoding)) ||
    (slot.measureEncoding && facetEncodings.has(slot.measureEncoding)),
  )
}

const getAllSlots = (builder: VBIChartBuilder, labels: StreamLabels) => {
  const dimensionEncodings = builder.chartType.getSupportedDimensionEncodings()
  const measureEncodings = builder.chartType.getSupportedMeasureEncodings()

  return slotDefinitions.flatMap<VisibleSlot>((slot) => {
    const accepts: FieldSlot['accepts'] = [
      ...(slot.dimensionEncoding && dimensionEncodings.includes(slot.dimensionEncoding) ? ['dimension' as const] : []),
      ...(slot.measureEncoding && measureEncodings.includes(slot.measureEncoding) ? ['measure' as const] : []),
    ]
    const visibleSlot = {
      dimensionEncoding: accepts.includes('dimension') ? slot.dimensionEncoding : undefined,
      measureEncoding: accepts.includes('measure') ? slot.measureEncoding : undefined,
    }

    return accepts.length ? [{ ...visibleSlot, accepts, title: getEncodingTitle(labels, visibleSlot) }] : []
  })
}

export const getEncodingSlots = (builder: VBIChartBuilder, labels: StreamLabels) => {
  const chartType = builder.build().chartType
  return getAllSlots(builder, labels).filter((slot) => !isFacetSlot(slot, chartType))
}

export const getFacetSlots = (builder: VBIChartBuilder, labels: StreamLabels) => {
  const chartType = builder.build().chartType
  return getAllSlots(builder, labels).filter((slot) => isFacetSlot(slot, chartType))
}

export const getVisibleSlots = (builder: VBIChartBuilder, labels: StreamLabels) => {
  return [...getEncodingSlots(builder, labels), ...getFacetSlots(builder, labels)]
}
