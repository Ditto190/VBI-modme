import {
  createAgentModelOptions,
  defaultAgentModel,
  defaultAgentThinkingLevel,
  fallbackAgentBackendConfig,
  readAgentBackendConfig,
  resolveAgentModelId,
  resolveAgentThinkingLevel,
  type AgentBackendConfig,
  type AgentModelId,
  type AgentModelOption,
  type AgentThinkingLevel,
} from './agent-model-config'
import {
  createAgentConversationRuntime,
  type AgentConversationRuntime,
  type AgentConversationRuntimeSnapshot,
  type AgentConversationRuntimeUpdate,
} from './agent-runtime'
import { setupVbiAgentIndexedDBStorage, type VbiAgentStorage } from './agent-storage'
import { useAgentConversationsStore } from '../../stores/agent-conversations.store'
import { createLatestApplicationLifecycle } from '../core/lifecycle'
import type {
  AgentApplication,
  AgentChatActivateOptions,
  AgentConversationActivationOptions,
  AgentPromptOptions,
} from './contract'
import { getAgentPanelApplication } from './panel'

const emptySnapshot: AgentConversationRuntimeSnapshot = {
  isRunning: false,
  messages: [],
  modelId: defaultAgentModel,
  thinkingLevel: defaultAgentThinkingLevel,
  usageText: '0 / - · -',
}

let activeRuntime: AgentConversationRuntime | null = null
let activeRuntimeUnsubscribe: (() => void) | null = null
let activeConversationId = ''
let activationSeq = 0
let agentConfig: AgentBackendConfig = fallbackAgentBackendConfig
let errorMessage = ''
let isBootstrapping = false
let isBootstrapped = false
let isOpeningConversation = false
let preferredModelId: AgentModelId = defaultAgentModel
let preferredThinkingLevel: AgentThinkingLevel = defaultAgentThinkingLevel
let selectedSnapshot = emptySnapshot
let storage: VbiAgentStorage | null = null
let emitApplicationChange: (() => void) | null = null
let cachedModelOptionsConfig: AgentBackendConfig | null = null
let cachedModelOptions: AgentModelOption[] = []
const runtimeMap = new Map<string, AgentConversationRuntime>()
const agentLifecycle = createLatestApplicationLifecycle()

const preferredAgentModelStorageKey = 'vbi.agent.model'
const preferredAgentThinkingLevelStorageKey = 'vbi.agent.thinkingLevel'

const readStoredString = (key: string) => {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

const writeStoredString = (key: string, value: string) => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // Keep the in-memory preference when storage is unavailable.
  }
}

const getStorage = async () => {
  storage ??= await setupVbiAgentIndexedDBStorage()
  return storage
}

const areAgentSnapshotsEqual = (left: AgentConversationRuntimeSnapshot, right: AgentConversationRuntimeSnapshot) =>
  left.errorMessage === right.errorMessage &&
  left.isRunning === right.isRunning &&
  left.messages === right.messages &&
  left.modelId === right.modelId &&
  left.thinkingLevel === right.thinkingLevel &&
  left.usageText === right.usageText

const freezeRuntimeSnapshotProjection = (
  snapshot: AgentConversationRuntimeSnapshot,
): AgentConversationRuntimeSnapshot => ({
  ...snapshot,
})

const setSelectedSnapshot = (snapshot: AgentConversationRuntimeSnapshot) => {
  if (areAgentSnapshotsEqual(selectedSnapshot, snapshot)) return false
  selectedSnapshot = freezeRuntimeSnapshotProjection(snapshot)
  return true
}

const setRuntime = (runtime: AgentConversationRuntime | null) => {
  const previousRuntime = activeRuntime
  const previousConversationId = activeConversationId
  const previousSnapshot = selectedSnapshot
  activeRuntimeUnsubscribe?.()
  activeRuntimeUnsubscribe = null
  activeRuntime = runtime
  activeConversationId = runtime?.conversationId ?? ''
  selectedSnapshot = runtime ? freezeRuntimeSnapshotProjection(runtime.getSnapshot()) : emptySnapshot
  let initialSubscription = true
  activeRuntimeUnsubscribe =
    runtime?.subscribe((snapshot) => {
      if (initialSubscription) {
        initialSubscription = false
        if (setSelectedSnapshot(snapshot)) emitApplicationChange?.()
        return
      }
      if (setSelectedSnapshot(snapshot)) emitApplicationChange?.()
    }) ?? null
  if (
    previousRuntime !== activeRuntime ||
    previousConversationId !== activeConversationId ||
    !areAgentSnapshotsEqual(previousSnapshot, selectedSnapshot)
  ) {
    emitApplicationChange?.()
  }
}

const setBootstrapping = (nextBootstrapping: boolean) => {
  if (isBootstrapping === nextBootstrapping) return
  isBootstrapping = nextBootstrapping
  emitApplicationChange?.()
}

