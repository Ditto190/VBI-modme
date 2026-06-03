import { create } from 'zustand'

export type AgentPanelMode = 'fixed' | 'floating'
export type AgentPanelFloatingPosition = {
  x: number
  y: number
}

type AgentPanelState = {
  collapsed: boolean
  floatingPosition: AgentPanelFloatingPosition | null
  mode: AgentPanelMode
  width: number
  setCollapsed(collapsed: boolean): void
  setFloatingPosition(position: AgentPanelFloatingPosition | null): void
  setMode(mode: AgentPanelMode): void
  setWidth(width: number): void
  toggleCollapsed(): void
  toggleMode(): void
}

export const agentPanelModeStorageKey = 'vbi.agent.panelMode'
export const agentPanelWidthStorageKey = 'vbi.agent.panelWidth'
export const agentPanelFloatingPositionStorageKey = 'vbi.agent.panelFloatingPosition'
export const defaultAgentPanelMode: AgentPanelMode = 'fixed'
export const defaultAgentPanelWidth = 500
export const minAgentPanelWidth = 300
export const maxAgentPanelWidth = 720

export const isAgentPanelMode = (value: unknown): value is AgentPanelMode => value === 'fixed' || value === 'floating'

const readPersistedAgentPanelMode = () => {
  if (typeof window === 'undefined') return defaultAgentPanelMode

  try {
    const storedMode = window.localStorage.getItem(agentPanelModeStorageKey)
    return isAgentPanelMode(storedMode) ? storedMode : defaultAgentPanelMode
  } catch {
    return defaultAgentPanelMode
  }
}

const clampAgentPanelWidth = (width: number) =>
  Math.min(maxAgentPanelWidth, Math.max(minAgentPanelWidth, Math.round(width)))

const readPersistedAgentPanelWidth = () => {
  if (typeof window === 'undefined') return defaultAgentPanelWidth

  try {
    const storedWidth = Number(window.localStorage.getItem(agentPanelWidthStorageKey))
    return Number.isFinite(storedWidth) ? clampAgentPanelWidth(storedWidth) : defaultAgentPanelWidth
  } catch {
    return defaultAgentPanelWidth
  }
}

const readPersistedFloatingPosition = (): AgentPanelFloatingPosition | null => {
  if (typeof window === 'undefined') return null

  try {
    const storedPosition = window.localStorage.getItem(agentPanelFloatingPositionStorageKey)
    if (!storedPosition) return null
    const value = JSON.parse(storedPosition) as Partial<AgentPanelFloatingPosition>
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

const persistAgentPanelMode = (mode: AgentPanelMode) => {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(agentPanelModeStorageKey, mode)
  } catch {
    // Keep the in-memory mode when storage is unavailable.
  }
}

const persistAgentPanelWidth = (width: number) => {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(agentPanelWidthStorageKey, String(width))
  } catch {
    // Keep the in-memory width when storage is unavailable.
  }
}

const persistFloatingPosition = (position: AgentPanelFloatingPosition | null) => {
  if (typeof window === 'undefined') return

  try {
    if (position) {
      window.localStorage.setItem(agentPanelFloatingPositionStorageKey, JSON.stringify(position))
      return
    }
    window.localStorage.removeItem(agentPanelFloatingPositionStorageKey)
  } catch {
    // Keep the in-memory floating position when storage is unavailable.
  }
}

export const useAgentPanelStore = create<AgentPanelState>((set, get) => ({
  collapsed: false,
  floatingPosition: readPersistedFloatingPosition(),
  mode: readPersistedAgentPanelMode(),
  width: readPersistedAgentPanelWidth(),
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
      persistAgentPanelMode(mode)
      return state.mode === mode ? state : { mode }
    }),
  setWidth: (width) =>
    set((state) => {
      const nextWidth = clampAgentPanelWidth(width)
      persistAgentPanelWidth(nextWidth)
      return state.width === nextWidth ? state : { width: nextWidth }
    }),
  toggleCollapsed: () => {
    get().setCollapsed(!get().collapsed)
  },
  toggleMode: () => {
    get().setMode(get().mode === 'fixed' ? 'floating' : 'fixed')
  },
}))
