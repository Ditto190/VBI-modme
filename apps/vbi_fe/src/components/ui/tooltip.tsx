import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

type TooltipSide = 'top' | 'right'

type TooltipProps = {
  children: ReactNode
  side?: TooltipSide
  title: string
}

const getPortalRoot = () => document.querySelector('[data-vbi-portal-root]') ?? document.body

const getTooltipStyle = (rect: DOMRect, side: TooltipSide): CSSProperties => {
  if (side === 'right') {
    return {
      left: rect.right + 9,
      top: rect.top + rect.height / 2,
      transform: 'translateY(-50%)',
    }
  }

  return {
    left: rect.left + rect.width / 2,
    top: rect.top - 8,
    transform: 'translate(-50%, -100%)',
  }
}

export const Tooltip = ({ children, side = 'top', title }: TooltipProps) => {
  const id = useId()
  const triggerRef = useRef<HTMLSpanElement>(null)
  const [open, setOpen] = useState(false)
  const [style, setStyle] = useState<CSSProperties | null>(null)

  useEffect(() => {
    if (!open) return
    const updatePosition = () => {
      const rect = triggerRef.current?.getBoundingClientRect()
      if (rect) setStyle(getTooltipStyle(rect, side))
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [open, side])

  return (
    <>
      <span
        className='ui-tooltip-trigger'
        data-tooltip={title}
        data-tooltip-side={side}
        ref={triggerRef}
        onBlur={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {children}
      </span>
      {open && style
        ? createPortal(
            <span className='ui-tooltip-content' data-side={side} id={id} role='tooltip' style={style}>
              {title}
            </span>,
            getPortalRoot(),
          )
        : null}
    </>
  )
}
