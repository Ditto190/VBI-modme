// .storybook/preview.tsx
import { defineCustomElements } from '../loader/index.js'
import { setCustomElementsManifest, type Preview } from '@stencil/storybook-plugin'
import customElements from './custom-elements.json'

/**
 * Registers all custom elements in the Storybook preview.
 */
defineCustomElements()

/**
 * Loads and registers component metadata for Storybook.
 * This enables automatic generation of props, methods, events, slots, shadow parts, and CSS variables tables.
 */
setCustomElementsManifest(customElements)

const preview: Preview = {
  decorators: [
    (story, context) => {
      const currentTheme = context.globals.backgrounds.value || 'light'

      const body = document.body
      body.classList.remove('light', 'dark')
      body.classList.add(currentTheme)

      return story()
    },
  ],
}

export default preview
