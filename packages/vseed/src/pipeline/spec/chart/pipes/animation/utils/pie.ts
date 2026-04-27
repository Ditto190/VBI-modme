/**
 * @description 生成饼图/玫瑰图按角度展开的入场动画配置。
 * @returns 饼图/玫瑰图角度展开动画配置。
 */
export const radialPie = () => ({ type: 'growAngleIn' })

/**
 * @description 生成饼图/玫瑰图按半径展开的入场动画配置。
 * @returns 饼图/玫瑰图半径展开动画配置。
 */
export const scalePie = () => ({ type: 'growRadiusIn' })
