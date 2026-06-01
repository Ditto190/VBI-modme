import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../lib/utils'

type TooltipSide = 'top' | 'right' | 'bottom' | 'left'

type TooltipProps = {
  children: ReactNode
  contentClassName?: string
  side?: TooltipSide
  title: ReactNode
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

  if (side === 'left') {
    return {
      left: rect.left - 9,
      top: rect.top + rect.height / 2,
      transform: 'translate(-100%, -50%)',
    }
  }

  if (side === 'bottom') {
    return {
      left: rect.left + rect.width / 2,
      top: rect.bottom + 8,
      transform: 'translateX(-50%)',
    }
  }

  return {
    left: rect.left + rect.width / 2,
    top: rect.top - 8,
    transform: 'translate(-50%, -100%)',
  }
}

export const Tooltip = ({ children, contentClassName, side = 'top', title }: TooltipProps) => {
  const id = useId()
  const triggerRef = useRef<HTMLSpanElement>(null)
  const [open, setOpen] = useState(false)
  const [style, setStyle] = useState<CSSProperties | null>(null)
  const stringTitle = typeof title === 'string' ? title : undefined

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
        aria-describedby={open ? id : undefined}
        data-tooltip={stringTitle}
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
            <span
              className={cn('ui-tooltip-content', contentClassName)}
              data-side={side}
              id={id}
              role='tooltip'
              style={style}
            >
              {title}
            </span>,
            getPortalRoot(),
          )
        : null}
    </>
  )
}
