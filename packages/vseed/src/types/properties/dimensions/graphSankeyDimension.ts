import type { BaseDimension } from './baseDimension'

export type GraphSankeyDimension = BaseDimension & {
  /**
   * @description 维度映射的通道
   * - source: 支持将多个维度映射到 source 通道，advanced 阶段会拼接为上游节点路径
   * - target: 支持将多个维度映射到 target 通道，advanced 阶段会拼接为下游节点路径
   * - label: 支持将多个维度映射到标签通道
   * - tooltip: 支持将多个维度映射到提示通道
   */
  encoding?: 'source' | 'target' | 'label' | 'tooltip'
}
