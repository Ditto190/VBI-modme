import { useEffect, useRef } from 'react'
import type { ISpec } from '@visactor/vchart'
import VChart from '@visactor/vchart'
import type {
  PivotChartConstructorOptions,
  PivotTableConstructorOptions,
  ListTableConstructorOptions,
} from '@visactor/vtable'
import { ListTable, PivotChart, PivotTable, register } from '@visactor/vtable'
import type { VSeed } from '@visactor/vseed'
import {
  Builder as VSeedBuilder,
  ColorIdEncoding,
  isPivotChart,
  isPivotTable,
  isTable,
  isVChart,
  registerAll,
} from '@visactor/vseed'

registerAll()
register.chartModule('vchart', VChart)

type PivotRecord = Record<string, unknown>

const readEventValue = (args: unknown) => {
  if (!args || typeof args !== 'object' || !('value' in args)) return undefined
  return (args as { value?: unknown }).value
}

const toNumericRange = (value: unknown): [number, number] | undefined => {
  if (!Array.isArray(value) || value.length < 2) return undefined
  const min = Number(value[0])
  const max = Number(value[1])
  return Number.isNaN(min) || Number.isNaN(max) ? undefined : [min, max]
}

export const VSeedRender = ({ vseed }: { vseed: VSeed }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const builder = VSeedBuilder.from(vseed)
    const spec = builder.build()

    if (isPivotChart(vseed)) {
      const table = new PivotChart(ref.current, spec as PivotChartConstructorOptions)
      const handleLegendItemClick = (args: unknown) => {
        const rawValue = readEventValue(args)
        const filteredValues = rawValue === undefined ? [] : Array.isArray(rawValue) ? rawValue : [rawValue]
        table.updateFilterRules([{ filterKey: ColorIdEncoding, filteredValues }])
      }
      const handleLegendChange = (args: unknown) => {
        const range = toNumericRange(readEventValue(args))
        if (!range) return
        const [min, max] = range
        table.updateFilterRules([
          {
            filterFunc: (record: PivotRecord) => {
              const colorKey = record[ColorIdEncoding]
              const value = typeof colorKey === 'string' ? record[colorKey] : undefined
              return typeof value === 'number' && value >= min && value <= max
            },
          },
        ])
      }
      table.on('legend_item_click', handleLegendItemClick)
      table.on('legend_change', handleLegendChange)
      return () => {
        table.off('legend_item_click', handleLegendItemClick)
        table.off('legend_change', handleLegendChange)
        table.release()
      }
    }

    if (isPivotTable(vseed)) {
      const table = new PivotTable(ref.current, spec as PivotTableConstructorOptions)
      return () => table.release()
    }

    if (isTable(vseed)) {
      const table = new ListTable(ref.current, spec as ListTableConstructorOptions)
      return () => table.release()
    }

    if (isVChart(vseed)) {
      const chart = new VChart(spec as ISpec, { dom: ref.current })
      chart.renderSync()
      return () => chart.release()
    }
  }, [vseed])

  return <div ref={ref} className='stream-vseed-render' />
}
