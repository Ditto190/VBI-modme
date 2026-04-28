import { PlusOutlined } from '@ant-design/icons'
import type { VBIChartBuilder, VBIChartDSL } from '@visactor/vbi'
import { Popover, Select } from 'antd'
import { type DragEvent, useState } from 'react'
import type { StreamLabels } from 'src/config/labels'
import type { SchemaField } from 'src/types'
import { readDraggedField } from 'src/utils/dragDrop'
import {
  addStreamFilter,
  getStreamFilterConditions,
  removeStreamFilter,
  type StreamFilterCondition,
  type StreamFilterKind,
} from 'src/utils/filterActions'
import {
  getDefaultFilterOperator,
  getEmptyFilterValue,
  getFilterInputMode,
  getFilterOperatorOptions,
  serializeFilterValue,
  toFilterDraftValue,
  type FilterDraft,
} from 'src/utils/filterInput'
import { FilterEditor } from './FilterEditor'
import { FilterToken } from './FilterToken'

type FilterSlotProps = {
  builder: VBIChartBuilder
  dsl: VBIChartDSL
  fields: SchemaField[]
  kind: StreamFilterKind
  labels: StreamLabels
}

const createDraft = (kind: StreamFilterKind, field: SchemaField, condition?: StreamFilterCondition): FilterDraft => {
  const operator = condition?.op ?? getDefaultFilterOperator(kind, field)
  const mode = getFilterInputMode(operator, kind, field)
  return {
    aggregate: (condition?.aggregate?.func as FilterDraft['aggregate']) ?? 'sum',
    editingId: condition?.id,
    field,
    operator,
    value: condition ? toFilterDraftValue(condition.value, mode) : getEmptyFilterValue(mode),
  }
}

export const FilterSlot = ({ builder, dsl, fields, kind, labels }: FilterSlotProps) => {
  const [draft, setDraft] = useState<FilterDraft>()
  const [isOver, setIsOver] = useState(false)
  const conditions = getStreamFilterConditions(dsl, kind)
  const inputMode = getFilterInputMode(draft?.operator ?? '=', kind, draft?.field)

  const apply = () => {
    if (!draft) return
    if (draft.editingId) removeStreamFilter(builder, kind, draft.editingId)
    addStreamFilter({
      aggregate: draft.aggregate,
      builder,
      field: draft.field,
      kind,
      operator: draft.operator,
      value: serializeFilterValue(draft.value, inputMode),
    })
    setDraft(undefined)
  }
  const drop = (event: DragEvent) => {
    event.preventDefault()
    const field = readDraggedField(event, fields)
    if (field) setDraft(createDraft(kind, field))
    setIsOver(false)
  }

  return (
    <div className='stream-slot stream-filter-slot'>
      <div className='stream-slot__label'>{kind === 'where' ? labels.whereFilter : labels.havingFilter}</div>
      <Popover
        overlayClassName='stream-filter-popover'
        content={
          draft && (
            <FilterEditor
              aggregate={draft.aggregate}
              field={draft.field}
              inputMode={inputMode}
              kind={kind}
              labels={labels}
              operator={draft.operator}
              operatorOptions={getFilterOperatorOptions(labels, kind, draft.field)}
              value={draft.value}
              onAggregateChange={(aggregate) => setDraft({ ...draft, aggregate })}
              onApply={apply}
              onCancel={() => setDraft(undefined)}
              onOperatorChange={(operator) =>
                setDraft({
                  ...draft,
                  operator,
                  value: getEmptyFilterValue(getFilterInputMode(operator, kind, draft.field)),
                })
              }
              onValueChange={(value) => setDraft({ ...draft, value })}
            />
          )
        }
        open={Boolean(draft)}
        placement='right'
        trigger='click'
        onOpenChange={(open) => !open && setDraft(undefined)}
      >
        <div
          className='stream-slot__box'
          onDragLeave={() => setIsOver(false)}
          onDragOver={(event) => {
            event.preventDefault()
            setIsOver(true)
          }}
          onDrop={drop}
        >
          {conditions.map((item) => {
            const field = fields.find((entry) => entry.name === item.field)
            return (
              <FilterToken
                condition={item}
                field={field}
                key={item.id}
                kind={kind}
                labels={labels}
                onEdit={() => field && setDraft(createDraft(kind, field, item))}
                onRemove={() => removeStreamFilter(builder, kind, item.id)}
              />
            )
          })}
          {isOver && conditions.length === 0 && <div className='stream-slot__empty-drop'>{labels.dropHere}</div>}
          <Select
            className='stream-slot__add'
            placeholder={
              <span>
                <PlusOutlined /> {labels.addField}
              </span>
            }
            showSearch
            value={undefined}
            options={fields.map((field) => ({ label: field.name, value: field.name }))}
            onChange={(fieldName) => {
              const field = fields.find((item) => item.name === fieldName)
              if (field) setDraft(createDraft(kind, field))
            }}
          />
        </div>
      </Popover>
    </div>
  )
}
