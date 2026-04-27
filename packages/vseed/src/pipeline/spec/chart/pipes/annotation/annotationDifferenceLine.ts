import type { IAreaChartSpec, IBarChartSpec, ICartesianSeries, ILineChartSpec, IMarkLineSpec } from '@visactor/vchart'
import type { AnnotationDifferenceLine, Measure, RegionPadding, VChartSpecPipe } from 'src/types'
import { createFormatter, findAllMeasures, autoFormatter } from '../../../../utils'
import {
  isDimensionSelector,
  isFieldSelector,
  isMeasureSelector,
  isPartialDatumSelector,
} from '../../../../../dataSelector'
import { isEmpty } from 'remeda'
import { ANNOTATION_Z_INDEX } from '../../../../utils/constant'
import {
  buildDifferenceCoordinateDatum,
  buildDifferenceText,
  getDifferenceLineStackResolveMode,
  getRuntimeDifferenceValue,
  inferDifferenceConnectDirection,
  type ResolvedDifferenceAnchor,
  usesDifferenceLineElementStackEnd,
  resolveDifferenceAnchor,
} from './annotationDifferenceLineCommon'

const DEFAULT_LINE_COLOR = '#BCC1CB'
const DEFAULT_TEXT_COLOR = '#ffffff'
const DEFAULT_TEXT_BACKGROUND_COLOR = '#BCC1CB'
const DEFAULT_TEXT_FONT_SIZE = 12
const DEFAULT_LINE_WIDTH = 2
const DEFAULT_CORNER_RADIUS = 4
const DEFAULT_LABEL_PADDING = 4
const DEFAULT_END_SYMBOL_SIZE = 12
const DEFAULT_END_SYMBOL_REF_X = -4
const DEFAULT_GUTTER_BASE_OFFSET = 20
const DEFAULT_GUTTER_RIGHT_PADDING = 44
const DEFAULT_GUTTER_TOP_PADDING = 36
const DEFAULT_BRACKET_LINE_DASH: [number, number] = [2, 2]
const DEFAULT_PERCENT_DIFFERENCE_FORMAT = {
  type: 'percent' as const,
  fractionDigits: 2,
}

type RegionPaddingObject = Required<Exclude<RegionPadding, number>>
type DifferenceConnectDirection = 'top' | 'right' | 'bottom' | 'left'

const getDifferenceLinePath = (index: number, total: number) =>
  total === 1 ? 'annotationDifferenceLine' : `annotationDifferenceLine[${index}]`

const toArray = <T>(value: T | T[] | undefined | null): T[] => {
  if (Array.isArray(value)) {
    return value
  }

  return value === undefined || value === null ? [] : [value]
}

const normalizeRegionPadding = (padding?: RegionPadding): RegionPaddingObject => {
  if (typeof padding === 'number') {
    return {
      top: padding,
      right: padding,
      bottom: padding,
      left: padding,
    }
  }

  return {
    top: padding?.top ?? 0,
    right: padding?.right ?? 0,
    bottom: padding?.bottom ?? 0,
    left: padding?.left ?? 0,
  }
}

const mergeDifferenceLineRegionPadding = (
  spec: IBarChartSpec | ILineChartSpec | IAreaChartSpec,
  paddingPatch: Partial<RegionPaddingObject>,
) => {
  const region = (spec as { region?: Array<Record<string, unknown>> }).region

  if (!Array.isArray(region) || region.length === 0) {
    return spec
  }

  const mergedPadding = normalizeRegionPadding(region[0].padding as RegionPadding | undefined)

  if (paddingPatch.top !== undefined) {
    mergedPadding.top = Math.max(mergedPadding.top, paddingPatch.top)
  }

  if (paddingPatch.right !== undefined) {
    mergedPadding.right = Math.max(mergedPadding.right, paddingPatch.right)
  }

  if (paddingPatch.bottom !== undefined) {
    mergedPadding.bottom = Math.max(mergedPadding.bottom, paddingPatch.bottom)
  }

  if (paddingPatch.left !== undefined) {
    mergedPadding.left = Math.max(mergedPadding.left, paddingPatch.left)
  }

  return {
    ...spec,
    region: [
      {
        ...region[0],
        padding: mergedPadding,
      },
      ...region.slice(1),
    ],
  }
}

