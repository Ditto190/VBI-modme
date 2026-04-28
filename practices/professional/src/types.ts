import type { VBIDimension, VBIMeasure, VBISort } from '@visactor/vbi'

export type SchemaField = {
  isDate: boolean
  name: string
  role: 'dimension' | 'measure'
  type: string
}

export type FieldSlot = {
  accepts: Array<SchemaField['role']>
  dimensionEncoding?: NonNullable<VBIDimension['encoding']>
  measureEncoding?: NonNullable<VBIMeasure['encoding']>
  title: string
}

export type MappedField = {
  aggregate?: VBIDimension['aggregate'] | VBIMeasure['aggregate']
  alias?: string
  encoding?: string
  field: string
  format?: VBIMeasure['format']
  id: string
  isDate: boolean
  role: SchemaField['role']
  sort?: VBISort
}
