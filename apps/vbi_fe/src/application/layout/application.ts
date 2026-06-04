import { useManageSidebarStore, workspacePlacementValues } from '../../stores/manage-sidebar.store'
import type { LayoutApplication } from './contract'
import { getWorkspaceSidePanelApplication } from './side-panel'

export const getLayoutApplication = (): LayoutApplication => {
  const layout = useManageSidebarStore.getState()

  return {
    sidebar: {
      collapsed: layout.collapsed,
      resetWidth: layout.resetWidth,
      setCollapsed: layout.setCollapsed,
      setWidth: layout.setWidth,
      toggleCollapsed: layout.toggleCollapsed,
      width: layout.width,
    },
    sidePanel: getWorkspaceSidePanelApplication(),
    workspacePlacement: {
      change: layout.setWorkspacePlacement,
      list: () => [...workspacePlacementValues],
      toggle: layout.toggleWorkspacePlacement,
      value: layout.workspacePlacement,
    },
  }
}
