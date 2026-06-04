import { createStore } from 'zustand/vanilla'
import { useAgentConversationsStore } from '../../stores/agent-conversations.store'
import { useWorkspaceSidePanelStore } from '../../stores/workspace-side-panel.store'
import { bindAgentLazyApplicationEmitter, getLazyAgentApplication } from './lazy'
import type { AgentApplication } from './contract'

export const agentApplicationStore = createStore<AgentApplication>()(() => getLazyAgentApplication())

export const refreshAgentApplicationStore = () => {
  agentApplicationStore.setState(getLazyAgentApplication(), true)
}

bindAgentLazyApplicationEmitter(refreshAgentApplicationStore)
useAgentConversationsStore.subscribe(refreshAgentApplicationStore)
useWorkspaceSidePanelStore.subscribe(refreshAgentApplicationStore)
