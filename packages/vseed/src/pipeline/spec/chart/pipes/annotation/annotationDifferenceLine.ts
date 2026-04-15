import type { IBarChartSpec, ICartesianSeries, IMarkLineSpec } from '@visactor/vchart'
import type { AnnotationDifferenceLine, VChartSpecPipe } from 'src/types'
import { ANNOTATION_Z_INDEX } from '../../../../utils/constant'
import {
  buildDifferenceCoordinateDatum,
  buildDifferenceText,
  inferDifferenceConnectDirection,
  isDifferenceLineStacked,
  resolveDifferenceAnchor,
} from './annotationDifferenceLineCommon'

const DEFAULT_LINE_COLOR = '#BCC1CB'
const DEFAULT_TEXT_COLOR = '#ffffff'
const DEFAULT_TEXT_BACKGROUND_COLOR = '#BCC1CB'
const DEFAULT_TEXT_FONT_SIZE = 12
const DEFAULT_EXPAND_DISTANCE = 24
const DEFAULT_LINE_WIDTH = 2
const DEFAULT_CORNER_RADIUS = 4
const DEFAULT_LABEL_PADDING = 4
const DEFAULT_END_SYMBOL_SIZE = 12
const DEFAULT_END_SYMBOL_REF_X = -4

const getDifferenceLinePath = (index: number, total: number) =>
  total === 1 ? 'annotationDifferenceLine' : `annotationDifferenceLine[${index}]`

const assertDifferenceLineConfig: (value: unknown, path: string) => asserts value is AnnotationDifferenceLine = (
  value,
  path,
) => {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new Error(`${path} must be an object`)
  }

  const start = (value as Record<string, unknown>).start
  if (typeof start !== 'object' || start === null || Array.isArray(start)) {
    throw new Error(`${path}.start is required`)
  }
  if ((start as Record<string, unknown>).selector == null) {
    throw new Error(`${path}.start.selector is required`)
  }

  const end = (value as Record<string, unknown>).end
  if (typeof end !== 'object' || end === null || Array.isArray(end)) {
    throw new Error(`${path}.end is required`)
  }
  if ((end as Record<string, unknown>).selector == null) {
    throw new Error(`${path}.end.selector is required`)
  }
}

export const annotationDifferenceLine: VChartSpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const annotationDifferenceLine = advancedVSeed.annotation?.annotationDifferenceLine

  if (!annotationDifferenceLine) {
    return spec
  }

  const theme = advancedVSeed.config?.[vseed.chartType as 'column']?.annotation?.annotationDifferenceLine
  const annotationDifferenceLineList = Array.isArray(annotationDifferenceLine)
    ? annotationDifferenceLine
    : [annotationDifferenceLine]
  const dataset = advancedVSeed.dataset.flat()
  const barSpec = spec as IBarChartSpec
  const isStacked = isDifferenceLineStacked(vseed, advancedVSeed)

  const markLine = annotationDifferenceLineList.flatMap((annotationDifferenceLine, index) => {
    assertDifferenceLineConfig(
      annotationDifferenceLine,
      getDifferenceLinePath(index, annotationDifferenceLineList.length),
    )

    const start = resolveDifferenceAnchor({
      dataset,
      selectorLabel: 'start',
      selectorValue: annotationDifferenceLine.start.selector,
      spec: barSpec,
      isStacked,
    })
    const end = resolveDifferenceAnchor({
      dataset,
      selectorLabel: 'end',
      selectorValue: annotationDifferenceLine.end.selector,
      spec: barSpec,
      isStacked,
    })

    if (!start || !end) {
      return []
    }

    const lineColor = annotationDifferenceLine.lineColor ?? theme?.lineColor ?? DEFAULT_LINE_COLOR
    const textColor = annotationDifferenceLine.textColor ?? theme?.textColor ?? DEFAULT_TEXT_COLOR
    const textBackgroundColor =
      annotationDifferenceLine.textBackgroundColor ?? theme?.textBackgroundColor ?? DEFAULT_TEXT_BACKGROUND_COLOR
    const textFontSize = annotationDifferenceLine.textFontSize ?? theme?.textFontSize ?? DEFAULT_TEXT_FONT_SIZE

    return [
      {
        type: 'type-step',
        autoRange: true,
        zIndex: ANNOTATION_Z_INDEX,
        connectDirection: inferDifferenceConnectDirection(vseed, [start.value, end.value]),
        expandDistance: DEFAULT_EXPAND_DISTANCE,
        coordinates: (seriesData: any[], relativeSeries: ICartesianSeries) => [
          buildDifferenceCoordinateDatum({
            anchor: start,
            seriesData,
            relativeSeries,
          }),
          buildDifferenceCoordinateDatum({
            anchor: end,
            seriesData,
            relativeSeries,
          }),
        ],
        line: {
          style: {
            visible: true,
            stroke: lineColor,
            lineWidth: DEFAULT_LINE_WIDTH,
            lineDash: [0],
            cornerRadius: DEFAULT_CORNER_RADIUS,
          },
        },
        label: {
          confine: true,
          visible: true,
          position: 'middle',
          text: buildDifferenceText(start.value, end.value, annotationDifferenceLine.differenceType ?? 'absolute'),
          style: {
            fill: textColor,
            fontSize: textFontSize,
          },
          labelBackground: {
            visible: true,
            padding: DEFAULT_LABEL_PADDING,
            style: {
              fill: textBackgroundColor,
              fillOpacity: 1,
              stroke: lineColor,
              lineWidth: 1,
              cornerRadius: DEFAULT_CORNER_RADIUS,
            },
          },
        },
        startSymbol: {
          visible: false,
        },
        endSymbol: {
          visible: true,
          size: DEFAULT_END_SYMBOL_SIZE,
          refX: DEFAULT_END_SYMBOL_REF_X,
          style: {
            fill: lineColor,
          },
        },
      } as IMarkLineSpec,
    ]
  })

  const specMarkLine = (barSpec.markLine as IMarkLineSpec[]) || []

  return {
    ...spec,
    markLine: [...specMarkLine, ...markLine],
  }
}
