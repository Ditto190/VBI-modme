import { useEffect, useMemo, useState } from 'react'
import type {
  VBIChartBuilder,
  VBIHavingAggregate,
  VBIHavingClause,
  VBIHavingFilter,
  VBIHavingGroup,
  VBIWhereClause,
  VBIWhereFilter,
  VBIWhereGroup,
} from '@visactor/vbi'

import { useHavingFilter, useWhereFilter } from '../hooks'
import type { BaseComponentProps, SelectOption } from './types'
import { joinClassNames } from './utils'

const defaultWhereOperatorOptions: Array<SelectOption<string>> = [
  { label: 'eq', value: 'eq' },
  { label: 'neq', value: 'neq' },
  { label: 'gt', value: 'gt' },
  { label: 'gte', value: 'gte' },
  { label: 'lt', value: 'lt' },
  { label: 'lte', value: 'lte' },
  { label: 'like', value: 'like' },
  { label: 'in', value: 'in' },
]

const defaultHavingOperatorOptions: Array<SelectOption<string>> = [
  { label: 'gt', value: 'gt' },
  { label: 'gte', value: 'gte' },
  { label: 'lt', value: 'lt' },
  { label: 'lte', value: 'lte' },
  { label: 'eq', value: 'eq' },
  { label: 'neq', value: 'neq' },
]

type HavingAggregateFunction = VBIHavingAggregate['func']

const defaultAggregateOptions: Array<SelectOption<HavingAggregateFunction>> = [
  { label: 'sum', value: 'sum' },
  { label: 'avg', value: 'avg' },
  { label: 'count', value: 'count' },
  { label: 'countDistinct', value: 'countDistinct' },
  { label: 'max', value: 'max' },
  { label: 'min', value: 'min' },
  { label: 'variance', value: 'variance' },
  { label: 'variancePop', value: 'variancePop' },
  { label: 'stddev', value: 'stddev' },
  { label: 'median', value: 'median' },
  { label: 'quantile', value: 'quantile' },
]

export interface FilterPanelProps extends BaseComponentProps {
  builder: VBIChartBuilder
  fieldOptions?: Array<SelectOption<string>>
  aggregateOptions?: Array<SelectOption<HavingAggregateFunction>>
  havingFieldOptions?: Array<SelectOption<string>>
  havingTitle?: string
  havingOperatorOptions?: Array<SelectOption<string>>
  title?: string
  whereOperatorOptions?: Array<SelectOption<string>>
  whereTitle?: string
}

function isWhereGroup(entry: VBIWhereClause): entry is VBIWhereGroup {
  return 'conditions' in entry
}

function isHavingGroup(entry: VBIHavingClause): entry is VBIHavingGroup {
  return 'conditions' in entry
}

function toText(option: SelectOption<string>): string {
  return typeof option.label === 'string' ? option.label : option.value
}

function stringifyValue(value: unknown): string {
  if (value == null) return ''
  return typeof value === 'string' ? value : JSON.stringify(value)
}

function createHavingAggregate(func: HavingAggregateFunction): VBIHavingAggregate {
  return func === 'quantile' ? { func: 'quantile' } : { func }
}

