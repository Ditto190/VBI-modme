import type { VBIHavingAggregate } from '@visactor/vbi'
import type { VBIChartField } from '../vbi-chart-fields'

export type { VBIChartField }

export interface VBIChartFilterItem {
  id?: string
  field: string
  operator: string
  value: unknown
}

export interface HavingFilterItem {
  id?: string
  field: string
  aggregate: VBIHavingAggregate
  operator: string
  value: unknown
}
