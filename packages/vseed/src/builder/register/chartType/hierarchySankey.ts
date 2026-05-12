import { hierarchySankeyAdvancedPipeline } from '../../../pipeline'
import { Builder } from '../../builder'

/**
 * @description 注册 HierarchySankey Chart 的 Advanced 构建管线。
 * 当前仅提供 AdvancedVSeed 构建，Spec 管线后续补充。
 */
export const registerHierarchySankey = () => {
  Builder.registerAdvancedPipeline('hierarchySankey', hierarchySankeyAdvancedPipeline)
}
