/// <reference types="vite/client" />
import { setCustomElementsManifest, type Preview } from '@storybook/web-components-vite'
import customElementsDefault from './custom-elements.json'

import customElements_de_DE from './custom-elements/custom-elements.de-DE.json'
import customElements_fr_FR from './custom-elements/custom-elements.fr-FR.json'
import customElements_id_ID from './custom-elements/custom-elements.id-ID.json'
import customElements_ja_JP from './custom-elements/custom-elements.ja-JP.json'
import customElements_ko_KR from './custom-elements/custom-elements.ko-KR.json'
import customElements_vi_VN from './custom-elements/custom-elements.vi-VN.json'
import customElements_zh_CN from './custom-elements/custom-elements.zh-CN.json'

const locale = import.meta.env.STORYBOOK_LOCALE

let customElements = customElementsDefault
if (locale === 'de-DE') customElements = customElements_de_DE
else if (locale === 'fr-FR') customElements = customElements_fr_FR
else if (locale === 'id-ID') customElements = customElements_id_ID
else if (locale === 'ja-JP') customElements = customElements_ja_JP
else if (locale === 'ko-KR') customElements = customElements_ko_KR
else if (locale === 'vi-VN') customElements = customElements_vi_VN
else if (locale === 'zh-CN') customElements = customElements_zh_CN

/**
 * Eagerly imports and registers all custom elements in the Storybook preview.
 * This bypasses Stencil's lazy loader and allows Vite to bundle the components directly.
 */
import.meta.glob('../dist/components/**/*.js', { eager: true })
/**
 * Loads and registers component metadata for Storybook.
 * This enables automatic generation of props, methods, events, slots, shadow parts, and CSS variables tables.
 */
setCustomElementsManifest(customElements)

const preview: Preview = {
  parameters: {
    interactions: { disable: true },
    actions: { disable: true },
    darkMode: {
      darkClass: 'dark',
      lightClass: 'light',
      classTarget: 'html',
    },
  },
  tags: ['autodocs'],
  decorators: [
    (story, { globals }) => {
      const currentTheme = globals.backgrounds.value || 'light'

      const body = document.body
      body.classList.remove('light', 'dark')
      body.classList.add(currentTheme)

      return story()
    },
  ],
}

export default preview
