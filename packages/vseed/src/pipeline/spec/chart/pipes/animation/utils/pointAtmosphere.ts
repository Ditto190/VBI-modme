import { VScreenAnimationType, type AnimationEffect } from '../types'

const EFFECT_NONE = VScreenAnimationType.none

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
export const atmospherePoint = (effect?: AnimationEffect) => {
  if (effect === EFFECT_NONE) {
    return {}
  }
  if (effect === 'breath') {
    return {
      channel: {
        scaleX: {
          from: 0.8,
          to: 2,
        },
        scaleY: {
          from: 0.8,
          to: 2,
        },
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
    custom: (ratio: number, from: any, to: any, out: any, graphic: any) => {
      graphic.attribute.strokeOpacity = ratio * (to.strokeOpacity - from.strokeOpacity) + from.strokeOpacity
      graphic.attribute.outerBorder = {
        distance: ratio * (to.outerBorder.distance - from.outerBorder.distance) + from.outerBorder.distance,
        strokeOpacity:
          ratio * (to.outerBorder.strokeOpacity - from.outerBorder.strokeOpacity) + from.outerBorder.strokeOpacity,
        stroke: to.outerBorder.stroke,
      }
    },
  }
}
