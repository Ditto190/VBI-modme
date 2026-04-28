import { useDroppable } from '@dnd-kit/core'
import type { ReactNode } from 'react'
import type { FieldSlot, SchemaField } from 'src/types'

type SlotDropTargetProps = {
  activeRole: SchemaField['role'] | null
  children?: ReactNode
  insertIndex: number
  slot: FieldSlot
  slotIndex: number
}

export const SlotDropTarget = ({ activeRole, children, insertIndex, slot, slotIndex }: SlotDropTargetProps) => {
  const accepts = Boolean(activeRole && slot.accepts.includes(activeRole))
  const { isOver, setNodeRef } = useDroppable({
    id: `slot-${slotIndex}-${insertIndex}`,
    data: { insertIndex, kind: 'slot-insert', slot, slotIndex, target: 'index' },
    disabled: !accepts,
  })

  return (
    <span
      className={[
        'pro-slot-drop',
        children ? 'pro-slot-drop--empty' : '',
        accepts ? 'pro-slot-drop--enabled' : '',
        isOver ? 'pro-slot-drop--over' : '',
      ].join(' ')}
      ref={setNodeRef}
    >
      {children}
    </span>
  )
}
