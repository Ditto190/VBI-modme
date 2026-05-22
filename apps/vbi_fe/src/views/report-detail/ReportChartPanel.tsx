import type { VBIChartBuilder } from '@visactor/vbi'
import dynamic from 'next/dynamic'
import { memo, useMemo } from 'react'
import { Pencil } from '../../components/ui/icons'
import { Spinner } from '../../components/ui/spinner'
import { EditableSurface } from './EditableSurface'
import type { EditableSurfaceAction } from './EditableSurface'
import { useStandardAppProps } from '../../hooks/useStandardAppProps'
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
  const standardAppProps = useStandardAppProps()
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
    <div className='report-detail-slide-chart'>
      <EditableSurface actions={actions}>
        <StandardChartApp
          builder={builder}
          fallback={
            <div className='report-detail-placeholder'>
              <Spinner />
            </div>
          }
          mode='view'
          standardAppProps={standardAppProps}
        />
      </EditableSurface>
    </div>
  )
})
