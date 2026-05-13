import { graphSankeyAdvancedPipeline, graphSankeySpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'

export const registerGraphSankey = () => {
  Builder.registerAdvancedPipeline('graphSankey', graphSankeyAdvancedPipeline)
  Builder.registerSpecPipeline('graphSankey', graphSankeySpecPipeline)
}
