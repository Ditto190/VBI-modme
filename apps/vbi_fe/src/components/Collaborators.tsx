import { useEffect, useState } from 'react'
import type { HocuspocusProvider } from '@hocuspocus/provider'
import { funnel } from 'remeda'
import { Tooltip } from './ui/tooltip'
import { CollaboratorCursorOverlay } from './CollaboratorCursorOverlay'
import {
  getAvatarUsers,
  getCollaboratorClients,
  getCursorPosition,
  getCursorUsers,
  mergeLocalCursor,
  type CollaboratorClient,
} from './collaborators-state'

type CollaboratorsProps = {
  provider: HocuspocusProvider
}

export const Collaborators = ({ provider }: CollaboratorsProps) => {
  const [clients, setClients] = useState<CollaboratorClient[]>([])
  const awareness = provider.awareness

  useEffect(() => {
    if (!awareness) return

    const mouseMoveFunnel = funnel<[MouseEvent], MouseEvent>(
      (event) => {
        const user = awareness.getLocalState()?.user
        const nextUser = mergeLocalCursor(user, getCursorPosition(event))
        if (nextUser) {
          awareness.setLocalStateField('user', nextUser)
        }
      },
      {
        minGapMs: 50,
        triggerAt: 'both',
        reducer: (_prev, event) => event,
      },
    )

    const updateClients = () => {
      setClients(getCollaboratorClients(awareness.getStates()))
    }
    const handleMouseMove = (event: MouseEvent) => mouseMoveFunnel.call(event)

    updateClients()
    window.addEventListener('mousemove', handleMouseMove)
    awareness.on('change', updateClients)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      awareness.off('change', updateClients)
      mouseMoveFunnel.cancel()
    }
  }, [awareness])

  if (!awareness) return null

  return (
    <>
      <div className='flex items-center overflow-hidden p-2.5'>
        <div className='flex -space-x-2'>
          {getAvatarUsers(clients)
            .slice(0, 8)
            .map((user) => (
              <Tooltip title={user.name} key={user.id}>
                <span
                  className='flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--vbi-secondary)] text-xs font-semibold text-white shadow-sm'
                  style={{ backgroundColor: user.color }}
                >
                  {user.name[0]?.toUpperCase()}
                </span>
              </Tooltip>
            ))}
        </div>
      </div>
      <CollaboratorCursorOverlay users={getCursorUsers(clients, awareness.clientID)} />
    </>
  )
}
