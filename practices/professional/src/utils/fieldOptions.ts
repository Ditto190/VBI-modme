import type { VBIDimension, VBIMeasure, VBIMeasureFormat, VBISort } from '@visactor/vbi'
import type { MappedField } from 'src/types'

export type MeasureAggregate = NonNullable<VBIMeasure['aggregate']>
export type DimensionAggregate = NonNullable<VBIDimension['aggregate']>
export type FormatPreset = { format?: VBIMeasureFormat; key: string; labelKey: string }

export const sortOptions = [
  { label: 'None', value: 'none' },
  { label: 'Asc', value: 'asc' },
  { label: 'Desc', value: 'desc' },
]

export const measureAggregateOptions: Array<{ label: string; value: MeasureAggregate['func'] }> = [
  { label: 'Sum', value: 'sum' },
  { label: 'Count', value: 'count' },
  { label: 'Distinct', value: 'countDistinct' },
  { label: 'Avg', value: 'avg' },
  { label: 'Min', value: 'min' },
  { label: 'Max', value: 'max' },
  { label: 'Median', value: 'median' },
  { label: 'P50', value: 'quantile' },
]

export const dateAggregateOptions: Array<{ label: string; value: DimensionAggregate['func'] | 'none' }> = [
  { label: 'Raw', value: 'none' },
  { label: 'Year', value: 'toYear' },
  { label: 'Quarter', value: 'toQuarter' },
  { label: 'Month', value: 'toMonth' },
  { label: 'Week', value: 'toWeek' },
  { label: 'Day', value: 'toDay' },
]

export const formatPresets: FormatPreset[] = [
  { format: { autoFormat: true }, key: 'auto', labelKey: 'menuAutoFormat' },
  { format: { type: 'number', fractionDigits: 2 }, key: 'number-2', labelKey: 'formatNumber2' },
  { format: { type: 'percent', fractionDigits: 1 }, key: 'percent-1', labelKey: 'formatPercent1' },
  {
    format: { type: 'number', prefix: '\u00A5', ratio: 10000, symbol: '\u4E07', fractionDigits: 2 },
    key: 'cny-wan',
    labelKey: 'formatCnyWan',
  },
  {
    format: { type: 'number', prefix: '$', ratio: 1000, symbol: 'K', fractionDigits: 2 },
    key: 'usd-k',
    labelKey: 'formatUsdK',
  },
  { format: { type: 'scientific', fractionDigits: 3 }, key: 'scientific-3', labelKey: 'formatScientific3' },
  { key: 'clear', labelKey: 'menuRaw' },
]

export const toMeasureAggregate = (func: MeasureAggregate['func']): MeasureAggregate =>
  func === 'quantile' ? { func, quantile: 0.5 } : { func }

export const getFormatPreset = (key: string) => formatPresets.find((preset) => preset.key === key)

export const toSort = (order: string): VBISort | undefined =>
  order === 'asc' || order === 'desc' ? { order } : undefined

export const aggregateValue = (field: MappedField) =>
  field.aggregate?.func ?? (field.role === 'measure' ? 'sum' : 'none')
export const sortValue = (field: MappedField) => field.sort?.order ?? 'none'
