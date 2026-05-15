# Register

## Theme

### registerCustomTheme

:::note{title=Mô tả}
Đăng ký theme tùy chỉnh.
:::

```ts
function registerCustomTheme(key: string, themeConfig:
    | CustomThemeConfig
    | ((props: { lightTheme: CustomThemeConfig; darkTheme: CustomThemeConfig }) => CustomThemeConfig)): void
```

**Tham số:**

- Định danh duy nhất của theme
- Đối tượng cấu hình theme, hoặc một hàm trả về đối tượng cấu hình
Nếu là hàm, hàm sẽ nhận một đối tượng chứa lightTheme và darkTheme làm tham số, giúp mở rộng dựa trên theme hiện có dễ dàng hơn.

**Ví dụ:**

registerCustomTheme('myTheme', { ... });
// Hoặc chỉnh sửa dựa trên theme sáng
registerCustomTheme('myTheme', ({ lightTheme }) => ({ ...lightTheme, ... }));

### registerDarkTheme

:::note{title=Mô tả}
Đăng ký theme tối (Dark Theme).
Sau khi đăng ký, có thể lấy qua Builder.getTheme('dark').
:::

```ts
function registerDarkTheme(): void
```

### registerLightTheme

:::note{title=Mô tả}
Đăng ký theme sáng (Light Theme).
Sau khi đăng ký, có thể lấy qua Builder.getTheme('light').
:::

```ts
function registerLightTheme(): void
```

## ChartType

### registerArea

:::note{title=Mô tả}
Đăng ký pipeline xây dựng của Area Chart.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Spec và Advanced Config của Area Chart.
:::

```ts
function registerArea(): void
```

### registerAreaPercent

:::note{title=Mô tả}
Đăng ký pipeline xây dựng của Area Percent Chart.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Spec và Advanced Config của Area Percent Chart.
:::

```ts
function registerAreaPercent(): void
```

### registerBar

:::note{title=Mô tả}
Đăng ký pipeline xây dựng của Bar Chart.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Spec và Advanced Config của Bar Chart.
:::

```ts
function registerBar(): void
```

### registerBarParallel

:::note{title=Mô tả}
Đăng ký pipeline xây dựng của Bar Parallel Chart.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Spec và Advanced Config của Bar Parallel Chart.
:::

```ts
function registerBarParallel(): void
```

### registerBarPercent

:::note{title=Mô tả}
Đăng ký pipeline xây dựng của Bar Percent Chart.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Spec và Advanced Config của Bar Percent Chart.
:::

```ts
function registerBarPercent(): void
```

### registerBoxPlot

:::note{title=Mô tả}
Đăng ký pipeline xây dựng của Box Plot Chart.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Spec và Advanced Config của Box Plot Chart.
:::

```ts
function registerBoxPlot(): void
```

### registerCirclePacking

:::note{title=Mô tả}
Đăng ký pipeline xây dựng của CirclePacking Chart.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Spec và Advanced Config của CirclePacking Chart.
:::

```ts
function registerCirclePacking(): void
```

### registerColumn

:::note{title=Mô tả}
Đăng ký pipeline xây dựng của Column Chart.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Spec và Advanced Config của Column Chart.
:::

```ts
function registerColumn(): void
```

### registerColumnParallel

:::note{title=Mô tả}
Đăng ký pipeline xây dựng của Column Parallel Chart.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Spec và Advanced Config của Column Parallel Chart.
:::

```ts
function registerColumnParallel(): void
```

### registerColumnPercent

:::note{title=Mô tả}
Đăng ký pipeline xây dựng của Column Percent Chart.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Spec và Advanced Config của Column Percent Chart.
:::

```ts
function registerColumnPercent(): void
```

### registerDonut

:::note{title=Mô tả}
Đăng ký pipeline xây dựng của Donut Chart.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Spec và Advanced Config của Donut Chart.
:::

```ts
function registerDonut(): void
```

### registerDualAxis

:::note{title=Mô tả}
Đăng ký pipeline xây dựng của Dual Axis Chart.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Spec và Advanced Config của Dual Axis Chart.
:::

```ts
function registerDualAxis(): void
```

### registerFunnel

