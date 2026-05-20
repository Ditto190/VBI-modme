import type { VBIInsightBuilder } from 'src/insight-builder/builder'
import type { VBIInsightDSL, VBIInsightDSLInput } from 'src/types'

/** @description VBI 实例上的 insight 命名空间，负责创建 Insight Builder 和空 insight DSL。 */
export interface VBIInsightNamespace {
  /** @description 使用 insight DSL 创建 VBIInsightBuilder。 */
  create(insight: VBIInsightDSLInput): VBIInsightBuilder
  /** @description 创建一个空 insight DSL。 */
  createEmpty(uuid?: string): VBIInsightDSL
}
