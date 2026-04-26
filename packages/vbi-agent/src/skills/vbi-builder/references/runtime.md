# Runtime

Call `vbi_builder` with JavaScript. Script globals:

- `workspace`: injected Builder workspace.
- `chart`: chart workspace slot.
- `report`: report workspace slot.
- `json(value)`: returns `value` as the tool result.
- `assert(cond, msg)`: throws when `cond` is false.
- `console`: captured into the tool result logs.

Open the builder from the injected slot. If the CLI was started with
`--chart-id`, `chart.open()` uses that chart. Otherwise list resources with
`vbi_resource` and pass the id to `chart.open(id)`.

```js
const b = await chart.open('chart-id')
b.chartType.changeChartType('bar')
b.dimensions.add('region', (n) => n.setEncoding('yAxis'))
b.measures.add('sales', (n) => n.setEncoding('xAxis').setAggregate({ func: 'sum' }))
return json({ dsl: b.build() })
```
