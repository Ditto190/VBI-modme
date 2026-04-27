import type {
  BarLikeLoopAnimation,
  LineAreaLoopAnimation,
  NoEffectAtmosphereConfig,
  PieLikeLoopAnimation,
  PointAtmosphereConfig,
  ScatterLoopAnimation,
} from './animationConfig'

export interface BarLikeAnimationLoop {
  /** @description 是否启用循环动画 */
  enable?: boolean
  /** @description 循环动画间隔，单位为毫秒 */
  interval?: number
  /** @description 条形/柱形图循环动画配置 */
  loop?: BarLikeLoopAnimation
  /** @description 条形/柱形图氛围动画配置 */
  atmosphere?: PointAtmosphereConfig
}

export interface LineAreaAnimationLoop {
  /** @description 是否启用循环动画 */
  enable?: boolean
  /** @description 循环动画间隔，单位为毫秒 */
  interval?: number
  /** @description 折线/面积图循环动画配置 */
  loop?: LineAreaLoopAnimation
  /** @description 折线/面积图氛围动画配置 */
  atmosphere?: PointAtmosphereConfig
}

export interface ScatterAnimationLoop {
  /** @description 是否启用循环动画 */
  enable?: boolean
  /** @description 循环动画间隔，单位为毫秒 */
  interval?: number
  /** @description 散点图循环动画配置 */
  loop?: ScatterLoopAnimation
  /** @description 散点图氛围动画配置 */
  atmosphere?: PointAtmosphereConfig
}

export interface PieLikeAnimationLoop {
  /** @description 是否启用循环动画 */
  enable?: boolean
  /** @description 循环动画间隔，单位为毫秒 */
  interval?: number
  /** @description 饼图/环图/玫瑰图循环动画配置 */
  loop?: PieLikeLoopAnimation
  /** @description 饼图/环图/玫瑰图氛围动画配置 */
  atmosphere?: NoEffectAtmosphereConfig
}

export interface RadarAnimationLoop {
  /** @description 是否启用循环动画 */
  enable?: boolean
  /** @description 循环动画间隔，单位为毫秒 */
  interval?: number
  /** @description 雷达图氛围动画配置 */
  atmosphere?: PointAtmosphereConfig
}
