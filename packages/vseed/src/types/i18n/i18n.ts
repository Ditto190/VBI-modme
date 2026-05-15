import { z } from 'zod'

export const LOCALES = ['zh-CN', 'en-US', 'ja-JP', 'de-DE', 'id-ID', 'fr-FR', 'ko-KR', 'vi-VN'] as const

export type Locale = (typeof LOCALES)[number]

export type TranslateRecordType = Record<string, { [local in Locale]: string }>

export const zLocale = z.enum(LOCALES).default('zh-CN')
