import { Button, Popconfirm, Tooltip } from 'antd'
import type { ReactNode } from 'react'

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
        danger={action.danger}
        disabled={action.disabled}
        icon={action.icon}
        shape="circle"
        size="small"
        type="text"
        onClick={action.confirm ? undefined : action.onClick}
      />
    </Tooltip>
  )

  if (!action.confirm) return button

  return (
    <Popconfirm
      cancelText={action.confirm.cancelText}
      description={action.confirm.description}
      okText={action.confirm.okText}
      title={action.confirm.title}
      onConfirm={action.onClick}
    >
      {button}
    </Popconfirm>
  )
}

export const EditableSurface = ({ actions, children }: { actions: EditableSurfaceAction[]; children: ReactNode }) => (
  <section className="report-detail-surface">
    <div className="report-detail-surface-body">{children}</div>
    <div className="report-detail-surface-toolbar">
      {actions.map((action) => (
        <span key={action.ariaLabel}>{renderAction(action)}</span>
      ))}
    </div>
  </section>
)