const setOpeningConversation = (nextOpeningConversation: boolean) => {
  if (isOpeningConversation === nextOpeningConversation) return
  isOpeningConversation = nextOpeningConversation
  emitApplicationChange?.()
}

const setErrorMessage = (nextErrorMessage: string) => {
  if (errorMessage === nextErrorMessage) return
  errorMessage = nextErrorMessage
  emitApplicationChange?.()
}

const getAgentModelOptions = () => {
  if (cachedModelOptionsConfig === agentConfig) return cachedModelOptions
  cachedModelOptionsConfig = agentConfig
  cachedModelOptions = createAgentModelOptions(agentConfig)
  return cachedModelOptions
}

const handleConversationChange = (update: AgentConversationRuntimeUpdate) => {
  if (update.metadata) {
    useAgentConversationsStore.getState().upsertConversation(update.metadata, update.status)
  } else {
    useAgentConversationsStore.getState().setConversationStatus(update.id, update.status)
  }
}

const bootstrapAgent = async () => {
  if (isBootstrapped) return
  setBootstrapping(true)
  setErrorMessage('')
  try {
    storage = await getStorage()
    agentConfig = await readAgentBackendConfig()
    preferredModelId = resolveAgentModelId(
      readStoredString(preferredAgentModelStorageKey) ?? preferredModelId,
      agentConfig,
    )
    preferredThinkingLevel = resolveAgentThinkingLevel(readStoredString(preferredAgentThinkingLevelStorageKey))
    await useAgentConversationsStore.getState().initialize()
    isBootstrapped = true
  } catch (error) {
    setErrorMessage(error instanceof Error ? error.message : String(error))
  } finally {
    setBootstrapping(false)
  }
}

const activateConversation = async (
  conversationId: string,
  options: AgentConversationActivationOptions = {},
): Promise<AgentConversationRuntime | null> => {
  if (!conversationId) return null
  await bootstrapAgent()
  if (activeConversationId === conversationId && activeRuntime) return activeRuntime
  const showLoading = options.showLoading ?? true
  const currentActivationSeq = activationSeq + 1
  activationSeq = currentActivationSeq
  const isCurrentActivation = () => activationSeq === currentActivationSeq

  if (showLoading) setOpeningConversation(true)
  setErrorMessage('')
  try {
    const currentRuntime = activeConversationId ? runtimeMap.get(activeConversationId) : null
    if (currentRuntime && !currentRuntime.getSnapshot().isRunning) {
      const currentConversationStillExists = useAgentConversationsStore
        .getState()
        .conversations.some((conversation) => conversation.id === activeConversationId)

      if (!currentConversationStillExists) {
        currentRuntime.destroy()
        runtimeMap.delete(activeConversationId)
      } else {
        const metadata = await currentRuntime.persist({ touch: false })
        if (!isCurrentActivation()) return null
        useAgentConversationsStore.getState().upsertConversation(metadata, 'completed')
      }
    }

    let runtime = runtimeMap.get(conversationId)
    let createdRuntime: AgentConversationRuntime | null = null
    if (!runtime) {
      runtime = await createAgentConversationRuntime({
        agentConfig,
        conversationId,
        fallbackTitle: options.fallbackTitle ?? 'New Conversation',
        modelId: preferredModelId,
        onConversationChange: handleConversationChange,
        storage: await getStorage(),
        thinkingLevel: preferredThinkingLevel,
      })
      createdRuntime = runtime
    }

    if (!isCurrentActivation()) {
      createdRuntime?.destroy()
      return null
    }

    runtimeMap.set(conversationId, runtime)
    useAgentConversationsStore.getState().selectConversation(conversationId)
    setRuntime(runtime)
    return runtime
  } catch (error) {
    if (isCurrentActivation()) {
      setErrorMessage(error instanceof Error ? error.message : String(error))
    }
    return null
  } finally {
    if (isCurrentActivation()) {
      if (showLoading) setOpeningConversation(false)
    }
  }
}

export const bindAgentApplicationEmitter = (emit: () => void) => {
  emitApplicationChange = emit
}

