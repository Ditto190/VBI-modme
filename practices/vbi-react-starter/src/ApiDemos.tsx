import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { VBI, type VBIChartBuilder } from '@visactor/vbi'
import {
  BuilderLayout,
  ChartRenderer,
  ChartTypeSelector,
  FieldPanel,
  FilterPanel,
  ThemeSelector,
} from '@visactor/vbi-react/components'
import { useVBI } from '@visactor/vbi-react'
import type { VSeed } from '@visactor/vseed'
import type { DatasetColumn } from '@visactor/vquery'

import './styles/tokens.css'
import './App.css'
import { VSeedRender } from './components/Render'
import {
  chartCanvasStyle,
  chartRendererStyle,
  fieldPanelStyle,
  filterPanelStyle,
  themeSelectorStyle,
} from './styles/styleObjects'
import { clearBuilderSelections } from './utils/dataset'
import { createLocalConnector, setLocalDataWithSchema, type LocalRow } from './utils/localConnector'

const CONNECTOR_ID = 'vbiReactStarterApiDemoConnector'

let connectorInitialized = false

const demoSchema: DatasetColumn[] = [
  { name: 'region', type: 'string' },
  { name: 'segment', type: 'string' },
  { name: 'month', type: 'string' },
  { name: 'sales', type: 'number' },
  { name: 'profit', type: 'number' },
]

const demoRows: LocalRow[] = [
  { month: 'Jan', profit: 12, region: 'East', sales: 120, segment: 'Consumer' },
  { month: 'Feb', profit: 18, region: 'East', sales: 168, segment: 'Corporate' },
  { month: 'Mar', profit: 9, region: 'West', sales: 96, segment: 'Consumer' },
  { month: 'Apr', profit: 22, region: 'West', sales: 210, segment: 'Home Office' },
  { month: 'May', profit: 17, region: 'South', sales: 180, segment: 'Corporate' },
]

const dimensionOptions = demoSchema
  .filter((field) => field.type !== 'number')
  .map((field) => ({ label: field.name, value: field.name }))

const measureOptions = demoSchema
  .filter((field) => field.type === 'number')
  .map((field) => ({ label: field.name, value: field.name }))

const filterFieldOptions = [...dimensionOptions, ...measureOptions]

const sectionStyle: CSSProperties = {
  display: 'grid',
  gap: 12,
}

const themedSectionStyle: CSSProperties = {
  ...sectionStyle,
  color: 'var(--starter-text-primary)',
  fontFamily: 'var(--starter-font-sans)',
}

const panelFrameStyle: CSSProperties = {
  border: '1px solid var(--starter-border)',
  borderRadius: 'var(--starter-radius-md)',
  minHeight: 0,
  overflow: 'hidden',
}

const snapshotStyle: CSSProperties = {
  background: 'var(--starter-surface)',
  border: '1px solid var(--starter-border)',
  borderRadius: 'var(--starter-radius-md)',
  color: 'var(--starter-text-secondary)',
  fontSize: 12,
  margin: 0,
  maxHeight: 240,
  overflow: 'auto',
  padding: 12,
}

function ensureConnectorInitialized() {
  if (connectorInitialized) {
    return
  }

  createLocalConnector(CONNECTOR_ID)
  connectorInitialized = true
}

function seedDemoData() {
  setLocalDataWithSchema(demoRows, demoSchema)
}

function resetBuilder(
  builder: VBIChartBuilder,
  config?: { chartType?: string; theme?: 'light' | 'dark'; withFields?: boolean },
) {
  const chartType = config?.chartType ?? 'bar'
  const theme = config?.theme ?? 'light'

  seedDemoData()
  clearBuilderSelections(builder)
  builder.chartType.changeChartType(chartType)
  builder.theme.setTheme(theme)

  if (!config?.withFields) {
    return
  }

  builder.dimensions.add('region', (node) => {
    node.setAlias('region')
    node.setEncoding('xAxis')
  })
  builder.measures.add('sales', (node) => {
    node.setAlias('sales')
    node.setEncoding('yAxis')
    node.setAggregate({ func: 'sum' })
  })
}

function useApiDemoBuilder(config?: { chartType?: string; theme?: 'light' | 'dark'; withFields?: boolean }) {
  const [builder] = useState(() => {
    ensureConnectorInitialized()
    return VBI.chart.create(VBI.chart.createEmpty(CONNECTOR_ID))
  })

  useEffect(() => {
    resetBuilder(builder, config)
  }, [builder, config?.chartType, config?.theme, config?.withFields])

  return builder
}

function DslSnapshot(props: { builder: VBIChartBuilder }) {
  const { dsl } = useVBI(props.builder)
  return <pre style={snapshotStyle}>{JSON.stringify(dsl, null, 2)}</pre>
}

