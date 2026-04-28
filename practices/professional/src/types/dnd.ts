import type { FieldSlot, MappedField, SchemaField } from './index'

export type FieldDragPayload = {
  field: SchemaField
  kind: 'schema-field'
}

export type TokenDragPayload = {
  item: MappedField
  kind: 'mapped-field'
}

export type ProfessionalDragPayload = FieldDragPayload | TokenDragPayload

export type SlotDropPayload = {
  insertIndex: number
  kind: 'slot-insert'
  slot: FieldSlot
  slotIndex: number
  target: 'index' | 'slot'
}
