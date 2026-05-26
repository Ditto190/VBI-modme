'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import { BarChart3, ChevronDown, ChevronRight, FileText, FolderKanban, Lightbulb, Plus } from '../components/ui/icons'
import { useTranslation } from '../i18n'
import { useAgentConversationsStore } from '../stores/agent-conversations.store'
import { useNavigationStore } from '../stores/navigation.store'
import { AgentConversationSidebarSection } from './agent/AgentConversationSidebarSection'
import { ManagePreferences } from './manage-resource/ManagePreferences'

const navButtonClassName =
  'group flex h-8 w-full cursor-pointer items-center gap-2 rounded-md border border-transparent bg-transparent px-2.5 text-left text-[13px] font-medium text-[var(--vbi-text-muted)] transition-[background-color,color,box-shadow] duration-150 ease-out hover:bg-[var(--vbi-hover-bg)] data-[active=true]:bg-[var(--vbi-active-bg)] data-[active=true]:text-[var(--vbi-text-strong)] data-[active=true]:shadow-[inset_2px_0_0_var(--vbi-primary)] max-[720px]:w-auto max-[720px]:shrink-0'

export const ManageLayoutPage = ({ children }: { children: ReactNode }) => {
  const pathname = useNavigationStore((state) => state.pathname)
  const go = useNavigationStore((state) => state.go)
  const requestNewConversation = useAgentConversationsStore((state) => state.requestNewConversation)
  const { t } = useTranslation()
  const [resourcesExpanded, setResourcesExpanded] = useState(false)
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
  const isResourcePath = resourceNavItems.some((item) => pathname === item.href)

  const handleNewConversation = () => {
    requestNewConversation()
    go('/manage/agent')
  }

  return (
    <div className='flex min-h-screen bg-[var(--vbi-bg-solid)] text-[var(--vbi-text)] transition-colors duration-300 max-[720px]:flex-col'>
      <aside className='vbi-static-sidebar sticky top-0 flex h-screen w-52 shrink-0 flex-col border-r border-[var(--vbi-border)] bg-[var(--vbi-sider)] transition-colors duration-300 max-[720px]:relative max-[720px]:h-auto max-[720px]:w-full max-[720px]:border-r-0 max-[720px]:border-b'>
        <div className='flex flex-col gap-1 px-4 pb-3 pt-4 max-[720px]:pb-2.5'>
          <div className='text-sm font-bold leading-none text-[var(--vbi-text-strong)]'>{t('app.brand.title')}</div>
          <div className='text-[11px] text-[var(--vbi-text-muted)]'>{t('app.brand.meta')}</div>
        </div>
        <nav
          className='grid gap-1 px-2 max-[720px]:flex max-[720px]:gap-2 max-[720px]:overflow-x-auto max-[720px]:px-3 max-[720px]:pb-3'
          aria-label={t('app.nav.primary')}
        >
          <button className={navButtonClassName} type='button' onClick={handleNewConversation}>
            <span className='grid h-4 w-4 shrink-0 place-items-center'>
              <Plus className='h-4 w-4' />
            </span>
            <span>{t('nav.newConversation')}</span>
          </button>
          <div className='grid gap-1 max-[720px]:contents'>
            <button
              className={navButtonClassName}
              aria-expanded={resourcesExpanded}
              data-active={isResourcePath}
              type='button'
              onClick={() => setResourcesExpanded((expanded) => !expanded)}
            >
              <span className='grid h-4 w-4 shrink-0 place-items-center'>
                <FolderKanban className='h-4 w-4' />
              </span>
              <span className='min-w-0 flex-1'>{t('nav.resources')}</span>
              <span className='grid h-4 w-4 shrink-0 place-items-center text-[var(--vbi-placeholder)]'>
                {resourcesExpanded ? <ChevronDown className='h-3.5 w-3.5' /> : <ChevronRight className='h-3.5 w-3.5' />}
              </span>
            </button>
            {resourcesExpanded ? (
              <div className='grid gap-1 pl-3 max-[720px]:contents'>
                {resourceNavItems.map((item) => (
                  <button
                    key={item.href}
                    className={navButtonClassName}
                    data-active={pathname === item.href}
                    type='button'
                    onClick={() => go(item.href)}
                  >
                    <span className='grid h-4 w-4 shrink-0 place-items-center'>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </nav>
        <AgentConversationSidebarSection />
        <ManagePreferences />
      </aside>
      <main className='vbi-motion-presence w-full min-w-0 bg-transparent px-5 py-[18px] max-[720px]:w-screen max-[720px]:max-w-full max-[720px]:px-4 max-[720px]:py-4'>
        {children}
      </main>
    </div>
  )
}
