# BoxPlot

:::info{title=Empfehlung}
\- Empfohlene Feldkonfiguration: `1` Kennzahl, `1` Dimension

\- Unterstützt Datenumformung: mindestens `1` Kennzahl, `0` Dimensionen

:::

:::info{title=Codierungszuordnung}
Das Boxplot-Diagramm unterstützt die folgenden visuellen Kanäle:

`xAxis`  : X-Achsenkanal, unterstützt `mehrere Dimensionen` und ordnet Dimensionswerte der X-Achse zu

`yAxis`  : Y-Achsenkanal, unterstützt `mehrere Kennzahlen` und ordnet Kennzahlwerte der Y-Achse zu

`color`  : Farbkanal, unterstützt `mehrere Dimensionen` oder `eine Kennzahl`; Dimensionsfarben unterscheiden Datenserien, Kennzahlfarben bilden Werte linear auf Markierungsfarben ab

`tooltip`: Tooltip-Kanal, unterstützt `mehrere Dimensionen` und `mehrere Kennzahlen` und wird beim Bewegen des Mauszeigers über einen Datenpunkt angezeigt

`label`  : Label-Kanal, unterstützt `mehrere Dimensionen` und `mehrere Kennzahlen` und zeigt Datenlabels auf Datenpunkten an

:::

:::note{title=Beschreibung}
Das Boxplot-Diagramm eignet sich zur Darstellung von Datenverteilungen. Die X-Achse ist die Kategorieachse (kategoriale Daten), die Y-Achse ist die numerische Achse (kontinuierliche Daten), und die Boxen sind vertikal angeordnet.

Anwendungsszenarien:

\- Wenn Datenobjektnamen kurz sind

\- Wenn numerische Werte verschiedener Kategorien intuitiv verglichen werden müssen

\- Wenn Trends in Zeitreihendaten angezeigt werden

:::

:::warning{title=Warning}
Datenanforderungen:

\- Mindestens 1 numerisches Feld (Kennzahl)

\- Die erste Dimension wird auf der X-Achse platziert. Übrige Dimensionen werden bei mehreren Kennzahlen mit den Kennzahlnamen zusammengeführt und als Legendeneinträge angezeigt.

\- Alle Kennzahlen werden automatisch zu einer Kennzahl zusammengeführt

Standardmäßig aktivierte Funktionen:

\- Legende, Achsen, Datenlabels und Tooltips sind standardmäßig aktiviert.

:::


## chartType

**Type:** `"boxPlot"`

:::note{title=Beschreibung}
Das Boxplot-Diagramm eignet sich zur Darstellung von Datenverteilungen. Die X-Achse ist die Kategorieachse (kategoriale Daten), die Y-Achse ist die numerische Achse (kontinuierliche Daten), und die Boxen sind vertikal angeordnet.

:::

**Beispiel**
'boxPlot'




## dataset

**Type:** `Record[]`

:::note{title=Beschreibung}
Ein bereits aggregierter Datensatz im TidyData-Format, der Datenquelle und Struktur des Diagramms definiert. Der vom Benutzer eingegebene Datensatz muss nicht vorverarbeitet werden. VSeed verfügt über leistungsstarke Data-Reshape-Funktionen und führt die Datenumformung selbst aus; die Boxplot-Daten werden am Ende in 2 Dimensionen und 1 Kennzahl umgewandelt.

:::

**Beispiel**
[{category:'A', value:100}, {category:'B', value:200}]




## dimensions

**Type:** `BoxPlotDimension[] | undefined`

:::note{title=Beschreibung}
Die erste Dimension des Boxplot-Diagramms wird der X-Achse zugeordnet. Übrige Dimensionen werden bei mehreren Kennzahlen mit den Kennzahlnamen zusammengeführt und als Legendeneinträge angezeigt.

:::

**Beispiel**
[{id: "category", alias: "Category"}]




### id

**Type:** `string`

:::note{title=Beschreibung}
Feld-ID der Dimension

:::

### alias

**Type:** `string | undefined`

:::note{title=Beschreibung}
Dimensionsalias

:::

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=Beschreibung}
Datumsformat-Konfiguration der Dimension

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=Beschreibung}
Zeitgranularität, bestimmt die Anzeigegenauigkeit des Datums

:::

### encoding

