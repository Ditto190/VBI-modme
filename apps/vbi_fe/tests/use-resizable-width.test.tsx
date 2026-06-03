import { afterEach, beforeEach, describe, expect, rs, test } from '@rstest/core'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { useResizableWidth } from '../src/hooks/useResizableWidth'

type ResizeHarnessProps = {
  direction?: 'left' | 'right'
  disabled?: boolean
  onResize: (width: number) => void
  onReset?: () => void
  width?: number
}

const ResizeHarness = ({
  direction = 'right',
  disabled = false,
  onResize,
  onReset = () => undefined,
  width = 300,
}: ResizeHarnessProps) => {
  const { resizeHandleProps } = useResizableWidth({
    direction,
    disabled,
    onResize,
    onReset,
    width,
  })

  return <div aria-label='Resize test' {...resizeHandleProps} />
}

describe('useResizableWidth', () => {
  beforeEach(() => {
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  })

  afterEach(() => {
    cleanup()
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  })

  test('resizes from the right edge and restores body resize styles', () => {
    const onResize = rs.fn()
    document.body.style.cursor = 'wait'
    document.body.style.userSelect = 'text'

    render(<ResizeHarness onResize={onResize} width={300} />)

    fireEvent.pointerDown(screen.getByRole('separator', { name: 'Resize test' }), { clientX: 100 })
    expect(document.body.style.cursor).toBe('ew-resize')
    expect(document.body.style.userSelect).toBe('none')

    fireEvent.pointerMove(document, { clientX: 140 })
    expect(onResize).toHaveBeenCalledWith(340)

    fireEvent.pointerUp(document)
    expect(document.body.style.cursor).toBe('wait')
    expect(document.body.style.userSelect).toBe('text')
  })

  test('resizes from the left edge', () => {
    const onResize = rs.fn()

    render(<ResizeHarness direction='left' onResize={onResize} width={500} />)

    fireEvent.pointerDown(screen.getByRole('separator', { name: 'Resize test' }), { clientX: 100 })
    fireEvent.pointerMove(document, { clientX: 60 })
    fireEvent.pointerUp(document)

    expect(onResize).toHaveBeenCalledWith(540)
  })

  test('does not start resizing when disabled', () => {
    const onResize = rs.fn()
    document.body.style.cursor = 'wait'
    document.body.style.userSelect = 'text'

    render(<ResizeHarness disabled onResize={onResize} width={300} />)

    fireEvent.pointerDown(screen.getByRole('separator', { name: 'Resize test' }), { clientX: 100 })
    fireEvent.pointerMove(document, { clientX: 140 })
    fireEvent.pointerUp(document)

    expect(onResize).not.toHaveBeenCalled()
    expect(document.body.style.cursor).toBe('wait')
    expect(document.body.style.userSelect).toBe('text')
  })
})
