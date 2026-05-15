import { describe, expect, it } from 'vitest'
import { intl } from 'src/i18n'
import { LOCALES, zLocale, type Locale } from 'src/types'

describe('i18n locales', () => {
  it('parses every supported locale', () => {
    for (const locale of LOCALES) {
      expect(zLocale.parse(locale)).toBe(locale)
    }
  })

  it('translates built-in labels for every supported locale', () => {
    const totalByLocale: Record<Locale, string> = {
      'zh-CN': '总计',
      'en-US': 'Total',
      'ja-JP': '合計',
      'de-DE': 'Gesamt',
      'id-ID': 'Total',
      'fr-FR': 'Total',
      'ko-KR': '총계',
      'vi-VN': 'Tổng',
    }

    for (const locale of LOCALES) {
      intl.setLocale(locale)
      expect(intl.i18n`总计`).toBe(totalByLocale[locale])
    }
  })
})
