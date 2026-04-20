import type { IAreaChartSpec, IBarChartSpec, ICartesianSeries, ILineChartSpec } from '@visactor/vchart'
import {
  isDimensionSelector,
  isFieldSelector,
  isMeasureSelector,
  isPartialDatumSelector,
  isValueSelector,
  selector,
} from '../../../../../dataSelector'
import { hasMultipleMeasureInSingleView, isBarLikeChart } from 'src/pipeline/utils'
import type { AdvancedVSeed, Datum, Selector, Selectors, VSeed } from 'src/types'
import { isSubset } from './utils'

type DifferenceSelectorLabel = 'start' | 'end'
type DifferenceChartSpec = IBarChartSpec | ILineChartSpec | IAreaChartSpec
export type DifferenceStackResolveMode = 'none' | 'stackTotal' | 'auto'
export type DifferenceAnchorMode = 'element' | 'stackTotal'

export type ResolvedDifferenceAnchor = {
  mode: DifferenceAnchorMode
  selectorLabel: DifferenceSelectorLabel
  coordinateDatum: Datum
  matchedDatum?: Datum
  stackGroupDatum?: Datum
  bandDatum: Datum
  bandIndex?: number
  value: number
}

const STACK_END_FIELD = '__VCHART_STACK_END'

const toArray = <T>(value: T | T[] | undefined | null): T[] => {
  if (Array.isArray(value)) {
    return value
  }

  return value === undefined || value === null ? [] : [value]
}

const getDifferenceBandFields = (spec: DifferenceChartSpec): string[] => {
  return toArray((spec.direction === 'horizontal' ? spec.yField : spec.xField) as string | string[] | undefined)
}

const getDifferenceValueField = (spec: DifferenceChartSpec): string => {
  const valueField = toArray(
    (spec.direction === 'horizontal' ? spec.xField : spec.yField) as string | string[] | undefined,
  )[0]

  if (!valueField) {
    throw new Error('annotationDifferenceLine requires a value field in the target chart spec')
  }

  return valueField
}

const normalizeDifferenceValue = (value: unknown, selectorLabel: DifferenceSelectorLabel, field: string): number => {
  const numberValue = Number(value)

  if (Number.isNaN(numberValue)) {
    throw new Error(
      `annotationDifferenceLine ${selectorLabel} selector resolved to a non-numeric value on field "${field}"`,
    )
  }

  return numberValue
}

const buildStackGroupDatum = (datum: Datum, bandFields: string[]) => {
  return Object.fromEntries(bandFields.map((field) => [field, datum[field]])) as Datum
}

const resolveBandIndex = (dataset: Datum[], bandDatum: Datum) => {
  const bandIndex = dataset.findIndex((datum) => isSubset(bandDatum, datum))

  return bandIndex >= 0 ? bandIndex : undefined
}

const buildFallbackSelectorDatum = (selectorValue: Selector | Selectors): Datum | undefined => {
  const selectorList = Array.isArray(selectorValue) ? selectorValue : [selectorValue]
  const fallbackDatum: Datum = {}

  for (const currentSelector of selectorList) {
    if (isValueSelector(currentSelector) || isFieldSelector(currentSelector)) {
      return undefined
    }

    if (isMeasureSelector(currentSelector)) {
      const operator = currentSelector.operator || currentSelector.op
      const selectorValues = Array.isArray(currentSelector.value) ? currentSelector.value : [currentSelector.value]

      if (!['=', '=='].includes(operator as string) || selectorValues.length !== 1) {
        return undefined
      }

      fallbackDatum[currentSelector.field] = selectorValues[0]
      continue
    }

    if (isDimensionSelector(currentSelector)) {
      const operator = currentSelector.operator || currentSelector.op
      const selectorValues = Array.isArray(currentSelector.value) ? currentSelector.value : [currentSelector.value]

      if (operator !== 'in' || selectorValues.length !== 1) {
        return undefined
      }

      fallbackDatum[currentSelector.field] = selectorValues[0]
      continue
    }

    if (isPartialDatumSelector(currentSelector)) {
      Object.assign(fallbackDatum, currentSelector)
      continue
    }

    return undefined
  }

  return Object.keys(fallbackDatum).length > 0 ? fallbackDatum : undefined
}

const inferFallbackValue = (fallbackDatum: Datum, valueField: string, bandFields: string[]) => {
  if (valueField in fallbackDatum) {
    return fallbackDatum[valueField]
  }

  const numericCandidateKeys = Object.keys(fallbackDatum).filter((key) => {
    if (key === valueField || bandFields.includes(key)) {
      return false
    }

    return typeof fallbackDatum[key] === 'number'
  })

  if (numericCandidateKeys.length !== 1) {
    return undefined
  }

  return fallbackDatum[numericCandidateKeys[0]]
}

