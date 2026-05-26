import type { Metadata } from 'next'
import { cookies, headers } from 'next/headers'
import 'katex/dist/katex.min.css'
import '../styles/pi-web-ui.css'
import './globals.css'
import { VbiAppProviders } from './providers'
import { isAppLocale, resolveLocaleFromAcceptLanguage, translate } from '../i18n/utils'
import { vbiThemePalettes, type VbiThemeMode } from '../theme/palette'

const isThemeMode = (value: string | undefined): value is VbiThemeMode =>
  typeof value === 'string' && value in vbiThemePalettes

const getRequestPreferences = async () => {
  const cookieStore = await cookies()
  const storedLocale = cookieStore.get('vbi.locale')?.value
  const storedThemeMode = cookieStore.get('vbi.theme')?.value

  const locale = isAppLocale(storedLocale)
    ? storedLocale
    : resolveLocaleFromAcceptLanguage((await headers()).get('accept-language'))

  return {
    locale,
    themeMode: isThemeMode(storedThemeMode) ? storedThemeMode : 'slate',
  }
}

export const generateMetadata = async (): Promise<Metadata> => {
  const { locale } = await getRequestPreferences()

  return {
    title: translate(locale, 'app.brand.title'),
    description: translate(locale, 'app.brand.description'),
  }
}

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { locale, themeMode } = await getRequestPreferences()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <VbiAppProviders initialLocale={locale} initialThemeMode={themeMode}>
          {children}
        </VbiAppProviders>
      </body>
    </html>
  )
}

export default RootLayout
