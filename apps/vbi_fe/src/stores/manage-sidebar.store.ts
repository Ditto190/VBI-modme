import { create } from 'zustand'

type ManageSidebarState = {
  collapsed: boolean
  width: number
  resetWidth(): void
  setCollapsed(collapsed: boolean): void
  setWidth(width: number): void
  toggleCollapsed(): void
}

export const manageSidebarWidthStorageKey = 'vbi.manage.sidebarWidth'
export const defaultManageSidebarWidth = 300
export const minManageSidebarWidth = 240
export const maxManageSidebarWidth = 420

const clampManageSidebarWidth = (width: number) =>
  Math.min(maxManageSidebarWidth, Math.max(minManageSidebarWidth, Math.round(width)))

const readPersistedManageSidebarWidth = () => {
  if (typeof window === 'undefined') return defaultManageSidebarWidth

  try {
    const storedWidth = Number(window.localStorage.getItem(manageSidebarWidthStorageKey))
    return Number.isFinite(storedWidth) ? clampManageSidebarWidth(storedWidth) : defaultManageSidebarWidth
  } catch {
    return defaultManageSidebarWidth
  }
}

const persistManageSidebarWidth = (width: number) => {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(manageSidebarWidthStorageKey, String(width))
  } catch {
    // Keep the in-memory width when storage is unavailable.
  }
}

export const useManageSidebarStore = create<ManageSidebarState>((set, get) => ({
  collapsed: false,
  width: readPersistedManageSidebarWidth(),
  resetWidth: () => {
    get().setWidth(defaultManageSidebarWidth)
  },
  setCollapsed: (collapsed) => set((state) => (state.collapsed === collapsed ? state : { collapsed })),
  setWidth: (width) =>
    set((state) => {
      const nextWidth = clampManageSidebarWidth(width)
      persistManageSidebarWidth(nextWidth)
      return state.width === nextWidth ? state : { width: nextWidth }
    }),
  toggleCollapsed: () => {
    get().setCollapsed(!get().collapsed)
  },
}))
