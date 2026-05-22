'use client'

import * as ToastPrimitives from '@radix-ui/react-toast'
import { useEffect, useState } from 'react'
import { CircleAlert, Info, TriangleAlert, X } from './icons'
import { cn } from '../../lib/utils'

type ToastKind = 'error' | 'info' | 'warning'
type ToastItem = {
  actionLabel?: string
  cancelLabel?: string
  description?: string
  id: number
  kind: ToastKind
  message: string
  onAction?: () => void | Promise<void>
}

const toastEventName = 'vbi:toast'
let toastId = 0

type ToastInput =
  | string
  | {
      actionLabel?: string
      cancelLabel?: string
      description?: string
      message: string
      onAction?: () => void | Promise<void>
    }

const normalizeToastInput = (input: ToastInput) => (typeof input === 'string' ? { message: input } : input)

const emitToast = (kind: ToastKind, input: ToastInput) => {
  const detail = normalizeToastInput(input)
  if (typeof window === 'undefined') {
    console[kind === 'error' ? 'error' : 'warn'](detail.message)
    return
  }
  window.dispatchEvent(new CustomEvent(toastEventName, { detail: { kind, ...detail } }))
}

const toastIcons = {
  error: CircleAlert,
  info: Info,
  warning: TriangleAlert,
}

export const toast = {
  confirm: (input: ToastInput) => emitToast('warning', input),
  error: (input: ToastInput) => emitToast('error', input),
  info: (input: ToastInput) => emitToast('info', input),
  warning: (input: ToastInput) => emitToast('warning', input),
}

export const ToastViewport = () => {
  const [items, setItems] = useState<ToastItem[]>([])

  useEffect(() => {
    const handleToast = (event: Event) => {
      const detail = (event as CustomEvent<Omit<ToastItem, 'id'>>).detail
      toastId += 1
      const item = { ...detail, id: toastId }
      setItems((current) => [...current, item])
    }
    window.addEventListener(toastEventName, handleToast)
    return () => window.removeEventListener(toastEventName, handleToast)
  }, [])

  return (
    <ToastPrimitives.Provider swipeDirection='right'>
      {items.map((item) => {
        const Icon = toastIcons[item.kind]
        return (
          <ToastPrimitives.Root
            key={item.id}
            className='ui-toast'
            data-kind={item.kind}
            duration={3200}
            onOpenChange={(open) => {
              if (!open) {
                setItems((current) => current.filter((entry) => entry.id !== item.id))
              }
            }}
          >
            <div className='ui-toast-icon'>
              <Icon className='h-4 w-4' />
            </div>
            <div className='ui-toast-copy'>
              <ToastPrimitives.Title className='ui-toast-title'>{item.message}</ToastPrimitives.Title>
              {item.description ? (
                <ToastPrimitives.Description className='ui-toast-description'>
                  {item.description}
                </ToastPrimitives.Description>
              ) : null}
              {item.onAction ? (
                <div className='ui-toast-actions'>
                  <ToastPrimitives.Action
                    altText={item.actionLabel ?? item.message}
                    className='ui-toast-action'
                    onClick={() => void item.onAction?.()}
                  >
                    {item.actionLabel ?? item.message}
                  </ToastPrimitives.Action>
                  <ToastPrimitives.Close className='ui-toast-cancel'>
                    {item.cancelLabel ?? 'Cancel'}
                  </ToastPrimitives.Close>
                </div>
              ) : null}
            </div>
            <ToastPrimitives.Close className={cn('ui-toast-close')} aria-label='Close'>
              <X className='h-4 w-4' />
            </ToastPrimitives.Close>
          </ToastPrimitives.Root>
        )
      })}
      <ToastPrimitives.Viewport className='ui-toast-viewport' />
    </ToastPrimitives.Provider>
  )
}
