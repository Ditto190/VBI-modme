# vbi-config-provider

<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                                                               | Type                                         | Default     |
| --------- | --------- | ------------------------------------------------------------------------- | -------------------------------------------- | ----------- |
| `builder` | --        | VBI chart builder instance to initialize the store with                   | `VBIChartBuilder<DefaultVBIQueryDSL, VSeed>` | `undefined` |
| `theme`   | --        | Theme configuration containing mode ('light' \| 'dark') and design tokens | `ThemeConfig`                                | `undefined` |


## Events

| Event              | Description                                    | Type                                                      |
| ------------------ | ---------------------------------------------- | --------------------------------------------------------- |
| `vbiBuilderChange` | Emitted when the builder is changed internally | `CustomEvent<VBIChartBuilder<DefaultVBIQueryDSL, VSeed>>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
