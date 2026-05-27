'use client'

import { Toaster, toast as sonnerToast } from 'sonner'

type ToastKind = 'error' | 'info' | 'warning'
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

const showToast = (kind: ToastKind, input: ToastInput) => {
  const { actionLabel, description, message, onAction } = normalizeToastInput(input)

  const options = {
    action:
      actionLabel && onAction
        ? {
            label: actionLabel,
            onClick: () => void onAction(),
          }
        : undefined,
    description,
  }

  if (kind === 'error') {
    sonnerToast.error(message, options)
    return
  }

  if (kind === 'warning') {
    sonnerToast.warning(message, options)
    return
  }

  sonnerToast(message, options)
}

export const toast = {
  confirm: (input: ToastInput) => showToast('warning', input),
  error: (input: ToastInput) => showToast('error', input),
  info: (input: ToastInput) => showToast('info', input),
  warning: (input: ToastInput) => showToast('warning', input),
}

export const ToastViewport = () => (
  <Toaster
    closeButton
    richColors
    position='top-right'
    toastOptions={{
      className:
        '!border-[var(--vbi-border)] !bg-[var(--vbi-secondary)] !text-[var(--vbi-text)] !shadow-[0_18px_42px_color-mix(in_srgb,var(--vbi-text-strong)_14%,transparent)]',
      duration: 3200,
    }}
  />
)
