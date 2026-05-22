import type { CSSProperties } from 'react'
import type { AppLocale } from '../../i18n'
import { appLocales, useTranslation } from '../../i18n'
import { Button } from '../../components/ui/button'
import { DropdownMenu } from '../../components/ui/dropdown-menu'
import { ChevronDown, Globe2, Palette } from '../../components/ui/icons'
import { type AppThemeMode, useAppPreferencesStore } from '../../stores/app-preferences.store'
import { darkVbiThemeModes, lightVbiThemeModes, vbiThemePalettes } from '../../theme/palette'

type ThemeSwatchStyle = CSSProperties & {
  '--theme-swatch': string
}

const localeLabels: Record<AppLocale, string> = {
  'de-DE': 'app.language.de',
  'en-US': 'app.language.en',
  'fr-FR': 'app.language.fr',
  'id-ID': 'app.language.id',
  'ja-JP': 'app.language.ja',
  'ko-KR': 'app.language.ko',
  'vi-VN': 'app.language.vi',
  'zh-CN': 'app.language.zh',
}

const themeGroups = [
  { label: '浅色', modes: lightVbiThemeModes },
  { label: '深色', modes: darkVbiThemeModes },
] as const

const ThemeSwatch = ({ mode }: { mode: AppThemeMode }) => (
  <span
    aria-hidden='true'
    className='manage-theme-swatch'
    style={{ '--theme-swatch': vbiThemePalettes[mode].primary } as ThemeSwatchStyle}
  />
)

export const ManagePreferences = () => {
  const themeMode = useAppPreferencesStore((state) => state.themeMode)
  const setThemeMode = useAppPreferencesStore((state) => state.setThemeMode)
  const { locale, setLocale, t } = useTranslation()

  return (
    <div className='manage-preferences' aria-label={t('app.theme.switch')}>
      <DropdownMenu
        closeOnSelect={false}
        menuClassName='manage-theme-menu'
        items={themeGroups
          .flatMap((group) => group.modes)
          .map((mode) => ({
            key: mode,
            label: <ThemeSwatch mode={mode} />,
            onSelect: () => setThemeMode(mode),
          }))}
        renderContent={() => (
          <div className='manage-theme-panel'>
            {themeGroups.map((group) => (
              <div className='manage-theme-group' key={group.label}>
                <span className='manage-theme-group-label'>{group.label}</span>
                <div className='manage-theme-row' role='radiogroup' aria-label={group.label}>
                  {group.modes.map((mode) => (
                    <button
                      aria-checked={themeMode === mode}
                      aria-label={mode}
                      className='manage-theme-option'
                      data-active={themeMode === mode}
                      key={mode}
                      role='radio'
                      title={mode}
                      type='button'
                      onClick={() => setThemeMode(mode)}
                    >
                      <ThemeSwatch mode={mode} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        trigger={
          <Button
            className='manage-theme-trigger'
            icon={<Palette className='h-3.5 w-3.5' />}
            size='sm'
            variant='ghost'
            aria-label={t('app.theme.switch')}
            title={t('app.theme.switch')}
          >
            <ThemeSwatch mode={themeMode} />
            <ChevronDown className='manage-theme-caret h-3.5 w-3.5' />
          </Button>
        }
      />
      <DropdownMenu
        items={appLocales.map((key) => ({
          key,
          label: t(localeLabels[key]),
          onSelect: () => setLocale(key),
        }))}
        trigger={
          <Button className='manage-locale-button' icon={<Globe2 className='h-4 w-4' />} size='sm' variant='ghost'>
            <span>{t(localeLabels[locale])}</span>
            <ChevronDown className='manage-locale-caret h-4 w-4' />
          </Button>
        }
      />
    </div>
  )
}
