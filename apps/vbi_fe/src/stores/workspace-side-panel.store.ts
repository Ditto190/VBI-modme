import { create } from 'zustand'

export const workspaceSidePanelModes = ['fixed', 'floating'] as const
export type WorkspaceSidePanelMode = (typeof workspaceSidePanelModes)[number]
export type WorkspaceSidePanelFloatingPosition = {
  x: number
  y: number
}

type WorkspaceSidePanelState = {
  collapsed: boolean
  floatingPosition: WorkspaceSidePanelFloatingPosition | null
  mode: WorkspaceSidePanelMode
  width: number
  resetWidth(): void
  setCollapsed(collapsed: boolean): void
  setFloatingPosition(position: WorkspaceSidePanelFloatingPosition | null): void
  setMode(mode: WorkspaceSidePanelMode): void
  setWidth(width: number): void
  toggleCollapsed(): void
  toggleMode(): void
}

export const workspaceSidePanelModeStorageKey = 'vbi.layout.sidePanelMode'
export const workspaceSidePanelWidthStorageKey = 'vbi.layout.sidePanelWidth'
export const workspaceSidePanelFloatingPositionStorageKey = 'vbi.layout.sidePanelFloatingPosition'
export const legacyAgentPanelModeStorageKey = 'vbi.agent.panelMode'
export const legacyAgentPanelWidthStorageKey = 'vbi.agent.panelWidth'
export const legacyAgentPanelFloatingPositionStorageKey = 'vbi.agent.panelFloatingPosition'
export const defaultWorkspaceSidePanelMode: WorkspaceSidePanelMode = 'fixed'
export const defaultWorkspaceSidePanelWidth = 600
export const minWorkspaceSidePanelWidth = 300
export const maxWorkspaceSidePanelWidth = 1000

export const isWorkspaceSidePanelMode = (value: unknown): value is WorkspaceSidePanelMode =>
  workspaceSidePanelModes.includes(value as WorkspaceSidePanelMode)

const clampWorkspaceSidePanelWidth = (width: number) =>
  Math.min(maxWorkspaceSidePanelWidth, Math.max(minWorkspaceSidePanelWidth, Math.round(width)))

const readStorageValue = (storageKey: string, fallbackKey?: string) => {
  if (typeof window === 'undefined') return null

  try {
    return window.localStorage.getItem(storageKey) ?? (fallbackKey ? window.localStorage.getItem(fallbackKey) : null)
  } catch {
    return null
  }
}

const readPersistedWorkspaceSidePanelMode = () => {
  const storedMode = readStorageValue(workspaceSidePanelModeStorageKey, legacyAgentPanelModeStorageKey)
  return isWorkspaceSidePanelMode(storedMode) ? storedMode : defaultWorkspaceSidePanelMode
}

const readPersistedWorkspaceSidePanelWidth = () => {
  const storedWidth = Number(readStorageValue(workspaceSidePanelWidthStorageKey, legacyAgentPanelWidthStorageKey))
  return Number.isFinite(storedWidth) ? clampWorkspaceSidePanelWidth(storedWidth) : defaultWorkspaceSidePanelWidth
}

const readPersistedFloatingPosition = (): WorkspaceSidePanelFloatingPosition | null => {
  const storedPosition = readStorageValue(
    workspaceSidePanelFloatingPositionStorageKey,
    legacyAgentPanelFloatingPositionStorageKey,
  )
  if (!storedPosition) return null

  try {
    const value = JSON.parse(storedPosition) as Partial<WorkspaceSidePanelFloatingPosition>
    if (typeof value.x !== 'number' || typeof value.y !== 'number') return null
    if (!Number.isFinite(value.x) || !Number.isFinite(value.y)) return null
    return {
      x: Math.round(value.x),
      y: Math.round(value.y),
    }
  } catch {
    return null
  }
}

const persistWorkspaceSidePanelMode = (mode: WorkspaceSidePanelMode) => {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(workspaceSidePanelModeStorageKey, mode)
  } catch {
    // Keep the in-memory mode when storage is unavailable.
  }
}

const persistWorkspaceSidePanelWidth = (width: number) => {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(workspaceSidePanelWidthStorageKey, String(width))
  } catch {
    // Keep the in-memory width when storage is unavailable.
  }
}

const persistFloatingPosition = (position: WorkspaceSidePanelFloatingPosition | null) => {
  if (typeof window === 'undefined') return

  try {
    if (position) {
      window.localStorage.setItem(workspaceSidePanelFloatingPositionStorageKey, JSON.stringify(position))
      return
    }
    window.localStorage.removeItem(workspaceSidePanelFloatingPositionStorageKey)
  } catch {
    // Keep the in-memory floating position when storage is unavailable.
  }
}

export const useWorkspaceSidePanelStore = create<WorkspaceSidePanelState>((set, get) => ({
  collapsed: false,
  floatingPosition: readPersistedFloatingPosition(),
  mode: readPersistedWorkspaceSidePanelMode(),
  width: readPersistedWorkspaceSidePanelWidth(),
  resetWidth: () => {
    get().setWidth(defaultWorkspaceSidePanelWidth)
  },
  setCollapsed: (collapsed) => set((state) => (state.collapsed === collapsed ? state : { collapsed })),
  setFloatingPosition: (position) =>
    set((state) => {
      const nextPosition = position ? { x: Math.round(position.x), y: Math.round(position.y) } : null
      persistFloatingPosition(nextPosition)
      if (state.floatingPosition?.x === nextPosition?.x && state.floatingPosition?.y === nextPosition?.y) {
        return state
      }
      return { floatingPosition: nextPosition }
    }),
  setMode: (mode) =>
    set((state) => {
      persistWorkspaceSidePanelMode(mode)
      return state.mode === mode ? state : { mode }
    }),
  setWidth: (width) =>
    set((state) => {
      const nextWidth = clampWorkspaceSidePanelWidth(width)
      persistWorkspaceSidePanelWidth(nextWidth)
      return state.width === nextWidth ? state : { width: nextWidth }
    }),
  toggleCollapsed: () => {
    get().setCollapsed(!get().collapsed)
  },
  toggleMode: () => {
    get().setMode(get().mode === 'fixed' ? 'floating' : 'fixed')
  },
}))
