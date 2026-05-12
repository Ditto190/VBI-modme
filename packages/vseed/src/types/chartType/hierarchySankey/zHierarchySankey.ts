import { z } from 'zod'
import { zLocale } from '../../i18n'
import { zBackgroundColor, zColor, zDataset, zLabel, zPage, zTheme, zTooltip } from '../../properties'
import { zTimeFormat } from '../../properties/format'
import { zNumFormat } from '../../properties/format/numFormat'

const zHierarchySankeyDimension = z.object({
  id: z.string(),
  alias: z.string().optional(),
  encoding: z.enum(['hierarchy', 'label', 'tooltip']).optional(),
  timeFormat: zTimeFormat.optional(),
})

const zHierarchySankeyMeasure = z.object({
  id: z.string(),
  alias: z.string().optional(),
  autoFormat: z.boolean().optional(),
  numFormat: zNumFormat.optional(),
  format: zNumFormat.optional(),
  encoding: z.enum(['size', 'label', 'tooltip']).optional(),
  parentId: z.string().optional(),
})

export const zHierarchySankey = z.object({
  chartType: z.literal('hierarchySankey'),
  dataset: zDataset.nullish(),
  dimensions: z.array(zHierarchySankeyDimension).nullish(),
  measures: z.array(zHierarchySankeyMeasure).nullish(),
  page: zPage.nullish(),

  backgroundColor: zBackgroundColor.nullish(),
  color: zColor.nullish(),
  label: zLabel.nullish(),
  tooltip: zTooltip.nullish(),
  theme: zTheme.nullish(),
  locale: zLocale.nullish(),
})
