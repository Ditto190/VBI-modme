# vbi-chart-shelf-panel



<!-- Auto Generated Below -->


## Dependencies

### Used by

 - [vbi-chart-editor](../../vbi-chart-editor)

### Depends on

- [vbi-chart-dimension](../vbi-chart-dimension)
- [vbi-chart-measure](../vbi-chart-measure)

### Graph
```mermaid
graph TD;
  vbi-chart-shelf-panel --> vbi-chart-dimension
  vbi-chart-shelf-panel --> vbi-chart-measure
  vbi-chart-dimension --> vbi-dropdown
  vbi-chart-dimension --> vbi-button
  vbi-chart-dimension --> vbi-icon
  vbi-chart-dimension --> vbi-cascading-menu
  vbi-chart-dimension --> vbi-modal
  vbi-chart-dimension --> vbi-input
  vbi-chart-measure --> vbi-dropdown
  vbi-chart-measure --> vbi-button
  vbi-chart-measure --> vbi-icon
  vbi-chart-measure --> vbi-cascading-menu
  vbi-chart-measure --> vbi-modal
  vbi-chart-measure --> vbi-input
  vbi-chart-editor --> vbi-chart-shelf-panel
  style vbi-chart-shelf-panel fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
