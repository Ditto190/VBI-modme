import type { VBIWhereDatePredicate } from '@visactor/vbi'
import { type Translate } from 'src/i18n'
import { getDateFilterDisplayText, isDateFilter } from './date-filter-utils'

export type WhereFilterFieldRole = 'dimension' | 'measure' | string

export type WhereFilterRangeValue = {
  min?: unknown
  max?: unknown
  leftOp?: '<' | '<='
  rightOp?: '<' | '<='
}

export type WhereFilterLike = {
  id?: string
  field: string
  operator?: string
  op?: string
  value?: unknown
}

export type WhereFilterInputStrategy = 'none' | 'range' | 'tags' | 'number' | 'text'

const OPERATOR_ALIASES: Record<string, string> = {
  eq: '=',
  ne: '!=',
  neq: '!=',
  gt: '>',
  gte: '>=',
  lt: '<',
  lte: '<=',
}

const NO_VALUE_OPERATORS = new Set(['is null', 'is not null'])
const RANGE_OPERATORS = new Set(['between', 'not between'])
const TAG_OPERATORS = new Set(['in', 'not in'])

const FILTER_OPERATOR_KEYS: Record<string, string> = {
  '=': 'eq',
  '!=': 'ne',
  '>': 'gt',
  '>=': 'gte',
  '<': 'lt',
  '<=': 'lte',
  in: 'in',
  'not in': 'notIn',
  like: 'like',
  'not like': 'notLike',
  ilike: 'ilike',
  'not ilike': 'notIlike',
  between: 'between',
  'not between': 'notBetween',
  'is null': 'isNull',
  'is not null': 'isNotNull',
}

const DIMENSION_OPERATOR_VALUES = [
  '=',
  '!=',
  'in',
  'not in',
  'like',
  'not like',
  'ilike',
  'not ilike',
  'is null',
  'is not null',
] as const

const MEASURE_OPERATOR_VALUES = [
  '=',
  '!=',
  '>',
  '>=',
  '<',
  '<=',
  'in',
  'not in',
  'between',
  'not between',
  'is null',
  'is not null',
] as const

export function normalizeWhereOperator(operator?: string): string {
  if (!operator) {
    return '='
  }
  return OPERATOR_ALIASES[operator] ?? operator
}

export function getFilterOperatorKey(operator?: string): string {
  return FILTER_OPERATOR_KEYS[normalizeWhereOperator(operator)] ?? 'eq'
}

const toTranslationKeySuffix = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function getFilterOperatorOptionLabel(operator: string, t: Translate): string {
  const key = `filtersOperators${toTranslationKeySuffix(getFilterOperatorKey(operator))}Option`
  const result = t(key)
  return result && result !== key ? result : operator
}

export function getFilterOperatorDisplayLabel(operator: string, t: Translate): string {
  const key = `filtersOperators${toTranslationKeySuffix(getFilterOperatorKey(operator))}Display`
  const result = t(key)
  return result && result !== key ? result : operator
}

export function getWhereOperatorOptions(role: WhereFilterFieldRole, t: Translate) {
  const values = role === 'measure' ? MEASURE_OPERATOR_VALUES : DIMENSION_OPERATOR_VALUES

  return values.map((value) => ({
    label: getFilterOperatorOptionLabel(value, t),
    value,
  }))
}

export function getWhereFilterInputStrategy(
  operator: string | undefined,
  fieldRole: WhereFilterFieldRole,
): WhereFilterInputStrategy {
  const normalizedOperator = normalizeWhereOperator(operator)

  if (NO_VALUE_OPERATORS.has(normalizedOperator)) {
    return 'none'
  }
  if (RANGE_OPERATORS.has(normalizedOperator)) {
    return 'range'
  }
  if (TAG_OPERATORS.has(normalizedOperator)) {
    return 'tags'
  }
  if (fieldRole === 'measure') {
    return 'number'
  }
  return 'text'
}

function isRangeObject(value: unknown): value is WhereFilterRangeValue {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function normalizeWhereRangeValue(value: unknown): WhereFilterRangeValue {
  if (Array.isArray(value)) {
    return {
      min: value[0],
      max: value[1],
      leftOp: '<=',
      rightOp: '<=',
    }
  }

  if (isRangeObject(value)) {
    return {
      min: value.min,
      max: value.max,
      leftOp: value.leftOp === '<' ? '<' : '<=',
      rightOp: value.rightOp === '<' ? '<' : '<=',
    }
  }

  return {
    min: undefined,
    max: undefined,
    leftOp: '<=',
    rightOp: '<=',
  }
}

function parseNumericValue(value: unknown) {
  if (value === undefined || value === null || value === '') {
    return undefined
  }
  if (typeof value === 'number') {
    return value
  }

  const parsed = Number(String(value).trim())
  return Number.isNaN(parsed) ? value : parsed
}

function parseTagValues(value: unknown, fieldRole: WhereFilterFieldRole) {
  const rawValues = Array.isArray(value)
    ? value
    : typeof value === 'string'
      ? value.split(',')
      : value === undefined || value === null || value === ''
        ? []
        : [value]

  return rawValues
    .map((item) => String(item).trim())
    .filter((item) => item.length > 0)
    .map((item) => (fieldRole === 'measure' ? parseNumericValue(item) : item))
}

export function serializeWhereFilterValue(params: {
  operator: string | undefined
  fieldRole: WhereFilterFieldRole
  value: unknown
}) {
  const { operator, fieldRole, value } = params
  const strategy = getWhereFilterInputStrategy(operator, fieldRole)

  if (strategy === 'none') {
    return undefined
  }

  if (strategy === 'range') {
    return normalizeWhereRangeValue(value)
  }

  if (strategy === 'tags') {
    return parseTagValues(value, fieldRole)
  }

  if (strategy === 'number') {
    return parseNumericValue(value)
  }

  if (typeof value === 'string') {
    const trimmed = value.trim()
    return trimmed === '' ? undefined : trimmed
  }

  return value
}

export function getWhereDisplayText(item: WhereFilterLike, t: Translate): string {
  const operator = normalizeWhereOperator(item.operator || item.op)

  if (isDateFilter({ op: operator })) {
    const label = getDateFilterDisplayText(item.value as VBIWhereDatePredicate, t)
    return `${item.field} ${t('dateFilterDisplayLabel') || 'Date'}: ${label}`
  }

  const operatorLabel = getFilterOperatorDisplayLabel(operator, t)

  if (NO_VALUE_OPERATORS.has(operator)) {
    return `${item.field} ${operatorLabel}`
  }

  if (RANGE_OPERATORS.has(operator)) {
    const range = normalizeWhereRangeValue(item.value)
    const expression =
      `${range.min ?? ''} ${range.leftOp ?? '<='} ${item.field} ${range.rightOp ?? '<='} ${range.max ?? ''}`.trim()
    return operator === 'not between'
      ? t('filtersDisplayNotRange', { expression }) || `NOT (${expression})`
      : expression
  }

  const valueText = Array.isArray(item.value) ? item.value.join(', ') : String(item.value ?? '')
  return `${item.field} ${operatorLabel} ${valueText}`.trim()
}
