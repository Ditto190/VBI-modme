import type { Locale } from '../../i18n'
import type {
  BackgroundColor,
  Color,
  Dataset,
  HierarchyDimension,
  HierarchyMeasure,
  Label,
  Legend,
  Page,
  Theme,
  Tooltip,
} from '../../properties'

/**
 * @description 层级桑基图，用于展示层级流向数据，通过树形节点与流向连线表示层级关系与流量大小
 * 适用场景:
 * - 展示从上游到下游的层级流转关系
 * - 强调树形结构中的流量分配与路径传递
 * @encoding
 * 层级桑基图支持以下视觉通道:
 * `hierarchy`: 层级通道, 支持`多个维度`
 * `size`: 大小通道, 支持`一个指标`
 * `label`: 标签通道, 支持`多个维度`与 `多个指标`
 * `tooltip`: 提示通道, 支持`多个维度`与 `多个指标`
 * @warning
 * 数据要求:
 * - 至少1个维度字段用于构造层级结构
 * - 至少1个数值字段（度量）用于映射流量大小
 * - advanced pipeline 需要将 tidyData 转换为 VChart 支持的树形 children 结构
 */
export interface HierarchySankey {
  /**
   * 层级桑基图
   * @description 层级桑基图，展示层级结构中的流向关系和流量大小
   * @type {'hierarchySankey'}
   * @example 'hierarchySankey'
   */
  chartType: 'hierarchySankey'

  /**
   * 数据集
   * @description 符合 TidyData 规范且已经聚合的数据集，用于定义图表的数据来源和结构
   * @type {Array<Record<string|number, any>>}
   * @example [{region: '华北', province: '河北', value: 30}, {region: '华南', province: '广东', value: 70}]
   */
  dataset: Dataset

  /**
   * 维度
   * @description 维度配置，用于定义层级结构，支持 hierarchy / label / tooltip 通道
   * @example [{id: 'region', alias: '区域'}, {id: 'province', alias: '省份'}]
   */
  dimensions?: HierarchyDimension[]

  /**
   * 指标
   * @description 指标配置，用于定义流量大小，支持 size / label / tooltip 通道
   * @example [{id: 'value', alias: '流量'}]
   */
  measures?: HierarchyMeasure[]

  /**
   * 分页配置
   * @description 用于指定分页的字段名, 必须是维度
   */
  page?: Page

  /**
   * 图表的背景颜色
   * @default transparent 默认为透明背景
   * @description 背景颜色可以是颜色字符串, 例如 'red', 'blue', 也可以是 hex, rgb 或 rgba, 如 '#ff0000', 'rgba(255,0,0,0.5)'
   */
  backgroundColor?: BackgroundColor

  /**
   * 颜色
   * @description 颜色配置, 用于定义图表的颜色方案, 包括颜色列表, 颜色映射, 颜色渐变等
   */
  color?: Color

  /**
   * 标签
   * @description 标签配置, 用于定义图表的数据标签, 包括位置, 格式, 样式等
   */
  label?: Label

  /**
   * 图例
   * @description 图例配置, 用于定义层级桑基图颜色图例的显示、位置与样式
   */
  legend?: Legend

  /**
   * 提示信息
   * @description 提示信息配置, 用于定义图表的提示信息, 包括内容, 格式, 样式等
   */
  tooltip?: Tooltip

  /**
   * 图表的主题
   * @default light 默认为亮色主题
   * @description 内置 light 与 dark 两种主题, 用户可以通过 Builder 自定义主题
   * @example 'dark'
   * @example 'light'
   */
  theme?: Theme

  /**
   * 语言
   * @description 图表语言配置, 支持 'zh-CN' 与 'en-US' 两种语言
   * @default 'zh-CN'
   */
  locale?: Locale
}
