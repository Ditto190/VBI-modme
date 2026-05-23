import type { ReactNode } from 'react'
import { Button } from '../../components/ui/button'
import { ConfirmAction } from '../../components/ui/confirm-action'
import { Tooltip } from '../../components/ui/tooltip'
import { cn } from '../../lib/utils'

export type EditableSurfaceAction = {
  ariaLabel: string
  className?: string
  confirm?: {
    cancelText: string
    description: string
    okText: string
    title: string
  }
  danger?: boolean
  disabled?: boolean
  icon: ReactNode
  onClick: () => void | Promise<void>
}

const renderAction = (action: EditableSurfaceAction) => {
  const button = (
    <Tooltip title={action.ariaLabel}>
      <Button
        aria-label={action.ariaLabel}
        className={cn(
          'h-7 w-7 min-w-7 border border-[var(--vbi-border)] bg-[var(--vbi-control)] text-xs text-[var(--vbi-text)] shadow-sm hover:border-[var(--vbi-active-text)] hover:bg-[var(--vbi-surface-solid)] hover:text-[var(--vbi-active-text)]',
          action.className,
        )}
        disabled={action.disabled}
        icon={action.icon}
        size='icon'
        variant={action.danger ? 'destructive' : 'ghost'}
        onClick={action.confirm ? undefined : action.onClick}
      />
    </Tooltip>
  )

  if (!action.confirm) return button

  return (
    <ConfirmAction
      cancelLabel={action.confirm.cancelText}
      confirmLabel={action.confirm.okText}
      description={action.confirm.description}
      message={action.confirm.title}
      onConfirm={action.onClick}
    >
      {button}
    </ConfirmAction>
  )
}

export const EditableSurface = ({ actions, children }: { actions: EditableSurfaceAction[]; children: ReactNode }) => (
  <section className='group/report-surface vbi-motion-panel relative overflow-visible border-0 bg-transparent shadow-none'>
    <div className='h-full min-h-0 overflow-visible rounded-[inherit] p-0'>{children}</div>
    <div className='absolute right-2 top-2 z-[2] flex -translate-y-1 gap-1 opacity-0 transition duration-200 group-hover/report-surface:translate-y-0 group-hover/report-surface:opacity-100 group-focus-within/report-surface:translate-y-0 group-focus-within/report-surface:opacity-100'>
      {actions.map((action) => (
        <span key={action.ariaLabel}>{renderAction(action)}</span>
      ))}
    </div>
  </section>
)
