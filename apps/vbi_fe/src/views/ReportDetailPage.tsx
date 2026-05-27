'use client'

import { memo, useCallback } from 'react'
import { useShallow } from 'zustand/shallow'
import { Collaborators } from '../components/Collaborators'
import { Button } from '../components/ui/button'
import { ArrowLeft, FileText } from '../components/ui/icons'
import { FullscreenSpinner } from '../components/ui/spinner'
import { useStoreLifecycle } from '../hooks/useStoreLifecycle'
import { useTranslation } from '../i18n'
import { useReportBuilderModel } from '../models'
import { useNavigationStore } from '../stores/navigation.store'
import { useReportDetailStore } from '../stores/report-detail.store'
import { getSessionUserName } from '../utils/collaboration'
import dynamic from 'next/dynamic'

const userName = getSessionUserName()
const ReportWorkspace = dynamic(
  () => import('./report-detail/ReportWorkspace').then((module) => module.ReportWorkspace),
  {
    loading: () => <FullscreenSpinner />,
    ssr: false,
  },
)

export const ReportDetailPage = memo(({ id = '' }: { id?: string }) => {
  const { t } = useTranslation()
  const go = useNavigationStore((state) => state.go)
  const { bootstrap, dispose } = useReportDetailStore(
    useShallow((state) => ({
      bootstrap: state.bootstrap,
      dispose: state.dispose,
    })),
  )
  const reportSession = useReportBuilderModel(
    useShallow((state) => {
      const session = state.sessions[id]
      return {
        builder: session?.builder ?? null,
        provider: session?.provider ?? null,
      }
    }),
  )

  const bootReport = useCallback(() => bootstrap(id, userName), [bootstrap, id])
  useStoreLifecycle(bootReport, dispose)

  if (!id) return <div>{t('reportDetail.invalidId')}</div>
  if (!reportSession.builder) return <FullscreenSpinner />

  return (
    <div className='flex h-screen min-h-screen flex-col bg-[var(--vbi-bg)] transition-colors duration-300'>
      <header className='flex h-11 items-center justify-between gap-3 border-b border-[var(--vbi-border)] bg-[var(--vbi-secondary)] px-3 max-[768px]:h-[52px]'>
        <div className='flex min-w-0 items-center gap-2'>
          <Button
            className='h-7 w-7 min-w-7 border border-[var(--vbi-border)] bg-[var(--vbi-control)] text-[var(--vbi-text)] shadow-none'
            icon={<ArrowLeft className='h-5 w-5' />}
            size='lg'
            variant='ghost'
            onClick={() => go('/manage/reports')}
          />
          <div className='flex min-w-0 items-center gap-2'>
            <span className='flex items-center gap-1.5 text-[11px] font-medium text-[var(--vbi-text-muted)] max-[768px]:hidden'>
              <FileText className='h-4 w-4' />
              {t('reportDetail.kicker')}
            </span>
            <h1 className='m-0 text-[13px] font-semibold leading-none text-[var(--vbi-text)]'>
              {t('reportDetail.title')}
            </h1>
            <span className='hidden max-w-[min(360px,38vw)] truncate text-xs text-[var(--vbi-text-soft)]' title={id}>
              {id}
            </span>
          </div>
        </div>
        <div className='flex shrink-0 items-center gap-1.5 max-[768px]:ml-auto'>
          {reportSession.provider ? <Collaborators provider={reportSession.provider} /> : null}
        </div>
      </header>
      <main className='flex min-h-0 flex-1 overflow-hidden bg-transparent'>
        <ReportWorkspace />
      </main>
    </div>
  )
})
