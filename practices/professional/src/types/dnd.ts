import type { FieldSlot, MappedField, SchemaField } from './index'

export type FieldDragPayload = {
  field: SchemaField
  kind: 'schema-field'
}

export type TokenDragPayload = {
  item: MappedField
  kind: 'mapped-field'
  sourceEncoding?: string
  sourceIndex?: number
  sourceSlotIndex?: number
}

export type ProfessionalDragPayload = FieldDragPayload | TokenDragPayload

export type SlotDropAnchor = 'before' | 'after' | 'empty' | 'tail'
export type SlotDropZone = 'head' | SlotDropAnchor

export type SlotDropPayload = {
  anchor: SlotDropAnchor
  insertIndex: number
  itemCount: number
  kind: 'slot-insert'
  slot: FieldSlot
  slotIndex: number
  zone: SlotDropZone
}
