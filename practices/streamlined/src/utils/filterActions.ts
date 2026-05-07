import type { VBIChartBuilder } from '@visactor/vbi'
import type { SchemaField } from 'src/types'

export type StreamFilterKind = 'having' | 'where'
export type StreamFilterCondition = {
  aggregate?: { func?: string }
  field: string
  id: string
  op: string
  value?: unknown
}

export const aggregateFunctions = ['sum', 'avg', 'min', 'max', 'count'] as const

export const addStreamFilter = (params: {
  aggregate?: string
  builder: VBIChartBuilder
  field: SchemaField
  kind: StreamFilterKind
  operator: string
  value: unknown
}) => {
  const { aggregate = 'sum', builder, field, kind, operator, value } = params
  builder.doc.transact(() => {
    if (kind === 'where') {
      builder.whereFilter.add(field.name, (node) => node.setOperator(operator).setValue(value))
      return
    }
    builder.havingFilter.add(field.name, (node) => {
      node.setAggregate({ func: aggregate as 'avg' | 'count' | 'max' | 'min' | 'sum' })
      node.setOperator(operator)
      node.setValue(value)
    })
  })
}

export const removeStreamFilter = (builder: VBIChartBuilder, kind: StreamFilterKind, id: string) => {
  builder.doc.transact(() => {
    if (kind === 'where') builder.whereFilter.remove(id)
    else builder.havingFilter.remove(id)
  })
}

const isFilterCondition = (item: unknown): item is StreamFilterCondition => {
  return Boolean(item && typeof item === 'object' && 'field' in item && 'id' in item)
}

export const getStreamFilterConditions = (
  dsl: { havingFilter?: { conditions?: unknown[] }; whereFilter?: { conditions?: unknown[] } },
  kind: StreamFilterKind,
) => {
  return ((kind === 'where' ? dsl.whereFilter?.conditions : dsl.havingFilter?.conditions) ?? []).filter(
    isFilterCondition,
  )
}
