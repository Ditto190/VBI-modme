import { createVBI } from './vbi/index'
import type { VBIInstance } from './vbi/index'

/** @description 默认 VBI 实例，适合直接使用全局共享的 Builder 与资源能力。 */
export const VBI: VBIInstance = createVBI()
