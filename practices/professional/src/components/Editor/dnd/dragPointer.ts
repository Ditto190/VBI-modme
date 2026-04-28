import type { DragStartEvent } from '@dnd-kit/core'
import type { PointerEvent as ReactPointerEvent } from 'react'

export type DragPointer = {
  x: number
  y: number
}

let latestPointer: DragPointer | null = null

export const rememberPointer = (event: ReactPointerEvent) => {
  latestPointer = { x: event.clientX, y: event.clientY }
}

export const readLatestPointer = () => latestPointer

export const readStartPointer = (event: DragStartEvent): DragPointer | null => {
  const source = event.activatorEvent
  if (source instanceof MouseEvent || source instanceof PointerEvent) return { x: source.clientX, y: source.clientY }
  if (source instanceof TouchEvent) {
    const touch = source.changedTouches.item(0)
    return touch ? { x: touch.clientX, y: touch.clientY } : null
  }
  return null
}

export const trackWindowPointer = (update: (pointer: DragPointer) => void) => {
  const sync = (event: PointerEvent) => {
    latestPointer = { x: event.clientX, y: event.clientY }
    update(latestPointer)
  }
  window.addEventListener('pointermove', sync, { passive: true })
  return () => window.removeEventListener('pointermove', sync)
}
