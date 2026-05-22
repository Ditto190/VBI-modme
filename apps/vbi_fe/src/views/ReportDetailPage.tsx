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
    <div className='report-detail-layout'>
      <header className='report-detail-app-header'>
        <div className='report-detail-heading'>
          <Button
            className='report-detail-back'
            icon={<ArrowLeft className='h-5 w-5' />}
            size='lg'
            variant='ghost'
            onClick={() => go('/manage/reports')}
          />
          <div className='report-detail-title-block'>
            <span className='report-detail-kicker'>
              <FileText className='h-4 w-4' />
              {t('reportDetail.kicker')}
            </span>
            <h1 className='report-detail-title'>{t('reportDetail.title')}</h1>
            <span className='report-detail-subtitle' title={id}>
              {id}
            </span>
          </div>
        </div>
        <div className='report-detail-app-meta'>
          {reportSession.provider ? <Collaborators provider={reportSession.provider} /> : null}
        </div>
      </header>
      <main className='report-detail-content'>
        <ReportWorkspace />
      </main>
    </div>
  )
})
