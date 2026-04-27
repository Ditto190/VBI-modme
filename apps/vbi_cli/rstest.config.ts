import { defineConfig } from '@rstest/core'

export default defineConfig({
  testEnvironment: 'node',
  include: ['tests/**/*.test.ts'],
  exclude: ['node_modules/**', 'dist/**', '**/*.d.ts'],
  resolve: {
    alias: {
      '@visactor/headless-bi-provider': [new URL('../vbi_provider/src/index.ts', import.meta.url).pathname],
      '@visactor/vbi': [new URL('../../packages/vbi/src/index.ts', import.meta.url).pathname],
      '@visactor/vbi-agent': [new URL('../../packages/vbi-agent/src/index.ts', import.meta.url).pathname],
      'src/*': [new URL('../../packages/vbi/src/*', import.meta.url).pathname],
    },
  },
  tools: {
    rspack: {
      module: {
        rules: [
          {
            resourceQuery: /raw/,
            test: /\.(csv|md)$/,
            type: 'asset/source',
          },
        ],
      },
    },
  },
})
