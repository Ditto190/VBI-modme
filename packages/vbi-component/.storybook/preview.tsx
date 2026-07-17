import { setCustomElementsManifest, type Preview } from '@storybook/web-components-vite'
import customElements from './custom-elements.json'

/**
 * Eagerly imports and registers all custom elements in the Storybook preview.
 * This bypasses Stencil's lazy loader and allows Vite to bundle the components directly.
 */
// @ts-expect-error TypeScript doesn't know about Vite's import.meta.glob
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
