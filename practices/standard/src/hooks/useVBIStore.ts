import { useVBIStore } from '../model'
import type { VBIStoreState } from '../model/VBIStore'

/**
 * VBI Store Hook
 * 提供全局状态管理
 */
export const useVBIStoreHook = (): VBIStoreState => {
  return useVBIStore((state) => state)
}
