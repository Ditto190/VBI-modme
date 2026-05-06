import type { IBarChartSpec } from '@visactor/vchart'
import type { VChartSpecPipe, StackCornerRadius } from 'src/types'
import { createStackCornerRadius, hasMoveInAnimation } from './stackCornerRadiusUtils'

const hasBarMoveInAnimation = (spec: IBarChartSpec): boolean => {
  return [spec.animationAppear, spec.animationNormal, spec.animationEnter, spec.animationUpdate].some(
    hasMoveInAnimation,
  )
}

export const stackCornerRadius: VChartSpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const stackCornerRadius = advancedVSeed.config?.[chartType as 'column']?.stackCornerRadius as StackCornerRadius

  if (chartType === 'dualAxis' && (spec as any).type !== 'bar') {
    return spec
  }

  const stackCornerRadiusCallback = createStackCornerRadius(stackCornerRadius)

  if (!hasBarMoveInAnimation(spec as IBarChartSpec)) {
    return { ...spec, stackCornerRadius: stackCornerRadiusCallback } as IBarChartSpec
  }

  // VChart implements stackCornerRadius with a final-position clipPath, which clips moveIn.
  return {
    ...spec,
    bar: {
      ...(spec as IBarChartSpec).bar,
      style: {
        ...(spec as IBarChartSpec).bar?.style,
        cornerRadius: stackCornerRadiusCallback,
      },
    },
  } as IBarChartSpec
}
