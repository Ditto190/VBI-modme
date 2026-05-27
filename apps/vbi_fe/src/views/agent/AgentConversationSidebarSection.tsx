'use client'

import { memo, useEffect, useMemo, useState } from 'react'
import { Button } from '../../components/ui/button'
import { ConfirmAction } from '../../components/ui/confirm-action'
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog'
import { LoaderCircle, MessageSquare, Pencil, Trash2 } from '../../components/ui/icons'
import { Input } from '../../components/ui/input'
import { Tooltip } from '../../components/ui/tooltip'
import { useTranslation, type Translate } from '../../i18n'
import { cn } from '../../lib/utils'
import { useAgentConversationsStore } from '../../stores/agent-conversations.store'
import { useNavigationStore } from '../../stores/navigation.store'
import { ManageSidebarGroup, manageSidebarChildListClassName, manageSidebarItemClassName } from '../ManageSidebarNav'
import type { AgentConversationSummary } from './agent-storage'

const conversationRowClassName = cn(
  manageSidebarItemClassName,
  'relative mb-1 overflow-hidden px-0 focus-within:bg-[var(--vbi-hover-bg)]',
)
const conversationOpenButtonClassName =
  'flex h-full min-w-0 flex-1 cursor-pointer items-center border-0 bg-transparent px-2.5 text-left text-[13px] font-medium text-inherit outline-none transition-[color,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_1px_var(--vbi-border-strong)] group-hover:text-[var(--vbi-text-strong)] group-data-[active=true]:text-[var(--vbi-text-strong)]'
const conversationActionClassName =
  'grid h-6 w-6 shrink-0 cursor-pointer place-items-center rounded-md border-0 bg-transparent text-[var(--vbi-text-muted)] outline-none transition-[background-color,color,box-shadow,transform] duration-150 ease-out hover:bg-[var(--vbi-active-bg)] hover:text-[var(--vbi-text-strong)] hover:shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--vbi-border-strong)_50%,transparent)] active:scale-95 focus-visible:bg-[var(--vbi-active-bg)] focus-visible:ring-2 focus-visible:ring-[var(--vbi-focus)]'

const formatConversationTime = (value: string, locale: string) => {
  const timestamp = new Date(value).getTime()
  if (Number.isNaN(timestamp)) return ''

  const elapsedMinutes = Math.max(1, Math.floor((Date.now() - timestamp) / 60000))
  const isChinese = locale.toLowerCase().startsWith('zh')
  if (elapsedMinutes < 60) return isChinese ? `${elapsedMinutes} 分` : `${elapsedMinutes}m`

  const elapsedHours = Math.floor(elapsedMinutes / 60)
  if (elapsedHours < 24) return isChinese ? `${elapsedHours} 小时` : `${elapsedHours}h`

  const elapsedDays = Math.floor(elapsedHours / 24)
  if (elapsedDays < 7) return isChinese ? `${elapsedDays} 天` : `${elapsedDays}d`

  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'numeric',
  }).format(new Date(timestamp))
}

type AgentConversationRowProps = {
  conversation: AgentConversationSummary
  locale: string
  t: Translate
}

