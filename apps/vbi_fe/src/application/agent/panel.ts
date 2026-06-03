import { useAgentPanelStore } from '../../stores/agent-panel.store'
import type { AgentPanelApplication } from './contract'

export const getAgentPanelApplication = (): AgentPanelApplication => {
  const state = useAgentPanelStore.getState()

  return {
    collapsed: state.collapsed,
    floatingPosition: state.floatingPosition,
    mode: state.mode,
    width: state.width,
    setCollapsed: state.setCollapsed,
    setFloatingPosition: state.setFloatingPosition,
    setMode: state.setMode,
    setWidth: state.setWidth,
    toggleCollapsed: state.toggleCollapsed,
    toggleMode: state.toggleMode,
  }
}
