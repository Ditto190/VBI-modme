import type { AgentMessage } from '@earendil-works/pi-agent-core'
import type { AgentModelId, AgentModelOption, AgentThinkingLevel } from './agent-model-config'
import type { AgentConversationRuntime, AgentConversationRuntimeSnapshot } from './agent-runtime'
import type { AgentConversationMetadata, AgentConversationStatus } from './agent-storage'
import type { WorkspaceSidePanelApplication } from '../layout/contract'
import type { ApplicationCleanup } from '../core/store'

export type AgentConversationSummary = AgentConversationMetadata & {
  status: AgentConversationStatus
}

export type AgentPromptOptions = {
  conversationId?: string
  fallbackTitle?: string
}

export type AgentConversationActivationOptions = {
  fallbackTitle?: string
  showLoading?: boolean
}

export type AgentChatActivateOptions = AgentConversationActivationOptions & {
  conversationId?: string
}

export type AgentChatApplication = {
  errorMessage: string
  isBootstrapping: boolean
  isLoading: boolean
  isOpeningConversation: boolean
  runtime: AgentConversationRuntime | null
  snapshot: AgentConversationRuntimeSnapshot
  activate(options?: AgentChatActivateOptions): ApplicationCleanup
  cancel(): Promise<void>
  clear(): void
  open(conversationId: string, options?: AgentConversationActivationOptions): Promise<AgentConversationRuntime | null>
  prompt(input: string, options?: AgentPromptOptions): Promise<void>
}

export type AgentConversationsApplication = {
  activeId: string
  isInitialized: boolean
  isLoading: boolean
  items: AgentConversationSummary[]
  delete(id: string): Promise<void>
  open(id: string): Promise<void>
  refresh(): Promise<AgentConversationSummary[]>
  rename(id: string, title: string): Promise<void>
}

export type AgentModelApplication = {
  options: AgentModelOption[]
  selectedId: AgentModelId
  thinkingLevel: AgentThinkingLevel
  change(modelId: AgentModelId): Promise<void>
  changeThinkingLevel(thinkingLevel: AgentThinkingLevel): Promise<void>
}

export type AgentPanelApplication = WorkspaceSidePanelApplication

export type AgentApplication = {
  chat: AgentChatApplication
  conversations: AgentConversationsApplication
  model: AgentModelApplication
  panel: AgentPanelApplication
}

export type ApplicationAgentMessage = AgentMessage
