import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { defaultVbiThemeMode, getVbiThemeCssVariables } from './src/theme/first-paint'
import { darkVbiThemeModes, vbiThemePalettes, type VbiThemeMode } from './src/theme/palette'

type HtmlTag = {
  tag: string
  attrs?: Record<string, string | boolean | null | undefined>
  children?: string
  append?: boolean
  head?: boolean
  metadata?: Record<string, unknown>
}

const apiOrigin = process.env.VBI_API_ORIGIN || 'http://localhost:3030'
const collaborationOrigin = process.env.VBI_COLLABORATION_ORIGIN || 'http://localhost:1234'
const browserProcessEnv = {
  FORCE_COLOR: '',
  HTTP_PROXY: '',
  HTTPS_PROXY: '',
  NEXT_PUBLIC_ASSISTANT_BASE_URL: '',
  OPENAI_API_KEY: '',
  PI_CACHE_RETENTION: '',
  http_proxy: '',
  https_proxy: '',
}
const clientEnv = {
  'import.meta.env.NEXT_PUBLIC_AGENT_MODEL': JSON.stringify(process.env.NEXT_PUBLIC_AGENT_MODEL || ''),
  'import.meta.env.NEXT_PUBLIC_AGENT_PROVIDER': JSON.stringify(process.env.NEXT_PUBLIC_AGENT_PROVIDER || ''),
  'import.meta.env.NEXT_PUBLIC_VBI_API_BASE_URL': JSON.stringify(process.env.NEXT_PUBLIC_VBI_API_BASE_URL || ''),
  'import.meta.env.PUBLIC_AGENT_MODEL': JSON.stringify(process.env.PUBLIC_AGENT_MODEL || ''),
  'import.meta.env.PUBLIC_AGENT_PROVIDER': JSON.stringify(process.env.PUBLIC_AGENT_PROVIDER || ''),
  'import.meta.env.PUBLIC_VBI_API_BASE_URL': JSON.stringify(process.env.PUBLIC_VBI_API_BASE_URL || ''),
  'process.env': JSON.stringify(browserProcessEnv),
}
const firstPaintThemeVariables = Object.fromEntries(
  Object.keys(vbiThemePalettes).map((mode) => [mode, getVbiThemeCssVariables(mode as VbiThemeMode)]),
) as Record<VbiThemeMode, ReturnType<typeof getVbiThemeCssVariables>>
const firstPaintDarkThemeModes = Object.fromEntries(darkVbiThemeModes.map((mode) => [mode, true]))
const firstPaintDefaultVariables = firstPaintThemeVariables[defaultVbiThemeMode]
const firstPaintDefaultVariableDeclarations = Object.entries(firstPaintDefaultVariables)
  .map(([name, value]) => `${name}:${value}`)
  .join(';')
const firstPaintCriticalStyle = `
:root{color-scheme:light;${firstPaintDefaultVariableDeclarations}}
*,::before,::after,::backdrop,::file-selector-button{border-color:var(--vbi-border,#d8dee7)}
body{margin:0;background-color:var(--vbi-bg,#ffffff);color:var(--vbi-text,#18181b)}
html[data-vbi-first-paint='pending'] *,html[data-vbi-first-paint='pending'] *::before,html[data-vbi-first-paint='pending'] *::after{transition:none!important}
`.trim()
const firstPaintThemeScript = `
(() => {
  try {
    const themes = ${JSON.stringify(firstPaintThemeVariables)};
    const darkThemes = ${JSON.stringify(firstPaintDarkThemeModes)};
    const fallbackMode = ${JSON.stringify(defaultVbiThemeMode)};
    const themeKey = 'vbi.theme';
    const readCookie = (key) => {
      const prefix = encodeURIComponent(key) + '=';
      const values = document.cookie ? document.cookie.split('; ') : [];

      for (const value of values) {
        if (value.startsWith(prefix)) return decodeURIComponent(value.slice(prefix.length));
      }

      return null;
    };
    const readStorage = (key) => {
      try {
        return window.localStorage.getItem(key);
      } catch {
        return null;
      }
    };
    let mode = readCookie(themeKey) || readStorage(themeKey) || fallbackMode;

    if (!themes[mode]) mode = fallbackMode;

    const tone = darkThemes[mode] ? 'dark' : 'light';
    const root = document.documentElement;

    root.setAttribute('data-vbi-first-paint', 'pending');
    root.dataset.theme = mode;
    root.dataset.themeTone = tone;
    root.style.colorScheme = tone;

    for (const name in themes[mode]) {
      root.style.setProperty(name, themes[mode][name]);
    }
  } catch {}
})();
`.trim()

const isAppStylesheetTag = (tag: HtmlTag) => tag.tag === 'link' && tag.attrs?.rel === 'stylesheet'
const isEntryScriptTag = (tag: HtmlTag) => tag.tag === 'script' && typeof tag.attrs?.src === 'string'
const prioritizeStylesheetTags = (tags: HtmlTag[]) => {
  const stylesheetTags = tags.filter(isAppStylesheetTag)

  if (stylesheetTags.length === 0) return tags

  const otherTags = tags.filter((tag) => !isAppStylesheetTag(tag))
  const firstEntryScriptIndex = otherTags.findIndex(isEntryScriptTag)

  if (firstEntryScriptIndex < 0) return tags

  return [...otherTags.slice(0, firstEntryScriptIndex), ...stylesheetTags, ...otherTags.slice(firstEntryScriptIndex)]
}

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    define: clientEnv,
    entry: {
      index: './src/main.tsx',
    },
  },
  html: {
    title: 'VBI',
    favicon: './public/favicon.png',
    tags: [
      {
        tag: 'script',
        children: firstPaintThemeScript,
        head: true,
        append: false,
      },
      {
        tag: 'style',
        children: firstPaintCriticalStyle,
        head: true,
        append: false,
      },
      prioritizeStylesheetTags,
    ],
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: apiOrigin,
        changeOrigin: true,
      },
      '/collaboration': {
        target: collaborationOrigin,
        changeOrigin: true,
        pathRewrite: { '^/collaboration': '' },
      },
    },
  },
})
