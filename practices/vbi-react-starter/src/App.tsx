import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react'
import { VBI } from '@visactor/vbi'
import { useVBI } from '@visactor/vbi-react'
import { BuilderLayout } from '@visactor/vbi-react/components'
import type { DatasetColumn } from '@visactor/vquery'

import './App.css'
import { CompactFieldPanel } from './components/CompactFieldPanel'
import { StarterFooter, type StarterFooterProps } from './components/StarterFooter'
import { StarterMainPanel } from './components/StarterMainPanel'
import { StarterTopBar } from './components/StarterTopBar'
import { fieldPanelStyle, layoutStyle } from './styles/styleObjects'
import './styles/tokens.css'
import { createLocalConnector, setLocalDataWithSchema, type LocalRow } from './utils/localConnector'
import { clearBuilderSelections, inferSchema, rowsToDataset } from './utils/dataset'
import { readDebugState } from './utils/debugState'
import { getLeftPanelWidth, isCompactViewport } from './utils/layout'
import { parseCsv } from './utils/parseCsv'
import { supermarketSchema } from './utils/supermarketSchema'

type DemoStatusTone = StarterFooterProps['statusTone']

const CONNECTOR_ID = 'vbiReactStarterLocalDataConnector'

let connectorInitialized = false

function ensureConnectorInitialized() {
  if (connectorInitialized) {
    return
  }

  createLocalConnector(CONNECTOR_ID)
  connectorInitialized = true
}

function parseCsvRows(csvText: string) {
  const [headerRow = [], ...dataRows] = parseCsv(csvText)
  const headers = headerRow.map((header) => header.trim())

  if (headers.length === 0) {
    throw new Error('CSV is empty')
  }

  return { dataRows, headers }
}

function inferDimensionAndMeasureOptions(schema: DatasetColumn[]) {
  const dimensions: string[] = []
  const measures: string[] = []

  for (const field of schema) {
    if (field.type === 'number') {
      measures.push(field.name)
      continue
    }

    dimensions.push(field.name)
  }

  return { dimensions, measures }
}

function extractDatasetFromCsv(csvText: string, schema: DatasetColumn[]) {
  const { dataRows, headers } = parseCsvRows(csvText)
  return rowsToDataset(headers, dataRows, schema)
}

function extractDatasetFromUploadedCsv(csvText: string) {
  const { dataRows, headers } = parseCsvRows(csvText)
  const schema = inferSchema(headers, dataRows)
  const data = rowsToDataset(headers, dataRows, schema)
  return { data, schema }
}

