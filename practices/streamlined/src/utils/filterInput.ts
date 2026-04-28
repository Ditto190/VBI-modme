import type { SchemaField } from 'src/types'
import type { StreamFilterKind } from './filterActions'
import type { StreamLabels } from 'src/config/labels'

export type FilterDraftValue = string | string[] | { max?: string; min?: string }
export type FilterInputMode = 'none' | 'number' | 'range' | 'tags' | 'text'
export type FilterDraft = {
  aggregate: 'avg' | 'count' | 'max' | 'min' | 'sum'
  editingId?: string
  field: SchemaField
  operator: string
  value: FilterDraftValue
}

const textOperators = ['=', '!=', 'in', 'not in', 'like', 'not like', 'is null', 'is not null'] as const
const numberOperators = [
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
const operatorLabels = {
  'zh-CN': {
    '=': '等于',
    '!=': '不等于',
    '>': '大于',
    '>=': '大于等于',
    '<': '小于',
    '<=': '小于等于',
    in: '包含任一',
    'not in': '不包含',
    like: '匹配',
    'not like': '不匹配',
    between: '介于',
    'not between': '不介于',
    'is null': '为空',
    'is not null': '不为空',
  },
  'en-US': {
    '=': 'Equals',
    '!=': 'Not equal',
    '>': 'Greater than',
    '>=': 'Greater or equal',
    '<': 'Less than',
    '<=': 'Less or equal',
    in: 'In',
    'not in': 'Not in',
    like: 'Like',
    'not like': 'Not like',
    between: 'Between',
    'not between': 'Not between',
    'is null': 'Is null',
    'is not null': 'Is not null',
  },
} as const

export const getFilterOperators = (kind: StreamFilterKind, field?: SchemaField) => {
  if (kind === 'having' || field?.role === 'measure' || field?.type.toLowerCase() === 'number') return numberOperators
  return textOperators
}

export const getFilterOperatorOptions = (labels: StreamLabels, kind: StreamFilterKind, field?: SchemaField) => {
  const localeLabels = operatorLabels[labels.locale]
  return getFilterOperators(kind, field).map((value) => ({ label: localeLabels[value], value }))
}

export const getDefaultFilterOperator = (kind: StreamFilterKind, field?: SchemaField) => {
  return kind === 'having' || field?.role === 'measure' ? '>' : '='
}

export const getFilterInputMode = (operator: string, kind: StreamFilterKind, field?: SchemaField): FilterInputMode => {
  if (operator === 'is null' || operator === 'is not null') return 'none'
  if (operator === 'between' || operator === 'not between') return 'range'
  if (operator === 'in' || operator === 'not in') return 'tags'
  if (kind === 'having' || field?.role === 'measure' || field?.type.toLowerCase() === 'number') return 'number'
  return 'text'
}

export const getEmptyFilterValue = (mode: FilterInputMode): FilterDraftValue => {
  if (mode === 'tags') return []
  if (mode === 'range') return {}
  return ''
}

const parseNumber = (value: unknown) => {
  if (value === undefined || value === null || value === '') return undefined
  const parsed = Number(value)
  return Number.isNaN(parsed) ? value : parsed
}

export const serializeFilterValue = (value: FilterDraftValue, mode: FilterInputMode) => {
  if (mode === 'none') return undefined
  if (mode === 'number') return parseNumber(value)
  if (mode === 'tags') return (Array.isArray(value) ? value : [String(value)]).filter(Boolean).map(parseNumber)
  if (mode === 'range' && !Array.isArray(value) && typeof value === 'object')
    return [parseNumber(value.min), parseNumber(value.max)]
  return typeof value === 'string' ? value.trim() || undefined : value
}

export const toFilterDraftValue = (value: unknown, mode: FilterInputMode): FilterDraftValue => {
  if (mode === 'tags') return Array.isArray(value) ? value.map(String) : value ? [String(value)] : []
  if (mode === 'range') return Array.isArray(value) ? { min: String(value[0] ?? ''), max: String(value[1] ?? '') } : {}
  return value === undefined || value === null ? '' : String(value)
}
