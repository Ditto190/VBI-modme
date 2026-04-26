import { defineConfig } from 'vitest/config'

export default defineConfig({
  cacheDir: 'node_modules/.vitest',
  test: {
    root: '.',
    pool: 'forks',
    include: ['tests/**/*.test.ts'],
    exclude: ['node_modules/**', 'dist/**', '**/*.d.ts'],
  },
})
