import { Empty, Spin } from 'antd'
import { VSeedRender } from 'src/components/Render'
import { useVBIStore, useVBIStoreConfig } from 'src/model'
import { ChartToolbar } from './ChartToolbar'
import type { StreamLabels } from 'src/i18n'

type ChartWorkspaceProps = {
  isFullscreen: boolean
  labels: StreamLabels
  onToggleFullscreen: () => void | Promise<void>
}

export const ChartWorkspace = ({ isFullscreen, labels, onToggleFullscreen }: ChartWorkspaceProps) => {
  const builder = useVBIStore((state) => state.builder)
  const dsl = useVBIStore((state) => state.dsl)
  const vseed = useVBIStore((state) => state.vseed)
  const loading = useVBIStore((state) => state.loading)
  const { hideLocale, hideTheme } = useVBIStoreConfig()
  const rowCount = (vseed?.dataset ?? []).filter(Boolean).length

  return (
    <main className='stream-workspace'>
      <section className='stream-chart-shell'>
        <ChartToolbar
          builder={builder}
          dsl={dsl}
          hideLocale={hideLocale}
          hideTheme={hideTheme}
          isFullscreen={isFullscreen}
          labels={labels}
          rowCount={rowCount}
          onToggleFullscreen={onToggleFullscreen}
        />
        <div className='stream-chart-body'>
          {loading ? (
            <div className='stream-loading'>
              <Spin />
              <span>{labels.loading}</span>
            </div>
          ) : vseed ? (
            <VSeedRender vseed={vseed} />
          ) : (
            <Empty description={labels.emptyChart} image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </div>
      </section>
    </main>
  )
}
