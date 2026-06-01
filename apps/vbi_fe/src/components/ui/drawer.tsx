'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { createContext, forwardRef, useContext } from 'react'
import { cn } from '../../lib/utils'
import { X } from './icons'

type DrawerDirection = 'top' | 'right' | 'bottom' | 'left'

type DrawerContextValue = {
  direction: DrawerDirection
  onOpenChange: (open: boolean) => void
}

const DrawerContext = createContext<DrawerContextValue | null>(null)

const useDrawerContext = () => {
  const context = useContext(DrawerContext)
  if (!context) throw new Error('Drawer components must be rendered inside Drawer')
  return context
}

const getDrawerPortalRoot = () => document.querySelector<HTMLElement>('[data-vbi-portal-root]') ?? document.body

type DrawerProps = {
  children: ReactNode
  direction?: DrawerDirection
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const Drawer = ({ children, direction = 'bottom', open, onOpenChange }: DrawerProps) => (
  <DrawerContext.Provider value={{ direction, onOpenChange }}>
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </DialogPrimitive.Root>
  </DrawerContext.Provider>
)

export const DrawerClose = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children, className, ...props }, ref) => (
    <DialogPrimitive.Close asChild>
      <button
        ref={ref}
        className={cn(
          'ui-drawer-close inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md border-0 bg-transparent text-[var(--vbi-text)] transition duration-150 ease-out hover:scale-[1.04] hover:bg-[var(--vbi-hover-bg)] active:scale-[0.96]',
          className,
        )}
        type='button'
        {...props}
      >
        {children}
      </button>
    </DialogPrimitive.Close>
  ),
)
DrawerClose.displayName = 'DrawerClose'

export const DrawerCloseButton = ({
  label,
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & { label: string }) => (
  <DrawerClose aria-label={label} {...props}>
    <X className='h-4 w-4' />
  </DrawerClose>
)

type DrawerContentProps = HTMLAttributes<HTMLElement> & {
  showHandle?: boolean
}

export const DrawerContent = forwardRef<HTMLElement, DrawerContentProps>(
  ({ children, className, showHandle = true, ...props }, ref) => {
    const { direction, onOpenChange } = useDrawerContext()

    return (
      <DialogPrimitive.Portal container={typeof document === 'undefined' ? undefined : getDrawerPortalRoot()}>
        <DialogPrimitive.Overlay
          className='ui-drawer-overlay fixed inset-0 z-[70] flex animate-[vbi-overlay-fade-in_var(--vbi-motion)_var(--vbi-ease-out)] bg-black/40 backdrop-blur-[2px] data-[direction=bottom]:items-end data-[direction=bottom]:justify-center data-[direction=bottom]:p-4 data-[direction=left]:justify-start data-[direction=right]:justify-end data-[direction=top]:items-start data-[direction=top]:justify-center data-[direction=top]:p-4'
          data-direction={direction}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onOpenChange(false)
          }}
        >
          <DialogPrimitive.Content asChild onOpenAutoFocus={(event) => event.preventDefault()}>
            <section
              ref={ref}
              className={cn(
                'ui-drawer-content flex flex-col overflow-hidden border border-[var(--vbi-border)] bg-[var(--vbi-secondary)] text-[var(--vbi-text)] shadow-[var(--vbi-shadow)] will-change-[transform,opacity] data-[direction=bottom]:max-h-[min(85dvh,720px)] data-[direction=bottom]:w-[min(calc(100vw_-_32px),1480px)] data-[direction=bottom]:rounded-t-lg data-[direction=bottom]:animate-[vbi-drawer-slide-bottom_var(--vbi-motion-slow)_var(--vbi-ease-spring)] data-[direction=left]:h-dvh data-[direction=left]:w-[92vw] data-[direction=left]:max-w-[1480px] data-[direction=left]:animate-[vbi-drawer-slide-left_var(--vbi-motion-slow)_var(--vbi-ease-spring)] data-[direction=right]:h-dvh data-[direction=right]:w-[92vw] data-[direction=right]:max-w-[1480px] data-[direction=right]:animate-[vbi-drawer-slide-right_var(--vbi-motion-slow)_var(--vbi-ease-spring)] data-[direction=top]:max-h-[min(85dvh,720px)] data-[direction=top]:w-[min(calc(100vw_-_32px),1480px)] data-[direction=top]:rounded-b-lg data-[direction=top]:animate-[vbi-drawer-slide-top_var(--vbi-motion-slow)_var(--vbi-ease-spring)]',
                className,
              )}
              data-direction={direction}
              {...props}
            >
              {showHandle ? (
                <div
                  className='ui-drawer-handle mx-auto mt-2.5 h-1 w-[42px] shrink-0 rounded-full bg-[var(--vbi-border-strong)]'
                  aria-hidden='true'
                />
              ) : null}
              {children}
            </section>
          </DialogPrimitive.Content>
        </DialogPrimitive.Overlay>
      </DialogPrimitive.Portal>
    )
  },
)
DrawerContent.displayName = 'DrawerContent'

export const DrawerHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'ui-drawer-header flex shrink-0 items-center justify-between gap-3 border-b border-[var(--vbi-border)] bg-[var(--vbi-secondary)] px-3.5 py-3',
      className,
    )}
    {...props}
  />
)

export const DrawerFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'ui-drawer-footer flex shrink-0 justify-end gap-2 border-t border-[var(--vbi-border)] bg-[var(--vbi-secondary)] px-3.5 py-3',
      className,
    )}
    {...props}
  />
)

export const DrawerBody = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('ui-drawer-body min-h-0 flex-auto overflow-auto bg-[var(--vbi-secondary)] p-3.5', className)}
    {...props}
  />
)

export const DrawerTitle = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <DialogPrimitive.Title
    className={cn('ui-drawer-title m-0 text-[15px] font-semibold text-[var(--vbi-text-strong)]', className)}
    {...props}
  />
)

export const DrawerDescription = ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
  <DialogPrimitive.Description
    className={cn('ui-drawer-description mt-0.5 text-xs text-[var(--vbi-text-muted)]', className)}
    {...props}
  />
)
