# Column

:::info{title=Empfehlung}
\- Empfohlene Feldkonfiguration: `1` Kennzahl, `2` Dimensionen

\- Unterstützt Data Reshape: mindestens `1` Kennzahl, `0` Dimensionen

:::

:::info{title=Codierungszuordnung}
Säulendiagramme unterstützen die folgenden visuellen Kanäle:

`xAxis`  : X-Achsenkanal, unterstützt `mehrere Dimensionen` und ordnet Dimensionswerte der X-Achse zu

`yAxis`  : Y-Achsenkanal, unterstützt `mehrere Kennzahlen` und ordnet Kennzahlwerte der Y-Achse zu

`detail` : Detailkanal, unterstützt `mehrere Dimensionen` und zeigt innerhalb derselben Farbserie feiner granulierte Daten an

`color`  : Farbkanal, unterstützt `mehrere Dimensionen` oder `eine Kennzahl`; Dimensionsfarben unterscheiden Datenserien, Kennzahlfarben bilden Werte linear auf Markierungsfarben ab

`tooltip`: Tooltip-Kanal, unterstützt `mehrere Dimensionen` und `mehrere Kennzahlen` und wird beim Bewegen des Mauszeigers über einen Datenpunkt angezeigt

`label`  : Label-Kanal, unterstützt `mehrere Dimensionen` und `mehrere Kennzahlen` und zeigt Datenlabels auf Datenpunkten an

:::

:::note{title=Beschreibung}
Das Säulendiagramm eignet sich für vertikale Datenvergleiche. Die X-Achse ist die Kategorieachse (kategoriale Daten), die Y-Achse ist die numerische Achse (kontinuierliche Daten), und die Säulen sind vertikal angeordnet

Anwendungsszenarien:

\- Wenn Datenobjektnamen kurz sind

\- Wenn Werte verschiedener Kategorien intuitiv verglichen werden sollen

\- Wenn Trends in Zeitreihendaten angezeigt werden sollen

:::

:::warning{title=Warning}
Datenanforderungen:

\- Mindestens 1 numerisches Feld (Kennzahl)

\- Die erste Dimension wird auf der X-Achse platziert; weitere Dimensionen werden mit Kennzahlnamen (bei mehreren Kennzahlen) zusammengeführt und als Legendeneinträge angezeigt

\- Alle Kennzahlen werden automatisch zu einer Kennzahl zusammengeführt

Standardmäßig aktivierte Funktionen:

\- Legende, Achsen, Datenlabels und Tooltips sind standardmäßig aktiviert.

:::


## chartType

**Type:** `"column"`

:::note{title=Beschreibung}
Das Säulendiagramm eignet sich für vertikale Datenvergleiche. Die X-Achse ist die Kategorieachse (kategoriale Daten), die Y-Achse ist die numerische Achse (kontinuierliche Daten), und die Säulen sind vertikal angeordnet

:::

**Beispiel**
'column'




## dataset

**Type:** `Record[]`

:::note{title=Beschreibung}
Ein bereits aggregierter Datensatz im TidyData-Format, der Datenquelle und Struktur des Diagramms definiert. Der vom Benutzer eingegebene Datensatz muss nicht vorverarbeitet werden. VSeed verfügt über leistungsstarke Data-Reshape-Funktionen und führt die Datenumformung selbst aus; die Daten des Säulendiagramms werden am Ende in 2 Dimensionen und 1 Kennzahl umgewandelt.

:::

**Beispiel**
[{category:'A', value:100}, {category:'B', value:200}]




## dimensions

**Type:** `ColumnDimension[] | undefined`

:::note{title=Beschreibung}
Die erste Dimension des Säulendiagramms wird der X-Achse zugeordnet. Die übrigen Dimensionen werden bei mehreren Kennzahlen mit den Kennzahlnamen zusammengeführt und als Legendeneinträge angezeigt.

:::

**Beispiel**
[{id: "category", alias: "category"}]




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

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title=Beschreibung}
Kanal, dem die Dimension zugeordnet wird

\- xAxis: unterstützt die Zuordnung mehrerer Dimensionen zur X-Achse

\- color: unterstützt die Zuordnung mehrerer Dimensionen zum Farbkanal

\- detail: unterstützt die Zuordnung mehrerer Dimensionen zum Detailkanal

\- tooltip: Unterstützt die Zuordnung mehrerer Dimensionen zum Tooltip-Kanal

\- label: Unterstützt die Zuordnung mehrerer Dimensionen zum Beschriftungskanal

\- row: unterstützt die Zuordnung mehrerer Dimensionen zum Zeilenkanal

\- column: unterstützt die Zuordnung mehrerer Dimensionen zum Spaltenkanal

:::


## measures

**Type:** `ColumnMeasure[] | undefined`

:::note{title=Beschreibung}
Alle Kennzahlen des Säulendiagramms werden automatisch zu einer Kennzahl zusammengeführt und der Y-Achse zugeordnet. Bei mehreren Kennzahlen werden Kennzahlnamen mit anderen Dimensionen zusammengeführt und als Legendeneinträge angezeigt.

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

**Type:** `"color" | "detail" | "tooltip" | "label" | "yAxis" | undefined`

:::note{title=Beschreibung}
Kanal, dem die Kennzahl zugeordnet wird

\- yAxis: Kennzahl, die der Y-Achse zugeordnet wird

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
 'sales': 'blue',
}
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
"Highlight bars whose sales are greater than 1000"

