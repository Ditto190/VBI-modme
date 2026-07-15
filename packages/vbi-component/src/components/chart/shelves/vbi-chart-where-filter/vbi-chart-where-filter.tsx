import { Component, Element, Event, type EventEmitter, Host, Prop, State, Watch, h } from '@stencil/core'
import { type ChartStore } from 'src/store/chart'
import { connectChartStore } from 'src/store/context'
import type { VBIWhereDatePredicate } from '@visactor/vbi'
import {
  getWhereFilterInputStrategy,
  getWhereOperatorOptions,
  normalizeWhereOperator,
  normalizeWhereRangeValue,
  type WhereFilterLike,
} from '../vbi-chart-where/helpers/where-utils'

const DATE_MODES = [
  { label: 'Relative', value: 'relative' },
  { label: 'Range', value: 'range' },
  { label: 'Current', value: 'current' },
  { label: 'Period', value: 'period' },
]

const DATE_UNITS = ['year', 'quarter', 'month', 'week', 'day']

@Component({
  tag: 'vbi-chart-where-filter',
  styleUrl: 'vbi-chart-where-filter.css',
  shadow: true,
})
export class VbiChartWhereFilter {
  @Element() el!: HTMLElement

  @Prop() item!: WhereFilterLike
  @Prop() fieldTypeMap: Record<string, string> = {}
  @Prop() fieldRoleMap?: Record<string, string> = {}

  @State() store?: ChartStore
  @State() currentItem?: WhereFilterLike

  @Event() vbiChartWhereFilterSave!: EventEmitter<{ item: WhereFilterLike; event?: MouseEvent }>
  @Event() vbiChartWhereFilterCancel!: EventEmitter<MouseEvent | undefined>

  private get t() {
    return this.store?.translation.state.t || ((k: string) => k)
  }

  connectedCallback() {
    this.store = connectChartStore(this.el)
  }

  @Watch('item')
  onItemChanged(newItem: WhereFilterLike) {
    this.currentItem = newItem ? { ...newItem } : undefined
  }

  componentWillLoad() {
    this.currentItem = this.item ? { ...this.item } : undefined
  }

  private handleOperatorChange = (nextOp: string) => {
    if (this.item) {
      this.item.operator = nextOp
    }
    if (this.currentItem) {
      this.currentItem = {
        ...this.currentItem,
        operator: nextOp,
      }
    }
  }

  private handleValueChange = (nextVal: unknown) => {
    if (this.item) {
      this.item.value = nextVal
    }
    if (this.currentItem) {
      this.currentItem = {
        ...this.currentItem,
        value: nextVal,
      }
    }
  }

  private handleSaveClick = (e: MouseEvent) => {
    const itemToSave = this.item || this.currentItem
    if (itemToSave) {
      this.vbiChartWhereFilterSave.emit({ item: itemToSave, event: e })
    }
  }

  private handleCancelClick = (e: MouseEvent) => {
    this.vbiChartWhereFilterCancel.emit(e)
  }

