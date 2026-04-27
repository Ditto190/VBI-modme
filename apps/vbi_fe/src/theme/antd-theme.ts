import type { ThemeConfig } from 'antd';
import { createVbiAntdComponentTokens } from './antd-component-tokens';
import { createVbiAntdGlobalTokens } from './antd-global-tokens';
import { vbiThemePalettes, type VbiThemeMode } from './palette';

const createVbiAntdTheme = (mode: VbiThemeMode): ThemeConfig => {
  const palette = vbiThemePalettes[mode];

  return {
    token: createVbiAntdGlobalTokens(palette),
    components: createVbiAntdComponentTokens(palette),
  };
};

const vbiAntdThemes = {
  light: createVbiAntdTheme('light'),
  dark: createVbiAntdTheme('dark'),
} satisfies Record<VbiThemeMode, ThemeConfig>;

export const getVbiAntdTheme = (mode: VbiThemeMode): ThemeConfig =>
  vbiAntdThemes[mode];
