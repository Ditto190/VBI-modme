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
          ? { statements: 77.38, lines: 77.38, branches: 73.1, functions: 76.28 }
          : mode === 'integration'
            ? undefined
            : { statements: 89.42, lines: 89.42, branches: 78.95, functions: 81.81 },
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
