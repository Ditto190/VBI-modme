import { createStore } from 'zustand/vanilla'
import {
  clampManageSidebarWidth,
  clampWorkspaceSidePanelWidth,
  defaultManageSidebarWidth,
  defaultWorkspacePlacement,
  defaultWorkspaceSidePanelMode,
  defaultWorkspaceSidePanelWidth,
  isWorkspacePlacement,
  isWorkspaceSidePanelMode,
  legacyAgentPanelFloatingPositionStorageKey,
  legacyAgentPanelModeStorageKey,
  legacyAgentPanelWidthStorageKey,
  manageSidebarWidthStorageKey,
  workspacePlacementStorageKey,
  workspacePlacementValues,
  workspaceSidePanelFloatingPositionStorageKey,
  workspaceSidePanelModeStorageKey,
  workspaceSidePanelModes,
  workspaceSidePanelWidthStorageKey,
  type WorkspacePlacement,
  type WorkspaceSidePanelFloatingPosition,
  type WorkspaceSidePanelMode,
} from './constants'
import type { LayoutApplication } from './contract'

const readStorageValue = (storageKey: string, fallbackKey?: string) => {
  if (typeof window === 'undefined') return null

  try {
    return window.localStorage.getItem(storageKey) ?? (fallbackKey ? window.localStorage.getItem(fallbackKey) : null)
  } catch {
    return null
  }
}

const writeStorageValue = (storageKey: string, value: string) => {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(storageKey, value)
  } catch {
    // Keep the in-memory state when storage is unavailable.
  }
}

const removeStorageValue = (storageKey: string) => {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.removeItem(storageKey)
  } catch {
    // Keep the in-memory state when storage is unavailable.
  }
}

const readPersistedManageSidebarWidth = () => {
  const storedWidth = Number(readStorageValue(manageSidebarWidthStorageKey))
  return Number.isFinite(storedWidth) ? clampManageSidebarWidth(storedWidth) : defaultManageSidebarWidth
}

