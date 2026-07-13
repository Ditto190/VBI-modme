import { CloseOutlined, DownOutlined } from '@ant-design/icons-svg'
import { Component, Element, Host, State, h } from '@stencil/core'
import type Sortable from 'sortablejs'
import { type CascadingMenuItem } from 'src/components/ui/vbi-cascading-menu/vbi-cascading-menu'
import { type ChartStore } from 'src/store/chart'
import { type VBIMeasure as VBIMeasureStore } from 'src/store/chart/measures'
import { connectChartStore } from 'src/store/context'
import { renderMeasureFormatPanel } from '../common/measure-format-panel'
import { renderShelfRenameModal } from '../common/shelf-rename-modal'
import {
  buildMeasureMenuItems,
  changeAggregate,
  changeEncoding,
  changeFormat,
  changeSort,
  getMeasureDisplayLabel,
  handleMeasureMenuAction,
  initMeasureSortable,
  renameMeasure,
} from './helpers'

@Component({
  tag: 'vbi-chart-measure',
  styleUrl: 'vbi-chart-measure.css',
  shadow: true,
})
export class VbiChartMeasure {
  @Element() el!: HTMLElement

  @State() store?: ChartStore

  @State() renameTarget?: { id: string; alias: string }

  componentWillLoad() {
    this.store = connectChartStore(this.el)
  }

  componentDidRender() {
    this.initSortable()
  }

  disconnectedCallback() {
    this.sortable?.destroy()
  }

  private get t() {
    return this.store?.translation.state.t || ((k: string) => k)
  }

  private get chartBuilder() {
    return this.store?.chartBuilder
  }

  private get chartMeasures() {
    return this.store?.chartMeasures
  }

  private get chartSchemaFields() {
    return this.store?.chartSchemaFields
  }

  private get measures() {
    return this.chartMeasures?.state.measures || []
  }

  private get fieldTypeMap() {
    return this.chartSchemaFields?.state.fieldTypeMap || {}
  }

  private containerRef?: HTMLDivElement
  private sortable?: Sortable

  private initSortable() {
    if (this.containerRef && !this.sortable) {
      this.sortable = initMeasureSortable(this.containerRef, {
        chartBuilder: this.chartBuilder,
        chartMeasures: this.chartMeasures,
      })
    }
  }

  private handleMenuClick = (measure: (typeof this.measures)[number], key: string) => {
    handleMeasureMenuAction(
      key,
      measure,
      this.fieldTypeMap,
      {
        changeAggregate: (id, aggregate) => {
          changeAggregate(this.chartMeasures, id, aggregate)
        },
        changeSort: (id, sort) => {
          changeSort(this.chartMeasures, id, sort)
        },
        changeEncoding: (id, encoding) => {
          changeEncoding(this.chartMeasures, id, encoding)
        },
        changeFormat: (id, format) => {
          changeFormat(this.chartMeasures, id, format)
        },
        openRename: (id, currentAlias) => {
          this.renameTarget = { id, alias: currentAlias }
        },
        removeMeasure: (id) => {
          this.chartMeasures?.removeMeasure(id)
        },
        showWarning: (_message) => {
          alert(_message)
        },
      },
      this.t,
    )
  }

  render() {
    return (
      <Host>
        <div ref={(el) => (this.containerRef = el as HTMLDivElement)} class='measure vbi-scroll-bar'>
          {this.measures.length === 0 ? (
            <div class='measure__placeholder'>{this.t('shelvesPlaceholdersMeasures')}</div>
          ) : (
            this.measures.map((m: VBIMeasureStore) => (
              <vbi-dropdown key={m.id} trigger='click' placement='bottom' class='measure__drag'>
                <vbi-button slot='trigger' size='sm' class='measure__item'>
                  <vbi-icon icon={DownOutlined} size={10} class='measure__item-down' />
                  <span class='measure__item-text'>{getMeasureDisplayLabel(m, this.t)}</span>
                  <vbi-icon
                    icon={CloseOutlined}
                    size={10}
                    class='measure__item-close'
                    onClick={(e) => {
                      e.stopPropagation()
                      this.chartMeasures?.removeMeasure(m.id)
                    }}
                  />
                </vbi-button>
                <vbi-cascading-menu
                  slot='content'
                  items={buildMeasureMenuItems(m, this.measures, this.fieldTypeMap, this.chartBuilder?.builder, this.t)}
                  onVbiCascadingMenuSelect={(e: CustomEvent<CascadingMenuItem>) => {
                    this.handleMenuClick(m, e.detail.value || String(e.detail.id))
                    const dropdown = (e.target as HTMLElement).closest('vbi-dropdown')
                    if (dropdown) {
                      ;(dropdown as any).open = false
                      if (typeof (dropdown as any).close === 'function') {
                        ;(dropdown as any).close()
                      }
                    }
                  }}
                >
                  <div slot='delete_divider' class='measure__delete-divider'></div>
                  <span slot='delete_label' class='measure__delete-label'>
                    {this.t('shelvesMenuDelete')}
                  </span>
                  <div slot='measure_format'>
                    {renderMeasureFormatPanel({
                      format: m.format,
                      onFormatChange: (format) => changeFormat(this.chartMeasures, m.id, format),
                      t: (k) => this.t(k),
                    })}
                  </div>
                </vbi-cascading-menu>
              </vbi-dropdown>
            ))
          )}
        </div>

        {this.renameTarget &&
          renderShelfRenameModal({
            target: this.renameTarget,
            title: this.t('shelvesRenameModalMeasureTitle'),
            placeholder: this.t('shelvesRenameModalMeasurePlaceholder'),
            okText: this.t('shelvesRenameModalSave'),
            cancelText: this.t('shelvesRenameModalCancel'),
            emptyNameMessage: this.t('shelvesRenameModalEmptyName'),
            onClose: () => {
              this.renameTarget = undefined
            },
            onValueChange: (value) => {
              this.renameTarget = { ...this.renameTarget!, alias: value }
            },
            onRename: (id, newAlias) => {
              renameMeasure(this.chartMeasures, id, newAlias)
              this.renameTarget = undefined
            },
          })}
      </Host>
    )
  }
}
