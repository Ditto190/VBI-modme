import type { IBarChartSpec, ICartesianSeries } from '@visactor/vchart'
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

export type ResolvedDifferenceAnchor = {
  selectorLabel: DifferenceSelectorLabel
  coordinateDatum: Datum
  matchedDatum?: Datum
  stackGroupDatum?: Datum
  value: number
}

const toArray = <T>(value: T | T[] | undefined | null): T[] => {
  if (Array.isArray(value)) {
    return value
  }

  return value === undefined || value === null ? [] : [value]
}

const getDifferenceBandFields = (spec: IBarChartSpec): string[] => {
  return toArray((spec.direction === 'horizontal' ? spec.yField : spec.xField) as string | string[] | undefined)
}

const getDifferenceValueField = (spec: IBarChartSpec): string => {
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
  selectorLabel: DifferenceSelectorLabel
  selectorValue: Selector | Selectors
  valueField: string
  bandFields: string[]
}): ResolvedDifferenceAnchor | undefined => {
  const { selectorLabel, selectorValue, valueField, bandFields } = options
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

  try {
    return {
      selectorLabel,
      coordinateDatum,
      matchedDatum: fallbackDatum,
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

export const isDifferenceLineStacked = (vseed: VSeed, advancedVSeed: AdvancedVSeed) => {
  return (
    (vseed.chartType === 'column' || vseed.chartType === 'bar') &&
    hasMultipleMeasureInSingleView(advancedVSeed.reshapeMeasures ?? [])
  )
}

export const resolveDifferenceAnchor = (options: {
  dataset: Datum[]
  selectorLabel: DifferenceSelectorLabel
  selectorValue: Selector | Selectors
  spec: IBarChartSpec
  isStacked: boolean
}): ResolvedDifferenceAnchor | undefined => {
  const { dataset, selectorLabel, selectorValue, spec, isStacked } = options
  const matches = dataset.filter((datum) => selector(datum, selectorValue))
  const valueField = getDifferenceValueField(spec)
  const bandFields = getDifferenceBandFields(spec)

  if (matches.length === 0) {
    return isStacked ? undefined : resolveFallbackAnchor({ selectorLabel, selectorValue, valueField, bandFields })
  }

  if (!isStacked) {
    if (matches.length !== 1) {
      throw new Error(
        `annotationDifferenceLine ${selectorLabel} selector must resolve to exactly one datum, got ${matches.length}`,
      )
    }

    return {
      selectorLabel,
      coordinateDatum: matches[0],
      matchedDatum: matches[0],
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
  const groupValues = groupRows.map((datum) => normalizeDifferenceValue(datum[valueField], selectorLabel, valueField))

  if (hasMixedSigns(groupValues)) {
    throw new Error('annotationDifferenceLine does not support mixed-sign stack totals in v1')
  }

  return {
    selectorLabel,
    coordinateDatum: stackGroupDatum,
    matchedDatum: matches[0],
    stackGroupDatum,
    value: groupValues.reduce((sum, value) => sum + value, 0),
  }
}

export const getStackRuntimeTotal = (runtimeMatches: Datum[]) => {
  const stackEndValues = runtimeMatches.map((datum) => Number(datum.__VCHART_STACK_END))

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
}) => {
  const { anchor, seriesData, relativeSeries } = options

  if (!anchor.stackGroupDatum) {
    const runtimeMatches = anchor.matchedDatum
      ? seriesData.filter((datum) => isSubset(anchor.matchedDatum as Datum, datum))
      : []

    return runtimeMatches[0] ?? anchor.coordinateDatum
  }

  const runtimeMatches = seriesData.filter((datum) => isSubset(anchor.stackGroupDatum as Datum, datum))
  const runtimeStackTotal = getStackRuntimeTotal(runtimeMatches)

  return {
    ...(runtimeMatches[0] ?? anchor.coordinateDatum),
    [relativeSeries.getStackValueField()]: runtimeStackTotal ?? anchor.value,
  }
}

export const buildDifferenceText = (
  startValue: number,
  endValue: number,
  differenceType: 'absolute' | 'percent' = 'absolute',
) => {
  if (differenceType === 'percent') {
    if (startValue === 0) {
      throw new Error('annotationDifferenceLine percent difference cannot be computed because start value is 0')
    }

    return `${(((endValue - startValue) / startValue) * 100).toFixed(0)}%`
  }

  return `${endValue - startValue}`
}

export const inferDifferenceConnectDirection = (vseed: VSeed, values: [number, number]) => {
  const isNegativeSide = values.every((value) => value < 0)

  if (isBarLikeChart(vseed)) {
    return isNegativeSide ? 'left' : 'right'
  }

  return isNegativeSide ? 'bottom' : 'top'
}
