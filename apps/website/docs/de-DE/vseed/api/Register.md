# Register

## Theme

### registerCustomTheme

:::note{title=Beschreibung}
Registriert ein benutzerdefiniertes Thema.
:::

```ts
function registerCustomTheme(key: string, themeConfig:
    | CustomThemeConfig
    | ((props: { lightTheme: CustomThemeConfig; darkTheme: CustomThemeConfig }) => CustomThemeConfig)): void
```

**Parameter:**

- Eindeutiger Bezeichner des Themas
- Themakonfigurationsobjekt oder eine Funktion, die ein Konfigurationsobjekt zurückgibt
Wenn es eine Funktion ist, erhält sie ein Objekt mit lightTheme und darkTheme als Parameter, sodass bestehende Themen einfach erweitert werden können.

**Beispiel:**

registerCustomTheme('myTheme', { ... });
// Oder auf Basis des hellen Themas ändern
registerCustomTheme('myTheme', ({ lightTheme }) => ({ ...lightTheme, ... }));

### registerDarkTheme

:::note{title=Beschreibung}
Registriert das dunkle Thema (Dark Theme).
Nach der Registrierung kann es über Builder.getTheme('dark') abgerufen werden.
:::

```ts
function registerDarkTheme(): void
```

### registerLightTheme

:::note{title=Beschreibung}
Registriert das helle Thema (Light Theme).
Nach der Registrierung kann es über Builder.getTheme('light') abgerufen werden.
:::

```ts
function registerLightTheme(): void
```

## ChartType

### registerArea

:::note{title=Beschreibung}
Registriert die Build-Pipeline für Area Chart.
Nach der Registrierung unterstützt Builder das Erstellen von Spec und Advanced Config für Area Chart.
:::

```ts
function registerArea(): void
```

### registerAreaPercent

:::note{title=Beschreibung}
Registriert die Build-Pipeline für Area Percent Chart.
Nach der Registrierung unterstützt Builder das Erstellen von Spec und Advanced Config für Area Percent Chart.
:::

```ts
function registerAreaPercent(): void
```

### registerBar

:::note{title=Beschreibung}
Registriert die Build-Pipeline für Bar Chart.
Nach der Registrierung unterstützt Builder das Erstellen von Spec und Advanced Config für Bar Chart.
:::

```ts
function registerBar(): void
```

### registerBarParallel

:::note{title=Beschreibung}
Registriert die Build-Pipeline für Bar Parallel Chart.
Nach der Registrierung unterstützt Builder das Erstellen von Spec und Advanced Config für Bar Parallel Chart.
:::

```ts
function registerBarParallel(): void
```

### registerBarPercent

:::note{title=Beschreibung}
Registriert die Build-Pipeline für Bar Percent Chart.
Nach der Registrierung unterstützt Builder das Erstellen von Spec und Advanced Config für Bar Percent Chart.
:::

```ts
function registerBarPercent(): void
```

### registerBoxPlot

:::note{title=Beschreibung}
Registriert die Build-Pipeline für Box Plot Chart.
Nach der Registrierung unterstützt Builder das Erstellen von Spec und Advanced Config für Box Plot Chart.
:::

```ts
function registerBoxPlot(): void
```

### registerCirclePacking

:::note{title=Beschreibung}
Registriert die Build-Pipeline für CirclePacking Chart.
Nach der Registrierung unterstützt Builder das Erstellen von Spec und Advanced Config für CirclePacking Chart.
:::

```ts
function registerCirclePacking(): void
```

### registerColumn

:::note{title=Beschreibung}
Registriert die Build-Pipeline für Column Chart.
Nach der Registrierung unterstützt Builder das Erstellen von Spec und Advanced Config für Column Chart.
:::

```ts
function registerColumn(): void
```

### registerColumnParallel

:::note{title=Beschreibung}
Registriert die Build-Pipeline für Column Parallel Chart.
Nach der Registrierung unterstützt Builder das Erstellen von Spec und Advanced Config für Column Parallel Chart.
:::

```ts
function registerColumnParallel(): void
```

### registerColumnPercent

:::note{title=Beschreibung}
Registriert die Build-Pipeline für Column Percent Chart.
Nach der Registrierung unterstützt Builder das Erstellen von Spec und Advanced Config für Column Percent Chart.
:::

```ts
function registerColumnPercent(): void
```

### registerDonut

:::note{title=Beschreibung}
Registriert die Build-Pipeline für Donut Chart.
Nach der Registrierung unterstützt Builder das Erstellen von Spec und Advanced Config für Donut Chart.
:::

```ts
function registerDonut(): void
```

### registerDualAxis

:::note{title=Beschreibung}
Registriert die Build-Pipeline für Dual Axis Chart.
Nach der Registrierung unterstützt Builder das Erstellen von Spec und Advanced Config für Dual Axis Chart.
:::

```ts
function registerDualAxis(): void
```

### registerFunnel

:::note{title=Beschreibung}
Registriert die Build-Pipeline für Funnel Chart.
Nach der Registrierung unterstützt Builder das Erstellen von Spec und Advanced Config für Funnel Chart.
:::

```ts
function registerFunnel(): void
```

