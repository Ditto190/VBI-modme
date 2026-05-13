import type { VBIDimension, VBIMeasure } from '@visactor/vbi'
import type { StreamLabels } from 'src/config/labels'

type DimensionEncoding = NonNullable<VBIDimension['encoding']>
type MeasureEncoding = NonNullable<VBIMeasure['encoding']>

const dimensionTitles: Record<StreamLabels['locale'], Record<DimensionEncoding, string>> = {
  'zh-CN': {
    angle: '角度',
    color: '颜色',
    column: '列',
    detail: '明细',
    hierarchy: '层级',
    label: '标签',
    player: '播放',
    row: '行',
    source: '来源',
    target: '去向',
    tooltip: '提示',
    xAxis: 'X 轴 / 时间',
    yAxis: 'Y 轴',
  },
  'en-US': {
    angle: 'Angle',
    color: 'Color',
    column: 'Column',
    detail: 'Detail',
    hierarchy: 'Hierarchy',
    label: 'Label',
    player: 'Player',
    row: 'Row',
    source: 'Source',
    target: 'Target',
    tooltip: 'Tooltip',
    xAxis: 'X / Time',
    yAxis: 'Y',
  },
}

const measureTitles: Record<StreamLabels['locale'], Record<MeasureEncoding, string>> = {
  'zh-CN': {
    angle: '角度',
    color: '颜色',
    column: '列',
    detail: '明细',
    label: '标签',
    max: '最大值',
    median: '中位数',
    min: '最小值',
    outliers: '异常值',
    primaryYAxis: '主 Y 轴',
    q1: 'Q1',
    q3: 'Q3',
    radius: '半径',
    secondaryYAxis: '副 Y 轴',
    size: '大小',
    tooltip: '提示',
    value: '值',
    x0: 'X0',
    x1: 'X1',
    xAxis: 'X 轴',
    yAxis: 'Y 轴',
  },
  'en-US': {
    angle: 'Angle',
    color: 'Color',
    column: 'Column',
    detail: 'Detail',
    label: 'Label',
    max: 'Max',
    median: 'Median',
    min: 'Min',
    outliers: 'Outliers',
    primaryYAxis: 'Primary Y',
    q1: 'Q1',
    q3: 'Q3',
    radius: 'Radius',
    secondaryYAxis: 'Secondary Y',
    size: 'Size',
    tooltip: 'Tooltip',
    value: 'Value',
    x0: 'X0',
    x1: 'X1',
    xAxis: 'X',
    yAxis: 'Y',
  },
}

export const getEncodingTitle = (
  labels: StreamLabels,
  slot: { dimensionEncoding?: DimensionEncoding; measureEncoding?: MeasureEncoding },
) => {
  if (slot.dimensionEncoding) return dimensionTitles[labels.locale][slot.dimensionEncoding]
  if (slot.measureEncoding) return measureTitles[labels.locale][slot.measureEncoding]
  return ''
}
