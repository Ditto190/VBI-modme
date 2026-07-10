# vbi-button

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                       | Type                                                                                               | Default     |
| ---------- | ---------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ----------- |
| `active`   | `active`   | Active state (pressed/selected)                   | `boolean`                                                                                          | `false`     |
| `color`    | `color`    | Main color (primary, secondary, accent, etc.)     | `"accent" \| "error" \| "info" \| "neutral" \| "primary" \| "secondary" \| "success" \| "warning"` | `undefined` |
| `disabled` | `disabled` | Disabled state                                    | `boolean`                                                                                          | `false`     |
| `shape`    | `shape`    | Shape (square, circle, wide, block)               | `"block" \| "circle" \| "square" \| "wide"`                                                        | `undefined` |
| `size`     | `size`     | Size (xs, sm, md, lg, xl)                         | `"lg" \| "md" \| "sm" \| "xl" \| "xs"`                                                             | `undefined` |
| `type`     | `type`     | Type of the button                                | `"button" \| "reset" \| "submit"`                                                                  | `'button'`  |
| `variant`  | `variant`  | Button variant (ghost, outline, dash, soft, link) | `"dash" \| "ghost" \| "link" \| "outline" \| "soft"`                                               | `undefined` |


## Dependencies

### Used by

 - [vbi-chart-dimension](../../chart/shelves/vbi-chart-dimension)
 - [vbi-chart-field-filter](../../chart/fields/vbi-chart-field-filter)
 - [vbi-chart-field-section](../../chart/fields/vbi-chart-field-section)
 - [vbi-chart-having](../../chart/shelves/vbi-chart-having)
 - [vbi-chart-having-filter](../../chart/shelves/vbi-chart-having-filter)
 - [vbi-chart-measure](../../chart/shelves/vbi-chart-measure)
 - [vbi-chart-shelf-panel](../../chart/shelves/vbi-chart-shelf-panel)
 - [vbi-chart-toolbar](../../chart/vbi-chart-toolbar)
 - [vbi-chart-type](../../chart/vbi-chart-type)
 - [vbi-chart-where](../../chart/shelves/vbi-chart-where)
 - [vbi-chart-where-filter](../../chart/shelves/vbi-chart-where-filter)

### Graph
```mermaid
graph TD;
  vbi-chart-dimension --> vbi-button
  vbi-chart-field-filter --> vbi-button
  vbi-chart-field-section --> vbi-button
  vbi-chart-having --> vbi-button
  vbi-chart-having-filter --> vbi-button
  vbi-chart-measure --> vbi-button
  vbi-chart-shelf-panel --> vbi-button
  vbi-chart-toolbar --> vbi-button
  vbi-chart-type --> vbi-button
  vbi-chart-where --> vbi-button
  vbi-chart-where-filter --> vbi-button
  style vbi-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
