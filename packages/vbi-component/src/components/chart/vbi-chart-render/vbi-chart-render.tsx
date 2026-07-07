import { Component, Host, h, Prop, Element, Watch } from '@stencil/core'
import type { ISpec } from '@visactor/vchart'
import VChart from '@visactor/vchart'
import type {
  PivotChartConstructorOptions,
  ListTableConstructorOptions,
  PivotTableConstructorOptions,
} from '@visactor/vtable'
import { ListTable, PivotTable, PivotChart, register } from '@visactor/vtable'
import type { VSeed } from '@visactor/vseed'
import {
  registerAll,
  isPivotChart,
  isVChart,
  isPivotTable,
  isTable,
  ColorIdEncoding,
  Builder as VSeedBuilder,
} from '@visactor/vseed'

registerAll()
register.chartModule('vchart', VChart)

type PivotRecord = Record<string, unknown>

const readEventValue = (args: unknown) => {
  if (!args || typeof args !== 'object' || !('value' in args)) {
    return undefined
  }
  return (args as { value?: unknown }).value
}

const toNumericRange = (value: unknown): [number, number] | undefined => {
  if (!Array.isArray(value) || value.length < 2) {
    return undefined
  }

  const minValue = Number(value[0])
  const maxValue = Number(value[1])
  if (Number.isNaN(minValue) || Number.isNaN(maxValue)) {
    return undefined
  }

  return [minValue, maxValue]
}

@Component({
  tag: 'vbi-chart-render',
  styleUrl: 'vbi-chart-render.css',
  shadow: true,
})
export class VbiChartRender {
  @Element() el!: HTMLElement

  /** The VSeed configuration object used to render the chart or table. */
  @Prop() vseed?: VSeed

  private container!: HTMLDivElement
  private releaseFunc?: () => void

  @Watch('vseed')
  onVseedChange() {
    this.renderChart()
  }

  componentDidLoad() {
    this.renderChart()
  }

  disconnectedCallback() {
    if (this.releaseFunc) {
      this.releaseFunc()
      this.releaseFunc = undefined
    }
  }

  private renderChart() {
    if (this.releaseFunc) {
      this.releaseFunc()
      this.releaseFunc = undefined
    }

    if (!this.container || !this.vseed) {
      return
    }

    try {
      const builder = VSeedBuilder.from(this.vseed)
      const spec = builder.build()
      if (isPivotChart(this.vseed)) {
        const tableInstance = new PivotChart(this.container, spec as PivotChartConstructorOptions)

        const handleLegendItemClick = (args: unknown) => {
          const rawValue = readEventValue(args)
          const filteredValues = rawValue === undefined ? [] : Array.isArray(rawValue) ? rawValue : [rawValue]
          tableInstance.updateFilterRules([
            {
              filterKey: ColorIdEncoding,
              filteredValues,
            },
          ])
        }

        const handleLegendChange = (args: unknown) => {
          const range = toNumericRange(readEventValue(args))
          if (!range) {
            return
          }
          const [minValue, maxValue] = range
          tableInstance.updateFilterRules([
            {
              filterFunc: (record: PivotRecord) => {
                const colorKey = record[ColorIdEncoding]
                if (typeof colorKey !== 'string') {
                  return false
                }
                const rawValue = record[colorKey]
                if (typeof rawValue !== 'number') {
                  return false
                }
                return rawValue >= minValue && rawValue <= maxValue
              },
            },
          ])
        }

        tableInstance.on('legend_item_click', handleLegendItemClick)
        tableInstance.on('legend_change', handleLegendChange)

        this.releaseFunc = () => {
          tableInstance.off('legend_item_click', handleLegendItemClick)
          tableInstance.off('legend_change', handleLegendChange)
          tableInstance.release()
        }
      } else if (isPivotTable(this.vseed)) {
        // Check PivotTable BEFORE Table since PivotTable is a type of table
        const tableInstance = new PivotTable(this.container, spec as PivotTableConstructorOptions)
        this.releaseFunc = () => tableInstance.release()
      } else if (isTable(this.vseed)) {
        const tableInstance = new ListTable(this.container, spec as ListTableConstructorOptions)
        this.releaseFunc = () => tableInstance.release()
      } else if (isVChart(this.vseed)) {
        const vchart = new VChart(spec as ISpec, { dom: this.container })
        vchart.renderSync()
        this.releaseFunc = () => vchart.release()
      }
    } catch (error: unknown) {
      console.error('VSeed Render Error:', error)
    }
  }

  render() {
    return (
      <Host>
        <div
          ref={(el) => (this.container = el as HTMLDivElement)}
          style={{ height: '100%', width: '100%', minHeight: '300px' }}
        ></div>
      </Host>
    )
  }
}
