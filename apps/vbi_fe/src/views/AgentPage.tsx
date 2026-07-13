'use client'

import { useCallback, useEffect, useMemo, useRef } from 'react'
import { applicationShallowEqual, useApplication } from '../application'
import { Spinner } from '../components/ui/spinner'
import { useTranslation, type Translate } from '../i18n'
import { useNavigationStore } from '../stores/navigation.store'
import type { AgentModelId, AgentThinkingLevel } from './agent/agent-model-config'
import { AgentChatPanel } from './agent/chat/AgentChatPanel'
import { readAgentConversationRouteId } from './manage-sidebar-routes'

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
  const initialRouteConversationId = useRef(routeConversationId)
  const didRunRouteEffect = useRef(false)

  useEffect(
    () =>
      activate({
        conversationId: initialRouteConversationId.current || undefined,
        fallbackTitle,
      }),
    [activate, fallbackTitle],
  )

  useEffect(() => {
    if (!didRunRouteEffect.current) {
      didRunRouteEffect.current = true
      return
    }
    if (!routeConversationId) {
      clear()
      return
    }

    void openConversation(routeConversationId, { fallbackTitle })
  }, [clear, fallbackTitle, openConversation, routeConversationId])

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
  const { errorMessage, isOpeningConversation, runtime, snapshot } = useApplication(
    (state) => ({
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
    Boolean(routeConversationId) && isOpeningConversation && !runtime && snapshot.messages.length === 0

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

export const AgentPage = () => {
  const { t } = useTranslation()
  const fallbackTitle = t('agent.newConversation')

  return (
    <div
      className='relative h-[calc(100vh-36px)] min-h-[520px] overflow-hidden bg-transparent'
      aria-label={t('nav.agent')}
    >
      <AgentRouteActivation fallbackTitle={fallbackTitle} />
      <AgentChatWorkspace t={t} />
      <AgentStatusOverlay t={t} />
    </div>
  )
}
