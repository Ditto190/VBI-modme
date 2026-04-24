import { VScreenAnimationType, type AnimationEffect, type AnimationEffectConfig } from '../types'

export const EFFECT_NONE = VScreenAnimationType.none

/**
 * @description 将秒转换为 VChart 动画使用的毫秒。
 * @param seconds 秒数。
 * @returns 毫秒数。
 */
export const toMs = (seconds?: number): number => (seconds ?? 0) * 1000

/**
 * @description 获取配置中的首个动画效果；未配置时返回 none。
 * @param config 动画效果配置。
 * @returns 首个动画效果。
 */
export const getPrimaryEffect = (config?: AnimationEffectConfig): AnimationEffect => config?.effects?.[0] ?? EFFECT_NONE

/**
 * @description 判断通用动画配置是否开启且首个效果不是 none。
 * @param config 动画效果配置。
 * @returns 是否允许执行动画。
 */
export const allowAnimation = (config?: AnimationEffectConfig): boolean => {
  if (!config?.enable) {
    return false
  }
  return getPrimaryEffect(config) !== EFFECT_NONE
}

/**
 * @description 判断折线/面积动画是否开启；这类图表以最后一个效果作为有效性判断。
 * @param config 动画效果配置。
 * @returns 是否允许执行折线/面积动画。
 */
export const allowLineOrAreaAnimation = (config?: AnimationEffectConfig): boolean => {
  if (!config?.enable) {
    return false
  }
  const effects = config.effects ?? []
  const effect = effects[effects.length - 1] ?? EFFECT_NONE
  return effect !== EFFECT_NONE
}

/**
 * @description 获取图元最终属性，优先读取动画后的 finalAttribute。
 * @param mark VChart 图元对象。
 * @returns 图元最终属性。
 */
export const getFinalAttribute = (mark: any): Record<string, any> => {
  return mark?.finalAttribute ?? mark?.attribute ?? {}
}

/**
 * @description 生成点图元氛围动画配置，复用于折线、面积、散点和雷达图。
 * @param effect 氛围动画效果。
 * @returns 点图元氛围动画配置。
 */
export const atmoPoint = (effect?: AnimationEffect) => {
  if (effect === EFFECT_NONE) {
    return {}
  }
  if (effect === 'breath') {
    return {
      channel: {
        scaleX: { from: 0.8, to: 1.2 },
        scaleY: { from: 0.8, to: 1.2 },
      },
    }
  }
  if (effect === 'reveal') {
    return {
      channel: {
        fillOpacity: { from: 0.6, to: 1 },
        strokeOpacity: { from: 0.6, to: 1 },
      },
    }
  }
  return {
    channel: {
      outerBorder: {
        from: { distance: 0, strokeOpacity: 1 },
        // 波纹描边沿用图元填充色，避免自定义配色下出现突兀色值。
        to: (...args: any[]) => ({
          distance: 16,
          strokeOpacity: 1e-8,
          stroke: args[1]?.attribute?.fill,
        }),
      },
    },
  }
}
