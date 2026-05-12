import type { Legend, VChartSpecPipe } from 'src/types'

export const hierarchySankeyLegend: VChartSpecPipe = (spec, context) => {
  const result = { ...spec } as Record<string, any>
  const { advancedVSeed } = context
  const { chartType } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { legend?: Legend }
  if (!baseConfig?.legend) {
    return result as any
  }

  const {
    legend: {
      enable,
      position = 'bottom',
      labelFontColor,
      labelColor,
      labelFontSize = 12,
      pagerIconColor,
      pagerIconDisableColor,
      labelFontWeight,
      maxSize = 1,
      border,
      shapeType = 'rectRound',
    },
  } = baseConfig

  const orient = ['bottom', 'bottomLeft', 'bottomRight', 'bl', 'br'].includes(position)
    ? 'bottom'
    : ['top', 'topLeft', 'topRight', 'tl', 'tr'].includes(position)
      ? 'top'
      : ['left', 'leftTop', 'leftBottom', 'lt', 'lb'].includes(position)
        ? 'left'
        : 'right'

  const legendPosition = ['topLeft', 'bottomLeft', 'leftTop', 'rightTop', 'lt', 'rt', 'tl', 'bl'].includes(position)
    ? 'start'
    : ['topRight', 'bottomRight', 'leftBottom', 'rightBottom', 'lb', 'rb', 'rt', 'br'].includes(position)
      ? 'end'
      : 'middle'
  const labelTextColor = labelColor || labelFontColor

  result.legends = {
    type: 'discrete',
    visible: enable,
    maxCol: Math.max(1, maxSize),
    maxRow: Math.max(1, maxSize),
    autoPage: true,
    orient,
    position: legendPosition,
    item: {
      focus: true,
      maxWidth: '30%',
      focusIconStyle: {
        size: labelFontSize + 2,
        fill: labelTextColor,
        fontWeight: labelFontWeight,
      },
      shape: {
        space: border ? 6 : 4,
        style: (item: any) => ({
          symbolType: shapeType,
          size: border ? 8 : 10,
          fillOpacity: 1,
          opacity: 1,
          stroke: false,
          outerBorder: border
            ? {
                stroke: item.shape.fill,
                distance: 3,
                lineWidth: 1,
              }
            : null,
        }),
        state: {
          unSelected: {
            opacity: 0.2,
            fillOpacity: 1,
          },
        },
      },
      label: {
        formatMethod: (value: unknown) => String(value),
        style: {
          fontSize: labelFontSize,
          fill: labelTextColor,
          fontWeight: labelFontWeight,
        },
        state: {
          unSelected: {
            fill: labelTextColor,
            fillOpacity: 0.8,
          },
        },
      },
    },
    pager: {
      textStyle: {
        fill: labelTextColor,
      },
      handler: {
        style: {
          fill: pagerIconColor,
        },
        state: {
          disable: {
            fill: pagerIconDisableColor,
          },
        },
      },
    },
    padding: 0,
  }

  return result as any
}
