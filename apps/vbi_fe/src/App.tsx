import { memo } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ConfigProvider, theme as antdTheme } from 'antd';
import antdEnUS from 'antd/locale/en_US';
import antdZhCN from 'antd/locale/zh_CN';
import { registerDemoConnector } from '@visactor/headless-bi-provider';
import { DebugBridgeInstaller } from './components/DebugBridgeInstaller';
import { NavigationBinder } from './components/NavigationBinder';
import { ManageChartsPage } from './pages/ManageChartsPage';
import { ManageInsightsPage } from './pages/ManageInsightsPage';
import { ManageLayoutPage } from './pages/ManageLayoutPage';
import { ReportDetailPage } from './pages/ReportDetailPage';
import { ReportsPage } from './pages/ReportsPage';
import { useAppPreferencesStore } from './stores/app-preferences.store';
import './App.css';

// Register once (or safely re-register)
registerDemoConnector();

const antdLocales = {
  'en-US': antdEnUS,
  'zh-CN': antdZhCN,
};

const App = memo(() => {
  const locale = useAppPreferencesStore((state) => state.locale);
  const themeMode = useAppPreferencesStore((state) => state.themeMode);
  const isDark = themeMode === 'dark';

  return (
    <ConfigProvider
      locale={antdLocales[locale]}
      theme={{
        algorithm: isDark
          ? antdTheme.darkAlgorithm
          : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: '#1677ff',
        },
      }}
    >
      <div data-theme={themeMode}>
        <BrowserRouter>
          <NavigationBinder />
          <DebugBridgeInstaller />
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/manage/reports" replace />}
            />
            <Route path="/reports/:id" element={<ReportDetailPage />} />
            <Route path="/manage/reports/:id" element={<ReportDetailPage />} />
            <Route path="/manage" element={<ManageLayoutPage />}>
              <Route
                index
                element={<Navigate to="/manage/reports" replace />}
              />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="charts" element={<ManageChartsPage />} />
              <Route path="insights" element={<ManageInsightsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ConfigProvider>
  );
});

export default App;
