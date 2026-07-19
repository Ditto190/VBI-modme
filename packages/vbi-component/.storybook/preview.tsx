/// <reference types="vite/client" />
import { setCustomElementsManifest, type Preview } from '@storybook/web-components-vite'
import customElementsDefault from './custom-elements.json'

const customElementsLocales = import.meta.glob('./custom-elements/*.json', { eager: true, import: 'default' })
const locale = import.meta.env.STORYBOOK_LOCALE

const localeKey = `./custom-elements/custom-elements.${locale}.json`
const customElements = (locale && customElementsLocales[localeKey]) || customElementsDefault

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
