import type { AgentPanelApplication } from './contract'
import { getWorkspaceSidePanelApplication } from '../layout/side-panel'

export const getAgentPanelApplication = (): AgentPanelApplication => {
  return getWorkspaceSidePanelApplication()
}
