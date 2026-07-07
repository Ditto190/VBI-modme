import { CloseOutlined, DownOutlined } from '@ant-design/icons-svg'
import { Component, Element, Host, State, h } from '@stencil/core'
import Sortable from 'sortablejs'
import { type VBISchemaField } from 'src/store/chart/schema-fields'

@Component({
  tag: 'vbi-chart-dimension',
  styleUrl: 'vbi-chart-dimension.css',
  shadow: true,
})
export class VbiChartDimension {
  @Element() el!: HTMLElement

  private containerRef?: HTMLDivElement
  private sortable?: Sortable

  // Temporarily store the fields list using State to display on the UI
  @State() fields: VBISchemaField[] = []

  componentDidRender() {
    this.initSortable()
  }

  disconnectedCallback() {
    this.sortable?.destroy()
  }

  private initSortable() {
    if (this.containerRef && !this.sortable) {
      this.sortable = new Sortable(this.containerRef, {
        group: { name: 'fields', put: true, pull: false },
        animation: 150,
        draggable: '.dimension__item',
        onAdd: (evt) => {
          const itemEl = evt.item
          const fieldData = itemEl.getAttribute('data-field')

          if (fieldData) {
            try {
              // Parse field data and remove DOM node to prevent SortableJS duplication/conflicts
              const field = JSON.parse(fieldData) as VBISchemaField
              itemEl.remove()

              // Update state to trigger reactive re-render
              const newIndex = evt.newIndex ?? this.fields.length
              const newFields = [...this.fields]
              newFields.splice(newIndex, 0, field)
              this.fields = newFields
            } catch (e) {
              console.error('Error parsing field data:', e)
            }
          }
        },
      })
    }
  }

  render() {
    return (
      <Host>
        <div ref={(el) => (this.containerRef = el as HTMLDivElement)} class='dimension'>
          {this.fields.length === 0 ? (
            <div class='dimension__placeholder'>Drag dimensions or measures here</div>
          ) : (
            this.fields.map((field) => (
              <vbi-button size='sm' class='dimension__item'>
                <vbi-icon icon={DownOutlined} size='10' />
                {field.name}
                <vbi-icon icon={CloseOutlined} size='10' class='dimension__item-close' />
              </vbi-button>
            ))
          )}
        </div>
      </Host>
    )
  }
}
