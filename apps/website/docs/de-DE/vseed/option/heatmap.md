# Heatmap

:::info{title=Empfehlung}
\- Empfohlene Feldkonfiguration: `1` Kennzahl, `2` Dimensionen

\- Unterstützt Datenumformung: mindestens `1` Kennzahl, `0` Dimensionen

:::

:::info{title=Encoding-Zuordnung}
Das Heatmap-Diagramm unterstützt die folgenden visuellen Kanäle:

`xAxis`      : X-Achsenkanal, unterstützt `mehrere Dimensionen` und ordnet Dimensionswerte der X-Achse zu

`yAxis`      : Y-Achsenkanal, unterstützt `mehrere Dimensionen` und ordnet Dimensionswerte der Y-Achse zu

`detail` : Detailkanal, unterstützt `mehrere Dimensionen` und wird verwendet, um feinere Daten innerhalb derselben Farbserie darzustellen

`color`  : Farbkanal, unterstützt `eine Kennzahl` und ordnet Kennzahlenwerte Farben zu

`tooltip`: Tooltip-Kanal, unterstützt `mehrere Dimensionen` und `mehrere Kennzahlen` und wird angezeigt, wenn der Mauszeiger über einem Datenpunkt liegt

`label`  : Label-Kanal, unterstützt `mehrere Dimensionen` und `mehrere Kennzahlen` und zeigt Datenlabels auf Datenpunkten an

:::

:::note{title=Beschreibung}
Heatmap-Diagramm, das Datenverteilung und Intensität über Farbabstufungen in einer zweidimensionalen Matrix darstellt.

Anwendungsszenarien:

\- Darstellung von Dichte und Intensität großer zweidimensionaler Daten

\- Korrelationsanalyse zwischen Kategorien und numerischen Werten

\- Kreuzvergleich zwischen Zeitreihen und Kategorien

:::

:::warning{title=Warning}
Datenanforderungen:

\- Mindestens 2 Dimensionsfelder zur Bestimmung der Zeilen und Spalten der Heatmap

\- Mindestens 1 numerisches Feld (Kennzahl), das auf die Farbtiefe gemappt wird

\- Wenn mehrere Kennzahlen unterstützt werden, wird normalerweise eine Kennzahl für die Farbzuordnung ausgewählt

Standardmäßig aktivierte Funktionen:

\- Legende, Achsen, Datenlabels, Tooltips und numerische Skalierung sind standardmäßig aktiviert

:::


## chartType

**Type:** `"heatmap"`

:::note{title=Beschreibung}
Heatmap-Diagramm



Heatmap-Diagramm, das Datenverteilung und Intensität über Farbabstufungen in einer zweidimensionalen Matrix darstellt.

:::

**Beispiel**
'heatmap'




## dataset

**Type:** `Record[]`

:::note{title=Beschreibung}
Datensatz



Ein bereits aggregierter Datensatz nach TidyData-Spezifikation, der Datenquelle und Struktur des Diagramms definiert. Der vom Benutzer eingegebene Datensatz muss nicht weiter verarbeitet werden. VSeed verfügt über leistungsfähige Datenumformungsfunktionen und formt die Daten selbstständig um. Die Daten des Heatmap-Diagramms werden schließlich in 2 Dimensionen und 1 Kennzahl umgewandelt.

:::

**Beispiel**
[{month:'Jan', value:100}, {month:'Feb', value:150}, {month:'Mar', value:120}]




## dimensions

**Type:** `HeatmapDimension[] | undefined`

:::note{title=Beschreibung}
Dimensionen



Beim Heatmap-Diagramm wird die erste Dimension auf die Winkelachse gemappt; die übrigen Dimensionen werden mit Kennzahlennamen (wenn mehrere Kennzahlen vorhanden sind) zusammengeführt und als Legendeneinträge angezeigt.

:::

**Beispiel**
[{id: 'category', alias: 'Kategorie'}]




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

**Type:** `"xAxis" | "tooltip" | "label" | "row" | "column" | "yAxis" | undefined`

:::note{title=Beschreibung}
Kanal, dem die Dimension zugeordnet wird

\- xAxis: unterstützt die Zuordnung mehrerer Dimensionen zur X-Achse

\- yAxis: unterstützt die Zuordnung mehrerer Dimensionen zur Y-Achse

\- tooltip: Unterstützt die Zuordnung mehrerer Dimensionen zum Tooltip-Kanal

\- label: Unterstützt die Zuordnung mehrerer Dimensionen zum Beschriftungskanal

\- row: unterstützt die Zuordnung mehrerer Dimensionen zum Zeilenkanal

\- column: unterstützt die Zuordnung mehrerer Dimensionen zum Spaltenkanal

:::


## measures

**Type:** `HeatmapMeasure[] | undefined`

:::note{title=Beschreibung}
Kennzahlen



Heatmap-Kennzahlen werden automatisch zu einer Kennzahl zusammengeführt und auf die Radiusachse gemappt. Wenn mehrere Kennzahlen vorhanden sind, werden Kennzahlennamen mit den übrigen Dimensionen zusammengeführt und als Legendeneinträge angezeigt.

:::