function DemoTheme(props: { children: ReactNode }) {
  return (
    <div className='starter-theme starter-page' style={themedSectionStyle}>
      {props.children}
    </div>
  )
}

export function BuilderLayoutApiDemo() {
  const [showLeftPanel, setShowLeftPanel] = useState(true)
  const [showFooter, setShowFooter] = useState(true)

  return (
    <DemoTheme>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button onClick={() => setShowLeftPanel((value) => !value)} type='button'>
          {showLeftPanel ? 'Hide left panel' : 'Show left panel'}
        </button>
        <button onClick={() => setShowFooter((value) => !value)} type='button'>
          {showFooter ? 'Hide footer' : 'Show footer'}
        </button>
      </div>
      <div style={{ ...panelFrameStyle, height: 360 }}>
        <BuilderLayout
          footer={showFooter ? <div style={{ padding: 12 }}>Footer Slot</div> : undefined}
          leftPanel={showLeftPanel ? <div style={{ padding: 12 }}>Left Panel Slot</div> : undefined}
          leftPanelWidth={260}
          main={<div style={{ padding: 16 }}>Main Slot</div>}
          style={{ height: '100%' }}
          topBar={<div style={{ padding: 12 }}>Top Bar Slot</div>}
        />
      </div>
    </DemoTheme>
  )
}

export function ChartRendererApiDemo() {
  const builder = useApiDemoBuilder({ chartType: 'bar', theme: 'light', withFields: true })

  return (
    <DemoTheme>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <ChartTypeSelector builder={builder} style={{ minWidth: 180 }} />
        <ThemeSelector builder={builder} style={themeSelectorStyle} />
      </div>
      <ChartRenderer
        builder={builder}
        debounce={100}
        renderVSeed={(vseed: unknown) => <VSeedRender style={chartCanvasStyle} vseed={vseed as VSeed} />}
        style={{ ...chartRendererStyle, minHeight: 360 }}
      />
    </DemoTheme>
  )
}

export function ChartTypeSelectorApiDemo() {
  const builder = useApiDemoBuilder({ chartType: 'bar', theme: 'light', withFields: true })

  return (
    <DemoTheme>
      <ChartTypeSelector builder={builder} style={{ minWidth: 220 }} />
      <div style={{ ...panelFrameStyle, minHeight: 320 }}>
        <ChartRenderer
          builder={builder}
          debounce={100}
          renderVSeed={(vseed: unknown) => <VSeedRender style={chartCanvasStyle} vseed={vseed as VSeed} />}
          style={{ ...chartRendererStyle, minHeight: 320 }}
        />
      </div>
      <DslSnapshot builder={builder} />
    </DemoTheme>
  )
}

export function FieldPanelApiDemo() {
  const builder = useApiDemoBuilder({ chartType: 'table', theme: 'light', withFields: false })

  return (
    <DemoTheme>
      <div style={{ ...panelFrameStyle, minHeight: 520 }}>
        <FieldPanel
          builder={builder}
          dimensionOptions={dimensionOptions}
          measureOptions={measureOptions}
          style={{ ...fieldPanelStyle, minHeight: 520 }}
          title='FieldPanel Demo'
        />
      </div>
      <DslSnapshot builder={builder} />
    </DemoTheme>
  )
}

export function FilterPanelApiDemo() {
  const builder = useApiDemoBuilder({ chartType: 'table', theme: 'light', withFields: false })

  return (
    <DemoTheme>
      <div style={{ ...panelFrameStyle, minHeight: 560 }}>
        <FilterPanel
          aggregateOptions={[
            { label: 'Sum', value: 'sum' },
            { label: 'Average', value: 'avg' },
            { label: 'Count', value: 'count' },
            { label: 'Max', value: 'max' },
            { label: 'Min', value: 'min' },
          ]}
          builder={builder}
          fieldOptions={filterFieldOptions}
          havingFieldOptions={measureOptions}
          style={{ ...filterPanelStyle, minHeight: 560 }}
          title='FilterPanel Demo'
        />
      </div>
      <DslSnapshot builder={builder} />
    </DemoTheme>
  )
}

export function ThemeSelectorApiDemo() {
  const builder = useApiDemoBuilder({ chartType: 'bar', theme: 'light', withFields: true })

  return (
    <DemoTheme>
      <ThemeSelector builder={builder} style={{ ...themeSelectorStyle, minWidth: 180 }} />
      <div style={{ ...panelFrameStyle, minHeight: 320 }}>
        <ChartRenderer
          builder={builder}
          debounce={100}
          renderVSeed={(vseed: unknown) => <VSeedRender style={chartCanvasStyle} vseed={vseed as VSeed} />}
          style={{ ...chartRendererStyle, minHeight: 320 }}
        />
      </div>
      <DslSnapshot builder={builder} />
    </DemoTheme>
  )
}
