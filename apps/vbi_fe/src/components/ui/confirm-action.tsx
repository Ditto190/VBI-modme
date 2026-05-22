import type { ReactNode } from 'react'
import { toast } from './toast'

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
}) => (
  <span
    onClick={(event) => {
      event.stopPropagation()
      toast.confirm({
        actionLabel: confirmLabel,
        cancelLabel,
        description,
        message,
        onAction: onConfirm,
      })
    }}
  >
    {children}
  </span>
)
