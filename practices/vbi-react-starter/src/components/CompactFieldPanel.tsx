import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import type { VBIChartBuilder, VBIDimension, VBIMeasure } from '@visactor/vbi'
import { useDimensions, useMeasures } from '@visactor/vbi-react'

type FieldOption = { label?: string; value: string }
type DimensionEncoding = NonNullable<VBIDimension['encoding']>
type MeasureEncoding = NonNullable<VBIMeasure['encoding']>
type DimensionAggregateFunction = NonNullable<VBIDimension['aggregate']>['func']
type MeasureAggregateFunction = NonNullable<VBIMeasure['aggregate']>['func']

type CompactFieldPanelProps = {
  builder: VBIChartBuilder
  dimensionOptions?: FieldOption[]
  dimensionsTitle?: string
  measureOptions?: FieldOption[]
  measuresTitle?: string
  style?: CSSProperties
  title?: string
}

const dimensionEncodingOptions: Array<{ label: string; value: DimensionEncoding }> = [
  { label: 'xAxis', value: 'xAxis' },
  { label: 'yAxis', value: 'yAxis' },
  { label: 'angle', value: 'angle' },
  { label: 'color', value: 'color' },
  { label: 'detail', value: 'detail' },
  { label: 'label', value: 'label' },
  { label: 'tooltip', value: 'tooltip' },
  { label: 'row', value: 'row' },
  { label: 'column', value: 'column' },
  { label: 'player', value: 'player' },
  { label: 'hierarchy', value: 'hierarchy' },
]

const measureEncodingOptions: Array<{ label: string; value: MeasureEncoding }> = [
  { label: 'yAxis', value: 'yAxis' },
  { label: 'xAxis', value: 'xAxis' },
  { label: 'primaryYAxis', value: 'primaryYAxis' },
  { label: 'secondaryYAxis', value: 'secondaryYAxis' },
  { label: 'color', value: 'color' },
  { label: 'detail', value: 'detail' },
  { label: 'label', value: 'label' },
  { label: 'tooltip', value: 'tooltip' },
  { label: 'size', value: 'size' },
  { label: 'angle', value: 'angle' },
  { label: 'radius', value: 'radius' },
]

const measureAggregateOptions: MeasureAggregateFunction[] = [
  'sum',
  'avg',
  'count',
  'countDistinct',
  'max',
  'min',
  'variance',
  'variancePop',
  'stddev',
  'median',
  'quantile',
]

const dimensionAggregateOptions: DimensionAggregateFunction[] = [
  'toYear',
  'toQuarter',
  'toMonth',
  'toWeek',
  'toDay',
  'toHour',
  'toMinute',
  'toSecond',
]

function clampQuantile(value: number): number {
  if (Number.isNaN(value)) return 0.5
  if (value < 0) return 0
  if (value > 1) return 1
  return value
}

function toActiveSet(items: { field: string }[]): Set<string> {
  return new Set(items.map((item) => item.field))
}

function formatOption(option: FieldOption): string {
  return option.label ?? option.value
}

function CompactFieldRowTags(props: { aggregate?: string; encoding?: string }) {
  const { aggregate, encoding } = props
  return (
    <div className="compact-field-tags">
      {encoding ? <span className="compact-field-tag">Enc: {encoding}</span> : null}
      {aggregate ? <span className="compact-field-tag">Agg: {aggregate}</span> : null}
    </div>
  )
}