const resolveFallbackAnchor = (options: {
  dataset: Datum[]
  selectorLabel: DifferenceSelectorLabel
  selectorValue: Selector | Selectors
  valueField: string
  bandFields: string[]
}): ResolvedDifferenceAnchor | undefined => {
  const { dataset, selectorLabel, selectorValue, valueField, bandFields } = options
  const fallbackDatum = buildFallbackSelectorDatum(selectorValue)

  if (!fallbackDatum) {
    return undefined
  }

  const inferredValue = inferFallbackValue(fallbackDatum, valueField, bandFields)

  if (inferredValue === undefined) {
    return undefined
  }

  const coordinateDatum = {
    ...fallbackDatum,
    [valueField]: inferredValue,
  }
  const bandDatum = buildStackGroupDatum(coordinateDatum, bandFields)

  try {
    return {
      mode: 'element',
      selectorLabel,
      coordinateDatum,
      matchedDatum: fallbackDatum,
      bandDatum,
      bandIndex: resolveBandIndex(dataset, bandDatum),
      value: normalizeDifferenceValue(inferredValue, selectorLabel, valueField),
    }
  } catch {
    return undefined
  }
}

const hasMixedSigns = (values: number[]) => {
  const nonZeroValues = values.filter((value) => value !== 0)

  return nonZeroValues.some((value) => value > 0) && nonZeroValues.some((value) => value < 0)
}

export const getDifferenceLineStackResolveMode = (
  vseed: VSeed,
  advancedVSeed: AdvancedVSeed,
): DifferenceStackResolveMode => {
  const hasMultipleMeasure = hasMultipleMeasureInSingleView(advancedVSeed.reshapeMeasures ?? [])

  if (!hasMultipleMeasure) {
    return 'none'
  }

  if (vseed.chartType === 'column') {
    return 'auto'
  }

  if (vseed.chartType === 'bar') {
    return 'auto'
  }

  return 'none'
}

export const usesDifferenceLineElementStackEnd = (vseed: VSeed, advancedVSeed: AdvancedVSeed) => {
  return vseed.chartType === 'area' && hasMultipleMeasureInSingleView(advancedVSeed.reshapeMeasures ?? [])
}

export const resolveDifferenceAnchor = (options: {
  dataset: Datum[]
  selectorLabel: DifferenceSelectorLabel
  selectorValue: Selector | Selectors
  spec: DifferenceChartSpec
  stackResolveMode: DifferenceStackResolveMode
  allowSelectorFallback?: boolean
}): ResolvedDifferenceAnchor | undefined => {
  const { dataset, selectorLabel, selectorValue, spec, stackResolveMode, allowSelectorFallback = true } = options
  const matches = dataset.filter((datum) => selector(datum, selectorValue))
  const valueField = getDifferenceValueField(spec)
  const bandFields = getDifferenceBandFields(spec)

  if (matches.length === 0) {
    return stackResolveMode === 'none' && allowSelectorFallback
      ? resolveFallbackAnchor({ dataset, selectorLabel, selectorValue, valueField, bandFields })
      : undefined
  }

  if (stackResolveMode === 'none' || (stackResolveMode === 'auto' && matches.length === 1)) {
    if (matches.length !== 1) {
      throw new Error(
        `annotationDifferenceLine ${selectorLabel} selector must resolve to exactly one datum, got ${matches.length}`,
      )
    }

    const bandDatum = buildStackGroupDatum(matches[0], bandFields)

    return {
      mode: 'element',
      selectorLabel,
      coordinateDatum: matches[0],
      matchedDatum: matches[0],
      bandDatum,
      bandIndex: resolveBandIndex(dataset, bandDatum),
      value: normalizeDifferenceValue(matches[0][valueField], selectorLabel, valueField),
    }
  }
  const stackGroups = new Map<string, Datum>()

  matches.forEach((datum) => {
    const stackGroupDatum = buildStackGroupDatum(datum, bandFields)
    stackGroups.set(JSON.stringify(stackGroupDatum), stackGroupDatum)
  })

  if (stackGroups.size !== 1) {
    throw new Error(
      `annotationDifferenceLine ${selectorLabel} selector must resolve to exactly one stack group, got ${stackGroups.size}`,
    )
  }

  const stackGroupDatum = Array.from(stackGroups.values())[0]
  const groupRows = dataset.filter((datum) => isSubset(stackGroupDatum, datum))

  if (stackResolveMode === 'auto' && groupRows.length !== matches.length) {
    throw new Error(
      `annotationDifferenceLine ${selectorLabel} selector must resolve to exactly one stack element or one full stack group`,
    )
  }
  const groupValues = groupRows.map((datum) => normalizeDifferenceValue(datum[valueField], selectorLabel, valueField))

  if (hasMixedSigns(groupValues)) {
    throw new Error('annotationDifferenceLine does not support mixed-sign stack totals in v1')
  }

  return {
    mode: 'stackTotal',
    selectorLabel,
    coordinateDatum: stackGroupDatum,
    matchedDatum: matches[0],
    stackGroupDatum,
    bandDatum: stackGroupDatum,
    bandIndex: resolveBandIndex(dataset, stackGroupDatum),
    value: groupValues.reduce((sum, value) => sum + value, 0),
  }
}

