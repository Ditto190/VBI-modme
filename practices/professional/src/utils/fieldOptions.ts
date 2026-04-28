import type { VBIDimension, VBIMeasure, VBISort } from '@visactor/vbi'
import type { MappedField } from 'src/types'

export type MeasureAggregate = NonNullable<VBIMeasure['aggregate']>
export type DimensionAggregate = NonNullable<VBIDimension['aggregate']>

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

export const toMeasureAggregate = (func: MeasureAggregate['func']): MeasureAggregate =>
  func === 'quantile' ? { func, quantile: 0.5 } : { func }

export const toSort = (order: string): VBISort | undefined =>
  order === 'asc' || order === 'desc' ? { order } : undefined

export const aggregateValue = (field: MappedField) =>
  field.aggregate?.func ?? (field.role === 'measure' ? 'sum' : 'none')
export const sortValue = (field: MappedField) => field.sort?.order ?? 'none'
