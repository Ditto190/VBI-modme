export {
  defaultWorkspaceSidePanelMode as defaultAgentPanelMode,
  defaultWorkspaceSidePanelWidth as defaultAgentPanelWidth,
  legacyAgentPanelFloatingPositionStorageKey as agentPanelFloatingPositionStorageKey,
  legacyAgentPanelModeStorageKey as agentPanelModeStorageKey,
  legacyAgentPanelWidthStorageKey as agentPanelWidthStorageKey,
  maxWorkspaceSidePanelWidth as maxAgentPanelWidth,
  minWorkspaceSidePanelWidth as minAgentPanelWidth,
  useWorkspaceSidePanelStore as useAgentPanelStore,
} from './workspace-side-panel.store'
export type {
  WorkspaceSidePanelFloatingPosition as AgentPanelFloatingPosition,
  WorkspaceSidePanelMode as AgentPanelMode,
} from './workspace-side-panel.store'
export { isWorkspaceSidePanelMode as isAgentPanelMode } from './workspace-side-panel.store'