const AgentConversationRow = memo(({ conversation, locale, t }: AgentConversationRowProps) => {
  const activeConversationId = useAgentConversationsStore((state) => state.activeConversationId)
  const deleteConversation = useAgentConversationsStore((state) => state.deleteConversation)
  const renameConversation = useAgentConversationsStore((state) => state.renameConversation)
  const selectConversation = useAgentConversationsStore((state) => state.selectConversation)
  const go = useNavigationStore((state) => state.go)
  const pathname = useNavigationStore((state) => state.pathname)
  const [draftTitle, setDraftTitle] = useState(conversation.title)
  const [isRenameOpen, setIsRenameOpen] = useState(false)
  const [isRenaming, setIsRenaming] = useState(false)
  const title = conversation.title || t('agent.newConversation')
  const displayTime = formatConversationTime(conversation.lastModified, locale)
  const targetPath = `/agent/${encodeURIComponent(conversation.id)}`
  const isActive = activeConversationId === conversation.id || pathname === targetPath

  useEffect(() => {
    if (!isRenameOpen) setDraftTitle(title)
  }, [isRenameOpen, title])

  const openConversation = () => {
    if (activeConversationId !== conversation.id) {
      selectConversation(conversation.id)
    }
    if (pathname !== targetPath) {
      go(targetPath)
    }
  }

  const beginRename = () => {
    setDraftTitle(title)
    setIsRenameOpen(true)
  }

  const commitRename = async () => {
    const nextTitle = draftTitle.trim()
    if (!nextTitle || nextTitle === title) {
      setIsRenameOpen(false)
      return
    }

    setIsRenaming(true)
    if (nextTitle && nextTitle !== title) {
      try {
        await renameConversation(conversation.id, nextTitle)
        setIsRenameOpen(false)
      } finally {
        setIsRenaming(false)
      }
    }
  }

  return (
    <>
      <div className={conversationRowClassName} data-active={isActive}>
        <button
          className={conversationOpenButtonClassName}
          aria-current={isActive ? 'page' : undefined}
          title={title}
          type='button'
          onClick={openConversation}
        >
          <span className='min-w-0 flex-1 truncate text-[var(--vbi-text-strong)]'>{title}</span>
        </button>
        <div className='relative flex h-full w-[68px] shrink-0 items-center justify-end pr-1'>
          <div className='flex h-full items-center justify-end transition-opacity duration-150 ease-out group-hover:opacity-0'>
            {conversation.status === 'running' ? (
              <span
                className='grid h-6 w-6 shrink-0 place-items-center text-[var(--vbi-primary)]'
                aria-label={t('agent.running')}
                role='status'
              >
                <LoaderCircle className='h-3.5 w-3.5 animate-spin' />
              </span>
            ) : (
              <span
                className='max-w-[62px] truncate text-right text-[12px] font-medium tabular-nums text-[var(--vbi-text-soft)]'
                aria-label={t('agent.completedAt', { time: displayTime })}
                title={displayTime}
              >
                {displayTime}
              </span>
            )}
          </div>
          <div className='pointer-events-none absolute inset-y-0 right-1 flex items-center gap-1 opacity-0 transition-opacity duration-150 ease-out group-hover:pointer-events-auto group-hover:opacity-100 focus-within:pointer-events-auto focus-within:opacity-100'>
            <Tooltip side='right' title={t('common.rename')}>
              <button
                className={conversationActionClassName}
                aria-label={`${t('common.rename')} ${title}`}
                type='button'
                onClick={beginRename}
              >
                <Pencil className='h-3.5 w-3.5' />
              </button>
            </Tooltip>
            <ConfirmAction
              cancelLabel={t('common.cancel')}
              confirmLabel={t('common.delete')}
              description={t('agent.deleteConversationDescription', { title })}
              message={t('agent.deleteConversationTitle')}
              onConfirm={async () => {
                await deleteConversation(conversation.id)
                if (!isActive && pathname !== `/agent/${encodeURIComponent(conversation.id)}`) return

                const nextConversationId = useAgentConversationsStore.getState().activeConversationId
                go(nextConversationId ? `/agent/${encodeURIComponent(nextConversationId)}` : '/agent')
              }}
            >
              <Tooltip side='right' title={t('common.delete')}>
                <button
                  className={conversationActionClassName}
                  aria-label={`${t('common.delete')} ${title}`}
                  type='button'
                >
                  <Trash2 className='h-3.5 w-3.5' />
                </button>
              </Tooltip>
            </ConfirmAction>
          </div>
        </div>
      </div>
      <Dialog open={isRenameOpen} onOpenChange={setIsRenameOpen}>
        <DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              void commitRename()
            }}
          >
            <DialogHeader>
              <DialogTitle>{t('agent.renameConversationTitle')}</DialogTitle>
              <DialogDescription>{t('agent.renameConversationDescription')}</DialogDescription>
            </DialogHeader>
            <DialogBody>
              <label className='flex flex-col gap-1.5 text-xs font-medium text-[var(--vbi-text-muted)]'>
                <span>{t('agent.conversationTitle')}</span>
                <Input
                  autoFocus
                  aria-label={t('agent.conversationTitle')}
                  value={draftTitle}
                  onChange={(event) => setDraftTitle(event.currentTarget.value)}
                />
              </label>
            </DialogBody>
            <DialogFooter>
              <Button variant='secondary' onClick={() => setIsRenameOpen(false)}>
                {t('common.cancel')}
              </Button>
              <Button loading={isRenaming} type='submit' variant='primary'>
                {t('common.save')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
})

AgentConversationRow.displayName = 'AgentConversationRow'

export const AgentConversationSidebarSection = () => {
  const activeConversationId = useAgentConversationsStore((state) => state.activeConversationId)
  const conversations = useAgentConversationsStore((state) => state.conversations)
  const initialize = useAgentConversationsStore((state) => state.initialize)
  const isInitialized = useAgentConversationsStore((state) => state.isInitialized)
  const isLoading = useAgentConversationsStore((state) => state.isLoading)
  const pathname = useNavigationStore((state) => state.pathname)
  const [expanded, setExpanded] = useState(true)
  const { locale, t } = useTranslation()
  const isConversationGroupActive =
    pathname.startsWith('/agent/') ||
    ((pathname === '/agent' || pathname === '/manage/agent') && Boolean(activeConversationId))

  useEffect(() => {
    if (!isInitialized && !isLoading) void initialize()
  }, [initialize, isInitialized, isLoading])

  useEffect(() => {
    if (isConversationGroupActive) setExpanded(true)
  }, [isConversationGroupActive])

  const conversationRows = useMemo(
    () =>
      conversations.map((conversation) => (
        <AgentConversationRow key={conversation.id} conversation={conversation} locale={locale} t={t} />
      )),
    [conversations, locale, t],
  )

  return (
    <section className='mt-3 flex min-h-0 flex-1 flex-col border-t border-[var(--vbi-border)] px-2 pt-3 max-[720px]:mt-0 max-[720px]:max-h-56 max-[720px]:border-t-0 max-[720px]:px-3 max-[720px]:pb-3'>
      <ManageSidebarGroup
        active={isConversationGroupActive}
        childrenClassName='overflow-y-auto'
        className='min-h-0 flex flex-1 flex-col'
        contentClassName='min-h-0 flex-1'
        expanded={expanded}
        icon={<MessageSquare className='h-4 w-4' />}
        label={t('agent.conversations')}
        onToggle={() => setExpanded((value) => !value)}
      >
        <div className={cn(manageSidebarChildListClassName, 'py-1')}>
          {conversations.length === 0 ? (
            <div className='px-2.5 py-2 text-[12px] leading-5 text-[var(--vbi-text-soft)]'>
              {t('agent.noConversations')}
            </div>
          ) : (
            conversationRows
          )}
        </div>
      </ManageSidebarGroup>
    </section>
  )
}
