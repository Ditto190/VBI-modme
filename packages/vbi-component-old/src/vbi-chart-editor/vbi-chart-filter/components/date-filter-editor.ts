import { html, css } from 'lit'
import { property } from 'lit/decorators.js'
import { customElement, VdashElement } from 'src/shared/element'
import type { VBIWhereDatePredicate } from '@visactor/vbi'
import { translateVBIComponentText as t } from 'src/localization'
import { getDefaultDatePredicate } from '../utils/date-filter-utils'
import '@awesome.me/webawesome/dist/components/select/select.js'
import '@awesome.me/webawesome/dist/components/option/option.js'
import '@awesome.me/webawesome/dist/components/input/input.js'
import dayjs from 'dayjs'

const DATE_TYPES = ['range', 'relative', 'current', 'period'] as const
const DATE_UNITS = ['year', 'quarter', 'month', 'week', 'day'] as const
const RELATIVE_MODES = ['last', 'next'] as const

@customElement('vbi-date-filter-editor')
export class VBIDateFilterEditor extends VdashElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .flex-row {
      display: flex;
      gap: 6px;
      width: 100%;
      flex-wrap: wrap;
    }
    wa-select {
      flex: 1;
      min-width: 0;
    }
    wa-input {
      flex: 1;
      min-width: 0;
    }
  `

  @property({ attribute: false }) accessor value: VBIWhereDatePredicate | undefined

  private get _predicate() {
    return this.value ?? getDefaultDatePredicate()
  }

  private _onChange(predicate: VBIWhereDatePredicate) {
    this.dispatchEvent(new CustomEvent('change', { detail: predicate }))
  }

  private _handleTypeChange(e: Event) {
    const select = e.target as HTMLSelectElement
    const type = select.value
    switch (type) {
      case 'range':
        this._onChange({ type: 'range', start: '', end: '' })
        break
      case 'relative':
        this._onChange({ type: 'relative', mode: 'last', amount: 7, unit: 'day' })
        break
      case 'current':
        this._onChange({ type: 'current', unit: 'day' })
        break
      case 'period':
        this._onChange({ type: 'period', unit: 'year', year: new Date().getFullYear() })
        break
    }
  }

  private _renderRange() {
    const p = this._predicate as Extract<VBIWhereDatePredicate, { type: 'range' }>
    return html`
      <div class="flex-row">
        <wa-input
          type="date"
          size="small"
          .value=${p.start ? dayjs(p.start as string).format('YYYY-MM-DD') : ''}
          @wa-change=${(e: any) => this._onChange({ ...p, start: e.target.value })}
        ></wa-input>
        <span style="display: flex; align-items: center;">-</span>
        <wa-input
          type="date"
          size="small"
          .value=${p.end ? dayjs(p.end as string).format('YYYY-MM-DD') : ''}
          @wa-change=${(e: any) => this._onChange({ ...p, end: e.target.value })}
        ></wa-input>
      </div>
    `
  }

  private _renderRelative() {
    const p = this._predicate as Extract<VBIWhereDatePredicate, { type: 'relative' }>
    return html`
      <div class="flex-row">
        <wa-select
          size="small"
          .value=${p.mode}
          @wa-change=${(e: any) => this._onChange({ ...p, mode: e.target.value })}
        >
          ${RELATIVE_MODES.map(
            (m) =>
              html`<wa-option value=${m}>${t(m === 'last' ? 'filterDateModeLast' : 'filterDateModeNext')}</wa-option>`,
          )}
        </wa-select>
        <wa-input
          type="number"
          size="small"
          min="1"
          .value=${String(p.amount)}
          @wa-change=${(e: any) => this._onChange({ ...p, amount: Number(e.target.value) })}
        ></wa-input>
        <wa-select
          size="small"
          .value=${p.unit}
          @wa-change=${(e: any) => this._onChange({ ...p, unit: e.target.value })}
        >
          ${DATE_UNITS.map(
            (u) =>
              html`<wa-option value=${u}>${t(`filterDateUnit${u.charAt(0).toUpperCase()}${u.slice(1)}`)}</wa-option>`,
          )}
        </wa-select>
      </div>
    `
  }

  private _renderCurrent() {
    const p = this._predicate as Extract<VBIWhereDatePredicate, { type: 'current' }>
    return html`
      <div class="flex-row">
        <wa-select
          size="small"
          .value=${p.unit}
          @wa-change=${(e: any) => this._onChange({ ...p, unit: e.target.value })}
        >
          ${DATE_UNITS.map(
            (u) =>
              html`<wa-option value=${u}>${t(`filterDateUnit${u.charAt(0).toUpperCase()}${u.slice(1)}`)}</wa-option>`,
          )}
        </wa-select>
        <wa-input
          type="number"
          size="small"
          .value=${String(p.offset ?? 0)}
          @wa-change=${(e: any) => this._onChange({ ...p, offset: Number(e.target.value) })}
        ></wa-input>
      </div>
    `
  }

  private _renderPeriod() {
    const p = this._predicate as Extract<VBIWhereDatePredicate, { type: 'period' }>
    let inputHtml
    switch (p.unit) {
      case 'year':
        inputHtml = html`<wa-input
          type="number"
          size="small"
          .value=${String(p.year)}
          @wa-change=${(e: any) => this._onChange({ ...p, year: Number(e.target.value) })}
        ></wa-input>`
        break
      case 'quarter':
        inputHtml = html`
          <wa-input
            type="number"
            size="small"
            placeholder="Year"
            .value=${String(p.year)}
            @wa-change=${(e: any) => this._onChange({ ...p, year: Number(e.target.value) })}
          ></wa-input>
          <wa-select
            size="small"
            .value=${String(p.quarter)}
            @wa-change=${(e: any) => this._onChange({ ...p, quarter: Number(e.target.value) as 1 | 2 | 3 | 4 })}
          >
            <wa-option value="1">Q1</wa-option><wa-option value="2">Q2</wa-option><wa-option value="3">Q3</wa-option
            ><wa-option value="4">Q4</wa-option>
          </wa-select>
        `
        break
      case 'month':
        inputHtml = html`<wa-input
          type="month"
          size="small"
          .value=${`${p.year}-${String(p.month).padStart(2, '0')}`}
          @wa-change=${(e: any) => {
            const [y, m] = e.target.value.split('-')
            if (y && m) this._onChange({ ...p, year: Number(y), month: Number(m) })
          }}
        ></wa-input>`
        break
      case 'week':
        inputHtml = html`<wa-input
          type="week"
          size="small"
          .value=${`${p.year}-W${String(p.week).padStart(2, '0')}`}
          @wa-change=${(e: any) => {
            const [y, w] = e.target.value.split('-W')
            if (y && w) this._onChange({ ...p, year: Number(y), week: Number(w) })
          }}
        ></wa-input>`
        break
      case 'day':
        inputHtml = html`<wa-input
          type="date"
          size="small"
          .value=${p.date ? dayjs(p.date as string).format('YYYY-MM-DD') : ''}
          @wa-change=${(e: any) => this._onChange({ ...p, date: e.target.value })}
        ></wa-input>`
        break
    }

    return html`
      <div class="flex-row">
        <wa-select
          size="small"
          .value=${p.unit}
          @wa-change=${(e: any) => {
            const unit = e.target.value
            const y = new Date().getFullYear()
            switch (unit) {
              case 'year':
                this._onChange({ type: 'period', unit, year: y })
                break
              case 'quarter':
                this._onChange({ type: 'period', unit, year: y, quarter: 1 })
                break
              case 'month':
                this._onChange({ type: 'period', unit, year: y, month: 1 })
                break
              case 'week':
                this._onChange({ type: 'period', unit, year: y, week: 1 })
                break
              case 'day':
                this._onChange({ type: 'period', unit, date: '' })
                break
            }
          }}
        >
          ${DATE_UNITS.map(
            (u) =>
              html`<wa-option value=${u}>${t(`filterDateUnit${u.charAt(0).toUpperCase()}${u.slice(1)}`)}</wa-option>`,
          )}
        </wa-select>
        ${inputHtml}
      </div>
    `
  }

  override render() {
    const p = this._predicate
    return html`
      <wa-select size="small" .value=${p.type} @wa-change=${this._handleTypeChange}>
        ${DATE_TYPES.map(
          (type) =>
            html`<wa-option value=${type}
              >${t(`filterDateType${type.charAt(0).toUpperCase()}${type.slice(1)}`)}</wa-option
            >`,
        )}
      </wa-select>
      ${p.type === 'range' ? this._renderRange() : ''} ${p.type === 'relative' ? this._renderRelative() : ''}
      ${p.type === 'current' ? this._renderCurrent() : ''} ${p.type === 'period' ? this._renderPeriod() : ''}
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vbi-date-filter-editor': VBIDateFilterEditor
  }
}
