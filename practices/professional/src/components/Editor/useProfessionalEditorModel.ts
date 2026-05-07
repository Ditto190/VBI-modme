import type { ComponentProps } from 'react'
import { getFieldSlots } from 'src/config/slotConfig'
import { getLabels } from 'src/config/labels'
import { antdLocales, getThemeConfig } from 'src/config/themeConfig'
import { PROFESSIONAL_DEFAULT_THEME } from 'src/constants/builder'
import {
  useConfiguredVSeed,
  useFullscreen,
  useProfessionalFields,
  useVBIBuilder,
  useVBIChartType,
  useVBIUndoManager,
} from 'src/hooks'
import { useVBIStore, useVBIStoreConfig } from 'src/model'
import type { SchemaField } from 'src/types'
import { addRecommendedField } from 'src/utils/fieldActions'
import type { EditorContent } from './EditorContent'
import type { LoadingEditor } from './LoadingEditor'

type EditorModel = {
  content: ComponentProps<typeof EditorContent>
  initialized: boolean
  loading: ComponentProps<typeof LoadingEditor>
}

export const useProfessionalEditorModel = (mode: 'edit' | 'view'): EditorModel => {
  const initialized = useVBIStore((state) => state.initialized)
  const storeBuilder = useVBIStore((state) => state.builder)
  const dsl = useVBIStore((state) => state.dsl)
  const loading = useVBIStore((state) => state.loading)
  const schema = useVBIStore((state) => state.schema)
  const vseed = useVBIStore((state) => state.vseed)
  const config = useVBIStoreConfig()
  const builderState = useVBIBuilder(storeBuilder)
  const chart = useVBIChartType(storeBuilder)
  const undo = useVBIUndoManager(storeBuilder)
  const fullscreen = useFullscreen(mode === 'edit')
  const fields = useProfessionalFields(schema)
  const labels = getLabels(builderState.locale)
  const theme = builderState.theme ?? PROFESSIONAL_DEFAULT_THEME
  const configuredVSeed = useConfiguredVSeed(vseed, builderState.locale, theme)
  const themeConfig = getThemeConfig(theme)
  const antdLocale = antdLocales[labels.locale]
  const addField = (field: SchemaField) =>
    storeBuilder.doc.transact(() => addRecommendedField(storeBuilder, dsl, field))

  return {
    initialized,
    loading: { antdLocale, label: labels.loading, themeConfig },
    content: {
      frame: {
        antdLocale,
        isFullscreen: fullscreen.isFullscreen,
        mode,
        rootRef: fullscreen.rootRef,
        theme,
        themeConfig,
      },
      left:
        mode === 'edit'
          ? {
              fields,
              labels,
              onAddField: addField,
            }
          : null,
      workspace: {
        builder: storeBuilder,
        canRedo: undo.canRedo,
        canUndo: undo.canUndo,
        chartType: chart.chartType,
        chartTypes: chart.availableChartTypes,
        dsl,
        fields,
        hideLocale: config.hideLocale,
        hideTheme: config.hideTheme,
        isFullscreen: fullscreen.isFullscreen,
        labels,
        limit: builderState.limit,
        loading,
        locale: builderState.locale,
        showToolbar: mode === 'edit',
        slots: getFieldSlots(storeBuilder),
        theme,
        vseed: configuredVSeed,
        onChartTypeChange: chart.changeChartType,
        onLimitChange: builderState.setLimit,
        onLocaleChange: builderState.setLocale,
        onRedo: undo.redo,
        onThemeChange: builderState.setTheme,
        onToggleFullscreen: fullscreen.toggleFullscreen,
        onUndo: undo.undo,
      },
    },
  }
}
