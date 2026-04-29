import { DATUM_HIDE_KEY } from 'src/pipeline/utils/constant'
import { selector, selectorWithDynamicFilter } from '../../../../../dataSelector'
import type { Datum, HeatmapCellStyle, VChartSpecPipe } from 'src/types'
import { isLinearColor } from '../color/colorAdapter'
import { isEmpty, isNullish } from 'remeda'

export const cellStyle: VChartSpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const cell = advancedVSeed.config?.[chartType as 'heatmap']?.cell
  const heatmapCellStyle = advancedVSeed.markStyle.cellStyle
  const { datasetReshapeInfo } = advancedVSeed
  const { unfoldInfo } = datasetReshapeInfo[0]

  const result = {
    ...spec,
    cell: {
      style: {
        visible: (datum: any) => {
          return datum?.[DATUM_HIDE_KEY] !== true
        },
        shape: 'rect',
        stroke: cell?.stroke,
        lineWidth: cell?.lineWidth ?? 1,
        fill: {
          field: isLinearColor(advancedVSeed, vseed) ? unfoldInfo.encodingColor : unfoldInfo.encodingColorId,
          scale: 'color',
        },
      },
      state: {
        hover: {
          shadowColor: cell?.hoverShadowColor,
          shadowBlur: 5,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
        },
      },
    },
  }

  if (isNullish(heatmapCellStyle) || isEmpty(heatmapCellStyle)) {
    return result
  }

  const heatmapCellStyles = (
    Array.isArray(heatmapCellStyle) ? heatmapCellStyle : [heatmapCellStyle]
  ) as HeatmapCellStyle[]

  const customMap = heatmapCellStyles.reduce<object>((result, style, index) => {
    return {
      ...result,
      [`custom${index + 1}`]: {
        // 优先级: 后者覆盖前者
        level: index + 1,
        filter: (datum: Datum) => {
          return style.dynamicFilter
            ? selectorWithDynamicFilter(datum, style.dynamicFilter, style.selector)
            : selector(datum, style.selector)
        },
        style: {
          fill: style.cellColor,
          fillOpacity: style.cellColorOpacity,
          stroke: style.cellBorderColor,
          lineWidth: style.cellBorderWidth,
        },
      },
    }
  }, {})

  return {
    ...result,
    cell: {
      ...result.cell,
      state: {
        ...result.cell.state,
        ...customMap,
      },
    },
  }
}