const buildFixedGutterExpandDistance = (connectDirection: DifferenceConnectDirection) => {
  return (_markerData: unknown, context: any) => {
    const region = context?.region
    const coordinatePoints = Array.isArray(context?.coordinatePoints) ? context.coordinatePoints : []

    if (!region || coordinatePoints.length === 0) {
      return 0
    }

    const { x: regionStartX, y: regionStartY } = region.getLayoutStartPoint()
    const { width, height } = region.getLayoutRect()

    if (connectDirection === 'top') {
      const targetY = regionStartY - DEFAULT_GUTTER_BASE_OFFSET
      const minY = Math.min(...coordinatePoints.map((point: { y: number }) => point.y))

      return Math.max(0, minY - targetY)
    }

    if (connectDirection === 'bottom') {
      const targetY = regionStartY + height + DEFAULT_GUTTER_BASE_OFFSET
      const maxY = Math.max(...coordinatePoints.map((point: { y: number }) => point.y))

      return Math.max(0, targetY - maxY)
    }

    if (connectDirection === 'left') {
      const targetX = regionStartX - DEFAULT_GUTTER_BASE_OFFSET
      const minX = Math.min(...coordinatePoints.map((point: { x: number }) => point.x))

      return Math.max(0, minX - targetX)
    }

    const targetX = regionStartX + width + DEFAULT_GUTTER_BASE_OFFSET
    const maxX = Math.max(...coordinatePoints.map((point: { x: number }) => point.x))

    return Math.max(0, targetX - maxX)
  }
}

const getDifferenceLinePaddingPatch = (connectDirection: DifferenceConnectDirection): Partial<RegionPaddingObject> => {
  if (connectDirection === 'top') {
    return { top: DEFAULT_GUTTER_TOP_PADDING }
  }

  if (connectDirection === 'bottom') {
    return { bottom: DEFAULT_GUTTER_TOP_PADDING }
  }

  if (connectDirection === 'left') {
    return { left: DEFAULT_GUTTER_RIGHT_PADDING }
  }

  return { right: DEFAULT_GUTTER_RIGHT_PADDING }
}

const getAxisFormatter = (spec: IBarChartSpec | ILineChartSpec | IAreaChartSpec) => {
  const valueAxisOrient = spec.direction === 'horizontal' ? 'bottom' : 'left'
  const formatMethod = spec.axes?.find((axis) => axis.orient === valueAxisOrient)?.label?.formatMethod

  return typeof formatMethod === 'function'
    ? (value: number) => String(formatMethod(value as never) ?? value)
    : undefined
}

const getExplicitMeasureFormat = (measure?: Measure) => {
  if (measure?.numFormat && !isEmpty(measure.numFormat)) {
    return measure.numFormat
  }

  if (measure?.format && !isEmpty(measure.format)) {
    return measure.format
  }

  return undefined
}

const inferMeasureIdFromDatum = (anchor: ResolvedDifferenceAnchor, measureIds: string[]) => {
  const candidateValues = [anchor.matchedDatum, anchor.coordinateDatum]

  for (const datum of candidateValues) {
    if (!datum) {
      continue
    }

    const candidates = measureIds.filter((measureId) => Number(datum[measureId]) === anchor.value)

    if (candidates.length === 1) {
      return candidates[0]
    }
  }

  return undefined
}

const inferMeasureIdFromSelector = (
  selectorValue: AnnotationDifferenceLine['start']['selector'],
  measureIdSet: Set<string>,
) => {
  const matchedMeasureIds = new Set<string>()

  for (const currentSelector of toArray(selectorValue)) {
    if (isMeasureSelector(currentSelector)) {
      if (measureIdSet.has(currentSelector.field)) {
        matchedMeasureIds.add(currentSelector.field)
      }
      continue
    }

    if (isFieldSelector(currentSelector) || isDimensionSelector(currentSelector)) {
      continue
    }

    if (isPartialDatumSelector(currentSelector)) {
      Object.keys(currentSelector).forEach((field) => {
        if (measureIdSet.has(field)) {
          matchedMeasureIds.add(field)
        }
      })
    }
  }

  return matchedMeasureIds.size === 1 ? Array.from(matchedMeasureIds)[0] : undefined
}

