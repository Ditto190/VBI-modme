import type { IBarChartSpec } from '@visactor/vchart'
import { selector, selectorWithDynamicFilter } from 'src/dataSelector'
import type { BarStyle, Datum, VChartSpecPipe } from 'src/types'
import { compileMarkStyles } from './compileMarkStyles'

export const barStyle: VChartSpecPipe = (spec, { advancedVSeed }) => {
  const bar = compileMarkStyles(
    advancedVSeed.markStyle.barStyle as BarStyle | BarStyle[] | undefined,
    ({
      barBorderColor,
      barBorderStyle,
      barBorderWidth = 1,
      barColor,
      barColorOpacity,
      barBorderOpacity,
      barRadius,
      barVisible = true,
    }) => ({
      visible: barVisible,
      fill: barColor,
      fillOpacity: barColorOpacity,
      cornerRadius: barRadius,
      lineWidth: barBorderWidth,
      stroke: barBorderColor,
      strokeOpacity: barBorderOpacity,
      lineDash: barBorderStyle === 'dashed' ? [5, 2] : barBorderStyle === 'dotted' ? [2, 5] : [0, 0],
    }),
    (rule) => (datum: Datum) =>
      rule.dynamicFilter
        ? selectorWithDynamicFilter(datum, rule.dynamicFilter, rule.selector)
        : selector(datum, rule.selector),
  )
  return {
    ...spec,
    bar: {
      style: { visible: true, fillOpacity: 1, lineWidth: advancedVSeed.dataset.length <= 100 ? 1 : 0, ...bar.style },
      state: { hover: { fillOpacity: 0.6 }, ...bar.state },
    },
  } as IBarChartSpec
}
