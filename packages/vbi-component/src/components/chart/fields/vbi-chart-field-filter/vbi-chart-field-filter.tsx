import { FilterOutlined } from '@ant-design/icons-svg'
import { Component, Element, Event, type EventEmitter, Host, Prop, State, h } from '@stencil/core'
import { type ChartStore } from 'src/store/chart'
import { connectChartStore } from 'src/store/context'
import { type FieldRole } from 'src/utils/data/fieldRole'

const FIELD_ROLE_OPTIONS: FieldRole[] = ['dimension', 'measure']
const FIELD_TYPE_LABEL_KEYS: Record<string, string> = {
  number: 'panelsFieldsTypeNumber',
  string: 'panelsFieldsTypeString',
  date: 'panelsFieldsTypeDate',
  datetime: 'panelsFieldsTypeDatetime',
  timestamp: 'panelsFieldsTypeTimestamp',
  boolean: 'panelsFieldsTypeBoolean',
}

@Component({
  tag: 'vbi-chart-field-filter',
  styleUrl: 'vbi-chart-field-filter.css',
  shadow: true,
})
export class VbiChartFieldFilter {
  @Element() el!: HTMLElement

  /** The currently selected field roles. */
  @Prop({ mutable: true }) selectedRoles: FieldRole[] = []

  /** The currently selected field types. */
  @Prop({ mutable: true }) selectedTypes: string[] = []

  /** The current search keyword. */
  @Prop({ mutable: true }) keyword: string = ''

  @State() store?: ChartStore

  /** Emitted when the user changes the selected roles in the filter dropdown. */
  @Event() vbiChartFieldFilterRole!: EventEmitter<FieldRole[]>

  /** Emitted when the user changes the selected types in the filter dropdown. */
  @Event() vbiChartFieldFilterType!: EventEmitter<string[]>

  /** Emitted when the user changes the search keyword. */
  @Event() vbiChartFieldFilterKeyword!: EventEmitter<string>

  private unsubscribe?: () => void

  componentWillLoad() {
    this.store = connectChartStore(this.el)
    if (this.store) {
      this.unsubscribe = this.store.chartBuilder.onChange('builderChangeTrigger', () => {
        this.handleReset()
        if (this.keyword !== '') {
          this.keyword = ''
          this.vbiChartFieldFilterKeyword.emit(this.keyword)
        }
      })
    }
  }

  disconnectedCallback() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }

  private get t() {
    return this.store?.translation.state.t || ((k: string) => k)
  }

  private get chartSchemaFields() {
    return this.store?.chartSchemaFields
  }

  private get fieldTypeOptions() {
    return Array.from(
      new Set(
        this.chartSchemaFields?.state.schemaFields
          .map((field) => field.type)
          .filter((fieldType): fieldType is string => Boolean(fieldType)),
      ),
    )
  }

  private toggleRole = (role: FieldRole, checked: boolean) => {
    if (checked) {
      this.selectedRoles = [...this.selectedRoles, role]
    } else {
      this.selectedRoles = this.selectedRoles.filter((r) => r !== role)
    }
    this.vbiChartFieldFilterRole.emit(this.selectedRoles)
  }

  private toggleType = (type: string, checked: boolean) => {
    if (checked) {
      this.selectedTypes = [...this.selectedTypes, type]
    } else {
      this.selectedTypes = this.selectedTypes.filter((t) => t !== type)
    }
    this.vbiChartFieldFilterType.emit(this.selectedTypes)
  }

  private handleKeywordChange = (keyword: string) => {
    this.keyword = keyword
    this.vbiChartFieldFilterKeyword.emit(this.keyword)
  }

  private handleReset = () => {
    if (this.selectedRoles.length > 0) {
      this.selectedRoles = []
      this.vbiChartFieldFilterRole.emit(this.selectedRoles)
    }
    if (this.selectedTypes.length > 0) {
      this.selectedTypes = []
      this.vbiChartFieldFilterType.emit(this.selectedTypes)
    }
  }

  private formatFallbackTypeLabel = (fieldType: string) => {
    return fieldType.replace(/[_-]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
  }

  private getFieldTypeLabel = (fieldType: string) => {
    const key = FIELD_TYPE_LABEL_KEYS[fieldType.toLowerCase()]
    return key ? this.t(key) : this.formatFallbackTypeLabel(fieldType)
  }

  render() {
    return (
      <Host>
        <vbi-input
          size='sm'
          value={this.keyword}
          placeholder={this.t('panelsFieldsSearchPlaceholder')}
          onVbiInputValue={(e) => this.handleKeywordChange(e.detail)}
          style={{ width: '100%' }}
        />

        <vbi-dropdown>
          <vbi-button slot='trigger' size='sm'>
            <vbi-icon icon={FilterOutlined} size={16} />
          </vbi-button>

          <div slot='content' class='dropdown-content filter'>
            <div class='filter-header'>
              <strong>{this.t('panelsFieldsFiltersTitle')}</strong>
              <vbi-button size='xs' variant='ghost' onClick={this.handleReset}>
                {this.t('panelsFieldsFiltersReset')}
              </vbi-button>
            </div>
            <div class='filter-group'>
              <div class='filter-group-title'>{this.t('panelsFieldsFiltersRole')}</div>
              {FIELD_ROLE_OPTIONS.map((role) => (
                <label class='filter-group-item'>
                  <vbi-checkbox
                    size='sm'
                    checked={this.selectedRoles.includes(role)}
                    onVbiCheckboxChange={(e) => this.toggleRole(role, e.detail)}
                  />
                  {role === 'dimension' ? this.t('panelsFieldsFilterDimension') : this.t('panelsFieldsFilterMeasure')}
                </label>
              ))}
            </div>
            <div class='filter-group'>
              <div class='filter-group-title'>{this.t('panelsFieldsFiltersType')}</div>
              {this.fieldTypeOptions.map((fieldType) => (
                <label class='filter-group-item'>
                  <vbi-checkbox
                    size='sm'
                    checked={this.selectedTypes.includes(fieldType)}
                    onVbiCheckboxChange={(e) => this.toggleType(fieldType, e.detail)}
                  />
                  {this.getFieldTypeLabel(fieldType)}
                </label>
              ))}
            </div>
          </div>
        </vbi-dropdown>
      </Host>
    )
  }
}
