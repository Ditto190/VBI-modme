import { defineConfig } from '@rstest/core'

export default defineConfig({
  testEnvironment: 'node',
  include: ['tests/**/*.test.ts'],
  exclude: ['node_modules/**', 'dist/**', '**/*.d.ts'],
  pool: {
    type: 'forks',
    maxWorkers: 1,
  },
  coverage: {
    enabled: false,
    include: ['src/**/*.ts'],
    reporters: ['text', 'json-summary'],
    reportsDirectory: './coverage',
  },
  resolve: {
    alias: {
      '@visactor/headless-bi-provider': ['./src/index.ts'],
    },
  },
  tools: {
    rspack: {
      module: {
        rules: [
          {
            resourceQuery: /raw/,
            test: /\.csv$/,
            type: 'asset/source',
          },
        ],
      },
    },
  },
})