**Type:** `"xAxis" | "color" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title=Beschreibung}
Kanal, dem die Dimension zugeordnet wird

\- xAxis: unterstützt die Zuordnung mehrerer Dimensionen zur X-Achse

\- color: unterstützt die Zuordnung mehrerer Dimensionen zum Farbkanal

\- tooltip: Unterstützt die Zuordnung mehrerer Dimensionen zum Tooltip-Kanal

\- label: Unterstützt die Zuordnung mehrerer Dimensionen zum Beschriftungskanal

\- row: unterstützt die Zuordnung mehrerer Dimensionen zum Zeilenkanal

\- column: unterstützt die Zuordnung mehrerer Dimensionen zum Spaltenkanal

:::


## measures

**Type:** `BoxPlotMeasure[] | undefined`

:::note{title=Beschreibung}
Alle Kennzahlen im Boxplot-Diagramm werden automatisch zu einer Kennzahl zusammengeführt und der Y-Achse zugeordnet. Wenn mehrere Kennzahlen vorhanden sind, werden Kennzahlnamen mit den übrigen Dimensionen zusammengeführt und als Legendeneinträge angezeigt.

:::

**Beispiel**
[{id: "value", alias: "Value"}]




### id

**Type:** `string`

:::note{title=Beschreibung}
Kennzahl-ID, muss eindeutig sein

:::

### alias

**Type:** `string | undefined`

:::note{title=Beschreibung}
Kennzahl-Alias; Duplikate sind zulässig. Wenn nicht gesetzt, ist alias gleich id

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Automatische Zahlenformatierung, standardmäßig aktiviert und mit höchster Priorität

Wenn autoFormat=true ist, überschreibt es alle numFormat-Konfigurationen

Wenn aktiviert, wählen Datenbeschriftungen und Tooltips des Diagramms automatisch eine passende Formatierung anhand von Kennzahlwerten und Locale

Formatierungsregeln: Dezimalzahlen mit aktivierter compact notation, mindestens 0 und höchstens 2 Nachkommastellen, automatische Rundung, implementiert über Intl.NumberFormat des Browsers

Beispiel:

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Beschreibung}
Benutzerdefinierte Zahlenformatierung für Kennzahlen; wird automatisch auf label und tooltip angewendet

Hinweis: Um benutzerdefinierte Formatierung zu verwenden, muss autoFormat=false explizit gesetzt werden; andernfalls überschreibt autoFormat diese Konfiguration

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Zahlenformattyp, unterstützt: number (Dezimalzahl), percent (%), permille (‰), wissenschaftliche Notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Zahlenformatverhältnis, darf nicht 0 sein

:::

**Beispiel**
\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zahlenformatsymbol, z. B. %, ‰

:::

**Beispiel**
\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Tausendertrennzeichen für Zahlenformatierung

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Beschreibung}
Suffix des Zahlenformats

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Beschreibung}
Präfix der Zahlenformatierung

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Nachkommastellen der Zahlenformatierung, verwendet minimumFractionDigits und maximumFractionDigits von Intl.NumberFormat des Browsers; niedrigere Priorität als significantDigits

:::

**Beispiel**
\- 1234.5678 wird zu 1235 konvertiert, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.6 konvertiert, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.57 konvertiert, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1230.568 konvertiert, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.5678 konvertiert, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.56780 konvertiert, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Signifikante Stellen der Zahlenformatierung, verwendet minimumSignificantDigits und maximumSignificantDigits von Intl.NumberFormat des Browsers; höhere Priorität als fractionDigits

:::

**Beispiel**
\- 1234.5678 wird zu 1000 konvertiert, significantDigits:1
\- 1234.5678 wird zu 1200 konvertiert, significantDigits:2
\- 1234.5678 wird zu 1230 konvertiert, significantDigits:3
\- 1234.5678 wird zu 1234 konvertiert, significantDigits:4
\- 1234.5678 wird zu 1234.6 konvertiert, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.57 konvertiert, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.568 konvertiert, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}
Rundungspriorität der Zahlenformatierung, wenn sowohl significantDigits als auch fractionDigits gesetzt sind; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie roundingPriority von Intl.NumberFormat

:::

**Beispiel**
\- 1234.5678 wird zu 1230 konvertiert, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rounding mode for numeric formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode.

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Zahlenformattyp, unterstützt: number (Dezimalzahl), percent (%), permille (‰), wissenschaftliche Notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Zahlenformatverhältnis, darf nicht 0 sein

:::

**Beispiel**
\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zahlenformatsymbol, z. B. %, ‰

:::

**Beispiel**
\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Tausendertrennzeichen für Zahlenformatierung

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Beschreibung}
Suffix des Zahlenformats

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Beschreibung}
Präfix der Zahlenformatierung

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Nachkommastellen der Zahlenformatierung, verwendet minimumFractionDigits und maximumFractionDigits von Intl.NumberFormat des Browsers; niedrigere Priorität als significantDigits

:::

**Beispiel**
\- 1234.5678 wird zu 1235 konvertiert, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.6 konvertiert, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.57 konvertiert, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1230.568 konvertiert, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.5678 konvertiert, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.56780 konvertiert, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Signifikante Stellen der Zahlenformatierung, verwendet minimumSignificantDigits und maximumSignificantDigits von Intl.NumberFormat des Browsers; höhere Priorität als fractionDigits

:::

**Beispiel**
\- 1234.5678 wird zu 1000 konvertiert, significantDigits:1
\- 1234.5678 wird zu 1200 konvertiert, significantDigits:2
\- 1234.5678 wird zu 1230 konvertiert, significantDigits:3
\- 1234.5678 wird zu 1234 konvertiert, significantDigits:4
\- 1234.5678 wird zu 1234.6 konvertiert, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.57 konvertiert, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.568 konvertiert, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}
Rundungspriorität der Zahlenformatierung, wenn sowohl significantDigits als auch fractionDigits gesetzt sind; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie roundingPriority von Intl.NumberFormat

:::

**Beispiel**
\- 1234.5678 wird zu 1230 konvertiert, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rounding mode for numeric formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode.

:::

### encoding

**Type:** `"value" | "color" | "tooltip" | "label" | "q1" | "median" | "q3" | "min" | "max" | "outliers" | undefined`

:::note{title=Beschreibung}
Kanal, dem die Kennzahl zugeordnet wird

\- value: Kennzahlen für diskrete Werte, die zur Berechnung statistischer Werte für die Darstellung des Boxplots verwendet werden

\- q1: Kennzahlzuordnung für den statistischen Wert des 25. Perzentils

\- q3: Kennzahlzuordnung für den statistischen Wert des 75. Perzentils

\- min: Kennzahlzuordnung für den minimalen Whisker-Wert

\- max: Kennzahlzuordnung für den maximalen Whisker-Wert

\- meadian: Kennzahlzuordnung für den statistischen Medianwert

\- outliers: Kennzahlzuordnung für Ausreißer

\- detail: Kennzahl, die dem Detailkanal zugeordnet wird

\- color: Kennzahl, die dem Farbkanal zugeordnet wird

\- label: dem label-Kanal zugeordnete Kennzahl

\- tooltip: dem tooltip-Kanal zugeordnete Kennzahl

:::

### parentId

**Type:** `string | undefined`

:::note{title=Beschreibung}
In der flachen Kennzahlenkonfiguration wird eine baumförmige Kennzahlgruppe aufgebaut. parentId verweist auf die id der übergeordneten Kennzahlgruppe und dient zum Aufbau des Kennzahlbaums

:::

:::tip{title=Tip}
Es gibt zwei Möglichkeiten, den Kennzahlbaum zu konfigurieren: erstens direkt als Kennzahlbaum mit children; zweitens als flache Kennzahlliste mit parentId. Beide Methoden können nicht gleichzeitig verwendet werden

:::


## page

**Type:** `Page | undefined`

:::note{title=Beschreibung}
Paginierungskonfiguration, mit der der Feldname für die Paginierung angegeben wird; dieser muss eine Dimension sein.

:::


### field

**Type:** `string`

:::note{title=Beschreibung}
Paginierungsfeld; gibt den Feldnamen für die Paginierung an, muss eine Dimension sein

:::

### currentValue

**Type:** `string`

:::note{title=Beschreibung}
Aktueller Paginierungswert; gibt den Wert an, mit dem die aktuelle Seite bestimmt wird..

:::

**Beispiel**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Beschreibung}
Die Hintergrundfarbe des Diagramms. Die Hintergrundfarbe kann als Farbzeichenfolge angegeben werden und ist standardmäßig transparent, z. B. 'red' oder 'blue'. Auch hex, rgb oder rgba wie '#ff0000' und 'rgba(255,0,0,0.5)' werden unterstützt.

:::


## color

**Type:** `Color | undefined`

:::note{title=Beschreibung}
Farbkonfiguration zur Definition des Farbschemas des Diagramms, einschließlich Farblisten, Farbzuordnungen und Farbverläufen.

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Beschreibung}
Diskretes Farbschema zur Definition der Farben verschiedener Elemente im Diagramm.

:::

**Beispiel**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Beschreibung}
Linearer Farbverlauf zur Definition der Farben verschiedener Elemente im Diagramm.

:::

**Beispiel**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Beschreibung}
Farbzuordnung zur Abbildung von Datenwerten auf bestimmte Farben.

:::

**Beispiel**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Konfiguration für positive/negative Farben; definiert die Farbe positiver Werte im Diagramm

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Konfiguration für positive/negative Farben; definiert die Farbe negativer Werte im Diagramm

:::


## label

**Type:** `Label | undefined`

:::note{title=Beschreibung}
Beschriftungskonfiguration zur Definition der Datenlabels des Diagramms, einschließlich Position, Format und Stil.

:::


### enable

**Type:** `false | true`

:::note{title=Beschreibung}
Ob die Label-Funktion aktiviert ist..

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen in die nächste Zeile umbrechen

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Labels Kennzahlwerte anzeigen..

In Szenarien mit mehreren Kennzahlen gibt es keine Konflikte zwischen Werten, da alle zeichnungsrelevanten Kennzahlen durch `foldMeasures` verarbeitet und zu einer Kennzahl für einen einzelnen Datenpunkt zusammengeführt werden

Hinweis: Das label in encoding hat höhere Priorität; diese Konfiguration beeinflusst das label in encoding nicht

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Labels Kennzahlwerte anzeigen. as percentages.

In Szenarien mit mehreren Kennzahlen gibt es keine Konflikte zwischen Werten, da alle zeichnungsrelevanten Kennzahlen durch `foldMeasures` verarbeitet und zu einer Kennzahl für einen einzelnen Datenpunkt zusammengeführt werden

Hinweis: Das label in encoding hat höhere Priorität; diese Konfiguration beeinflusst das label in encoding nicht

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Labels Dimensionslabels anzeigen..

Displays all dimension labels.

Hinweis: Das label in encoding hat höhere Priorität; diese Konfiguration beeinflusst das label in encoding nicht

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Labelwerte automatisch formatiert werden; wenn autoFormat true ist, wird die numFormat-Konfiguration ignoriert..

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Beschreibung}
Formatkonfiguration für Beschriftungswerte; wird mit `format` in `measure` zusammengeführt, wobei `format` in `measure` höhere Priorität hat. numFormat hat niedrigere Priorität als autoFormat

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Zahlenformattyp, unterstützt: number (Dezimalzahl), percent (%), permille (‰), wissenschaftliche Notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Zahlenformatverhältnis, darf nicht 0 sein

:::

**Beispiel**
\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zahlenformatsymbol, z. B. %, ‰

:::

**Beispiel**
\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Tausendertrennzeichen für Zahlenformatierung

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Beschreibung}
Suffix des Zahlenformats

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Beschreibung}
Präfix der Zahlenformatierung

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Nachkommastellen der Zahlenformatierung, verwendet minimumFractionDigits und maximumFractionDigits von Intl.NumberFormat des Browsers; niedrigere Priorität als significantDigits

:::

**Beispiel**
\- 1234.5678 wird zu 1235 konvertiert, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.6 konvertiert, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.57 konvertiert, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1230.568 konvertiert, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.5678 konvertiert, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.56780 konvertiert, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Signifikante Stellen der Zahlenformatierung, verwendet minimumSignificantDigits und maximumSignificantDigits von Intl.NumberFormat des Browsers; höhere Priorität als fractionDigits

:::

**Beispiel**
\- 1234.5678 wird zu 1000 konvertiert, significantDigits:1
\- 1234.5678 wird zu 1200 konvertiert, significantDigits:2
\- 1234.5678 wird zu 1230 konvertiert, significantDigits:3
\- 1234.5678 wird zu 1234 konvertiert, significantDigits:4
\- 1234.5678 wird zu 1234.6 konvertiert, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.57 konvertiert, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.568 konvertiert, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}
Rundungspriorität der Zahlenformatierung, wenn sowohl significantDigits als auch fractionDigits gesetzt sind; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie roundingPriority von Intl.NumberFormat

:::

**Beispiel**
\- 1234.5678 wird zu 1230 konvertiert, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rounding mode for numeric formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Schriftgröße der Beschriftung

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Beschreibung}
Schriftstärke der Beschriftung

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Label-Hintergrundfarbe

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Beschreibung}
Label-Strichfarbe

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Label-Schriftfarbe

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Label-Schriftfarbe anhand der Elementfarbe automatisch invertiert wird.

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Beschreibung}
Labelposition

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Anti-Überlappungsfunktion für Beschriftungen aktiviert ist

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
Label selection; conditions between selectors default to OR.

:::


#### field

**Type:** `string`

:::note{title=Beschreibung}
return _.flatten(

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

\- in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds in value enthalten ist

\- not in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds nicht in value enthalten ist

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

\- in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds in value enthalten ist

\- not in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds nicht in value enthalten ist

identisch mit operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wert des Dimensionsfelds, unterstützt Arrays

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}
Animierter Filter (Ausführung von KI-generiertem Code)



Implementiert komplexe Datenfilterlogik über KI-generierten JavaScript-Code



Core Capabilities:

\- Unterstützt beliebig komplexe Datenfilterbedingungen

\- Verwendet integrierte Hilfsfunktionen für Datenoperationen

\- Führt sicher in der Browserumgebung aus (Web-Worker-Sandbox)



Umgebungsanforderungen: Unterstützt nur die Browserumgebung; in Node.js wird ein Fallback verwendet



Hinweis: selector und dynamicFilter können nicht gleichzeitig verwendet werden; dynamicFilter hat höhere Priorität



Dynamische Filterkonfiguration des Diagramms.



Implementiert das Filtern von Diagramm-Markern (Balken, Punkte usw.) über KI-generierten JavaScript-Code

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}
Beschreibung der Filteranforderung des Benutzers (natürliche Sprache)

:::

**Beispiel**
"Highlight bars with sales greater than 1000"

Implementiert das Filtern von Diagramm-Markern (Balken, Punkte usw.) über KI-generierten JavaScript-Code



#### code

**Type:** `string`

:::note{title=Beschreibung}
KI-generierter JavaScript-Filtercode



\- Es dürfen nur integrierte Hilfsfunktionen verwendet werden (zugänglich über _ oder R)

\- Eingabeparameter: data (Array), jedes item enthält ein __row_index-Feld als Zeilennummer

\- Muss ein Array aus Zeilenindex- und Feldkombinationen zurückgeben: Array<{ __row_index: number, field: string }>

\- __row_index bezeichnet die Zeilennummer des ursprünglichen Datenelements, field das hervorzuhebende Feld

\- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen

:::

**Beispiel**
Das sales-Feld von Datenelementen mit sales größer als 1000 hervorheben
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Das Datenelement mit der höchsten Gewinnmarge je Bereich hervorheben
```javascript
const grouped = _.groupBy(data, 'area');
const maxItems = _.map(grouped, group =>
_.maxBy(group, item => item.profit / item.sales)
);
return _.flatten(
_.map(maxItems, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'profit' }
])
);
```

Datenelemente hervorheben, die mehrere Bedingungen erfüllen
```javascript
const filtered = _.filter(data, item => {
const profitRate = item.profit / item.sales;
return profitRate > 0.2 && item.sales > 5000;
});
return _.flatten(
_.map(filtered, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'sales' }
])
);
```


#### fallback

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
Fallback-Lösung, wenn die Codeausführung fehlschlägt oder die Umgebung nicht unterstützt wird

:::


##### field

**Type:** `string`

:::note{title=Beschreibung}
return _.flatten(

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

\- in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds in value enthalten ist

\- not in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds nicht in value enthalten ist

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

\- in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds in value enthalten ist

\- not in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds nicht in value enthalten ist

identisch mit operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wert des Dimensionsfelds, unterstützt Arrays

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Beschreibung}
Ausführungsergebnis des dynamischen Filters (Laufzeitfeld)

Wird in der prepare()-Phase geschrieben und ist zur Laufzeit schreibgeschützt
:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`


