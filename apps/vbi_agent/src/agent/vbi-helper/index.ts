import type { VBIProviderClient } from '@visactor/vbi-provider'
import { createChartHelpers } from './chart.js'
import { createDimensionHelpers } from './dimensions.js'
import { createFilterHelpers } from './filters.js'
import { createMeasureHelpers } from './measures.js'
import { createSettingsHelpers } from './settings.js'

export const createVbiHelpers = (client: VBIProviderClient) => ({
  ...createChartHelpers(client),
  ...createDimensionHelpers(),
  ...createFilterHelpers(),
  ...createMeasureHelpers(),
  ...createSettingsHelpers(),
})
