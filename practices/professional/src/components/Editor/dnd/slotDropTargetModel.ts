import type { FieldSlot, SchemaField } from 'src/types'
import type { SlotDropAnchor, SlotDropPayload, SlotDropZone } from 'src/types/dnd'

type SlotDropTargetParams = {
  insertIndex: number
  itemCount: number
  slot: FieldSlot
  slotIndex: number
  zone: SlotDropZone
}

export const createSlotDropTargetId = (params: Pick<SlotDropTargetParams, 'insertIndex' | 'slotIndex' | 'zone'>) =>
  `slot-${params.slotIndex}-${params.insertIndex}-${params.zone}`

export const createSlotDropPayload = (params: SlotDropTargetParams): SlotDropPayload => ({
  anchor: getDropAnchor(params.zone),
  insertIndex: params.insertIndex,
  itemCount: params.itemCount,
  kind: 'slot-insert',
  slot: params.slot,
  slotIndex: params.slotIndex,
  zone: params.zone,
})

export const createSlotDropClassName = (params: {
  accepts: boolean
  hasContent: boolean
  isOver: boolean
  zone: SlotDropZone
}) =>
  [
    'pro-slot-drop',
    `pro-slot-drop--${params.zone}`,
    isEdgeDropZone(params.zone) ? 'pro-slot-drop--edge' : '',
    params.hasContent ? 'pro-slot-drop--empty' : '',
    params.accepts ? 'pro-slot-drop--enabled' : '',
    params.isOver ? 'pro-slot-drop--over' : '',
  ].join(' ')

export const acceptsSlotDrop = (slot: FieldSlot, role: SchemaField['role'] | null) =>
  Boolean(role && slot.accepts.includes(role))

export const isEdgeDropZone = (zone: SlotDropZone) => zone === 'head' || zone === 'before' || zone === 'after'

const getDropAnchor = (zone: SlotDropZone): SlotDropAnchor => (zone === 'head' ? 'before' : zone)
