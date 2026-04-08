const USER_KEY = 'vbi-fe-user-name';

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
