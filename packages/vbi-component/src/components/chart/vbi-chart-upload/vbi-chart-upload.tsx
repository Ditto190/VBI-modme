import { InboxOutlined } from '@ant-design/icons-svg'
import { Component, Element, Event, type EventEmitter, Host, Prop, State, h } from '@stencil/core'
import { type DatasetColumn } from '@visactor/vquery'
import { type ChartStore } from 'src/store/chart'
import { connectChartStore } from 'src/store/context'
import { inferSchema, rowsToDataset } from 'src/utils/data/dataset'
import { parseCsv } from 'src/utils/data/parseCsv'
import { randomShortId } from 'src/utils/random'

export interface EditableColumn {
  originalName: string
  customName: string
  type: 'string' | 'number' | 'date'
}

@Component({
  tag: 'vbi-chart-upload',
  styleUrl: 'vbi-chart-upload.css',
  shadow: true,
})
export class VbiChartUpload {
  @Element() el!: HTMLElement

  /** Prefix for generated local CSV connector IDs. */
  @Prop() connectorIdPrefix: string = 'local_csv'

  @State() store?: ChartStore
  @State() step: 'upload' | 'customize' = 'upload'
  @State() isDragging: boolean = false
  @State() loading: boolean = false
  @State() error: string | null = null
  @State() fileName: string = ''
  @State() rawHeaders: string[] = []
  @State() rawDataRows: string[][] = []
  @State() columns: EditableColumn[] = []

  /** Emitted when a CSV file is successfully uploaded and imported into the chart store. */
  @Event() vbiChartUploadSuccess!: EventEmitter<{
    connectorId: string
    fileName: string
    rowCount: number
  }>

  private fileInput?: HTMLInputElement

  componentWillLoad() {
    this.store = connectChartStore(this.el)
  }

  private get t() {
    return this.store?.translation.state.t || ((k: string) => k)
  }

  private handleFileChange = (e: Event) => {
    const input = e.target as HTMLInputElement
    const file = input.files?.[0]
    if (file) {
      void this.processCsvFile(file)
    }
  }

