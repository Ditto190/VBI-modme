import type { ThemeConfig } from 'antd';
import type { VbiThemePalette } from './palette';

type ComponentTokens = NonNullable<ThemeConfig['components']>;

export const createVbiAntdComponentTokens = (
  p: VbiThemePalette,
): ComponentTokens => ({
  Button: {
    dangerShadow: 'none',
    primaryColor: p.primaryText,
    primaryShadow: p.primaryShadow,
    defaultBg: p.control,
    defaultColor: p.text,
    defaultBorderColor: p.border,
    defaultHoverBg: p.surfaceSolid,
    defaultHoverColor: p.activeText,
    defaultHoverBorderColor: p.borderStrong,
    defaultActiveColor: p.activeText,
    defaultActiveBorderColor: p.borderStrong,
    textHoverBg: p.activeBg,
  },
  Input: {
    activeBg: p.control,
    activeBorderColor: p.borderStrong,
    activeShadow: `0 0 0 2px ${p.focus}`,
    hoverBg: p.control,
    hoverBorderColor: p.borderStrong,
    addonBg: p.controlMuted,
  },
  Layout: {
    bodyBg: p.bgSolid,
    headerBg: p.header,
    headerColor: p.text,
    siderBg: p.sider,
    lightSiderBg: p.sider,
  },
  Menu: {
    itemBg: 'transparent',
    itemColor: p.textMuted,
    itemHoverBg: p.activeBg,
    itemHoverColor: p.activeText,
    itemSelectedBg: p.activeBg,
    itemSelectedColor: p.activeText,
    darkItemBg: 'transparent',
    darkItemColor: p.textMuted,
    darkItemHoverBg: p.activeBg,
    darkItemHoverColor: p.activeText,
    darkItemSelectedBg: p.activeBg,
    darkItemSelectedColor: p.activeText,
  },
  Pagination: {
    itemBg: p.surfaceSolid,
    itemActiveBg: p.surfaceSolid,
    itemActiveColor: p.activeText,
    itemActiveColorHover: p.activeText,
  },
  Table: {
    borderColor: p.rowBorder,
    headerBg: p.tableHead,
    headerColor: p.textStrong,
    rowHoverBg: p.hoverBg,
    rowSelectedBg: p.activeBg,
    rowSelectedHoverBg: p.hoverBg,
  },
});