export function FilterPanel(props: FilterPanelProps) {
  const {
    aggregateOptions = defaultAggregateOptions,
    builder,
    className,
    fieldOptions = [],
    havingFieldOptions = fieldOptions,
    havingOperatorOptions = defaultHavingOperatorOptions,
    havingTitle = 'Having filters',
    style,
    title = 'Filters',
    whereOperatorOptions = defaultWhereOperatorOptions,
    whereTitle = 'Where filters',
  } = props
  const { clearHavingFilter, havingFilter, mutateHavingFilter, removeHavingEntry } = useHavingFilter(builder)
  const { clearWhereFilter, mutateWhereFilter, removeWhereEntry, whereFilter } = useWhereFilter(builder)
  const [selectedWhereField, setSelectedWhereField] = useState('')
  const [selectedWhereOperator, setSelectedWhereOperator] = useState(whereOperatorOptions[0]?.value ?? 'eq')
  const [whereValue, setWhereValue] = useState('')
  const [selectedHavingField, setSelectedHavingField] = useState('')
  const [selectedHavingAggregate, setSelectedHavingAggregate] = useState<HavingAggregateFunction>(
    aggregateOptions[0]?.value ?? 'sum',
  )
  const [selectedHavingOperator, setSelectedHavingOperator] = useState(havingOperatorOptions[0]?.value ?? 'gt')
  const [havingValue, setHavingValue] = useState('')
  const [editingWhereId, setEditingWhereId] = useState<string | null>(null)
  const [editingHavingId, setEditingHavingId] = useState<string | null>(null)

  const whereFieldValues = useMemo(() => fieldOptions.map((option) => option.value), [fieldOptions])
  const havingFieldValues = useMemo(() => havingFieldOptions.map((option) => option.value), [havingFieldOptions])

  useEffect(() => {
    if (!whereFieldValues.includes(selectedWhereField)) {
      setSelectedWhereField(whereFieldValues[0] ?? '')
    }
  }, [selectedWhereField, whereFieldValues])

  useEffect(() => {
    if (!havingFieldValues.includes(selectedHavingField)) {
      setSelectedHavingField(havingFieldValues[0] ?? '')
    }
  }, [havingFieldValues, selectedHavingField])

  return (
    <section
      className={joinClassNames('vbi-react-filter-panel', className)}
      style={{ display: 'grid', gap: 8, gridTemplateRows: 'auto minmax(0, 1fr)', minHeight: 0, ...style }}
    >
      <header>
        <strong>{title}</strong>
      </header>
      <div style={{ display: 'grid', gap: 8, gridTemplateRows: 'minmax(0, 1fr) minmax(0, 1fr)', minHeight: 0 }}>
        <section style={{ display: 'grid', gap: 6, gridTemplateRows: 'auto minmax(0, 1fr)', minHeight: 0 }}>
          <div style={{ display: 'grid', gap: 6 }}>
            <strong>{whereTitle}</strong>
            <div
              style={{
                display: 'grid',
                gap: 6,
                gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 120px) minmax(0, 1fr) auto auto auto',
              }}
            >
              <select
                aria-label='Where field'
                onChange={(event) => setSelectedWhereField(event.target.value)}
                value={selectedWhereField}
              >
                {fieldOptions.length === 0 ? (
                  <option value=''>No where fields available</option>
                ) : (
                  fieldOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {toText(option)}
                    </option>
                  ))
                )}
              </select>
              <select
                aria-label='Where operator'
                onChange={(event) => setSelectedWhereOperator(event.target.value)}
                value={selectedWhereOperator}
              >
                {whereOperatorOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {toText(option)}
                  </option>
                ))}
              </select>
              <input
                aria-label='Where value'
                onInput={(event) => setWhereValue(event.currentTarget.value)}
                placeholder='Value'
                value={whereValue}
              />
              <button
                aria-label='Add where filter'
                disabled={!selectedWhereField}
                onClick={() => {
                  mutateWhereFilter((nextWhereFilter) => {
                    nextWhereFilter.add(selectedWhereField, (node) => {
                      node.setOperator(selectedWhereOperator).setValue(whereValue)
                    })
                  })
                  setWhereValue('')
                }}
                type='button'
              >
                Add where
              </button>
              <button
                aria-label='Add where group'
                onClick={() => {
                  mutateWhereFilter((nextWhereFilter) => {
                    nextWhereFilter.addGroup('and', () => undefined)
                  })
                }}
                type='button'
              >
                Add group
              </button>
              <button aria-label='Clear where filters' onClick={clearWhereFilter} type='button'>
                Clear
              </button>
            </div>
          </div>
          <ul
            aria-label='Where conditions'
            style={{
              border: '1px solid #d9d9d9',
              borderRadius: 8,
              display: 'grid',
              gap: 6,
              listStyle: 'none',
              margin: 0,
              minHeight: 0,
              overflowY: 'auto',
              padding: 6,
            }}
          >
            {whereFilter.conditions.length === 0 ? <li style={{ color: '#5f6673' }}>No where filters</li> : null}
            {whereFilter.conditions.map((entry) =>
              isWhereGroup(entry) ? (
                <li
                  key={entry.id}
                  style={{ border: '1px solid #d9d9d9', borderRadius: 8, display: 'grid', gap: 6, padding: 6 }}
                >
                  <div style={{ alignItems: 'center', display: 'flex', gap: 8, justifyContent: 'space-between' }}>
                    <strong>Group</strong>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <select
                        aria-label={`Where group operator ${entry.id}`}
                        onChange={(event) => {
                          mutateWhereFilter((nextWhereFilter) => {
                            nextWhereFilter.updateGroup(entry.id, (group) => {
                              group.setOperator(event.target.value as 'and' | 'or')
                            })
                          })
                        }}
                        value={entry.op}
                      >
                        <option value='and'>and</option>
                        <option value='or'>or</option>
                      </select>
                      <button onClick={() => removeWhereEntry(entry.id)} type='button'>
                        Remove
                      </button>
                    </div>
                  </div>
                  <span style={{ color: '#5f6673', fontSize: 12 }}>
                    Nested groups are shown for visibility in this first pass. Conditions: {entry.conditions.length}
                  </span>
                </li>
              ) : (
                <WhereFilterRow
                  entry={entry}
                  fieldOptions={fieldOptions}
                  isEditing={editingWhereId === entry.id}
                  key={entry.id}
                  onEditToggle={() => setEditingWhereId((id) => (id === entry.id ? null : entry.id))}
                  onRemove={() => removeWhereEntry(entry.id)}
                  onSave={(nextField, nextOperator, nextValue) => {
                    mutateWhereFilter((nextWhereFilter) => {
                      nextWhereFilter.update(entry.id, (node) => {
                        node.setField(nextField).setOperator(nextOperator).setValue(nextValue)
                      })
                    })
                  }}
                  operatorOptions={whereOperatorOptions}
                />
              ),
            )}
          </ul>
        </section>
        <section style={{ display: 'grid', gap: 6, gridTemplateRows: 'auto minmax(0, 1fr)', minHeight: 0 }}>
          <div style={{ display: 'grid', gap: 6 }}>
            <strong>{havingTitle}</strong>
            <div
              style={{
                display: 'grid',
                gap: 6,
                gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 120px) minmax(0, 120px) minmax(0, 1fr) auto auto auto',
              }}
            >
              <select
                aria-label='Having field'
                onChange={(event) => setSelectedHavingField(event.target.value)}
                value={selectedHavingField}
              >
                {havingFieldOptions.length === 0 ? (
                  <option value=''>No having fields available</option>
                ) : (
                  havingFieldOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {toText(option)}
                    </option>
                  ))
                )}
              </select>
              <select
                aria-label='Having aggregate'
                onChange={(event) => setSelectedHavingAggregate(event.target.value as HavingAggregateFunction)}
                value={selectedHavingAggregate}
              >
                {aggregateOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {toText(option)}
                  </option>
                ))}
              </select>
              <select
                aria-label='Having operator'
                onChange={(event) => setSelectedHavingOperator(event.target.value)}
                value={selectedHavingOperator}
              >
                {havingOperatorOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {toText(option)}
                  </option>
                ))}
              </select>
              <input
                aria-label='Having value'
                onInput={(event) => setHavingValue(event.currentTarget.value)}
                placeholder='Value'
                value={havingValue}
              />
              <button
                aria-label='Add having filter'
                disabled={!selectedHavingField}
                onClick={() => {
                  mutateHavingFilter((nextHavingFilter) => {
                    nextHavingFilter.add(selectedHavingField, (node) => {
                      node
                        .setAggregate(createHavingAggregate(selectedHavingAggregate))
                        .setOperator(selectedHavingOperator)
                        .setValue(havingValue)
                    })
                  })
                  setHavingValue('')
                }}
                type='button'
              >
                Add having
              </button>
              <button
                aria-label='Add having group'
                onClick={() => {
                  mutateHavingFilter((nextHavingFilter) => {
                    nextHavingFilter.addGroup('and', () => undefined)
                  })
                }}
                type='button'
              >
                Add group
              </button>
              <button aria-label='Clear having filters' onClick={clearHavingFilter} type='button'>
                Clear
              </button>
            </div>
          </div>
          <ul
            aria-label='Having conditions'
            style={{
              border: '1px solid #d9d9d9',
              borderRadius: 8,
              display: 'grid',
              gap: 6,
              listStyle: 'none',
              margin: 0,
              minHeight: 0,
              overflowY: 'auto',
              padding: 6,
            }}
          >
            {havingFilter.conditions.length === 0 ? <li style={{ color: '#5f6673' }}>No having filters</li> : null}
            {havingFilter.conditions.map((entry) =>
              isHavingGroup(entry) ? (
                <li
                  key={entry.id}
                  style={{ border: '1px solid #d9d9d9', borderRadius: 8, display: 'grid', gap: 6, padding: 6 }}
                >
                  <div style={{ alignItems: 'center', display: 'flex', gap: 8, justifyContent: 'space-between' }}>
                    <strong>Group</strong>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <select
                        aria-label={`Having group operator ${entry.id}`}
                        onChange={(event) => {
                          mutateHavingFilter((nextHavingFilter) => {
                            nextHavingFilter.updateGroup(entry.id, (group) => {
                              group.setOperator(event.target.value as 'and' | 'or')
                            })
                          })
                        }}
                        value={entry.op}
                      >
                        <option value='and'>and</option>
                        <option value='or'>or</option>
                      </select>
                      <button onClick={() => removeHavingEntry(entry.id)} type='button'>
                        Remove
                      </button>
                    </div>
                  </div>
                  <span style={{ color: '#5f6673', fontSize: 12 }}>
                    Nested groups are shown for visibility in this first pass. Conditions: {entry.conditions.length}
                  </span>
                </li>
              ) : (
                <HavingFilterRow
                  aggregateOptions={aggregateOptions}
                  entry={entry}
                  fieldOptions={havingFieldOptions}
                  isEditing={editingHavingId === entry.id}
                  key={entry.id}
                  onEditToggle={() => setEditingHavingId((id) => (id === entry.id ? null : entry.id))}
                  onRemove={() => removeHavingEntry(entry.id)}
                  onSave={(nextField, nextAggregate, nextOperator, nextValue) => {
                    mutateHavingFilter((nextHavingFilter) => {
                      nextHavingFilter.update(entry.id, (node) => {
                        node
                          .setAggregate(createHavingAggregate(nextAggregate))
                          .setOperator(nextOperator)
                          .setValue(nextValue)
                      })
                    })
                  }}
                  operatorOptions={havingOperatorOptions}
                />
              ),
            )}
          </ul>
        </section>
      </div>
    </section>
  )
}

