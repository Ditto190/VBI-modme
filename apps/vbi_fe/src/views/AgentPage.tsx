'use client'

import { useCallback, useEffect, useMemo } from 'react'
import { applicationShallowEqual, useApplication } from '../application'
import { Spinner } from '../components/ui/spinner'
import { useTranslation, type Translate } from '../i18n'
import { cn } from '../lib/utils'
import { useNavigationStore } from '../stores/navigation.store'
import type { AgentModelId, AgentThinkingLevel } from './agent/agent-model-config'
import { AgentChatPanel } from './agent/chat/AgentChatPanel'
import { isAgentRoute, readAgentConversationRouteId } from './manage-sidebar-routes'

const AgentRouteActivation = ({ fallbackTitle }: { fallbackTitle: string }) => {
  const { activate, clear, openConversation } = useApplication(
    (state) => ({
      activate: state.agent.chat.activate,
      clear: state.agent.chat.clear,
      openConversation: state.agent.chat.open,
    }),
    { equality: applicationShallowEqual },
  )
  const pathname = useNavigationStore((state) => state.pathname)
  const routeConversationId = useMemo(() => readAgentConversationRouteId(pathname), [pathname])

  useEffect(() => activate({ fallbackTitle }), [activate, fallbackTitle])

  useEffect(() => {
    if (!isAgentRoute(pathname)) return

    if (!routeConversationId) {
      clear()
      return
    }

    void openConversation(routeConversationId, { fallbackTitle })
  }, [clear, fallbackTitle, openConversation, pathname, routeConversationId])

  return null
}

const AgentSelectedConversationActivation = ({ fallbackTitle }: { fallbackTitle: string }) => {
  const { activeConversationId, openConversation, runtimeConversationId } = useApplication(
    (state) => ({
      activeConversationId: state.agent.conversations.activeId,
      openConversation: state.agent.chat.open,
      runtimeConversationId: state.agent.chat.runtime?.conversationId ?? '',
    }),
    { equality: applicationShallowEqual },
  )

  useEffect(() => {
    if (!activeConversationId || activeConversationId === runtimeConversationId) return

    void openConversation(activeConversationId, { fallbackTitle })
  }, [activeConversationId, fallbackTitle, openConversation, runtimeConversationId])

  return null
}

const AgentChatWorkspace = ({ t }: { t: Translate }) => {
  const { changeModel, changeThinkingLevel, modelOptions, prompt, runtime, selectedModelId, snapshot, thinkingLevel } =
    useApplication(
      (state) => ({
        changeModel: state.agent.model.change,
        changeThinkingLevel: state.agent.model.changeThinkingLevel,
        modelOptions: state.agent.model.options,
        prompt: state.agent.chat.prompt,
        runtime: state.agent.chat.runtime,
        selectedModelId: state.agent.model.selectedId,
        snapshot: state.agent.chat.snapshot,
        thinkingLevel: state.agent.model.thinkingLevel,
      }),
      { equality: applicationShallowEqual },
    )
  const fallbackTitle = t('agent.newConversation')
  const handleDraftSubmit = useCallback(
    (input: string) => prompt(input, { fallbackTitle: input.slice(0, 80) || fallbackTitle }),
    [fallbackTitle, prompt],
  )
  const handleModelChange = useCallback(
    (modelId: AgentModelId) => {
      void changeModel(modelId)
    },
    [changeModel],
  )
  const handleThinkingLevelChange = useCallback(
    (nextThinkingLevel: AgentThinkingLevel) => {
      void changeThinkingLevel(nextThinkingLevel)
    },
    [changeThinkingLevel],
  )

  return (
    <AgentChatPanel
      modelId={selectedModelId}
      modelOptions={modelOptions}
      onDraftSubmit={handleDraftSubmit}
      onModelChange={handleModelChange}
      onThinkingLevelChange={handleThinkingLevelChange}
      runtime={runtime}
      snapshot={snapshot}
      t={t}
      thinkingLevel={thinkingLevel}
    />
  )
}

const AgentStatusOverlay = ({ t }: { t: Translate }) => {
  const { activeConversationId, errorMessage, isOpeningConversation, runtime, snapshot } = useApplication(
    (state) => ({
      activeConversationId: state.agent.conversations.activeId,
      errorMessage: state.agent.chat.errorMessage,
      isOpeningConversation: state.agent.chat.isOpeningConversation,
      runtime: state.agent.chat.runtime,
      snapshot: state.agent.chat.snapshot,
    }),
    { equality: applicationShallowEqual },
  )
  const pathname = useNavigationStore((state) => state.pathname)
  const routeConversationId = useMemo(() => readAgentConversationRouteId(pathname), [pathname])
  const showOpeningOverlay =
    (Boolean(activeConversationId) || (isAgentRoute(pathname) && Boolean(routeConversationId))) &&
    isOpeningConversation &&
    !runtime &&
    snapshot.messages.length === 0

  if (errorMessage) {
    return (
      <div className='absolute inset-0 grid place-items-center bg-[var(--vbi-bg)] px-6 text-center text-sm text-[var(--vbi-text-muted)] transition-colors duration-300'>
        <div>
          <div className='font-medium text-[var(--vbi-text-strong)]'>{t('agent.error')}</div>
          <div className='mt-2 max-w-xl break-words'>{errorMessage}</div>
        </div>
      </div>
    )
  }

  if (showOpeningOverlay) {
    return (
      <div className='absolute inset-0 grid place-items-center bg-[var(--vbi-bg)] transition-colors duration-300'>
        <Spinner label={t('agent.loading')} />
      </div>
    )
  }

  return null
}

type AgentChatSurfaceProps = {
  className?: string
}

export const AgentChatSurface = ({ className }: AgentChatSurfaceProps) => {
  const { t } = useTranslation()
  const fallbackTitle = t('agent.newConversation')

  return (
    <div className={cn('relative min-h-0 overflow-hidden bg-transparent', className)} aria-label={t('nav.agent')}>
      <AgentRouteActivation fallbackTitle={fallbackTitle} />
      <AgentSelectedConversationActivation fallbackTitle={fallbackTitle} />
      <AgentChatWorkspace t={t} />
      <AgentStatusOverlay t={t} />
    </div>
  )
}

export const AgentPage = () => <AgentChatSurface className='h-screen min-h-[520px]' />
