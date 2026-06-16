import { translateVBIComponentText as t } from 'src/localization'

export type FieldRole = 'dimension' | 'measure'

export type MeasureAggregate =
  | {
      func: 'count' | 'countDistinct' | 'sum' | 'avg' | 'min' | 'max' | 'variance' | 'variancePop' | 'stddev' | 'median'
    }
  | {
      func: 'quantile'
      quantile?: number
    }

export const MEASURE_AGGREGATE_KEYS = [
  'sum',
  'count',
  'countDistinct',
  'avg',
  'min',
  'max',
  'variance',
  'variancePop',
  'stddev',
  'median',
  'quantile',
] as const

export type MeasureAggregateKey = (typeof MEASURE_AGGREGATE_KEYS)[number]

export type MeasureAggregateItem = {
  key: MeasureAggregateKey
  label: string
  shortLabel: string
  aggregate: MeasureAggregate
}

const ALL_MEASURE_AGGREGATE_ITEM_DEFS: Array<{
  key: MeasureAggregateKey
  aggregate: MeasureAggregate
}> = [
  { key: 'sum', aggregate: { func: 'sum' } },
  { key: 'count', aggregate: { func: 'count' } },
  { key: 'countDistinct', aggregate: { func: 'countDistinct' } },
  { key: 'avg', aggregate: { func: 'avg' } },
  { key: 'min', aggregate: { func: 'min' } },
  { key: 'max', aggregate: { func: 'max' } },
  { key: 'variance', aggregate: { func: 'variance' } },
  { key: 'variancePop', aggregate: { func: 'variancePop' } },
  { key: 'stddev', aggregate: { func: 'stddev' } },
  { key: 'median', aggregate: { func: 'median' } },
  { key: 'quantile', aggregate: { func: 'quantile', quantile: 0.5 } },
]

const DIMENSION_MEASURE_AGGREGATES = new Set(['count', 'countDistinct', 'min', 'max'])

export const getFieldRoleBySchemaType = (schemaType?: string): FieldRole => {
  return schemaType === 'number' ? 'measure' : 'dimension'
}

const DATE_SCHEMA_TYPES = new Set(['date', 'datetime', 'timestamp'])
export const isDateSchemaType = (schemaType?: string) => {
  if (!schemaType) return false
  return DATE_SCHEMA_TYPES.has(schemaType.toLowerCase())
}

const toTranslationKeySuffix = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export const getMeasureAggregateText = (key: MeasureAggregateKey, mode: 'label' | 'short' = 'label') => {
  return t(`aggregatesMeasure${toTranslationKeySuffix(key)}${toTranslationKeySuffix(mode)}`)
}

export const getMeasureAggregateItems = (): MeasureAggregateItem[] => {
  return ALL_MEASURE_AGGREGATE_ITEM_DEFS.map((item) => ({
    ...item,
    label: getMeasureAggregateText(item.key, 'label'),
    shortLabel: getMeasureAggregateText(item.key, 'short'),
  }))
}

export const isAggregateSupportedByFieldRole = (aggregate: MeasureAggregate, fieldRole: FieldRole) => {
  if (fieldRole === 'measure') {
    return true
  }
  return DIMENSION_MEASURE_AGGREGATES.has(aggregate.func)
}

export const getAggregateItemsByFieldRole = (fieldRole: FieldRole): MeasureAggregateItem[] => {
  return getMeasureAggregateItems().filter((item) => isAggregateSupportedByFieldRole(item.aggregate, fieldRole))
}

export const getDefaultAggregateByFieldRole = (fieldRole: FieldRole): MeasureAggregate => {
  if (fieldRole === 'dimension') {
    return { func: 'count' }
  }
  return { func: 'sum' }
}

export const formatMeasureAggregate = (aggregate: MeasureAggregate | undefined) => {
  if (!aggregate) {
    return undefined
  }

  if (aggregate.func !== 'quantile') {
    return getMeasureAggregateText(aggregate.func, 'short')
  }

  const quantile = aggregate.quantile ?? 0.5
  const percent = quantile * 100
  const normalizedPercent = Number.isInteger(percent) ? `${percent}` : `${percent.toFixed(2)}`.replace(/\.?0+$/, '')

  return `P${normalizedPercent}`
}
