import tinycolor from 'tinycolor2'

const isGradient = (color: string) => color.includes('deg')
const splitLinearColor = (str: string) => str.split(', ')

/**
 * @description 将 DSL 中的线性渐变字符串转换为 VChart gradient 对象。
 * @param colorStr DSL 线性渐变字符串。
 * @returns VChart gradient 对象。
 */
const transformColor2Gradient = (colorStr: string) => {
  const [degStr, startColor, endColor] = splitLinearColor(colorStr)
  const deg = +degStr.slice(0, -3)
  const endX = Math.cos((deg / 180) * Math.PI)
  const endY = Math.sin((deg / 180) * Math.PI)

  return {
    gradient: 'linear',
    x0: endX < 0 ? Math.abs(endX) : 0,
    x1: endX > 0 ? endX : 0,
    y1: endY < 0 ? Math.abs(endY) : 0,
    y0: endY > 0 ? endY : 0,
    stops: [
      { offset: 0, color: startColor },
      { offset: 1, color: endColor },
    ],
  }
}

/**
 * @description 将普通色值或 DSL 渐变色统一转换为 VChart 可消费的颜色配置。
 * @param colorStr 普通色值或 DSL 渐变色。
 * @returns VChart 可消费的颜色配置。
 */
export const transform2VChartColor = (colorStr?: string) => {
  if (!colorStr) return colorStr
  return isGradient(colorStr) ? transformColor2Gradient(colorStr) : colorStr
}

/**
 * @description 从填充色推导更亮的描边色，用于柱图氛围高亮。
 * @param color 填充色。
 * @returns 推导后的描边色。
 */
const fillColorToStrokeColor = (color: string) => {
  return tinycolor(color).lighten(10).toRgbString()
}

/**
 * @description 生成柱图氛围高亮的填充色；渐变柱图会补齐透明度渐变。
 * @param color 高亮色。
 * @param isGradientChart 当前图表是否使用渐变填充。
 * @param isHorizontal 是否为横向柱图。
 * @returns 柱图氛围高亮填充色。
 */
export const atmoColorToFill = (color: string, isGradientChart: boolean, isHorizontal: boolean) => {
  if (isGradient(color)) return transformColor2Gradient(color)
  if (!isGradientChart) return color

  const deg = isHorizontal ? 90 : 0
  const start = tinycolor(color).setAlpha(0.2).toRgbString()
  const end = tinycolor(color).setAlpha(1).toRgbString()
  return transformColor2Gradient(`${deg}deg, ${start}, ${end}`)
}

/**
 * @description 生成柱图氛围高亮的描边色；渐变柱图会补齐透明度渐变。
 * @param color 高亮色。
 * @param isGradientChart 当前图表是否使用渐变填充。
 * @param isHorizontal 是否为横向柱图。
 * @returns 柱图氛围高亮描边色。
 */
export const atmoColorToStroke = (color: string, isGradientChart: boolean, isHorizontal: boolean) => {
  if (isGradient(color)) return transformColor2Gradient(color)
  if (!isGradientChart) return color

  const deg = isHorizontal ? 90 : 0
  const base = fillColorToStrokeColor(color)
  const start = tinycolor(base).setAlpha(0.2).toRgbString()
  const end = tinycolor(base).setAlpha(1).toRgbString()
  return transformColor2Gradient(`${deg}deg, ${start}, ${end}`)
}
