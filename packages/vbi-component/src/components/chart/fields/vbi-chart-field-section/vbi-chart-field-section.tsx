import { CalendarOutlined, FontSizeOutlined, NumberOutlined } from '@ant-design/icons-svg'
import { Component, Element, Host, Prop, State, h } from '@stencil/core'
import Sortable from 'sortablejs'
import { type ChartStore } from 'src/store/chart'
import { type VBISchemaField } from 'src/store/chart/schema-fields'
import { connectChartStore } from 'src/store/context'

@Component({
  tag: 'vbi-chart-field-section',
  styleUrl: 'vbi-chart-field-section.css',
  shadow: true,
})
export class VbiChartFieldSection {
  @Element() el!: HTMLElement

  /** The list of dimensions to display. */
  @Prop() dimensions: VBISchemaField[] = []

  /** The list of measures to display. */
  @Prop() measures: VBISchemaField[] = []

  @State() store?: ChartStore

  private dimensionGroupRef?: HTMLDivElement
  private measureGroupRef?: HTMLDivElement
  private dimensionSortable?: Sortable
  private measureSortable?: Sortable

  componentWillLoad() {
    this.store = connectChartStore(this.el)
  }

  componentDidRender() {
    this.initSortable()
  }

  disconnectedCallback() {
    this.dimensionSortable?.destroy()
    this.measureSortable?.destroy()
  }

  private initSortable() {
    const options: Sortable.Options = {
      group: { name: 'fields', pull: 'clone', put: false },
      sort: false,
      animation: 150,
      onClone: (e) => {
        // Restore properties for vbi-button inside the clone
        const cloneBtn = e.clone.querySelector('vbi-button') as HTMLVbiButtonElement | null
        const origBtn = e.item.querySelector('vbi-button') as HTMLVbiButtonElement | null
        if (cloneBtn && origBtn) {
          cloneBtn.variant = origBtn.variant
          cloneBtn.size = origBtn.size
        }

        // Restore the icon property for vbi-icon inside the clone
        const cloneIcon = e.clone.querySelector('vbi-icon') as HTMLVbiIconElement | null
        const origIcon = e.item.querySelector('vbi-icon') as HTMLVbiIconElement | null
        if (cloneIcon && origIcon) {
          cloneIcon.icon = origIcon.icon
        }
      },
      setData: (dataTransfer, dragEl) => {
        const fieldData = dragEl.getAttribute('data-field')
        if (fieldData) {
          dataTransfer.setData('application/json', fieldData)
        }
      },
      onStart: (e) => {
        e.item.classList.add('dragging')
      },
      onEnd: (e) => {
        e.item.classList.remove('dragging')

        // WORKAROUND FOR WEB COMPONENT CLONE ISSUE:
        // Replace the clone with the original element (e.item)
        // to prevent Stencil from losing reference and breaking the UI.
        if (e.pullMode === 'clone' && e.clone && e.clone.parentNode) {
          e.clone.parentNode.replaceChild(e.item, e.clone)
        }
      },
    }

    if (this.dimensionGroupRef) {
      if (!this.dimensionSortable) {
        this.dimensionSortable = new Sortable(this.dimensionGroupRef, options)
      }
    } else if (this.dimensionSortable) {
      this.dimensionSortable.destroy()
      this.dimensionSortable = undefined
    }

    if (this.measureGroupRef) {
      if (!this.measureSortable) {
        this.measureSortable = new Sortable(this.measureGroupRef, options)
      }
    } else if (this.measureSortable) {
      this.measureSortable.destroy()
      this.measureSortable = undefined
    }
  }

  private get t() {
    return this.store?.translation.state.t || ((k: string) => k)
  }

  private get hasFields() {
    return this.dimensions.length > 0 || this.measures.length > 0
  }

  private getFieldIcon = (field: Pick<VBISchemaField, 'isDate' | 'role'>) => {
    if (field.role === 'measure') {
      return <vbi-icon icon={NumberOutlined}></vbi-icon>
    }

    if (field.isDate) {
      return <vbi-icon icon={CalendarOutlined}></vbi-icon>
    }

    return <vbi-icon icon={FontSizeOutlined}></vbi-icon>
  }

  private renderField = (field: VBISchemaField) => {
    return (
      <div class='fieldsection-item' data-field={JSON.stringify(field)}>
        <vbi-button variant='ghost' size='sm'>
          {this.getFieldIcon(field)}
          {field.name}
        </vbi-button>
      </div>
    )
  }

  render() {
    return (
      <Host>
        {this.hasFields ? (
          <div class='fieldsection'>
            {this.dimensions.length > 0 && (
              <div
                class='fieldsection-group vbi-scroll-bar'
                ref={(el) => (this.dimensionGroupRef = el as HTMLDivElement)}
                style={{ flex: '6' }}
              >
                <div class='fieldsection-group-title'>{this.t('panelsFieldsFilterDimension')}</div>
                {this.dimensions.map(this.renderField)}
              </div>
            )}

            {this.dimensions.length > 0 && this.measures.length > 0 && <div class='fieldsection-divider'></div>}

            {this.measures.length > 0 && (
              <div
                class='fieldsection-group vbi-scroll-bar'
                ref={(el) => (this.measureGroupRef = el as HTMLDivElement)}
                style={{ flex: '4' }}
              >
                <div class='fieldsection-group-title'>{this.t('panelsFieldsFilterMeasure')}</div>
                {this.measures.map(this.renderField)}
              </div>
            )}
          </div>
        ) : (
          <div>{this.t('panelsFieldsEmpty')}</div>
        )}
      </Host>
    )
  }
}
