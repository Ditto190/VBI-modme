import { defineConfig } from '@rslib/core'

const optionalNativeExternals = new Set(['bufferutil', 'utf-8-validate'])
const runtimePackageExternals = new Set(['@visactor/vquery'])

const isRuntimePackageExternal = (request: string) =>
  runtimePackageExternals.has(request) || [...runtimePackageExternals].some((name) => request.startsWith(`${name}/`))

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
    sourceMap: true,
    externals: [
      'dotenv',
      '@earendil-works/pi-tui',
      ({ request }, callback) => {
        if (request && optionalNativeExternals.has(request)) return callback(undefined, request, 'commonjs')
        if (request && isRuntimePackageExternal(request)) return callback(undefined, request, 'module')
        callback()
      },
    ],
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
            test: /\.(csv|md)$/,
            type: 'asset/source',
          },
        ],
      },
    },
  },
})
