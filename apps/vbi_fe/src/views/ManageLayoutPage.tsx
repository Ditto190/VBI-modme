'use client'

import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { BarChart3, FileText, FolderKanban, Lightbulb, PanelLeftClose, Plus } from '../components/ui/icons'
import { Tooltip } from '../components/ui/tooltip'
import { useTranslation } from '../i18n'
import { cn } from '../lib/utils'
import { useAgentConversationsStore } from '../stores/agent-conversations.store'
import { useNavigationStore } from '../stores/navigation.store'
import { AgentConversationSidebarSection } from './agent/AgentConversationSidebarSection'
import {
  isAgentRoute,
  isNewConversationRoute,
  matchRouteBranch,
  readAgentConversationRouteId,
} from './manage-sidebar-routes'
import { ManageRouteChromeProvider, useManageRouteChromeState } from './ManageRouteChrome'
import { ManageRouteHeader } from './ManageRouteHeader'
import { ManageSidebarButton, ManageSidebarGroup, manageSidebarChildListClassName } from './ManageSidebarNav'
import { ManagePreferences } from './manage-resource/ManagePreferences'

const hideSidebarButtonClassName =
  'grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded-full border border-transparent bg-transparent text-[var(--vbi-text-muted)] transition-[background-color,border-color,color,box-shadow] duration-150 ease-out hover:border-[var(--vbi-border)] hover:bg-[var(--vbi-hover-bg)] hover:text-[var(--vbi-text-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vbi-primary)]/35'

export const ManageLayoutPage = ({ children }: { children: ReactNode }) => {
  return (
    <ManageRouteChromeProvider>
      <ManageLayoutContent>{children}</ManageLayoutContent>
    </ManageRouteChromeProvider>
  )
}

const ManageLayoutContent = ({ children }: { children: ReactNode }) => {
  const pathname = useNavigationStore((state) => state.pathname)
  const go = useNavigationStore((state) => state.go)
  const clearActiveConversation = useAgentConversationsStore((state) => state.clearActiveConversation)
  const conversations = useAgentConversationsStore((state) => state.conversations)
  const routeChrome = useManageRouteChromeState()
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
  const currentPageLabel = isAgentPath
    ? currentConversationTitle
    : (resourceNavItems.find((item) => item.href === activeResourceHref)?.label ?? '')
  const resourceDetailBackHref = (() => {
    const [root, resource, id, ...rest] = pathname.split('/').filter(Boolean)
    if (root !== 'manage' || !id || rest.length) return ''
    if (!['charts', 'insights', 'reports'].includes(resource ?? '')) return ''
    return `/manage/${resource}`
  })()
  const headerTitle = routeChrome.title ?? currentPageLabel
  const headerBackLabel = routeChrome.backLabel ?? (resourceDetailBackHref ? t('common.back') : undefined)
  const handleHeaderBack = routeChrome.onBack ?? (resourceDetailBackHref ? () => go(resourceDetailBackHref) : undefined)

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
    <div className='flex min-h-screen bg-[var(--vbi-bg)] text-[var(--vbi-text)] transition-colors duration-300 max-[720px]:flex-col'>
      <aside
        aria-hidden={sidebarHidden}
        className={cn(
          'vbi-static-sidebar sticky top-0 flex h-screen w-[300px] shrink-0 flex-col overflow-hidden border-r border-[var(--vbi-border)] bg-[var(--vbi-sider)] opacity-100 transition-[width,height,opacity,transform,border-color,background-color] duration-300 ease-out max-[720px]:relative max-[720px]:h-auto max-[720px]:w-full max-[720px]:border-r-0 max-[720px]:border-b',
          sidebarHidden &&
            'pointer-events-none w-0 -translate-x-2 border-r-0 opacity-0 max-[720px]:h-0 max-[720px]:w-full max-[720px]:-translate-y-2 max-[720px]:translate-x-0 max-[720px]:border-b-0',
        )}
        inert={sidebarHidden ? true : undefined}
      >
        <div className='flex h-11 w-[300px] shrink-0 items-center justify-between px-4 pt-3 max-[720px]:w-full'>
          <div className='min-w-0 pl-1 text-[15px] font-semibold leading-8 text-[var(--vbi-text-strong)]'>VBI</div>
          <Tooltip side='right' title='Hide Sidebar'>
            <button
              aria-label='Hide Sidebar'
              className={hideSidebarButtonClassName}
              type='button'
              onClick={() => setSidebarHidden(true)}
            >
              <PanelLeftClose className='h-3.5 w-3.5' />
            </button>
          </Tooltip>
        </div>
        <nav
          className='grid w-[300px] shrink-0 gap-1 px-2 pt-1 max-[720px]:flex max-[720px]:w-full max-[720px]:gap-2 max-[720px]:overflow-x-auto max-[720px]:px-3 max-[720px]:pb-3 max-[720px]:pt-1'
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
        <div className='flex min-h-0 w-[300px] flex-1 flex-col max-[720px]:w-full'>
          <AgentConversationSidebarSection />
          <ManagePreferences />
        </div>
      </aside>
      <section className='flex h-screen min-w-0 flex-1 flex-col bg-[var(--vbi-bg)] transition-colors duration-300 max-[720px]:h-auto max-[720px]:min-h-0'>
        <ManageRouteHeader
          actions={routeChrome.actions}
          rename={routeChrome.rename}
          sidebarHidden={sidebarHidden}
          title={headerTitle}
          onBack={handleHeaderBack}
          backLabel={headerBackLabel}
          onShowSidebar={() => setSidebarHidden(false)}
        />
        <main
          className={cn(
            'vbi-motion-presence min-h-0 w-full min-w-0 flex-1 overflow-auto bg-transparent',
            routeChrome.contentClassName,
          )}
        >
          {children}
        </main>
      </section>
    </div>
  )
}