"Highlight the bar with the highest profit rate in each region"



#### code

**Type:** `string`

:::note{title=Beschreibung}
Von AI generierter JavaScript-Filtercode.



\- Es dürfen nur integrierte Hilfsfunktionen verwendet werden (Zugriff über _ oder R)

\- Eingabeparameter: data (Array), jedes Element enthält ein __row_index-Feld für die Zeilennummer

\- Muss ein Array aus Zeilenindex- und Feldkombinationen zurückgeben: Array<{ __row_index: number, field: string }>

\- __row_index steht für die Zeilennummer des ursprünglichen Datenelements, field für das hervorzuhebende Feld

\- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen

:::

**Beispiel**
Hervorheben des sales-Felds für Datenelemente mit sales größer als 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Hervorheben des Datenelements mit der höchsten Gewinnmarge in jedem Bereich
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

const profitRate = item.profit / item.sales;
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
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob der Legendenrahmen aktiviert ist..

:::

:::warning{title=Warning}
Applies only to discrete legends.

:::

**Beispiel**
Schriftstärke der Legende



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
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Beschreibung}
Legendenform
:::

:::warning{title=Warning}
Applies only to discrete legends.

:::

**Beispiel**
Brush



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Beschreibung}
Legendenposition

:::

**Beispiel**
position: 'rightTop'



### maxSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Maximum number of columns or rows when there are many legend items.

If position is horizontal (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize controls the number of columns shown.

If position is vertical (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize controls the number of rows shown.

:::

:::warning{title=Warning}
Applies only to discrete legends.

:::

**Beispiel**
Brush-Modus; legt fest, ob einzelne oder mehrere Bereiche ausgewählt werden können.




## regionPadding

**Type:** `RegionPadding | undefined`

:::note{title=Beschreibung}
Tooltip-Konfiguration zum Definieren der Diagramm-Tooltips, einschliesslich Position, Format und Stil.



Brush selection

:::


### top

**Type:** `number | undefined`

### right

**Type:** `number | undefined`

### bottom

**Type:** `number | undefined`

### left

**Type:** `number | undefined`


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


## animation

**Type:** `BarLikeAnimation | undefined`

:::note{title=Beschreibung}
Axis label, auto-hide interval; if the interval between two text labels is less than autoHideGap, the overlapping label is automatically hidden. Only effective for category axes.



When autoHide is disabled, use sampling, configured on minGap

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Balken-/Saeulendiagramm-Animation aktiviert ist

:::

### params

**Type:** `BarLikeAnimationParams | undefined`

:::note{title=Beschreibung}
Bar/column chart animation parameters

:::


#### appear

**Type:** `BarLikeAppearAnimation | undefined`

:::note{title=Beschreibung}
Ob die Achse umgekehrt angezeigt wird; gilt nur für numerische Achsen.

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=Beschreibung}
Eingangseffekt für Balken-/Säulendiagramme, unterstützt Wachstumsanimationen

:::
##### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"

:::

##### ease

**Type:** `string | undefined`

:::note{title=Beschreibung}
Label-Schriftstärke

:::

##### duration

**Type:** `number | undefined`

:::note{title=Beschreibung}
Zahlenformattyp, unterstützt: decimal, percent (%), permille (‰), wissenschaftliche Notation.

:::

##### color

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zahlenformatverhältnis, darf nicht 0 sein.

:::

#### update

**Type:** `BarLikeUpdateAnimation | undefined`

:::note{title=Beschreibung}
Bar/column chart update animation configuration

:::


##### effects

**Type:** `("growth" | "moveIn")[] | undefined`

:::note{title=Beschreibung}
Aktualisierungseffekt für Balken-/Säulendiagramme, unterstützt Wachstum und Hereinbewegen

:::
##### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"

:::

##### ease

**Type:** `string | undefined`

:::note{title=Beschreibung}
Label-Schriftstärke

:::

##### duration

**Type:** `number | undefined`

:::note{title=Beschreibung}
Zahlenformattyp, unterstützt: decimal, percent (%), permille (‰), wissenschaftliche Notation.

:::

##### color

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zahlenformatverhältnis, darf nicht 0 sein.

:::

#### loop

**Type:** `BarLikeAnimationLoop | undefined`

:::note{title=Beschreibung}
\- 1234.5678 wird zu 1234.57, fractionDigits:2 (roundingMode:halfCeil) konvertiert

:::


##### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Tick size

:::

##### interval

**Type:** `number | undefined`

:::note{title=Beschreibung}
\- 1234.5678 wird zu 1230, significantDigits:3 konvertiert

:::

##### loop

**Type:** `BarLikeLoopAnimation | undefined`

:::note{title=Beschreibung}
\- 1234.5678 wird zu 1234.57, fractionDigits:2 (roundingMode:halfCeil) konvertiert

:::


###### effects

**Type:** `BarLikeLoopEffect[] | undefined`

:::note{title=Beschreibung}
\- 1234.5678 wird zu 1230, significantDigits:3 (roundingPriority:lessPrecision) konvertiert

:::

###### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"

:::

###### ease

**Type:** `string | undefined`

:::note{title=Beschreibung}
Label-Schriftstärke

:::

###### duration

**Type:** `number | undefined`

:::note{title=Beschreibung}
Zahlenformattyp, unterstützt: decimal, percent (%), permille (‰), wissenschaftliche Notation.

:::

###### color

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zahlenformatverhältnis, darf nicht 0 sein.

:::

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title=Beschreibung}
Bar/column chart atmosphere animation configuration

