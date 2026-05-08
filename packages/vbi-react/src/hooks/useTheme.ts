import type { VBIChartBuilder } from '@visactor/vbi'

import { useBuilderObserver } from '../internal'

export interface UseThemeReturn {
  setTheme: (theme: string) => void
  theme: string
}

export function useTheme(builder: VBIChartBuilder): UseThemeReturn {
  const theme = useBuilderObserver(
    (callback) => builder.theme.observe(() => callback()),
    () => builder.theme.getTheme(),
  )

  return {
    setTheme: (themeValue) => {
      builder.theme.setTheme(themeValue)
    },
    theme,
  }
}
