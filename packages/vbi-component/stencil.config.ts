import { type Config } from '@stencil/core'

const isDev = process.argv.includes('--dev')

export const config: Config = {
  namespace: 'vbi-component',
  globalStyle: 'src/global/app.css',
  rollupConfig: {
    inputOptions: {
      external: isDev
        ? []
        : ['@visactor/vbi', '@visactor/vchart', '@visactor/vquery', '@visactor/vseed', '@visactor/vtable'],
    },
  },
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
      minify: true,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'docs-json',
      file: './.storybook/custom-elements.json',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
}