const readPersistedWorkspacePlacement = () => {
  const storedPlacement = readStorageValue(workspacePlacementStorageKey)
  return isWorkspacePlacement(storedPlacement) ? storedPlacement : defaultWorkspacePlacement
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

const assertListedWorkspacePlacement = (placement: WorkspacePlacement) => {
  if (workspacePlacementValues.includes(placement)) return

  throw new Error(
    `Unknown application workspace placement "${String(placement)}". Use application.getState().layout.workspacePlacement.list() before application.getState().layout.workspacePlacement.change().`,
  )
}

const assertListedWorkspaceSidePanelMode = (mode: WorkspaceSidePanelMode) => {
  if (workspaceSidePanelModes.includes(mode)) return

  throw new Error(
    `Unknown application side panel mode "${String(mode)}". Use application.getState().layout.sidePanel.listMode() before application.getState().layout.sidePanel.changeMode().`,
  )
}

export const layoutApplicationStore = createStore<LayoutApplication>()((set, get) => {
  const setSidebarCollapsed = (collapsed: boolean) => {
    set((state) =>
      state.sidebar.collapsed === collapsed
        ? state
        : {
            sidebar: {
              ...state.sidebar,
              collapsed,
            },
          },
    )
  }

  const setSidebarWidth = (width: number) => {
    const nextWidth = clampManageSidebarWidth(width)
    writeStorageValue(manageSidebarWidthStorageKey, String(nextWidth))
    set((state) =>
      state.sidebar.width === nextWidth
        ? state
        : {
            sidebar: {
              ...state.sidebar,
              width: nextWidth,
            },
          },
    )
  }

  const setSidePanelCollapsed = (collapsed: boolean) => {
    set((state) =>
      state.sidePanel.collapsed === collapsed
        ? state
        : {
            sidePanel: {
              ...state.sidePanel,
              collapsed,
            },
          },
    )
  }

  const setSidePanelMode = (mode: WorkspaceSidePanelMode) => {
    assertListedWorkspaceSidePanelMode(mode)
    writeStorageValue(workspaceSidePanelModeStorageKey, mode)
    set((state) =>
      state.sidePanel.mode === mode
        ? state
        : {
            sidePanel: {
              ...state.sidePanel,
              mode,
            },
          },
    )
  }

  const setSidePanelWidth = (width: number) => {
    const nextWidth = clampWorkspaceSidePanelWidth(width)
    writeStorageValue(workspaceSidePanelWidthStorageKey, String(nextWidth))
    set((state) =>
      state.sidePanel.width === nextWidth
        ? state
        : {
            sidePanel: {
              ...state.sidePanel,
              width: nextWidth,
            },
          },
    )
  }

  const setSidePanelFloatingPosition = (position: WorkspaceSidePanelFloatingPosition | null) => {
    const nextPosition = position ? { x: Math.round(position.x), y: Math.round(position.y) } : null
    if (nextPosition) {
      writeStorageValue(workspaceSidePanelFloatingPositionStorageKey, JSON.stringify(nextPosition))
    } else {
      removeStorageValue(workspaceSidePanelFloatingPositionStorageKey)
    }
    set((state) => {
      if (
        state.sidePanel.floatingPosition?.x === nextPosition?.x &&
        state.sidePanel.floatingPosition?.y === nextPosition?.y
      ) {
        return state
      }
      return {
        sidePanel: {
          ...state.sidePanel,
          floatingPosition: nextPosition,
        },
      }
    })
  }

  const setWorkspacePlacement = (placement: WorkspacePlacement) => {
    assertListedWorkspacePlacement(placement)
    writeStorageValue(workspacePlacementStorageKey, placement)
    set((state) =>
      state.workspacePlacement.value === placement
        ? state
        : {
            workspacePlacement: {
              ...state.workspacePlacement,
              value: placement,
            },
          },
    )
  }

  return {
    sidebar: {
      collapsed: false,
      resetWidth: () => setSidebarWidth(defaultManageSidebarWidth),
      setCollapsed: setSidebarCollapsed,
      setWidth: setSidebarWidth,
      toggleCollapsed: () => setSidebarCollapsed(!get().sidebar.collapsed),
      width: readPersistedManageSidebarWidth(),
    },
    sidePanel: {
      collapsed: false,
      floatingPosition: readPersistedFloatingPosition(),
      mode: readPersistedWorkspaceSidePanelMode(),
      changeMode: setSidePanelMode,
      listMode: () => [...workspaceSidePanelModes],
      resetWidth: () => setSidePanelWidth(defaultWorkspaceSidePanelWidth),
      setCollapsed: setSidePanelCollapsed,
      setFloatingPosition: setSidePanelFloatingPosition,
      setWidth: setSidePanelWidth,
      toggleCollapsed: () => setSidePanelCollapsed(!get().sidePanel.collapsed),
      toggleMode: () => setSidePanelMode(get().sidePanel.mode === 'fixed' ? 'floating' : 'fixed'),
      width: readPersistedWorkspaceSidePanelWidth(),
    },
    workspacePlacement: {
      change: setWorkspacePlacement,
      list: () => [...workspacePlacementValues],
      toggle: () =>
        setWorkspacePlacement(
          get().workspacePlacement.value === 'resource-center' ? 'agent-center' : 'resource-center',
        ),
      value: readPersistedWorkspacePlacement(),
    },
  }
})

export const setLayoutApplicationState = (partial: {
  sidebar?: Partial<Pick<LayoutApplication['sidebar'], 'collapsed' | 'width'>>
  sidePanel?: Partial<Pick<LayoutApplication['sidePanel'], 'collapsed' | 'floatingPosition' | 'mode' | 'width'>>
  workspacePlacement?: WorkspacePlacement
}) => {
  if (partial.sidebar?.collapsed !== undefined)
    layoutApplicationStore.getState().sidebar.setCollapsed(partial.sidebar.collapsed)
  if (partial.sidebar?.width !== undefined) layoutApplicationStore.getState().sidebar.setWidth(partial.sidebar.width)
  if (partial.sidePanel?.collapsed !== undefined)
    layoutApplicationStore.getState().sidePanel.setCollapsed(partial.sidePanel.collapsed)
  if (partial.sidePanel?.floatingPosition !== undefined) {
    layoutApplicationStore.getState().sidePanel.setFloatingPosition(partial.sidePanel.floatingPosition)
  }
  if (partial.sidePanel?.mode !== undefined)
    layoutApplicationStore.getState().sidePanel.changeMode(partial.sidePanel.mode)
  if (partial.sidePanel?.width !== undefined)
    layoutApplicationStore.getState().sidePanel.setWidth(partial.sidePanel.width)
  if (partial.workspacePlacement !== undefined) {
    layoutApplicationStore.getState().workspacePlacement.change(partial.workspacePlacement)
  }
}