:::


###### ease

**Type:** `string | undefined`

:::note{title=Beschreibung}
atmosphereanimationeasefunction

:::

###### color

**Type:** `string | undefined`

:::note{title=Beschreibung}
atmosphereanimationcolor

:::

###### effect

**Type:** `PointAtmosphereEffect | undefined`

:::note{title=Beschreibung}
Atmosphere animation effect; supports ripple, fade, and breathe

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
Rotationswinkel der Beschriftung

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
X-Achsenmarkierung

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
Typ der Gitterlinie

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
\- 1234.5678 wird zu 1235, fractionDigits:0 (roundingMode:halfCeil) konvertiert
\- 1234.5678 wird zu 1234.6, fractionDigits:1 (roundingMode:halfCeil) konvertiert
\- 1234.5678 wird zu 1234.57, fractionDigits:2 (roundingMode:halfCeil) konvertiert
\- 1234.5678 wird zu 1230.568, fractionDigits:3 (roundingMode:halfCeil) konvertiert
\- 1234.5678 wird zu 1234.5678, fractionDigits:4 (roundingMode:halfCeil) konvertiert
\- 1234.5678 wird zu 1234.56780, fractionDigits:5 (roundingMode:halfCeil) konvertiert



#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Significant digits for numeric formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits.

:::

**Beispiel**
\- 1234.5678 wird zu 1000, significantDigits:1 konvertiert
\- 1234.5678 wird zu 1200, significantDigits:2 konvertiert
\- 1234.5678 wird zu 1230, significantDigits:3 konvertiert
\- 1234.5678 wird zu 1234, significantDigits:4 konvertiert
\- 1234.5678 wird zu 1234.6, significantDigits:5 (roundingMode:halfCeil) konvertiert
\- 1234.5678 wird zu 1234.57, significantDigits:6 (roundingMode:halfCeil) konvertiert
\- 1234.5678 wird zu 1234.568, significantDigits:7 (roundingMode:halfCeil) konvertiert
\- 1234.5678 wird zu 1234.5678, significantDigits:8 (roundingMode:halfCeil) konvertiert



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}
Nachkommastellen der Zahlenformatierung, verwendet minimumFractionDigits und maximumFractionDigits von Intl.NumberFormat des Browsers; niedrigere Priorität als significantDigits

:::

**Beispiel**
\- 1234.5678 wird zu 1230, significantDigits:3 (roundingPriority:lessPrecision) konvertiert
\- 1234.5678 wird zu 1234.5678, significantDigits:3 (roundingPriority:morePrecision) konvertiert



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
Rotationswinkel der Beschriftung

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
X-Achsenmarkierung

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
Typ der Gitterlinie

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
Dimensionsfeld-ID (die `id` eines Elements in `dimensions`).
Dynamische Filterkonfiguration des Diagramms.
field: 'sales'
}
Dimensionsfeld-ID (die `id` eines Elements in `dimensions`).
Operator
}

const grouped = _.groupBy(data, 'area');
\- not in: Wählt Datenelemente aus, deren Dimensionsfeldwert nicht in value enthalten ist
Dynamische Filterkonfiguration des Diagramms.
Hinweis: selector und dynamicFilter können nicht gleichzeitig verwendet werden; dynamicFilter hat höhere Priorität.




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Beschreibung}
])

:::

**Beispiel**
"Highlight the bar with the highest profit rate in each region"



### orderBy

**Type:** `string | undefined`

:::note{title=Beschreibung}
Datenelement mit der höchsten Gewinnrate in jeder Region hervorheben

:::

**Beispiel**
\- not in: Wählt Datenelemente aus, deren Dimensionsfeldwert nicht in value enthalten ist
\- Input parameters: data (array), each item contains a __row_index field representing the row number



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
return _.map(filtered, item => ({
Dynamische Filterkonfiguration des Diagramms.
field: 'sales'
}
return _.map(filtered, item => ({
Operator
}

const grouped = _.groupBy(data, 'area');
\- not in: Wählt Datenelemente aus, deren Dimensionsfeldwert nicht in value enthalten ist
Dynamische Filterkonfiguration des Diagramms.
Hinweis: selector und dynamicFilter können nicht gleichzeitig verwendet werden; dynamicFilter hat höhere Priorität.




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Beschreibung}
])

:::

**Beispiel**
"Highlight the bar with the highest profit rate in each region"



### orderBy

**Type:** `string | undefined`

:::note{title=Beschreibung}
Datenelement mit der höchsten Gewinnrate in jeder Region hervorheben

:::

**Beispiel**
\- not in: Wählt Datenelemente aus, deren Dimensionsfeldwert nicht in value enthalten ist
\- Input parameters: data (array), each item contains a __row_index field representing the row number



### customOrder

**Type:** `string[] | undefined`

:::note{title=Beschreibung}
Custom sort order. The order is applied directly to the legend. Ascending order goes left-to-right or top-to-bottom; descending order goes right-to-left or bottom-to-top.

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Beschreibung}
Diagramm-Theme. Das Theme ist eine Funktionskonfiguration mit niedrigerer Priorität und enthält gemeinsame Einstellungen aller Diagrammtypen sowie Einstellungen, die innerhalb einer einzelnen Diagrammkategorie geteilt werden. Eingebaute Themes umfassen light und dark; Benutzer können Themes über Builder anpassen.



Operator



\- not in: Wählt Datenobjekte aus, deren Dimensionsfeldwert NICHT in der Werteliste enthalten ist.

