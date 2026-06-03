import { useApplication } from '../../application'
import { lazyComponent } from '../../components/LazyComponent'
import type { Translate } from '../../i18n'

const StandardChartApp = lazyComponent(() =>
  import('../../components/StandardChartApp').then((module) => ({ default: module.StandardChartApp })),
)

type ChartResourceEditorProps = {
  selectedId: string
  t: Translate
}

export const ChartResourceEditor = ({ selectedId, t }: ChartResourceEditorProps) => {
  const builder = useApplication((state) => state.chart.editor.builders[selectedId]?.builder ?? null)

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
