'use client'

import { WorkspaceSidePanel } from '../workspace/WorkspaceSidePanel'
import { useTranslation } from '../../i18n'
import { AgentChatSurface } from './AgentPage'

type AgentSiderProps = {
  className?: string
}

export const AgentSider = ({ className }: AgentSiderProps) => {
  const { t } = useTranslation()
  const agentLabel = t('nav.agent')

  return (
    <WorkspaceSidePanel
      ariaLabel={agentLabel}
      className={className}
      contentClassName='overflow-hidden'
      contentKind='agent'
      title={agentLabel}
    >
      <AgentChatSurface className='h-full flex-1' />
    </WorkspaceSidePanel>
  )
}
