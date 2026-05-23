import { create } from 'zustand'

type NavigationState = {
  navigate: ((path: string) => void) | null
  pathname: string
  go(path: string): void
  openReport(id: string): void
  setNavigate(navigate: (path: string) => void): void
  setPathname(pathname: string): void
}

export const useNavigationStore = create<NavigationState>((set, get) => ({
  navigate: null,
  pathname: '',
  go: (path) => {
    get().navigate?.(path)
  },
  openReport: (id) => {
    get().go(`/manage/reports/${id}`)
  },
  setNavigate: (navigate) => set({ navigate }),
  setPathname: (pathname) => set({ pathname }),
}))
