import { sankeyAdvancedPipeline, sankeySpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'

export const registerSankey = () => {
  Builder.registerAdvancedPipeline('sankey', sankeyAdvancedPipeline)
  Builder.registerSpecPipeline('sankey', sankeySpecPipeline)
}
