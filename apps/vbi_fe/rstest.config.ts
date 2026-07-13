import { pluginReact } from '@rsbuild/plugin-react'
import { defineConfig } from '@rstest/core'

// Docs: https://rstest.rs/config/
export default defineConfig({
  // jsdom-heavy UI tests can exhaust the Docker frontend container when forked in parallel.
  pool: {
    maxWorkers: 1,
  },
  plugins: [pluginReact()],
  testEnvironment: 'jsdom',
  setupFiles: ['./rstest.setup.ts'],
})
