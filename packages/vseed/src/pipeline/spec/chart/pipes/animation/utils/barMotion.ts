import { ChartTypeEnum } from 'src/pipeline/utils'

const horizontalTypes = [ChartTypeEnum.Bar, ChartTypeEnum.BarParallel, ChartTypeEnum.BarPercent]

/**
 * @description 判断当前柱图类型是否为横向柱图。
 * @param chartType 图表类型。
 * @returns 是否为横向柱图。
 */
export const isHorizontalBar = (chartType: string): boolean => horizontalTypes.includes(chartType as any)

/**
 * @description 生成柱图增长动画的 options，横向按宽度增长，纵向按高度反向增长。
 * @param isHorizontal 是否为横向柱图。
 * @returns 柱图增长动画 options 生成函数。
 */
const getBarGrowOptions = (isHorizontal: boolean) => (_datum: any, _element: any, _opt: any, context: any) => {
  const overall = context.vchart.getChart().getComponentsByType('cartesianAxis-linear')[0]._scale.range()[0]
  return isHorizontal ? { overall } : { orient: 'negative', overall }
}

/**
 * @description 生成柱图增长入场动画配置。
 * @param chartType 图表类型。
 * @returns 柱图增长入场动画配置。
 */
export const growBar = (chartType: string) => {
  const isHorizontal = isHorizontalBar(chartType)
  return {
    type: isHorizontal ? 'growWidthIn' : 'growHeightIn',
    oneByOne: false,
    options: getBarGrowOptions(isHorizontal),
    controlOptions: { immediatelyApply: true },
  }
}

/**
 * @description 生成柱图逐个淡入的动画配置。
 * @returns 柱图淡入动画配置。
 */
export const fadeInBar = () => ({ type: 'fadeIn', oneByOne: true })

/**
 * @description 为柱图数据补充随机 dataKey，确保每根柱子按独立图元执行动画。
 * @param spec 当前 VChart spec。
 * @returns 无返回值，直接修改 spec。
 */
const setRandomDataKey = (spec: any) => {
  if (!spec?.data?.[0]?.values) return
  const dataKey = 'dataKey'
  spec.data[0].values.forEach((datum: any) => (datum[dataKey] = Math.random()))
  spec.dataKey = dataKey
  if (spec.type === 'common' && Array.isArray(spec.series)) {
    spec.series.forEach((series: any) => (series.dataKey = dataKey))
  }
}

/**
 * @description 生成柱图移入/移出的方向、位移点和通道配置。
 * @param chartType 图表类型。
 * @param orient 移动方向，in 表示移入，out 表示移出。
 * @returns 柱图移动动画 options。
 */
const getBarMoveOptions = (chartType: string, orient: 'in' | 'out') => {
  const direction = isHorizontalBar(chartType) ? 'y' : 'x'
  const size = direction === 'x' ? 'width' : 'height'
  const offsetSign = orient === 'in' ? 1 : -1

  return {
    direction,
    orient: 'negative',
    point: (_datum: any, element: any, opt: any) => ({
      [direction]: element.getGraphicAttribute(direction) + offsetSign * opt[size],
    }),
  }
}

/**
 * @description 生成柱图从画布外移入的动画配置。
 * @param chartType 图表类型。
 * @param spec 当前 VChart spec。
 * @param isUpdate 是否为 update 阶段动画。
 * @returns 柱图移入动画配置。
 */
export const moveInBar = (chartType: string, spec?: any, isUpdate = false) => {
  if (!isUpdate && spec) setRandomDataKey(spec)
  const excludeChannels = isHorizontalBar(chartType) ? ['x'] : ['y']
  return { type: 'moveIn', options: { ...getBarMoveOptions(chartType, 'in'), excludeChannels } }
}

/**
 * @description 生成柱图移出画布的动画配置。
 * @param chartType 图表类型。
 * @returns 柱图移出动画配置。
 */
export const moveOutBar = (chartType: string) => ({ type: 'moveOut', options: getBarMoveOptions(chartType, 'out') })
