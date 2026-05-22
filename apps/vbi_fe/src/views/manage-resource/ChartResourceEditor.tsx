import dynamic from 'next/dynamic'
import { useStandardAppProps } from '../../hooks/useStandardAppProps'
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
  const standardAppProps = useStandardAppProps()
  const builder = useChartBuilderModel((store) => store.sessions[selectedId]?.builder ?? null)

  return (
    <div className='chart-resource-editor-host'>
      <StandardChartApp
        builder={selectedId ? builder : null}
        fallback={<p className='text-sm text-[var(--vbi-text-muted)]'>{t('charts.connecting')}</p>}
        mode='edit'
        standardAppProps={standardAppProps}
      />
    </div>
  )
}