## legend

**Type:** `Legend | undefined`

:::note{title=Beschreibung}
Legendenkonfiguration zum Definieren der Diagrammlegende, einschliesslich Position, Format und Stil.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Legendenfunktion aktiviert ist.

:::

**Beispiel**
\- not in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds nicht in value enthalten ist



### border

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob der Legendenrahmen aktiviert ist..

:::

:::warning{title=Warning}
Wert des Dimensionsfelds, unterstützt Arrays

:::

**Beispiel**
Ausführungsergebnis des animierten Filters (Laufzeitfeld)



### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
legend font color

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Pagination icon color.

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Pagination icon disabled/grayed-out color.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Schriftgröße der Legende

:::

**Beispiel**
labelFontSize: 10



### labelFontColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
legend font color

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Beschreibung}
Schriftstärke der Legende

:::

**Beispiel**
legend font color



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Beschreibung}
Legendenform
:::

:::warning{title=Warning}
Nur für diskrete Legenden wirksam
:::

**Beispiel**
Schriftgröße der Legende



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Beschreibung}
Legendenposition

:::

**Beispiel**
legend font color



### maxSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Maximum number of columns or rows when there are many legend items.

If position is horizontal (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize controls the number of columns shown.

If position is vertical (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize controls the number of rows shown.

:::

:::warning{title=Warning}
Nur für diskrete Legenden wirksam
:::

**Beispiel**
maxSize: 2




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Beschreibung}
Tooltip-Konfiguration zur Definition der Tooltips des Diagramms, einschließlich Position, Format, Stil usw.

:::


### enable

**Type:** `false | true`

:::note{title=Beschreibung}
Ob Tooltip aktiviert ist

:::


## brush

**Type:** `Brush | undefined`

:::note{title=Beschreibung}
Definiert Form und Richtung des Auswahlbereichs.



\- `polygon`: Polygon-Auswahl; durch Klicken mehrerer Punkte können beliebige Polygone zur Auswahl gezeichnet werden



\- `y`: Y-axis brush; selects only in the Y-axis direction, unrestricted on the X-axis.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Definiert den Stil der ausgewählten Datenpunkte.

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Beschreibung}
brushtype



Opacity

Deckkraft der ausgewählten Datenpunkte, Bereich 0-1

\- `polygon`: Polygon-Brush-Auswahl; durch Klicken mehrerer Punkte wird ein beliebiges Polygon zur Auswahl gezeichnet

\- `x`: Brush-Auswahl nur in X-Achsenrichtung; die Y-Achsenrichtung ist nicht eingeschränkt

\- `y`: Brush-Auswahl in Y-Achsenrichtung; die X-Achsenrichtung ist nicht eingeschränkt

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Beschreibung}
Deckkraft ausgewählter Datenpunkte, Bereich 0-1



Stil für nicht ausgewählte Datenelemente

Definiert den Stil von Datenpunkten außerhalb des ausgewählten Brush-Bereichs

