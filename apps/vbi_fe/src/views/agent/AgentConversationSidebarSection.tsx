'use client'

import { useEffect, useMemo, useState } from 'react'
import { CheckCircle2, ChevronDown, ChevronRight, LoaderCircle, MessageSquare } from '../../components/ui/icons'
import { useTranslation } from '../../i18n'
import { useAgentConversationsStore } from '../../stores/agent-conversations.store'
import { useNavigationStore } from '../../stores/navigation.store'

const statusIconClassName = 'h-3.5 w-3.5'
const sidebarButtonClassName =
  'group flex w-full cursor-pointer items-center gap-2 rounded-md border border-transparent bg-transparent px-2.5 text-left text-[13px] font-medium text-[var(--vbi-text-muted)] transition-[background-color,color,box-shadow] duration-150 ease-out hover:bg-[var(--vbi-hover-bg)] data-[active=true]:bg-[var(--vbi-active-bg)] data-[active=true]:text-[var(--vbi-text-strong)] data-[active=true]:shadow-[inset_2px_0_0_var(--vbi-primary)]'

export const AgentConversationSidebarSection = () => {
  const activeConversationId = useAgentConversationsStore((state) => state.activeConversationId)
  const conversations = useAgentConversationsStore((state) => state.conversations)
  const initialize = useAgentConversationsStore((state) => state.initialize)
  const isInitialized = useAgentConversationsStore((state) => state.isInitialized)
  const isLoading = useAgentConversationsStore((state) => state.isLoading)
  const selectConversation = useAgentConversationsStore((state) => state.selectConversation)
  const go = useNavigationStore((state) => state.go)
  const [expanded, setExpanded] = useState(true)
  const { locale, t } = useTranslation()

  const completionTimeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        month: '2-digit',
      }),
    [locale],
  )

  useEffect(() => {
    if (!isInitialized && !isLoading) void initialize()
  }, [initialize, isInitialized, isLoading])

  const formatCompletionTime = (value: string) => {
    const date = new Date(value)
    return Number.isNaN(date.valueOf()) ? '' : completionTimeFormatter.format(date)
  }

  const openConversation = (id: string) => {
    selectConversation(id)
    go('/manage/agent')
  }

  return (
    <section className='mt-3 flex min-h-0 flex-1 flex-col border-t border-[var(--vbi-border)] px-2 pt-3 max-[720px]:mt-0 max-[720px]:max-h-56 max-[720px]:border-t-0 max-[720px]:px-3 max-[720px]:pb-3'>
      <button
        className={`${sidebarButtonClassName} h-8`}
        aria-expanded={expanded}
        type='button'
        onClick={() => setExpanded((value) => !value)}
      >
        <span className='grid h-4 w-4 shrink-0 place-items-center'>
          <MessageSquare className='h-4 w-4' />
        </span>
        <span className='min-w-0 flex-1 truncate'>{t('agent.conversations')}</span>
        <span className='grid h-4 w-4 shrink-0 place-items-center text-[var(--vbi-placeholder)]'>
          {expanded ? <ChevronDown className='h-3.5 w-3.5' /> : <ChevronRight className='h-3.5 w-3.5' />}
        </span>
      </button>
      {expanded ? (
        <div className='min-h-0 flex-1 overflow-y-auto py-1'>
          {conversations.length === 0 ? (
            <div className='px-2.5 py-2 text-[12px] leading-5 text-[var(--vbi-text-soft)]'>
              {t('agent.noConversations')}
            </div>
          ) : (
            conversations.map((conversation) => {
              const isActive = conversation.id === activeConversationId
              const completedTime = formatCompletionTime(conversation.lastModified)

              return (
                <button
                  key={conversation.id}
                  className={`${sidebarButtonClassName} mb-1 py-2`}
                  aria-current={isActive ? 'page' : undefined}
                  data-active={isActive}
                  type='button'
                  onClick={() => openConversation(conversation.id)}
                >
                  <span className='grid h-4 w-4 shrink-0 place-items-center'>
                    <MessageSquare className='h-4 w-4' />
                  </span>
                  <span className='min-w-0 flex-1'>
                    <span className='block truncate text-[13px] font-medium text-[var(--vbi-text-strong)]'>
                      {conversation.title || t('agent.newConversation')}
                    </span>
                    <span className='mt-0.5 block truncate text-[11px] font-normal text-[var(--vbi-text-soft)]'>
                      {conversation.preview ||
                        (conversation.status === 'running'
                          ? t('agent.running')
                          : t('agent.completedAt', { time: completedTime }))}
                    </span>
                  </span>
                  <span className='grid h-4 w-4 shrink-0 place-items-center text-[var(--vbi-text-muted)]'>
                    {conversation.status === 'running' ? (
                      <LoaderCircle className={`${statusIconClassName} animate-spin text-[var(--vbi-primary)]`} />
                    ) : (
                      <CheckCircle2 className={statusIconClassName} />
                    )}
                  </span>
                </button>
              )
            })
          )}
        </div>
      ) : null}
    </section>
  )
}
