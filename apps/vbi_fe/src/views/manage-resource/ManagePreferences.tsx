import { useState, type CSSProperties } from 'react'
import type { AppLocale, Translate } from '../../i18n'
import { appLocales, useTranslation } from '../../i18n'
import { DropdownMenu } from '../../components/ui/dropdown-menu'
import { ChevronDown, Globe2, Palette } from '../../components/ui/icons'
import { cn } from '../../lib/utils'
import { type AppThemeMode, useAppPreferencesStore } from '../../stores/app-preferences.store'
import { darkVbiThemeModes, lightVbiThemeModes, vbiThemePalettes } from '../../theme/palette'

type ThemeSwatchStyle = CSSProperties & {
  '--theme-swatch': string
}

type ThemeColorInfoStyle = CSSProperties & {
  '--theme-primary': string
  '--theme-secondary': string
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

const getThemeColorSummary = (mode: AppThemeMode, t: Translate) => {
  const palette = vbiThemePalettes[mode]

  return `${t(`app.theme.${mode}`)} | ${t('app.theme.primaryColor')} ${palette.primary} | ${t('app.theme.secondaryColor')} ${palette.secondary}`
}

const ThemeColorRow = ({ label, tone, value }: { label: string; tone: 'primary' | 'secondary'; value: string }) => (
  <span className='flex min-w-0 items-center gap-1.5 text-[10px] leading-4 text-[var(--vbi-text-muted)]'>
    <span
      className={cn(
        'size-2.5 shrink-0 rounded-full border border-[var(--vbi-border)]',
        tone === 'primary' ? 'bg-[var(--theme-primary)]' : 'bg-[var(--theme-secondary)]',
      )}
    />
    <span className='shrink-0 font-medium text-[var(--vbi-text)]'>{label}</span>
    <span className='min-w-0 truncate font-mono text-[var(--vbi-text-soft)]'>{value}</span>
  </span>
)

const ThemeColorInfo = ({ mode, t }: { mode: AppThemeMode; t: Translate }) => {
  const palette = vbiThemePalettes[mode]

  return (
    <div
      className='grid gap-1.5 rounded-md border border-[var(--vbi-border)] bg-[var(--vbi-control-muted)] p-2'
      style={
        {
          '--theme-primary': palette.primary,
          '--theme-secondary': palette.secondary,
        } as ThemeColorInfoStyle
      }
    >
      <span className='truncate text-[11px] font-semibold leading-none text-[var(--vbi-text-strong)]'>
        {t(`app.theme.${mode}`)}
      </span>
      <div className='grid gap-0.5'>
        <ThemeColorRow label={t('app.theme.primaryColor')} tone='primary' value={palette.primary} />
        <ThemeColorRow label={t('app.theme.secondaryColor')} tone='secondary' value={palette.secondary} />
      </div>
    </div>
  )
}

export const ManagePreferences = () => {
  const themeMode = useAppPreferencesStore((state) => state.themeMode)
  const setThemeMode = useAppPreferencesStore((state) => state.setThemeMode)
  const { locale, setLocale, t } = useTranslation()
  const [previewThemeMode, setPreviewThemeMode] = useState<AppThemeMode | null>(null)
  const colorInfoMode = previewThemeMode ?? themeMode

  return (
    <div
      className='mx-4 mt-auto flex h-12 w-[calc(100%-32px)] items-center justify-between gap-3 border-t border-[var(--vbi-border)] py-2 max-[720px]:mx-3 max-[720px]:mb-3 max-[720px]:mt-0 max-[720px]:w-80 max-[720px]:max-w-[calc(100%-24px)]'
      aria-label={t('app.theme.switch')}
    >
      <DropdownMenu
        closeOnSelect={false}
        menuClassName='w-64 max-w-[calc(100vw-24px)] min-w-0 p-2'
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
                <div
                  className='grid grid-cols-6 gap-1.5'
                  role='radiogroup'
                  aria-label={t(group.labelKey)}
                  onBlur={(event) => {
                    const nextTarget = event.relatedTarget
                    if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
                      setPreviewThemeMode(null)
                    }
                  }}
                  onMouseLeave={() => setPreviewThemeMode(null)}
                >
                  {group.modes.map((mode) => {
                    const colorSummary = getThemeColorSummary(mode, t)

                    return (
                      <button
                        aria-checked={themeMode === mode}
                        aria-label={colorSummary}
                        className='grid size-6 cursor-pointer place-items-center rounded-full border border-transparent bg-transparent p-0 outline-none transition-[background-color,border-color,box-shadow] duration-150 ease-out hover:border-[var(--vbi-border-strong)] hover:bg-[var(--vbi-secondary)] focus-visible:border-[var(--vbi-primary)] focus-visible:shadow-[0_0_0_3px_var(--vbi-focus)] data-[active=true]:border-[var(--vbi-border-strong)] data-[active=true]:bg-[var(--vbi-secondary)]'
                        data-active={themeMode === mode}
                        key={mode}
                        role='radio'
                        title={colorSummary}
                        type='button'
                        onClick={() => setThemeMode(mode)}
                        onFocus={() => setPreviewThemeMode(mode)}
                        onMouseEnter={() => setPreviewThemeMode(mode)}
                      >
                        <ThemeSwatch mode={mode} />
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
            <ThemeColorInfo mode={colorInfoMode} t={t} />
          </div>
        )}
        trigger={
          <button
            className='inline-flex h-8 min-w-20 cursor-pointer items-center justify-center gap-2.5 rounded-md border border-transparent bg-transparent px-1.5 text-xs font-medium text-[var(--vbi-text-muted)] transition-[background-color,color,box-shadow] duration-150 ease-out hover:bg-[var(--vbi-hover-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vbi-focus)] [&_svg:last-child]:text-[var(--vbi-placeholder)]'
            type='button'
            aria-label={t('app.theme.switch')}
            title={t('app.theme.switch')}
          >
            <Palette className='h-4 w-4' />
            <ThemeSwatch mode={themeMode} />
            <ChevronDown className='h-4 w-4' />
          </button>
        }
      />
      <div className='ml-auto flex min-w-0 justify-end'>
        <DropdownMenu
          placement='top-end'
          items={appLocales.map((key) => ({
            key,
            label: t(localeLabels[key]),
            onSelect: () => setLocale(key),
          }))}
          trigger={
            <button
              className='inline-flex h-8 w-auto max-w-full cursor-pointer items-center justify-center gap-2.5 rounded-md border border-transparent bg-transparent px-1.5 text-xs font-medium text-[var(--vbi-text-muted)] transition-[background-color,color,box-shadow] duration-150 ease-out hover:bg-[var(--vbi-hover-bg)] hover:text-[var(--vbi-text-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vbi-focus)] [&_span]:min-w-0 [&_span]:whitespace-nowrap [&_svg]:shrink-0 [&_svg:last-child]:text-[var(--vbi-placeholder)]'
              type='button'
              aria-label={t('app.language.switch')}
              title={t('app.language.switch')}
            >
              <Globe2 className='h-4 w-4' />
              <span>{t(localeLabels[locale])}</span>
              <ChevronDown className='h-4 w-4' />
            </button>
          }
        />
      </div>
    </div>
  )
}
