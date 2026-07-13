import { useMemo } from 'react'
import { useApplication } from '../application'
import { createTranslator } from './utils'

export const useTranslation = () => {
  const locale = useApplication((state) => state.i18n.locale)
  const setLocale = useApplication((state) => state.i18n.setLocale)
  const t = useMemo(() => createTranslator(locale), [locale])

  return { locale, setLocale, t }
}
