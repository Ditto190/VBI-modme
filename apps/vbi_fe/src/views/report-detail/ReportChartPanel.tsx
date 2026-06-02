import type { VBIChartBuilder } from '@visactor/vbi'
import { memo } from 'react'
import { lazyComponent } from '../../components/LazyComponent'
import { CenteredState } from '../../components/ui/centered-state'
import { Spinner } from '../../components/ui/spinner'

const StandardChartApp = lazyComponent(() =>
  import('../../components/StandardChartApp').then((module) => ({ default: module.StandardChartApp })),
)

type ReportChartPanelProps = {
  builder: VBIChartBuilder | null
}

export const ReportChartPanel = memo(({ builder }: ReportChartPanelProps) => {
  return (
    <div
      className='vbi-motion-row h-[clamp(240px,34vh,340px)] min-h-0 w-[min(100%,760px)] justify-self-center max-[768px]:h-[clamp(240px,38vh,340px)] max-[640px]:h-[clamp(220px,40vh,320px)] max-[640px]:w-full'
      data-report-panel='chart'
    >
      <StandardChartApp
        builder={builder}
        fallback={
          <CenteredState minHeight='sm'>
            <Spinner />
          </CenteredState>
        }
        mode='view'
      />
    </div>
  )
})
