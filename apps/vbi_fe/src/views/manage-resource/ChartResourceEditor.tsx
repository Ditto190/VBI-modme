import dynamic from 'next/dynamic'
import { useChartBuilderModel } from '../../models'
import type { Translate } from '../../i18n'

const StandardChartApp = dynamic(
  () => import('../../components/StandardChartApp').then((module) => module.StandardChartApp),
  {
    ssr: false,
  },
)

type ChartResourceEditorProps = {
  selectedId: string
  t: Translate
}

export const ChartResourceEditor = ({ selectedId, t }: ChartResourceEditorProps) => {
  const builder = useChartBuilderModel((store) => store.sessions[selectedId]?.builder ?? null)

  return (
    <div className='flex min-h-0 flex-[1_1_auto] overflow-hidden'>
      <StandardChartApp
        builder={selectedId ? builder : null}
        fallback={<p className='text-sm text-[var(--vbi-text-muted)]'>{t('charts.connecting')}</p>}
        mode='edit'
      />
    </div>
  )
}
