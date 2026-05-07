import { pointerWithin, type CollisionDetection } from '@dnd-kit/core'

export const slotCollision: CollisionDetection = (args) => {
  return pointerWithin(args)
}
