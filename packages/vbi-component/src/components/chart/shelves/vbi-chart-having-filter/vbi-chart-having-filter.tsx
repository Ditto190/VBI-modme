import { Component, Element, Event, type EventEmitter, Host, Prop, State, Watch, h } from '@stencil/core'
import { type ChartStore } from 'src/store/chart'
import { connectChartStore } from 'src/store/context'
import { getFieldRoleBySchemaType } from 'src/utils/data/fieldRole'
import {
  getHavingAggregateOptionsByFieldRole,
  getHavingFilterInputStrategy,
  getHavingOperatorOptions,
  isHavingNumericAggregate,
  normalizeHavingAggregate,
  normalizeHavingOperator,
  normalizeHavingRangeValue,
  serializeHavingFilterValue,
  toHavingAggregate,
  type HavingFilterLike,
} from '../vbi-chart-having/helpers/having-utils'

@Component({
  tag: 'vbi-chart-having-filter',
  styleUrl: 'vbi-chart-having-filter.css',
  shadow: true,
})
export class VbiChartHavingFilter {
  @Element() el!: HTMLElement

  @Prop() item!: HavingFilterLike
  @Prop() fieldTypeMap: Record<string, string> = {}
  @Prop() fieldRoleMap?: Record<string, string> = {}

  @State() store?: ChartStore
  @State() currentItem?: HavingFilterLike

  @Event() vbiChartHavingFilterSave!: EventEmitter<{ item: HavingFilterLike; event?: MouseEvent }>
  @Event() vbiChartHavingFilterCancel!: EventEmitter<MouseEvent | undefined>

  private get t() {
    return this.store?.translation.state.t || ((k: string) => k)
  }

  connectedCallback() {
    this.store = connectChartStore(this.el)
  }

  @Watch('item')
  onItemChanged(newItem: HavingFilterLike) {
    this.currentItem = newItem ? { ...newItem } : undefined
  }

  componentWillLoad() {
    this.currentItem = this.item ? { ...this.item } : undefined
  }

  private getFieldRole(fieldName?: string) {
    const field = fieldName || (this.currentItem || this.item)?.field
    if (!field) return 'measure'
    if (this.fieldRoleMap && this.fieldRoleMap[field]) {
      return this.fieldRoleMap[field] as 'dimension' | 'measure'
    }
    const schemaType = this.fieldTypeMap[field]
    return getFieldRoleBySchemaType(schemaType)
  }

  private handleAggregateChange = (nextFunc: string) => {
    const role = this.getFieldRole()
    const nextAggregate = normalizeHavingAggregate(toHavingAggregate(nextFunc), role)
    if (this.item) {
      this.item.aggregate = nextAggregate
    }
    if (this.currentItem) {
      this.currentItem = {
        ...this.currentItem,
        aggregate: nextAggregate,
      }
    }
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
      const role = this.getFieldRole(itemToSave.field)
      const aggregate = normalizeHavingAggregate(itemToSave.aggregate, role)
      const isNumeric = isHavingNumericAggregate(role, aggregate)
      const value = serializeHavingFilterValue({
        operator: itemToSave.operator || itemToSave.op,
        isNumericValue: isNumeric,
        value: itemToSave.value,
      })

      this.vbiChartHavingFilterSave.emit({
        item: {
          ...itemToSave,
          aggregate,
          value,
        },
        event: e,
      })
    }
  }

  private handleCancelClick = (e: MouseEvent) => {
    this.vbiChartHavingFilterCancel.emit(e)
  }

  private renderValueControls(item: HavingFilterLike, operator: string, isNumeric: boolean) {
    const strategy = getHavingFilterInputStrategy(operator, isNumeric)

    if (strategy === 'none') {
      return null
    }

    if (strategy === 'range') {
      const rangeVal = normalizeHavingRangeValue(item.value)
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

    const role = this.getFieldRole(item.field)
    const aggregate = normalizeHavingAggregate(item.aggregate, role)
    const operator = normalizeHavingOperator(item.operator || item.op)
    const isNumeric = isHavingNumericAggregate(role, aggregate)

    const aggregateOptions = getHavingAggregateOptionsByFieldRole(role, this.t)
    const operatorOptions = getHavingOperatorOptions(isNumeric, this.t)

    return (
      <Host>
        <div
          class='panel'
          onClick={(event: MouseEvent) => event.stopPropagation()}
          onKeyDown={(event: KeyboardEvent) => event.stopPropagation()}
        >
          <div class='title'>{item.field}</div>

          <div class='row'>
            <vbi-select
              size='sm'
              value={aggregate.func}
              options={aggregateOptions}
              onVbiSelectChange={(e: CustomEvent<string>) => this.handleAggregateChange(e.detail)}
              class='control'
            />
          </div>

          <div class='row'>
            <vbi-select
              size='sm'
              value={operator}
              options={operatorOptions}
              onVbiSelectChange={(e: CustomEvent<string>) => this.handleOperatorChange(e.detail)}
              class='control'
            />
          </div>

          {this.renderValueControls(item, operator, isNumeric)}

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