  private renderDateControls(item: WhereFilterLike) {
    const predicate = (
      item.value && typeof item.value === 'object'
        ? item.value
        : { type: 'relative', mode: 'last', amount: 7, unit: 'day' }
    ) as VBIWhereDatePredicate

    const handleDateTypeChange = (type: string) => {
      let nextPred: VBIWhereDatePredicate
      switch (type) {
        case 'range':
          nextPred = { type: 'range', start: '', end: '' }
          break
        case 'current':
          nextPred = { type: 'current', unit: 'day', offset: 0 }
          break
        case 'period':
          nextPred = { type: 'period', unit: 'year', year: new Date().getFullYear() }
          break
        default:
          nextPred = { type: 'relative', mode: 'last', amount: 7, unit: 'day' }
      }
      this.handleValueChange(nextPred)
    }

    const handlePeriodUnitChange = (unit: string) => {
      const currentYear = new Date().getFullYear()
      switch (unit) {
        case 'year':
          this.handleValueChange({ type: 'period', unit: 'year', year: currentYear })
          break
        case 'quarter':
          this.handleValueChange({ type: 'period', unit: 'quarter', year: currentYear, quarter: 1 })
          break
        case 'month':
          this.handleValueChange({ type: 'period', unit: 'month', year: currentYear, month: 1 })
          break
        case 'week':
          this.handleValueChange({ type: 'period', unit: 'week', year: currentYear, week: 1 })
          break
        case 'day':
          this.handleValueChange({ type: 'period', unit: 'day', date: '' })
          break
      }
    }

    const dateUnitOptions = DATE_UNITS.map((u) => ({
      label: this.t(`dateFilterUnit${u.charAt(0).toUpperCase()}${u.slice(1)}`),
      value: u,
    }))

    const dateModeOptions = DATE_MODES.map((m) => ({
      label: this.t(`dateFilterType${m.value.charAt(0).toUpperCase()}${m.value.slice(1)}`),
      value: m.value,
    }))

    return (
      <div class='date-controls'>
        <div class='row'>
          <vbi-select
            size='sm'
            value={predicate.type || 'relative'}
            options={dateModeOptions}
            onVbiSelectChange={(e: CustomEvent<string>) => handleDateTypeChange(e.detail)}
            class='control'
          />
        </div>

        {predicate.type === 'relative' && (
          <div class='date-controls'>
            <div class='row'>
              <vbi-select
                size='sm'
                value={predicate.mode || 'last'}
                options={[
                  { label: this.t('dateFilterModeLast'), value: 'last' },
                  { label: this.t('dateFilterModeNext'), value: 'next' },
                ]}
                onVbiSelectChange={(e: CustomEvent<string>) =>
                  this.handleValueChange({ ...predicate, mode: e.detail as 'last' | 'next' })
                }
                class='control'
              />
            </div>
            <div class='row'>
              <vbi-input
                type='number'
                size='sm'
                value={predicate.amount ?? 7}
                onVbiInputValue={(e: CustomEvent<string>) =>
                  this.handleValueChange({ ...predicate, amount: Number(e.detail) || 0 })
                }
                class='control'
              />
            </div>
            <div class='row'>
              <vbi-select
                size='sm'
                value={predicate.unit || 'day'}
                options={dateUnitOptions}
                onVbiSelectChange={(e: CustomEvent<string>) => this.handleValueChange({ ...predicate, unit: e.detail })}
                class='control'
              />
            </div>
          </div>
        )}

        {predicate.type === 'range' && (
          <div class='date-controls'>
            <div class='row'>
              <vbi-input
                type='date'
                size='sm'
                value={String(predicate.start || '')}
                onVbiInputValue={(e: CustomEvent<string>) => this.handleValueChange({ ...predicate, start: e.detail })}
                class='control'
              />
            </div>
            <div class='row'>
              <vbi-input
                type='date'
                size='sm'
                value={String(predicate.end || '')}
                onVbiInputValue={(e: CustomEvent<string>) => this.handleValueChange({ ...predicate, end: e.detail })}
                class='control'
              />
            </div>
          </div>
        )}

        {predicate.type === 'current' && (
          <div class='date-controls'>
            <div class='row'>
              <vbi-select
                size='sm'
                value={predicate.unit || 'day'}
                options={dateUnitOptions}
                onVbiSelectChange={(e: CustomEvent<string>) =>
                  this.handleValueChange({ ...predicate, unit: e.detail as any })
                }
                class='control'
              />
            </div>
            <div class='row'>
              <vbi-input
                type='number'
                size='sm'
                value={predicate.offset ?? 0}
                onVbiInputValue={(e: CustomEvent<string>) =>
                  this.handleValueChange({ ...predicate, offset: Number(e.detail) || 0 })
                }
                class='control'
              />
            </div>
          </div>
        )}

        {predicate.type === 'period' && (
          <div class='date-controls'>
            <div class='row'>
              <vbi-select
                size='sm'
                value={predicate.unit || 'year'}
                options={dateUnitOptions}
                onVbiSelectChange={(e: CustomEvent<string>) => handlePeriodUnitChange(e.detail)}
                class='control'
              />
            </div>
            {(predicate.unit === 'year' ||
              predicate.unit === 'quarter' ||
              predicate.unit === 'month' ||
              predicate.unit === 'week') && (
              <div class='row'>
                <vbi-input
                  type='number'
                  size='sm'
                  value={'year' in predicate ? predicate.year : new Date().getFullYear()}
                  onVbiInputValue={(e: CustomEvent<string>) =>
                    this.handleValueChange({ ...predicate, year: Number(e.detail) || new Date().getFullYear() })
                  }
                  class='control'
                />
              </div>
            )}
            {predicate.unit === 'quarter' && (
              <div class='row'>
                <vbi-select
                  size='sm'
                  value={String('quarter' in predicate ? predicate.quarter : 1)}
                  options={[
                    { label: 'Q1', value: '1' },
                    { label: 'Q2', value: '2' },
                    { label: 'Q3', value: '3' },
                    { label: 'Q4', value: '4' },
                  ]}
                  onVbiSelectChange={(e: CustomEvent<string>) =>
                    this.handleValueChange({ ...predicate, quarter: (Number(e.detail) || 1) as 1 | 2 | 3 | 4 })
                  }
                  class='control'
                />
              </div>
            )}
            {predicate.unit === 'month' && (
              <div class='row'>
                <vbi-select
                  size='sm'
                  value={String('month' in predicate ? predicate.month : 1)}
                  options={Array.from({ length: 12 }, (_, i) => i + 1).map((m) => ({
                    label: String(m),
                    value: String(m),
                  }))}
                  onVbiSelectChange={(e: CustomEvent<string>) =>
                    this.handleValueChange({ ...predicate, month: Number(e.detail) || 1 })
                  }
                  class='control'
                />
              </div>
            )}
            {predicate.unit === 'week' && (
              <div class='row'>
                <vbi-input
                  type='number'
                  size='sm'
                  value={'week' in predicate ? predicate.week : 1}
                  onVbiInputValue={(e: CustomEvent<string>) =>
                    this.handleValueChange({ ...predicate, week: Number(e.detail) || 1 })
                  }
                  class='control'
                />
              </div>
            )}
            {predicate.unit === 'day' && (
              <div class='row'>
                <vbi-input
                  type='date'
                  size='sm'
                  value={String('date' in predicate ? predicate.date || '' : '')}
                  onVbiInputValue={(e: CustomEvent<string>) => this.handleValueChange({ ...predicate, date: e.detail })}
                  class='control'
                />
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  private renderValueControls(item: WhereFilterLike, operator: string, role: string) {
    if (operator === 'date') {
      return this.renderDateControls(item)
    }

    const strategy = getWhereFilterInputStrategy(operator, role)

    if (strategy === 'none') {
      return null
    }

    if (strategy === 'range') {
      const rangeVal = normalizeWhereRangeValue(item.value)
      return (
        <div class='range-controls'>
          <div class='row'>
            <vbi-input
              size='sm'
              value={String(rangeVal.min ?? '')}
              onVbiInputValue={(e: CustomEvent<string>) =>
                this.handleValueChange({ ...rangeVal, min: e.detail || undefined })
              }
              placeholder={this.t('filtersFormMin')}
              class='control'
            />
          </div>
          <div class='row'>
            <vbi-input
              size='sm'
              value={String(rangeVal.max ?? '')}
              onVbiInputValue={(e: CustomEvent<string>) =>
                this.handleValueChange({ ...rangeVal, max: e.detail || undefined })
              }
              placeholder={this.t('filtersFormMax')}
              class='control'
            />
          </div>
        </div>
      )
    }

    const valueStr = Array.isArray(item.value) ? item.value.join(', ') : String(item.value ?? '')

    return (
      <div class='row'>
        <vbi-input
          type={strategy === 'number' ? 'number' : 'text'}
          size='sm'
          value={valueStr}
          placeholder={this.t('filtersFormInputValue')}
          onVbiInputValue={(e: CustomEvent<string>) => {
            const raw = e.detail
            if (strategy === 'tags') {
              this.handleValueChange(
                raw
                  .split(',')
                  .map((v) => v.trim())
                  .filter(Boolean),
              )
            } else if (strategy === 'number') {
              this.handleValueChange(raw === '' ? undefined : Number(raw))
            } else {
              this.handleValueChange(raw)
            }
          }}
          class='control'
        />
      </div>
    )
  }

  render() {
    const item = this.currentItem || this.item
    if (!item) return null

    const operator = normalizeWhereOperator(item.operator || item.op)
    const isDate = operator === 'date'
    const role =
      (this.fieldRoleMap && this.fieldRoleMap[item.field]) ||
      (this.fieldTypeMap[item.field] === 'number' ? 'measure' : 'dimension')
    const operatorOptions = getWhereOperatorOptions(role, this.t)

    return (
      <Host>
        <div
          class='panel'
          onClick={(event: MouseEvent) => event.stopPropagation()}
          onKeyDown={(event: KeyboardEvent) => event.stopPropagation()}
        >
          <div class='title'>{item.field}</div>

          {!isDate && (
            <div class='row'>
              <vbi-select
                size='sm'
                value={operator}
                options={operatorOptions}
                onVbiSelectChange={(e: CustomEvent<string>) => this.handleOperatorChange(e.detail)}
                class='control'
              />
            </div>
          )}

          {this.renderValueControls(item, operator, role)}

          <div class='actions'>
            <vbi-button size='sm' onClick={(e) => this.handleCancelClick(e)}>
              {this.t('commonActionsCancel')}
            </vbi-button>
            <vbi-button size='sm' color='primary' onClick={(e) => this.handleSaveClick(e)}>
              {this.t('commonActionsSave')}
            </vbi-button>
          </div>
        </div>
      </Host>
    )
  }
}
