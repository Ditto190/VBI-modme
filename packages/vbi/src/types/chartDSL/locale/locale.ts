import { z } from 'zod'

export const VBI_DSL_LOCALES = ['zh-CN', 'en-US', 'ja-JP', 'de-DE', 'id-ID', 'fr-FR', 'ko-KR', 'vi-VN'] as const

export const zVBIDSLLocale = z.enum(VBI_DSL_LOCALES)
export type VBIDSLLocale = z.infer<typeof zVBIDSLLocale>
