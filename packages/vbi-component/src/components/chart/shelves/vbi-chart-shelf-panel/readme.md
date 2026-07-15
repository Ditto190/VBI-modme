# vbi-chart-shelf-panel



<!-- Auto Generated Below -->


## Dependencies

### Used by

 - [vbi-chart-editor](../../vbi-chart-editor)

### Depends on

- [vbi-tooltip](../../../ui/vbi-tooltip)
- [vbi-button](../../../ui/vbi-button)
- [vbi-chart-dimension](../vbi-chart-dimension)
- [vbi-chart-measure](../vbi-chart-measure)
- [vbi-chart-where](../vbi-chart-where)
- [vbi-chart-having](../vbi-chart-having)

### Graph
```mermaid
graph TD;
  vbi-chart-shelf-panel --> vbi-tooltip
  vbi-chart-shelf-panel --> vbi-button
  vbi-chart-shelf-panel --> vbi-chart-dimension
  vbi-chart-shelf-panel --> vbi-chart-measure
  vbi-chart-shelf-panel --> vbi-chart-where
  vbi-chart-shelf-panel --> vbi-chart-having
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
  vbi-chart-measure --> vbi-tab
  vbi-chart-measure --> vbi-select
  vbi-chart-measure --> vbi-input
  vbi-chart-measure --> vbi-switch
  vbi-chart-measure --> vbi-modal
  vbi-tab --> vbi-icon
  vbi-chart-where --> vbi-dropdown
  vbi-chart-where --> vbi-button
  vbi-chart-where --> vbi-icon
  vbi-chart-where --> vbi-chart-where-filter
  vbi-chart-where-filter --> vbi-select
  vbi-chart-where-filter --> vbi-input
  vbi-chart-where-filter --> vbi-button
  vbi-chart-having --> vbi-dropdown
  vbi-chart-having --> vbi-button
  vbi-chart-having --> vbi-icon
  vbi-chart-having --> vbi-chart-having-filter
  vbi-chart-having-filter --> vbi-input
  vbi-chart-having-filter --> vbi-select
  vbi-chart-having-filter --> vbi-button
  vbi-chart-editor --> vbi-chart-shelf-panel
  style vbi-chart-shelf-panel fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
