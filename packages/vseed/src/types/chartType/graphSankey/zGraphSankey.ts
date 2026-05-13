import { z } from 'zod'
import { zLocale } from '../../i18n'
import { zBackgroundColor, zColor, zDataset, zLabel, zPage, zTheme, zTooltip } from '../../properties'
import { zTimeFormat } from '../../properties/format'
import { zNumFormat } from '../../properties/format/numFormat'

const zGraphSankeyDimension = z.object({
  id: z.string(),
  alias: z.string().optional(),
  encoding: z.enum(['source', 'target', 'label', 'tooltip']).optional(),
  timeFormat: zTimeFormat.optional(),
})

const zGraphSankeyMeasure = z.object({
  id: z.string(),
  alias: z.string().optional(),
  autoFormat: z.boolean().optional(),
  numFormat: zNumFormat.optional(),
  format: zNumFormat.optional(),
  encoding: z.enum(['size', 'target', 'label', 'tooltip']).optional(),
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
  tooltip: zTooltip.nullish(),
  theme: zTheme.nullish(),
  locale: zLocale.nullish(),
})
