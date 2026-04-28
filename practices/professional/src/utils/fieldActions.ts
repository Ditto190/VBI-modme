import type { VBIChartBuilder, VBIChartDSL } from '@visactor/vbi'
import type { SchemaField } from 'src/types'

export const addRecommendedField = (builder: VBIChartBuilder, dsl: VBIChartDSL, field: SchemaField) => {
  if (field.role === 'measure') {
    const [encoding] = builder.chartType.getRecommendedMeasureEncodings(dsl.measures.length + 1).slice(-1)
    if (!encoding || builder.measures.find((item) => item.getField() === field.name)) return
    builder.measures.add(field.name, (node) =>
      node.setAlias(field.name).setAggregate({ func: 'sum' }).setEncoding(encoding),
    )
    return
  }

  const [encoding] = builder.chartType.getRecommendedDimensionEncodings(dsl.dimensions.length + 1).slice(-1)
  if (!encoding || builder.dimensions.find((item) => item.getField() === field.name)) return
  builder.dimensions.add(field.name, (node) => {
    node.setAlias(field.name).setEncoding(encoding)
    if (field.isDate) node.setAggregate({ func: 'toDay' })
  })
}
