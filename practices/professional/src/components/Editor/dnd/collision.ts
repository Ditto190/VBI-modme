import { pointerWithin, type CollisionDetection } from '@dnd-kit/core'

export const slotCollision: CollisionDetection = (args) => {
  const collisions = pointerWithin(args)
  return [...collisions].sort((left, right) => Number(isSlotTarget(left.id)) - Number(isSlotTarget(right.id)))
}

const isSlotTarget = (id: unknown) => String(id).endsWith('-slot')