\- `multiple`: Mehrfachauswahlmodus; mehrere Brush-Bereiche können gleichzeitig existieren

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob der Brush-Bereich nach Ende der Auswahl gelöscht wird

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Beschreibung}
Deckkraft nicht ausgewählter Datenpunkte, Bereich 0-1



Definiert den Stil der mit Brush ausgewählten Datenpunkte

:::


#### opacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
Stil für nicht ausgewählte Datenelemente



Definiert den Stil der Datenpunkte außerhalb der Brush-Auswahl

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Beschreibung}
Konfiguration der Kategorieachse (X-Achse), zur Definition der X-Achse des Diagramms einschließlich Position, Format, Stil usw.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Strichbreite

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Beschreibung}
X-Achse, Kategorieachse, X-Achsenkonfiguration; definiert die X-Achse des Diagramms einschließlich Position, Format, Stil usw.



Definiert den Stil der Datenpunkte außerhalb der Brush-Auswahl

:::


#### opacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
Stil für nicht ausgewählte Datenelemente



Deckkraft der Datenpunkte außerhalb der Brush-Auswahl, Bereich 0-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Beschreibung}
Konfiguration der Kategorieachse (X-Achse), zur Definition der X-Achse des Diagramms einschließlich Position, Format, Stil usw.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Strichbreite

:::


## xAxis

**Type:** `XBandAxis | undefined`

:::note{title=Beschreibung}
X-Achsen-Kategorieachsenkonfiguration zur Definition der X-Achse des Diagramms einschließlich Position, Format, Stil und zugehöriger Einstellungen.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Achsenlinienfarbe

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Animationskonfiguration der X-Achse

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Konfiguration der numerischen Achse (Y-Achse), zur Definition der Y-Achse des Diagramms, einschließlich Position, Format, Stil usw.

:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Axis label auto-hide. If two labels overlap, with spacing smaller than autoHideGap, the overlapping label is hidden automatically. Only applies to category axes.

:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=Beschreibung}
Axis label auto-hide gap. If the gap between two labels is smaller than autoHideGap, the overlapping label is hidden automatically. Only applies to category axes.

Y-axis, numeric axis, Y-axis configuration; defines the Y-axis of the chart, including its position, format, style, etc.

When autoHide is disabled, use sampling and configure it through minGap.

:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Axis label auto-rotation. When label width exceeds axis length, labels are rotated automatically. Only applies to category axes.

:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=Beschreibung}
Axis label auto-rotation angle range. Used when auto-rotation is enabled. Only applies to category axes.

:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Axis label auto-limit. When label width exceeds axis length, overflow is shown with ellipsis and the full label is visible on hover. Only applies to category axes.

:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=Beschreibung}
Maximum length for axis label auto-limit. When label text exceeds this length, overflow is shown with ellipsis and the full label is visible on hover. Only applies to category axes.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Beschreibung}
\- orderBy:'date'

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Benutzerdefinierte Sortierreihenfolge, die direkt auf die Kategorieachse angewendet wird

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zahlenformatierung für numerische Achsen. Nur für numerische Achsen wirksam. Niedrigere Priorität als `autoFormat`.

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Label-Schriftgröße

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
Schriftgröße der Beschriftung

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Beschreibung}
Rotationswinkel des Labels

:::
### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Beschreibung}
X-Achsenlinie

:::
#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Schriftstärke der Beschriftung

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
}

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Beschreibung}
X-Achsen-Ticks

:::
#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Suffix des Zahlenformats

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Sortierreihenfolge; kann 'asc' oder 'desc' sein

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Legend sorting configuration; supports sorting based on dimensions or measures, as well as custom sorting orders; the sort array follows the order from left to right or top to bottom.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
sortLegend: {

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Beschreibung}
X-Achsentitel

:::
#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
\- 1234.5678 wird zu 1234.6 konvertiert, significantDigits:5 (roundingMode:halfCeil)

:::

#### titleText

**Type:** `string | undefined`

:::note{title=Beschreibung}
Titeltext. Standardmäßig folgt er der Feldkonfiguration.

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Custom sorting order; this order will be directly applied to the legend. Ascending follows left-to-right or top-to-bottom; descending follows right-to-left or bottom-to-top.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
Rectangle graphic element style

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Beschreibung}
Includes built-in `light` and `dark` themes. Custom themes can be added via `registerTheme`.

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
selector = [{ profit: 100 }, { profit: 200 }]

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
selector = 100

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Beschreibung}
Rasterlinientyp

:::
### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Beschreibung}
X-Achsen-Animationskonfiguration

:::


#### duration

**Type:** `number | undefined`

:::note{title=Beschreibung}
value: [100, 300]

:::

#### easing

**Type:** `string | undefined`

:::note{title=Beschreibung}
}

:::


## yAxis

**Type:** `YLinearAxis | undefined`

:::note{title=Beschreibung}
Y-Achsen-Konfiguration für numerische Achsen zur Definition der Y-Achse des Diagramms einschließlich Position, Format, Stil und zugehöriger Einstellungen.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Achsenlinienfarbe

:::

### min

**Type:** `number | undefined`

:::note{title=Beschreibung}
Axis line width

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Beschreibung}
X-axis ticks

:::

### log

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob eine logarithmische Achse verwendet wird; gilt nur für numerische Achsen

:::

### logBase

**Type:** `number | undefined`

:::note{title=Beschreibung}
Base of the logarithmic axis; only applies to numeric axes

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Achsen-Tick-Intervalle automatisch für besser lesbare Tick-Labels angepasst werden. Diese Option ist deaktiviert, wenn min und max konfiguriert sind, und gilt nur für numerische Achsen.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Animationskonfiguration der X-Achse

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Konfiguration der numerischen Achse (Y-Achse), zur Definition der Y-Achse des Diagramms, einschließlich Position, Format, Stil usw.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Tick-Labels der numerischen Achse automatisch formatiert werden. Gilt nur für numerische Achsen. Wenn autoFormat true ist, wird numFormat ignoriert.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Beschreibung}
Zahlenformatierung für numerische Achsen. Gilt nur für numerische Achsen und hat niedrigere Priorität als autoFormat.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Zahlenformattyp, unterstützt: decimal, percent (%), permille (‰), wissenschaftliche Notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Zahlenformatverhältnis, darf nicht 0 sein

:::

**Beispiel**
\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zahlenformatsymbol, z. B. %, ‰

:::

**Beispiel**
\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Zahlenformatverhältnis, darf nicht 0 sein

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Beschreibung}
Suffix des Zahlenformats

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zahlenformatsymbol, z. B. %, ‰

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Decimal places for numeric formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

:::

**Beispiel**
\- 1234.5678 wird umgewandelt in 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 wird umgewandelt in 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 wird umgewandelt in 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 wird umgewandelt in 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 wird umgewandelt in 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 wird umgewandelt in 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Significant digits for numeric formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits.

:::

**Beispiel**
\- 1234.5678 wird umgewandelt in 1000, significantDigits:1
\- 1234.5678 wird umgewandelt in 1200, significantDigits:2
\- 1234.5678 wird umgewandelt in 1230, significantDigits:3
\- 1234.5678 wird umgewandelt in 1234, significantDigits:4
\- 1234.5678 wird umgewandelt in 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 wird umgewandelt in 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 wird umgewandelt in 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 wird umgewandelt in 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}
Nachkommastellen der Zahlenformatierung, verwendet minimumFractionDigits und maximumFractionDigits von Intl.NumberFormat des Browsers; niedrigere Priorität als significantDigits

:::

**Beispiel**
\- 1234.5678 wird umgewandelt in 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 wird umgewandelt in 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Signifikante Stellen der Zahlenformatierung, verwendet minimumSignificantDigits und maximumSignificantDigits von Intl.NumberFormat des Browsers; höhere Priorität als fractionDigits

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Beschreibung}
\- orderBy:'date'

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Rundungspriorität der Zahlenformatierung, wenn sowohl significantDigits als auch fractionDigits gesetzt sind; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie roundingPriority von Intl.NumberFormat

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zahlenformatierung für numerische Achsen. Nur für numerische Achsen wirksam. Niedrigere Priorität als `autoFormat`.

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Label-Schriftgröße

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
Label-Schriftstärke

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Beschreibung}
Rotationswinkel des Labels

