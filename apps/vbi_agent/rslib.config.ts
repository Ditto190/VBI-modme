import { defineConfig } from '@rslib/core'

export default defineConfig({
  lib: [
    {
      bundle: true,
      autoExternal: {
        dependencies: false,
        optionalDependencies: false,
        peerDependencies: false,
      },
      format: 'esm',
      syntax: ['node 18'],
      dts: false,
    },
  ],
  output: {
    externals: ['dotenv', 'ink', 'openai', 'react', 'react/jsx-runtime'],
    target: 'node',
  },
  source: {
    entry: {
      'agent/provider-script-worker': './src/agent/provider-script-worker.ts',
      cli: './src/cli.ts',
    },
  },
})
