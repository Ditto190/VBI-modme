import { create } from 'zustand';
import type { NavigateFunction } from 'react-router-dom';

type NavigationState = {
  navigate: NavigateFunction | null;
  pathname: string;
  go(path: string): void;
  openReport(id: string): void;
  setNavigate(navigate: NavigateFunction): void;
  setPathname(pathname: string): void;
};

export const useNavigationStore = create<NavigationState>((set, get) => ({
  navigate: null,
  pathname: '',
  go: (path) => {
    get().navigate?.(path);
  },
  openReport: (id) => {
    get().go(`/reports/${id}`);
  },
  setNavigate: (navigate) => set({ navigate }),
  setPathname: (pathname) => set({ pathname }),
}));

export const getNavigationSnapshot = () => ({
  pathname: useNavigationStore.getState().pathname,
});
