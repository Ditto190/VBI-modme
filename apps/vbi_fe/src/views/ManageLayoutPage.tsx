'use client'

import type { ReactNode } from 'react'
import { BarChart3, FileText, Lightbulb } from '../components/ui/icons'
import { useTranslation } from '../i18n'
import { useNavigationStore } from '../stores/navigation.store'
import { ManagePreferences } from './manage-resource/ManagePreferences'

const navButtonClassName =
  'group flex h-8 w-full origin-left cursor-pointer items-center gap-2 rounded-md border border-transparent bg-transparent px-2.5 text-left text-[13px] font-medium text-[var(--vbi-text-muted)] transition-[background-color,color,box-shadow,transform] duration-300 ease-[var(--vbi-ease-spring)] hover:translate-x-0.5 hover:bg-[var(--vbi-hover-bg)] active:translate-x-0 active:scale-[0.985] data-[active=true]:bg-[var(--vbi-active-bg)] data-[active=true]:text-[var(--vbi-text-strong)] data-[active=true]:shadow-[inset_2px_0_0_var(--vbi-primary)] max-[720px]:w-auto max-[720px]:shrink-0 max-[720px]:origin-center max-[720px]:hover:translate-x-0 max-[720px]:hover:-translate-y-0.5'

export const ManageLayoutPage = ({ children }: { children: ReactNode }) => {
  const pathname = useNavigationStore((state) => state.pathname)
  const go = useNavigationStore((state) => state.go)
  const { t } = useTranslation()
  const navItems = [
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

  return (
    <div className='flex min-h-screen bg-[var(--vbi-bg-solid)] text-[var(--vbi-text)] transition-colors duration-300 max-[720px]:flex-col'>
      <aside className='vbi-motion-sidebar sticky top-0 flex h-screen w-52 shrink-0 flex-col border-r border-[var(--vbi-border)] bg-[var(--vbi-sider)] transition-colors duration-300 max-[720px]:relative max-[720px]:h-auto max-[720px]:w-full max-[720px]:border-r-0 max-[720px]:border-b'>
        <div className='flex flex-col gap-1 px-4 pb-3 pt-4 max-[720px]:pb-2.5'>
          <div className='text-sm font-bold leading-none text-[var(--vbi-text-strong)]'>{t('app.brand.title')}</div>
          <div className='text-[11px] text-[var(--vbi-text-muted)]'>{t('app.brand.meta')}</div>
        </div>
        <nav
          className='vbi-motion-stagger vbi-motion-sidebar-menu grid gap-1 px-2 max-[720px]:flex max-[720px]:gap-2 max-[720px]:overflow-x-auto max-[720px]:px-3 max-[720px]:pb-3'
          aria-label={t('app.nav.primary')}
        >
          {navItems.map((item) => (
            <button
              key={item.href}
              className={navButtonClassName}
              data-active={pathname === item.href}
              type='button'
              onClick={() => go(item.href)}
            >
              <span className='grid h-4 w-4 shrink-0 place-items-center transition-transform duration-300 ease-[var(--vbi-ease-spring)] group-hover:scale-110 group-data-[active=true]:animate-[vbi-subtle-pop_var(--vbi-motion)_var(--vbi-ease-pop)] group-data-[active=true]:scale-110'>
                {item.icon}
              </span>
              <span className='transition-transform duration-300 ease-[var(--vbi-ease-spring)] group-hover:translate-x-0.5 group-data-[active=true]:translate-x-0.5 max-[720px]:group-hover:translate-x-0'>
                {item.label}
              </span>
            </button>
          ))}
        </nav>
        <ManagePreferences />
      </aside>
      <main className='vbi-motion-presence w-full min-w-0 bg-transparent px-5 py-[18px] max-[720px]:w-screen max-[720px]:max-w-full max-[720px]:px-4 max-[720px]:py-4'>
        {children}
      </main>
    </div>
  )
}