### registerHeatmap

:::note{title=Beschreibung}
Registriert die Build-Pipeline für Heatmap Chart.
Nach der Registrierung unterstützt Builder das Erstellen von Spec und Advanced Config für Heatmap Chart.
:::

```ts
function registerHeatmap(): void
```

### registerHierarchySankey

:::note{title=Beschreibung}
Registriert die Build-Pipeline für HierarchySankey Chart.
:::

```ts
function registerHierarchySankey(): void
```

### registerHistogram

:::note{title=Beschreibung}
Registriert die Build-Pipeline für Histogram Chart.
Nach der Registrierung unterstützt Builder das Erstellen von Spec und Advanced Config für Histogram Chart.
:::

```ts
function registerHistogram(): void
```

### registerLine

:::note{title=Beschreibung}
Registriert die Build-Pipeline für Line Chart.
Nach der Registrierung unterstützt Builder das Erstellen von Spec und Advanced Config für Line Chart.
:::

```ts
function registerLine(): void
```

### registerPie

:::note{title=Beschreibung}
Registriert die Build-Pipeline für Pie Chart.
Nach der Registrierung unterstützt Builder das Erstellen von Spec und Advanced Config für Pie Chart.
:::

```ts
function registerPie(): void
```

### registerPivotTable

:::note{title=Beschreibung}
Registriert die Build-Pipeline für Pivot Table Chart.
Nach der Registrierung unterstützt Builder das Erstellen von Spec und Advanced Config für Pivot Table Chart.
:::

```ts
function registerPivotTable(): void
```

### registerRaceBar

:::note{title=Beschreibung}
Registriert die Build-Pipeline für RaceBar Chart.
Nach der Registrierung unterstützt Builder das Erstellen der Spec für RaceBar Chart.
:::

```ts
function registerRaceBar(): void
```

### registerRaceColumn

:::note{title=Beschreibung}
Registriert die Build-Pipeline für RaceColumn Chart.
Nach der Registrierung unterstützt Builder das Erstellen der Spec für RaceColumn Chart.
:::

```ts
function registerRaceColumn(): void
```

### registerRaceDonut

:::note{title=Beschreibung}
Registriert die Build-Pipeline für RaceDonut Chart.
Nach der Registrierung unterstützt Builder das Erstellen der Spec für RaceDonut Chart.
:::

```ts
function registerRaceDonut(): void
```

### registerRaceLine

:::note{title=Beschreibung}
Registriert die Build-Pipeline für RaceLine Chart.
Nach der Registrierung unterstützt Builder das Erstellen der Spec für RaceLine Chart.
:::

```ts
function registerRaceLine(): void
```

### registerRacePie

:::note{title=Beschreibung}
Registriert die Build-Pipeline für RacePie Chart.
Nach der Registrierung unterstützt Builder das Erstellen der Spec für RacePie Chart.
:::

```ts
function registerRacePie(): void
```

### registerRaceScatter

:::note{title=Beschreibung}
Registriert die Build-Pipeline für RaceScatter Chart.
Nach der Registrierung unterstützt Builder das Erstellen der Spec für RaceScatter Chart.
:::

```ts
function registerRaceScatter(): void
```

### registerRadar

:::note{title=Beschreibung}
Registriert die Build-Pipeline für Radar Chart.
Nach der Registrierung unterstützt Builder das Erstellen von Spec und Advanced Config für Radar Chart.
:::

```ts
function registerRadar(): void
```

### registerRose

:::note{title=Beschreibung}
Registriert die Build-Pipeline für Rose Chart.
Nach der Registrierung unterstützt Builder das Erstellen von Spec und Advanced Config für Rose Chart.
:::

```ts
function registerRose(): void
```

### registerRoseParallel

:::note{title=Beschreibung}
Registriert die Build-Pipeline für Rose Parallel Chart.
Nach der Registrierung unterstützt Builder das Erstellen von Spec und Advanced Config für Rose Parallel Chart.
:::

```ts
function registerRoseParallel(): void
```

### registerSankey

```ts
function registerSankey(): void
```

### registerScatter

:::note{title=Beschreibung}
Registriert die Build-Pipeline für Scatter Chart.
Nach der Registrierung unterstützt Builder das Erstellen von Spec und Advanced Config für Scatter Chart.
:::

```ts
function registerScatter(): void
```

### registerSunburst

:::note{title=Beschreibung}
Registriert die Build-Pipeline für Sunburst Chart.
Nach der Registrierung unterstützt Builder das Erstellen von Spec und Advanced Config für Sunburst Chart.
:::

```ts
function registerSunburst(): void
```

### registerTable

:::note{title=Beschreibung}
Registriert die Build-Pipeline für Table Chart.
Nach der Registrierung unterstützt Builder das Erstellen von Spec und Advanced Config für Table Chart.
:::

```ts
function registerTable(): void
```

### registerTreeMap

:::note{title=Beschreibung}
Registriert die Build-Pipeline für TreeMap Chart.
Nach der Registrierung unterstützt Builder das Erstellen von Spec und Advanced Config für TreeMap Chart.
:::

```ts
function registerTreeMap(): void
```
