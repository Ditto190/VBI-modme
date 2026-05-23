import { useCallback } from 'react'
import { useShallow } from 'zustand/shallow'
import dynamic from 'next/dynamic'
import { CenteredState } from '../../components/ui/centered-state'
import { Spinner } from '../../components/ui/spinner'
import { useStoreLifecycle } from '../../hooks/useStoreLifecycle'
import { useTranslation } from '../../i18n'
import { useReportBuilderModel } from '../../models'
import { useReportDetailStore } from '../../stores/report-detail.store'
import { getSessionUserName } from '../../utils/collaboration'

const ReportWorkspace = dynamic(
  () => import('../report-detail/ReportWorkspace').then((module) => module.ReportWorkspace),
  {
    loading: () => (
      <CenteredState className='h-full' minHeight='sm'>
        <Spinner />
      </CenteredState>
    ),
    ssr: false,
  },
)

export const ReportResourceEditor = ({ selectedId }: { selectedId: string }) => {
  const { t } = useTranslation()
  const { bootstrap, dispose } = useReportDetailStore(
    useShallow((state) => ({
      bootstrap: state.bootstrap,
      dispose: state.dispose,
    })),
  )
  const reportBuilder = useReportBuilderModel((state) => state.sessions[selectedId]?.builder ?? null)

  const bootReport = useCallback(() => bootstrap(selectedId, getSessionUserName()), [bootstrap, selectedId])
  useStoreLifecycle(bootReport, dispose)

  if (!reportBuilder) {
    return (
      <CenteredState className='h-full' minHeight='sm'>
        <Spinner label={t('reportDetail.title')} />
      </CenteredState>
    )
  }

  return <ReportWorkspace />
}
