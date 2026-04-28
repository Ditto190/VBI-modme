import { DownOutlined, GlobalOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons'
import { Button, Dropdown } from 'antd'
import type { AppLocale } from '../../i18n'
import { useTranslation } from '../../i18n'
import { type AppThemeMode, useAppPreferencesStore } from '../../stores/app-preferences.store'
import './manage-preferences.css'

const themeOptions: AppThemeMode[] = ['light', 'dark']

export const ManagePreferences = () => {
  const themeMode = useAppPreferencesStore((state) => state.themeMode)
  const setThemeMode = useAppPreferencesStore((state) => state.setThemeMode)
  const { locale, setLocale, t } = useTranslation()

  return (
    <div className="manage-preferences" aria-label={t('app.theme.switch')}>
      <div className="manage-theme-switch" role="group">
        {themeOptions.map((mode) => (
          <button
            key={mode}
            className="manage-theme-option"
            data-active={themeMode === mode}
            type="button"
            aria-pressed={themeMode === mode}
            onClick={() => setThemeMode(mode)}
          >
            {mode === 'light' ? <SunOutlined /> : <MoonOutlined />}
            <span>{mode === 'light' ? t('app.theme.light') : t('app.theme.dark')}</span>
          </button>
        ))}
      </div>
      <Dropdown
        trigger={['click']}
        menu={{
          selectedKeys: [locale],
          onClick: ({ key }) => setLocale(key as AppLocale),
          items: [
            { key: 'zh-CN', label: t('app.language.zh') },
            { key: 'en-US', label: t('app.language.en') },
          ],
        }}
      >
        <Button className="manage-locale-button" icon={<GlobalOutlined />} shape="round">
          <span>{locale === 'zh-CN' ? t('app.language.zh') : t('app.language.en')}</span>
          <DownOutlined className="manage-locale-caret" />
        </Button>
      </Dropdown>
    </div>
  )
}
