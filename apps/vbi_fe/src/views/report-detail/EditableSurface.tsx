import type { ReactNode } from 'react'
import { Button } from '../../components/ui/button'
import { ConfirmAction } from '../../components/ui/confirm-action'
import { Tooltip } from '../../components/ui/tooltip'

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
        className={`report-detail-surface-action ${action.className ?? ''}`}
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
  <section className='report-detail-surface'>
    <div className='report-detail-surface-body'>{children}</div>
    <div className='report-detail-surface-toolbar'>
      {actions.map((action) => (
        <span key={action.ariaLabel}>{renderAction(action)}</span>
      ))}
    </div>
  </section>
)
