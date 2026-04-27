import type { CSSProperties } from 'react';
import { vbiThemePalettes, type VbiThemeMode } from './palette';

type CssVariableName = `--vbi-${string}`;
type CssVariableStyle = CSSProperties & Record<CssVariableName, string>;

const toCssVariableName = (key: string): CssVariableName =>
  `--vbi-${key.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`)}`;

export const getVbiThemeStyle = (mode: VbiThemeMode): CSSProperties =>
  Object.entries(vbiThemePalettes[mode]).reduce<CssVariableStyle>(
    (style, [key, value]) => {
      if (typeof value === 'string') {
        style[toCssVariableName(key)] = value;
      }

      return style;
    },
    {} as CssVariableStyle,
  );
