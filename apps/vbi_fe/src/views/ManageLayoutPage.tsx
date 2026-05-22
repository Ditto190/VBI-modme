'use client'

import type { ReactNode } from 'react'
import { BarChart3, FileText, Lightbulb } from '../components/ui/icons'
import { useTranslation } from '../i18n'
import { useNavigationStore } from '../stores/navigation.store'
import { ManagePreferences } from './manage-resource/ManagePreferences'

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
    <div className='manage-layout'>
      <aside className='manage-sider'>
        <div className='manage-brand'>
          <div className='manage-brand-title'>{t('app.brand.title')}</div>
          <div className='manage-brand-meta'>{t('app.brand.meta')}</div>
        </div>
        <nav className='manage-menu' aria-label='Primary'>
          {navItems.map((item) => (
            <button
              key={item.href}
              className='manage-menu-item'
              data-active={pathname === item.href}
              type='button'
              onClick={() => go(item.href)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <ManagePreferences />
      </aside>
      <main className='manage-content'>{children}</main>
    </div>
  )
}
