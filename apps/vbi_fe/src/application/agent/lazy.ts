import { useAgentConversationsStore } from '../../stores/agent-conversations.store'
import { createAgentModelOptions, defaultAgentModel, defaultAgentThinkingLevel } from './agent-model-config'
import { runLazyCommand, runLazyLifecycleCommand, subscribeLazyStore } from '../core/lazy'
import type { ApplicationCleanup } from '../core/store'
import type * as AgentModuleExports from './application'
import type { AgentApplication } from './contract'
import { getAgentPanelApplication } from './panel'

type AgentModule = typeof AgentModuleExports

let emitApplicationChange: (() => void) | null = null
let agentModule: AgentModule | null = null
let agentModulePromise: Promise<AgentModule> | null = null

const subscribedStores = new WeakSet<object>()
const emit = () => emitApplicationChange?.()

const loadAgentModule = async () => {
  if (agentModule) return agentModule
  agentModulePromise ??= import('./application').then(async (module) => {
    agentModule = module
    module.bindAgentApplicationEmitter(emit)
    subscribeLazyStore(useAgentConversationsStore, emit, subscribedStores)
    emit()
    return module
  })
  return agentModulePromise
}

const getAgentApplication = (module: AgentModule) => module.getAgentApplication()

const runAgentCommand = async <TResult>(command: (agent: AgentApplication) => TResult | Promise<TResult>) =>
  runLazyCommand(loadAgentModule, getAgentApplication, command)

const runAgentLifecycleCommand = (command: (agent: AgentApplication) => ApplicationCleanup): ApplicationCleanup =>
  runLazyLifecycleCommand(loadAgentModule, getAgentApplication, command)

const emptyAgentSnapshot = {
  isRunning: false,
  messages: [],
  modelId: defaultAgentModel,
  thinkingLevel: defaultAgentThinkingLevel,
  usageText: '0 / - · -',
}
const emptyAgentModelOptions = createAgentModelOptions()

const lazyAgentApplication: AgentApplication = {
  chat: {
    errorMessage: '',
    isBootstrapping: false,
    isLoading: false,
    isOpeningConversation: false,
    runtime: null,
    snapshot: emptyAgentSnapshot,
    activate: (options) => {
      return runAgentLifecycleCommand((agent) => agent.chat.activate(options))
    },
    cancel: () => runAgentCommand((agent) => agent.chat.cancel()),
    clear: () => {
      useAgentConversationsStore.getState().clearActiveConversation()
    },
    open: (conversationId, options) => runAgentCommand((agent) => agent.chat.open(conversationId, options)),
    prompt: (input, options) => runAgentCommand((agent) => agent.chat.prompt(input, options)),
  },
  conversations: {
    activeId: '',
    isInitialized: false,
    isLoading: false,
    items: [],
    delete: (id) => useAgentConversationsStore.getState().deleteConversation(id),
    open: async (id) => {
      useAgentConversationsStore.getState().selectConversation(id)
      if (agentModule) await runAgentCommand((agent) => agent.conversations.open(id))
    },
    refresh: () => useAgentConversationsStore.getState().refresh(),
    rename: (id, title) => useAgentConversationsStore.getState().renameConversation(id, title),
  },
  model: {
    options: emptyAgentModelOptions,
    selectedId: emptyAgentSnapshot.modelId,
    thinkingLevel: emptyAgentSnapshot.thinkingLevel,
    change: (modelId) => runAgentCommand((agent) => agent.model.change(modelId)),
    changeThinkingLevel: (thinkingLevel) => runAgentCommand((agent) => agent.model.changeThinkingLevel(thinkingLevel)),
  },
  panel: getAgentPanelApplication(),
}

export const bindAgentLazyApplicationEmitter = (nextEmit: () => void) => {
  emitApplicationChange = nextEmit
  agentModule?.bindAgentApplicationEmitter(nextEmit)
}

export const getLazyAgentApplication = (): AgentApplication => {
  if (agentModule) return agentModule.getAgentApplication()

  const state = useAgentConversationsStore.getState()
  return {
    ...lazyAgentApplication,
    chat: {
      ...lazyAgentApplication.chat,
      isLoading: state.isLoading,
    },
    conversations: {
      ...lazyAgentApplication.conversations,
      activeId: state.activeConversationId,
      isInitialized: state.isInitialized,
      isLoading: state.isLoading,
      items: state.conversations,
    },
    panel: getAgentPanelApplication(),
  }
}
