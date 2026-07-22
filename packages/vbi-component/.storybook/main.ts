import type { StorybookConfig } from '@storybook/web-components-vite'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs', 'storybook-dark-mode'],
  core: {
    disableTelemetry: true,
  },
  framework: '@storybook/web-components-vite',
  async viteFinal(config) {
    return mergeConfig(config, {
      build: {
        minify: false,
        sourcemap: false,
        modulePreload: false,
        rollupOptions: {
          output: {
            entryFileNames: 'assets/[name].js',
            chunkFileNames: 'assets/[name].js',
            assetFileNames: 'assets/[name].[ext]',
            manualChunks: (id: any) => {
              if (id.includes('node_modules')) {
                return 'vendor'
              }
            },
          },
        },
      },
    })
  },
}
export default config