:::note{title=Mô tả}
Đăng ký pipeline xây dựng của Funnel Chart.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Spec và Advanced Config của Funnel Chart.
:::

```ts
function registerFunnel(): void
```

### registerHeatmap

:::note{title=Mô tả}
Đăng ký pipeline xây dựng của Heatmap Chart.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Spec và Advanced Config của Heatmap Chart.
:::

```ts
function registerHeatmap(): void
```

### registerHierarchySankey

:::note{title=Mô tả}
Đăng ký pipeline xây dựng của HierarchySankey Chart.
:::

```ts
function registerHierarchySankey(): void
```

### registerHistogram

:::note{title=Mô tả}
Đăng ký pipeline xây dựng của Histogram Chart.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Spec và Advanced Config của Histogram Chart.
:::

```ts
function registerHistogram(): void
```

### registerLine

:::note{title=Mô tả}
Đăng ký pipeline xây dựng của Line Chart.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Spec và Advanced Config của Line Chart.
:::

```ts
function registerLine(): void
```

### registerPie

:::note{title=Mô tả}
Đăng ký pipeline xây dựng của Pie Chart.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Spec và Advanced Config của Pie Chart.
:::

```ts
function registerPie(): void
```

### registerPivotTable

:::note{title=Mô tả}
Đăng ký pipeline xây dựng của Pivot Table Chart.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Spec và Advanced Config của Pivot Table Chart.
:::

```ts
function registerPivotTable(): void
```

### registerRaceBar

:::note{title=Mô tả}
Đăng ký pipeline xây dựng của RaceBar Chart.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Spec của RaceBar Chart.
:::

```ts
function registerRaceBar(): void
```

### registerRaceColumn

:::note{title=Mô tả}
Đăng ký pipeline xây dựng của RaceColumn Chart.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Spec của RaceColumn Chart.
:::

```ts
function registerRaceColumn(): void
```

### registerRaceDonut

:::note{title=Mô tả}
Đăng ký pipeline xây dựng của RaceDonut Chart.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Spec của RaceDonut Chart.
:::

```ts
function registerRaceDonut(): void
```

### registerRaceLine

:::note{title=Mô tả}
Đăng ký pipeline xây dựng của RaceLine Chart.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Spec của RaceLine Chart.
:::

```ts
function registerRaceLine(): void
```

### registerRacePie

:::note{title=Mô tả}
Đăng ký pipeline xây dựng của RacePie Chart.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Spec của RacePie Chart.
:::

```ts
function registerRacePie(): void
```

### registerRaceScatter

:::note{title=Mô tả}
Đăng ký pipeline xây dựng của RaceScatter Chart.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Spec của RaceScatter Chart.
:::

```ts
function registerRaceScatter(): void
```

### registerRadar

:::note{title=Mô tả}
Đăng ký pipeline xây dựng của Radar Chart.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Spec và Advanced Config của Radar Chart.
:::

```ts
function registerRadar(): void
```

### registerRose

:::note{title=Mô tả}
Đăng ký pipeline xây dựng của Rose Chart.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Spec và Advanced Config của Rose Chart.
:::

```ts
function registerRose(): void
```

### registerRoseParallel

:::note{title=Mô tả}
Đăng ký pipeline xây dựng của Rose Parallel Chart.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Spec và Advanced Config của Rose Parallel Chart.
:::

```ts
function registerRoseParallel(): void
```

### registerScatter

:::note{title=Mô tả}
Đăng ký pipeline xây dựng của Scatter Chart.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Spec và Advanced Config của Scatter Chart.
:::

```ts
function registerScatter(): void
```

### registerSunburst

:::note{title=Mô tả}
Đăng ký pipeline xây dựng của Sunburst Chart.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Spec và Advanced Config của Sunburst Chart.
:::

```ts
function registerSunburst(): void
```

### registerTable

:::note{title=Mô tả}
Đăng ký pipeline xây dựng của Table Chart.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Spec và Advanced Config của Table Chart.
:::

```ts
function registerTable(): void
```

### registerTreeMap

:::note{title=Mô tả}
Đăng ký pipeline xây dựng của TreeMap Chart.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Spec và Advanced Config của TreeMap Chart.
:::

```ts
function registerTreeMap(): void
```

