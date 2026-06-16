import { html, nothing, type TemplateResult } from 'lit'
import { property, state } from 'lit/decorators.js'
import { customElement, VdashElement } from 'src/shared/element'
import { translateVBIComponentText as t } from 'src/localization'
import { vbiChartFilterStyle } from './vbi-chart-filter.style'
import type { VBIChartField, VBIChartFilterItem, HavingFilterItem } from './types'

// Utils
import { getFieldRoleBySchemaType, isDateSchemaType } from './utils/measure-aggregate-utils'
import {
  getWhereOperatorOptions,
  getDefaultWhereOperator,
  getWhereFilterInputStrategy,
  getWhereDisplayText,
  getWhereFilterFormValue,
  serializeWhereFilterValue,
} from './utils/where-filter-utils'
import {
  getHavingAggregateOptionGroupsByFieldRole,
  getHavingOperatorOptions,
  getDefaultHavingOperator,
  getDefaultHavingAggregateByFieldRole,
  isHavingNumericAggregate,
  getHavingFilterInputStrategy,
  getHavingDisplayText,
  toHavingAggregate,
  getHavingFilterFormValue,
  serializeHavingFilterValue,
} from './utils/having-filter-utils'
import { getDefaultDatePredicate } from './utils/date-filter-utils'

// Web Awesome & Subcomponents
import '@awesome.me/webawesome/dist/components/button/button.js'
import '@awesome.me/webawesome/dist/components/icon/icon.js'
import '@awesome.me/webawesome/dist/components/select/select.js'
import '@awesome.me/webawesome/dist/components/option/option.js'
import '@awesome.me/webawesome/dist/components/input/input.js'
import '@awesome.me/webawesome/dist/components/dropdown/dropdown.js'

import '@awesome.me/webawesome/dist/components/button-group/button-group.js'
import './components/date-filter-editor'

@customElement('vbi-chart-filter')
export class VBIChartFilter extends VdashElement {
  static override styles = [vbiChartFilterStyle]

  @property({ type: String, reflect: true }) accessor type: 'where' | 'having' = 'where'
  @property({ attribute: false }) accessor fields: VBIChartField[] = []
  @property({ attribute: false }) accessor filters: (VBIChartFilterItem | HavingFilterItem)[] = []
  @property({ type: String }) accessor rootOperator: 'and' | 'or' = 'and'

  // Internal state for the dropdown form
  @state() private accessor _isDropdownOpen = false
  @state() private accessor _editingItemIndex: number = -1

  // Form fields
  @state() private accessor _formField: string = ''
  @state() private accessor _formAggregate: string = ''
  @state() private accessor _formOperator: string = ''
  @state() private accessor _formValue: unknown = undefined
  @state() private accessor _formRangeMin: unknown = undefined
  @state() private accessor _formRangeMax: unknown = undefined

  private _dispatchChange(action: 'add' | 'remove' | 'update' | 'clear', changedItem?: any, filters?: any[]) {
    this.dispatchEvent(
      new CustomEvent('vbi-filter-change', {
        detail: { filters: filters ?? this.filters, action, changedItem },
      }),
    )
  }

  private _dispatchOperatorChange(operator: 'and' | 'or') {
    this.dispatchEvent(
      new CustomEvent('vbi-filter-operator-change', {
        detail: { operator },
      }),
    )
  }

  private _handleRootOperatorToggle() {
    this._dispatchOperatorChange(this.rootOperator === 'and' ? 'or' : 'and')
  }

  private _handleClearAll() {
    this._dispatchChange('clear', undefined, [])
  }

  private _handleRemove(index: number) {
    const item = this.filters[index]
    const newFilters = [...this.filters]
    newFilters.splice(index, 1)
    this._dispatchChange('remove', item, newFilters)
  }

  private _openForm(index: number = -1) {
    this._editingItemIndex = index
    if (index >= 0) {
      const item = this.filters[index]
      this._formField = item.field
      this._formOperator = item.operator

      if (this.type === 'having') {
        const hItem = item as HavingFilterItem
        this._formAggregate = hItem.aggregate.func
        const isNumeric = isHavingNumericAggregate(
          getFieldRoleBySchemaType(this._getField(this._formField)?.type),
          hItem.aggregate,
        )
        const strategy = getHavingFilterInputStrategy(this._formOperator, isNumeric)
        const val = getHavingFilterFormValue(this._formOperator, item.value)
        if (strategy === 'range' && val) {
          this._formRangeMin = (val as any).min
          this._formRangeMax = (val as any).max
        } else {
          this._formValue = val
        }
      } else {
        const field = this._getField(this._formField)
        const role = getFieldRoleBySchemaType(field?.type)
        const strategy = getWhereFilterInputStrategy(this._formOperator, role)
        const val = getWhereFilterFormValue(this._formOperator, item.value)
        if (strategy === 'range' && val) {
          this._formRangeMin = (val as any).min
          this._formRangeMax = (val as any).max
        } else {
          this._formValue = val
        }
      }
    } else {
      this._formField = ''
      this._formAggregate = ''
      this._formOperator = ''
      this._formValue = undefined
      this._formRangeMin = undefined
      this._formRangeMax = undefined
    }
    this._isDropdownOpen = true
  }

