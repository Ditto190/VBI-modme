import { z } from 'zod'
import type { ChartDynamicFilter } from '../../dataSelector'
import { zChartDynamicFilter, zSelector, zSelectors, type Selector, type Selectors } from '../../dataSelector'

export type HeatmapCellStyle = {
  /**
   * 数据选择器
   * @description
   * 若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力
   * 若未配置selector, 则样式全局生效.
   */
  selector?: Selector | Selectors

  /**
   * 动态筛选器（AI生成代码执行）
   */
  dynamicFilter?: ChartDynamicFilter

  /**
   * @description 热力图单元格颜色
   */
  cellColor?: string

  /**
   * @description 热力图单元格颜色透明度
   */
  cellColorOpacity?: number

  /**
   * @description 热力图单元格边框颜色
   */
  cellBorderColor?: string

  /**
   * @description 热力图单元格边框宽度
   */
  cellBorderWidth?: number
}

export const zHeatmapCellStyle = z.object({
  selector: z.union([zSelector, zSelectors]).nullish(),
  dynamicFilter: zChartDynamicFilter.optional(),
  cellColor: z.string().nullish(),
  cellColorOpacity: z.number().nullish(),
  cellBorderColor: z.string().nullish(),
  cellBorderWidth: z.number().nullish(),
})
