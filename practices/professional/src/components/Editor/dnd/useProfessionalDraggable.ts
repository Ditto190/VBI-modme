import { useDraggable } from '@dnd-kit/core'
import type { ProfessionalDragPayload } from 'src/types/dnd'

export const useProfessionalDraggable = (id: string, payload: ProfessionalDragPayload) => {
  const draggable = useDraggable({ id, data: payload })
  return {
    attributes: draggable.attributes,
    isDragging: draggable.isDragging,
    listeners: draggable.listeners,
    setNodeRef: draggable.setNodeRef,
  }
}
