import { createPortal } from 'react-dom';
import type { CollaboratorClient } from './collaborators-state';

type CollaboratorCursorOverlayProps = {
  users: CollaboratorClient[];
};

export const CollaboratorCursorOverlay = ({
  users,
}: CollaboratorCursorOverlayProps) => {
  if (typeof document === 'undefined') return null;

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
        if (!user.cursor) return null;

        const { x, y } = user.cursor;

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
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                display: 'block',
                filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.2))',
              }}
            >
              <path
                d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
                fill={user.color}
                stroke="white"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
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
        );
      })}
    </div>,
    document.body,
  );
};
