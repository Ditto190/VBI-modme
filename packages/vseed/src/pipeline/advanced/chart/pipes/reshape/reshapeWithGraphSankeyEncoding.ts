import { ColorEncoding, SourceEncoding, TargetEncoding } from 'src/dataReshape'
import type { AdvancedPipe, AdvancedVSeed } from 'src/types'
import { pivotReshapeWithEncoding } from './pivotReshapeWithEncoding'
import { reshapeWithEncoding } from './reshapeWithEncoding'

const applyGraphSankeyReshapeMeta = (advancedVSeed: Partial<AdvancedVSeed>) => {
  const result = { ...advancedVSeed } as AdvancedVSeed
  const { dataset = [], datasetReshapeInfo = [] } = result

  datasetReshapeInfo.forEach((reshapeInfo, index) => {
    const currentDataset =
      datasetReshapeInfo.length > 1 || Array.isArray((dataset as Array<unknown>)[0])
        ? (((dataset as Array<unknown>)[index] || []) as Array<Record<string, unknown>>)
        : (dataset as Array<Record<string, unknown>>)

    const hasColorEncoding = (result.encoding?.color?.length || 0) > 0
    const colorItems = Array.from(
      new Set(
        hasColorEncoding
          ? currentDataset.map((datum) => String(datum[ColorEncoding] ?? '')).filter(Boolean)
          : currentDataset
              .flatMap((datum) => [String(datum[SourceEncoding] ?? ''), String(datum[TargetEncoding] ?? '')])
              .filter(Boolean),
      ),
    )
    const colorIdMap = colorItems.reduce(
      (prev, item) => {
        prev[item] = { id: item, alias: item }
        return prev
      },
      {} as Record<string, { id: string; alias: string }>,
    )

    reshapeInfo.unfoldInfo = {
      ...reshapeInfo.unfoldInfo,
      encodingColor: ColorEncoding,
      encodingColorId: ColorEncoding,
      encodingSource: SourceEncoding,
      encodingTarget: TargetEncoding,
      colorItems,
      colorIdMap,
    }
  })

  return result
}

export const reshapeWithGraphSankeyEncoding: AdvancedPipe = (advancedVSeed, context) => {
  const result = reshapeWithEncoding(advancedVSeed, context)
  return applyGraphSankeyReshapeMeta(result)
}

export const pivotReshapeWithGraphSankeyEncoding: AdvancedPipe = (advancedVSeed, context) => {
  const result = pivotReshapeWithEncoding(advancedVSeed, context)
  return applyGraphSankeyReshapeMeta(result)
}
