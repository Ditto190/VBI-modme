import { useManageSidebarStore } from '../../stores/manage-sidebar.store'
import type { LayoutApplication } from './contract'

export const getLayoutApplication = (): LayoutApplication => {
  const sidebar = useManageSidebarStore.getState()

  return {
    sidebar: {
      collapsed: sidebar.collapsed,
      resetWidth: sidebar.resetWidth,
      setCollapsed: sidebar.setCollapsed,
      setWidth: sidebar.setWidth,
      toggleCollapsed: sidebar.toggleCollapsed,
      width: sidebar.width,
    },
  }
}