export function APP() {
  const debugState = typeof window === 'undefined' ? 'none' : readDebugState(window.location.search)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [builder] = useState(() => {
    ensureConnectorInitialized()
    return VBI.chart.create(VBI.chart.createEmpty(CONNECTOR_ID))
  })
  const { dsl } = useVBI(builder)
  const [availableDimensions, setAvailableDimensions] = useState<string[]>([])
  const [availableMeasures, setAvailableMeasures] = useState<string[]>([])
  const [dataSourceLabel, setDataSourceLabel] = useState('未加载数据')
  const [rowCount, setRowCount] = useState(0)
  const [statusMessage, setStatusMessage] = useState('先加载 demo 数据或上传 CSV，再用 starter components 组装图表。')
  const [statusTone, setStatusTone] = useState<DemoStatusTone>('idle')
  const [isCompactLayout, setIsCompactLayout] = useState(() =>
    typeof window === 'undefined' ? false : isCompactViewport(window.innerWidth),
  )
  const [isFieldPanelVisible, setIsFieldPanelVisible] = useState(true)
  const [leftPanelWidth, setLeftPanelWidth] = useState(() =>
    typeof window === 'undefined' ? 360 : getLeftPanelWidth(window.innerWidth),
  )

  const dimensionOptions = useMemo(
    () => availableDimensions.map((field) => ({ label: field, value: field })),
    [availableDimensions],
  )

  const measureOptions = useMemo(
    () => availableMeasures.map((field) => ({ label: field, value: field })),
    [availableMeasures],
  )

  const hasAvailableFields = availableDimensions.length > 0 || availableMeasures.length > 0
  const hasConfiguredFields = (dsl.dimensions?.length ?? 0) > 0 || (dsl.measures?.length ?? 0) > 0

  const refreshAvailableFields = async () => {
    const schema = (await builder.getSchema()) as DatasetColumn[]
    const { dimensions, measures } = inferDimensionAndMeasureOptions(schema)

    setAvailableDimensions(dimensions)
    setAvailableMeasures(measures)
  }

  const applyDataset = async (data: LocalRow[], schema: DatasetColumn[], sourceLabel: string) => {
    setLocalDataWithSchema(data, schema)
    clearBuilderSelections(builder)
    await refreshAvailableFields()
    setDataSourceLabel(sourceLabel)
    setRowCount(data.length)
    setStatusTone('success')
    setStatusMessage(`已加载 ${data.length} 行数据。先在左侧添加维度和指标，再切换图表类型。`)
  }

  const handleLoadDemoData = async () => {
    try {
      const response = await fetch('https://visactor.github.io/VBI/dataset/supermarket.csv')

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const csv = await response.text()
      const data = extractDatasetFromCsv(csv, supermarketSchema)
      await applyDataset(data, supermarketSchema, 'supermarket.csv')
    } catch (error) {
      console.error('Failed to load starter demo data:', error)
      setStatusTone('error')
      setStatusMessage('加载 demo 数据失败，请稍后重试。')
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    try {
      const text = await file.text()
      const { data, schema } = extractDatasetFromUploadedCsv(text)
      await applyDataset(data, schema, file.name)
    } catch (error) {
      console.error('Failed to load uploaded CSV:', error)
      setStatusTone('error')
      setStatusMessage(`读取文件 ${file.name} 失败，请检查 CSV 格式。`)
    } finally {
      event.target.value = ''
    }
  }

  useEffect(() => {
    void refreshAvailableFields()
  }, [builder])

  useEffect(() => {
    const syncPanelWidth = () => {
      const nextWidth = window.innerWidth
      const nextCompact = isCompactViewport(nextWidth)

      setLeftPanelWidth(getLeftPanelWidth(nextWidth))
      setIsCompactLayout(nextCompact)

      if (!nextCompact) {
        setIsFieldPanelVisible(true)
      }
    }

    syncPanelWidth()
    window.addEventListener('resize', syncPanelWidth)

    return () => {
      window.removeEventListener('resize', syncPanelWidth)
    }
  }, [])

  return (
    <div className='starter-page starter-theme'>
      <BuilderLayout
        footer={
          <div className='starter-footer-slot'>
            <StarterFooter
              availableDimensionsCount={availableDimensions.length}
              availableMeasuresCount={availableMeasures.length}
              dataSourceLabel={dataSourceLabel}
              dsl={dsl}
              rowCount={rowCount}
              statusMessage={statusMessage}
              statusTone={statusTone}
            />
          </div>
        }
        leftPanel={
          !isCompactLayout || isFieldPanelVisible ? (
            <CompactFieldPanel
              builder={builder}
              dimensionOptions={dimensionOptions}
              measureOptions={measureOptions}
              style={fieldPanelStyle}
              title='Starter Fields'
            />
          ) : undefined
        }
        leftPanelWidth={leftPanelWidth}
        main={
          <StarterMainPanel
            builder={builder}
            debugState={debugState}
            hasAvailableFields={hasAvailableFields}
            hasConfiguredFields={hasConfiguredFields}
            isCompactLayout={isCompactLayout}
            isFieldPanelVisible={isFieldPanelVisible}
            onLoadDemoData={() => {
              void handleLoadDemoData()
            }}
            onShowFieldPanel={() => {
              setIsFieldPanelVisible(true)
            }}
          />
        }
        style={layoutStyle}
        topBar={
          <StarterTopBar
            builder={builder}
            isFieldPanelVisible={!isCompactLayout || isFieldPanelVisible}
            isToggleVisible={isCompactLayout}
            onLoadDemoData={() => {
              void handleLoadDemoData()
            }}
            onToggleFieldPanel={() => {
              setIsFieldPanelVisible((visible) => !visible)
            }}
            onUploadClick={handleUploadClick}
          />
        }
      />

      <input accept='.csv,text/csv' hidden onChange={handleFileChange} ref={fileInputRef} type='file' />
    </div>
  )
}

export default APP
