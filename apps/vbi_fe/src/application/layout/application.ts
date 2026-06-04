import {
  useManageSidebarStore,
  workspacePlacementValues,
  type WorkspacePlacement,
} from '../../stores/manage-sidebar.store'
import type { LayoutApplication } from './contract'
import { getWorkspaceSidePanelApplication } from './side-panel'

const assertListedWorkspacePlacement = (placement: WorkspacePlacement) => {
  if (workspacePlacementValues.includes(placement)) return

  throw new Error(
    `Unknown application workspace placement "${String(placement)}". Use application.getState().layout.workspacePlacement.list() before application.getState().layout.workspacePlacement.change().`,
  )
}

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
      change: (placement) => {
        assertListedWorkspacePlacement(placement)
        layout.setWorkspacePlacement(placement)
      },
      list: () => [...workspacePlacementValues],
      toggle: layout.toggleWorkspacePlacement,
      value: layout.workspacePlacement,
    },
  }
}