:::

**Beispiel**
Operator

Highlight items meeting multiple filtering conditions

const filtered = _.filter(data, item => {




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


## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note{title=Beschreibung}
Gestapelter Eckenradius des Säulendiagramms

:::


## barMaxWidth

**Type:** `string | number | undefined`

:::note{title=Beschreibung}
Maximum column width. It can be a pixel value or a percentage string.

:::


## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note{title=Beschreibung}
Stil der Rechteckmarke für Säulendiagramme, einschließlich Farbe, Rahmen und Rundung.

Unterstützt globale oder bedingte Stilkonfigurationen

Datenfilter

Wenn selector konfiguriert ist, stehen numerische, lokale Daten-, bedingte Dimensions- und bedingte Kennzahlen-Selektoren zur Verfügung

Ohne selector gilt der Stil global.

:::
### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
Datenselektor

Wenn selector konfiguriert ist, stehen numerische, lokale Daten-, bedingte Dimensions- und bedingte Kennzahlen-Selektoren zur Verfügung

Ohne selector gilt der Stil global.

:::

**Beispiel**
Numerischer Selektor
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

Lokaler Datenselektor
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

Bedingter Dimensionsselektor
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

Bedingter Kennzahlenselektor
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
Dimensionsfeld; die ID eines Eintrags in dimensions

:::
#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

- in: Wählt Datenpunkte aus, deren Dimensionsfeldwert in value enthalten ist

- not in: Wählt Datenpunkte aus, deren Dimensionsfeldwert nicht in value enthalten ist

:::
#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

- in: Wählt Datenpunkte aus, deren Dimensionsfeldwert in value enthalten ist

- not in: Wählt Datenpunkte aus, deren Dimensionsfeldwert nicht in value enthalten ist

Entspricht operator

:::
#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wert des Dimensionsfelds im Datenpunkt; Arrays werden unterstützt

:::
### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}
Dynamischer Filter (Ausführung von KI-generiertem Code)

Implementiert komplexe Filterlogik über KI-generierten JavaScript-Code.

Geeignet für Top N, statistische Analysen, komplexe Bedingungen und andere Fälle, die mit statischen Selektoren schwer auszudrücken sind.

Kernfunktionen:

- Unterstützt beliebig komplexe Filterbedingungen

- Verwendet eingebaute Hilfsfunktionen für Datenoperationen

- Sichere Ausführung im Browser (Web-Worker-Sandbox)

Umgebung: Nur Browser werden unterstützt; in Node.js wird fallback verwendet.

Hinweis: selector und dynamicFilter können nicht gleichzeitig verwendet werden; dynamicFilter hat höhere Priorität.

Konfiguration des dynamischen Diagrammfilters

Filtert Diagrammmarken (Balken, Punkte usw.) per KI-generiertem JavaScript-Code

:::
#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}
Beschreibung der Filteranforderung des Benutzers (natürliche Sprache)

:::

**Beispiel**
"Balken mit Umsatz > 1000 hervorheben"

"Balken mit der höchsten Gewinnrate je Region hervorheben"
#### code

**Type:** `string`

:::note{title=Beschreibung}
KI-generierter JavaScript-Filtercode

- Es dürfen nur eingebaute Hilfsfunktionen verwendet werden (Zugriff über _ oder R)

- Eingabeparameter: data (Array), jedes item enthält das Feld __row_index als Zeilennummer

- Muss ein Array aus Zeilenindex- und Feldkombinationen zurückgeben: Array<{ __row_index: number, field: string }>

- __row_index ist die Zeilennummer des ursprünglichen Datenpunkts, field ist das hervorzuhebende Feld

- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen

:::

**Beispiel**
Das sales-Feld von Datenpunkten mit sales größer als 1000 hervorheben
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Datenpunkt mit der höchsten Gewinnrate je Region hervorheben
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

Datenpunkte mit mehreren Bedingungen hervorheben
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
Fallback, wenn die Codeausführung fehlschlägt oder die Umgebung nicht unterstützt wird

:::
##### field

**Type:** `string`

:::note{title=Beschreibung}
Dimensionsfeld; die ID eines Eintrags in dimensions

:::
##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

- in: Wählt Datenpunkte aus, deren Dimensionsfeldwert in value enthalten ist

- not in: Wählt Datenpunkte aus, deren Dimensionsfeldwert nicht in value enthalten ist

:::
##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

- in: Wählt Datenpunkte aus, deren Dimensionsfeldwert in value enthalten ist

- not in: Wählt Datenpunkte aus, deren Dimensionsfeldwert nicht in value enthalten ist

Entspricht operator

:::
##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wert des Dimensionsfelds im Datenpunkt; Arrays werden unterstützt

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

### barVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Balkenmarke (Rechteck) sichtbar ist

:::
### barColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe der Balkenmarke (Rechteck)

:::
### barColorOpacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
Deckkraft der Balkenmarkenfarbe (Rechteck)

:::
### barBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Rahmenfarbe der Balkenmarke (Rechteck)

:::
### barBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Rahmenbreite der Balkenmarke (Rechteck)

:::
### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Beschreibung}
Rahmenstil der Balkenmarke (Rechteck)

:::

**Beispiel**
solid

dashed

dotted
### barBorderOpacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
Eckenradius der Balkenmarke (Rechteck)

Strichdeckkraft der Balkenmarke (Rechteck)

:::

**Beispiel**
4

[0, 0, 10, 10]
### barRadius

**Type:** `number | number[] | undefined`


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Beschreibung}
Konfiguration von Anmerkungspunkten; definiert anhand ausgewählter Daten Position, Format, Stil usw.

:::
### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
Selektor für den Anmerkungspunkt, um Datenpunkte auszuwählen.

:::
#### field

**Type:** `string`

:::note{title=Beschreibung}
Dimensionsfeld; die ID eines Eintrags in dimensions

:::
#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

- in: Wählt Datenpunkte aus, deren Dimensionsfeldwert in value enthalten ist

- not in: Wählt Datenpunkte aus, deren Dimensionsfeldwert nicht in value enthalten ist

:::
#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

- in: Wählt Datenpunkte aus, deren Dimensionsfeldwert in value enthalten ist

- not in: Wählt Datenpunkte aus, deren Dimensionsfeldwert nicht in value enthalten ist

Entspricht operator

:::
#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wert des Dimensionsfelds im Datenpunkt; Arrays werden unterstützt

:::
### measureId

**Type:** `string | undefined`

:::note{title=Beschreibung}
Gibt die Kennzahl-ID an, zu der der Anmerkungspunkt gehört. In Szenarien mit mehreren measures kann sie zusammen mit selector den Zielpunkt eindeutig lokalisieren.

:::
### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}
Dynamischer Filter (Ausführung von KI-generiertem Code)

Implementiert komplexe Filterlogik über KI-generierten JavaScript-Code.

Geeignet für Top N, statistische Analysen, komplexe Bedingungen und andere Fälle, die mit statischen Selektoren schwer auszudrücken sind.

Kernfunktionen:

- Unterstützt beliebig komplexe Filterbedingungen

- Verwendet eingebaute Hilfsfunktionen für Datenoperationen

- Sichere Ausführung im Browser (Web-Worker-Sandbox)

Umgebung: Nur Browser werden unterstützt; in Node.js wird fallback verwendet.

Hinweis: selector und dynamicFilter können nicht gleichzeitig verwendet werden; dynamicFilter hat höhere Priorität.

Konfiguration des dynamischen Diagrammfilters

Filtert Diagrammmarken (Balken, Punkte usw.) per KI-generiertem JavaScript-Code

:::
#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}
Beschreibung der Filteranforderung des Benutzers (natürliche Sprache)

:::

**Beispiel**
"Balken mit Umsatz > 1000 hervorheben"

"Balken mit der höchsten Gewinnrate je Region hervorheben"
#### code

**Type:** `string`

:::note{title=Beschreibung}
KI-generierter JavaScript-Filtercode

- Es dürfen nur eingebaute Hilfsfunktionen verwendet werden (Zugriff über _ oder R)

- Eingabeparameter: data (Array), jedes item enthält das Feld __row_index als Zeilennummer

- Muss ein Array aus Zeilenindex- und Feldkombinationen zurückgeben: Array<{ __row_index: number, field: string }>

- __row_index ist die Zeilennummer des ursprünglichen Datenpunkts, field ist das hervorzuhebende Feld

- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen

:::

**Beispiel**
Das sales-Feld von Datenpunkten mit sales größer als 1000 hervorheben
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Datenpunkt mit der höchsten Gewinnrate je Region hervorheben
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

Datenpunkte mit mehreren Bedingungen hervorheben
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
Fallback, wenn die Codeausführung fehlschlägt oder die Umgebung nicht unterstützt wird

:::
##### field

**Type:** `string`

:::note{title=Beschreibung}
Dimensionsfeld; die ID eines Eintrags in dimensions

:::
##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

- in: Wählt Datenpunkte aus, deren Dimensionsfeldwert in value enthalten ist

- not in: Wählt Datenpunkte aus, deren Dimensionsfeldwert nicht in value enthalten ist

:::
##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

- in: Wählt Datenpunkte aus, deren Dimensionsfeldwert in value enthalten ist

- not in: Wählt Datenpunkte aus, deren Dimensionsfeldwert nicht in value enthalten ist

Entspricht operator

:::
##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wert des Dimensionsfelds im Datenpunkt; Arrays werden unterstützt

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
Textinhalt

:::

**Beispiel**
'Annotation text'
### textColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Textfarbe

:::

**Beispiel**
'red'
### textFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Textschriftgröße

:::

**Beispiel**
12
### textFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
Textschriftstärke

:::

**Beispiel**
400
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Beschreibung}
Textausrichtung, normalerweise nicht erforderlich