:::
### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Beschreibung}
X-Achsenlinie

:::
#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
\- orderBy:'date'

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
}

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Schriftgröße der Beschriftung

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Beschreibung}
X-Achsen-Ticks

:::
#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Suffix des Zahlenformats

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Sortierreihenfolge; kann 'asc' oder 'desc' sein

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Legend sorting configuration; supports sorting based on dimensions or measures, as well as custom sorting orders; the sort array follows the order from left to right or top to bottom.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
sortLegend: {

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Beschreibung}
X-Achsentitel

:::
#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
\- 1234.5678 wird zu 1234.6 konvertiert, significantDigits:5 (roundingMode:halfCeil)

:::

#### titleText

**Type:** `string | undefined`

:::note{title=Beschreibung}
Titeltext. Standardmäßig folgt er der Feldkonfiguration.

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Custom sorting order; this order will be directly applied to the legend. Ascending follows left-to-right or top-to-bottom; descending follows right-to-left or bottom-to-top.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
Rectangle graphic element style

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Beschreibung}
Includes built-in `light` and `dark` themes. Custom themes can be added via `registerTheme`.

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
selector = [{ profit: 100 }, { profit: 200 }]

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
selector = 100

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Beschreibung}
Rasterlinientyp

:::
### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Beschreibung}
selector = [{ profit: 100 }, { profit: 200 }]

:::


#### duration

**Type:** `number | undefined`

:::note{title=Beschreibung}
value: [100, 300]

:::

#### easing

**Type:** `string | undefined`

:::note{title=Beschreibung}
}

:::


## sort

**Type:** `Sort | undefined`

:::note{title=Beschreibung}
Sortierkonfiguration der X-Achse; unterstützt Sortierung nach Dimensionen oder Kennzahlen sowie benutzerdefinierte Sortierreihenfolgen



Sortierkonfiguration der Kategorieachse; unterstützt Sortierung nach Dimensionen oder Kennzahlen sowie benutzerdefinierte Sortierreihenfolgen
:::

**Beispiel**
sort: {
  orderBy: 'profit',
  order: 'asc',
}
sort: {
  customOrder:['2019', '2020', '2021']
}

\- order:'asc'
\- orderBy:'date'
or
\- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Beschreibung}
])

:::

**Beispiel**
order:'asc'



### orderBy

**Type:** `string | undefined`

:::note{title=Beschreibung}
Datenelement mit der höchsten Gewinnrate in jeder Region hervorheben

:::

**Beispiel**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=Beschreibung}
\- `__row_index` steht für die Zeilennummer des ursprünglichen Datenobjekts, und `field` steht für das hervorzuhebende Feld.

:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=Beschreibung}
return _.map(filtered, item => ({



Chart dynamic filter configuration

:::

**Beispiel**
sortLegend: {
  orderBy: 'profit',
  order: 'asc',
}
sortLegend: {
  customOrder:['2019', '2020', '2021']
}

\- order:'asc'
\- orderBy:'date'
or
\- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Beschreibung}
])

:::

**Beispiel**
order:'asc'



### orderBy

**Type:** `string | undefined`

:::note{title=Beschreibung}
Datenelement mit der höchsten Gewinnrate in jeder Region hervorheben

:::

**Beispiel**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=Beschreibung}
Benutzerdefinierte Sortierreihenfolge. Die Reihenfolge wird direkt auf die Legende angewendet. Aufsteigende Reihenfolge verläuft von links nach rechts oder von oben nach unten; absteigende Reihenfolge von rechts nach links oder von unten nach oben.

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Beschreibung}
Diagramm-Theme. Das Theme ist eine Funktionskonfiguration mit niedrigerer Priorität und enthält gemeinsame Einstellungen aller Diagrammtypen sowie Einstellungen, die innerhalb einer einzelnen Diagrammkategorie geteilt werden. Eingebaute Themes umfassen light und dark; Benutzer können Themes über Builder anpassen.



Operator



\- not in: Wählt Datenobjekte aus, deren Dimensionsfeldwert NICHT in der Werteliste enthalten ist.

:::

**Beispiel**
'dark'

'light'

'customThemeName'




### length

**Type:** `number`

### brand

**Type:** `brand`


## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title=Beschreibung}
Fallback-Lösung, wenn die Codeausführung fehlschlägt oder die Umgebung nicht unterstützt wird.



