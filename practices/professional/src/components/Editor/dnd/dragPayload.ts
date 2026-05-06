import type { MappedField, SchemaField } from 'src/types'
import type { ProfessionalDragPayload } from 'src/types/dnd'
import { getFieldLabel } from 'src/utils/mappedFields'

export type MappedFieldDragSource = {
  sourceEncoding?: string
  sourceIndex?: number
  sourceSlotIndex?: number
}

export const createSchemaFieldDragPayload = (field: SchemaField): ProfessionalDragPayload => ({
  field,
  kind: 'schema-field',
})

export const createMappedFieldDragPayload = (
  item: MappedField,
  source: MappedFieldDragSource = {},
): ProfessionalDragPayload => ({
  item,
  kind: 'mapped-field',
  sourceEncoding: source.sourceEncoding ?? item.encoding,
  sourceIndex: source.sourceIndex,
  sourceSlotIndex: source.sourceSlotIndex,
})

export const getDragRole = (payload: ProfessionalDragPayload) =>
  payload.kind === 'schema-field' ? payload.field.role : payload.item.role

export const getDragLabel = (payload: ProfessionalDragPayload) =>
  payload.kind === 'schema-field' ? payload.field.name : getFieldLabel(payload.item)
