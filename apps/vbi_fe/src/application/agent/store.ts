import { createStore } from 'zustand/vanilla'
import { i18nApplicationStore } from '../i18n/store'
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
i18nApplicationStore.subscribe(refreshAgentApplicationStore)
layoutApplicationStore.subscribe(refreshAgentApplicationStore)
