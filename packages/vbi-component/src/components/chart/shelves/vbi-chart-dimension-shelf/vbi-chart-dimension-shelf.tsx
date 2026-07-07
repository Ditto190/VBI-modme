import { Component, Element, Host, State, h } from '@stencil/core'
import Sortable from 'sortablejs'
import { type VBISchemaField } from 'src/store/chart/schema-fields'

@Component({
  tag: 'vbi-chart-dimension-shelf',
  styleUrl: 'vbi-chart-dimension-shelf.css',
  shadow: true,
})
export class VbiChartDimensionShelf {
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
        <div
          ref={(el) => (this.containerRef = el as HTMLDivElement)}
          style={{ minHeight: '40px', padding: '8px', border: '1px dashed #ccc' }}
        >
          {this.fields.length === 0 ? (
            <div style={{ color: '#999' }}>Drag and drop Dimension here...</div>
          ) : (
            this.fields.map((field) => (
              <div
                data-field={JSON.stringify(field)}
                style={{ padding: '4px 8px', margin: '4px 0', backgroundColor: '#f0f0f0', borderRadius: '4px' }}
              >
                {field.name}
              </div>
            ))
          )}
        </div>
      </Host>
    )
  }
}
