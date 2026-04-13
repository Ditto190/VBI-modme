import type { VBIChartBuilder } from '@visactor/vbi'
import { ChartRenderer } from '@visactor/vbi-react/components'
import type { VSeed } from '@visactor/vseed'
import type { StarterDebugState } from '../utils/debugState'
import { chartCanvasStyle, chartRendererStyle } from '../styles/styleObjects'
import { StarterEmptyState } from './StarterEmptyState'
import { StarterLoadingSkeleton } from './StarterLoadingSkeleton'
import { VSeedRender } from './Render'
import { StarterRenderError } from './StarterRenderError'

type StarterMainPanelProps = {
  builder: VBIChartBuilder
  debugState: StarterDebugState
  hasAvailableFields: boolean
  hasConfiguredFields: boolean
  isCompactLayout: boolean
  isFieldPanelVisible: boolean
  onLoadDemoData: () => void
  onShowFieldPanel: () => void
}

function renderNoDataState(onLoadDemoData: () => void) {
  return (
    <div className="starter-card starter-main-surface">
      <StarterEmptyState
        actionLabel="Load demo data"
        description="点击上方的 Load demo data，或上传一个 CSV 文件，左侧字段面板就会立即可用。"
        onAction={onLoadDemoData}
        title="No data loaded yet"
      />
    </div>
  )
}

function renderFieldSelectionState(
  isCompactLayout: boolean,
  isFieldPanelVisible: boolean,
  onShowFieldPanel: () => void,
) {
  return (
    <div className="starter-card starter-main-surface">
      <StarterEmptyState
        actionLabel={isCompactLayout && !isFieldPanelVisible ? 'Show fields panel' : undefined}
        description="数据已经准备好。先在左侧添加维度和指标，再让 starter components 自动出图。"
        onAction={isCompactLayout && !isFieldPanelVisible ? onShowFieldPanel : undefined}
        title="Choose fields to start"
      />
    </div>
  )
}

export function StarterMainPanel(props: StarterMainPanelProps) {
  const {
    builder,
    debugState,
    hasAvailableFields,
    hasConfiguredFields,
    isCompactLayout,
    isFieldPanelVisible,
    onLoadDemoData,
    onShowFieldPanel,
  } = props

  if (debugState === 'error') {
    return (
      <StarterRenderError
        errorMessage="Debug state forced by query: ?debugState=error"
        onRetry={() => {
          const url = new URL(window.location.href)
          url.searchParams.delete('debugState')
          window.location.assign(`${url.pathname}${url.search}${url.hash}`)
        }}
      />
    )
  }
  if (debugState === 'loading') {
    return <StarterLoadingSkeleton />
  }
  if (debugState === 'empty') {
    return renderNoDataState(onLoadDemoData)
  }
  if (hasConfiguredFields) {
    return (
      <ChartRenderer
        builder={builder}
        debounce={150}
        loadingFallback={<StarterLoadingSkeleton />}
        renderError={(error: Error, refetch: () => Promise<unknown> | void) => (
          <StarterRenderError
            errorMessage={error.message}
            onRetry={() => {
              void refetch()
            }}
          />
        )}
        renderVSeed={(vseed: unknown) => <VSeedRender style={chartCanvasStyle} vseed={vseed as VSeed} />}
        style={chartRendererStyle}
      />
    )
  }
  if (hasAvailableFields) {
    return renderFieldSelectionState(isCompactLayout, isFieldPanelVisible, onShowFieldPanel)
  }

  return renderNoDataState(onLoadDemoData)
}
