import type { VChartSpecPipe } from 'src/types'
import type {
  BarLikeAnimation,
  ChartAnimationByChartType,
  LineAreaAnimation,
  PieLikeAnimation,
  RadarAnimation,
  ScatterAnimation,
  SupportedAnimationChartType,
} from './types'
import { allowAnimation } from './utils'
import { barAppear, barExit, barLoop, barUpdate } from './bar'
import { lineOrAreaAppear, lineOrAreaExit, lineOrAreaLoop, lineOrAreaUpdate } from './lineOrArea'
import { pieAppear, pieEnter, pieExit, pieLoop, pieUpdate } from './pie'
import { radarAppear, radarExit, radarLoop, radarUpdate } from './radar'
import { scatterAppear, scatterExit, scatterLoop, scatterUpdate } from './scatter'

const barFamily = ['bar', 'barPercent', 'barParallel', 'column', 'columnPercent', 'columnParallel']
const pieFamily = ['pie', 'donut', 'rose', 'roseParallel']
const lineFamily = ['line', 'area', 'areaPercent']

/**
 * 图表动画总编排入口
 * 动画类型:
 * 1. appear: 入场动画
 * 效果：图表首次渲染时执行对应图表族的入场效果。
 * 编排逻辑：按 chartType 分流到柱图、折线/面积、饼图、散点图、雷达图各自的 appear 构建函数。
 * 2. normal: 循环动画
 * 效果：图表稳定展示后重复执行 loop/atmosphere 效果。
 * 编排逻辑：appear 存在时 normal 延后一个 interval 启动, 避免首次入场和循环动画叠加。
 * 3. enter/update/exit: 数据变更动画
 * 效果：数据进入、更新和离场时执行对应阶段动画。
 * 编排逻辑：enter/update 通常共用更新动画配置, exit 独立处理离场动画。
 */
export const animation: VChartSpecPipe = (spec, context) => {
  const { chartType, config } = context.advancedVSeed
  const nextSpec = { ...spec }
  const animationChartType = chartType as SupportedAnimationChartType
  const chartConfig = config?.[animationChartType as keyof typeof config] as
    | { animation?: ChartAnimationByChartType<typeof animationChartType> }
    | undefined
  const animationConfig = chartConfig?.animation

  if (!animationConfig?.enable) {
    ;(nextSpec as any).animation = false
    return nextSpec
  }

  const params = animationConfig.params
  const appear = params?.appear
  const ignoreFirstNormal = allowAnimation(appear)
  let animationAppear: any = false
  let animationNormal: any = false
  let animationEnter: any = false
  let animationUpdate: any = false
  let animationExit: any = false

  if (barFamily.includes(chartType)) {
    const barParams = params as BarLikeAnimation['params']
    animationAppear = barAppear(barParams?.appear, chartType)
    animationNormal = barLoop(barParams?.loop, ignoreFirstNormal, chartType, nextSpec)
    animationEnter = barUpdate(barParams?.update, chartType, nextSpec)
    animationUpdate = animationEnter
    animationExit = barExit(barParams?.update, chartType)
  } else if (lineFamily.includes(chartType)) {
    const lineParams = params as LineAreaAnimation['params']
    animationAppear = lineOrAreaAppear(lineParams?.appear)
    animationNormal = lineOrAreaLoop(lineParams?.loop, ignoreFirstNormal)
    animationEnter = lineOrAreaUpdate(lineParams?.update)
    animationUpdate = animationEnter
    animationExit = lineOrAreaExit(lineParams?.update)
  } else if (pieFamily.includes(chartType)) {
    const pieParams = params as PieLikeAnimation['params']
    animationAppear = pieAppear(pieParams?.appear, chartType)
    animationNormal = pieLoop(pieParams?.loop, ignoreFirstNormal)
    animationEnter = pieEnter(pieParams?.update, pieParams?.loop)
    animationUpdate = pieUpdate(pieParams?.update)
    animationExit = pieExit()
  } else if (chartType === 'scatter') {
    const scatterParams = params as ScatterAnimation['params']
    animationAppear = scatterAppear(scatterParams?.appear)
    animationNormal = scatterLoop(scatterParams?.loop, ignoreFirstNormal)
    animationEnter = scatterUpdate(scatterParams?.update)
    animationUpdate = animationEnter
    animationExit = scatterExit(scatterParams?.update)
  } else if (chartType === 'radar') {
    const radarParams = params as RadarAnimation['params']
    animationAppear = radarAppear(radarParams?.appear)
    animationNormal = radarLoop(radarParams?.loop, ignoreFirstNormal)
    animationEnter = radarUpdate(radarParams?.update)
    animationUpdate = animationEnter
    animationExit = radarExit(radarParams?.update)
  }

  return {
    ...nextSpec,
    animation: true,
    animationAppear,
    animationNormal,
    animationEnter,
    animationUpdate,
    animationExit,
  }
}
