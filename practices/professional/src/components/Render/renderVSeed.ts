import VChart, { type ISpec } from '@visactor/vchart'
import {
  ListTable,
  PivotChart,
  PivotTable,
  register,
  type ListTableConstructorOptions,
  type PivotChartConstructorOptions,
  type PivotTableConstructorOptions,
} from '@visactor/vtable'
import {
  Builder as VSeedBuilder,
  ColorIdEncoding,
  type VSeed,
  isPivotChart,
  isPivotTable,
  isTable,
  isVChart,
  registerAll,
} from '@visactor/vseed'
import type { ProfessionalTheme } from 'src/constants/builder'

registerAll()
register.chartModule('vchart', VChart)

export const renderVSeed = (container: HTMLElement, vseed: VSeed, themeMode: ProfessionalTheme) => {
  const spec = VSeedBuilder.from({ ...vseed, theme: themeMode }).build()

  if (isPivotChart(vseed)) {
    const table = new PivotChart(container, spec as PivotChartConstructorOptions)
    bindPivotChartLegend(table)
    return () => table.release()
  }

  if (isVChart(vseed)) {
    const chart = new VChart(spec as ISpec, { dom: container })
    chart.renderSync()
    return () => chart.release()
  }

  if (isTable(vseed)) {
    const table = new ListTable(container, spec as ListTableConstructorOptions)
    return () => table.release()
  }

  if (isPivotTable(vseed)) {
    const table = new PivotTable(container, spec as PivotTableConstructorOptions)
    return () => table.release()
  }
}

const bindPivotChartLegend = (table: PivotChart) => {
  table.on('legend_item_click', (args) => {
    table.updateFilterRules([{ filterKey: ColorIdEncoding, filteredValues: args.value }])
  })
  table.on('legend_change', (args) => {
    const [minValue, maxValue] = args.value
    table.updateFilterRules([
      {
        filterFunc: (record) => {
          const value = record[record[ColorIdEncoding]]
          return value >= minValue && value <= maxValue
        },
      },
    ])
  })
}