  private handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    this.isDragging = true
  }

  private handleDragLeave = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    this.isDragging = false
  }

  private handleDrop = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    this.isDragging = false

    const file = e.dataTransfer?.files?.[0]
    if (file) {
      void this.processCsvFile(file)
    }
  }

  private async processCsvFile(file: File) {
    this.loading = true
    this.error = null
    this.fileName = file.name

    try {
      const text = await file.text()
      const rows = parseCsv(text)
      if (rows.length < 2) {
        throw new Error(this.t('csvModalErrorEmpty'))
      }

      const [headerRow = [], ...dataRows] = rows
      const headers = headerRow.map((h) => h.trim())
      const schema = inferSchema(headers, dataRows)

      this.rawHeaders = headers
      this.rawDataRows = dataRows
      this.columns = schema.map((col) => ({
        originalName: col.name,
        customName: col.name,
        type: (col.type === 'number' || col.type === 'date' ? col.type : 'string') as 'string' | 'number' | 'date',
      }))
      this.step = 'customize'
    } catch (err: any) {
      this.error = err?.message || this.t('csvModalErrorParse')
      this.columns = []
      this.rawHeaders = []
      this.rawDataRows = []
    } finally {
      this.loading = false
    }
  }

  private handleCustomNameChange = (index: number, value: string) => {
    const nextColumns = [...this.columns]
    nextColumns[index] = {
      ...nextColumns[index],
      customName: value,
    }
    this.columns = nextColumns
  }

  private handleTypeChange = (index: number, value: string) => {
    const nextColumns = [...this.columns]
    nextColumns[index] = {
      ...nextColumns[index],
      type: value as 'string' | 'number' | 'date',
    }
    this.columns = nextColumns
  }

  private handleBack = () => {
    this.step = 'upload'
  }

  private handleClear = () => {
    this.fileName = ''
    this.rawHeaders = []
    this.rawDataRows = []
    this.columns = []
    this.error = null
    this.step = 'upload'
    if (this.fileInput) {
      this.fileInput.value = ''
    }
  }

  private handleConfirmImport = () => {
    if (!this.columns.length) {
      return
    }

    const finalSchema: DatasetColumn[] = this.columns.map((col) => ({
      name: col.customName.trim() || col.originalName,
      type: col.type,
    }))

    const mappedHeaders = this.rawHeaders.map((header) => {
      const col = this.columns.find((c) => c.originalName === header)
      return col ? col.customName.trim() || col.originalName : header
    })

    const dataset = rowsToDataset(mappedHeaders, this.rawDataRows, finalSchema)

    if (dataset.length === 0) {
      this.error = this.t('csvModalErrorEmpty')
      return
    }

    const connectorId = `${this.connectorIdPrefix}_${randomShortId()}`

    this.store?.chartBuilder.switchSource(connectorId, dataset, finalSchema)

    this.vbiChartUploadSuccess.emit({
      connectorId,
      fileName: this.fileName,
      rowCount: dataset.length,
    })

    this.handleClear()
  }

  private get dataTypeOptions() {
    return [
      { label: this.t('csvModalTypeNumber'), value: 'number' },
      { label: this.t('csvModalTypeString'), value: 'string' },
      { label: this.t('csvModalTypeDate'), value: 'date' },
    ]
  }

  render() {
    return (
      <Host>
        <div class='upload-container'>
          <div class='modal-header'>
            <h3 class='modal-title'>
              {this.step === 'upload' ? this.t('csvModalTitleUpload') : this.t('csvModalTitleSchema')}
            </h3>
          </div>

          {this.step === 'upload' ? (
            <div>
              <div
                class={{
                  'upload-dropzone': true,
                  dragging: this.isDragging,
                }}
                onClick={() => this.fileInput?.click()}
                onDragOver={this.handleDragOver}
                onDragLeave={this.handleDragLeave}
                onDrop={this.handleDrop}
              >
                <div class='upload-icon'>
                  <vbi-icon icon={InboxOutlined} size='44px' />
                </div>
                <div class='upload-title'>{this.t('csvModalDraggerText')}</div>
                <div class='upload-subtitle'>{this.t('csvModalDraggerHint')}</div>
                <input
                  type='file'
                  accept='.csv,text/csv'
                  class='hidden-input'
                  ref={(el) => (this.fileInput = el)}
                  onChange={this.handleFileChange}
                />
              </div>

              {this.loading && <div class='upload-loading'>{this.t('csvModalLoading')}</div>}

              {this.error && <div class='upload-error'>{this.error}</div>}
            </div>
          ) : (
            <div class='customize-container'>
              <div class='schema-table'>
                <div class='schema-table-header'>
                  <div>{this.t('csvModalColOriginal')}</div>
                  <div>{this.t('csvModalColCustom')}</div>
                  <div>{this.t('csvModalColType')}</div>
                </div>

                <div class='schema-table-body'>
                  {this.columns.map((col, index) => (
                    <div class='schema-table-row' key={col.originalName}>
                      <div class='original-header-cell'>
                        <span class='original-header-badge' title={col.originalName}>
                          {col.originalName}
                        </span>
                      </div>
                      <div class='custom-name-cell'>
                        <vbi-input
                          size='sm'
                          value={col.customName}
                          onVbiInputValue={(e: CustomEvent<string>) => this.handleCustomNameChange(index, e.detail)}
                        />
                      </div>
                      <div class='data-type-cell'>
                        <vbi-select
                          size='sm'
                          value={col.type}
                          options={this.dataTypeOptions}
                          onVbiSelectChange={(e: CustomEvent<string>) => this.handleTypeChange(index, e.detail)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div class='schema-actions'>
                <vbi-button size='sm' onClick={this.handleBack}>
                  {this.t('csvModalBtnBack')}
                </vbi-button>
                <vbi-button size='sm' color='primary' onClick={this.handleConfirmImport}>
                  {this.t('csvModalBtnConfirm')}
                </vbi-button>
              </div>
            </div>
          )}
        </div>
      </Host>
    )
  }
}
