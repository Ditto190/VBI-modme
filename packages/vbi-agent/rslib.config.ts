import { defineConfig } from '@rslib/core'

export default defineConfig({
  lib: [
    {
      dts: true,
      format: 'esm',
      syntax: ['node 18'],
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
