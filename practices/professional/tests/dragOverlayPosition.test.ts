import { expect, test } from '@rstest/core'
import { keepDragOverlayNearPointer, readEventPoint } from 'src/components/Editor/dnd/dragOverlayPosition'

test('reads pointer coordinates from pointer-like events', () => {
  const event = new MouseEvent('pointerdown', { clientX: 120, clientY: 48 })

  expect(readEventPoint(event)).toEqual({ x: 120, y: 48 })
})

test('keeps drag overlay near the pointer instead of source click offset', () => {
  const transform = keepDragOverlayNearPointer({
    active: null,
    activeNodeRect: { bottom: 44, height: 24, left: 30, right: 210, top: 20, width: 180 },
    activatorEvent: new MouseEvent('pointerdown', { clientX: 45, clientY: 32 }),
    containerNodeRect: null,
    draggingNodeRect: null,
    over: null,
    overlayNodeRect: null,
    scrollableAncestors: [],
    scrollableAncestorRects: [],
    transform: { scaleX: 1, scaleY: 1, x: 10, y: 6 },
    windowRect: null,
  })

  expect(transform).toEqual({ scaleX: 1, scaleY: 1, x: 33, y: 26 })
})
