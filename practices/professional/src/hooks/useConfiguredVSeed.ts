import { useMemo } from 'react'
import type { VSeed } from '@visactor/vseed'
import type { ProfessionalLocale, ProfessionalTheme } from 'src/constants/builder'

export const useConfiguredVSeed = (vseed: VSeed | null, locale: ProfessionalLocale, theme: ProfessionalTheme) =>
  useMemo(() => (vseed ? ({ ...vseed, locale, theme } as VSeed) : null), [locale, theme, vseed])
