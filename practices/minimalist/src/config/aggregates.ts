export const measureAggregates = ['sum', 'count', 'countDistinct', 'avg', 'min', 'max', 'median'] as const

export const dateAggregates = ['toYear', 'toQuarter', 'toMonth', 'toWeek', 'toDay'] as const

export type MeasureAggregate = (typeof measureAggregates)[number]

export type DateAggregate = (typeof dateAggregates)[number]

export const measureOptions = measureAggregates.map((value) => ({ label: value, value }))

export const dateOptions = (rawLabel: string) => [
  { label: rawLabel, value: 'raw' },
  ...dateAggregates.map((value) => ({ label: value.replace('to', ''), value })),
]

export const normalizeMeasureAggregate = (func?: string): MeasureAggregate => {
  return measureAggregates.includes(func as MeasureAggregate) ? (func as MeasureAggregate) : 'sum'
}
