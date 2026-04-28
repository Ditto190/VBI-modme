import { Avatar, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import { HocuspocusProvider } from '@hocuspocus/provider'
import { funnel } from 'remeda'
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
      <div style={{ padding: '10px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'nowrap',
            overflow: 'hidden',
          }}
        >
          <Avatar.Group
            max={{
              count: 8,
              style: { color: '#f56a00', backgroundColor: '#fde3cf' },
            }}
          >
            {getAvatarUsers(clients).map((user) => (
              <Tooltip title={user.name} placement="top" key={user.id}>
                <Avatar style={{ backgroundColor: user.color }}>{user.name[0]?.toUpperCase()}</Avatar>
              </Tooltip>
            ))}
          </Avatar.Group>
        </div>
      </div>
      <CollaboratorCursorOverlay users={getCursorUsers(clients, awareness.clientID)} />
    </>
  )
}
