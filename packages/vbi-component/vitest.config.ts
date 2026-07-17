import { defineVitestConfig } from '@stencil/vitest/config'
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
    ],
  },
})
