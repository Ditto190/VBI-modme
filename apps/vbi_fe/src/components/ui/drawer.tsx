'use client'

import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { createContext, forwardRef, useContext, useEffect, useId } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../lib/utils'

type DrawerDirection = 'top' | 'right' | 'bottom' | 'left'

type DrawerContextValue = {
  descriptionId: string
  direction: DrawerDirection
  open: boolean
  titleId: string
  onOpenChange: (open: boolean) => void
}

const DrawerContext = createContext<DrawerContextValue | null>(null)

const useDrawerContext = () => {
  const context = useContext(DrawerContext)
  if (!context) throw new Error('Drawer components must be rendered inside Drawer')
  return context
}

type DrawerProps = {
  children: ReactNode
  direction?: DrawerDirection
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const Drawer = ({ children, direction = 'bottom', open, onOpenChange }: DrawerProps) => {
  const titleId = useId()
  const descriptionId = useId()

  return (
    <DrawerContext.Provider value={{ descriptionId, direction, open, titleId, onOpenChange }}>
      {children}
    </DrawerContext.Provider>
  )
}

export const DrawerTrigger = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ onClick, ...props }, ref) => {
    const { onOpenChange } = useDrawerContext()

    return (
      <button
        ref={ref}
        type='button'
        onClick={(event) => {
          onClick?.(event)
          if (!event.defaultPrevented) onOpenChange(true)
        }}
        {...props}
      />
    )
  },
)
DrawerTrigger.displayName = 'DrawerTrigger'

export const DrawerClose = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ onClick, ...props }, ref) => {
    const { onOpenChange } = useDrawerContext()

    return (
      <button
        ref={ref}
        type='button'
        onClick={(event) => {
          onClick?.(event)
          if (!event.defaultPrevented) onOpenChange(false)
        }}
        {...props}
      />
    )
  },
)
DrawerClose.displayName = 'DrawerClose'

type DrawerContentProps = HTMLAttributes<HTMLElement> & {
  showHandle?: boolean
}

const getDrawerPortalRoot = () => document.querySelector<HTMLElement>('[data-vbi-portal-root]') ?? document.body

export const DrawerContent = forwardRef<HTMLElement, DrawerContentProps>(
  ({ children, className, showHandle = true, onKeyDown, ...props }, ref) => {
    const { descriptionId, direction, open, titleId, onOpenChange } = useDrawerContext()

    useEffect(() => {
      if (!open) return undefined

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') onOpenChange(false)
      }

      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [onOpenChange, open])

    if (!open || typeof document === 'undefined') return null

    return createPortal(
      <div
        className='ui-drawer-overlay'
        data-direction={direction}
        role='presentation'
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onOpenChange(false)
        }}
      >
        <section
          ref={ref}
          aria-describedby={descriptionId}
          aria-labelledby={titleId}
          aria-modal='true'
          className={cn('ui-drawer-content', className)}
          data-direction={direction}
          role='dialog'
          tabIndex={-1}
          onKeyDown={onKeyDown}
          {...props}
        >
          {showHandle ? <div className='ui-drawer-handle' aria-hidden='true' /> : null}
          {children}
        </section>
      </div>,
      getDrawerPortalRoot(),
    )
  },
)
DrawerContent.displayName = 'DrawerContent'

export const DrawerHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('ui-drawer-header', className)} {...props} />
)

export const DrawerFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('ui-drawer-footer', className)} {...props} />
)

export const DrawerBody = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('ui-drawer-body', className)} {...props} />
)

export const DrawerTitle = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => {
  const { titleId } = useDrawerContext()

  return <h2 id={titleId} className={cn('ui-drawer-title', className)} {...props} />
}

export const DrawerDescription = ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => {
  const { descriptionId } = useDrawerContext()

  return <p id={descriptionId} className={cn('ui-drawer-description', className)} {...props} />
}
