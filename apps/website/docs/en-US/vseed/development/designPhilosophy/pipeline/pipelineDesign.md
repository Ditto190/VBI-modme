# pipeline Design

:::info Why Pipeline?
1. A choice made by senior engineers in the team.
2. The advantage of Pipeline is that it lets `VSeed` independently control the execution flow of each chart type. With good design, each chart type implementation can be decoupled while still allowing local reuse, and every chart type can precisely control any detail. This is what Pipeline brings, and it is exactly what `VSeed` needs most.
3. By comparison, the disadvantages of the Pipeline pattern can be avoided during design. As long as each `Pipe` is kept small and dependencies between `Pipe`s are reduced, the drawbacks of this pattern can be greatly avoided.
4. After four generations of Pipeline design and optimization, VSeed is already the fifth version. The pitfalls that should be encountered have already been encountered.

:::

## What is Pipeline?

Pipeline is a powerful abstraction and engineering practice. It decomposes a complex task into a series of smaller, connected steps that execute in order. Its design philosophy and implementation are deeply influenced by the core ideas of functional programming (FP).

### Advantages of Pipeline:
- Modularity: atomic implementation, composing atoms into modules.
- Automation: once the input is determined, the output can be obtained automatically without caring about internal implementation.
- Pure function: a specified input always produces the expected output, which is a characteristic of pure functions.
- Parallelism: naturally supports concurrency.
- Reusability: every module can be reused.
- Testability: in theory, every module is independent and can be tested separately to ensure quality.
- Traceability: each stage has clear input and output, making it easier to locate issues and monitor process state.
- Cacheability: in theory, the output of a single `Pipe` can be cached independently, avoiding repeated computation and improving efficiency.

### Disadvantages of Pipeline:
- Sequential dependency: when `Pipe`s depend on each other in order, the cost of understanding increases, because you need to understand earlier stages before later stages. A deep understanding of the overall flow is required to quickly locate issues.
- Debugging cost: because Pipeline executes in order, once a stage fails, the entire Pipeline fails. This makes debugging harder, because you need to locate and fix the failed stage.
- Performance issues: because Pipeline executes in order, each stage must wait for the previous stage's output, which can cause performance issues. This is especially noticeable when a stage takes a long time.
- Functional programming: understanding a new set of concepts has a learning cost. For this reason, the design principles and implementation details need to be written in the contribution guide so other developers can understand and use them, offsetting this disadvantage.

## How should Pipeline be written in VSeed?

### Pipe Composition Pattern

Multiple functional `Pipe`s can be composed into a larger functional `Pipe`, or into a more complex Pipeline.

In VSeed, a complete Pipeline corresponds to the implementation of one chart type. Different chart types can be created by describing the composition relationship between `Pipe`s. During Pipeline composition, there is no need to care about the specific implementation of each `pipe`.


#### Composition Differences

For example:

Line charts and area charts can reuse many capabilities, such as labels, legends, and axes. However, line charts do not have area mark style, so the pipeline solves this difference by composing functional `Pipe`s. There is no `if` statement in the whole process.

```ts
const lineChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,
]

const areaChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,

  // Only area charts have area mark style
  areaStyle,
]
```


### Pipe Adapter Pattern

In addition to the composition pattern, building a `Pipe` often has certain conditions. To satisfy `Pipe` composition under different conditions, VSeed uses many `Pipe` adapters.

#### Composition Conditions

For example:

Line charts have pivot capability. Without pivot, they are rendered by VChart and output a VChart spec. With pivot, they are rendered by VTable and output a VTable spec.

Pivot line charts basically need to reuse the basic capabilities of line charts, such as labels, legends, and axes. Therefore, the adapter pattern is needed to adapt line chart `Pipe`s into pivot line chart `Pipe`s.

```ts
const pivotLineChartPipeline = [
  initPivotChart,
  pivotIndicators([
    label,
    xAxis,
    yAxis,
    lineStyle,
    pointStyle,
  ]),
  pivotChartLegend,
]

const commonLineChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,
]

const lineChartPipeline = [
  pivotAdapter(commonLineChartPipeline, pivotLineChartPipeline)
]
```

