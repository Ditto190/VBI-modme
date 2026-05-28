'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Translate } from '../../../i18n'
import { useAgentConversationsStore } from '../../../stores/agent-conversations.store'
import { useNavigationStore } from '../../../stores/navigation.store'
import {
  defaultAgentModel,
  defaultAgentThinkingLevel,
  resolveAgentModelId,
  resolveAgentThinkingLevel,
  type AgentModelId,
  type AgentThinkingLevel,
} from '../agent-model-config'
import type {
  AgentConversationRuntime,
  AgentConversationRuntimeSnapshot,
  AgentConversationRuntimeUpdate,
} from '../agent-runtime'
import { createAgentConversationId, setupVbiAgentIndexedDBStorage, type VbiAgentStorage } from '../agent-storage'
import { createAgentConversationRoute, readAgentConversationRouteId } from '../../manage-sidebar-routes'

const emptySnapshot: AgentConversationRuntimeSnapshot = {
  isRunning: false,
  messages: [],
  modelId: defaultAgentModel,
  thinkingLevel: defaultAgentThinkingLevel,
  usageText: '0 / - · -',
}

type ActivateConversationOptions = {
  fallbackTitle?: string
  showLoading?: boolean
}

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

export const useAgentConversationController = (t: Translate) => {
  const runtimeMapRef = useRef(new Map<string, AgentConversationRuntime>())
  const storageRef = useRef<VbiAgentStorage | null>(null)
  const activeRuntimeUnsubscribeRef = useRef<(() => void) | null>(null)
  const activeConversationIdRef = useRef('')
  const activationSeqRef = useRef(0)
  const activeConversationId = useAgentConversationsStore((state) => state.activeConversationId)
  const clearActiveConversation = useAgentConversationsStore((state) => state.clearActiveConversation)
  const conversations = useAgentConversationsStore((state) => state.conversations)
  const initializeConversations = useAgentConversationsStore((state) => state.initialize)
  const selectConversation = useAgentConversationsStore((state) => state.selectConversation)
  const setConversationStatus = useAgentConversationsStore((state) => state.setConversationStatus)
  const upsertConversation = useAgentConversationsStore((state) => state.upsertConversation)
  const go = useNavigationStore((state) => state.go)
  const pathname = useNavigationStore((state) => state.pathname)
  const [activeRuntime, setActiveRuntime] = useState<AgentConversationRuntime | null>(null)
  const [activeSnapshot, setActiveSnapshot] = useState<AgentConversationRuntimeSnapshot>(emptySnapshot)
  const [preferredModelId, setPreferredModelIdState] = useState<AgentModelId>(() =>
    resolveAgentModelId(readStoredString(preferredAgentModelStorageKey)),
  )
  const [preferredThinkingLevel, setPreferredThinkingLevelState] = useState<AgentThinkingLevel>(() =>
    resolveAgentThinkingLevel(readStoredString(preferredAgentThinkingLevelStorageKey)),
  )
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [storageReady, setStorageReady] = useState(false)
  const routeConversationId = useMemo(() => readAgentConversationRouteId(pathname), [pathname])
  const selectedModelId = activeRuntime ? activeSnapshot.modelId : preferredModelId
  const selectedThinkingLevel = activeRuntime ? activeSnapshot.thinkingLevel : preferredThinkingLevel

  const setPreferredModelId = useCallback((modelId: AgentModelId) => {
    setPreferredModelIdState(modelId)
    writeStoredString(preferredAgentModelStorageKey, modelId)
  }, [])

  const setPreferredThinkingLevel = useCallback((thinkingLevel: AgentThinkingLevel) => {
    setPreferredThinkingLevelState(thinkingLevel)
    writeStoredString(preferredAgentThinkingLevelStorageKey, thinkingLevel)
  }, [])

  const handleConversationChange = useCallback(
    (update: AgentConversationRuntimeUpdate) => {
      if (update.metadata) {
        upsertConversation(update.metadata, update.status)
      } else {
        setConversationStatus(update.id, update.status)
      }
    },
    [setConversationStatus, upsertConversation],
  )

  const subscribeActiveRuntime = useCallback((runtime: AgentConversationRuntime) => {
    activeRuntimeUnsubscribeRef.current?.()
    activeRuntimeUnsubscribeRef.current = runtime.subscribe((snapshot) => {
      setActiveSnapshot(snapshot)
    })
  }, [])

  const clearActiveRuntime = useCallback(() => {
    activeRuntimeUnsubscribeRef.current?.()
    activeRuntimeUnsubscribeRef.current = null
    activeConversationIdRef.current = ''
    clearActiveConversation()
    setActiveRuntime(null)
    setActiveSnapshot(emptySnapshot)
    setIsLoading(false)
  }, [clearActiveConversation])

  const activateConversation = useCallback(
    async (conversationId: string, options: ActivateConversationOptions = {}) => {
      const storage = storageRef.current
      if (!storage) return null
      const showLoading = options.showLoading ?? true

      const activationSeq = activationSeqRef.current + 1
      activationSeqRef.current = activationSeq
      const isCurrentActivation = () => activationSeqRef.current === activationSeq

      setErrorMessage('')
      if (showLoading) setIsLoading(true)
      try {
        const currentConversationId = activeConversationIdRef.current
        const currentRuntime = currentConversationId ? runtimeMapRef.current.get(currentConversationId) : null
        if (currentRuntime) {
          const currentConversationStillExists = useAgentConversationsStore
            .getState()
            .conversations.some((conversation) => conversation.id === currentConversationId)

          if (!currentConversationStillExists) {
            currentRuntime.destroy()
            runtimeMapRef.current.delete(currentConversationId)
          } else if (!currentRuntime.getSnapshot().isRunning) {
            const metadata = await currentRuntime.persist({ touch: false })
            if (!isCurrentActivation()) return null
            upsertConversation(metadata, 'completed')
          }
        }

        let runtime = runtimeMapRef.current.get(conversationId)
        let createdRuntime: AgentConversationRuntime | null = null
        if (!runtime) {
          const { createAgentConversationRuntime } = await import('../agent-runtime')
          runtime = await createAgentConversationRuntime({
            conversationId,
            fallbackTitle: options.fallbackTitle ?? t('agent.newConversation'),
            modelId: preferredModelId,
            onConversationChange: handleConversationChange,
            storage,
            thinkingLevel: preferredThinkingLevel,
          })
          createdRuntime = runtime
        }

        if (!isCurrentActivation()) {
          createdRuntime?.destroy()
          return null
        }

        runtimeMapRef.current.set(conversationId, runtime)
        activeConversationIdRef.current = conversationId
        selectConversation(conversationId)
        setActiveRuntime(runtime)
        setActiveSnapshot(runtime.getSnapshot())
        subscribeActiveRuntime(runtime)
        return runtime
      } catch (error) {
        if (isCurrentActivation()) {
          setErrorMessage(error instanceof Error ? error.message : String(error))
        }
        return null
      } finally {
        if (isCurrentActivation()) {
          setIsLoading(false)
        }
      }
    },
    [
      handleConversationChange,
      preferredModelId,
      preferredThinkingLevel,
      selectConversation,
      subscribeActiveRuntime,
      t,
      upsertConversation,
    ],
  )

  const handleModelChange = useCallback(
    (modelId: AgentModelId) => {
      setPreferredModelId(modelId)
      void activeRuntime?.setModel(modelId)
    },
    [activeRuntime, setPreferredModelId],
  )

  const handleThinkingLevelChange = useCallback(
    (thinkingLevel: AgentThinkingLevel) => {
      setPreferredThinkingLevel(thinkingLevel)
      void activeRuntime?.setThinkingLevel(thinkingLevel)
    },
    [activeRuntime, setPreferredThinkingLevel],
  )

  const startDraftConversation = useCallback(
    async (input: string) => {
      if (!storageRef.current) return

      const conversationId = createAgentConversationId()
      const runtime = await activateConversation(conversationId, {
        fallbackTitle: input.slice(0, 80) || t('agent.newConversation'),
        showLoading: false,
      })
      if (!runtime) return

      go(createAgentConversationRoute(conversationId))
      await runtime.send(input)
    },
    [activateConversation, go, t],
  )

  useEffect(() => {
    let disposed = false

    const mountAgent = async () => {
      try {
        storageRef.current = await setupVbiAgentIndexedDBStorage()
        if (disposed) return

        await initializeConversations()
        if (disposed) return

        setStorageReady(true)
        setIsLoading(false)
      } catch (error) {
        if (!disposed) {
          setErrorMessage(error instanceof Error ? error.message : String(error))
          setIsLoading(false)
        }
      }
    }

    void mountAgent()

    return () => {
      disposed = true
      activationSeqRef.current += 1
      activeRuntimeUnsubscribeRef.current?.()
      activeRuntimeUnsubscribeRef.current = null
      runtimeMapRef.current.forEach((runtime) => runtime.destroy())
      runtimeMapRef.current.clear()
    }
  }, [initializeConversations])

  useEffect(() => {
    if (!storageReady) return
    if (!routeConversationId) {
      if (activeConversationIdRef.current || activeConversationId) {
        clearActiveRuntime()
      }
      return
    }

    if (routeConversationId === activeConversationIdRef.current) return
    void activateConversation(routeConversationId)
  }, [activateConversation, activeConversationId, clearActiveRuntime, routeConversationId, storageReady])

  useEffect(() => {
    if (
      !storageReady ||
      routeConversationId ||
      !activeConversationId ||
      activeConversationId === activeConversationIdRef.current
    )
      return
    go(createAgentConversationRoute(activeConversationId))
  }, [activeConversationId, go, routeConversationId, storageReady])

  useEffect(() => {
    if (!activeRuntime) return

    const activeSummary = conversations.find((conversation) => conversation.id === activeRuntime.conversationId)
    if (activeSummary) {
      activeRuntime.setTitle(activeSummary.title)
    }
  }, [activeRuntime, conversations])

  return {
    activeRuntime,
    errorMessage,
    handleModelChange,
    handleThinkingLevelChange,
    isLoading,
    selectedModelId,
    selectedSnapshot: activeSnapshot,
    selectedThinkingLevel,
    startDraftConversation,
  }
}
