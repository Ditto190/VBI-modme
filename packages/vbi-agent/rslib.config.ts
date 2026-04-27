import { defineConfig } from '@rslib/core'

export default defineConfig({
  lib: [
    {
      format: 'esm',
      syntax: ['node 18'],
      dts: true,
      bundle: true,
    },
    {
      format: 'cjs',
      syntax: ['node 18'],
      bundle: true,
    },
  ],
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
