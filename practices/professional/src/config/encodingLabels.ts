import type { FieldSlot } from 'src/types'

const titleByEncoding: Record<string, string> = {
  angle: 'Angle',
  color: 'Color',
  column: 'Column',
  detail: 'Detail',
  hierarchy: 'Hierarchy',
  label: 'Label',
  max: 'Max',
  median: 'Median',
  min: 'Min',
  outliers: 'Outliers',
  player: 'Player',
  q1: 'Q1',
  q3: 'Q3',
  radius: 'Radius',
  row: 'Row',
  secondaryYAxis: 'Secondary Y',
  size: 'Size',
  source: 'Source',
  tooltip: 'Tooltip',
  value: 'Value',
  x0: 'X0',
  x1: 'X1',
  xAxis: 'X Axis',
  yAxis: 'Y Axis',
}

export const getEncodingTitle = (slot: Pick<FieldSlot, 'dimensionEncoding' | 'measureEncoding'>) => {
  const key = slot.dimensionEncoding ?? slot.measureEncoding ?? ''
  return titleByEncoding[key] ?? key
}