type WhereFilterRowProps = {
  entry: VBIWhereFilter
  fieldOptions: Array<SelectOption<string>>
  isEditing: boolean
  onEditToggle: () => void
  onRemove: () => void
  onSave: (field: string, operator: string, value: string) => void
  operatorOptions: Array<SelectOption<string>>
}

function WhereFilterRow(props: WhereFilterRowProps) {
  const { entry, fieldOptions, isEditing, onEditToggle, onRemove, onSave, operatorOptions } = props
  const [field, setField] = useState(entry.field)
  const [operator, setOperator] = useState(entry.op)
  const [value, setValue] = useState(stringifyValue(entry.value))

  useEffect(() => {
    setField(entry.field)
    setOperator(entry.op)
    setValue(stringifyValue(entry.value))
  }, [entry.field, entry.op, entry.value, isEditing])

  return (
    <li style={{ border: '1px solid #d9d9d9', borderRadius: 8, display: 'grid', gap: 6, padding: 6 }}>
      <div
        style={{ alignItems: 'center', display: 'grid', gap: 6, gridTemplateColumns: 'minmax(0, 1fr) auto auto auto' }}
      >
        <strong style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{entry.field}</strong>
        <span style={{ color: '#5f6673', fontSize: 12 }}>{entry.op || '(unset)'}</span>
        <span
          style={{ color: '#5f6673', fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        >
          {stringifyValue(entry.value) || '(empty)'}
        </span>
        <div style={{ display: 'flex', gap: 4 }}>
          <button
            aria-label={isEditing ? `Finish editing where filter ${entry.field}` : `Edit where filter ${entry.field}`}
            onClick={onEditToggle}
            type='button'
          >
            {isEditing ? 'Done' : 'Edit'}
          </button>
          <button aria-label={`Remove where filter ${entry.field}`} onClick={onRemove} type='button'>
            Remove
          </button>
        </div>
      </div>
      {isEditing ? (
        <div
          style={{
            display: 'grid',
            gap: 6,
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 120px) minmax(0, 1fr) auto',
          }}
        >
          <select
            aria-label={`Where field ${entry.field}`}
            onChange={(event) => setField(event.target.value)}
            value={field}
          >
            {fieldOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {toText(option)}
              </option>
            ))}
          </select>
          <select
            aria-label={`Where operator ${entry.field}`}
            onChange={(event) => setOperator(event.target.value)}
            value={operator}
          >
            {operatorOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {toText(option)}
              </option>
            ))}
          </select>
          <input
            aria-label={`Where value ${entry.field}`}
            onInput={(event) => setValue(event.currentTarget.value)}
            value={value}
          />
          <button
            aria-label={`Save where filter ${entry.field}`}
            onClick={() => {
              onSave(field, operator, value)
              onEditToggle()
            }}
            type='button'
          >
            Save
          </button>
        </div>
      ) : null}
    </li>
  )
}

