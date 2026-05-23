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
  { labelKey: 'app.theme.light', modes: lightVbiThemeModes },
  { labelKey: 'app.theme.dark', modes: darkVbiThemeModes },
] as const

const ThemeSwatch = ({ mode }: { mode: AppThemeMode }) => (
  <span
    aria-hidden='true'
    className='block h-3.5 w-3.5 rounded-full bg-[var(--theme-swatch)] shadow-sm transition duration-150'
    style={{ '--theme-swatch': vbiThemePalettes[mode].primary } as ThemeSwatchStyle}
  />
)

export const ManagePreferences = () => {
  const themeMode = useAppPreferencesStore((state) => state.themeMode)
  const setThemeMode = useAppPreferencesStore((state) => state.setThemeMode)
  const { locale, setLocale, t } = useTranslation()

  return (
    <div
      className='vbi-motion-soft-reveal mx-4 mt-auto flex h-12 w-[calc(100%-32px)] items-center justify-between gap-3 border-t border-[var(--vbi-border)] py-2 max-[720px]:mx-3 max-[720px]:mb-3 max-[720px]:mt-0 max-[720px]:w-80 max-[720px]:max-w-[calc(100%-24px)]'
      aria-label={t('app.theme.switch')}
    >
      <DropdownMenu
        closeOnSelect={false}
        menuClassName='w-52 min-w-0 p-2'
        placement='top-start'
        items={themeGroups
          .flatMap((group) => group.modes)
          .map((mode) => ({
            key: mode,
            label: <ThemeSwatch mode={mode} />,
            onSelect: () => setThemeMode(mode),
          }))}
        renderContent={() => (
          <div className='grid gap-2'>
            {themeGroups.map((group) => (
              <div className='grid gap-1.5' key={group.labelKey}>
                <span className='text-[10px] font-semibold leading-none text-[var(--vbi-text-muted)]'>
                  {t(group.labelKey)}
                </span>
                <div className='grid grid-cols-6 gap-1.5' role='radiogroup' aria-label={t(group.labelKey)}>
                  {group.modes.map((mode) => (
                    <button
                      aria-checked={themeMode === mode}
                      aria-label={t(`app.theme.${mode}`)}
                      className='grid size-6 cursor-pointer place-items-center rounded-full border border-transparent bg-transparent p-0 outline-none transition duration-150 ease-out hover:scale-110 hover:border-[var(--vbi-border-strong)] hover:bg-[var(--vbi-surface-solid)] focus-visible:border-[var(--vbi-primary)] focus-visible:shadow-[0_0_0_3px_var(--vbi-focus)] data-[active=true]:scale-110 data-[active=true]:animate-[vbi-subtle-pop_var(--vbi-motion)_var(--vbi-ease-pop)] data-[active=true]:border-[var(--vbi-border-strong)] data-[active=true]:bg-[var(--vbi-surface-solid)] data-[active=true]:[&_span]:scale-110'
                      data-active={themeMode === mode}
                      key={mode}
                      role='radio'
                      title={t(`app.theme.${mode}`)}
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
            className='h-8 min-w-20 justify-center gap-2.5 px-1.5 text-[var(--vbi-text-muted)] [&_svg:last-child]:text-[var(--vbi-placeholder)]'
            icon={<Palette className='h-4 w-4' />}
            size='sm'
            variant='ghost'
            aria-label={t('app.theme.switch')}
            title={t('app.theme.switch')}
          >
            <ThemeSwatch mode={themeMode} />
            <ChevronDown className='h-4 w-4' />
          </Button>
        }
      />
      <DropdownMenu
        placement='top-end'
        items={appLocales.map((key) => ({
          key,
          label: t(localeLabels[key]),
          onSelect: () => setLocale(key),
        }))}
        trigger={
          <Button
            className='h-8 w-24 min-w-0 justify-center gap-2.5 overflow-hidden px-1.5 text-xs text-[var(--vbi-text-muted)] hover:text-[var(--vbi-text-strong)] [&_span]:min-w-0 [&_span]:shrink [&_span]:truncate [&_span]:text-center [&_svg:last-child]:text-[var(--vbi-placeholder)]'
            icon={<Globe2 className='h-4 w-4' />}
            size='sm'
            variant='ghost'
          >
            <span>{t(localeLabels[locale])}</span>
            <ChevronDown className='h-4 w-4' />
          </Button>
        }
      />
    </div>
  )
}
