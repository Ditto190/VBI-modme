import { z } from 'zod'
import { zLocale } from '../../i18n'
import {
  zBackgroundColor,
  zColor,
  zDataset,
  zDimensions,
  zLabel,
  zLegend,
  zMeasures,
  zPage,
  zTheme,
  zTooltip,
} from '../../properties'

export const zSankey = z.object({
  chartType: z.literal('sankey'),
  dataset: zDataset.nullish(),
  dimensions: zDimensions.nullish(),
  measures: zMeasures.nullish(),
  page: zPage.nullish(),

  backgroundColor: zBackgroundColor.nullish(),
  color: zColor.nullish(),
  label: zLabel.nullish(),
  legend: zLegend.nullish(),
  tooltip: zTooltip.nullish(),
  theme: zTheme.nullish(),
  locale: zLocale.nullish(),
})
