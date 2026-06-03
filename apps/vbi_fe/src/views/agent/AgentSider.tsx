'use client'

import { WorkspaceSidePanel } from '../workspace/WorkspaceSidePanel'
import { AgentChatSurface } from './AgentPage'

type AgentSiderProps = {
  className?: string
}

export const AgentSider = ({ className }: AgentSiderProps) => (
  <WorkspaceSidePanel
    ariaLabel='VBI Agent'
    className={className}
    contentClassName='overflow-hidden'
    contentKind='agent'
    title='VBI Agent'
  >
    <AgentChatSurface className='h-full flex-1' />
  </WorkspaceSidePanel>
)
