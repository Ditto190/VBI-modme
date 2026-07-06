import { CalendarOutlined, FontSizeOutlined, NumberOutlined } from '@ant-design/icons-svg'
import { Component, Element, Host, Prop, State, h } from '@stencil/core'
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

  componentWillLoad() {
    this.store = connectChartStore(this.el)
  }

  private get t() {
    return this.store?.translation.state.t || ((k: string) => k)
  }

  private get hasFields() {
    return this.dimensions.length > 0 || this.measures.length > 0
  }

  private handleDragStart = (e: DragEvent, field: VBISchemaField) => {
    e.dataTransfer?.setData('application/json', JSON.stringify(field))
    ;(e.currentTarget as HTMLElement).classList.add('dragging')
  }

  private handleDragEnd = (e: DragEvent) => {
    ;(e.currentTarget as HTMLElement).classList.remove('dragging')
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
      <div
        class='fieldsection-item'
        draggable={true}
        onDragStart={(e) => this.handleDragStart(e, field)}
        onDragEnd={(e) => this.handleDragEnd(e)}
      >
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
              <div class='fieldsection-group'>
                <div class='fieldsection-group-title'>{this.t('panelsFieldsFilterDimension')}</div>
                {this.dimensions.map(this.renderField)}
              </div>
            )}

            {this.dimensions.length > 0 && this.measures.length > 0 && <div class='fieldsection-divider'></div>}

            {this.measures.length > 0 && (
              <div class='fieldsection-group'>
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
