import { type Config } from '@stencil/core'

export const config: Config = {
  namespace: 'vbi-component',
  rollupConfig: {
    inputOptions: {
      external: ['@visactor/vbi', '@visactor/vchart', '@visactor/vquery', '@visactor/vseed', '@visactor/vtable'],
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
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'docs-custom-elements-manifest',
      file: './.storybook/custom-elements.json',
    },
  ],
}
