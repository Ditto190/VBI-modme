'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import { applicationShallowEqual, useApplication } from '../application'
import { BarChart3, FileText, FolderKanban, Lightbulb, PanelLeftClose, Plus } from '../components/ui/icons'
import { Separator } from '../components/ui/separator'
import { Tooltip } from '../components/ui/tooltip'
import { useTranslation } from '../i18n'
import { cn } from '../lib/utils'
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
  'grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded-md bg-transparent text-vbi-text-muted transition-[background-color,color,box-shadow] duration-150 ease-out hover:bg-vbi-hover-bg hover:text-vbi-text-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vbi-primary/35'

export const ManageLayoutPage = ({ children }: { children: ReactNode }) => {
  return (
    <ManageRouteChromeProvider>
      <ManageLayoutContent>{children}</ManageLayoutContent>
    </ManageRouteChromeProvider>
  )
}

const ManageLayoutContent = ({ children }: { children: ReactNode }) => {
  const { clearActiveConversation, conversations } = useApplication(
    (state) => ({
      clearActiveConversation: state.agent.chat.clear,
      conversations: state.agent.conversations.items,
    }),
    { equality: applicationShallowEqual },
  )
  const navigate = useNavigationStore((state) => state.go)
  const pathname = useNavigationStore((state) => state.pathname)
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
  const handleHeaderBack =
    routeChrome.onBack ?? (resourceDetailBackHref ? () => navigate(resourceDetailBackHref) : undefined)

  const handleNewConversation = () => {
    clearActiveConversation()
    navigate('/agent')
  }

  return (
    <div className='flex min-h-screen bg-vbi-bg text-vbi-text transition-colors duration-300 max-[720px]:flex-col'>
      <aside
        aria-hidden={sidebarHidden}
        className={cn(
          'vbi-static-sidebar sticky top-0 flex h-screen w-[300px] shrink-0 flex-col overflow-hidden border-r border-vbi-border bg-[color-mix(in_srgb,var(--vbi-control-muted)_58%,var(--vbi-secondary))] opacity-100 transition-[width,height,opacity,transform,border-color,background-color] duration-300 ease-out max-[720px]:relative max-[720px]:h-auto max-[720px]:w-full max-[720px]:border-b max-[720px]:border-r-0',
          sidebarHidden &&
            'pointer-events-none w-0 -translate-x-2 border-r-0 opacity-0 max-[720px]:h-0 max-[720px]:w-full max-[720px]:-translate-y-2 max-[720px]:translate-x-0 max-[720px]:border-b-0',
        )}
        inert={sidebarHidden ? true : undefined}
      >
        <div className='flex h-12 w-[300px] shrink-0 items-center justify-between px-4 pt-3 max-[720px]:w-full'>
          <div className='min-w-0 pl-1 text-[15px] font-semibold leading-8 text-vbi-text-strong'>VBI</div>
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
          className='grid w-[300px] shrink-0 gap-0.5 px-3 pt-2 max-[720px]:flex max-[720px]:w-full max-[720px]:gap-2 max-[720px]:overflow-x-auto max-[720px]:px-3 max-[720px]:pb-3 max-[720px]:pt-1'
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
            autoExpandWhen={isResourcePath}
            defaultExpanded={isResourcePath}
            icon={<FolderKanban className='h-4 w-4' />}
            label={t('nav.resources')}
          >
            {({ expanded }) => (
              <div className={manageSidebarChildListClassName}>
                {resourceNavItems.map((item) => (
                  <ManageSidebarButton
                    active={activeResourceHref === item.href}
                    icon={item.icon}
                    key={item.href}
                    tabIndex={expanded ? undefined : -1}
                    onClick={() => navigate(item.href)}
                  >
                    {item.label}
                  </ManageSidebarButton>
                ))}
              </div>
            )}
          </ManageSidebarGroup>
        </nav>
        <div className='flex min-h-0 w-[300px] flex-1 flex-col max-[720px]:w-full'>
          <Separator className='mt-4 max-[720px]:mt-0' />
          <AgentConversationSidebarSection />
          <ManagePreferences />
        </div>
      </aside>
      <section className='flex h-screen min-w-0 flex-1 flex-col bg-vbi-bg transition-colors duration-300 max-[720px]:h-auto max-[720px]:min-h-0'>
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
          className={cn('min-h-0 w-full min-w-0 flex-1 overflow-auto bg-transparent', routeChrome.contentClassName)}
        >
          {children}
        </main>
      </section>
    </div>
  )
}
