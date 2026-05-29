import { create } from 'zustand'

type NavigationState = {
  navigate: ((path: string) => void) | null
  pathname: string
  go(path: string): void
  openChart(id: string): void
  openInsight(id: string): void
  openReport(id: string): void
  setNavigate(navigate: (path: string) => void): void
  setPathname(pathname: string): void
}

export const useNavigationStore = create<NavigationState>((set, get) => ({
  navigate: null,
  pathname: '',
  go: (path) => {
    if (get().pathname === path) return
    get().navigate?.(path)
  },
  openChart: (id) => {
    get().go(`/manage/charts/${id}`)
  },
  openInsight: (id) => {
    get().go(`/manage/insights/${id}`)
  },
  openReport: (id) => {
    get().go(`/manage/reports/${id}`)
  },
  setNavigate: (navigate) => {
    if (get().navigate === navigate) return
    set({ navigate })
  },
  setPathname: (pathname) => {
    if (get().pathname === pathname) return
    set({ pathname })
  },
}))
