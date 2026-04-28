import type { ILineChartSpec, IMarkLineSpec } from '@visactor/vchart'
import type { VChartSpecPipe } from 'src/types'
import { isArray, isNumber, isString } from 'remeda'
import { ANNOTATION_Z_INDEX } from '../../../../utils/constant'
import { getAnnotationLineDash, resolveAnnotationValue } from './utils'

export const annotationVerticalLine: VChartSpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { annotation, config } = advancedVSeed

  if (!annotation || !annotation.annotationVerticalLine) {
    return spec
  }

  const theme = config?.[vseed.chartType as 'column']?.annotation?.annotationVerticalLine
  const { annotationVerticalLine } = annotation
  const annotationVerticalLineList = Array.isArray(annotationVerticalLine)
    ? annotationVerticalLine
    : [annotationVerticalLine]

  const positionMap = {
    outsideStart: 'start',
    outsideEnd: 'end',
    outsideMiddle: 'middle',
    insideStart: 'insideStartTop',
    insideMiddle: 'insideMiddleTop',
    insideEnd: 'insideEndTop',
  }
  const markLine = annotationVerticalLineList.flatMap((annotationVerticalLine) => {
    const {
      xValue,
      dynamicFilter,
      text = '',
      textPosition = 'insideEnd',
      textColor = theme?.textColor ?? '#ffffff',
      textFontSize = theme?.textFontSize ?? 12,
      textFontWeight = theme?.textFontWeight ?? 400,
      textAlign = 'center',
      textBaseline = 'top',

      lineColor = theme?.lineColor ?? '#212121',
      lineVisible = theme?.lineStyle ?? true,
      lineWidth = theme?.lineWidth ?? 1,

      textBackgroundVisible = theme?.textBackgroundVisible ?? true,
      textBackgroundColor = theme?.textBackgroundColor ?? '#212121',
      textBackgroundBorderColor = theme?.textBackgroundBorderColor ?? '#212121',
      textBackgroundBorderRadius = theme?.textBackgroundBorderRadius ?? 4,
      textBackgroundBorderWidth = theme?.textBackgroundBorderWidth ?? 1,
      textBackgroundPadding = theme?.textBackgroundPadding ?? 2,
    } = annotationVerticalLine
    const lineStyle = annotationVerticalLine.lineStyle ?? theme?.lineStyle ?? 'dashed'
    const lineDash = getAnnotationLineDash(lineStyle, annotationVerticalLine.lineStyle ? undefined : theme?.lineDash)
    const textBackgroundOpacity = theme?.textBackgroundOpacity

    const generateOneMarkLine = (x: number | string) => ({
      x,
      autoRange: true,
      zIndex: ANNOTATION_Z_INDEX,
      line: {
        style: {
          visible: lineVisible,
          stroke: lineColor,
          lineStyle: lineStyle,
          lineWidth: lineWidth,
          lineDash,
        },
      },
      label: {
        confine: true,
        text: text,
        position: (positionMap as any)[textPosition || 'insideEnd'],
        style: {
          dx: 5,
          visible: true,
          stroke: textBackgroundColor,
          lineWidth: 1,
          textAlign: textAlign,
          textBaseline: textBaseline,
          fill: textColor,
          fontSize: textFontSize,
          fontWeight: textFontWeight,
        },
        labelBackground: {
          visible: textBackgroundVisible,
          padding: textBackgroundPadding,
          style: {
            opacity: textBackgroundOpacity ?? 0.95,
            dx: 5,
            cornerRadius: textBackgroundBorderRadius,
            fill: textBackgroundColor,
            stroke: textBackgroundBorderColor,
            lineWidth: textBackgroundBorderWidth,
            fillOpacity: 1,
          },
        },
      },
      startSymbol: {
        visible: theme?.startSymbolVisible ?? true,
        symbolType: theme?.startSymbolType ?? 'triangleDown',
        size: 5 + (lineWidth || 1),
        style: {
          dy: -3,
          fill: lineColor,
        },
      },
      endSymbol: {
        visible: theme?.endSymbolVisible ?? false,
        symbolType: theme?.endSymbolType ?? 'arrow',
        size: 10 + (lineWidth || 1),
        style: {
          dy: 4,
          fill: lineColor,
        },
      },
    })

    const finalXValue = resolveAnnotationValue({
      dynamicFilter,
      fallback: dynamicFilter?.fallback as string | number | undefined,
      defaultValue: xValue,
    })

    if (isArray(finalXValue) || isString(finalXValue) || isNumber(finalXValue)) {
      const xValueArr = Array.isArray(finalXValue) ? finalXValue : [finalXValue]
      return xValueArr.map(generateOneMarkLine)
    }

    return []
  }) as IMarkLineSpec[]

  const specMarkLine = ((spec as ILineChartSpec).markLine as IMarkLineSpec[]) || []
  const newMarkLine = [...specMarkLine, ...(markLine || [])]

  return {
    ...spec,
    markLine: newMarkLine,
  }
}
