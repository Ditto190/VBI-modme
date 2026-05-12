import { hierarchySankeyAdvancedPipeline, hierarchySankeySpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'

/**
 * @description 注册 HierarchySankey Chart 的构建管线。
 */
export const registerHierarchySankey = () => {
  Builder.registerAdvancedPipeline('hierarchySankey', hierarchySankeyAdvancedPipeline)
  Builder.registerSpecPipeline('hierarchySankey', hierarchySankeySpecPipeline)
}
