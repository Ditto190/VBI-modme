import type { VBIChartBuilder, VBIChartDSL } from '@visactor/vbi'
import type { EditorField } from 'src/types'

export type FilterCondition = {
  aggregate?: { func?: string }
  field: string
  id: string
  op: string
  value?: unknown
}

const isCondition = (item: unknown): item is FilterCondition => {
  return Boolean(item && typeof item === 'object' && 'id' in item && 'field' in item && 'op' in item)
}

export type FilterToken = FilterCondition & { kind: 'having' | 'where' }

export const getFilters = (dsl: VBIChartDSL): FilterToken[] => {
  const whereSource = (dsl.whereFilter?.conditions ?? []) as unknown[]
  const havingSource = (dsl.havingFilter?.conditions ?? []) as unknown[]
  const where = whereSource.filter(isCondition).map((item) => ({ ...item, kind: 'where' as const }))
  const having = havingSource.filter(isCondition).map((item) => ({ ...item, kind: 'having' as const }))
  return [...where, ...having]
}

export const getOperators = (field?: EditorField) => {
  if (field?.role === 'measure') return ['>', '>=', '<', '<=', '=', '!=']
  return ['=', '!=', 'in', 'not in', 'like']
}

const serializeValue = (operator: string, raw: string, field?: EditorField) => {
  const value = raw.trim()
  if (operator === 'in' || operator === 'not in')
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  if (field?.role === 'measure') {
    const numberValue = Number(value)
    return Number.isNaN(numberValue) ? undefined : numberValue
  }
  return value || undefined
}

export const addFilter = (builder: VBIChartBuilder, field: EditorField, operator: string, rawValue: string) => {
  const value = serializeValue(operator, rawValue, field)
  builder.doc.transact(() => {
    if (field.role === 'measure') {
      builder.havingFilter.add(field.name, (node) =>
        node.setAggregate({ func: 'sum' }).setOperator(operator).setValue(value),
      )
      return
    }
    builder.whereFilter.add(field.name, (node) => node.setOperator(operator).setValue(value))
  })
}

export const removeFilter = (builder: VBIChartBuilder, kind: string, id: string) => {
  builder.doc.transact(() => {
    if (kind === 'having') builder.havingFilter.remove(id)
    else builder.whereFilter.remove(id)
  })
}
