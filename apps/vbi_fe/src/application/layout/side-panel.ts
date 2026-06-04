import {
  useWorkspaceSidePanelStore,
  workspaceSidePanelModes,
  type WorkspaceSidePanelMode,
} from '../../stores/workspace-side-panel.store'
import type { WorkspaceSidePanelApplication } from './contract'

const assertListedWorkspaceSidePanelMode = (mode: WorkspaceSidePanelMode) => {
  if (workspaceSidePanelModes.includes(mode)) return

  throw new Error(
    `Unknown application side panel mode "${String(mode)}". Use application.getState().layout.sidePanel.listMode() before application.getState().layout.sidePanel.changeMode().`,
  )
}

export const getWorkspaceSidePanelApplication = (): WorkspaceSidePanelApplication => {
  const state = useWorkspaceSidePanelStore.getState()

  return {
    collapsed: state.collapsed,
    floatingPosition: state.floatingPosition,
    mode: state.mode,
    changeMode: (mode) => {
      assertListedWorkspaceSidePanelMode(mode)
      state.setMode(mode)
    },
    listMode: () => [...workspaceSidePanelModes],
    resetWidth: state.resetWidth,
    setCollapsed: state.setCollapsed,
    setFloatingPosition: state.setFloatingPosition,
    setWidth: state.setWidth,
    toggleCollapsed: state.toggleCollapsed,
    toggleMode: state.toggleMode,
    width: state.width,
  }
}
