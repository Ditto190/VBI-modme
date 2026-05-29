'use client'

import { Spinner } from '../components/ui/spinner'
import { useTranslation } from '../i18n'
import { AgentChatPanel } from './agent/chat/AgentChatPanel'
import { useAgentConversationController } from './agent/chat/useAgentConversationController'

export const AgentPage = () => {
  const { t } = useTranslation()
  const {
    activeRuntime,
    errorMessage,
    handleModelChange,
    handleThinkingLevelChange,
    isLoading,
    modelOptions,
    selectedModelId,
    selectedSnapshot,
    selectedThinkingLevel,
    startDraftConversation,
  } = useAgentConversationController(t)

  return (
    <div
      className='relative h-[calc(100vh-36px)] min-h-[520px] overflow-hidden bg-transparent'
      aria-label={t('nav.agent')}
    >
      <AgentChatPanel
        key={activeRuntime?.conversationId ?? 'empty'}
        modelId={selectedModelId}
        modelOptions={modelOptions}
        onDraftSubmit={startDraftConversation}
        onModelChange={handleModelChange}
        onThinkingLevelChange={handleThinkingLevelChange}
        runtime={activeRuntime}
        snapshot={selectedSnapshot}
        t={t}
        thinkingLevel={selectedThinkingLevel}
      />
      {isLoading ? (
        <div className='absolute inset-0 grid place-items-center bg-[var(--vbi-bg)] transition-colors duration-300'>
          <Spinner label={t('agent.loading')} />
        </div>
      ) : null}
      {errorMessage ? (
        <div className='absolute inset-0 grid place-items-center bg-[var(--vbi-bg)] px-6 text-center text-sm text-[var(--vbi-text-muted)] transition-colors duration-300'>
          <div>
            <div className='font-medium text-[var(--vbi-text-strong)]'>{t('agent.error')}</div>
            <div className='mt-2 max-w-xl break-words'>{errorMessage}</div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
