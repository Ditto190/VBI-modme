import { createPortal } from 'react-dom'
import type { CollaboratorClient } from './collaborators-state'
import { MousePointer2 } from './ui/icons'

type CollaboratorCursorOverlayProps = {
  users: CollaboratorClient[]
}

export const CollaboratorCursorOverlay = ({ users }: CollaboratorCursorOverlayProps) => {
  if (typeof document === 'undefined') return null

  return createPortal(
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      {users.map((user) => {
        if (!user.cursor) return null

        const { x, y } = user.cursor

        return (
          <div
            key={user.clientId}
            style={{
              position: 'absolute',
              left: `${x * 100}%`,
              top: `${y * 100}%`,
              pointerEvents: 'none',
              transition: 'left 0.1s linear, top 0.1s linear',
            }}
          >
            <MousePointer2
              aria-hidden='true'
              size={24}
              style={{
                display: 'block',
                filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.2))',
                color: user.color,
              }}
            />
            <div
              style={{
                backgroundColor: user.color,
                color: 'white',
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '12px',
                whiteSpace: 'nowrap',
                marginTop: '4px',
                marginLeft: '12px',
                boxShadow: '0px 2px 2px rgba(0,0,0,0.2)',
              }}
            >
              {user.name}
            </div>
          </div>
        )
      })}
    </div>,
    document.body,
  )
}
