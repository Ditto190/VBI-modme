'use client'

import * as PopoverPrimitive from '@radix-ui/react-popover'
import { useState, type ReactNode } from 'react'
import { Button } from './button'

const getPopoverPortalRoot = () => document.querySelector<HTMLElement>('[data-vbi-portal-root]') ?? document.body

export const ConfirmAction = ({
  cancelLabel,
  children,
  confirmLabel,
  description,
  message,
  onConfirm,
}: {
  cancelLabel?: string
  children: ReactNode
  confirmLabel?: string
  description?: string
  message: string
  onConfirm: () => void | Promise<void>
}) => {
  const [open, setOpen] = useState(false)
  const [confirming, setConfirming] = useState(false)

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <span onClick={(event) => event.stopPropagation()}>{children}</span>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal container={typeof document === 'undefined' ? undefined : getPopoverPortalRoot()}>
        <PopoverPrimitive.Content
          align='end'
          className='ui-confirm-popover z-[96] grid w-[min(240px,calc(100vw_-_24px))] gap-2 rounded-lg border border-[var(--vbi-border)] bg-[var(--vbi-surface-solid)] p-2.5 text-[var(--vbi-text)] shadow-[0_18px_38px_color-mix(in_srgb,var(--vbi-text-strong)_14%,transparent)] animate-[vbi-menu-pop_var(--vbi-motion)_var(--vbi-ease-spring)]'
          side='bottom'
          sideOffset={8}
          onClick={(event) => event.stopPropagation()}
        >
          <div className='ui-confirm-popover-title text-xs font-semibold leading-[1.4] text-[var(--vbi-text-strong)]'>
            {message}
          </div>
          {description ? (
            <p className='ui-confirm-popover-description m-0 text-[11px] leading-[1.45] text-[var(--vbi-text-muted)]'>
              {description}
            </p>
          ) : null}
          <div className='ui-confirm-popover-actions flex justify-end gap-1.5'>
            <Button size='sm' variant='secondary' onClick={() => setOpen(false)}>
              {cancelLabel}
            </Button>
            <Button
              loading={confirming}
              size='sm'
              variant='destructive'
              onClick={() => {
                void (async () => {
                  setConfirming(true)
                  try {
                    await onConfirm()
                    setOpen(false)
                  } finally {
                    setConfirming(false)
                  }
                })()
              }}
            >
              {confirmLabel}
            </Button>
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
