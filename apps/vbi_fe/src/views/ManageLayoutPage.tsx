'use client'

import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import {
  BarChart3,
  FileText,
  FolderKanban,
  Lightbulb,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
} from '../components/ui/icons'
import { Tooltip } from '../components/ui/tooltip'
import { useTranslation } from '../i18n'
import { useAgentConversationsStore } from '../stores/agent-conversations.store'
import { useNavigationStore } from '../stores/navigation.store'
import { AgentConversationSidebarSection } from './agent/AgentConversationSidebarSection'
import {
  isAgentRoute,
  isNewConversationRoute,
  matchRouteBranch,
  readAgentConversationRouteId,
} from './manage-sidebar-routes'
import { ManageSidebarButton, ManageSidebarGroup, manageSidebarChildListClassName } from './ManageSidebarNav'
import { ManagePreferences } from './manage-resource/ManagePreferences'

const sidebarToggleButtonClassName =
  'grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-md border border-transparent bg-transparent text-[var(--vbi-text-muted)] transition-[background-color,border-color,color,box-shadow] duration-150 ease-out hover:border-[var(--vbi-border)] hover:bg-[var(--vbi-hover-bg)] hover:text-[var(--vbi-text-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vbi-primary)]/35'

export const ManageLayoutPage = ({ children }: { children: ReactNode }) => {
  const pathname = useNavigationStore((state) => state.pathname)
  const go = useNavigationStore((state) => state.go)
  const clearActiveConversation = useAgentConversationsStore((state) => state.clearActiveConversation)
  const conversations = useAgentConversationsStore((state) => state.conversations)
  const { t } = useTranslation()
  const resourceNavItems = [
    {
      href: '/manage/reports',
      icon: <FileText className='h-4 w-4' />,
      label: t('nav.reports'),
    },
    {
      href: '/manage/charts',
      icon: <BarChart3 className='h-4 w-4' />,
      label: t('nav.charts'),
    },
    {
      href: '/manage/insights',
      icon: <Lightbulb className='h-4 w-4' />,
      label: t('nav.insights'),
    },
  ]
  const activeResourceHref = resourceNavItems.find((item) => matchRouteBranch(pathname, item.href))?.href ?? ''
  const isResourcePath = Boolean(activeResourceHref)
  const [resourcesExpanded, setResourcesExpanded] = useState(isResourcePath)
  const [sidebarHidden, setSidebarHidden] = useState(false)
  const isAgentPath = isAgentRoute(pathname)
  const isNewConversationPath = isNewConversationRoute(pathname)
  const routeConversationId = readAgentConversationRouteId(pathname)
  const routeConversation = routeConversationId
    ? conversations.find((conversation) => conversation.id === routeConversationId)
    : undefined
  const currentConversationTitle = routeConversationId
    ? (routeConversation?.title ?? t('nav.newConversation'))
    : t('nav.newConversation')

  useEffect(() => {
    if (isResourcePath) {
      setResourcesExpanded(true)
    }
  }, [isResourcePath])

  const handleNewConversation = () => {
    clearActiveConversation()
    go('/agent')
  }

  return (
    <div className='flex min-h-screen bg-[var(--vbi-bg-solid)] text-[var(--vbi-text)] transition-colors duration-300 max-[720px]:flex-col'>
      {sidebarHidden ? null : (
        <aside className='vbi-static-sidebar sticky top-0 flex h-screen w-[300px] shrink-0 flex-col border-r border-[var(--vbi-border)] bg-[var(--vbi-sider)] transition-colors duration-300 max-[720px]:relative max-[720px]:h-auto max-[720px]:w-full max-[720px]:border-r-0 max-[720px]:border-b'>
          <div className='flex h-11 shrink-0 items-center justify-end px-2 pt-3'>
            <Tooltip side='right' title='Hide Sidebar'>
              <button
                aria-label='Hide Sidebar'
                className={sidebarToggleButtonClassName}
                type='button'
                onClick={() => setSidebarHidden(true)}
              >
                <PanelLeftClose className='h-4 w-4' />
              </button>
            </Tooltip>
          </div>
          <nav
            className='grid gap-1 px-2 pt-1 max-[720px]:flex max-[720px]:gap-2 max-[720px]:overflow-x-auto max-[720px]:px-3 max-[720px]:pb-3 max-[720px]:pt-1'
            aria-label={t('app.nav.primary')}
          >
            <ManageSidebarButton
              active={isNewConversationPath}
              icon={<Plus className='h-4 w-4' />}
              onClick={handleNewConversation}
            >
              {t('nav.newConversation')}
            </ManageSidebarButton>
            <ManageSidebarGroup
              active={isResourcePath && !resourcesExpanded}
              expanded={resourcesExpanded}
              icon={<FolderKanban className='h-4 w-4' />}
              label={t('nav.resources')}
              onToggle={() => setResourcesExpanded((expanded) => !expanded)}
            >
              <div className={manageSidebarChildListClassName}>
                {resourceNavItems.map((item) => (
                  <ManageSidebarButton
                    active={activeResourceHref === item.href}
                    icon={item.icon}
                    key={item.href}
                    tabIndex={resourcesExpanded ? undefined : -1}
                    onClick={() => go(item.href)}
                  >
                    {item.label}
                  </ManageSidebarButton>
                ))}
              </div>
            </ManageSidebarGroup>
          </nav>
          <AgentConversationSidebarSection />
          <ManagePreferences />
        </aside>
      )}
      <section className='relative flex min-w-0 flex-1 flex-col'>
        <div className='pointer-events-none absolute left-5 top-3 z-20 flex h-8 max-w-[calc(100%-40px)] items-center gap-2 max-[720px]:left-4'>
          {sidebarHidden ? (
            <Tooltip side='right' title='Show Sidebar'>
              <button
                aria-label='Show Sidebar'
                className={`${sidebarToggleButtonClassName} pointer-events-auto border-[var(--vbi-border)] bg-[var(--vbi-bg-solid)] shadow-[0_6px_18px_rgba(15,23,42,0.08)]`}
                type='button'
                onClick={() => setSidebarHidden(false)}
              >
                <PanelLeftOpen className='h-4 w-4' />
              </button>
            </Tooltip>
          ) : null}
          {isAgentPath ? (
            <span
              className='min-w-0 max-w-[min(520px,calc(100vw-120px))] truncate text-[13px] font-medium leading-8 text-[var(--vbi-text-muted)]'
              title={currentConversationTitle}
            >
              {currentConversationTitle}
            </span>
          ) : null}
        </div>
        <main className='vbi-motion-presence w-full min-w-0 flex-1 bg-transparent px-5 py-[18px] max-[720px]:w-screen max-[720px]:max-w-full max-[720px]:px-4 max-[720px]:py-4'>
          {children}
        </main>
      </section>
    </div>
  )
}
