import type { DimensionSelector, MeasureSelector, PartialDatumSelector } from '../../dataSelector'

/**
 * @description 差异标注锚点选择器，仅支持能明确绑定到具体数据项的选择器类型。
 */
export type DifferenceSelector = PartialDatumSelector | MeasureSelector | DimensionSelector

/**
 * @description 差异标注锚点配置，用于选择起始点或终止点绑定的数据。
 */
export type DifferenceAnchor = {
  /**
   * @description 锚点选择器，必须最终定位到一个逻辑锚点。
   * @example { year: '1930', type: 'Autocracies' }
   * @example [{ field: 'year', operator: 'in', value: ['1930'] }, { field: 'type', operator: 'in', value: ['Autocracies'] }]
   */
  selector: DifferenceSelector | DifferenceSelector[]
}

/**
 * @description 差异标注线配置，用于绑定两个数据锚点并展示它们的绝对差值或百分比差值。
 */
export type AnnotationDifferenceLine = {
  /**
   * @description 差异标注线的起始锚点。
   */
  start: DifferenceAnchor

  /**
   * @description 差异标注线的终止锚点。
   */
  end: DifferenceAnchor

  /**
   * @description 差异值类型。
   * - absolute: 显示绝对差值，计算方式为 end - start
   * - percent: 显示百分比差值，计算方式为 (end - start) / start
   */
  differenceType?: 'absolute' | 'percent'

  /**
   * @description 文本字体大小。
   */
  textFontSize?: number

  /**
   * @description 文本颜色。
   */
  textColor?: string

  /**
   * @description 文本背景色。
   */
  textBackgroundColor?: string

  /**
   * @description 线条颜色。
   */
  lineColor?: string
}