type HavingFilterRowProps = {
  aggregateOptions: Array<SelectOption<HavingAggregateFunction>>
  entry: VBIHavingFilter
  fieldOptions: Array<SelectOption<string>>
  isEditing: boolean
  onEditToggle: () => void
  onRemove: () => void
  onSave: (field: string, aggregate: HavingAggregateFunction, operator: string, value: string) => void
  operatorOptions: Array<SelectOption<string>>
}

function HavingFilterRow(props: HavingFilterRowProps) {
  const { aggregateOptions, entry, fieldOptions, isEditing, onEditToggle, onRemove, onSave, operatorOptions } = props
  const [field, setField] = useState(entry.field)
  const [aggregate, setAggregate] = useState<HavingAggregateFunction>(entry.aggregate.func)
  const [operator, setOperator] = useState(entry.op)
  const [value, setValue] = useState(stringifyValue(entry.value))

  useEffect(() => {
    setField(entry.field)
    setAggregate(entry.aggregate.func)
    setOperator(entry.op)
    setValue(stringifyValue(entry.value))
  }, [entry.aggregate.func, entry.field, entry.op, entry.value, isEditing])

  return (
    <li style={{ border: '1px solid #d9d9d9', borderRadius: 8, display: 'grid', gap: 6, padding: 6 }}>
      <div
        style={{
          alignItems: 'center',
          display: 'grid',
          gap: 6,
          gridTemplateColumns: 'minmax(0, 1fr) auto auto auto auto',
        }}
      >
        <strong style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{entry.field}</strong>
        <span style={{ color: '#5f6673', fontSize: 12 }}>{entry.aggregate.func}</span>
        <span style={{ color: '#5f6673', fontSize: 12 }}>{entry.op || '(unset)'}</span>
        <span
          style={{ color: '#5f6673', fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        >
          {stringifyValue(entry.value) || '(empty)'}
        </span>
        <div style={{ display: 'flex', gap: 4 }}>
          <button
            aria-label={isEditing ? `Finish editing having filter ${entry.field}` : `Edit having filter ${entry.field}`}
            onClick={onEditToggle}
            type='button'
          >
            {isEditing ? 'Done' : 'Edit'}
          </button>
          <button aria-label={`Remove having filter ${entry.field}`} onClick={onRemove} type='button'>
            Remove
          </button>
        </div>
      </div>
      {isEditing ? (
        <div
          style={{
            display: 'grid',
            gap: 6,
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 120px) minmax(0, 120px) minmax(0, 1fr) auto',
          }}
        >
          <select
            aria-label={`Having field ${entry.field}`}
            onChange={(event) => setField(event.target.value)}
            value={field}
          >
            {fieldOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {toText(option)}
              </option>
            ))}
          </select>
          <select
            aria-label={`Having aggregate ${entry.field}`}
            onChange={(event) => setAggregate(event.target.value as HavingAggregateFunction)}
            value={aggregate}
          >
            {aggregateOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {toText(option)}
              </option>
            ))}
          </select>
          <select
            aria-label={`Having operator ${entry.field}`}
            onChange={(event) => setOperator(event.target.value)}
            value={operator}
          >
            {operatorOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {toText(option)}
              </option>
            ))}
          </select>
          <input
            aria-label={`Having value ${entry.field}`}
            onInput={(event) => setValue(event.currentTarget.value)}
            value={value}
          />
          <button
            aria-label={`Save having filter ${entry.field}`}
            onClick={() => {
              onSave(field, aggregate, operator, value)
              onEditToggle()
            }}
            type='button'
          >
            Save
          </button>
        </div>
      ) : null}
    </li>
  )
}
