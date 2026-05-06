import type { Modifier } from '@dnd-kit/core'

const POINTER_GHOST_OFFSET = 8

type Point = {
  x: number
  y: number
}

export const keepDragOverlayNearPointer: Modifier = ({ activeNodeRect, activatorEvent, transform }) => {
  const point = readEventPoint(activatorEvent)
  if (!activeNodeRect || !point) return transform

  return {
    ...transform,
    x: transform.x + point.x - activeNodeRect.left + POINTER_GHOST_OFFSET,
    y: transform.y + point.y - activeNodeRect.top + POINTER_GHOST_OFFSET,
  }
}

export const readEventPoint = (event: Event | null): Point | null => {
  if (!event) return null
  const pointer = event as Event & { clientX?: unknown; clientY?: unknown }
  if (typeof pointer.clientX === 'number' && typeof pointer.clientY === 'number') {
    return { x: pointer.clientX, y: pointer.clientY }
  }

  const touch = readTouch(event, 'touches') ?? readTouch(event, 'changedTouches')
  return touch ? { x: touch.clientX, y: touch.clientY } : null
}

const readTouch = (event: Event, key: 'changedTouches' | 'touches') => {
  const list = (event as Event & Partial<Record<typeof key, TouchList>>)[key]
  return list?.[0] ?? null
}
