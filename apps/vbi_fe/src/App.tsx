import { memo } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { registerDemoConnector } from '@visactor/headless-bi-provider';
import { DebugBridgeInstaller } from './components/DebugBridgeInstaller';
import { NavigationBinder } from './components/NavigationBinder';
import { ManageChartsPage } from './pages/ManageChartsPage';
import { ManageInsightsPage } from './pages/ManageInsightsPage';
import { ManageLayoutPage } from './pages/ManageLayoutPage';
import { ReportDetailPage } from './pages/ReportDetailPage';
import { ReportsPage } from './pages/ReportsPage';
import './App.css';

// Register once (or safely re-register)
registerDemoConnector();

const App = memo(() => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1677ff',
        },
      }}
    >
      <BrowserRouter>
        <NavigationBinder />
        <DebugBridgeInstaller />
        <Routes>
          <Route path="/" element={<Navigate to="/reports" replace />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/reports/:id" element={<ReportDetailPage />} />
          <Route path="/manage" element={<ManageLayoutPage />}>
            <Route index element={<Navigate to="/manage/charts" replace />} />
            <Route path="charts" element={<ManageChartsPage />} />
            <Route path="insights" element={<ManageInsightsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
});

export default App;
