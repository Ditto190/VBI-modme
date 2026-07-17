import type { ReactNode } from 'react'
import type { ManageRouteRenameChrome } from './ManageRouteChrome'
import { WorkspaceSlotHeader } from './WorkspaceSlotHeader'

type ManageRouteHeaderProps = {
  actions?: ReactNode
  backLabel?: string
  placementToggle?: ReactNode
  rename?: ManageRouteRenameChrome
  title: string
  onBack?: () => void
}

export const ManageRouteHeader = ({
  actions,
  backLabel,
  onBack,
  placementToggle,
  rename,
  title,
}: ManageRouteHeaderProps) => (
  <WorkspaceSlotHeader
    actions={actions}
    backLabel={backLabel}
    rename={rename}
    slotControls={placementToggle}
    title={title}
    onBack={onBack}
  />
)
