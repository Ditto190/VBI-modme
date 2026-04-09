import type { HocuspocusProvider } from '@hocuspocus/provider';

const USER_KEY = 'vbi-fe-user-name';
const COLORS = [
  '#f56a00',
  '#7265e6',
  '#ffbf00',
  '#00a2ae',
  '#1890ff',
  '#52c41a',
  '#f5222d',
];

const getStableColor = (userName: string) => {
  let hash = 0;
  for (const char of userName) {
    hash = (hash * 31 + char.charCodeAt(0)) | 0;
  }
  return COLORS[Math.abs(hash) % COLORS.length] ?? COLORS[0];
};

export const getSessionUserName = () => {
  if (typeof window === 'undefined') {
    return 'vbi-user';
  }
  const cached = window.sessionStorage.getItem(USER_KEY);
  if (cached) {
    return cached;
  }
  const next = `user-${Math.random().toString(36).slice(2, 6)}`;
  window.sessionStorage.setItem(USER_KEY, next);
  return next;
};

export const setCollaborativeUser = (
  provider: HocuspocusProvider | null,
  userName: string,
) => {
  const awareness = provider?.awareness;
  if (!awareness) return;

  const user = awareness.getLocalState()?.user as
    | {
        color?: string;
        id?: string;
        name?: string;
        cursor?: { x: number; y: number };
      }
    | undefined;
  const color = getStableColor(userName);

  if (user?.id === userName && user.name === userName && user.color === color) {
    return;
  }

  awareness.setLocalStateField('user', {
    ...user,
    id: userName,
    name: userName,
    color,
    updatedAt: Date.now(),
  });
};
