import { ChartTypeEnum } from 'src/pipeline/utils'
import {
  VScreenAnimationType,
  type PieLikeAppearConfig,
  type PieLikeLoopConfig,
  type PieLikeUpdateConfig,
} from './types'
import { allowAnimation, getPrimaryEffect } from './utils'
import { radialPie, scalePie } from './utils/pie'

/**
 * 饼图/环图/玫瑰图 入场动画
 * 动画类型:
 * 1. radial: 角度展开动画
 * 效果：pie/rose 按扇区角度展开。
 * 编排逻辑：pie/rose 同步使用 growAngleIn, rose 额外补 preset = growAngle。
 * 2. scale: 半径展开动画
 * 效果：pie/rose 按半径从内向外展开。
 * 编排逻辑：pie/rose 同步使用 growRadiusIn, 共用 appear 的 easing 和 duration。
 */
export const pieAppear = (config: PieLikeAppearConfig | undefined, chartType: string) => {
  if (!config || !allowAnimation(config)) {
    return false
  }

  const { effects, ease, duration } = config
  const effect = effects?.[0]
  const durationMs = (duration ?? 1) * 1000

  let configByType = {}
  if (effect === VScreenAnimationType.radial) {
    configByType = radialPie()
  } else if (effect === VScreenAnimationType.scale) {
    configByType = scalePie()
  }

  const result = {
    pie: {
      ...configByType,
      easing: ease,
      duration: durationMs,
    },
    rose: {
      ...configByType,
      easing: ease,
      duration: durationMs,
    },
  } as any

  if (chartType === ChartTypeEnum.Rose && effect === VScreenAnimationType.radial) {
    result.preset = 'growAngle'
  }
  return result
}

/**
 * 饼图/环图/玫瑰图 更新动画
 * 动画类型:
 * 1. default: 默认更新动画
 * 效果：pie/rose 使用 VChart 默认补间。
 * 编排逻辑：不指定角度或半径动画, 避免和 normal 阶段的通道动画冲突。
 */
export const pieUpdate = (config: PieLikeUpdateConfig | undefined) => {
  if (!config || !allowAnimation(config)) {
    return false
  }

  const { ease, duration } = config
  const durationMs = (duration ?? 1) * 1000

  // 用默认的补间效果即可
  return {
    pie: {
      easing: ease,
      duration: durationMs,
    },
    rose: {
      easing: ease,
      duration: durationMs,
    },
  }
}

/**
 * 饼图/环图/玫瑰图 新数据进入动画
 * 动画类型:
 * 1. default: 默认 enter 动画
 * 效果：新数据使用 VChart 默认 enter 补间。
 * 编排逻辑：pie/rose 共用 update 的 easing 和 duration。
 * 2. enlarge + rose: 淡入 enter 动画
 * 效果：rose 新数据使用 fadeIn。
 * 编排逻辑：当 normal 的 loop 效果为 enlarge 时启用, 避免 enter 和 enlarge 同时争用 outerRadius 通道。
 */
export const pieEnter = (config: PieLikeUpdateConfig | undefined, atmoConfig: PieLikeLoopConfig | undefined) => {
  if (!config || !allowAnimation(config)) {
    return false
  }
  const { ease, duration } = config
  const durationMs = (duration ?? 1) * 1000
  // 当normal动画存在且为radius时:
  // 玫瑰图enter不能用默认, 这样会和normal动画的radius视觉通道冲突
  let configByType = {}
  if (atmoConfig?.enable && getPrimaryEffect(atmoConfig.loop) === VScreenAnimationType.enlarge) {
    configByType = {
      type: 'fadeIn', // 具体类型可以根据视觉效果自定
    }
  }
  return {
    pie: {
      easing: ease,
      duration: durationMs,
    },
    rose: {
      ...configByType,
      easing: ease,
      duration: durationMs,
    },
  }
}

/**
 * 饼图/环图/玫瑰图 循环动画
 * 动画类型:
 * 1. enlarge: 半径放大动画
 * 效果：扇区 outerRadius 放大 10px 后恢复。
 * 编排逻辑：startTime = appear 存在 ? interval : 0, 前半段放大, 后半段恢复, oneByOne 错峰执行。
 * 2. relocate: 扇区偏移动画
 * 效果：扇区沿中心角方向向外偏移后恢复。
 * 编排逻辑：前半段计算 x/y 偏移, 后半段回到原始 x/y, 一轮结束后等待 interval。
 */
