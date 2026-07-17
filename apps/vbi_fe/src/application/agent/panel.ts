import type { AgentPanelApplication } from './contract'
import { layoutApplicationStore } from '../layout/store'

export const getAgentPanelApplication = (): AgentPanelApplication => {
  return layoutApplicationStore.getState().sidePanel
}
