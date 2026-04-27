import { GlobalOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, Tooltip } from 'antd';
import type { AppLocale } from '../../i18n';
import { useTranslation } from '../../i18n';
import {
  type AppThemeMode,
  useAppPreferencesStore,
} from '../../stores/app-preferences.store';

export const ManagePreferences = () => {
  const themeMode = useAppPreferencesStore((state) => state.themeMode);
  const setThemeMode = useAppPreferencesStore((state) => state.setThemeMode);
  const { locale, setLocale, t } = useTranslation();
  const themeIcon = themeMode === 'dark' ? <MoonOutlined /> : <SunOutlined />;
  const themeLabel =
    themeMode === 'dark' ? t('app.theme.dark') : t('app.theme.light');

  return (
    <Space className="manage-preferences" size={8}>
      <Tooltip title={t('app.theme.switch')}>
        <Button
          className="manage-preference-button"
          icon={themeIcon}
          shape="round"
          onClick={() =>
            setThemeMode(
              (themeMode === 'dark' ? 'light' : 'dark') as AppThemeMode,
            )
          }
        >
          {themeLabel}
        </Button>
      </Tooltip>
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
        <Button
          className="manage-preference-button"
          icon={<GlobalOutlined />}
          shape="round"
        >
          {locale === 'zh-CN' ? t('app.language.zh') : t('app.language.en')}
        </Button>
      </Dropdown>
    </Space>
  );
};