export const pieLoop = (config: PieLikeLoopConfig | undefined, ignoreFirstNormal: boolean) => {
  if (!config?.enable) {
    return false
  }
  const { loop, interval = 0 } = config
  let loopResult = {}

  // 轮播动画
  // const startTime = 0
  const startTime = ignoreFirstNormal ? interval * 1000 : 0
  const { effects: loopEffects = [], ease: loopEase } = loop ?? {}
  const loopDuration = 1
  const loopEffect = loopEffects[0]
  if (loopEffect === VScreenAnimationType.enlarge) {
    loopResult = [
      {
        channel: {
          outerRadius: {
            from: (...p: any[]) => {
              return p[1].attribute.outerRadius
            },
            to: (...p: any[]) => {
              return p[1].attribute.outerRadius + 10
            },
          },
        },
        startTime,
        oneByOne: loopDuration * 1000, // true -> loopDuration * 1000, 原理有待考究
        duration: (loopDuration / 2) * 1000,
        loop: true,
        easing: loopEase,
        delayAfter: (loopDuration / 2) * 1000 + interval * 1000,
        controlOptions: {
          immediatelyApply: false,
        },
      },
      {
        channel: {
          outerRadius: {
            from: (...p: any[]) => {
              return p[1].attribute.outerRadius + 10
            },
            to: (...p: any[]) => {
              return p[1].attribute.outerRadius
            },
          },
        },
        startTime,
        oneByOne: loopDuration * 1000, // true -> loopDuration * 1000, 原理有待考究
        duration: (loopDuration / 2) * 1000,
        easing: loopEase,
        delay: (loopDuration / 2) * 1000,
        delayAfter: interval * 1000,
        loop: true,
        controlOptions: {
          immediatelyApply: false,
        },
      },
    ]
  } else if (loopEffect === VScreenAnimationType.relocate) {
    const offset = 10
    loopResult = [
      {
        channel: {
          x: {
            from: (...p: any[]) => {
              return p[1].attribute.x
            },
            to: (...p: any[]) => {
              const angle = (p[1].attribute.startAngle + p[1].attribute.endAngle) / 2
              return p[1].attribute.x + offset * Math.cos(angle)
            },
          },
          y: {
            from: (...p: any[]) => {
              return p[1].attribute.y
            },
            to: (...p: any[]) => {
              const angle = (p[1].attribute.startAngle + p[1].attribute.endAngle) / 2
              return p[1].attribute.y + offset * Math.sin(angle)
            },
          },
        },
        startTime,
        oneByOne: loopDuration * 1000, // true -> loopDuration * 1000, 原理有待考究
        duration: (loopDuration / 2) * 1000,
        loop: true,
        easing: loopEase,
        delayAfter: (loopDuration / 2) * 1000 + interval * 1000,
        controlOptions: {
          immediatelyApply: false,
        },
      },
      {
        channel: {
          x: {
            from: (...p: any[]) => {
              const angle = (p[1].attribute.startAngle + p[1].attribute.endAngle) / 2
              return p[1].attribute.x + offset * Math.cos(angle)
            },
            to: (...p: any[]) => {
              return p[1].attribute.x
            },
          },
          y: {
            from: (...p: any[]) => {
              const angle = (p[1].attribute.startAngle + p[1].attribute.endAngle) / 2
              return p[1].attribute.y + offset * Math.sin(angle)
            },
            to: (...p: any[]) => {
              return p[1].attribute.y
            },
          },
        },
        startTime,
        oneByOne: loopDuration * 1000, // true -> loopDuration * 1000, 原理有待考究
        duration: (loopDuration / 2) * 1000,
        easing: loopEase,
        delay: (loopDuration / 2) * 1000,
        delayAfter: interval * 1000,
        loop: true,
        controlOptions: {
          immediatelyApply: false,
        },
      },
    ]
  }

  return {
    pie: loopResult,
    rose: loopResult,
  }
}

/**
 * 饼图/环图/玫瑰图 离场动画
 * 动画类型:
 * 1. none: 无离场动画
 * 效果：不配置自定义 exit。
 * 编排逻辑：返回 false, 关闭该阶段动画配置。
 */
export const pieExit = () => {
  return false
}
