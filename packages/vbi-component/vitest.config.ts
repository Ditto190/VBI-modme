import { defineVitestConfig } from '@stencil/vitest/config'
import { playwright } from '@vitest/browser-playwright'
import path from 'node:path'

const alias = [{ find: 'src', replacement: path.resolve(__dirname, 'src') }]

export default defineVitestConfig({
  stencilConfig: './stencil.config.ts',
  test: {
    testTimeout: 5000,
    projects: [
      // Unit tests - node environment for functions / logic
      {
        resolve: { alias },
        test: {
          name: 'unit',
          include: ['tests/**/*.unit.{ts,tsx}'],
          environment: 'node',
        },
      },
      // Spec tests - via a node DOM of your choice
      {
        resolve: { alias },
        test: {
          name: 'spec',
          include: ['tests/**/*.spec.{ts,tsx}'],
          environment: 'stencil',
          setupFiles: ['./vitest-setup.ts'],
        },
      },
      // Browser tests
      {
        resolve: { alias },
        test: {
          name: 'browser',
          include: ['tests/**/*.test.{ts,tsx}'],
          setupFiles: ['./vitest-setup.ts'],
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
})