Empfohlen ist right, damit der Text links der Anmerkungslinie steht

right: Text steht links der Referenzlinie, seine rechte Kante ist an der vertikalen Anmerkungslinie ausgerichtet

left: Text steht rechts der Referenzlinie, seine linke Kante ist an der vertikalen Anmerkungslinie ausgerichtet

center: Text steht in der Mitte der Referenzlinie

:::

**Beispiel**
'right'
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Beschreibung}
Vertikale Textausrichtung. Normalerweise top verwenden, damit der Text unter dem Anmerkungspunkt innerhalb des sichtbaren Diagrammbereichs bleibt

Empfohlen ist top, damit der vollständige Text sichtbar bleibt

top: Text liegt unter dem Anmerkungspunkt

middle: Text ist am Mittelpunkt des Anmerkungspunkts ausgerichtet

bottom: Text liegt über dem Anmerkungspunkt

:::

**Beispiel**
'top'
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob der Hintergrund sichtbar ist

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
Hintergrund-Rahmenfarbe

:::

**Beispiel**
'red'
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Hintergrund-Rahmenbreite

:::

**Beispiel**
2
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}
Hintergrund-Eckenradius

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
Y-Versatz des gesamten Anmerkungspunkts in Pixeln. Bei Punkten oberhalb des Diagramms werden positive Werte empfohlen, darunter negative Werte.