  private _closeForm() {
    this._isDropdownOpen = false
    this._editingItemIndex = -1
  }

  private _getField(name: string) {
    return this.fields.find((f) => f.name === name)
  }

  private _handleFieldChange(e: Event) {
    const fieldName = (e.target as HTMLSelectElement).value
    this._formField = fieldName
    const field = this._getField(fieldName)
    if (!field) return

    const role = getFieldRoleBySchemaType(field.type)

    if (this.type === 'having') {
      const agg = getDefaultHavingAggregateByFieldRole(role)
      this._formAggregate = agg.func
      const isNumeric = isHavingNumericAggregate(role, agg)
      this._formOperator = getDefaultHavingOperator(isNumeric)
    } else {
      if (isDateSchemaType(field.type)) {
        this._formOperator = 'date'
        this._formValue = getDefaultDatePredicate()
      } else {
        this._formOperator = getDefaultWhereOperator(role)
      }
    }
    this._formValue = undefined
    this._formRangeMin = undefined
    this._formRangeMax = undefined
  }

  private _handleHavingAggregateChange(e: Event) {
    this._formAggregate = (e.target as HTMLSelectElement).value
    const field = this._getField(this._formField)
    if (!field) return
    const role = getFieldRoleBySchemaType(field.type)
    const isNumeric = isHavingNumericAggregate(role, toHavingAggregate(this._formAggregate))
    this._formOperator = getDefaultHavingOperator(isNumeric)
    this._formValue = undefined
    this._formRangeMin = undefined
    this._formRangeMax = undefined
  }

  private _handleOperatorChange(e: Event) {
    this._formOperator = (e.target as HTMLSelectElement).value
    this._formValue = undefined
    this._formRangeMin = undefined
    this._formRangeMax = undefined
  }

  private _handleSave() {
    if (!this._formField || !this._formOperator) return

    const field = this._getField(this._formField)
    if (!field) return
    const role = getFieldRoleBySchemaType(field.type)

    let finalValue: unknown = this._formValue
    let newItem: any

    if (this.type === 'having') {
      const agg = toHavingAggregate(this._formAggregate)
      const isNumeric = isHavingNumericAggregate(role, agg)
      const strategy = getHavingFilterInputStrategy(this._formOperator, isNumeric)

      if (strategy === 'range') {
        finalValue = serializeHavingFilterValue({
          operator: this._formOperator,
          isNumericValue: isNumeric,
          value: { min: this._formRangeMin, max: this._formRangeMax },
        })
      } else {
        finalValue = serializeHavingFilterValue({
          operator: this._formOperator,
          isNumericValue: isNumeric,
          value: this._formValue,
        })
      }

      newItem = {
        id: this._editingItemIndex >= 0 ? this.filters[this._editingItemIndex].id : crypto.randomUUID(),
        field: this._formField,
        aggregate: agg,
        operator: this._formOperator,
        value: finalValue,
      } as HavingFilterItem
    } else {
      const strategy = getWhereFilterInputStrategy(this._formOperator, role)

      if (this._formOperator === 'date') {
        finalValue = this._formValue
      } else if (strategy === 'range') {
        finalValue = serializeWhereFilterValue({
          operator: this._formOperator,
          fieldRole: role,
          value: { min: this._formRangeMin, max: this._formRangeMax },
        })
      } else {
        finalValue = serializeWhereFilterValue({
          operator: this._formOperator,
          fieldRole: role,
          value: this._formValue,
        })
      }

      newItem = {
        id: this._editingItemIndex >= 0 ? this.filters[this._editingItemIndex].id : crypto.randomUUID(),
        field: this._formField,
        operator: this._formOperator,
        value: finalValue,
      } as VBIChartFilterItem
    }

    const newFilters = [...this.filters]
    if (this._editingItemIndex >= 0) {
      newFilters[this._editingItemIndex] = newItem
      this._dispatchChange('update', newItem, newFilters)
    } else {
      newFilters.push(newItem)
      this._dispatchChange('add', newItem, newFilters)
    }

    this._closeForm()
  }

