import { createPortal } from 'react-dom'
import type { ProfessionalDragPayload } from 'src/types/dnd'
import type { DragPointer } from './dragPointer'

type DragGhostProps = {
  payload: ProfessionalDragPayload
  position: DragPointer
}

export const DragGhost = ({ payload, position }: DragGhostProps) => {
  const role = payload.kind === 'schema-field' ? payload.field.role : payload.item.role
  const label = payload.kind === 'schema-field' ? payload.field.name : payload.item.alias || payload.item.field

  return createPortal(
    <div className={`pro-drag-ghost pro-drag-ghost--${role}`} style={{ left: position.x, top: position.y }}>
      {label}
    </div>,
    document.body,
  )
}
