import { useState, useEffect, useCallback } from 'react'
import type { VBIChartBuilder, VBIChartDSL } from '@visactor/vbi'
import {
  DEMO_DEFAULT_LIMIT,
  DEMO_DEFAULT_LOCALE,
  DEMO_DEFAULT_THEME,
  type DemoLocale,
  type DemoTheme,
} from 'src/constants/builder'
import { useVBIStoreConfig } from 'src/model'

export interface VBIBuilderState {
  locale: DemoLocale
  theme: DemoTheme
  limit: number
  connectorId: string
}

const normalizeLimit = (limit: number) => {
  return Math.max(1, Math.round(limit))
}

const readBuilderState = (builder: VBIChartBuilder): VBIBuilderState => {
  const dsl = builder.dsl.toJSON() as VBIChartDSL

  return {
    locale: (dsl.locale ?? DEMO_DEFAULT_LOCALE) as DemoLocale,
    theme: (dsl.theme ?? DEMO_DEFAULT_THEME) as DemoTheme,
    limit: normalizeLimit(dsl.limit ?? DEMO_DEFAULT_LIMIT),
    connectorId: dsl.connectorId ?? '',
  }
}

const isSameBuilderState = (current: VBIBuilderState, next: VBIBuilderState) => {
  return (
    current.locale === next.locale &&
    current.theme === next.theme &&
    current.limit === next.limit &&
    current.connectorId === next.connectorId
  )
}

export const useVBIBuilder = (builder: VBIChartBuilder | undefined) => {
  const appConfig = useVBIStoreConfig()
  const [state, setState] = useState<VBIBuilderState>({
    locale: DEMO_DEFAULT_LOCALE,
    theme: DEMO_DEFAULT_THEME,
    limit: DEMO_DEFAULT_LIMIT,
    connectorId: '',
  })

  useEffect(() => {
    if (!builder) {
      return
    }

    const syncState = () => {
      const nextState = readBuilderState(builder)
      setState((current) => (isSameBuilderState(current, nextState) ? current : nextState))
    }

    syncState()
    builder.doc.on('update', syncState)
    return () => {
      builder.doc.off('update', syncState)
    }
  }, [builder])

  const setLocale = useCallback(
    (locale: DemoLocale) => {
      if (builder) {
        builder.locale.setLocale(locale)
      }
    },
    [builder],
  )

  const setTheme = useCallback(
    (theme: DemoTheme) => {
      if (builder) {
        builder.theme.setTheme(theme)
      }
    },
    [builder],
  )

  const setLimit = useCallback(
    (limit: number) => {
      if (builder) {
        builder.limit.setLimit(normalizeLimit(limit))
      }
    },
    [builder],
  )

  return {
    ...state,
    locale: appConfig.locale ?? state.locale,
    theme: appConfig.theme ?? state.theme,
    setLocale,
    setTheme,
    setLimit,
  }
}
