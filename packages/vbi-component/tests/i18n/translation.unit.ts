import { describe, expect, it, vi } from '@stencil/vitest'
import { VBI_DEFAULT_LOCALE } from 'src/constants/builder'
import { createTranslationStore } from 'src/i18n/translation'
import { translate } from 'src/i18n/utils'
import { createChartBuilderStore } from 'src/store/chart/builder'
import { createTestBuilder } from '../store/test-helpers'

describe('createTranslationStore', () => {
  it('should initialize with default locale when dsl has no locale specified', () => {
    const builder = createTestBuilder('trans-conn-1')
    const chartBuilder = createChartBuilderStore(builder)
    const translationStore = createTranslationStore(chartBuilder)

    expect(translationStore.state.locale).toBe(VBI_DEFAULT_LOCALE)
    expect(translationStore.state.t('builderCreateChart')).toBe(translate(VBI_DEFAULT_LOCALE, 'builderCreateChart'))

    translationStore.dispose()
    chartBuilder.dispose()
  })

  it('should initialize with initial dsl locale if present', () => {
    const builder = createTestBuilder('trans-conn-2')
    builder.locale.setLocale('en-US')

    const chartBuilder = createChartBuilderStore(builder)
    const translationStore = createTranslationStore(chartBuilder)

    expect(translationStore.state.locale).toBe('en-US')
    expect(translationStore.state.t('builderCreateChart')).toBe(translate('en-US', 'builderCreateChart'))

    translationStore.dispose()
    chartBuilder.dispose()
  })

  it('should update locale and translator function when dsl changes via setLocale', async () => {
    const builder = createTestBuilder('trans-conn-3')
    const chartBuilder = createChartBuilderStore(builder)
    chartBuilder.initialize()
    const translationStore = createTranslationStore(chartBuilder)

    expect(translationStore.state.locale).toBe(VBI_DEFAULT_LOCALE)

    const oldT = translationStore.state.t

    translationStore.setLocale('en-US')

    await vi.waitFor(
      () => {
        expect(translationStore.state.locale).toBe('en-US')
      },
      { timeout: 2000, interval: 50 },
    )

    expect(translationStore.state.t).not.toBe(oldT)
    expect(translationStore.state.t('builderCreateChart')).toBe(translate('en-US', 'builderCreateChart'))

    translationStore.dispose()
    chartBuilder.dispose()
  })

  it('should not recreate translator function when dsl changes but locale is unchanged', () => {
    const builder = createTestBuilder('trans-conn-4')
    const chartBuilder = createChartBuilderStore(builder)
    chartBuilder.initialize()
    const translationStore = createTranslationStore(chartBuilder)

    const currentT = translationStore.state.t

    // Simulate dsl update with same locale
    chartBuilder.state.dsl = { ...chartBuilder.state.dsl, locale: VBI_DEFAULT_LOCALE }

    expect(translationStore.state.locale).toBe(VBI_DEFAULT_LOCALE)
    expect(translationStore.state.t).toBe(currentT)

    translationStore.dispose()
    chartBuilder.dispose()
  })

  it('should fallback to VBI_DEFAULT_LOCALE if updated dsl has no locale', () => {
    const builder = createTestBuilder('trans-conn-5')
    builder.locale.setLocale('en-US')
    const chartBuilder = createChartBuilderStore(builder)
    chartBuilder.initialize()
    const translationStore = createTranslationStore(chartBuilder)

    expect(translationStore.state.locale).toBe('en-US')

    // Simulate dsl update where locale is undefined/null
    chartBuilder.state.dsl = { ...chartBuilder.state.dsl, locale: undefined as any }

    expect(translationStore.state.locale).toBe(VBI_DEFAULT_LOCALE)
    expect(translationStore.state.t('builderCreateChart')).toBe(translate(VBI_DEFAULT_LOCALE, 'builderCreateChart'))

    translationStore.dispose()
    chartBuilder.dispose()
  })

  it('should call setLocale safely even if builder.locale is undefined or mocked', () => {
    const builder = createTestBuilder('trans-conn-6')
    const chartBuilder = createChartBuilderStore(builder)
    const translationStore = createTranslationStore(chartBuilder)

    const spy = vi.spyOn(builder.locale, 'setLocale')
    translationStore.setLocale('ja-JP')

    expect(spy).toHaveBeenCalledWith('ja-JP')

    translationStore.dispose()
    chartBuilder.dispose()
  })
})
