import type { VBIChartBuilder } from '@visactor/vbi'
import { ConfigProvider, Spin } from 'antd'
import { ChartWorkspace } from 'src/components/Chart'
import { EditorWorkbench } from 'src/components/Workbench'
import { getLabels } from 'src/i18n'
import { antdLocales, getThemeConfig } from 'src/config/themeConfig'
import { useFullscreen } from 'src/hooks/useFullscreen'
import { useInitializeVBI } from 'src/hooks/useInitializeVBI'
import { useVBIStore, useVBIStoreConfig, VBIStoreProvider } from 'src/model'
import { DEMO_DEFAULT_LOCALE, DEMO_DEFAULT_THEME, type DemoLocale, type DemoTheme } from 'src/constants/builder'
import 'src/styles/app.css'

type AppMode = 'view' | 'edit'

interface APPProps {
  builder?: VBIChartBuilder
  hideLocale?: boolean
  hideTheme?: boolean
  locale?: DemoLocale
  mode?: AppMode
  theme?: DemoTheme
}

const AppContent = ({ mode }: { mode: AppMode }) => {
  const dsl = useVBIStore((state) => state.dsl)
  const initialized = useVBIStore((state) => state.initialized)
  const { locale, theme } = useVBIStoreConfig()
  const themeMode = theme ?? (dsl.theme as DemoTheme | undefined) ?? DEMO_DEFAULT_THEME
  const localeMode = locale ?? (dsl.locale as DemoLocale | undefined) ?? DEMO_DEFAULT_LOCALE
  const labels = getLabels(localeMode)
  const fullscreen = useFullscreen(mode === 'edit')

  return (
    <ConfigProvider componentSize='small' locale={antdLocales[localeMode]} theme={getThemeConfig(themeMode)}>
      <div
        ref={fullscreen.rootRef}
        className={`stream-app stream-app--${themeMode}${fullscreen.isFullscreen ? ' stream-app--fullscreen' : ''}`}
      >
        {!initialized ? (
          <Spin fullscreen tip={labels.initializing} />
        ) : mode === 'edit' ? (
          <EditorWorkbench
            isFullscreen={fullscreen.isFullscreen}
            labels={labels}
            onToggleFullscreen={fullscreen.toggleFullscreen}
          />
        ) : (
          <ChartWorkspace
            isFullscreen={fullscreen.isFullscreen}
            labels={labels}
            onToggleFullscreen={fullscreen.toggleFullscreen}
          />
        )}
      </div>
    </ConfigProvider>
  )
}

const AppShell = ({ builder, mode }: { builder?: VBIChartBuilder; mode: AppMode }) => {
  useInitializeVBI(builder)
  return <AppContent mode={mode} />
}

export const APP = (props: APPProps) => (
  <VBIStoreProvider
    builder={props.builder}
    hideLocale={props.hideLocale}
    hideTheme={props.hideTheme}
    locale={props.locale}
    theme={props.theme}
  >
    <AppShell builder={props.builder} mode={props.mode ?? 'edit'} />
  </VBIStoreProvider>
)
