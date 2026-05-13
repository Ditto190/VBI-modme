import type { Locale } from '../../i18n'
import type {
  BackgroundColor,
  Color,
  Dataset,
  GraphSankeyDimension,
  GraphSankeyMeasure,
  Label,
  Page,
  Theme,
  Tooltip,
} from '../../properties'

/**
 * @description 桑基图，用于展示 source 到 target 的流向关系，通过连线宽度表示流量大小。
 * 适用场景:
 * - 展示普通 node-link 结构的流向关系
 * - 展示多个 source 维度、多 target 维度拼接后的路径流转
 * - 多指标场景下，advanced pipeline 可将指标名称转为 target 节点，再使用单个数值指标控制流量大小
 * @encoding
 * 桑基图支持以下视觉通道:
 * `source`: 起点通道, 支持`多个维度`
 * `target`: 终点通道, 支持`多个维度`
 * `size`: 大小通道, 支持`一个指标`
 * `label`: 标签通道, 支持`多个维度`与 `多个指标`
 * `tooltip`: 提示通道, 支持`多个维度`与 `多个指标`
 * @warning
 * 数据要求:
 * - 至少1个 source 维度或默认维度可映射为 source
 * - 至少1个 target 维度
 * - 至少1个数值字段（度量）用于映射流量大小
 * - 多指标场景下，若需要“指标名称作为 target”，由 advanced pipeline 在 reshape 阶段完成转换
 * - advanced pipeline 需要将 tidyData 转换为普通 sankey 可消费的 source / target / value 结构
 */
export interface GraphSankey {
  /**
   * 桑基图
   * @description 桑基图，展示普通 source-target 流向关系和流量大小
   * @type {'graphSankey'}
   * @example 'graphSankey'
   */
  chartType: 'graphSankey'

  /**
   * 数据集
   * @description 符合 TidyData 规范且已经聚合的数据集，用于定义图表的数据来源和结构
   * @type {Array<Record<string|number, any>>}
   * @example [{fromRegion: '华北', toRegion: '华东', value: 30}]
   */
  dataset: Dataset

  /**
   * 维度
   * @description 维度配置，用于定义 source / target 节点结构，支持 source / target / label / tooltip 通道
   * @example [{id: 'fromRegion', alias: '来源区域'}, {id: 'toRegion', alias: '去向区域', encoding: 'target'}]
   */
  dimensions?: GraphSankeyDimension[]

  /**
   * 指标
   * @description 指标配置，用于定义流量大小，支持 size / target / label / tooltip 通道
   * @example [{id: 'sales', alias: '销售额'}]
   */
  measures?: GraphSankeyMeasure[]

  /**
   * 分页配置
   * @description 用于指定分页的字段名, 必须是维度
   */
  page?: Page

  /**
   * 图表的背景颜色
   * @default transparent 默认为透明背景
   */
  backgroundColor?: BackgroundColor

  /**
   * 颜色
   * @description 颜色配置, 用于定义图表的颜色方案
   */
  color?: Color

  /**
   * 标签
   * @description 标签配置, 用于定义图表的数据标签
   */
  label?: Label

  /**
   * 提示信息
   * @description 提示信息配置, 用于定义图表的提示信息
   */
  tooltip?: Tooltip

  /**
   * 图表的主题
   * @default light 默认为亮色主题
   */
  theme?: Theme

  /**
   * 语言
   * @description 图表语言配置, 支持 'zh-CN' 与 'en-US'
   * @default 'zh-CN'
   */
  locale?: Locale
}
