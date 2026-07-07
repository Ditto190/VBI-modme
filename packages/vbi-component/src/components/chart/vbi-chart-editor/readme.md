# vbi-chart-editor



<!-- Auto Generated Below -->


## Dependencies

### Depends on

- [vbi-chart-toolbar](../vbi-chart-toolbar)
- [vbi-chart-fields](../fields/vbi-chart-fields)
- [vbi-chart-shelf-panel](../shelves/vbi-chart-shelf-panel)

### Graph
```mermaid
graph TD;
  vbi-chart-editor --> vbi-chart-toolbar
  vbi-chart-editor --> vbi-chart-fields
  vbi-chart-editor --> vbi-chart-shelf-panel
  vbi-chart-toolbar --> vbi-chart-type
  vbi-chart-toolbar --> vbi-tooltip
  vbi-chart-toolbar --> vbi-button
  vbi-chart-toolbar --> vbi-icon
  vbi-chart-toolbar --> vbi-join
  vbi-chart-toolbar --> vbi-input
  vbi-chart-type --> vbi-dropdown
  vbi-chart-type --> vbi-button
  vbi-chart-type --> vbi-menu
  vbi-menu --> vbi-icon
  vbi-chart-fields --> vbi-chart-field-filter
  vbi-chart-fields --> vbi-chart-field-section
  vbi-chart-field-filter --> vbi-input
  vbi-chart-field-filter --> vbi-dropdown
  vbi-chart-field-filter --> vbi-button
  vbi-chart-field-filter --> vbi-icon
  vbi-chart-field-filter --> vbi-checkbox
  vbi-chart-field-section --> vbi-icon
  vbi-chart-field-section --> vbi-button
  vbi-chart-shelf-panel --> vbi-chart-dimension
  vbi-chart-dimension --> vbi-button
  vbi-chart-dimension --> vbi-icon
  style vbi-chart-editor fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