Negative Werte verschieben die gesamte Komponente nach oben, z. B. -10 um 10 Pixel

Positive Werte verschieben sie nach unten, z. B. 10 um 10 Pixel

:::

**Beispiel**
offsetY: 5
### offsetX

**Type:** `number | undefined`

:::note{title=Beschreibung}
X-Versatz des gesamten Anmerkungspunkts in Pixeln. Links im Diagramm werden positive Werte empfohlen, rechts negative Werte.

Negative Werte verschieben die gesamte Komponente nach links, z. B. -10 um 10 Pixel

Positive Werte verschieben sie nach rechts, z. B. 10 um 10 Pixel

:::

**Beispiel**
offsetX: 5
## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Beschreibung}
Konfiguration vertikaler Anmerkungslinien.

:::
### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Beschreibung}
Fester X-Wert für die vertikale Anmerkungslinie; bei Kategorieachse ein Dimensionswert, bei numerischer Achse ein konkreter Wert

:::
### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Beschreibung}
Dynamischer Filter (Ausführung von KI-generiertem Code)

KI-generierter JavaScript-Filtercode

- Es dürfen nur eingebaute Hilfsfunktionen verwendet werden (Zugriff über _ oder R)

- Eingabeparameter: data (Array)

- Muss einen einzelnen Zahlen- oder Zeichenkettenwert zurückgeben: number | string

- Einsatz: dynamische Werte für Anmerkungslinien (horizontal/vertikal)

- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen

:::
#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}
Beschreibung der dynamischen Wertanforderung (natürliche Sprache)

:::

**Beispiel**
"Maximalen Umsatzwert als Referenz für die Anmerkungslinie abrufen"

"Durchschnittlichen Umsatz für die Anmerkungslinie berechnen"
#### code

**Type:** `string`

:::note{title=Beschreibung}
Dynamischer Filter (Ausführung von KI-generiertem Code)

KI-generierter JavaScript-Filtercode

- Es dürfen nur eingebaute Hilfsfunktionen verwendet werden (Zugriff über _ oder R)

- Eingabeparameter: data (Array)

- Muss einen einzelnen Zahlen- oder Zeichenkettenwert zurückgeben: number | string

- Einsatz: dynamische Werte für Anmerkungslinien (horizontal/vertikal)

- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen

:::

**Beispiel**
Maximalen Umsatzwert als Wert der Anmerkungslinie abrufen
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Durchschnittswert für die Anmerkungslinie berechnen
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Quantilwert als Anmerkungslinie abrufen
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Zielwert nach Bedingung berechnen
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
Fallback-Wert, wenn Codeausführung fehlschlägt oder die Umgebung nicht unterstützt wird

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
Textinhalt

:::

**Beispiel**
'Annotation text'
### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Beschreibung}
Textposition

Labelposition der Anmerkungslinie relativ zur Linie.

:::

**Beispiel**
'outsideEnd'
### textColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Textfarbe

:::

**Beispiel**
'red'
### textFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Textschriftgröße

:::

**Beispiel**
12
### textFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
Textschriftstärke

:::

**Beispiel**
400
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Beschreibung}
Textausrichtung, normalerweise nicht erforderlich

Empfohlen ist right, damit der Text links der Anmerkungslinie steht

right: Text steht links der Referenzlinie, seine rechte Kante ist an der vertikalen Anmerkungslinie ausgerichtet

left: Text steht rechts der Referenzlinie, seine linke Kante ist an der vertikalen Anmerkungslinie ausgerichtet

center: Text steht in der Mitte der Referenzlinie

:::

**Beispiel**
'right'
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Beschreibung}
Vertikale Textausrichtung, normalerweise nicht erforderlich

Empfohlen ist top, damit der vollständige Text im sichtbaren Diagrammbereich bleibt

top: Text liegt unter der Referenzlinie und ist am Ende der vertikalen Anmerkungslinie ausgerichtet

middle: Text liegt in der Mitte der Referenzlinie

bottom: Text liegt über der Referenzlinie

:::

**Beispiel**
'top'
### lineVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Linie sichtbar ist

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
Linienstil

:::

**Beispiel**
'solid'
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob der Hintergrund sichtbar ist

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
Hintergrund-Rahmenfarbe

:::

**Beispiel**
'red'
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Hintergrund-Rahmenbreite

:::

**Beispiel**
2
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}
Hintergrund-Eckenradius

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
Konfiguration horizontaler Anmerkungslinien.

:::
### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Beschreibung}
Fester Y-Wert für die horizontale Anmerkungslinie; bei Kategorieachse ein Dimensionswert, bei numerischer Achse ein konkreter Wert

:::
### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Beschreibung}
Dynamischer Filter (Ausführung von KI-generiertem Code)

KI-generierter JavaScript-Filtercode

- Es dürfen nur eingebaute Hilfsfunktionen verwendet werden (Zugriff über _ oder R)

- Eingabeparameter: data (Array)

- Muss einen einzelnen Zahlen- oder Zeichenkettenwert zurückgeben: number | string

- Einsatz: dynamische Werte für Anmerkungslinien (horizontal/vertikal)

- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen

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