Diagramm-Theme. Theme ist eine Konfiguration mit niedrigerer Priorität und umfasst allgemeine Einstellungen für alle Diagrammtypen sowie spezifische Einstellungen einzelner Diagrammtypen. Integrierte Themes sind 'light' und 'dark'; Benutzer können Themes über den Builder anpassen.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
const maxItems = _.map(grouped, group =>

:::

### rectColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Integrierte helle und dunkle Themes; neue Themes können über registerTheme angepasst werden.

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Operator

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob das Rechteckbereich-Label des Fadenkreuzes angezeigt wird

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
\- Supports arbitrarily complex data filtering conditions

:::


## boxPlotStyle

**Type:** `BoxPlotStyle | BoxPlotStyle[] | undefined`

:::note{title=Beschreibung}
Boxplot-Kastenstil-Konfiguration; unterstützt globale Anwendung oder Anwendung auf Selector-Ebene

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
Data selector

Wenn ein Selector konfiguriert ist, bietet er vier Arten der Datenzuordnung: numerischer Selector, lokaler Datenselector, bedingter Dimensionsselector und bedingter Kennzahlselector.

If no selector is configured, the style applies globally.

:::

**Beispiel**
Numeric selector
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

Local data selector
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

Conditional dimension selector
selector = {
field: 'category',
operator: 'in',
value: 'tool'
}
selector = {
field: 'category',
operator: 'not in',
value: 'book'
}

Bedingter Kennzahlselector
selector = {
field: 'profit',
operator: '>=',
value: 100
}
selector = {
field: 'profit',
operator: 'between'
value: [100, 300]
}




#### field

**Type:** `string`

:::note{title=Beschreibung}
Dimensionsfeld, die ID eines Dimensionseintrags

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

\- in: Select data items where the value of the dimension field is in the value

\- not in: Select data items where the value of the dimension field is not in the value

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

\- in: Select data items where the value of the dimension field is in the value

\- not in: Select data items where the value of the dimension field is not in the value

return _.flatten(

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wert des Dimensionsfelds, unterstützt Arrays

:::

### boxVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
\- in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds in value enthalten ist

:::

### boxColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
\- not in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds nicht in value enthalten ist

:::

### boxColorOpacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
Farbdeckkraft des Boxplot-Elements

:::

### boxBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
\- in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds in value enthalten ist

:::

### boxBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
\- not in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds nicht in value enthalten ist

:::

### boxBorderOpacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
Rahmendeckkraft des Boxplot-Elements

:::

### boxCornerRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}
Wert des Dimensionsfelds, unterstützt Arrays

:::

### medianBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Median line color

:::

### whiskerBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Whisker line color

:::


## outlierStyle

**Type:** `OutlierStyle | OutlierStyle[] | undefined`

:::note{title=Beschreibung}
Outlier style configuration, supports global or selector-level application

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
Data selector

Wenn ein Selector konfiguriert ist, bietet er vier Arten der Datenzuordnung: numerischer Selector, lokaler Datenselector, bedingter Dimensionsselector und bedingter Kennzahlselector.

If no selector is configured, the style applies globally.

:::

**Beispiel**
Numeric selector
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

Local data selector
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

Conditional dimension selector
selector = {
field: 'category',
operator: 'in',
value: 'tool'
}
selector = {
field: 'category',
operator: 'not in',
value: 'book'
}

Bedingter Kennzahlselector
selector = {
field: 'profit',
operator: '>=',
value: 100
}
selector = {
field: 'profit',
operator: 'between'
value: [100, 300]
}




#### field

**Type:** `string`

:::note{title=Beschreibung}
Dimensionsfeld, die ID eines Dimensionseintrags

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

\- in: Select data items where the value of the dimension field is in the value

\- not in: Select data items where the value of the dimension field is not in the value

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

\- in: Select data items where the value of the dimension field is in the value

\- not in: Select data items where the value of the dimension field is not in the value

return _.flatten(

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wert des Dimensionsfelds, unterstützt Arrays

:::

### pointVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
\- in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds in value enthalten ist

:::

### pointSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
\- not in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds nicht in value enthalten ist

:::

### pointColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Point element color

:::

### pointColorOpacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
\- in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds in value enthalten ist

:::

### pointBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
\- not in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds nicht in value enthalten ist

:::

### pointBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Point element border width

:::

### pointBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Beschreibung}
Wert des Dimensionsfelds, unterstützt Arrays

:::

**Beispiel**
solid

dashed

dotted




## whiskers

**Type:** `number | number[] | undefined`

:::note{title=Beschreibung}
Whisker-Längenkonfiguration des Boxplots; unterstützt skalare Werte und Arrays der Länge 2.

When the value is a scalar, whiskers * IQR is used to calculate the upper and lower bounds.

When the value is an array of length 2, whiskers[0] must be between [0, 0.25), representing the percentile for the lower bound;

whiskers[1] must be between (0.75, 1], representing the percentile for the upper bound.

:::


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Beschreibung}
Annotationspunkt-Konfiguration. Definiert anhand der ausgewählten Daten Position, Format, Stil usw. des Annotationspunkts.

:::
### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
Selektor für Anmerkungspunkte, mit dem Datenpunkte ausgewählt werden.

:::


#### field

**Type:** `string`

:::note{title=Beschreibung}
Dimensionsfeld; die ID eines Elements in dimensions.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert in der Werteliste enthalten ist.

\- not in: Wählt Datenobjekte aus, deren Dimensionsfeldwert NICHT in der Werteliste enthalten ist.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert in der Werteliste enthalten ist.

\- not in: Wählt Datenobjekte aus, deren Dimensionsfeldwert NICHT in der Werteliste enthalten ist.

identisch mit operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Ausgewählte Dimensionsfeldwerte; Arrays werden unterstützt.

:::

### measureId

**Type:** `string | undefined`

:::note{title=Beschreibung}
Gibt die Kennzahl-ID an, zu der der Annotationspunkt gehört. In Szenarien mit mehreren Kennzahlen kann sie mit selector kombiniert werden, um den Zielpunkt eindeutig zu bestimmen.

:::
### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}
Dynamischer Filter (Ausführung von KI-generiertem Code)



return _.flatten(

\- not in: Wählt Datenobjekte aus, deren Dimensionsfeldwert nicht in value enthalten ist



\- in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds in value enthalten ist

\- not in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds nicht in value enthalten ist

\- Uses built-in utility functions for data manipulation.

\- in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds in value enthalten ist



\- not in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds nicht in value enthalten ist



Hinweis: selector und dynamicFilter können nicht gleichzeitig verwendet werden; dynamicFilter hat höhere Priorität..



Wert des Dimensionsfelds, unterstützt Arrays



Filtert Diagrammmarker (Balken, Punkte usw.) über AI-generierten JavaScript-Code.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}
Animierter Filter (Ausführung von KI-generiertem Code)

:::

**Beispiel**
\- in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds in value enthalten ist

\- not in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds nicht in value enthalten ist



#### code

**Type:** `string`

:::note{title=Beschreibung}
KI-generierter JavaScript-Filtercode



\- Es dürfen nur integrierte Hilfsfunktionen verwendet werden (zugänglich über _ oder R)

\- Eingabeparameter: data (Array), jedes item enthält ein __row_index-Feld als Zeilennummer

\- Muss ein Array aus Zeilenindex- und Feldkombinationen zurückgeben: Array<{ __row_index: number, field: string }>

\- __row_index bezeichnet die Zeilennummer des ursprünglichen Datenelements, field das hervorzuhebende Feld

\- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen

:::

**Beispiel**
Das sales-Feld von Datenelementen mit sales größer als 1000 hervorheben
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Das Datenelement mit der höchsten Gewinnmarge je Bereich hervorheben
```javascript
const grouped = _.groupBy(data, 'area');
const maxItems = _.map(grouped, group =>
_.maxBy(group, item => item.profit / item.sales)
);
return _.flatten(
_.map(maxItems, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'profit' }
])
);
```

Datenelemente hervorheben, die mehrere Bedingungen erfüllen
```javascript
const filtered = _.filter(data, item => {
const profitRate = item.profit / item.sales;
return profitRate > 0.2 && item.sales > 5000;
});
return _.flatten(
_.map(filtered, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'sales' }
])
);
```


#### fallback

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
Fallback strategy when code execution fails or the environment is not supported.

:::


##### field

**Type:** `string`

:::note{title=Beschreibung}
Dimensionsfeld; die ID eines Elements in dimensions.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

\- Es dürfen nur integrierte Hilfsfunktionen verwendet werden (Zugriff über _ oder R)

\- Eingabeparameter: data (Array), jedes Element enthält ein __row_index-Feld für die Zeilennummer

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
\- Muss ein Array aus Zeilenindex- und Feldkombinationen zurückgeben: Array<{ __row_index: number, field: string }>

\- __row_index steht für die Zeilennummer des ursprünglichen Datenelements, field für das hervorzuhebende Feld

\- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen

Hervorheben des sales-Felds für Datenelemente mit sales größer als 1000

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Hervorheben des Datenelements mit der höchsten Gewinnmarge in jedem Bereich

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Beschreibung}
Ausführungsergebnis des dynamischen Filters (Laufzeitfeld)

Wird in der prepare()-Phase geschrieben und ist zur Laufzeit schreibgeschützt
:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Beschreibung}
return _.flatten(

:::

**Beispiel**
\- Es dürfen nur integrierte Hilfsfunktionen verwendet werden (Zugriff über _ oder R)



### textColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
\- in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds in value enthalten ist

:::

**Beispiel**
\- Muss ein Array aus Zeilenindex- und Feldkombinationen zurückgeben: Array<{ __row_index: number, field: string }>



### textFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Vertical text alignment; typically set to 'top' so text appears at the bottom of the annotation area, ensuring it remains within the visible area of the chart.

:::

**Beispiel**
\- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen



### textFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
\- not in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds nicht in value enthalten ist

:::

**Beispiel**
Hervorheben des Datenelements mit der höchsten Gewinnmarge in jedem Bereich



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Beschreibung}
Textausrichtung. In der Regel auf `right` setzen, sodass der Text links vom Annotationspunkt erscheint und im sichtbaren Diagrammbereich bleibt

Empfohlen ist `right`, damit der Text links vom Annotationspunkt bleibt

right: Text befindet sich links vom Annotationspunkt; die rechte Textkante ist am Punkt ausgerichtet

left: Text befindet sich rechts vom Annotationspunkt; die linke Textkante ist am Punkt ausgerichtet

center: Text befindet sich in der Mitte des Annotationspunkts; die Textmitte ist am Punkt ausgerichtet
:::

**Beispiel**
\- not in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds nicht in value enthalten ist



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Beschreibung}
Vertikale Textausrichtung. In der Regel auf top setzen, damit der Text unter dem Annotationspunkt erscheint und im sichtbaren Diagrammbereich bleibt

Empfohlen ist 'top', damit der Text vollständig im sichtbaren Bereich angezeigt wird

top: Text unter dem Annotationspunkt, obere Textkante am Annotationspunkt ausgerichtet

middle: Text zentriert auf dem Annotationspunkt

bottom: Text über dem Annotationspunkt, untere Textkante am Annotationspunkt ausgerichtet

:::

**Beispiel**
'top'
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Hintergrund sichtbar

:::

**Beispiel**
true
### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hintergrundfarbe
:::

**Beispiel**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
2

:::

**Beispiel**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
4

:::

**Beispiel**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}
Radius der Hintergrundrahmen-Ecken

:::

**Beispiel**
4
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Beschreibung}
Innenabstand des Hintergrunds

:::

**Beispiel**
4
### offsetY

**Type:** `number | undefined`

