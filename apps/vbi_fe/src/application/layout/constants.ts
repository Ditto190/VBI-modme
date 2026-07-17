export const manageSidebarWidthStorageKey = 'vbi.manage.sidebarWidth'
export const workspacePlacementStorageKey = 'vbi.layout.workspacePlacement'
export const defaultManageSidebarWidth = 300
export const minManageSidebarWidth = 240
export const maxManageSidebarWidth = 420
export const workspacePlacementValues = ['resource-center', 'agent-center'] as const
export type WorkspacePlacement = (typeof workspacePlacementValues)[number]
export const defaultWorkspacePlacement: WorkspacePlacement = 'resource-center'

export const workspaceSidePanelModes = ['fixed', 'floating'] as const
export type WorkspaceSidePanelMode = (typeof workspaceSidePanelModes)[number]
export type WorkspaceSidePanelFloatingPosition = {
  x: number
  y: number
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

export const isWorkspacePlacement = (value: unknown): value is WorkspacePlacement =>
  workspacePlacementValues.includes(value as WorkspacePlacement)

export const isWorkspaceSidePanelMode = (value: unknown): value is WorkspaceSidePanelMode =>
  workspaceSidePanelModes.includes(value as WorkspaceSidePanelMode)

export const clampManageSidebarWidth = (width: number) =>
  Math.min(maxManageSidebarWidth, Math.max(minManageSidebarWidth, Math.round(width)))

export const clampWorkspaceSidePanelWidth = (width: number) =>
  Math.min(maxWorkspaceSidePanelWidth, Math.max(minWorkspaceSidePanelWidth, Math.round(width)))
