import { Component, Element, Host, State, h } from '@stencil/core'
import { type ChartStore } from 'src/store/chart'
import { connectChartStore } from 'src/store/context'
import { type FieldRole } from 'src/utils/data/fieldRole'

@Component({
  tag: 'vbi-chart-fields',
  styleUrl: 'vbi-chart-fields.css',
  shadow: true,
})
export class VbiChartFields {
  @Element() el!: HTMLElement

  @State() store?: ChartStore
  @State() keyword: string = ''
  @State() selectedRoles: FieldRole[] = []
  @State() selectedTypes: string[] = []

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
    return fields.filter((f) => {
      const matchKeyword = !this.keyword || f.name.toLowerCase().includes(this.keyword.toLowerCase())
      const matchRole = this.selectedRoles.length === 0 || this.selectedRoles.includes(f.role as FieldRole)
      const matchType = this.selectedTypes.length === 0 || (f.type && this.selectedTypes.includes(f.type))
      return matchKeyword && matchRole && matchType
    })
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
          <vbi-chart-field-filter
            class='chartfields-filter'
            keyword={this.keyword}
            selectedRoles={this.selectedRoles}
            selectedTypes={this.selectedTypes}
            onVbiChartFieldFilterKeyword={(e) => (this.keyword = e.detail)}
            onVbiChartFieldFilterRole={(e) => (this.selectedRoles = e.detail)}
            onVbiChartFieldFilterType={(e) => (this.selectedTypes = e.detail)}
          />

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