export function CompactFieldPanel(props: CompactFieldPanelProps) {
  const {
    builder,
    dimensionOptions = [],
    dimensionsTitle = 'Dimensions',
    measureOptions = [],
    measuresTitle = 'Measures',
    style,
    title = 'Fields',
  } = props

  const { addDimension, dimensions, removeDimension, updateDimension } = useDimensions(builder)
  const { addMeasure, measures, removeMeasure, updateMeasure } = useMeasures(builder)
  const [selectedDimension, setSelectedDimension] = useState('')
  const [selectedMeasure, setSelectedMeasure] = useState('')
  const [editingDimensionId, setEditingDimensionId] = useState<string | null>(null)
  const [editingMeasureId, setEditingMeasureId] = useState<string | null>(null)

  const availableDimensions = useMemo(() => {
    const activeSet = toActiveSet(dimensions)
    return dimensionOptions.filter((option) => !activeSet.has(option.value))
  }, [dimensionOptions, dimensions])

  const availableMeasures = useMemo(() => {
    const activeSet = toActiveSet(measures)
    return measureOptions.filter((option) => !activeSet.has(option.value))
  }, [measureOptions, measures])

  useEffect(() => {
    if (!availableDimensions.some((option) => option.value === selectedDimension)) {
      setSelectedDimension(availableDimensions[0]?.value ?? '')
    }
  }, [availableDimensions, selectedDimension])

  useEffect(() => {
    if (!availableMeasures.some((option) => option.value === selectedMeasure)) {
      setSelectedMeasure(availableMeasures[0]?.value ?? '')
    }
  }, [availableMeasures, selectedMeasure])

  return (
    <section className="compact-field-panel" style={style}>
      <header>
        <strong>{title}</strong>
      </header>
      <div className="compact-field-sections">
        <section className="compact-field-section">
          <div className="compact-field-toolbar">
            <strong>{dimensionsTitle}</strong>
            <div className="compact-field-add-row">
              <select
                aria-label="Available dimensions"
                onChange={(event) => setSelectedDimension(event.target.value)}
                value={selectedDimension}
              >
                {availableDimensions.length === 0 ? (
                  <option value="">No dimensions available</option>
                ) : (
                  availableDimensions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {formatOption(option)}
                    </option>
                  ))
                )}
              </select>
              <button
                aria-label="Add selected dimension"
                disabled={!selectedDimension}
                onClick={() => addDimension(selectedDimension)}
                type="button"
              >
                Add
              </button>
            </div>
          </div>
          <ul aria-label="Selected dimensions" className="compact-field-list">
            {dimensions.length === 0 ? <li className="compact-field-empty">No dimensions selected</li> : null}
            {dimensions.map((dimension) => (
              <li className="compact-field-item" key={dimension.id}>
                <div className="compact-field-item-row">
                  <div className="compact-field-main">
                    <strong>{dimension.alias || dimension.field}</strong>
                    <span>{dimension.field}</span>
                  </div>
                  <CompactFieldRowTags aggregate={dimension.aggregate?.func} encoding={dimension.encoding} />
                  <div className="compact-field-actions">
                    <button
                      aria-label={
                        editingDimensionId === dimension.id
                          ? `Finish editing dimension ${dimension.field}`
                          : `Edit dimension ${dimension.field}`
                      }
                      onClick={() => setEditingDimensionId((id) => (id === dimension.id ? null : dimension.id))}
                      type="button"
                    >
                      {editingDimensionId === dimension.id ? 'Done' : 'Edit'}
                    </button>
                    <button aria-label={`Remove dimension ${dimension.field}`} onClick={() => removeDimension(dimension.id)} type="button">
                      Remove
                    </button>
                  </div>
                </div>
                {editingDimensionId === dimension.id ? (
                  <div className="compact-field-editor">
                    <input
                      aria-label={`Alias for dimension ${dimension.field}`}
                      onChange={(event) => updateDimension(dimension.id, { alias: event.target.value })}
                      placeholder="Alias"
                      value={dimension.alias ?? ''}
                    />
                    <select
                      aria-label={`Encoding for dimension ${dimension.field}`}
                      onChange={(event) => {
                        const nextEncoding = event.target.value as DimensionEncoding
                        updateDimension(dimension.id, { encoding: nextEncoding })
                      }}
                      value={dimension.encoding ?? 'xAxis'}
                    >
                      {dimensionEncodingOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <select
                      aria-label={`Aggregate for dimension ${dimension.field}`}
                      onChange={(event) => {
                        const nextFunc = event.target.value as DimensionAggregateFunction | ''
                        updateDimension(dimension.id, {
                          aggregate: nextFunc ? { func: nextFunc } : null,
                        })
                      }}
                      value={dimension.aggregate?.func ?? ''}
                    >
                      <option value="">No aggregate</option>
                      {dimensionAggregateOptions.map((func) => (
                        <option key={func} value={func}>
                          {func}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
        <section className="compact-field-section">
          <div className="compact-field-toolbar">
            <strong>{measuresTitle}</strong>
            <div className="compact-field-add-row">
              <select aria-label="Available measures" onChange={(event) => setSelectedMeasure(event.target.value)} value={selectedMeasure}>
                {availableMeasures.length === 0 ? (
                  <option value="">No measures available</option>
                ) : (
                  availableMeasures.map((option) => (
                    <option key={option.value} value={option.value}>
                      {formatOption(option)}
                    </option>
                  ))
                )}
              </select>
              <button aria-label="Add selected measure" disabled={!selectedMeasure} onClick={() => addMeasure(selectedMeasure)} type="button">
                Add
              </button>
            </div>
          </div>
          <ul aria-label="Selected measures" className="compact-field-list">
            {measures.length === 0 ? <li className="compact-field-empty">No measures selected</li> : null}
            {measures.map((measure) => (
              <li className="compact-field-item" key={measure.id}>
                <div className="compact-field-item-row">
                  <div className="compact-field-main">
                    <strong>{measure.alias || measure.field}</strong>
                    <span>{measure.field}</span>
                  </div>
                  <CompactFieldRowTags aggregate={measure.aggregate?.func} encoding={measure.encoding} />
                  <div className="compact-field-actions">
                    <button
                      aria-label={
                        editingMeasureId === measure.id
                          ? `Finish editing measure ${measure.field}`
                          : `Edit measure ${measure.field}`
                      }
                      onClick={() => setEditingMeasureId((id) => (id === measure.id ? null : measure.id))}
                      type="button"
                    >
                      {editingMeasureId === measure.id ? 'Done' : 'Edit'}
                    </button>
                    <button aria-label={`Remove measure ${measure.field}`} onClick={() => removeMeasure(measure.id)} type="button">
                      Remove
                    </button>
                  </div>
                </div>
                {editingMeasureId === measure.id ? (
                  <div className="compact-field-editor">
                    <input
                      aria-label={`Alias for measure ${measure.field}`}
                      onChange={(event) => updateMeasure(measure.id, { alias: event.target.value })}
                      placeholder="Alias"
                      value={measure.alias ?? ''}
                    />
                    <select
                      aria-label={`Encoding for measure ${measure.field}`}
                      onChange={(event) =>
                        updateMeasure(measure.id, { encoding: event.target.value as MeasureEncoding })
                      }
                      value={measure.encoding ?? 'yAxis'}
                    >
                      {measureEncodingOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <select
                      aria-label={`Aggregate for measure ${measure.field}`}
                      onChange={(event) => {
                        const func = event.target.value as MeasureAggregateFunction
                        if (func === 'quantile') {
                          updateMeasure(measure.id, { aggregate: { func: 'quantile', quantile: 0.5 } })
                          return
                        }
                        updateMeasure(measure.id, { aggregate: { func } })
                      }}
                      value={measure.aggregate?.func ?? 'sum'}
                    >
                      {measureAggregateOptions.map((func) => (
                        <option key={func} value={func}>
                          {func}
                        </option>
                      ))}
                    </select>
                    {measure.aggregate?.func === 'quantile' ? (
                      <input
                        aria-label={`Quantile for measure ${measure.field}`}
                        max={1}
                        min={0}
                        onChange={(event) => {
                          const { value } = event.target
                          const quantile =
                            value === '' ? measure.aggregate.quantile ?? 0.5 : clampQuantile(Number(value))
                          updateMeasure(measure.id, { aggregate: { func: 'quantile', quantile } })
                        }}
                        step={0.05}
                        type="number"
                        value={measure.aggregate.quantile ?? 0.5}
                      />
                    ) : null}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  )
}
