import { useCallback, useEffect, useRef } from 'react'
import type { MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from 'react'

type ResizableWidthDirection = 'left' | 'right'

type UseResizableWidthOptions = {
  direction: ResizableWidthDirection
  disabled?: boolean
  onResize(width: number): void
  onResizeEnd?(): void
  onResizeStart?(): void
  onReset(): void
  width: number
}

export const useResizableWidth = ({
  direction,
  disabled = false,
  onResize,
  onResizeEnd,
  onResizeStart,
  onReset,
  width,
}: UseResizableWidthOptions) => {
  const cleanupRef = useRef<(() => void) | null>(null)

  const cleanupResize = useCallback(() => {
    cleanupRef.current?.()
    cleanupRef.current = null
  }, [])

  useEffect(() => cleanupResize, [cleanupResize])

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (disabled) return

      event.preventDefault()
      event.stopPropagation()
      cleanupResize()

      const startX = event.clientX
      const startWidth = width
      const previousCursor = document.body.style.cursor
      const previousUserSelect = document.body.style.userSelect
      document.body.style.cursor = 'ew-resize'
      document.body.style.userSelect = 'none'
      onResizeStart?.()

      const handlePointerMove = (pointerEvent: PointerEvent) => {
        const deltaX = pointerEvent.clientX - startX
        onResize(direction === 'right' ? startWidth + deltaX : startWidth - deltaX)
      }
      const handlePointerUp = () => {
        cleanupResize()
        onResizeEnd?.()
      }

      cleanupRef.current = () => {
        document.body.style.cursor = previousCursor
        document.body.style.userSelect = previousUserSelect
        document.removeEventListener('pointermove', handlePointerMove)
        document.removeEventListener('pointerup', handlePointerUp)
      }

      document.addEventListener('pointermove', handlePointerMove)
      document.addEventListener('pointerup', handlePointerUp)
    },
    [cleanupResize, direction, disabled, onResize, onResizeEnd, onResizeStart, width],
  )

  const handleDoubleClick = useCallback(
    (event: ReactMouseEvent<HTMLElement>) => {
      if (disabled) return

      event.preventDefault()
      event.stopPropagation()
      onReset()
    },
    [disabled, onReset],
  )

  return {
    resizeHandleProps: {
      'aria-orientation': 'vertical' as const,
      role: 'separator' as const,
      tabIndex: 0,
      onDoubleClick: handleDoubleClick,
      onPointerDown: handlePointerDown,
    },
  }
}
