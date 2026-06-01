'use client'

import { memo, useCallback, useMemo } from 'react'
import { useShallow } from 'zustand/shallow'
import { Collaborators } from '../components/Collaborators'
import { FullscreenSpinner } from '../components/ui/spinner'
import { useStoreLifecycle } from '../hooks/useStoreLifecycle'
import { useTranslation } from '../i18n'
import { useReportBuilderModel } from '../models'
import { useNavigationStore } from '../stores/navigation.store'
import { useReportDetailStore } from '../stores/report-detail.store'
import { getSessionUserName } from '../utils/collaboration'
import dynamic from 'next/dynamic'
import { useManageRouteChrome } from './ManageRouteChrome'
import { useResourceEditorName } from './manage-resource/useResourceEditorName'

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
  const backLabel = t('common.back')
  const reportTitle = t('reportDetail.title')
  const renameLabel = t('common.rename')
  const go = useNavigationStore((state) => state.go)
  const { name, rename, setName } = useResourceEditorName({
    fallback: reportTitle,
    id,
    kind: 'report',
  })
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
  const routeChrome = useMemo(
    () => ({
      actions: reportSession.provider ? <Collaborators provider={reportSession.provider} /> : undefined,
      backLabel,
      contentClassName: 'overflow-hidden p-0 max-[720px]:p-0',
      rename: {
        fallbackTitle: reportTitle,
        label: renameLabel,
        onChange: setName,
        onCommit: rename,
        value: name,
      },
      title: name.trim() || reportTitle,
      onBack: () => go('/manage/reports'),
    }),
    [backLabel, go, name, rename, renameLabel, reportSession.provider, reportTitle, setName],
  )
  useManageRouteChrome(routeChrome)

  const bootReport = useCallback(() => bootstrap(id, userName), [bootstrap, id])
  useStoreLifecycle(bootReport, dispose)

  if (!id) return <div>{t('reportDetail.invalidId')}</div>
  if (!reportSession.builder) return <FullscreenSpinner />

  return (
    <div className='flex h-full min-h-0 overflow-hidden bg-transparent transition-colors duration-300'>
      <ReportWorkspace />
    </div>
  )
})
