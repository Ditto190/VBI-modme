import { useMemo } from 'react'
import { VbiAppProviders } from './app/providers'
import { lazyComponent } from './components/LazyComponent'
import { ManageLayoutPage } from './views/ManageLayoutPage'
import { isAppLocale, resolveLocaleFromAcceptLanguage, type AppLocale } from './i18n/utils'
import { useNavigationStore } from './stores/navigation.store'
import {
  defaultAppPreferences,
  resolvePersistedLocalePreference,
  resolvePersistedThemePreference,
  type AppThemeMode,
} from './stores/app-preferences.store'

const AgentPage = lazyComponent<object>(() =>
  import('./views/AgentPage').then((module) => ({ default: module.AgentPage })),
)
const ChartEditorPage = lazyComponent<{ id: string }>(() =>
  import('./views/manage-resource/ChartEditorPage').then((module) => ({ default: module.ChartEditorPage })),
)
const InsightEditorPage = lazyComponent<{ id: string }>(() =>
  import('./views/manage-resource/InsightEditorPage').then((module) => ({ default: module.InsightEditorPage })),
)
const ManageChartsPage = lazyComponent<object>(() =>
  import('./views/ManageChartsPage').then((module) => ({ default: module.ManageChartsPage })),
)
const ManageInsightsPage = lazyComponent<object>(() =>
  import('./views/ManageInsightsPage').then((module) => ({ default: module.ManageInsightsPage })),
)
const ReportDetailPage = lazyComponent<{ id: string }>(() =>
  import('./views/ReportDetailPage').then((module) => ({ default: module.ReportDetailPage })),
)
const ReportsPage = lazyComponent<object>(() =>
  import('./views/ReportsPage').then((module) => ({ default: module.ReportsPage })),
)

const resolveInitialLocale = (): AppLocale => {
  const storedLocale = resolvePersistedLocalePreference()
  if (isAppLocale(storedLocale)) return storedLocale

  const languages = typeof navigator === 'undefined' ? [] : navigator.languages
  return resolveLocaleFromAcceptLanguage(languages?.join(',') ?? '')
}

const resolveInitialThemeMode = (): AppThemeMode => resolvePersistedThemePreference() ?? defaultAppPreferences.themeMode

type RouteMatch =
  | { name: 'agent'; conversationId?: string }
  | { name: 'chartDetail'; id: string }
  | { name: 'charts' }
  | { name: 'insightDetail'; id: string }
  | { name: 'insights' }
  | { name: 'reportDetail'; id: string }
  | { name: 'reports' }

const readRouteId = (pathname: string, prefix: string) => {
  const segment = pathname.slice(prefix.length).split('/')[0] ?? ''
  try {
    return decodeURIComponent(segment)
  } catch {
    return segment
  }
}

const matchRoute = (pathname: string): RouteMatch => {
  if (pathname === '/' || pathname === '/manage') return { name: 'reports' }
  if (pathname === '/agent' || pathname === '/manage/agent') return { name: 'agent' }
  if (pathname.startsWith('/agent/')) return { name: 'agent', conversationId: readRouteId(pathname, '/agent/') }
  if (pathname === '/manage/charts') return { name: 'charts' }
  if (pathname.startsWith('/manage/charts/')) {
    return { name: 'chartDetail', id: readRouteId(pathname, '/manage/charts/') }
  }
  if (pathname === '/manage/insights') return { name: 'insights' }
  if (pathname.startsWith('/manage/insights/')) {
    return { name: 'insightDetail', id: readRouteId(pathname, '/manage/insights/') }
  }
  if (pathname.startsWith('/manage/reports/')) {
    return { name: 'reportDetail', id: readRouteId(pathname, '/manage/reports/') }
  }
  return { name: 'reports' }
}

const RoutedWorkspace = () => {
  const pathname = useNavigationStore((state) => state.pathname)
  const route = useMemo(() => matchRoute(pathname), [pathname])

  const page = (() => {
    switch (route.name) {
      case 'agent':
        void route.conversationId
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
