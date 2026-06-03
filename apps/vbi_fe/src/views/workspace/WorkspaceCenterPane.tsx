import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import type { ManageRouteRenameChrome } from './ManageRouteChrome'
import { WorkspaceSlotHeader } from './WorkspaceSlotHeader'

type WorkspaceCenterPaneProps = {
  actions?: ReactNode
  backLabel?: string
  children: ReactNode
  contentClassName?: string
  contentKind: 'agent' | 'resource'
  rename?: ManageRouteRenameChrome
  slotControls?: ReactNode
  title: string
  onBack?: () => void
}

export const WorkspaceCenterPane = ({
  actions,
  backLabel,
  children,
  contentClassName,
  contentKind,
  onBack,
  rename,
  slotControls,
  title,
}: WorkspaceCenterPaneProps) => (
  <section
    className='flex h-screen min-w-0 flex-1 flex-col bg-vbi-bg transition-colors duration-300 max-[720px]:h-auto max-[720px]:min-h-0'
    data-workspace-content={contentKind}
    data-workspace-slot='center'
  >
    <WorkspaceSlotHeader
      actions={actions}
      backLabel={backLabel}
      rename={rename}
      slotControls={slotControls}
      title={title}
      onBack={onBack}
    />
    <main className={cn('min-h-0 w-full min-w-0 flex-1 overflow-auto bg-transparent', contentClassName)}>
      {children}
    </main>
  </section>
)