**Beispiel**
[{id: 'value', alias: 'Wert'}]




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
\- 1234.5678 wird zu 1235 konvertiert, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.6 konvertiert, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.57 konvertiert, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1230.568 konvertiert, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.5678 konvertiert, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.56780 konvertiert, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Significant digits for numeric formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits.

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
Decimal places for numeric formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

:::

**Beispiel**
\- 1234.5678 wird zu 1230 konvertiert, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Significant digits for numeric formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits.

:::

### format

**Type:** `NumFormat | undefined`


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
\- 1234.5678 wird zu 1235 konvertiert, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.6 konvertiert, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.57 konvertiert, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1230.568 konvertiert, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.5678 konvertiert, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.56780 konvertiert, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Significant digits for numeric formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits.

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
Nachkommastellen der Zahlenformatierung, verwendet minimumFractionDigits und maximumFractionDigits von Intl.NumberFormat des Browsers; niedrigere Priorität als significantDigits

:::

**Beispiel**
\- 1234.5678 wird zu 1230 konvertiert, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Signifikante Stellen der Zahlenformatierung, verwendet minimumSignificantDigits und maximumSignificantDigits von Intl.NumberFormat des Browsers; höhere Priorität als fractionDigits

:::

### encoding

**Type:** `"color" | "tooltip" | "label" | undefined`

:::note{title=Beschreibung}
Kanal, dem die Kennzahl zugeordnet wird

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
Paginierungskonfiguration

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
Diagrammhintergrundfarbe



Die Hintergrundfarbe kann ein Farbstring sein (z. B. 'red', 'blue') oder ein Hex-, rgb- oder rgba-Wert (z. B. '#ff0000', 'rgba(255,0,0,0.5)')

:::


## color

**Type:** `Color | undefined`

:::note{title=Beschreibung}
Color



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
Heatmap-Label-Konfiguration zur Definition der Datenlabels. Die inverse Label-Farbe wird automatisch aktiviert, um die Lesbarkeit sicherzustellen.

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
Nachkommastellen der Zahlenformatierung, verwendet minimumFractionDigits und maximumFractionDigits von Intl.NumberFormat des Browsers; niedrigere Priorität als significantDigits

:::

**Beispiel**
\- 1234.5678 wird zu 1230 konvertiert, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Signifikante Stellen der Zahlenformatierung, verwendet minimumSignificantDigits und maximumSignificantDigits von Intl.NumberFormat des Browsers; höhere Priorität als fractionDigits

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Label-Schriftgröße

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Beschreibung}
Label-Schriftstärke

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
Werte des Dimensionsfelds auswählen; Arrays werden unterstützt
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
Beschreibung der Filteranforderung des Benutzers (natürliche Sprache).

:::

**Beispiel**
\- Supports any complex data filtering conditions

\- Uses built-in utility functions for data operations



#### code

**Type:** `string`

:::note{title=Beschreibung}
Von AI generierter JavaScript-Filtercode.



\- Unterstützt beliebig komplexe Datenfilterbedingungen

\- Verwendet integrierte Hilfsfunktionen für Datenoperationen

\- Führt sicher in der Browserumgebung aus (Web-Worker-Sandbox)

Umgebungsanforderungen: Unterstützt nur die Browserumgebung; in Node.js wird ein Fallback verwendet

Hinweis: selector und dynamicFilter können nicht gleichzeitig verwendet werden; dynamicFilter hat höhere Priorität

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

**Type:** `ColorLegend | undefined`

:::note{title=Beschreibung}
legend



Konfiguration der Heatmap-Farblegende, einschließlich Position, Format, Stil usw.

:::


### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Beschreibung}
Legendenposition

:::

**Beispiel**
position: 'rightTop'



### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Legendenfunktion aktiviert ist.

:::

**Beispiel**
enable: true



### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
legend font color

:::

### labelFontColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
legend font color

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Schriftgröße der Legende

:::

**Beispiel**
labelFontSize: 10



### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Beschreibung}
Schriftstärke der Legende

:::

**Beispiel**
labelFontWeight: 400



### railBackgroundColor

**Type:** `string | undefined`

### handlerBorderColor

**Type:** `string | undefined`


## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Beschreibung}
Tooltip-Informationen



Heatmap-Tooltip-Konfiguration, einschließlich Position, Format, Stil usw.

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


## theme

**Type:** `Theme | undefined`

:::note{title=Beschreibung}
Diagrammthema. Das Thema ist eine Funktionskonfiguration mit niedriger Priorität und enthält allgemeine Konfigurationen für alle Diagrammtypen sowie gemeinsame Diagrammkonfigurationen für einzelne Diagrammtypen.



Integrierte helle und dunkle Themes; Benutzer können Themes über Builder anpassen.



const maxItems = _.map(grouped, group =>



Integrierte helle und dunkle Themes; neue Themes können über registerTheme angepasst werden.

:::

**Beispiel**
'dark'

'light'

'customThemeName'




### length

**Type:** `number`

### brand

**Type:** `brand`


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Beschreibung}
language



Sprachkonfiguration des Diagramms. Unterstützt 'zh-CN' und 'en-US'. Zusätzlich kann intl.setLocale('zh-CN') aufgerufen werden, um die Sprache festzulegen.

:::
