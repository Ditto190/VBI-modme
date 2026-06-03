export type ManageSidebarApplication = {
  collapsed: boolean
  width: number
  resetWidth(): void
  setCollapsed(collapsed: boolean): void
  setWidth(width: number): void
  toggleCollapsed(): void
}

export type LayoutApplication = {
  sidebar: ManageSidebarApplication
}
