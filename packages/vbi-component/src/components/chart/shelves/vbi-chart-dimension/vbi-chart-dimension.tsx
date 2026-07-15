import { CloseOutlined, DownOutlined } from '@ant-design/icons-svg'
import { Component, Element, Host, State, h } from '@stencil/core'
import type Sortable from 'sortablejs'
import { type CascadingMenuItem } from 'src/components/ui/vbi-cascading-menu/vbi-cascading-menu'
import { type ChartStore } from 'src/store/chart'
import { type VBIDimension as VBIDimensionStore } from 'src/store/chart/dimensions'
import { connectChartStore } from 'src/store/context'
import { renderShelfRenameModal } from '../common/shelf-rename-modal'
import {
  buildDimensionMenuItems,
  changeAggregate,
  changeEncoding,
  changeSort,
  getDimensionDisplayLabel,
  handleDimensionMenuAction,
  initDimensionSortable,
  renameDimension,
} from './helpers'

@Component({
  tag: 'vbi-chart-dimension',
  styleUrl: 'vbi-chart-dimension.css',
  shadow: true,
})
export class VbiChartDimension {
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

  private get chartDimensions() {
    return this.store?.chartDimensions
  }

  private get chartSchemaFields() {
    return this.store?.chartSchemaFields
  }

  private get dimensions() {
    return this.chartDimensions?.state.dimensions || []
  }

  private get fieldTypeMap() {
    return this.chartSchemaFields?.state.fieldTypeMap || {}
  }

  private containerRef?: HTMLDivElement
  private sortable?: Sortable

  private initSortable() {
    if (this.containerRef && !this.sortable) {
      this.sortable = initDimensionSortable(this.containerRef, {
        chartBuilder: this.chartBuilder,
        chartDimensions: this.chartDimensions,
      })
    }
  }

  private handleMenuClick = (dimension: (typeof this.dimensions)[number], key: string) => {
    handleDimensionMenuAction(
      key,
      dimension,
      {
        changeAggregate: (id, aggregate) => {
          changeAggregate(this.store, this.chartDimensions, this.dimensions, id, aggregate)
        },
        changeSort: (id, sort) => {
          changeSort(this.chartDimensions, id, sort)
        },
        changeEncoding: (id, encoding) => {
          changeEncoding(this.chartDimensions, id, encoding)
        },
        openRename: (id, currentAlias) => {
          this.renameTarget = { id, alias: currentAlias }
        },
        removeDimension: (id) => {
          this.chartDimensions?.removeDimension(id)
        },
      },
      this.t,
    )
  }

  render() {
    return (
      <Host>
        <div ref={(el) => (this.containerRef = el as HTMLDivElement)} class='dimension vbi-scroll-bar'>
          {this.dimensions.length === 0 ? (
            <div class='dimension__placeholder'>{this.t('shelvesPlaceholdersDimensions')}</div>
          ) : (
            this.dimensions.map((dim: VBIDimensionStore) => (
              <vbi-dropdown key={dim.id} trigger='click' placement='bottom' class='dimension__drag'>
                <vbi-button slot='trigger' size='sm' class='dimension__item'>
                  <vbi-icon icon={DownOutlined} size={10} class='dimension__item-down' />
                  <span class='dimension__item-text'>{getDimensionDisplayLabel(dim, this.fieldTypeMap, this.t)}</span>
                  <vbi-icon
                    icon={CloseOutlined}
                    size={10}
                    class='dimension__item-close'
                    onClick={(e) => {
                      e.stopPropagation()
                      this.chartDimensions?.removeDimension(dim.id)
                    }}
                  />
                </vbi-button>
                <vbi-cascading-menu
                  slot='content'
                  items={buildDimensionMenuItems(
                    dim,
                    this.dimensions,
                    this.fieldTypeMap,
                    this.chartBuilder?.builder,
                    this.t,
                  )}
                  onVbiCascadingMenuSelect={(e: CustomEvent<CascadingMenuItem>) => {
                    this.handleMenuClick(dim, e.detail.value || String(e.detail.id))
                    const dropdown = (e.target as HTMLElement).closest('vbi-dropdown')
                    if (dropdown) {
                      ;(dropdown as any).open = false
                      if (typeof (dropdown as any).close === 'function') {
                        ;(dropdown as any).close()
                      }
                    }
                  }}
                >
                  <div slot='delete_divider' class='dimension__delete-divider'></div>
                  <span slot='delete_label' class='dimension__delete-label'>
                    {this.t('shelvesMenuDelete')}
                  </span>
                </vbi-cascading-menu>
              </vbi-dropdown>
            ))
          )}
        </div>

        {this.renameTarget &&
          renderShelfRenameModal({
            target: this.renameTarget,
            title: this.t('shelvesRenameModalDimensionTitle'),
            placeholder: this.t('shelvesRenameModalDimensionPlaceholder'),
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
              renameDimension(this.chartDimensions, id, newAlias)
              this.renameTarget = undefined
            },
          })}
      </Host>
    )
  }
}
