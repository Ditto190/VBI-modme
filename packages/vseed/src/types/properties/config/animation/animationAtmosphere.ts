export type PointAtmosphereEffect = 'ripple' | 'reveal' | 'breath'

export interface PointAtmosphereConfig {
  /** @description 氛围动画缓动函数 */
  ease?: string
  /** @description 氛围动画颜色 */
  color?: string
  /** @description 氛围动画效果，支持涟漪、显隐和呼吸 */
  effect?: PointAtmosphereEffect
}

export interface NoEffectAtmosphereConfig {
  /** @description 氛围动画缓动函数 */
  ease?: string
  /** @description 氛围动画颜色 */
  color?: string
}
