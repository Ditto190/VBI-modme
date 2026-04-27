import { StreamLight } from '@visactor/vchart'
import type { BarLikeAppearConfig, BarLikeLoopConfig, BarLikeUpdateConfig } from './types'
import { VScreenAnimationType } from './types'
import { allowAnimation, getPrimaryEffect, toMs } from './utils'
import {
  fadeInBar,
  getGroupCountFromSpec,
  getLoopResult,
  groupHighLightBar,
  growBar,
  isHorizontalBar,
  moveInBar,
  moveOutBar,
  transform2VChartColor,
} from './utils/bar'

/**
 * 柱图/条形图 入场动画
 * 动画类型:
 * 1. growth: 生长动画
 * 效果：横向柱使用宽度增长, 纵向柱使用高度增长。
 * 编排逻辑：仅作用于 bar mark, 使用 appear 的 easing 和 duration。
 * 2. load: 加载动画
 * 效果：使用逐个淡入, 让柱子按图元顺序出现。
 * 编排逻辑：仅作用于 bar mark, 使用 appear 的 easing 和 duration。
 * 3. 其他: 默认入场动画
 * 效果：不指定额外动画 type, 交给 VChart 默认入场补间。
 * 编排逻辑：仅保留 easing 和 duration。
 */
export const barAppear = (config: BarLikeAppearConfig | undefined, chartType: string) => {
  if (!allowAnimation(config)) return false
  const effect = getPrimaryEffect(config)
  const configByType =
    effect === VScreenAnimationType.growth
      ? growBar(chartType)
      : effect === VScreenAnimationType.load
        ? fadeInBar()
        : {}
  return { bar: { ...configByType, easing: config?.ease, duration: toMs(config?.duration ?? 1) } }
}

/**
 * 柱图/条形图 更新动画
 * 动画类型:
 * 1. moveIn: 移入动画
 * 效果：update 阶段沿柱图方向从画布外移入。
 * 编排逻辑：复用移入方向, 但不再补随机 dataKey, 只作用于 bar mark。
 * 2. 其他: 默认更新动画
 * 效果：使用 VChart 默认更新补间。
 * 编排逻辑：只保留 easing 和 duration, 不影响轴、标签等其他组件。
 */
export const barUpdate = (config: BarLikeUpdateConfig | undefined, chartType: string, spec?: any) => {
  if (!allowAnimation(config)) return false
  const effect = getPrimaryEffect(config)
  const configByType = effect === VScreenAnimationType.moveIn ? moveInBar(chartType, spec, true) : {}
  return { bar: { ...configByType, easing: config?.ease, duration: toMs(config?.duration ?? 1) } }
}

/**
 * 柱图/条形图 循环动画
 * 动画类型:
 * 1. highLight: 分组高亮动画
 * 效果：按类目分组依次切换高亮填充和描边。
 * 编排逻辑：startTime = appear 存在 ? interval : 0, loopDuration = groupDuration * groupCount + stopDuration, 一轮结束后等待 interval。
 * 2. growth/moveIn/load: mark 循环动画
 * 效果：复用对应的柱图 mark 动画。
 * 编排逻辑：先执行 loopDuration, 再等待 interval + atmosphereDuration 后重复。
 * 3. atmosphere: 流光氛围动画
 * 效果：使用 StreamLight 在柱子上形成流光。
 * 编排逻辑：延迟 loopDuration 后启动, 持续 atmosphereDuration, 一轮结束后等待 interval。
 */
export const barLoop = (
  config: BarLikeLoopConfig | undefined,
  ignoreFirstNormal: boolean,
  chartType: string,
  spec?: any,
) => {
  if (!config?.enable) return false
  const interval = config.interval ?? 0
  const startTime = ignoreFirstNormal ? toMs(interval) : 0
  const loop = config.loop
  const atmosphere = config.atmosphere
  const loopEffect = getPrimaryEffect(loop)
  const result: any[] = []
  let loopDuration = loopEffect === VScreenAnimationType.none ? 0 : 1
  const atmosphereDuration = loopEffect === VScreenAnimationType.none ? 2 : 1

  if (loopEffect === VScreenAnimationType.highLight && loop) {
    const groupDuration = 0.7
    const stopDuration = 0.85
    loopDuration = groupDuration * getGroupCountFromSpec(spec).groupCount + stopDuration
    result.push(
      ...groupHighLightBar(
        startTime,
        loop,
        loopDuration,
        interval,
        atmosphereDuration,
        isHorizontalBar(chartType),
        spec,
      ),
    )
  } else if (loop) {
    result.push({
      ...getLoopResult(loopEffect, chartType, spec),
      startTime,
      easing: loop.ease,
      duration: toMs(loopDuration),
      delayAfter: toMs(interval + atmosphereDuration),
      loop: true,
      controlOptions: { immediatelyApply: false },
    })
  }

  if (atmosphere?.ease || atmosphere?.color) {
    result.push({
      loop: true,
      startTime,
      delay: toMs(loopDuration),
      delayAfter: toMs(interval),
      duration: toMs(atmosphereDuration),
      easing: atmosphere.ease,
      custom: StreamLight,
      customParameters: {
        isHorizontal: isHorizontalBar(chartType),
        attribute: {
          fill: transform2VChartColor(atmosphere.color),
          blur: 0,
          shadowColor: 'rgba(0,0,0,0)',
        },
      },
    })
  }

  return result.length > 0 ? { bar: result } : false
}

/**
 * 柱图/条形图 离场动画
 * 动画类型:
 * 1. moveIn: 反向移出动画
 * 效果：沿柱图进入方向反向移出画布。
 * 编排逻辑：只有 update 效果为 moveIn 时才补充 moveOut。
 * 2. 其他: 默认离场动画
 * 效果：不配置自定义 exit。
 * 编排逻辑：返回空配置, 由 VChart 默认行为处理。
 */
export const barExit = (config: BarLikeUpdateConfig | undefined, chartType: string) => {
  if (!allowAnimation(config)) return false
  if (getPrimaryEffect(config) !== VScreenAnimationType.moveIn) return {}
  return { bar: { ...moveOutBar(chartType), duration: 1000 } }
}
