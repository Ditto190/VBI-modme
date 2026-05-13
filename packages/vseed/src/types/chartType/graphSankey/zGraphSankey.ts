import { z } from 'zod'
import { zLocale } from '../../i18n'
import { zBackgroundColor, zColor, zDataset, zLabel, zLegend, zPage, zTheme, zTooltip } from '../../properties'
import { zTimeFormat } from '../../properties/format'
import { zNumFormat } from '../../properties/format/numFormat'

const zGraphSankeyDimension = z.object({
  id: z.string(),
  alias: z.string().optional(),
  encoding: z.enum(['source', 'target', 'color', 'detail', 'label', 'tooltip', 'row', 'column']).optional(),
  timeFormat: zTimeFormat.optional(),
})

const zGraphSankeyMeasure = z.object({
  id: z.string(),
  alias: z.string().optional(),
  autoFormat: z.boolean().optional(),
  numFormat: zNumFormat.optional(),
  format: zNumFormat.optional(),
  encoding: z.enum(['size', 'detail', 'label', 'tooltip']).optional(),
  parentId: z.string().optional(),
})

export const zGraphSankey = z.object({
  chartType: z.literal('graphSankey'),
  dataset: zDataset.nullish(),
  dimensions: z.array(zGraphSankeyDimension).nullish(),
  measures: z.array(zGraphSankeyMeasure).nullish(),
  page: zPage.nullish(),

  backgroundColor: zBackgroundColor.nullish(),
  color: zColor.nullish(),
  label: zLabel.nullish(),
  legend: zLegend.nullish(),
  tooltip: zTooltip.nullish(),
  theme: zTheme.nullish(),
  locale: zLocale.nullish(),
})
