# Register

## Theme

### registerCustomTheme

:::note{title=Deskripsi}
Mendaftarkan tema kustom.
:::

```ts
function registerCustomTheme(key: string, themeConfig:
    | CustomThemeConfig
    | ((props: { lightTheme: CustomThemeConfig; darkTheme: CustomThemeConfig }) => CustomThemeConfig)): void
```

**Parameter:**

- Identifier unik untuk tema
- Objek konfigurasi tema, atau fungsi yang mengembalikan objek konfigurasi
Jika berupa fungsi, fungsi ini menerima objek yang berisi lightTheme dan darkTheme sebagai parameter, sehingga mudah memperluas tema yang sudah ada.

**Contoh:**

registerCustomTheme('myTheme', { ... });
// Atau ubah berdasarkan tema terang
registerCustomTheme('myTheme', ({ lightTheme }) => ({ ...lightTheme, ... }));

### registerDarkTheme

:::note{title=Deskripsi}
Mendaftarkan tema gelap (Dark Theme).
Setelah terdaftar, dapat diambil melalui Builder.getTheme('dark').
:::

```ts
function registerDarkTheme(): void
```

### registerLightTheme

:::note{title=Deskripsi}
Mendaftarkan tema terang (Light Theme).
Setelah terdaftar, dapat diambil melalui Builder.getTheme('light').
:::

```ts
function registerLightTheme(): void
```

## ChartType

### registerArea

:::note{title=Deskripsi}
Mendaftarkan pipeline pembuatan untuk Area Chart.
Setelah terdaftar, Builder akan mendukung pembuatan Spec dan Advanced Config untuk Area Chart.
:::

```ts
function registerArea(): void
```

### registerAreaPercent

:::note{title=Deskripsi}
Mendaftarkan pipeline pembuatan untuk Area Percent Chart.
Setelah terdaftar, Builder akan mendukung pembuatan Spec dan Advanced Config untuk Area Percent Chart.
:::

```ts
function registerAreaPercent(): void
```

### registerBar

:::note{title=Deskripsi}
Mendaftarkan pipeline pembuatan untuk Bar Chart.
Setelah terdaftar, Builder akan mendukung pembuatan Spec dan Advanced Config untuk Bar Chart.
:::

```ts
function registerBar(): void
```

### registerBarParallel

:::note{title=Deskripsi}
Mendaftarkan pipeline pembuatan untuk Bar Parallel Chart.
Setelah terdaftar, Builder akan mendukung pembuatan Spec dan Advanced Config untuk Bar Parallel Chart.
:::

```ts
function registerBarParallel(): void
```

### registerBarPercent

:::note{title=Deskripsi}
Mendaftarkan pipeline pembuatan untuk Bar Percent Chart.
Setelah terdaftar, Builder akan mendukung pembuatan Spec dan Advanced Config untuk Bar Percent Chart.
:::

```ts
function registerBarPercent(): void
```

### registerBoxPlot

:::note{title=Deskripsi}
Mendaftarkan pipeline pembuatan untuk Box Plot Chart.
Setelah terdaftar, Builder akan mendukung pembuatan Spec dan Advanced Config untuk Box Plot Chart.
:::

```ts
function registerBoxPlot(): void
```

### registerCirclePacking

:::note{title=Deskripsi}
Mendaftarkan pipeline pembuatan untuk CirclePacking Chart.
Setelah terdaftar, Builder akan mendukung pembuatan Spec dan Advanced Config untuk CirclePacking Chart.
:::

```ts
function registerCirclePacking(): void
```

### registerColumn

:::note{title=Deskripsi}
Mendaftarkan pipeline pembuatan untuk Column Chart.
Setelah terdaftar, Builder akan mendukung pembuatan Spec dan Advanced Config untuk Column Chart.
:::

```ts
function registerColumn(): void
```

### registerColumnParallel

:::note{title=Deskripsi}
Mendaftarkan pipeline pembuatan untuk Column Parallel Chart.
Setelah terdaftar, Builder akan mendukung pembuatan Spec dan Advanced Config untuk Column Parallel Chart.
:::

```ts
function registerColumnParallel(): void
```

### registerColumnPercent

:::note{title=Deskripsi}
Mendaftarkan pipeline pembuatan untuk Column Percent Chart.
Setelah terdaftar, Builder akan mendukung pembuatan Spec dan Advanced Config untuk Column Percent Chart.
:::

```ts
function registerColumnPercent(): void
```

### registerDonut

:::note{title=Deskripsi}
Mendaftarkan pipeline pembuatan untuk Donut Chart.
Setelah terdaftar, Builder akan mendukung pembuatan Spec dan Advanced Config untuk Donut Chart.
:::

```ts
function registerDonut(): void
```

### registerDualAxis

:::note{title=Deskripsi}
Mendaftarkan pipeline pembuatan untuk Dual Axis Chart.
Setelah terdaftar, Builder akan mendukung pembuatan Spec dan Advanced Config untuk Dual Axis Chart.
:::

```ts
function registerDualAxis(): void
```

### registerFunnel

:::note{title=Deskripsi}
Mendaftarkan pipeline pembuatan untuk Funnel Chart.
Setelah terdaftar, Builder akan mendukung pembuatan Spec dan Advanced Config untuk Funnel Chart.
:::

```ts
function registerFunnel(): void
```

### registerHeatmap

