import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'

const appDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

await build({
  banner: {
    js: 'import { createRequire as __vbiCreateRequire } from "node:module"; const require = __vbiCreateRequire(import.meta.url);',
  },
  bundle: true,
  entryPoints: [path.join(appDir, 'src/cli.ts')],
  external: ['bufferutil', 'utf-8-validate', 'dotenv', '@visactor/vquery', '@visactor/vquery/*'],
  format: 'esm',
  loader: {
    '.md': 'text',
  },
  outfile: path.join(appDir, 'dist/cli.js'),
  platform: 'node',
  target: 'node24',
})
