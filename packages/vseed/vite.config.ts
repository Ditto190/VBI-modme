import { defineConfig } from 'vitest/config'

export default defineConfig(({ mode }) => ({
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
    exclude: ['node_modules/**', 'dist/**', 'docs/**', '**/*.d.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      reporter: ['text', 'json', 'html', 'json-summary'],
      reportsDirectory: mode === 'unit' || mode === 'integration' ? `./coverage/${mode}` : './coverage',
      // V8 branch counts vary slightly between runs; use verified floors.
      thresholds:
        mode === 'unit'
          ? { statements: 81.9, lines: 81.9, branches: 75.7, functions: 80.3 }
          : mode === 'integration'
            ? undefined
            : { statements: 90.4, lines: 90.4, branches: 81.3, functions: 83.2 },
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vite.setup.ts'],
    alias: {
      src: new URL('./src', import.meta.url).pathname,
      '@visactor/vseed': new URL('./src', import.meta.url).pathname,
    },
  },
}))
