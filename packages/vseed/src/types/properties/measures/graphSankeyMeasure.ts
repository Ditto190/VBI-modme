import type { BaseMeasure } from './baseMeasure'

export type GraphSankeyMeasure = BaseMeasure & {
  /**
   * @description 指标映射的通道
   * - size: 指标映射到边宽/流量大小通道
   * - target: 多指标场景下支持将指标名称映射为 target 节点
   * - label: 指标映射到标签通道
   * - tooltip: 指标映射到提示通道
   */
  encoding?: 'size' | 'target' | 'label' | 'tooltip'
}
