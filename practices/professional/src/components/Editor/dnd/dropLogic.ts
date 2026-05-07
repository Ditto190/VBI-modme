import type { FieldSlot, SchemaField } from 'src/types'
import type { ProfessionalDragPayload, SlotDropPayload } from 'src/types/dnd'

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

export const normalizeSlotInsertIndex = (insertIndex: number, itemCount: number) => clamp(insertIndex, 0, itemCount)

export const getNormalizedReorderIndex = (dragIndex: number, insertIndex: number) =>
  dragIndex < insertIndex ? insertIndex - 1 : insertIndex

export const isNoopSlotReorder = (params: { dragIndex: number; insertIndex: number }) =>
  getNormalizedReorderIndex(params.dragIndex, params.insertIndex) === params.dragIndex

export type ProfessionalDropAction =
  | { type: 'none' }
  | { type: 'add-field'; field: SchemaField; insertIndex: number; slot: FieldSlot }
  | { type: 'move-field'; id: string; insertIndex: number; role: SchemaField['role']; slot: FieldSlot }
  | { type: 'reorder-field'; id: string; insertIndex: number; role: SchemaField['role']; slot: FieldSlot }

export const resolveProfessionalDropAction = (params: {
  dragPayload: ProfessionalDragPayload | undefined
  dropPayload: SlotDropPayload | undefined
}): ProfessionalDropAction => {
  const { dragPayload, dropPayload } = params
  if (!dragPayload || !dropPayload) return { type: 'none' }
  const insertIndex = normalizeSlotInsertIndex(dropPayload.insertIndex, dropPayload.itemCount)

  if (dragPayload.kind === 'schema-field') {
    if (!acceptsRole(dropPayload.slot, dragPayload.field.role)) return { type: 'none' }
    return { type: 'add-field', field: dragPayload.field, insertIndex, slot: dropPayload.slot }
  }

  const role = dragPayload.item.role
  if (!acceptsRole(dropPayload.slot, role)) return { type: 'none' }
  if (dragPayload.sourceEncoding === getSlotEncoding(dropPayload.slot, role) && dragPayload.sourceIndex !== undefined) {
    if (isNoopSlotReorder({ dragIndex: dragPayload.sourceIndex, insertIndex })) return { type: 'none' }
    return {
      type: 'reorder-field',
      id: dragPayload.item.id,
      insertIndex: getNormalizedReorderIndex(dragPayload.sourceIndex, insertIndex),
      role,
      slot: dropPayload.slot,
    }
  }
  return { type: 'move-field', id: dragPayload.item.id, insertIndex, role, slot: dropPayload.slot }
}

const acceptsRole = (slot: FieldSlot, role: SchemaField['role']) => slot.accepts.includes(role)

const getSlotEncoding = (slot: FieldSlot, role: SchemaField['role']) =>
  role === 'measure' ? slot.measureEncoding : slot.dimensionEncoding
