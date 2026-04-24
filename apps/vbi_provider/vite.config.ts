import { defineConfig } from 'vitest/config'

export default defineConfig({
  cacheDir: 'node_modules/.vitest',
  test: {
    root: '.',
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
    include: ['tests/**/*.test.ts'],
    exclude: ['node_modules/**', 'dist/**', '**/*.d.ts'],
    alias: {
      '@visactor/vbi-provider': new URL('./src/index.ts', import.meta.url).pathname,
    },
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      reporter: ['text', 'json-summary'],
      reportsDirectory: './coverage',
    },
  },
})