"Durchschnittlichen Umsatz für die Markierungslinie berechnen"



#### code

**Type:** `string`

:::note{title=Beschreibung}
Dynamischer Filter (Ausführung von KI-generiertem Code)

KI-generierter JavaScript-Filtercode

- Es dürfen nur eingebaute Hilfsfunktionen verwendet werden (Zugriff über _ oder R)

- Eingabeparameter: data (Array)

- Muss einen einzelnen Zahlen- oder Zeichenkettenwert zurückgeben: number | string

- Einsatz: dynamische Werte für Anmerkungslinien (horizontal/vertikal)

- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen

:::

**Beispiel**
Maximalen Umsatzwert als Wert der Anmerkungslinie abrufen
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Durchschnittswert für die Anmerkungslinie berechnen
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Quantilwert als Anmerkungslinie abrufen
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Zielwert nach Bedingung berechnen
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
Fallback-Wert, wenn Codeausführung fehlschlägt oder die Umgebung nicht unterstützt wird

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
Textinhalt

:::

**Beispiel**
'Annotation text'
### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Beschreibung}
Textposition

Labelposition der Anmerkungslinie relativ zur Linie.

:::

**Beispiel**
'outsideEnd'
### textColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Textfarbe

:::

**Beispiel**
'red'
### textFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Textschriftgröße

:::

**Beispiel**
12
### textFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
Textschriftstärke

:::

**Beispiel**
400
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Beschreibung}
Textausrichtung, normalerweise nicht erforderlich

Empfohlen ist right, damit der Text links der Anmerkungslinie steht

right: Text steht links der Referenzlinie, seine rechte Kante ist an der vertikalen Anmerkungslinie ausgerichtet

left: Text steht rechts der Referenzlinie, seine linke Kante ist an der vertikalen Anmerkungslinie ausgerichtet

center: Text steht in der Mitte der Referenzlinie

:::

**Beispiel**
'right'
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Beschreibung}
Vertikale Textausrichtung, normalerweise nicht erforderlich

Empfohlen ist top, damit der vollständige Text im sichtbaren Diagrammbereich bleibt

top: Text liegt unter der Referenzlinie und ist an der horizontalen Anmerkungslinie ausgerichtet

middle: Text liegt in der Mitte der Referenzlinie

bottom: Text liegt über der Referenzlinie

:::

**Beispiel**
'top'
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob der Hintergrund sichtbar ist

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
Hintergrund-Rahmenfarbe

:::

**Beispiel**
'red'
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Hintergrund-Rahmenbreite

:::

**Beispiel**
2
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}
Hintergrund-Eckenradius

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
Ob die Linie sichtbar ist

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
Linienstil

:::

**Beispiel**
'solid'
### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=Beschreibung}
Trennlinienkonfiguration; kann Bereiche über und unter dem Anmerkungswert unterschiedlich einfärben.

:::
#### positiveColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hauptfarbe für den Teil größer als der Anmerkungswert

:::
#### negativeColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hauptfarbe für den Teil kleiner als der Anmerkungswert

:::
## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Beschreibung}
Konfiguration des Anmerkungsbereichs; definiert anhand ausgewählter Daten Position und Stil des Bereichs.

:::
### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Beschreibung}
Selektor für den Anmerkungsbereich.

:::
#### field

**Type:** `string`

:::note{title=Beschreibung}
Dimensionsfeld; die ID eines Eintrags in dimensions

:::
#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

- in: Wählt Datenpunkte aus, deren Dimensionsfeldwert in value enthalten ist

- not in: Wählt Datenpunkte aus, deren Dimensionsfeldwert nicht in value enthalten ist

:::
#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

- in: Wählt Datenpunkte aus, deren Dimensionsfeldwert in value enthalten ist

- not in: Wählt Datenpunkte aus, deren Dimensionsfeldwert nicht in value enthalten ist

Entspricht operator

:::
#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wert des Dimensionsfelds im Datenpunkt; Arrays werden unterstützt

:::
### text

**Type:** `string | string[] | undefined`

:::note{title=Beschreibung}
Textinhalt

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
Textfarbe

:::

**Beispiel**
'red'
### textFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Textschriftgröße

:::

**Beispiel**
12
### textFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
Textschriftstärke

:::

**Beispiel**
400
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Beschreibung}
Textausrichtung, normalerweise nicht erforderlich

center: Text ist im Anmerkungsbereich zentriert

left: Text steht links im Anmerkungsbereich

right: Text steht rechts im Anmerkungsbereich

:::

**Beispiel**
'center'
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Beschreibung}
Vertikale Textausrichtung, normalerweise nicht erforderlich

top: Text steht oben im Anmerkungsbereich

middle: Text steht mittig im Anmerkungsbereich

bottom: Text steht unten im Anmerkungsbereich

:::

**Beispiel**
'middle'
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob der Hintergrund sichtbar ist

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
Hintergrund-Rahmenfarbe

:::

**Beispiel**
'red'
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Hintergrund-Rahmenbreite

:::

**Beispiel**
2
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}
Hintergrund-Eckenradius

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
Farbe des Anmerkungsbereichs

:::

**Beispiel**
'rgba(255,0,0,0.1)'
### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
Deckkraft des Anmerkungsbereichs

:::

**Beispiel**
0.2
### areaBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Rahmenfarbe des Anmerkungsbereichs

:::

**Beispiel**
'red'
### areaBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Rahmenbreite des Anmerkungsbereichs

:::

