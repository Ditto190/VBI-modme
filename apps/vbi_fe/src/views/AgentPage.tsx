'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Spinner } from '../components/ui/spinner'
import { useTranslation } from '../i18n'
import { useAgentConversationsStore } from '../stores/agent-conversations.store'
import { createAgentConversationId, setupPiAgentIndexedDBStorage, type PiAgentStorage } from './agent/agent-storage'
import type { AgentChatPanelRuntime, AgentConversationRuntimeUpdate } from './agent/agent-runtime'

export const AgentPage = () => {
  const panelHostRef = useRef<HTMLDivElement>(null)
  const runtimeMapRef = useRef(new Map<string, AgentChatPanelRuntime>())
  const storageRef = useRef<PiAgentStorage | null>(null)
  const activeConversationIdRef = useRef('')
  const activationSeqRef = useRef(0)
  const activeConversationId = useAgentConversationsStore((state) => state.activeConversationId)
  const conversations = useAgentConversationsStore((state) => state.conversations)
  const handledRequestSeq = useAgentConversationsStore((state) => state.handledNewConversationRequestSeq)
  const initializeConversations = useAgentConversationsStore((state) => state.initialize)
  const markRequestHandled = useAgentConversationsStore((state) => state.markNewConversationRequestHandled)
  const newConversationRequestSeq = useAgentConversationsStore((state) => state.newConversationRequestSeq)
  const selectConversation = useAgentConversationsStore((state) => state.selectConversation)
  const setConversationStatus = useAgentConversationsStore((state) => state.setConversationStatus)
  const upsertConversation = useAgentConversationsStore((state) => state.upsertConversation)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [storageReady, setStorageReady] = useState(false)
  const { t } = useTranslation()

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

  const activateConversation = useCallback(
    async (conversationId: string) => {
      const storage = storageRef.current
      if (!storage) return null

      const activationSeq = activationSeqRef.current + 1
      activationSeqRef.current = activationSeq
      const isCurrentActivation = () => activationSeqRef.current === activationSeq

      setErrorMessage('')
      setIsLoading(true)
      try {
        const currentRuntime = activeConversationIdRef.current
          ? runtimeMapRef.current.get(activeConversationIdRef.current)
          : null
        if (currentRuntime && !currentRuntime.agent.state.isStreaming) {
          const metadata = await currentRuntime.persist()
          if (!isCurrentActivation()) return null
          upsertConversation(metadata, 'completed')
        }

        let runtime = runtimeMapRef.current.get(conversationId)
        let createdRuntime: AgentChatPanelRuntime | null = null
        if (!runtime) {
          const { createAgentChatPanel } = await import('./agent/agent-runtime')
          runtime = await createAgentChatPanel({
            conversationId,
            fallbackTitle: t('agent.newConversation'),
            onConversationChange: handleConversationChange,
            storage,
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
        panelHostRef.current?.replaceChildren(runtime.panel)
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
    [handleConversationChange, selectConversation, t, upsertConversation],
  )

  const startNewConversation = useCallback(async () => {
    if (!storageRef.current) return

    const runtime = await activateConversation(createAgentConversationId())
    if (!runtime) return

    upsertConversation(await runtime.persist(), 'completed')
  }, [activateConversation, upsertConversation])

  useEffect(() => {
    let disposed = false

    const mountPanel = async () => {
      try {
        storageRef.current = await setupPiAgentIndexedDBStorage()
        if (disposed) return
        setStorageReady(true)

        const storedConversations = await initializeConversations()
        if (disposed) return

        const state = useAgentConversationsStore.getState()
        if (state.newConversationRequestSeq > state.handledNewConversationRequestSeq) {
          state.markNewConversationRequestHandled(state.newConversationRequestSeq)
          await startNewConversation()
          return
        }

        const selectedConversationId = state.activeConversationId || storedConversations[0]?.id
        if (selectedConversationId) {
          await activateConversation(selectedConversationId)
        } else {
          setIsLoading(false)
        }
      } catch (error) {
        if (!disposed) {
          setErrorMessage(error instanceof Error ? error.message : String(error))
          setIsLoading(false)
        }
      }
    }

    void mountPanel()

    return () => {
      disposed = true
      activationSeqRef.current += 1
      runtimeMapRef.current.forEach((runtime) => runtime.destroy())
      runtimeMapRef.current.clear()
      panelHostRef.current?.replaceChildren()
    }
  }, [activateConversation, initializeConversations, startNewConversation])

  useEffect(() => {
    if (!storageReady || !activeConversationId || activeConversationId === activeConversationIdRef.current) return
    void activateConversation(activeConversationId)
  }, [activateConversation, activeConversationId, storageReady])

  useEffect(() => {
    const nextConversationId = conversations[0]?.id
    if (!storageReady || activeConversationId || activeConversationIdRef.current || !nextConversationId) return
    void activateConversation(nextConversationId)
  }, [activateConversation, activeConversationId, conversations, storageReady])

  useEffect(() => {
    if (!storageReady || newConversationRequestSeq <= handledRequestSeq) return
    markRequestHandled(newConversationRequestSeq)
    void startNewConversation()
  }, [handledRequestSeq, markRequestHandled, newConversationRequestSeq, startNewConversation, storageReady])

  const hasAvailableConversation = conversations.length > 0 || activeConversationId

  return (
    <div
      className='vbi-agent-shell relative h-[calc(100vh-36px)] min-h-[520px] overflow-hidden rounded-xl border border-[var(--vbi-border)] bg-[var(--vbi-surface-solid)]'
      aria-label={t('nav.agent')}
    >
      <div ref={panelHostRef} className='vbi-agent-panel-host h-full min-h-0' />
      {!hasAvailableConversation && !isLoading && !errorMessage ? (
        <div className='absolute inset-0 grid place-items-center px-6 text-center text-sm text-[var(--vbi-text-muted)]'>
          {t('agent.emptyConversation')}
        </div>
      ) : null}
      {isLoading ? (
        <div className='absolute inset-0 grid place-items-center bg-[var(--vbi-surface)]'>
          <Spinner label={t('agent.loading')} />
        </div>
      ) : null}
      {errorMessage ? (
        <div className='absolute inset-0 grid place-items-center bg-[var(--vbi-surface)] px-6 text-center text-sm text-[var(--vbi-text-muted)]'>
          <div>
            <div className='font-medium text-[var(--vbi-text-strong)]'>{t('agent.error')}</div>
            <div className='mt-2 max-w-xl break-words'>{errorMessage}</div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
