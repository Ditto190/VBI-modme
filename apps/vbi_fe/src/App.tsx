import { useMemo } from 'react'
import { VbiAppProviders } from './app/providers'
import { matchApplicationRoute } from './application'
import { lazyComponent } from './components/LazyComponent'
import { ManageLayoutPage } from './views/workspace/ManageLayoutPage'
import { isAppLocale, resolveLocaleFromAcceptLanguage, type AppLocale } from './i18n/utils'
import { useNavigationStore } from './stores/navigation.store'
import {
  defaultAppPreferences,
  resolvePersistedLocalePreference,
  resolvePersistedThemePreference,
  type AppThemeMode,
} from './stores/app-preferences.store'

const ChartEditorPage = lazyComponent<{ id: string }>(() =>
  import('./views/resources/chart/ChartEditorPage').then((module) => ({ default: module.ChartEditorPage })),
)
const InsightEditorPage = lazyComponent<{ id: string }>(() =>
  import('./views/resources/insight/InsightEditorPage').then((module) => ({ default: module.InsightEditorPage })),
)
const ManageChartsPage = lazyComponent<object>(() =>
  import('./views/resources/chart/ManageChartsPage').then((module) => ({ default: module.ManageChartsPage })),
)
const ManageInsightsPage = lazyComponent<object>(() =>
  import('./views/resources/insight/ManageInsightsPage').then((module) => ({ default: module.ManageInsightsPage })),
)
const AgentPage = lazyComponent<object>(() =>
  import('./views/agent/AgentPage').then((module) => ({ default: module.AgentPage })),
)
const ReportDetailPage = lazyComponent<{ id: string }>(() =>
  import('./views/report-detail/ReportDetailPage').then((module) => ({ default: module.ReportDetailPage })),
)
const ReportsPage = lazyComponent<object>(() =>
  import('./views/resources/report/ReportsPage').then((module) => ({ default: module.ReportsPage })),
)

const resolveInitialLocale = (): AppLocale => {
  const storedLocale = resolvePersistedLocalePreference()
  if (isAppLocale(storedLocale)) return storedLocale

  const languages = typeof navigator === 'undefined' ? [] : navigator.languages
  return resolveLocaleFromAcceptLanguage(languages?.join(',') ?? '')
}

const resolveInitialThemeMode = (): AppThemeMode => resolvePersistedThemePreference() ?? defaultAppPreferences.themeMode

const RoutedWorkspace = () => {
  const pathname = useNavigationStore((state) => state.pathname)
  const route = useMemo(() => matchApplicationRoute(pathname), [pathname])

  const page = (() => {
    switch (route.name) {
      case 'agent':
        return <AgentPage />
      case 'chartDetail':
        return <ChartEditorPage id={route.id} />
      case 'charts':
        return <ManageChartsPage />
      case 'insightDetail':
        return <InsightEditorPage id={route.id} />
      case 'insights':
        return <ManageInsightsPage />
      case 'reportDetail':
        return <ReportDetailPage id={route.id} />
      case 'reports':
        return <ReportsPage />
    }
  })()

  if (route.name === 'agent') return page

  return <ManageLayoutPage>{page}</ManageLayoutPage>
}

const AppShell = () => {
  const { locale, themeMode } = useMemo(
    () => ({
      locale: resolveInitialLocale(),
      themeMode: resolveInitialThemeMode(),
    }),
    [],
  )

  return (
    <VbiAppProviders initialLocale={locale} initialThemeMode={themeMode}>
      <RoutedWorkspace />
    </VbiAppProviders>
  )
}

export const App = AppShell
