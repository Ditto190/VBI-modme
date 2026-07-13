'use client'

import { memo, useEffect, useState } from 'react'
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
import { application, applicationShallowEqual, useApplication } from '../../application'
import type { AgentConversationSummary } from '../../application'
import { useTranslation, type Translate } from '../../i18n'
import { cn } from '../../lib/utils'
import { useNavigationStore } from '../../stores/navigation.store'
import { createAgentConversationRoute, isAgentConversationRoute } from '../manage-sidebar-routes'
import { ManageSidebarGroup, manageSidebarChildListClassName, manageSidebarItemClassName } from '../ManageSidebarNav'

const conversationRowClassName = cn(
  manageSidebarItemClassName,
  'relative overflow-hidden px-0 focus-within:bg-vbi-hover-bg',
)
const conversationOpenButtonClassName =
  'flex h-full min-w-0 flex-1 cursor-pointer items-center border-0 bg-transparent px-2.5 text-left text-[13px] font-medium text-inherit outline-none transition-[color,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--vbi-focus)] group-hover:text-vbi-text-strong group-data-[active=true]:text-vbi-text-strong'
const conversationActionClassName =
  'grid h-6 w-6 shrink-0 cursor-pointer place-items-center rounded-md border-0 bg-transparent text-vbi-text-muted outline-none transition-[background-color,color,transform] duration-150 ease-out hover:bg-vbi-active-bg hover:text-vbi-text-strong active:scale-95 focus-visible:bg-vbi-active-bg focus-visible:ring-2 focus-visible:ring-vbi-focus'

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
  activeConversationId: string
  conversation: AgentConversationSummary
  deleteConversation(id: string): Promise<void>
  expanded: boolean
  navigate(path: string): void
  locale: string
  pathname: string
  renameConversation(id: string, title: string): Promise<void>
  selectConversation(id: string): void
  t: Translate
}

const AgentConversationRow = memo(
  ({
    activeConversationId,
    conversation,
    deleteConversation,
    expanded,
    navigate,
    locale,
    pathname,
    renameConversation,
    selectConversation,
    t,
  }: AgentConversationRowProps) => {
    const [draftTitle, setDraftTitle] = useState(conversation.title)
    const [isRenameOpen, setIsRenameOpen] = useState(false)
    const [isRenaming, setIsRenaming] = useState(false)
    const title = conversation.title || t('agent.newConversation')
    const displayTime = formatConversationTime(conversation.lastModified, locale)
    const targetPath = createAgentConversationRoute(conversation.id)
    const isActive = isAgentConversationRoute(pathname, conversation.id)
    const tabIndex = expanded ? undefined : -1

    useEffect(() => {
      if (!isRenameOpen) setDraftTitle(title)
    }, [isRenameOpen, title])

    const openConversation = () => {
      if (activeConversationId !== conversation.id || pathname !== targetPath) {
        selectConversation(conversation.id)
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
      try {
        await renameConversation(conversation.id, nextTitle)
        setIsRenameOpen(false)
      } finally {
        setIsRenaming(false)
      }
    }

    return (
      <>
        <div className={conversationRowClassName} data-active={isActive}>
          <button
            className={conversationOpenButtonClassName}
            aria-current={isActive ? 'page' : undefined}
            tabIndex={tabIndex}
            title={title}
            type='button'
            onClick={openConversation}
          >
            <span className='min-w-0 flex-1 truncate text-vbi-text group-data-[active=true]:text-vbi-text-strong'>
              {title}
            </span>
          </button>
          <div className='relative flex h-full w-[68px] shrink-0 items-center justify-end pr-1'>
            <div className='flex h-full items-center justify-end transition-opacity duration-150 ease-out group-hover:opacity-0'>
              {conversation.status === 'running' ? (
                <span
                  className='grid h-6 w-6 shrink-0 place-items-center text-vbi-primary'
                  aria-label={t('agent.running')}
                  role='status'
                >
                  <LoaderCircle className='h-3.5 w-3.5 animate-spin' />
                </span>
              ) : (
                <span
                  className='max-w-[62px] truncate text-right text-[12px] font-medium tabular-nums text-vbi-text-soft'
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
                  tabIndex={tabIndex}
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
                  const nextConversationId = application.select((state) => state.agent.conversations.activeId)
                  if (!isActive) return

                  if (nextConversationId) {
                    selectConversation(nextConversationId)
                  } else {
                    navigate('/agent')
                  }
                }}
              >
                <Tooltip side='right' title={t('common.delete')}>
                  <button
                    className={conversationActionClassName}
                    aria-label={`${t('common.delete')} ${title}`}
                    tabIndex={tabIndex}
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
                <label className='flex flex-col gap-1.5 text-xs font-medium text-vbi-text-muted'>
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
  },
)

AgentConversationRow.displayName = 'AgentConversationRow'

export const AgentConversationSidebarSection = () => {
  const {
    activeConversationId,
    conversations,
    deleteConversation,
    isInitialized,
    isLoading,
    refreshConversations,
    renameConversation,
    selectConversation,
  } = useApplication(
    (state) => ({
      activeConversationId: state.agent.conversations.activeId,
      conversations: state.agent.conversations.items,
      deleteConversation: state.agent.conversations.delete,
      isInitialized: state.agent.conversations.isInitialized,
      isLoading: state.agent.conversations.isLoading,
      refreshConversations: state.agent.conversations.refresh,
      renameConversation: state.agent.conversations.rename,
      selectConversation: state.agent.conversations.open,
    }),
    { equality: applicationShallowEqual },
  )
  const navigate = useNavigationStore((state) => state.go)
  const pathname = useNavigationStore((state) => state.pathname)
  const { locale, t } = useTranslation()
  const isConversationPath = isAgentConversationRoute(pathname)

  useEffect(() => {
    if (!isInitialized && !isLoading) void refreshConversations()
  }, [isInitialized, isLoading, refreshConversations])

  return (
    <section className='mt-4 flex min-h-0 flex-1 flex-col px-3 pt-1 max-[720px]:mt-0 max-[720px]:max-h-56 max-[720px]:px-3 max-[720px]:pb-3'>
      <ManageSidebarGroup
        autoExpandWhen={isConversationPath}
        childrenClassName='overflow-y-auto'
        className='min-h-0 flex flex-1 flex-col'
        contentClassName='min-h-0 flex-1'
        defaultExpanded
        icon={<MessageSquare className='h-4 w-4' />}
        label={t('agent.conversations')}
      >
        {({ expanded }) => (
          <div className={cn(manageSidebarChildListClassName, 'py-1')}>
            {conversations.length === 0 ? (
              <div className='px-2.5 py-2 text-[12px] leading-5 text-vbi-text-soft'>{t('agent.noConversations')}</div>
            ) : (
              conversations.map((conversation) => (
                <AgentConversationRow
                  activeConversationId={activeConversationId}
                  key={conversation.id}
                  conversation={conversation}
                  deleteConversation={deleteConversation}
                  expanded={expanded}
                  navigate={navigate}
                  locale={locale}
                  pathname={pathname}
                  renameConversation={renameConversation}
                  selectConversation={(id) => {
                    void selectConversation(id)
                  }}
                  t={t}
                />
              ))
            )}
          </div>
        )}
      </ManageSidebarGroup>
    </section>
  )
}
