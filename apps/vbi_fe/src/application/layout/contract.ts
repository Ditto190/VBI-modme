import type { WorkspacePlacement, WorkspaceSidePanelFloatingPosition, WorkspaceSidePanelMode } from './constants'

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
  change(placement: WorkspacePlacement): void
  list(): WorkspacePlacement[]
  toggle(): void
}

export type WorkspaceSidePanelApplication = {
  collapsed: boolean
  floatingPosition: WorkspaceSidePanelFloatingPosition | null
  mode: WorkspaceSidePanelMode
  width: number
  changeMode(mode: WorkspaceSidePanelMode): void
  listMode(): WorkspaceSidePanelMode[]
  resetWidth(): void
  setCollapsed(collapsed: boolean): void
  setFloatingPosition(position: WorkspaceSidePanelFloatingPosition | null): void
  setWidth(width: number): void
  toggleCollapsed(): void
  toggleMode(): void
}

export type LayoutApplication = {
  sidebar: ManageSidebarApplication
  sidePanel: WorkspaceSidePanelApplication
  workspacePlacement: WorkspacePlacementApplication
}
