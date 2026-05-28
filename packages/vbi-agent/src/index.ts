export { Agent } from '@earendil-works/pi-agent-core'
export { estimateContextTokens } from '@earendil-works/pi-agent-core'
export type {
  AgentEvent,
  AgentMessage,
  AgentOptions,
  AgentTool,
  AgentToolResult,
  StreamFn,
} from '@earendil-works/pi-agent-core'
export { createVBIResourceTools } from './tools/resource-tools'
export { createBuilderWorkspace, createStaticBuilderSlot } from './workspace'
export { VBIAgent } from './builder-agent'
export { listVBIAgentSkills, readVBIAgentSkill } from './skills/skill-texts'
export type { VBIAgentOptions } from './builder-agent'
export type { VBIAgentSkillName } from './skills/skill-texts'
export type { VBIResourceToolsOptions } from './tools/resource-tools'
export type { VBIBuilderWorkspaceInput, VBIWorkspaceSlotInput } from './workspace'
export type {
  VBIAgentWorkspace,
  VBIReferenceWorkspaceSlot,
  VBIReportPageInput,
  VBIReportWorkspaceSlot,
  VBIResourceCreateInput,
  VBIResourceKind,
  VBIResourceSummary,
  VBIWorkspaceConnector,
  VBIWorkspaceConnectorRegistration,
  VBIWorkspaceConnectors,
  VBIWorkspaceSlot,
} from './types/index'
