import type { BaseMeasure } from './baseMeasure'

export type GraphSankeyMeasure = BaseMeasure & {
  /**
   * @description 指标映射的通道
   * - size: 指标映射到边宽/流量大小通道
   * - detail: 指标映射到明细通道
   * - label: 指标映射到标签通道
   * - tooltip: 指标映射到提示通道
   */
  encoding?: 'size' | 'detail' | 'label' | 'tooltip'
}