  private _renderWhereForm() {
    const field = this._getField(this._formField)
    const role = field ? getFieldRoleBySchemaType(field.type) : 'dimension'
    const isDate = field && isDateSchemaType(field.type)

    const opOptions = field ? getWhereOperatorOptions(role) : []
    const strategy = getWhereFilterInputStrategy(this._formOperator, role)

    let valueInput: TemplateResult | symbol = nothing
    if (this._formOperator === 'date') {
      valueInput = html`<vbi-date-filter-editor
        .value=${this._formValue as any}
        @change=${(e: CustomEvent) => (this._formValue = e.detail)}
      ></vbi-date-filter-editor>`
    } else if (strategy === 'range') {
      valueInput = html`
        <div class="form-row-horizontal">
          <wa-input
            size="small"
            type=${role === 'measure' ? 'number' : 'text'}
            placeholder=${t('filterFormMin')}
            .value=${String(this._formRangeMin ?? '')}
            @wa-input=${(e: any) => (this._formRangeMin = e.target.value)}
          ></wa-input>
          <span>-</span>
          <wa-input
            size="small"
            type=${role === 'measure' ? 'number' : 'text'}
            placeholder=${t('filterFormMax')}
            .value=${String(this._formRangeMax ?? '')}
            @wa-input=${(e: any) => (this._formRangeMax = e.target.value)}
          ></wa-input>
        </div>
      `
    } else if (strategy === 'number') {
      valueInput = html`<wa-input
        size="small"
        type="number"
        placeholder=${t('filterFormInputNumber')}
        .value=${String(this._formValue ?? '')}
        @wa-input=${(e: any) => (this._formValue = e.target.value)}
      ></wa-input>`
    } else if (strategy === 'text' || strategy === 'tags') {
      const placeholder = strategy === 'tags' ? t('filterFormInputValues') : t('filterFormInputValue')
      valueInput = html`<wa-input
        size="small"
        placeholder=${placeholder}
        .value=${Array.isArray(this._formValue) ? this._formValue.join(', ') : String(this._formValue ?? '')}
        @wa-input=${(e: any) => (this._formValue = e.target.value)}
      ></wa-input>`
    } else if (strategy === 'none') {
      valueInput = html`<div class="form-label">${t('filterFormNoValueRequired')}</div>`
    }

    return html`
      ${field && !isDate
        ? html`
            <div class="form-row">
              <div class="form-label">${t('filterFormOperator')}</div>
              <wa-select size="small" .value=${this._formOperator} @wa-change=${this._handleOperatorChange}>
                ${opOptions.map((op) => html`<wa-option value=${op.value}>${op.label}</wa-option>`)}
              </wa-select>
            </div>
          `
        : nothing}
      ${field
        ? html`
            <div class="form-row">
              <div class="form-label">${t('filterFormValue')}</div>
              ${valueInput}
            </div>
          `
        : nothing}
    `
  }

  private _renderHavingForm() {
    const field = this._getField(this._formField)
    const role = field ? getFieldRoleBySchemaType(field.type) : 'dimension'
    const aggGroups = field ? getHavingAggregateOptionGroupsByFieldRole(role) : []

    const isNumeric = isHavingNumericAggregate(role, toHavingAggregate(this._formAggregate))
    const opOptions = field ? getHavingOperatorOptions(isNumeric) : []
    const strategy = getHavingFilterInputStrategy(this._formOperator, isNumeric)

    let valueInput: TemplateResult | symbol = nothing
    if (strategy === 'range') {
      valueInput = html`
        <div class="form-row-horizontal">
          <wa-input
            size="small"
            type=${isNumeric ? 'number' : 'text'}
            placeholder=${t('filterFormMin')}
            .value=${String(this._formRangeMin ?? '')}
            @wa-input=${(e: any) => (this._formRangeMin = e.target.value)}
          ></wa-input>
          <span>-</span>
          <wa-input
            size="small"
            type=${isNumeric ? 'number' : 'text'}
            placeholder=${t('filterFormMax')}
            .value=${String(this._formRangeMax ?? '')}
            @wa-input=${(e: any) => (this._formRangeMax = e.target.value)}
          ></wa-input>
        </div>
      `
    } else if (strategy === 'number') {
      valueInput = html`<wa-input
        size="small"
        type="number"
        placeholder=${t('filterFormInputNumber')}
        .value=${String(this._formValue ?? '')}
        @wa-input=${(e: any) => (this._formValue = e.target.value)}
      ></wa-input>`
    } else if (strategy === 'text' || strategy === 'tags') {
      const placeholder = strategy === 'tags' ? t('filterFormInputValues') : t('filterFormInputValue')
      valueInput = html`<wa-input
        size="small"
        placeholder=${placeholder}
        .value=${Array.isArray(this._formValue) ? this._formValue.join(', ') : String(this._formValue ?? '')}
        @wa-input=${(e: any) => (this._formValue = e.target.value)}
      ></wa-input>`
    } else if (strategy === 'none') {
      valueInput = html`<div class="form-label">${t('filterFormNoValueRequired')}</div>`
    }

    return html`
      ${field
        ? html`
            <div class="form-row">
              <div class="form-label">${t('filterFormAggregate')}</div>
              <wa-select size="small" .value=${this._formAggregate} @wa-change=${this._handleHavingAggregateChange}>
                ${aggGroups.map(
                  (group) => html`
                    <wa-option disabled>── ${group.label} ──</wa-option>
                    ${group.options.map((op) => html`<wa-option value=${op.value}>${op.label}</wa-option>`)}
                  `,
                )}
              </wa-select>
            </div>
            <div class="form-row">
              <div class="form-label">${t('filterFormOperator')}</div>
              <wa-select size="small" .value=${this._formOperator} @wa-change=${this._handleOperatorChange}>
                ${opOptions.map((op) => html`<wa-option value=${op.value}>${op.label}</wa-option>`)}
              </wa-select>
            </div>
            <div class="form-row">
              <div class="form-label">${t('filterFormValue')}</div>
              ${valueInput}
            </div>
          `
        : nothing}
    `
  }

