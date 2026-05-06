import { useDroppable } from '@dnd-kit/core'
import type { ReactNode } from 'react'
import type { FieldSlot, SchemaField } from 'src/types'
import type { SlotDropZone } from 'src/types/dnd'
import {
  acceptsSlotDrop,
  createSlotDropClassName,
  createSlotDropPayload,
  createSlotDropTargetId,
} from './slotDropTargetModel'

type SlotDropTargetProps = {
  activeRole: SchemaField['role'] | null
  children?: ReactNode
  insertIndex: number
  itemCount: number
  slot: FieldSlot
  slotIndex: number
  zone: SlotDropZone
}

export const SlotDropTarget = (props: SlotDropTargetProps) => {
  const { activeRole, children, insertIndex, itemCount, slot, slotIndex, zone } = props
  const accepts = acceptsSlotDrop(slot, activeRole)
  const { isOver, setNodeRef } = useDroppable({
    id: createSlotDropTargetId({ insertIndex, slotIndex, zone }),
    data: createSlotDropPayload({ insertIndex, itemCount, slot, slotIndex, zone }),
    disabled: !accepts,
  })

  return (
    <span
      className={createSlotDropClassName({ accepts, hasContent: Boolean(children), isOver, zone })}
      ref={setNodeRef}
    >
      {children}
    </span>
  )
}
