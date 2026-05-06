import type { ProfessionalDragPayload } from 'src/types/dnd'
import { getDragLabel, getDragRole } from './dragPayload'
import type { DragSourceRect } from './ProfessionalDndProvider'

type DragGhostProps = {
  payload: ProfessionalDragPayload
  sourceRect?: DragSourceRect | null
}

export const DragGhost = ({ payload, sourceRect }: DragGhostProps) => {
  const role = getDragRole(payload)

  return (
    <div className={`pro-drag-ghost pro-drag-ghost--${role}`} style={getGhostStyle(sourceRect)}>
      {getDragLabel(payload)}
    </div>
  )
}

const getGhostStyle = (sourceRect?: DragSourceRect | null) =>
  sourceRect ? { height: sourceRect.height, width: sourceRect.width } : undefined
