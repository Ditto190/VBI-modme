import type { FilterField, FilterItem } from './filterTypes'

type RangeValue = {
  leftOp?: string
  max?: number
  min?: number
  rightOp?: string
}

const isRangeValue = (value: unknown): value is RangeValue =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

export const emptyRangeValue = (): RangeValue => ({ leftOp: '<=', rightOp: '<=' })

export const formValueFromFilter = (item: FilterItem) =>
  item.operator === 'between' ? item.value : Array.isArray(item.value) ? item.value.join(',') : item.value

export const roleForFilter = (fields: FilterField[], item: FilterItem) =>
  fields.find((field) => field.name === item.field)?.role ?? 'dimension'

export const submitValue = (operator: string, value: unknown) =>
  ['in', 'not in', '=', '!='].includes(operator) && typeof value === 'string'
    ? value.split(',').map((item) => item.trim())
    : value

export const filterLabel = (item: FilterItem) => {
  if (item.operator !== 'between' || !isRangeValue(item.value)) {
    return `${item.field} ${item.operator} ${String(item.value)}`
  }
  const { leftOp = '<=', max = '', min = '', rightOp = '<=' } = item.value
  return `${min} ${leftOp} ${item.field} ${rightOp} ${max}`
}
