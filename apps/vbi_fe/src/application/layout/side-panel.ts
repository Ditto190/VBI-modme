import { useWorkspaceSidePanelStore, workspaceSidePanelModes } from '../../stores/workspace-side-panel.store'
import type { WorkspaceSidePanelApplication } from './contract'

export const getWorkspaceSidePanelApplication = (): WorkspaceSidePanelApplication => {
  const state = useWorkspaceSidePanelStore.getState()

  return {
    collapsed: state.collapsed,
    floatingPosition: state.floatingPosition,
    mode: state.mode,
    changeMode: state.setMode,
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
