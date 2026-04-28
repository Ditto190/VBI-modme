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
  type VSeed,
  isPivotChart,
  isPivotTable,
  isTable,
  isVChart,
  registerAll,
} from '@visactor/vseed'
import { useEffect, useRef } from 'react'

registerAll()
register.chartModule('vchart', VChart)

export const VSeedRender = ({ vseed }: { vseed: VSeed }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const spec = VSeedBuilder.from(vseed).build()

    if (isPivotChart(vseed)) {
      const table = new PivotChart(ref.current, spec as PivotChartConstructorOptions)
      return () => table.release()
    }
    if (isVChart(vseed)) {
      const chart = new VChart(spec as ISpec, { dom: ref.current })
      chart.renderSync()
      return () => chart.release()
    }
    if (isTable(vseed)) {
      const table = new ListTable(ref.current, spec as ListTableConstructorOptions)
      return () => table.release()
    }
    if (isPivotTable(vseed)) {
      const table = new PivotTable(ref.current, spec as PivotTableConstructorOptions)
      return () => table.release()
    }
  }, [vseed])

  return <div className='mini-render' ref={ref} />
}