const agentActions = {
  activate: (options: AgentChatActivateOptions = {}) => {
    const conversationId = options.conversationId ?? ''
    let disposed = false
    return agentLifecycle.start(
      async () => {
        await bootstrapAgent()
        if (disposed) return
        if (conversationId) {
          await activateConversation(conversationId, options)
        }
      },
      () => agentActions.dispose(),
      {
        cancel: () => {
          disposed = true
          activationSeq += 1
        },
        disposeImmediately: true,
        onError: (error) => {
          setErrorMessage(error instanceof Error ? error.message : String(error))
        },
      },
    )
  },
  open: async (conversationId: string, options: AgentConversationActivationOptions = {}) => {
    if (!conversationId) return null
    return activateConversation(conversationId, options)
  },
  cancel: async () => {
    await activeRuntime?.cancel()
  },
  changeModel: async (modelId: AgentModelId) => {
    preferredModelId = modelId
    writeStoredString(preferredAgentModelStorageKey, modelId)
    if (
      setSelectedSnapshot(
        activeRuntime?.getSnapshot() ?? {
          ...selectedSnapshot,
          modelId,
        },
      )
    ) {
      emitApplicationChange?.()
    }
    await activeRuntime?.setModel(modelId)
    if (
      setSelectedSnapshot(
        activeRuntime?.getSnapshot() ?? {
          ...selectedSnapshot,
          modelId,
        },
      )
    ) {
      emitApplicationChange?.()
    }
  },
  changeThinkingLevel: async (thinkingLevel: AgentThinkingLevel) => {
    preferredThinkingLevel = thinkingLevel
    writeStoredString(preferredAgentThinkingLevelStorageKey, thinkingLevel)
    if (
      setSelectedSnapshot(
        activeRuntime?.getSnapshot() ?? {
          ...selectedSnapshot,
          thinkingLevel,
        },
      )
    ) {
      emitApplicationChange?.()
    }
    await activeRuntime?.setThinkingLevel(thinkingLevel)
    if (
      setSelectedSnapshot(
        activeRuntime?.getSnapshot() ?? {
          ...selectedSnapshot,
          thinkingLevel,
        },
      )
    ) {
      emitApplicationChange?.()
    }
  },
  clear: () => {
    activationSeq += 1
    useAgentConversationsStore.getState().clearActiveConversation()
    setRuntime(null)
  },
  deleteConversation: async (id: string) => {
    const runtime = runtimeMap.get(id)
    runtime?.destroy()
    runtimeMap.delete(id)
    await useAgentConversationsStore.getState().deleteConversation(id)
    if (activeConversationId === id) {
      setRuntime(null)
    }
  },
  dispose: () => {
    activationSeq += 1
    activeRuntimeUnsubscribe?.()
    activeRuntimeUnsubscribe = null
    runtimeMap.forEach((runtime) => runtime.destroy())
    runtimeMap.clear()
    setRuntime(null)
    isBootstrapped = false
    errorMessage = ''
    isBootstrapping = false
    isOpeningConversation = false
    preferredModelId = defaultAgentModel
    preferredThinkingLevel = defaultAgentThinkingLevel
    storage = null
  },
  openConversation: async (id: string) => {
    useAgentConversationsStore.getState().selectConversation(id)
    await agentActions.open(id)
  },
  prompt: async (input: string, options?: AgentPromptOptions) => {
    const prompt = input.trim()
    if (!prompt) return

    setErrorMessage('')
    try {
      const conversationId =
        options?.conversationId ??
        (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
          ? crypto.randomUUID()
          : `conversation-${Date.now()}`)
      const runtime = await activateConversation(conversationId, {
        fallbackTitle: options?.fallbackTitle ?? (prompt.slice(0, 80) || 'New Conversation'),
        showLoading: false,
      })
      if (!runtime) return
      runtimeMap.set(conversationId, runtime)
      await runtime.send(prompt)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : String(error))
    }
  },
  refreshConversations: () => useAgentConversationsStore.getState().refresh(),
  renameConversation: async (id: string, title: string) => {
    await useAgentConversationsStore.getState().renameConversation(id, title)
    runtimeMap.get(id)?.setTitle(title)
  },
}

export const getAgentApplication = (): AgentApplication => {
  const conversationState = useAgentConversationsStore.getState()
  const selectedModelId = activeRuntime ? selectedSnapshot.modelId : preferredModelId
  const selectedThinkingLevel = activeRuntime ? selectedSnapshot.thinkingLevel : preferredThinkingLevel
  const combinedLoading = isBootstrapping || isOpeningConversation || conversationState.isLoading

  return {
    chat: {
      errorMessage,
      isBootstrapping,
      isLoading: combinedLoading,
      isOpeningConversation,
      runtime: activeRuntime,
      snapshot: selectedSnapshot,
      activate: agentActions.activate,
      cancel: agentActions.cancel,
      clear: agentActions.clear,
      open: agentActions.open,
      prompt: agentActions.prompt,
    },
    conversations: {
      activeId: conversationState.activeConversationId,
      isInitialized: conversationState.isInitialized,
      isLoading: conversationState.isLoading,
      items: conversationState.conversations,
      delete: agentActions.deleteConversation,
      open: async (id) => {
        await agentActions.openConversation(id)
      },
      refresh: agentActions.refreshConversations,
      rename: agentActions.renameConversation,
    },
    model: {
      options: getAgentModelOptions(),
      selectedId: selectedModelId,
      thinkingLevel: selectedThinkingLevel,
      change: agentActions.changeModel,
      changeThinkingLevel: agentActions.changeThinkingLevel,
    },
    panel: getAgentPanelApplication(),
  }
}
