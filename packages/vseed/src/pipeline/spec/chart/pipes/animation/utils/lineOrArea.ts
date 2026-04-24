/**
 * @description 生成折线/面积路径从顶部增长进入的动画配置。
 * @returns 折线/面积路径增长动画配置。
 */
export const growthTopLine = () => ({ type: 'growPointsYIn', options: { orient: 'negative' } })

/**
 * @description 生成折线/面积点图元从顶部移入的动画配置。
 * @returns 折线/面积点图元移入动画配置。
 */
export const growthTopPoint = () => ({ type: 'moveIn', options: { direction: 'y', orient: 'negative' } })

/**
 * @description 生成曲线整体裁剪进入的动画配置，用于 load 效果。
 * @returns 曲线整体裁剪进入的动画配置。
 */
export const clipInLine = () => ({ type: 'clipIn', oneByOne: false })
