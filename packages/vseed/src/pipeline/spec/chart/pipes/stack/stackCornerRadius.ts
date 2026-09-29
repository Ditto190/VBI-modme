import type { IBarChartSpec } from '@visactor/vchart'
import type { VChartSpecPipe, StackCornerRadius, BarStyle } from 'src/types'
import { createBarCornerRadius, createStackCornerRadius, hasMoveInAnimation } from './stackCornerRadiusUtils'

const hasBarMoveInAnimation = (spec: IBarChartSpec): boolean => {
  return [spec.animationAppear, spec.animationNormal, spec.animationEnter, spec.animationUpdate].some(
    hasMoveInAnimation,
  )
}

export const stackCornerRadius: VChartSpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const stackCornerRadius = advancedVSeed.config?.[chartType as 'column']?.stackCornerRadius as StackCornerRadius

  const styles = advancedVSeed.markStyle?.barStyle
  const rules = (Array.isArray(styles) ? styles : styles ? [styles] : []) as BarStyle[]
  // A stack clip would trim explicit per-bar corners, including conditional rules.
  if (stackCornerRadius == null || rules.some((rule) => rule.barRadius != null)) {
    return spec
  }

  const singleSeries = advancedVSeed.datasetReshapeInfo?.[0]?.unfoldInfo.colorItems.length === 1

  if (!singleSeries && !hasBarMoveInAnimation(spec as IBarChartSpec)) {
    return { ...spec, stackCornerRadius: createStackCornerRadius(stackCornerRadius) } as IBarChartSpec
  }

  // A single series needs no stack clip; a final-position clip also cuts off moveIn.
  return {
    ...spec,
    bar: {
      ...(spec as IBarChartSpec).bar,
      style: {
        ...(spec as IBarChartSpec).bar?.style,
        cornerRadius: createBarCornerRadius(stackCornerRadius),
      },
    },
  } as IBarChartSpec
}
