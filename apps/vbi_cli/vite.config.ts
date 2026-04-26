import { defineConfig } from 'vitest/config'

export default defineConfig({
  cacheDir: 'node_modules/.vitest',
  test: {
    root: '.',
    pool: 'forks',
    include: ['tests/**/*.test.ts'],
    exclude: ['node_modules/**', 'dist/**', '**/*.d.ts'],
    alias: {
      '@visactor/headless-bi-provider': new URL('../vbi_provider/src/index.ts', import.meta.url).pathname,
      '@visactor/vbi-agent': new URL('../../packages/vbi-agent/src/index.ts', import.meta.url).pathname,
    },
  },
})