In summary, every adapter is an `if else`. Conditions hidden inside a `pipe` can be abstracted into an adapter, so the `if else` is moved to the top level. This produces a Pipeline with clearer dependencies and lower maintenance cost.

### The most basic unit of Pipeline: functional Pipe

VSeed expects every chart type to use functionality as the most basic unit, providing enough reuse and extensibility. A chart type's pipeline is built bottom-up. Every functional `Pipe` should be an independent, testable, reusable module.

Most importantly, different `Pipe`s should be abstracted from functional differences (that is, write fewer `if else` statements), instead of writing one large all-in-one `Pipe`.

#### Flattened Functional Pipe

For example:

Bar charts, column charts, line charts, area charts, and scatter charts all have X and Y axes. They are similar but slightly different. If one large all-in-one `axes` pipe is written, it might look like this:

```ts
const lineChartPipeline = [
  axes
]
const barChartPipeline = [
  axes
]
const areaChartPipeline = [
  axes
]
const scatterChartPipeline = [
  axes
]
const axes = (spec, context) => {
  if (isLine || isArea || isColumn){
    // Line charts, area charts, and column charts have one discrete axis and one continuous axis
    return xy(spec, context)
  }
  if (isScatter){
    // Scatter charts have two continuous axes
    return yy(spec, context)
  }
  if (isBar){
    // Bar charts have one discrete axis and one continuous axis, but the axis direction differs from line, area, and column charts
    return yx(spec, context)
  }
}

const xy = (spec, context) => {
  linearAxis(spec, context, {orient: 'left'})
  bandAxis(spec, context, {orient: 'bottom'})
}

const yx = (spec, context) => {
  linearAxis(spec, context, {orient: 'bottom'})
  bandAxis(spec, context, {orient: 'left'})
}

const yy = (spec, context) => {
  linearAxis(spec, context, {orient: 'bottom'})
  linearAxis(spec, context, {orient: 'left'})
}
```

The logic above implements the selection of different sub-functional `pipe`s according to chart type inside one functional `Pipe`. This causes two problems:
1. How should repeated functionality inside `xy`, `yx`, and `yy` be reused? Many similar but different sub-functions need to be repeatedly called in different sub-functional `pipe`s. Dependencies can easily become tangled, increasing maintenance cost.
2. When modifying line chart and area chart functionality, it is easy to miss bar charts, because the logic has branched. Therefore, differences need to be considered when implementing new functionality.

When the whole spec pipeline grows to hundreds of `pipe`s, this writing style brings very high maintenance cost. Therefore, we need a simpler way to select different sub-functional `pipe`s according to chart type.

Continuing the example above, abstract the differences into different `Pipe`s, encapsulate the differences at a finer functional granularity, and finally compose them directly inside the pipeline. This avoids the problems above.

```ts
const lineChartPipeline = [
  xBandAxis,
  yLinearAxis,
]
const barChartPipeline = [
  yBandAxis,
  xLinearAxis,
]
const areaChartPipeline = [
  xBandAxis,
  yLinearAxis,
]
const scatterChartPipeline = [
  xLinearAxis,
  yLinearAxis,
]

const xBandAxis = (spec, context) => {
}
const yBandAxis = (spec, context) => {
}
const xLinearAxis = (spec, context) => {
}
const yLinearAxis = (spec, context) => {
}
```

In the example above, no `axes` pipe is implemented. Instead, `xBandAxis`, `yBandAxis`, `xLinearAxis`, and `yLinearAxis` are composed directly. This avoids selecting different sub-functional `pipe`s inside an `axes` pipe according to chart type, avoids chart-type-based branching, and reduces the use of `if else`.

All chart-type difference branches should be above Pipeline. Unless absolutely necessary, Pipeline does not need to select different sub-functional `pipe`s according to chart type.

This composition approach fits VSeed's design philosophy: use a flatter composition of functional `Pipe`s instead of using `if else` conditions to create one large all-in-one functional `Pipe`.
