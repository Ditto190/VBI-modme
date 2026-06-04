import { createStore } from 'zustand/vanilla'
import { layoutApplicationStore } from '../layout/store'
import { subscribeAgentConversations } from './conversations'
import { bindAgentLazyApplicationEmitter, getLazyAgentApplication } from './lazy'
import type { AgentApplication } from './contract'

export const agentApplicationStore = createStore<AgentApplication>()(() => getLazyAgentApplication())

export const refreshAgentApplicationStore = () => {
  agentApplicationStore.setState(getLazyAgentApplication(), true)
}

bindAgentLazyApplicationEmitter(refreshAgentApplicationStore)
subscribeAgentConversations(refreshAgentApplicationStore)
layoutApplicationStore.subscribe(refreshAgentApplicationStore)