  private _renderForm() {
    return html`
      <div class="filter-form">
        <div class="form-row">
          <div class="form-label">${t('filterFormField')}</div>
          <wa-select
            size="small"
            placeholder=${t('filterFormSelectField')}
            .value=${this._formField}
            @wa-change=${this._handleFieldChange}
          >
            ${this.fields.map((f) => html`<wa-option value=${f.name}>${f.name}</wa-option>`)}
          </wa-select>
        </div>

        ${this.type === 'having' ? this._renderHavingForm() : this._renderWhereForm()}

        <div class="form-actions">
          <wa-button size="small" variant="neutral" @click=${this._closeForm}>${t('filterCancel')}</wa-button>
          <wa-button
            size="small"
            variant="brand"
            ?disabled=${!this._formField || !this._formOperator}
            @click=${this._handleSave}
            >${t('filterSave')}</wa-button
          >
        </div>
      </div>
    `
  }

  override render() {
    return html`
      <div class="filter-panel">
        <div class="filter-header">
          <div class="filter-title">${this.type === 'where' ? t('filterTitle') : t('havingTitle')}</div>
          <div class="filter-actions">
            ${this.filters.length > 0
              ? html`
                  <wa-button
                    size="small"
                    variant="text"
                    @click=${this._handleClearAll}
                    title=${t('filterClearTooltip')}
                  >
                    <wa-icon name="trash"></wa-icon>
                  </wa-button>
                `
              : nothing}
            <wa-dropdown ?open=${this._isDropdownOpen} @wa-after-hide=${() => this._closeForm()} distance="4">
              <wa-button
                slot="trigger"
                size="small"
                variant="text"
                @click=${() => this._openForm(-1)}
                title=${t('filterAddTooltip')}
              >
                <wa-icon name="plus"></wa-icon>
              </wa-button>
              <div slot="content" @click=${(e: Event) => e.stopPropagation()}>${this._renderForm()}</div>
            </wa-dropdown>
          </div>
        </div>

        ${this.filters.length > 1
          ? html`
              <div class="operator-toggle">
                <wa-button-group>
                  <wa-button
                    size="small"
                    variant=${this.rootOperator === 'and' ? 'brand' : 'neutral'}
                    @click=${() => this.rootOperator !== 'and' && this._handleRootOperatorToggle()}
                    >${t('filterRootAnd')}</wa-button
                  >
                  <wa-button
                    size="small"
                    variant=${this.rootOperator === 'or' ? 'brand' : 'neutral'}
                    @click=${() => this.rootOperator !== 'or' && this._handleRootOperatorToggle()}
                    >${t('filterRootOr')}</wa-button
                  >
                </wa-button-group>
              </div>
            `
          : nothing}

        <div class="filter-list">
          ${this.filters.length === 0
            ? html` <div class="filter-empty">${t('filterEmptyText')}</div> `
            : this.filters.map(
                (item, index) => html`
                  <div class="filter-item">
                    <div class="filter-item-content" @click=${() => this._openForm(index)}>
                      <div class="filter-item-text">
                        ${this.type === 'where' ? getWhereDisplayText(item as any) : getHavingDisplayText(item as any)}
                      </div>
                    </div>
                    <div class="filter-item-remove" @click=${() => this._handleRemove(index)}>
                      <wa-icon name="x"></wa-icon>
                    </div>
                  </div>
                `,
              )}
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vbi-chart-filter': VBIChartFilter
  }
}
