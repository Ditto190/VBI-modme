import type { VBIDimension, VBIMeasure } from '@visactor/vbi'

export type SchemaField = {
  name: string
  role: 'dimension' | 'measure'
  type: string
  isDate: boolean
}

export type FieldSlot = {
  accepts: Array<'dimension' | 'measure'>
  description?: string
  dimensionEncoding?: NonNullable<VBIDimension['encoding']>
  measureEncoding?: NonNullable<VBIMeasure['encoding']>
  title: string
}