const resolveDifferenceMeasureId = (
  anchor: ResolvedDifferenceAnchor,
  selectorValue: AnnotationDifferenceLine['start']['selector'],
  measureIds: string[],
) => {
  if (anchor.mode !== 'element') {
    return undefined
  }

  if (measureIds.length === 1) {
    return measureIds[0]
  }

  const measureIdSet = new Set(measureIds)
  return inferMeasureIdFromSelector(selectorValue, measureIdSet) ?? inferMeasureIdFromDatum(anchor, measureIds)
}

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
  const chartSpec = spec as IBarChartSpec | ILineChartSpec | IAreaChartSpec
  const stackResolveMode = getDifferenceLineStackResolveMode(vseed, advancedVSeed)
  const useElementStackEnd = usesDifferenceLineElementStackEnd(vseed, advancedVSeed)
  const isBracketChart = vseed.chartType === 'line' || vseed.chartType === 'area'
  const measures = findAllMeasures(advancedVSeed.measures)
  const measureIds = measures.map((measure) => measure.id)
  const axisFormatter = getAxisFormatter(chartSpec)
  const percentFormatter = createFormatter(DEFAULT_PERCENT_DIFFERENCE_FORMAT)
  const isHorizontalChart = chartSpec.direction === 'horizontal'

  const paddingPatch = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }

  const markLine = annotationDifferenceLineList.flatMap((annotationDifferenceLine, index) => {
    try {
      assertDifferenceLineConfig(
        annotationDifferenceLine,
        getDifferenceLinePath(index, annotationDifferenceLineList.length),
      )

      const start = resolveDifferenceAnchor({
        dataset,
        selectorLabel: 'start',
        selectorValue: annotationDifferenceLine.start.selector,
        spec: chartSpec,
        stackResolveMode,
        allowSelectorFallback: !useElementStackEnd,
      })
      const end = resolveDifferenceAnchor({
        dataset,
        selectorLabel: 'end',
        selectorValue: annotationDifferenceLine.end.selector,
        spec: chartSpec,
        stackResolveMode,
        allowSelectorFallback: !useElementStackEnd,
      })

      if (!start || !end) {
        return []
      }

      if (start.mode !== end.mode) {
        return []
      }

      const usesRuntimeStackEnd =
        useElementStackEnd ||
        ((vseed.chartType === 'column' || vseed.chartType === 'bar') &&
          start.mode === 'element' &&
          stackResolveMode === 'auto')
      const useBracketStyle =
        isBracketChart ||
        ((vseed.chartType === 'column' || vseed.chartType === 'bar') &&
          start.mode === 'element' &&
          stackResolveMode === 'auto')
      const connectDirection: DifferenceConnectDirection =
        (vseed.chartType === 'column' || vseed.chartType === 'bar') && stackResolveMode === 'auto'
          ? inferDifferenceConnectDirection(vseed, [start.value, end.value])
          : isHorizontalChart
            ? 'top'
            : 'right'
      const expandDistance = buildFixedGutterExpandDistance(connectDirection)
      const currentPaddingPatch = getDifferenceLinePaddingPatch(connectDirection)

      paddingPatch.top = Math.max(paddingPatch.top, currentPaddingPatch.top ?? 0)
      paddingPatch.right = Math.max(paddingPatch.right, currentPaddingPatch.right ?? 0)
      paddingPatch.bottom = Math.max(paddingPatch.bottom, currentPaddingPatch.bottom ?? 0)
      paddingPatch.left = Math.max(paddingPatch.left, currentPaddingPatch.left ?? 0)

      const lineColor = annotationDifferenceLine.lineColor ?? theme?.lineColor ?? DEFAULT_LINE_COLOR
      const textColor = annotationDifferenceLine.textColor ?? theme?.textColor ?? DEFAULT_TEXT_COLOR
      const textBackgroundColor =
        annotationDifferenceLine.textBackgroundColor ?? theme?.textBackgroundColor ?? DEFAULT_TEXT_BACKGROUND_COLOR
      const textFontSize = annotationDifferenceLine.textFontSize ?? theme?.textFontSize ?? DEFAULT_TEXT_FONT_SIZE
      const differenceType = annotationDifferenceLine.differenceType ?? 'absolute'
      const startMeasureId = resolveDifferenceMeasureId(start, annotationDifferenceLine.start.selector, measureIds)
      const endMeasureId = resolveDifferenceMeasureId(end, annotationDifferenceLine.end.selector, measureIds)
      const sameMeasure = startMeasureId !== undefined && startMeasureId === endMeasureId
      const explicitMeasureFormat = sameMeasure
        ? getExplicitMeasureFormat(measures.find((measure) => measure.id === startMeasureId))
        : undefined
      const differenceFormatter =
        differenceType === 'percent'
          ? percentFormatter
          : explicitMeasureFormat
            ? createFormatter(explicitMeasureFormat)
            : (axisFormatter ?? autoFormatter)

      const label = usesRuntimeStackEnd
        ? {
            visible: true,
            position: 'middle',
            refY: 0,
            formatMethod: (_markData: any[], seriesData: any[]) => {
              try {
                return buildDifferenceText(
                  getRuntimeDifferenceValue({
                    anchor: start,
                    seriesData,
                    useElementStackEnd: usesRuntimeStackEnd,
                  }),
                  getRuntimeDifferenceValue({
                    anchor: end,
                    seriesData,
                    useElementStackEnd: usesRuntimeStackEnd,
                  }),
                  differenceType,
                  differenceFormatter,
                )
              } catch {
                return ''
              }
            },
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
          }
        : {
            visible: true,
            position: 'middle',
            refY: 0,
            text: buildDifferenceText(start.value, end.value, differenceType, differenceFormatter),
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
          }

      return [
        {
          type: 'type-step',
          autoRange: true,
          zIndex: ANNOTATION_Z_INDEX,
          connectDirection,
          expandDistance,
          coordinates: (seriesData: any[], relativeSeries: ICartesianSeries) => {
            try {
              return [
                buildDifferenceCoordinateDatum({
                  anchor: start,
                  seriesData,
                  relativeSeries,
                  useElementStackEnd: usesRuntimeStackEnd,
                }),
                buildDifferenceCoordinateDatum({
                  anchor: end,
                  seriesData,
                  relativeSeries,
                  useElementStackEnd: usesRuntimeStackEnd,
                }),
              ]
            } catch {
              return []
            }
          },
          line: useBracketStyle
            ? {
                multiSegment: true,
                mainSegmentIndex: 1,
                style: [
                  {
                    visible: true,
                    stroke: lineColor,
                    lineWidth: DEFAULT_LINE_WIDTH,
                    lineDash: DEFAULT_BRACKET_LINE_DASH,
                  },
                  {
                    visible: true,
                    stroke: lineColor,
                    lineWidth: DEFAULT_LINE_WIDTH,
                  },
                  {
                    visible: true,
                    stroke: lineColor,
                    lineWidth: DEFAULT_LINE_WIDTH,
                    lineDash: DEFAULT_BRACKET_LINE_DASH,
                  },
                ],
              }
            : {
                style: {
                  visible: true,
                  stroke: lineColor,
                  lineWidth: DEFAULT_LINE_WIDTH,
                  lineDash: [0],
                  cornerRadius: DEFAULT_CORNER_RADIUS,
                },
              },
          label,
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
    } catch {
      return []
    }
  })

  const specMarkLine = (chartSpec.markLine as IMarkLineSpec[]) || []
  const nextSpec = {
    ...spec,
    markLine: [...specMarkLine, ...markLine],
  }

  if (markLine.length === 0) {
    return nextSpec
  }

  return mergeDifferenceLineRegionPadding(nextSpec as IBarChartSpec | ILineChartSpec | IAreaChartSpec, paddingPatch)
}