export const getStackRuntimeTotal = (runtimeMatches: Datum[]) => {
  const stackEndValues = runtimeMatches.map((datum) => Number(datum[STACK_END_FIELD]))

  if (stackEndValues.some((value) => Number.isNaN(value))) {
    return undefined
  }

  if (hasMixedSigns(stackEndValues)) {
    throw new Error('annotationDifferenceLine does not support mixed-sign runtime stack totals in v1')
  }

  return stackEndValues.some((value) => value < 0) ? Math.min(...stackEndValues) : Math.max(...stackEndValues)
}

export const buildDifferenceCoordinateDatum = (options: {
  anchor: ResolvedDifferenceAnchor
  seriesData: Datum[]
  relativeSeries: ICartesianSeries
  useElementStackEnd?: boolean
}) => {
  const { anchor, seriesData, relativeSeries, useElementStackEnd = false } = options

  if (!anchor.stackGroupDatum) {
    const runtimeMatches = anchor.matchedDatum
      ? seriesData.filter((datum) => isSubset(anchor.matchedDatum as Datum, datum))
      : []

    if (!useElementStackEnd) {
      return runtimeMatches[0] ?? anchor.coordinateDatum
    }

    const runtimeMatch = runtimeMatches[0]
    const runtimeStackEnd = Number(runtimeMatch?.[STACK_END_FIELD])

    return {
      ...(runtimeMatch ?? anchor.coordinateDatum),
      [relativeSeries.getStackValueField()]: Number.isNaN(runtimeStackEnd) ? anchor.value : runtimeStackEnd,
    }
  }

  const runtimeMatches = seriesData.filter((datum) => isSubset(anchor.stackGroupDatum as Datum, datum))
  const runtimeStackTotal = getStackRuntimeTotal(runtimeMatches)

  return {
    ...(runtimeMatches[0] ?? anchor.coordinateDatum),
    [relativeSeries.getStackValueField()]: runtimeStackTotal ?? anchor.value,
  }
}

export const getRuntimeDifferenceValue = (options: {
  anchor: ResolvedDifferenceAnchor
  seriesData: Datum[]
  useElementStackEnd?: boolean
}) => {
  const { anchor, seriesData, useElementStackEnd = false } = options

  if (anchor.stackGroupDatum) {
    const runtimeMatches = seriesData.filter((datum) => isSubset(anchor.stackGroupDatum as Datum, datum))
    return getStackRuntimeTotal(runtimeMatches) ?? anchor.value
  }

  if (!useElementStackEnd || !anchor.matchedDatum) {
    return anchor.value
  }

  const runtimeMatch = seriesData.find((datum) => isSubset(anchor.matchedDatum as Datum, datum))
  const runtimeStackEnd = Number(runtimeMatch?.[STACK_END_FIELD])

  return Number.isNaN(runtimeStackEnd) ? anchor.value : runtimeStackEnd
}

export const getDifferenceValue = (
  startValue: number,
  endValue: number,
  differenceType: 'absolute' | 'percent' = 'absolute',
) => {
  if (differenceType === 'percent') {
    if (startValue === 0) {
      throw new Error('annotationDifferenceLine percent difference cannot be computed because start value is 0')
    }

    return (endValue - startValue) / startValue
  }

  return endValue - startValue
}

export const buildDifferenceText = (
  startValue: number,
  endValue: number,
  differenceType: 'absolute' | 'percent' = 'absolute',
  formatter?: (value: number) => string,
) => {
  const differenceValue = getDifferenceValue(startValue, endValue, differenceType)

  if (formatter) {
    return formatter(differenceValue)
  }

  if (differenceType === 'percent') {
    return `${(differenceValue * 100).toFixed(2)}%`
  }

  return `${differenceValue}`
}

export const inferDifferenceConnectDirection = (vseed: VSeed, values: [number, number]) => {
  const isNegativeSide = values.every((value) => value < 0)

  if (isBarLikeChart(vseed)) {
    return isNegativeSide ? 'left' : 'right'
  }

  return isNegativeSide ? 'bottom' : 'top'
}

export const inferDifferenceBracketDirection = (
  start: ResolvedDifferenceAnchor,
  end: ResolvedDifferenceAnchor,
): 'left' | 'right' => {
  if (start.bandIndex === undefined || end.bandIndex === undefined) {
    return 'right'
  }

  return start.bandIndex <= end.bandIndex ? 'right' : 'left'
}
