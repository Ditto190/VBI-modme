import type { AgentMessage } from '@earendil-works/pi-agent-core'
import type { AgentConversationRuntime, AgentConversationRuntimeSnapshot } from '../../views/agent/agent-runtime'
import type { AgentModelId, AgentModelOption, AgentThinkingLevel } from '../../views/agent/agent-model-config'
import type { AgentConversationMetadata, AgentConversationStatus } from '../../views/agent/agent-storage'
import type { AgentPanelFloatingPosition, AgentPanelMode } from '../../stores/agent-panel.store'
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

export type AgentPanelApplication = {
  collapsed: boolean
  floatingPosition: AgentPanelFloatingPosition | null
  mode: AgentPanelMode
  width: number
  setCollapsed(collapsed: boolean): void
  setFloatingPosition(position: AgentPanelFloatingPosition | null): void
  setMode(mode: AgentPanelMode): void
  setWidth(width: number): void
  toggleCollapsed(): void
  toggleMode(): void
}

export type AgentApplication = {
  chat: AgentChatApplication
  conversations: AgentConversationsApplication
  model: AgentModelApplication
  panel: AgentPanelApplication
}

export type ApplicationAgentMessage = AgentMessage
