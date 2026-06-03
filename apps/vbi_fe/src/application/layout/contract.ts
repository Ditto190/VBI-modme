import type { WorkspacePlacement } from '../../stores/manage-sidebar.store'
import type {
  WorkspaceSidePanelFloatingPosition,
  WorkspaceSidePanelMode,
} from '../../stores/workspace-side-panel.store'

export type ManageSidebarApplication = {
  collapsed: boolean
  width: number
  resetWidth(): void
  setCollapsed(collapsed: boolean): void
  setWidth(width: number): void
  toggleCollapsed(): void
}

export type WorkspacePlacementApplication = {
  value: WorkspacePlacement
  set(placement: WorkspacePlacement): void
  toggle(): void
}

export type WorkspaceSidePanelApplication = {
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

export type LayoutApplication = {
  sidebar: ManageSidebarApplication
  sidePanel: WorkspaceSidePanelApplication
  workspacePlacement: WorkspacePlacementApplication
}
