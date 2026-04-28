import type { SlotDropPayload } from 'src/types/dnd'
import type { DragPointer } from './dragPointer'

type TokenRect = {
  index: number
  rect: DOMRect
}

export const resolveDropTarget = (payload: SlotDropPayload, pointer: DragPointer | null): SlotDropPayload => {
  if (payload.target === 'index' || !pointer || typeof document === 'undefined') return payload
  return { ...payload, insertIndex: readInsertIndex(payload.slotIndex, pointer) }
}

const readInsertIndex = (slotIndex: number, pointer: DragPointer) => {
  const tokens = readTokenRects(slotIndex)
  if (!tokens.length) return 0
  const next = tokens.find(({ rect }) => shouldInsertBefore(rect, pointer))
  return next ? next.index : tokens[tokens.length - 1].index + 1
}

const readTokenRects = (slotIndex: number): TokenRect[] =>
  Array.from(document.querySelectorAll<HTMLElement>(`[data-slot-index="${slotIndex}"] [data-slot-token-index]`))
    .map((element) => ({
      index: Number(element.dataset.slotTokenIndex),
      rect: element.getBoundingClientRect(),
    }))
    .filter((item) => Number.isFinite(item.index))
    .sort((left, right) => left.rect.top - right.rect.top || left.rect.left - right.rect.left)

const shouldInsertBefore = (rect: DOMRect, pointer: DragPointer) => {
  const verticalMid = rect.top + rect.height / 2
  const horizontalMid = rect.left + rect.width / 2
  if (pointer.y < verticalMid) return true
  return pointer.y <= rect.bottom + 6 && pointer.x < horizontalMid
}
