# vbi-modal



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description | Type                                                | Default    |
| ---------- | ---------- | ----------- | --------------------------------------------------- | ---------- |
| `open`     | `open`     |             | `boolean`                                           | `false`    |
| `position` | `position` |             | `"bottom" \| "end" \| "middle" \| "start" \| "top"` | `'middle'` |


## Events

| Event            | Description | Type                   |
| ---------------- | ----------- | ---------------------- |
| `vbiModalToggle` |             | `CustomEvent<boolean>` |


## Dependencies

### Used by

 - [vbi-chart-dimension](../../chart/shelves/vbi-chart-dimension)
 - [vbi-chart-measure](../../chart/shelves/vbi-chart-measure)
 - [vbi-chart-toolbar](../../chart/vbi-chart-toolbar)

### Graph
```mermaid
graph TD;
  vbi-chart-dimension --> vbi-modal
  vbi-chart-measure --> vbi-modal
  vbi-chart-toolbar --> vbi-modal
  style vbi-modal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
