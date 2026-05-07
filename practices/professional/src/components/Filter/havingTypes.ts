import type { VBIHavingAggregate } from '@visactor/vbi'

export type HavingAggregateFunc = VBIHavingAggregate['func']

export interface HavingFilterItem {
  aggregate: VBIHavingAggregate
  field: string
  operator: string
  value: unknown
}

export interface HavingField {
  name: string
  role: 'dimension' | 'measure'
}
