# vbi-menu



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                                                 | Type                                   | Default      |
| --------- | --------- | ----------------------------------------------------------- | -------------------------------------- | ------------ |
| `items`   | --        | Array of menu items to be rendered                          | `MenuItem[]`                           | `[]`         |
| `size`    | `size`    | The size of the menu. Defaults to 'md'                      | `"lg" \| "md" \| "sm" \| "xl" \| "xs"` | `'md'`       |
| `variant` | `variant` | The orientation variant of the menu. Defaults to 'vertical' | `"horizontal" \| "vertical"`           | `'vertical'` |


## Events

| Event           | Description                       | Type                    |
| --------------- | --------------------------------- | ----------------------- |
| `vbiMenuSelect` | Fired when a menu item is clicked | `CustomEvent<MenuItem>` |


## Dependencies

### Used by

 - [vbi-chart-type](../../chart/vbi-chart-type)

### Depends on

- [vbi-icon](../vbi-icon)

### Graph
```mermaid
graph TD;
  vbi-menu --> vbi-icon
  vbi-chart-type --> vbi-menu
  style vbi-menu fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
