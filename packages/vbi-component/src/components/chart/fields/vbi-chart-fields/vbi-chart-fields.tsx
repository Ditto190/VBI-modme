import { Component, Element, Host, State, h } from '@stencil/core'
import { type ChartStore } from 'src/store/chart'
import { connectChartStore } from 'src/store/context'

@Component({
  tag: 'vbi-chart-fields',
  styleUrl: 'vbi-chart-fields.css',
  shadow: true,
})
export class VbiChartFields {
  @Element() el!: HTMLElement

  @State() store?: ChartStore
  @State() keyword?: string
  @State() selectedRoles?: string
  @State() selectedTypes?: string

  async componentWillLoad() {
    this.store = connectChartStore(this.el)
    const builder = this.store?.chartBuilder.builder
    if (builder) {
      console.log('dimensions', await builder.getSchema())
    }
  }

  private get chartSchemaFields() {
    return this.store?.chartSchemaFields
  }

  private get filteredFields() {
    const fields = this.chartSchemaFields?.state.schemaFields || []
    if (!this.keyword) return fields
    return fields.filter((f) => f.name.includes(this.keyword!))
  }

  private get dimensions() {
    return this.filteredFields.filter((field) => field.role === 'dimension')
  }

  private get measures() {
    return this.filteredFields.filter((field) => field.role === 'measure')
  }

  render() {
    return (
      <Host>
        <div class='chartfields'>
          <h4 class='chartfields-title'>Field List</h4>

          <div class='chartfields-filter'>
            <vbi-chart-field-filter></vbi-chart-field-filter>
          </div>

          <div class='chartfields-list'>
            {this.dimensions.length === 0 ? (
              <div class='empty-state'>Chưa có trường dữ liệu</div>
            ) : (
              this.dimensions.map((dim) => <div class='field-item'>{dim.name}</div>)
            )}
            {this.measures.length === 0 ? (
              <div class='empty-state'>Chưa có trường dữ liệu</div>
            ) : (
              this.measures.map((dim) => <div class='field-item'>{dim.name}</div>)
            )}
          </div>
        </div>
      </Host>
    )
  }
}
