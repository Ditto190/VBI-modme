import { expect, test } from '@rstest/core';
import {
  getAvatarUsers,
  getCollaboratorClients,
  getCursorUsers,
  mergeLocalCursor,
} from '../src/components/collaborators-state';

const user = {
  color: '#1890ff',
  id: 'user-a',
  name: 'user-a',
  updatedAt: 1,
};

test('keeps same-user cursors by client id while deduping avatars', () => {
  const clients = getCollaboratorClients(
    new Map([
      [1, { user: { ...user, updatedAt: 3 } }],
      [2, { user: { ...user, cursor: { x: 0.25, y: 0.5 }, updatedAt: 2 } }],
    ]),
  );

  expect(getAvatarUsers(clients)).toHaveLength(1);
  expect(getCursorUsers(clients, 1)).toEqual([
    { ...user, clientId: 2, cursor: { x: 0.25, y: 0.5 }, updatedAt: 2 },
  ]);
});

test('merges cursor without dropping the collaborative user identity', () => {
  expect(mergeLocalCursor(user, { x: 0.1, y: 0.2 })).toMatchObject({
    color: user.color,
    cursor: { x: 0.1, y: 0.2 },
    id: user.id,
    name: user.name,
  });
});