:::note{title=Beschreibung}
Pixelversatz des gesamten Annotationspunkts in Y-Richtung. Liegt der Punkt oben im Diagramm (bei größeren Werten), wird ein positiver Wert empfohlen; liegt er unten (bei kleineren Werten), ein negativer Wert.

Negative Werte verschieben die gesamte Komponente nach oben, z. B. verschiebt \-10 Text und Hintergrund zusammen um 10 Pixel nach oben

Positive Werte verschieben die gesamte Komponente nach unten, z. B. verschiebt 10 Text und Hintergrund zusammen um 10 Pixel nach unten

:::

**Beispiel**
offsetY: 5, der gesamte Annotationspunkt wird um 5 Pixel nach unten verschoben
### offsetX

**Type:** `number | undefined`

:::note{title=Beschreibung}
Pixelversatz des gesamten Annotationspunkts in X-Richtung. Liegt der Punkt links im Diagramm (Start der Kategorieachse), wird ein positiver Wert empfohlen; liegt er rechts (Ende der Kategorieachse), ein negativer Wert.

Negative Werte verschieben die gesamte Komponente nach links, z. B. verschiebt \-10 Text und Hintergrund zusammen um 10 Pixel nach links

Positive Werte verschieben die gesamte Komponente nach rechts, z. B. verschiebt 10 Text und Hintergrund zusammen um 10 Pixel nach rechts

:::

**Beispiel**
offsetX: 5, der gesamte Annotationspunkt wird um 5 Pixel nach rechts verschoben
## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Beschreibung}
Anmerkungslinie für Dimensionswerte, die vertikal angezeigt wird. Position, Stil und zugehörige Einstellungen der Anmerkungslinie können konfiguriert werden.

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Beschreibung}
);

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Beschreibung}
Dynamischer Filter (Ausführung von KI-generiertem Code)



Eckenradius des Hintergrundrahmens

Markierungsbereich-Konfiguration; definiert anhand ausgewählter Daten Markierungsbereiche im Diagramm, einschließlich Position, Stil usw.



Ob die Funktion aktiviert wird, die Hauptlinie in zwei Segmente zu teilen.

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}
Beschreibung der Filteranforderung des Benutzers (natürliche Sprache).

:::

**Beispiel**
"Höchsten Umsatzwert als Referenz für die Markierungslinie ermitteln"

"Calculate the average sales for the annotation line"



#### code

**Type:** `string`

:::note{title=Beschreibung}
KI-generierter JavaScript-Filtercode



\- Es dürfen nur integrierte Hilfsfunktionen verwendet werden (zugänglich über _ oder R)

\- Eingabeparameter: data (Array)

\- Muss einen einzelnen numerischen Wert oder String zurückgeben: number | string

\- Geeignete Szenarien: dynamische Werte für Annotationslinien (horizontal oder vertikal)

\- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen

:::

**Beispiel**
Höchsten sales-Wert als Wert der Annotationslinie abrufen
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Durchschnittswert für die Annotationslinie berechnen
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Quantilwert als Annotationslinie abrufen
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Zielwert anhand von Bedingungen berechnen
```javascript
const currentYearTotal = _.sumBy(
_.filter(data, item => item.year === 2024),
'sales'
);
return currentYearTotal;
```


#### fallback

**Type:** `string | number | undefined`

:::note{title=Beschreibung}
Fallback strategy when code execution fails or the environment is not supported.

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Beschreibung}
Ausführungsergebnis des dynamischen Filters (Laufzeitfeld)

Wird in der prepare()-Phase geschrieben und ist zur Laufzeit schreibgeschützt
:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Beschreibung}
Written during the prepare() phase; read-only at runtime.

:::

**Beispiel**
'Annotation text'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Beschreibung}
Animierter Filter (Ausführung von KI-generiertem Code)

:::

**Beispiel**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
center: Text is centered in the annotation area; the center of the text aligns with the area.

:::

**Beispiel**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Beschreibung der Filteranforderung des Benutzers (natürliche Sprache)

:::

**Beispiel**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
0

:::

**Beispiel**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Beschreibung}
Textausrichtung. In der Regel nicht erforderlich

Empfohlen ist 'right', damit der Text links von der Annotationslinie liegt

right: Text links von der Referenzlinie, rechte Textkante an der vertikalen Annotationslinie ausgerichtet

left: Text rechts von der Referenzlinie, linke Textkante an der vertikalen Annotationslinie ausgerichtet

center: Text zentriert auf der Referenzlinie

:::

**Beispiel**
'right'
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Beschreibung}
Vertikale Textausrichtung. In der Regel nicht erforderlich

Empfohlen ist 'top', damit der Text vollständig im sichtbaren Diagrammbereich angezeigt wird

top: Text unter der Referenzlinie, obere Textkante am Endpunkt der vertikalen Annotationslinie ausgerichtet

middle: Text zentriert auf der Referenzlinie

bottom: Text über der Referenzlinie, untere Textkante am Endpunkt der vertikalen Annotationslinie ausgerichtet

:::

**Beispiel**
'top'
### lineVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Linie sichtbar

:::

**Beispiel**
true
### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Linienfarbe

:::

**Beispiel**
'red'
### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Wird während der prepare()-Phase geschrieben und ist zur Laufzeit schreibgeschützt

:::

**Beispiel**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Beschreibung}
Eckenradius des Markierungsbereichsrahmens

:::

**Beispiel**
'solid'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Hintergrund sichtbar

:::

**Beispiel**
true
### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hintergrundfarbe
:::

**Beispiel**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
2

:::

**Beispiel**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
4

:::

**Beispiel**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}
Radius der Hintergrundrahmen-Ecken

:::

**Beispiel**
4
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Beschreibung}
Innenabstand des Hintergrunds

:::

**Beispiel**
4
## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=Beschreibung}
4

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Beschreibung}
Fester Y-Wert zum Markieren einer horizontalen Linie. Wenn die Kategorieachse in Y-Richtung liegt, kann ein Dimensionswert eingegeben werden; bei einer numerischen Achse ein konkreter Zahlenwert.

:::
### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Beschreibung}
Dynamischer Filter (Ausführung von KI-generiertem Code)



Eckenradius des Hintergrundrahmens

Markierungsbereich-Konfiguration; definiert anhand ausgewählter Daten Markierungsbereiche im Diagramm, einschließlich Position, Stil usw.



Ob die Funktion aktiviert wird, die Hauptlinie in zwei Segmente zu teilen.

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}
Beschreibung der Filteranforderung des Benutzers (natürliche Sprache).

:::

**Beispiel**
"Höchsten Umsatzwert als Referenz für die Markierungslinie ermitteln"

"Calculate the average sales for the annotation line"



#### code

**Type:** `string`

:::note{title=Beschreibung}
KI-generierter JavaScript-Filtercode



\- Es dürfen nur integrierte Hilfsfunktionen verwendet werden (zugänglich über _ oder R)

\- Eingabeparameter: data (Array)

\- Muss einen einzelnen numerischen Wert oder String zurückgeben: number | string

\- Geeignete Szenarien: dynamische Werte für Annotationslinien (horizontal oder vertikal)

\- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen

:::

**Beispiel**
Höchsten sales-Wert als Wert der Annotationslinie abrufen
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Durchschnittswert für die Annotationslinie berechnen
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Quantilwert als Annotationslinie abrufen
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Zielwert anhand von Bedingungen berechnen
```javascript
const currentYearTotal = _.sumBy(
_.filter(data, item => item.year === 2024),
'sales'
);
return currentYearTotal;
```


#### fallback

**Type:** `string | number | undefined`

:::note{title=Beschreibung}
Fallback strategy when code execution fails or the environment is not supported.

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Beschreibung}
Ausführungsergebnis des dynamischen Filters (Laufzeitfeld)

Wird in der prepare()-Phase geschrieben und ist zur Laufzeit schreibgeschützt
:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Beschreibung}
Written during the prepare() phase; read-only at runtime.

:::

**Beispiel**
'Annotation text'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Beschreibung}
Textposition



Label-Position der Annotationslinie relativ zur Linie.

:::

**Beispiel**
'outsideEnd'
### textColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
center: Text is centered in the annotation area; the center of the text aligns with the area.

:::

