import {
  AppstoreOutlined,
  BarChartOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Outlet } from 'react-router-dom';
import { useTranslation } from '../i18n';
import { useAppPreferencesStore } from '../stores/app-preferences.store';
import { useNavigationStore } from '../stores/navigation.store';
import './manage-resource/manage-layout.css';
import './manage-resource/manage-resource.css';
import './manage-resource/manage-resource-table.css';
import './manage-resource/manage-responsive.css';
import { ManagePreferences } from './manage-resource/ManagePreferences';

const { Sider, Content } = Layout;

export const ManageLayoutPage = () => {
  const pathname = useNavigationStore((state) => state.pathname);
  const go = useNavigationStore((state) => state.go);
  const themeMode = useAppPreferencesStore((state) => state.themeMode);
  const { t } = useTranslation();

  return (
    <Layout className="manage-layout">
      <Sider className="manage-sider" width={240} theme={themeMode}>
        <div className="manage-brand">
          <div className="manage-brand-title">{t('app.brand.title')}</div>
          <div className="manage-brand-meta">{t('app.brand.meta')}</div>
        </div>
        <Menu
          className="manage-menu"
          mode="inline"
          selectedKeys={[pathname]}
          items={[
            {
              key: '/manage/reports',
              icon: <FileTextOutlined />,
              label: t('nav.reports'),
            },
            {
              key: '/manage/charts',
              icon: <BarChartOutlined />,
              label: t('nav.charts'),
            },
            {
              key: '/manage/insights',
              icon: <AppstoreOutlined />,
              label: t('nav.insights'),
            },
          ]}
          onClick={({ key }) => go(key)}
        />
        <ManagePreferences />
      </Sider>
      <Content className="manage-content">
        <Outlet />
      </Content>
    </Layout>
  );
};
