# Builder

## Methods

### prepare

```ts
prepare(): Promise<void>
```

Führt dynamischen Filtercode asynchron aus. Vor `build()` aufrufen, um den `code` in `dynamicFilter` auszuführen. Diese Methode ist idempotent; mehrere Aufrufe führen den Code nicht erneut aus.

### build

```ts
build<T = S>(): T
```

Erzeugt die endgültige Diagrammkonfiguration (Spec). Dies ist die am häufigsten verwendete Kernmethode. Wenn die Konfiguration `code` in `dynamicFilter` enthält, muss zuerst `prepare()` aufgerufen werden.

### buildSpec

```ts
buildSpec<T = S>(advanced: AdvancedVSeed): T
```

Wandelt die Zwischenkonfiguration (AdvancedVSeed) in die endgültige Spec um. Nur verwenden, wenn die Zwischenkonfiguration tiefgehend angepasst werden muss.

### buildAdvanced

```ts
buildAdvanced(): AdvancedVSeed | null
```

Erzeugt die Zwischenkonfiguration (AdvancedVSeed), also die Diagrammvorlage. Sie ist detaillierter als das ursprüngliche VSeed und legt mehr Diagrammdetails offen.

### getColorItems

```ts
getColorItems(): __type[]
```

Ruft Feldinformationen ab, die in den Daten mit Farben zusammenhängen. Häufig verwendet, um Diagrammlegenden oder Farbfilter-UIs zu erzeugen.

### getColorIdMap

```ts
getColorIdMap(): Record
```

Ruft die detaillierte Zuordnungstabelle für Farbfelder ab. Der Schlüssel ist die Farb-ID, der Wert enthält die Detailinformationen.

### getColorValueMap

```ts
getColorValueMap(): undefined | Record
```

Ruft in einer diskreten Farbkarte die Zuordnung von `colorId` zum endgültigen Farbwert ab.

## Static Methods

### getAdvancedPipeline

```ts
static getAdvancedPipeline(chartType: ChartType): Pipe[]
```

[Interne Methode] Ruft die Vorlagen-Build-Pipeline für den angegebenen Diagrammtyp ab. Wird zum Debuggen des Konvertierungsprozesses von VSeed zu AdvancedVSeed verwendet.

### getSpecPipeline

```ts
static getSpecPipeline(chartType: ChartType): SpecPipe[]
```

[Interne Methode] Ruft die Spec-Build-Pipeline für den angegebenen Diagrammtyp ab. Wird zum Debuggen des Konvertierungsprozesses von AdvancedVSeed zu Spec verwendet.

### getTheme

```ts
static getTheme(themeKey?: string): CustomThemeConfig
```

Ruft die Konfiguration des angegebenen Themas ab. Wenn `themeKey` nicht übergeben wird, wird standardmäßig das Thema `'light'` zurückgegeben.

### getThemeMap

```ts
static getThemeMap(): Record<string, CustomThemeConfig>
```

Ruft alle registrierten Themakonfigurationen ab.

### from

```ts
static from<T extends Spec = Spec>(vseed: VSeed): Builder<T>
```

Statische Fabrikmethode zum bequemen Erstellen einer Builder-Instanz.

### registerAdvancedPipeline

```ts
static registerAdvancedPipeline(chartType: ChartType, pipeline: AdvancedPipeline): void
```

[Erweiterungsmethode] Registriert die Vorlagen-Build-Pipeline für einen neuen Diagrammtyp.

### registerSpecPipeline

```ts
static registerSpecPipeline(chartType: ChartType, pipeline: SpecPipeline): void
```

[Erweiterungsmethode] Registriert die Spec-Build-Pipeline für einen neuen Diagrammtyp.

### updateAdvanced

```ts
static updateAdvanced(chartType: ChartType, pipe: AdvancedPipe): void
```

[Erweiterungsmethode] Ändert die Vorlagen-Build-Logik eines vorhandenen Diagramms und fügt eine benutzerdefinierte Pipe ein, um die erzeugte AdvancedVSeed zu beeinflussen.

### updateSpec

```ts
static updateSpec(chartType: ChartType, pipe: SpecPipe): void
```

[Erweiterungsmethode] Ändert die Spec-Build-Logik eines vorhandenen Diagramms und fügt eine benutzerdefinierte Pipe ein, um die endgültig erzeugte Spec zu beeinflussen.

### registerTheme

```ts
static registerTheme(key: string, theme: CustomThemeConfig): void
```

[Erweiterungsmethode] Registriert ein benutzerdefiniertes Thema.

## Properties

### get locale

```ts
get locale()
```

Ruft die vom aktuellen Builder verwendete Locale ab.

### get vseed

```ts
get vseed()
```

Ruft die aktuellen VSeed-Eingabedaten ab.

### set vseed

```ts
set vseed(value)
```

Aktualisiert die VSeed-Eingabedaten. Nach der Aktualisierung wird der Zwischenspeicherstatus von `prepare()` gelöscht.

### get isPrepared

```ts
get isPrepared()
```

Ruft den Status von `prepare()` ab.

### set isPrepared

```ts
set isPrepared(value: boolean)
```

Setzt den Status von `prepare()`.

### get advancedVSeed

```ts
get advancedVSeed()
```

Ruft das aktuelle AdvancedVSeed-Zwischenkonfigurationsobjekt ab.

### set advancedVSeed

```ts
set advancedVSeed(value)
```

Setzt das AdvancedVSeed-Zwischenkonfigurationsobjekt. Wird normalerweise zum Zwischenspeichern oder Wiederverwenden einer vorhandenen Zwischenkonfiguration genutzt.

### get spec

```ts
get spec()
```

Ruft das aktuell erzeugte endgültige Spec-Objekt ab.

### set spec

```ts
set spec(value)
```

Setzt das Spec-Objekt. Wird normalerweise zum Caching verwendet.

### get performance

```ts
get performance()
```

Ruft die Leistungsstatistiken während des Build-Prozesses ab. Enthält die Dauer der einzelnen Phasen (Einheit: ms).

### set performance

```ts
set performance(value)
```

Setzt die Leistungsstatistiken.
