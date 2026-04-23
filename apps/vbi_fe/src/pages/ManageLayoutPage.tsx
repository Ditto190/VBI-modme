import {
  AppstoreOutlined,
  BarChartOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Outlet } from 'react-router-dom';
import { useNavigationStore } from '../stores/navigation.store';

const { Sider, Content } = Layout;

export const ManageLayoutPage = () => {
  const pathname = useNavigationStore((state) => state.pathname);
  const go = useNavigationStore((state) => state.go);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={240} theme="light">
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          items={[
            { key: '/reports', icon: <FileTextOutlined />, label: 'Reports' },
            {
              key: '/manage/charts',
              icon: <BarChartOutlined />,
              label: 'Charts',
            },
            {
              key: '/manage/insights',
              icon: <AppstoreOutlined />,
              label: 'Insights',
            },
          ]}
          onClick={({ key }) => go(key)}
        />
      </Sider>
      <Content style={{ background: '#fff' }}>
        <Outlet />
      </Content>
    </Layout>
  );
};
