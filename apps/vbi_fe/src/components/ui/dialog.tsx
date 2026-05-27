'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { X } from './icons'

const getDialogPortalRoot = () => document.querySelector<HTMLElement>('[data-vbi-portal-root]') ?? document.body

export const Dialog = ({
  children,
  onOpenChange,
  open,
}: {
  children: ReactNode
  onOpenChange: (open: boolean) => void
  open: boolean
}) => (
  <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
    {children}
  </DialogPrimitive.Root>
)

export const DialogContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => (
    <DialogPrimitive.Portal container={typeof document === 'undefined' ? undefined : getDialogPortalRoot()}>
      <DialogPrimitive.Overlay className='ui-dialog-overlay fixed inset-0 z-[90] grid place-items-center bg-black/40 p-4 backdrop-blur-[2px] animate-[vbi-overlay-fade-in_var(--vbi-motion)_var(--vbi-ease-out)]'>
        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            'ui-dialog-content relative flex w-[min(420px,calc(100vw_-_32px))] flex-col overflow-hidden rounded-lg border border-[var(--vbi-border)] bg-[var(--vbi-surface-solid)] text-[var(--vbi-text)] shadow-[var(--vbi-shadow)] animate-[vbi-menu-pop_var(--vbi-motion)_var(--vbi-ease-spring)]',
            className,
          )}
          {...props}
        >
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Overlay>
    </DialogPrimitive.Portal>
  ),
)
DialogContent.displayName = 'DialogContent'

export const DialogHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('ui-dialog-header flex flex-col gap-1 border-b border-[var(--vbi-border)] px-4 py-3.5', className)}
    {...props}
  />
)

export const DialogFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('ui-dialog-footer flex justify-end gap-2 border-t border-[var(--vbi-border)] px-4 py-3.5', className)}
    {...props}
  />
)

export const DialogBody = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('ui-dialog-body px-4 py-4', className)} {...props} />
)

export const DialogTitle = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <DialogPrimitive.Title
    className={cn('ui-dialog-title m-0 text-[15px] font-semibold text-[var(--vbi-text-strong)]', className)}
    {...props}
  />
)

export const DialogDescription = ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
  <DialogPrimitive.Description
    className={cn('ui-dialog-description m-0 text-xs leading-5 text-[var(--vbi-text-muted)]', className)}
    {...props}
  />
)

export const DialogClose = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children, className, ...props }, ref) => (
    <DialogPrimitive.Close asChild>
      <button
        ref={ref}
        className={cn(
          'ui-dialog-close inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md border-0 bg-transparent text-[var(--vbi-text)] transition duration-150 ease-out hover:bg-[var(--vbi-hover-bg)]',
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
DialogClose.displayName = 'DialogClose'

export const DialogCloseButton = ({
  label,
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & { label: string }) => (
  <DialogClose aria-label={label} {...props}>
    <X className='h-4 w-4' />
  </DialogClose>
)
