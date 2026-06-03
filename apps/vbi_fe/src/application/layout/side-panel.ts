import { useWorkspaceSidePanelStore } from '../../stores/workspace-side-panel.store'
import type { WorkspaceSidePanelApplication } from './contract'

export const getWorkspaceSidePanelApplication = (): WorkspaceSidePanelApplication => {
  const state = useWorkspaceSidePanelStore.getState()

  return {
    collapsed: state.collapsed,
    floatingPosition: state.floatingPosition,
    mode: state.mode,
    resetWidth: state.resetWidth,
    setCollapsed: state.setCollapsed,
    setFloatingPosition: state.setFloatingPosition,
    setMode: state.setMode,
    setWidth: state.setWidth,
    toggleCollapsed: state.toggleCollapsed,
    toggleMode: state.toggleMode,
    width: state.width,
  }
}
