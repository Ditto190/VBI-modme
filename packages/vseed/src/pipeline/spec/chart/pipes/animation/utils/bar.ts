import { VScreenAnimationType } from '../types'
import { fadeInBar, growBar, moveInBar } from './barMotion'

export { atmoColorToFill, atmoColorToStroke, transform2VChartColor } from './barColor'
export { getGroupCountFromSpec, groupHighLightBar } from './barGroup'
export { fadeInBar, growBar, isHorizontalBar, moveInBar, moveOutBar } from './barMotion'

/**
 * @description 根据循环动画效果类型生成柱图 normal 阶段动画配置。
 * @param effect 循环动画效果类型。
 * @param chartType 图表类型。
 * @param spec 当前 VChart spec。
 * @returns 柱图 normal 阶段动画配置。
 */
export const getLoopResult = (effect: string, chartType: string, spec: any) => {
  if (effect === VScreenAnimationType.growth) return growBar(chartType)
  if (effect === VScreenAnimationType.moveIn) return moveInBar(chartType, spec)
  if (effect === VScreenAnimationType.load) return fadeInBar()
  return {}
}
