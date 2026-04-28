import { Spin } from 'antd'
import { useState } from 'react'
import type { VBIChartBuilder, VBIChartDSL } from '@visactor/vbi'
import type { VSeed } from '@visactor/vseed'
import { VSeedRender } from 'src/components/Render'
import { ChartFilters } from './ChartFilters'
import { ChartToolbar } from './ChartToolbar'
import { ConfigOverlay } from './ConfigOverlay'
import { useProfessionalDnd } from './dnd/ProfessionalDndProvider'
import type { ProfessionalLabels } from 'src/config/labels'
import type { ProfessionalLocale, ProfessionalTheme } from 'src/constants/builder'
import type { FieldSlot, SchemaField } from 'src/types'

type ChartWorkspaceProps = {
  builder: VBIChartBuilder
  canRedo: boolean
  canUndo: boolean
  chartType: string
  chartTypes: string[]
  dsl: VBIChartDSL
  fields: SchemaField[]
  hideLocale: boolean
  hideTheme: boolean
  isFullscreen: boolean
  labels: ProfessionalLabels
  limit: number
  loading: boolean
  locale: ProfessionalLocale
  onChartTypeChange: (value: string) => void
  onLimitChange: (value: number) => void
  onLocaleChange: (value: ProfessionalLocale) => void
  onRedo: () => void
  onThemeChange: (value: ProfessionalTheme) => void
  onToggleFullscreen: () => void | Promise<void>
  onUndo: () => void
  showToolbar: boolean
  slots: FieldSlot[]
  theme: ProfessionalTheme
  vseed: VSeed | null
}

export const ChartWorkspace = (props: ChartWorkspaceProps) => {
  const [configOpen, setConfigOpen] = useState(false)
  const { activeRole } = useProfessionalDnd()
  const hasConfig = props.dsl.dimensions.length > 0 || props.dsl.measures.length > 0
  const showConfig = props.showToolbar && (activeRole || !hasConfig || configOpen)

  return (
    <main className='pro-chart'>
      {props.showToolbar && (
        <ChartToolbar {...props} configOpen={configOpen} onToggleConfig={() => setConfigOpen((value) => !value)} />
      )}
      {props.showToolbar && <ChartFilters builder={props.builder} fields={props.fields} />}
      <section className='pro-chart__body'>
        {props.loading && (
          <div className='pro-loading'>
            <Spin />
            <span>{props.labels.loading}</span>
          </div>
        )}
        {props.vseed && <VSeedRender themeMode={props.theme} vseed={props.vseed} />}
        {showConfig && (
          <ConfigOverlay
            active={Boolean(activeRole)}
            activeRole={activeRole}
            builder={props.builder}
            dsl={props.dsl}
            fields={props.fields}
            labels={props.labels}
            showEditor={configOpen}
            slots={props.slots}
          />
        )}
      </section>
    </main>
  )
}
