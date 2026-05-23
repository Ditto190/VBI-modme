import type { VBIChartBuilder } from '@visactor/vbi'
import dynamic from 'next/dynamic'
import { memo, useMemo } from 'react'
import { CenteredState } from '../../components/ui/centered-state'
import { Pencil } from '../../components/ui/icons'
import { Spinner } from '../../components/ui/spinner'
import { EditableSurface } from './EditableSurface'
import type { EditableSurfaceAction } from './EditableSurface'
import { useTranslation } from '../../i18n'

const StandardChartApp = dynamic(
  () => import('../../components/StandardChartApp').then((module) => module.StandardChartApp),
  {
    ssr: false,
  },
)

type ReportChartPanelProps = {
  builder: VBIChartBuilder | null
  onEdit: () => void
}

export const ReportChartPanel = memo(({ builder, onEdit }: ReportChartPanelProps) => {
  const { t } = useTranslation()
  const actions = useMemo<EditableSurfaceAction[]>(
    () => [
      {
        ariaLabel: t('reportDetail.editChart'),
        icon: <Pencil className='h-4 w-4' />,
        onClick: onEdit,
      },
    ],
    [onEdit, t],
  )

  return (
    <div
      className='vbi-motion-row h-[clamp(240px,34vh,340px)] min-h-0 w-[min(100%,760px)] justify-self-center max-[768px]:h-[clamp(240px,38vh,340px)] max-[640px]:h-[clamp(220px,40vh,320px)] max-[640px]:w-full'
      data-report-panel='chart'
    >
      <EditableSurface actions={actions}>
        <StandardChartApp
          builder={builder}
          fallback={
            <CenteredState minHeight='sm'>
              <Spinner />
            </CenteredState>
          }
          mode='view'
        />
      </EditableSurface>
    </div>
  )
})
