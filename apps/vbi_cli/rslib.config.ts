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
    externals: ['dotenv', 'ink', 'react', 'react/jsx-runtime'],
    target: 'node',
  },
  source: {
    entry: {
      cli: './src/cli.ts',
    },
  },
  tools: {
    rspack: {
      module: {
        rules: [
          {
            resourceQuery: /raw/,
            test: /\.md$/,
            type: 'asset/source',
          },
        ],
      },
    },
  },
})