:::note{title=Deskripsi}
Mendaftarkan pipeline pembuatan untuk Heatmap Chart.
Setelah terdaftar, Builder akan mendukung pembuatan Spec dan Advanced Config untuk Heatmap Chart.
:::

```ts
function registerHeatmap(): void
```

### registerHierarchySankey

:::note{title=Deskripsi}
Mendaftarkan pipeline pembuatan untuk HierarchySankey Chart.
:::

```ts
function registerHierarchySankey(): void
```

### registerHistogram

:::note{title=Deskripsi}
Mendaftarkan pipeline pembuatan untuk Histogram Chart.
Setelah terdaftar, Builder akan mendukung pembuatan Spec dan Advanced Config untuk Histogram Chart.
:::

```ts
function registerHistogram(): void
```

### registerLine

:::note{title=Deskripsi}
Mendaftarkan pipeline pembuatan untuk Line Chart.
Setelah terdaftar, Builder akan mendukung pembuatan Spec dan Advanced Config untuk Line Chart.
:::

```ts
function registerLine(): void
```

### registerPie

:::note{title=Deskripsi}
Mendaftarkan pipeline pembuatan untuk Pie Chart.
Setelah terdaftar, Builder akan mendukung pembuatan Spec dan Advanced Config untuk Pie Chart.
:::

```ts
function registerPie(): void
```

### registerPivotTable

:::note{title=Deskripsi}
Mendaftarkan pipeline pembuatan untuk Pivot Table Chart.
Setelah terdaftar, Builder akan mendukung pembuatan Spec dan Advanced Config untuk Pivot Table Chart.
:::

```ts
function registerPivotTable(): void
```

### registerRaceBar

:::note{title=Deskripsi}
Mendaftarkan pipeline pembuatan untuk RaceBar Chart.
Setelah terdaftar, Builder akan mendukung pembuatan Spec untuk RaceBar Chart.
:::

```ts
function registerRaceBar(): void
```

### registerRaceColumn

:::note{title=Deskripsi}
Mendaftarkan pipeline pembuatan untuk RaceColumn Chart.
Setelah terdaftar, Builder akan mendukung pembuatan Spec untuk RaceColumn Chart.
:::

```ts
function registerRaceColumn(): void
```

### registerRaceDonut

:::note{title=Deskripsi}
Mendaftarkan pipeline pembuatan untuk RaceDonut Chart.
Setelah terdaftar, Builder akan mendukung pembuatan Spec untuk RaceDonut Chart.
:::

```ts
function registerRaceDonut(): void
```

### registerRaceLine

:::note{title=Deskripsi}
Mendaftarkan pipeline pembuatan untuk RaceLine Chart.
Setelah terdaftar, Builder akan mendukung pembuatan Spec untuk RaceLine Chart.
:::

```ts
function registerRaceLine(): void
```

### registerRacePie

:::note{title=Deskripsi}
Mendaftarkan pipeline pembuatan untuk RacePie Chart.
Setelah terdaftar, Builder akan mendukung pembuatan Spec untuk RacePie Chart.
:::

```ts
function registerRacePie(): void
```

### registerRaceScatter

:::note{title=Deskripsi}
Mendaftarkan pipeline pembuatan untuk RaceScatter Chart.
Setelah terdaftar, Builder akan mendukung pembuatan Spec untuk RaceScatter Chart.
:::

```ts
function registerRaceScatter(): void
```

### registerRadar

:::note{title=Deskripsi}
Mendaftarkan pipeline pembuatan untuk Radar Chart.
Setelah terdaftar, Builder akan mendukung pembuatan Spec dan Advanced Config untuk Radar Chart.
:::

```ts
function registerRadar(): void
```

### registerRose

:::note{title=Deskripsi}
Mendaftarkan pipeline pembuatan untuk Rose Chart.
Setelah terdaftar, Builder akan mendukung pembuatan Spec dan Advanced Config untuk Rose Chart.
:::

```ts
function registerRose(): void
```

### registerRoseParallel

:::note{title=Deskripsi}
Mendaftarkan pipeline pembuatan untuk Rose Parallel Chart.
Setelah terdaftar, Builder akan mendukung pembuatan Spec dan Advanced Config untuk Rose Parallel Chart.
:::

```ts
function registerRoseParallel(): void
```

### registerSankey

```ts
function registerSankey(): void
```

### registerScatter

:::note{title=Deskripsi}
Mendaftarkan pipeline pembuatan untuk Scatter Chart.
Setelah terdaftar, Builder akan mendukung pembuatan Spec dan Advanced Config untuk Scatter Chart.
:::

```ts
function registerScatter(): void
```

### registerSunburst

:::note{title=Deskripsi}
Mendaftarkan pipeline pembuatan untuk Sunburst Chart.
Setelah terdaftar, Builder akan mendukung pembuatan Spec dan Advanced Config untuk Sunburst Chart.
:::

```ts
function registerSunburst(): void
```

### registerTable

:::note{title=Deskripsi}
Mendaftarkan pipeline pembuatan untuk Table Chart.
Setelah terdaftar, Builder akan mendukung pembuatan Spec dan Advanced Config untuk Table Chart.
:::

```ts
function registerTable(): void
```

### registerTreeMap

:::note{title=Deskripsi}
Mendaftarkan pipeline pembuatan untuk TreeMap Chart.
Setelah terdaftar, Builder akan mendukung pembuatan Spec dan Advanced Config untuk TreeMap Chart.
:::

```ts
function registerTreeMap(): void
```
