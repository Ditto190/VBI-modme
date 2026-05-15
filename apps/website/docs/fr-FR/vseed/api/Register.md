# Register

## Theme

### registerCustomTheme

:::note{title=Description}
Enregistre un thème personnalisé.
:::

```ts
function registerCustomTheme(key: string, themeConfig:
    | CustomThemeConfig
    | ((props: { lightTheme: CustomThemeConfig; darkTheme: CustomThemeConfig }) => CustomThemeConfig)): void
```

**Paramètres :**

- Identifiant unique du thème
- Objet de configuration du thème, ou fonction qui retourne un objet de configuration
S’il s’agit d’une fonction, elle reçoit en paramètre un objet contenant lightTheme et darkTheme, ce qui facilite l’extension à partir des thèmes existants.

**Exemple :**

registerCustomTheme('myTheme', { ... });
// Ou modifier à partir du thème clair
registerCustomTheme('myTheme', ({ lightTheme }) => ({ ...lightTheme, ... }));

### registerDarkTheme

:::note{title=Description}
Enregistre le thème sombre (Dark Theme).
Après enregistrement, il peut être récupéré via Builder.getTheme('dark').
:::

```ts
function registerDarkTheme(): void
```

### registerLightTheme

:::note{title=Description}
Enregistre le thème clair (Light Theme).
Après enregistrement, il peut être récupéré via Builder.getTheme('light').
:::

```ts
function registerLightTheme(): void
```

## ChartType

### registerArea

:::note{title=Description}
Enregistre la pipeline de construction de Area Chart.
Après enregistrement, Builder prendra en charge la construction de la Spec et de l’Advanced Config de Area Chart.
:::

```ts
function registerArea(): void
```

### registerAreaPercent

:::note{title=Description}
Enregistre la pipeline de construction de Area Percent Chart.
Après enregistrement, Builder prendra en charge la construction de la Spec et de l’Advanced Config de Area Percent Chart.
:::

```ts
function registerAreaPercent(): void
```

### registerBar

:::note{title=Description}
Enregistre la pipeline de construction de Bar Chart.
Après enregistrement, Builder prendra en charge la construction de la Spec et de l’Advanced Config de Bar Chart.
:::

```ts
function registerBar(): void
```

### registerBarParallel

:::note{title=Description}
Enregistre la pipeline de construction de Bar Parallel Chart.
Après enregistrement, Builder prendra en charge la construction de la Spec et de l’Advanced Config de Bar Parallel Chart.
:::

```ts
function registerBarParallel(): void
```

### registerBarPercent

:::note{title=Description}
Enregistre la pipeline de construction de Bar Percent Chart.
Après enregistrement, Builder prendra en charge la construction de la Spec et de l’Advanced Config de Bar Percent Chart.
:::

```ts
function registerBarPercent(): void
```

### registerBoxPlot

:::note{title=Description}
Enregistre la pipeline de construction de Box Plot Chart.
Après enregistrement, Builder prendra en charge la construction de la Spec et de l’Advanced Config de Box Plot Chart.
:::

```ts
function registerBoxPlot(): void
```

### registerCirclePacking

:::note{title=Description}
Enregistre la pipeline de construction de CirclePacking Chart.
Après enregistrement, Builder prendra en charge la construction de la Spec et de l’Advanced Config de CirclePacking Chart.
:::

```ts
function registerCirclePacking(): void
```

### registerColumn

:::note{title=Description}
Enregistre la pipeline de construction de Column Chart.
Après enregistrement, Builder prendra en charge la construction de la Spec et de l’Advanced Config de Column Chart.
:::

```ts
function registerColumn(): void
```

### registerColumnParallel

:::note{title=Description}
Enregistre la pipeline de construction de Column Parallel Chart.
Après enregistrement, Builder prendra en charge la construction de la Spec et de l’Advanced Config de Column Parallel Chart.
:::

```ts
function registerColumnParallel(): void
```

### registerColumnPercent

:::note{title=Description}
Enregistre la pipeline de construction de Column Percent Chart.
Après enregistrement, Builder prendra en charge la construction de la Spec et de l’Advanced Config de Column Percent Chart.
:::

```ts
function registerColumnPercent(): void
```

### registerDonut

:::note{title=Description}
Enregistre la pipeline de construction de Donut Chart.
Après enregistrement, Builder prendra en charge la construction de la Spec et de l’Advanced Config de Donut Chart.
:::

```ts
function registerDonut(): void
```

### registerDualAxis

:::note{title=Description}
Enregistre la pipeline de construction de Dual Axis Chart.
Après enregistrement, Builder prendra en charge la construction de la Spec et de l’Advanced Config de Dual Axis Chart.
:::

```ts
function registerDualAxis(): void
```

### registerFunnel

:::note{title=Description}
Enregistre la pipeline de construction de Funnel Chart.
Après enregistrement, Builder prendra en charge la construction de la Spec et de l’Advanced Config de Funnel Chart.
:::

