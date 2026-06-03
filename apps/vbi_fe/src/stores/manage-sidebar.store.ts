import { create } from 'zustand'

type ManageSidebarState = {
  collapsed: boolean
  workspacePlacement: WorkspacePlacement
  width: number
  resetWidth(): void
  setCollapsed(collapsed: boolean): void
  setWorkspacePlacement(placement: WorkspacePlacement): void
  setWidth(width: number): void
  toggleCollapsed(): void
  toggleWorkspacePlacement(): void
}

export const manageSidebarWidthStorageKey = 'vbi.manage.sidebarWidth'
export const workspacePlacementStorageKey = 'vbi.layout.workspacePlacement'
export const defaultManageSidebarWidth = 300
export const minManageSidebarWidth = 240
export const maxManageSidebarWidth = 420
export const workspacePlacementValues = ['resource-center', 'agent-center'] as const
export type WorkspacePlacement = (typeof workspacePlacementValues)[number]
export const defaultWorkspacePlacement: WorkspacePlacement = 'resource-center'

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

const isWorkspacePlacement = (value: unknown): value is WorkspacePlacement =>
  workspacePlacementValues.includes(value as WorkspacePlacement)

const readPersistedWorkspacePlacement = () => {
  if (typeof window === 'undefined') return defaultWorkspacePlacement

  try {
    const storedPlacement = window.localStorage.getItem(workspacePlacementStorageKey)
    return isWorkspacePlacement(storedPlacement) ? storedPlacement : defaultWorkspacePlacement
  } catch {
    return defaultWorkspacePlacement
  }
}

const persistWorkspacePlacement = (placement: WorkspacePlacement) => {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(workspacePlacementStorageKey, placement)
  } catch {
    // Keep the in-memory placement when storage is unavailable.
  }
}

export const useManageSidebarStore = create<ManageSidebarState>((set, get) => ({
  collapsed: false,
  workspacePlacement: readPersistedWorkspacePlacement(),
  width: readPersistedManageSidebarWidth(),
  resetWidth: () => {
    get().setWidth(defaultManageSidebarWidth)
  },
  setCollapsed: (collapsed) => set((state) => (state.collapsed === collapsed ? state : { collapsed })),
  setWorkspacePlacement: (workspacePlacement) =>
    set((state) => {
      persistWorkspacePlacement(workspacePlacement)
      return state.workspacePlacement === workspacePlacement ? state : { workspacePlacement }
    }),
  setWidth: (width) =>
    set((state) => {
      const nextWidth = clampManageSidebarWidth(width)
      persistManageSidebarWidth(nextWidth)
      return state.width === nextWidth ? state : { width: nextWidth }
    }),
  toggleCollapsed: () => {
    get().setCollapsed(!get().collapsed)
  },
  toggleWorkspacePlacement: () => {
    get().setWorkspacePlacement(get().workspacePlacement === 'resource-center' ? 'agent-center' : 'resource-center')
  },
}))