**Beispiel**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Vertical text alignment; typically set to 'top' so text appears at the bottom of the annotation area, ensuring it remains within the visible area of the chart.

:::

**Beispiel**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
0

:::

**Beispiel**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Beschreibung}
Textausrichtung. In der Regel ist keine Einstellung erforderlich

Empfohlen ist `right`, damit der Text links von der Annotationslinie bleibt

right: Text befindet sich links von der Referenzlinie; die rechte Textkante ist am Ende der horizontalen Annotationslinie ausgerichtet

left: Text befindet sich rechts von der Referenzlinie; die linke Textkante ist am Ende der horizontalen Annotationslinie ausgerichtet

center: Text befindet sich in der Mitte der Referenzlinie; die Textmitte ist am Ende der horizontalen Annotationslinie ausgerichtet
:::

**Beispiel**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Beschreibung}
Vertikale Textausrichtung. In der Regel nicht erforderlich

Empfohlen ist 'top', damit der Text vollständig im sichtbaren Diagrammbereich angezeigt wird

top: Text unter der Referenzlinie, obere Textkante an der horizontalen Annotationslinie ausgerichtet

middle: Text zentriert auf der Referenzlinie

bottom: Text über der Referenzlinie, untere Textkante an der horizontalen Annotationslinie ausgerichtet

:::

**Beispiel**
'top'
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Hintergrund sichtbar

:::

**Beispiel**
true
### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hintergrundfarbe
:::

**Beispiel**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Beschreibung der Filteranforderung des Benutzers (natürliche Sprache)

:::

**Beispiel**
Fallback-Lösung, wenn die Codeausführung fehlschlägt oder die Umgebung nicht unterstützt wird



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
4



4

:::

**Beispiel**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}
Radius der Hintergrundrahmen-Ecken

:::

**Beispiel**
4
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Beschreibung}
Innenabstand des Hintergrunds

:::

**Beispiel**
4
### lineVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Linie sichtbar



Linie sichtbar

:::

**Beispiel**
true
### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Linienfarbe

:::

**Beispiel**
'red'
### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Linienbreite
:::

**Beispiel**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Beschreibung}
Eckenradius des Markierungsbereichsrahmens

:::

**Beispiel**
'solid'



### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=Beschreibung}
Linienstil des Markierungsbereichsrahmens

:::


#### positiveColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Fallback-Lösung, wenn die Codeausführung fehlschlägt oder die Umgebung nicht unterstützt wird

:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hauptfarbe für den Teil unterhalb des Annotationswerts

:::
## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Beschreibung}
Annotationsbereich-Konfiguration. Definiert anhand der ausgewählten Daten Position, Stil usw. des Annotationsbereichs.

:::
### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Beschreibung}
Ob die Dimensionsverknüpfung aktiviert wird, wenn für das Diagramm Perspektive aktiviert ist oder Kennzahlen kombiniert werden.

:::


#### field

**Type:** `string`

:::note{title=Beschreibung}
Dimensionsfeld; die ID eines Elements in dimensions.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert in der Werteliste enthalten ist.

\- not in: Wählt Datenobjekte aus, deren Dimensionsfeldwert NICHT in der Werteliste enthalten ist.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert in der Werteliste enthalten ist.

\- not in: Wählt Datenobjekte aus, deren Dimensionsfeldwert NICHT in der Werteliste enthalten ist.

identisch mit operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Ausgewählte Dimensionsfeldwerte; Arrays werden unterstützt.

:::

### text

**Type:** `string | string[] | undefined`

:::note{title=Beschreibung}
Written during the prepare() phase; read-only at runtime.

:::

**Beispiel**
'Annotation text'



### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title=Beschreibung}
Textposition

:::

**Beispiel**
'top'
### textColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
center: Text is centered in the annotation area; the center of the text aligns with the area.

:::

**Beispiel**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Vertical text alignment; typically set to 'top' so text appears at the bottom of the annotation area, ensuring it remains within the visible area of the chart.

:::

**Beispiel**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
0

:::

**Beispiel**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Beschreibung}
Textausrichtung. In der Regel auf `right` setzen; der Text wird in der Mitte des Annotationsbereichs angezeigt, damit er im sichtbaren Diagrammbereich bleibt

Empfohlen ist `center`, damit der Text in der Mitte des Annotationsbereichs bleibt

right: Text befindet sich links vom Annotationsbereich; die rechte Textkante ist am Annotationsbereich ausgerichtet

left: Text befindet sich rechts vom Annotationsbereich; die linke Textkante ist am Annotationsbereich ausgerichtet

center: Text befindet sich in der Mitte des Annotationsbereichs; die Textmitte ist am Annotationsbereich ausgerichtet
:::

**Beispiel**
'center' Text is in the middle of the annotation area



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Beschreibung}
Vertikale Textausrichtung. Im Allgemeinen auf top setzen, damit Text am unteren Rand des Annotationsbereichs erscheint und im sichtbaren Diagrammbereich bleibt.

bottom: Text is at the top of the annotation area, with the bottom edge aligned with the area.

top: text is at the bottom of the annotation area; the top edge of the text aligns with the annotation area

middle: text is centered in the annotation area; the center of the text aligns with the annotation area

Order of the polynomial regression

:::

**Beispiel**
'top' Text is at the bottom of the annotation area



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Hintergrund sichtbar

:::

**Beispiel**
true
### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hintergrundfarbe
:::

**Beispiel**
\- not in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds nicht in value enthalten ist



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
2



2

:::

**Beispiel**
\- not in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds nicht in value enthalten ist



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
4

:::

**Beispiel**
Wert des Dimensionsfelds, unterstützt Arrays



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}
Radius der Hintergrundrahmen-Ecken



Radius der Hintergrundrahmen-Ecken

:::

**Beispiel**
4
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Beschreibung}
Innenabstand des Hintergrunds

:::

**Beispiel**
4
### areaColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Füllfarbe des Markierungsbereichs

:::

**Beispiel**
'red'



### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
Deckkraft der Markierungsbereichsfüllung

:::

**Beispiel**
0.5



### areaBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Rahmenfarbe des Markierungsbereichs

:::

**Beispiel**
'red'



### areaBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Rahmenbreite des Markierungsbereichs

:::

**Beispiel**
2



### areaBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}
Eckenradius des Markierungsbereichsrahmens

:::

**Beispiel**
4



### areaLineDash

**Type:** `number[] | undefined`

:::note{title=Beschreibung}
Linienstil des Markierungsbereichsrahmens

:::

**Beispiel**
[2, 2]



### outerPadding

**Type:** `number | undefined`

:::note{title=Beschreibung}
Innenabstand des Markierungsbereichs

:::

**Beispiel**
0




## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=Beschreibung}
Wenn Pivot-Funktion oder Kennzahlkombinationen im Diagramm aktiviert sind, ob die Dimensionsverknüpfung aktiviert wird.

Beim Hover über einen Dimensionswert werden Daten mit demselben Dimensionswert in anderen Diagrammen hervorgehoben.

Konfiguration der Dimensionsverknüpfung für Pivot-Diagramme
:::


### enable

**Type:** `false | true`

:::note{title=Beschreibung}
Ob Dimensionsverknüpfung für Pivot-Diagramme aktiviert wird
:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Tooltip-Informationen für Subdiagramme aller Dimensionen angezeigt werden
:::

### showLabel

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob das dem crosshair entsprechende Label angezeigt wird
:::


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Beschreibung}
Sprachkonfiguration des Diagramms. Unterstützt 'zh-CN' und 'en-US'. Die Sprache kann auch über intl.setLocale('zh-CN') gesetzt werden
:::


## boxMaxWidth

**Type:** `string | number | undefined`

:::note{title=Beschreibung}
Maximale Breite des Boxplots. Kann als absoluter Pixelwert oder Prozentsatz (z. B. '10%') festgelegt werden.

:::


## boxGapInGroup

**Type:** `string | number | undefined`

:::note{title=Beschreibung}
Abstand innerhalb jeder Gruppe in einem gruppierten Boxplot. Kann als absoluter Pixelwert oder Prozentsatz (z. B. '10%') festgelegt werden.

:::