**Beispiel**
2
### areaBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}
Eckenradius des Anmerkungsbereichs

:::

**Beispiel**
4
### areaLineDash

**Type:** `number[] | undefined`

:::note{title=Beschreibung}
Strichelung des Bereichsrahmens

:::

**Beispiel**
[4, 4]
### outerPadding

**Type:** `number | undefined`

:::note{title=Beschreibung}
Außenabstand

:::

**Beispiel**
8
## annotationDifferenceLine

**Type:** `AnnotationDifferenceLine | AnnotationDifferenceLine[] | undefined`

:::note{title=Beschreibung}
\- not in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds nicht in value enthalten ist

:::


### start

**Type:** `DifferenceAnchor`

:::note{title=Beschreibung}
Start anchor of the difference annotation line.



\- in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds in value enthalten ist

:::


#### selector

**Type:** `DifferenceSelector | DifferenceSelector[]`

:::note{title=Beschreibung}
\- not in: Wählt Datenelemente aus, deren Wert des Dimensionsfelds nicht in value enthalten ist

:::

**Beispiel**
{ year: '1930', type: 'Autocracies' }

Wert des Dimensionsfelds, unterstützt Arrays




##### field

**Type:** `string`

:::note{title=Beschreibung}
Dimensionsfeld; die ID eines Elements in dimensions.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert in der Werteliste enthalten ist.

\- not in: Wählt Datenobjekte aus, deren Dimensionsfeldwert NICHT in der Werteliste enthalten ist.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert in der Werteliste enthalten ist.

\- not in: Wählt Datenobjekte aus, deren Dimensionsfeldwert NICHT in der Werteliste enthalten ist.

identisch mit operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Ausgewählte Dimensionsfeldwerte; Arrays werden unterstützt.

:::

### end

**Type:** `DifferenceAnchor`

:::note{title=Beschreibung}
End anchor of the difference annotation line.



Ankerkonfiguration für Differenzanmerkungen, mit der die an Start- oder Endpunkt gebundenen Daten ausgewählt werden.

:::


#### selector

**Type:** `DifferenceSelector | DifferenceSelector[]`

:::note{title=Beschreibung}
Anchor selector. It must ultimately locate one logical anchor.

:::

**Beispiel**
{ year: '1930', type: 'Autocracies' }

[{ field: 'year', operator: 'in', value: ['1930'] }, { field: 'type', operator: 'in', value: ['Autocracies'] }]




##### field

**Type:** `string`

:::note{title=Beschreibung}
Dimensionsfeld; die ID eines Elements in dimensions.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert in der Werteliste enthalten ist.

\- not in: Wählt Datenobjekte aus, deren Dimensionsfeldwert NICHT in der Werteliste enthalten ist.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

\- in: Wählt Datenobjekte aus, deren Dimensionsfeldwert in der Werteliste enthalten ist.

\- not in: Wählt Datenobjekte aus, deren Dimensionsfeldwert NICHT in der Werteliste enthalten ist.

identisch mit operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Werte des Dimensionsfelds auswählen; Arrays werden unterstützt
:::

### differenceType

**Type:** `"percent" | "absolute" | undefined`

:::note{title=Beschreibung}
Differenzwerttyp.

- absolute: zeigt die absolute Differenz an, berechnet als end - start

- percent: zeigt die prozentuale Differenz an, berechnet als (end - start) / start
:::

### textFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Textschriftgröße.
:::

### textColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Textfarbe.
:::

### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Texthintergrundfarbe.
:::

### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Linienfarbe.
:::

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Beschreibung}
Linienstil.
:::


## polynomialRegressionLine

**Type:** `PolynomialRegressionLine | PolynomialRegressionLine[] | undefined`

:::note{title=Beschreibung}
Polynomiale Regressionslinie

Konfiguration der polynomialen Regressionslinie, einschließlich Polynomgrad, Regressionslinienstil usw.
:::


### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob aktiviert
:::

### color

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe der Regressionslinie

Legt die Farbe der Regressionslinie fest. Wenn nicht gesetzt, wird standardmäßig die Hauptfarbe des Diagramms verwendet.
:::

### degree

**Type:** `number | undefined`

:::note{title=Beschreibung}
Grad der polynomialen Regression
:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Breite der Regressionslinie

Legt die Breite der Regressionslinie in Pixeln fest. Standardwert ist 1.
:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=Beschreibung}
Stil der Regressionslinie

Legt den Stil der Regressionslinie fest, z. B. durchgezogen oder gestrichelt. Standard ist durchgezogen.
:::

### text

**Type:** `string | undefined`

:::note{title=Beschreibung}
Beschriftungstext der Regressionslinie

Legt den Beschriftungstext der Regressionslinie fest. Eine leere Zeichenfolge bedeutet, dass keine Beschriftung angezeigt wird.
:::

### textColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Textfarbe
:::

**Beispiel**
'center' Text is centered in the annotation area



### textFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Textschriftgröße
:::

**Beispiel**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
Textschriftstärke

:::

**Beispiel**
400
### confidenceIntervalVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob das Konfidenzintervall angezeigt wird
:::

### confidenceLevel

**Type:** `number | undefined`

:::note{title=Beschreibung}
Werteinstellung des Konfidenzintervalls; Standard ist 95% Konfidenz
:::

### confidenceIntervalColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe des Konfidenzintervalls
:::

### confidenceIntervalOpacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
Deckkraft des Konfidenzintervalls
:::

**Beispiel**
0.5




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