```ts
function registerFunnel(): void
```

### registerHeatmap

:::note{title=Description}
Enregistre la pipeline de construction de Heatmap Chart.
Après enregistrement, Builder prendra en charge la construction de la Spec et de l’Advanced Config de Heatmap Chart.
:::

```ts
function registerHeatmap(): void
```

### registerHierarchySankey

:::note{title=Description}
Enregistre la pipeline de construction de HierarchySankey Chart.
:::

```ts
function registerHierarchySankey(): void
```

### registerHistogram

:::note{title=Description}
Enregistre la pipeline de construction de Histogram Chart.
Après enregistrement, Builder prendra en charge la construction de la Spec et de l’Advanced Config de Histogram Chart.
:::

```ts
function registerHistogram(): void
```

### registerLine

:::note{title=Description}
Enregistre la pipeline de construction de Line Chart.
Après enregistrement, Builder prendra en charge la construction de la Spec et de l’Advanced Config de Line Chart.
:::

```ts
function registerLine(): void
```

### registerPie

:::note{title=Description}
Enregistre la pipeline de construction de Pie Chart.
Après enregistrement, Builder prendra en charge la construction de la Spec et de l’Advanced Config de Pie Chart.
:::

```ts
function registerPie(): void
```

### registerPivotTable

:::note{title=Description}
Enregistre la pipeline de construction de Pivot Table Chart.
Après enregistrement, Builder prendra en charge la construction de la Spec et de l’Advanced Config de Pivot Table Chart.
:::

```ts
function registerPivotTable(): void
```

### registerRaceBar

:::note{title=Description}
Enregistre la pipeline de construction de RaceBar Chart.
Après enregistrement, Builder prendra en charge la construction de la Spec de RaceBar Chart.
:::

```ts
function registerRaceBar(): void
```

### registerRaceColumn

:::note{title=Description}
Enregistre la pipeline de construction de RaceColumn Chart.
Après enregistrement, Builder prendra en charge la construction de la Spec de RaceColumn Chart.
:::

```ts
function registerRaceColumn(): void
```

### registerRaceDonut

:::note{title=Description}
Enregistre la pipeline de construction de RaceDonut Chart.
Après enregistrement, Builder prendra en charge la construction de la Spec de RaceDonut Chart.
:::

```ts
function registerRaceDonut(): void
```

### registerRaceLine

:::note{title=Description}
Enregistre la pipeline de construction de RaceLine Chart.
Après enregistrement, Builder prendra en charge la construction de la Spec de RaceLine Chart.
:::

```ts
function registerRaceLine(): void
```

### registerRacePie

:::note{title=Description}
Enregistre la pipeline de construction de RacePie Chart.
Après enregistrement, Builder prendra en charge la construction de la Spec de RacePie Chart.
:::

```ts
function registerRacePie(): void
```

### registerRaceScatter

:::note{title=Description}
Enregistre la pipeline de construction de RaceScatter Chart.
Après enregistrement, Builder prendra en charge la construction de la Spec de RaceScatter Chart.
:::

```ts
function registerRaceScatter(): void
```

### registerRadar

:::note{title=Description}
Enregistre la pipeline de construction de Radar Chart.
Après enregistrement, Builder prendra en charge la construction de la Spec et de l’Advanced Config de Radar Chart.
:::

```ts
function registerRadar(): void
```

### registerRose

:::note{title=Description}
Enregistre la pipeline de construction de Rose Chart.
Après enregistrement, Builder prendra en charge la construction de la Spec et de l’Advanced Config de Rose Chart.
:::

```ts
function registerRose(): void
```

### registerRoseParallel

:::note{title=Description}
Enregistre la pipeline de construction de Rose Parallel Chart.
Après enregistrement, Builder prendra en charge la construction de la Spec et de l’Advanced Config de Rose Parallel Chart.
:::

```ts
function registerRoseParallel(): void
```

### registerSankey

```ts
function registerSankey(): void
```

### registerScatter

:::note{title=Description}
Enregistre la pipeline de construction de Scatter Chart.
Après enregistrement, Builder prendra en charge la construction de la Spec et de l’Advanced Config de Scatter Chart.
:::

```ts
function registerScatter(): void
```

### registerSunburst

:::note{title=Description}
Enregistre la pipeline de construction de Sunburst Chart.
Après enregistrement, Builder prendra en charge la construction de la Spec et de l’Advanced Config de Sunburst Chart.
:::

```ts
function registerSunburst(): void
```

### registerTable

:::note{title=Description}
Enregistre la pipeline de construction de Table Chart.
Après enregistrement, Builder prendra en charge la construction de la Spec et de l’Advanced Config de Table Chart.
:::

```ts
function registerTable(): void
```

### registerTreeMap

:::note{title=Description}
Enregistre la pipeline de construction de TreeMap Chart.
Après enregistrement, Builder prendra en charge la construction de la Spec et de l’Advanced Config de TreeMap Chart.
:::

```ts
function registerTreeMap(): void
```
