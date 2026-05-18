# Donut

:::info{title=Empfohlen}
- Empfohlene Feldkonfiguration: `1` Kennzahl, `2` Dimensionen

- Unterstützt Datenumformung: mindestens `1` Kennzahl, `0` Dimensionen
:::

:::info{title=Encoding-Zuordnung}
Das Donut-Diagramm unterstützt die folgenden visuellen Kanäle:

`angle`  : Winkelkanal, unterstützt `mehrere Kennzahlen` und ordnet Kennzahlwerte dem Sektorwinkel zu

`detail` : Detailkanal, unterstützt `mehrere Dimensionen`, um innerhalb derselben Farbserie feiner granulare Daten anzuzeigen

`color`  : Farbkanal, unterstützt `mehrere Dimensionen` oder `eine Kennzahl`; Dimensionsfarben unterscheiden Datenreihen, Kennzahlfarben bilden Kennzahlwerte linear auf Grafikfarben ab

`tooltip`: Tooltip-Kanal, unterstützt `mehrere Dimensionen` und `mehrere Kennzahlen`, wird beim Hover über einen Datenpunkt angezeigt

`label`  : Label-Kanal, unterstützt `mehrere Dimensionen` und `mehrere Kennzahlen`, zeigt Datenlabels auf Datenpunkten an
:::

:::note{title=Beschreibung}
Ein Donut-Diagramm eignet sich zur Darstellung von Anteilen eindimensionaler Daten; der freie Bereich in der Mitte kann Zusammenfassungsinformationen anzeigen.

Geeignete Szenarien:

- Gesamtwert und Anteil der einzelnen Teile gleichzeitig anzeigen

- Beziehung zwischen dem Ganzen und seinen Teilen hervorheben

- Wichtige Kennzahlen oder Titel im mittleren Bereich anzeigen
:::

:::warning{title=Warning}
Datenanforderungen:

- mindestens 1 Kennzahlfeld

- Alle Dimensionen werden mit Kennzahlnamen (wenn mehrere Kennzahlen vorhanden sind) zusammengeführt und als Legendeneinträge angezeigt

- Alle Kennzahlen werden automatisch zu einer Kennzahl zusammengeführt

Standardmäßig aktivierte Funktionen:

- Legende, Datenlabels, Tooltips, Anteilsberechnung und Mitteltext sind standardmäßig aktiviert
:::


## chartType

**Type:** `"donut"`

:::note{title=Beschreibung}
Donut-Diagramm

Donut-Diagramm, eine Variante des Kreisdiagramms mit freiem Bereich in der Mitte.
:::

**Beispiel**
'donut'




## dataset

**Type:** `Record[]`

:::note{title=Beschreibung}
Datensatz

Ein bereits aggregierter, TidyData-konformer Datensatz zur Definition von Datenquelle und Struktur des Diagramms. Benutzereingaben müssen nicht zusätzlich verarbeitet werden. VSeed verfügt über leistungsfähige Datenumformungsfunktionen und formt die Daten automatisch um. Die Daten des Donut-Diagramms werden letztlich in 1 Dimension und 1 Kennzahl umgewandelt.
:::

**Beispiel**
[{category:'A', value:30}, {category:'B', value:70}]




## dimensions

**Type:** `PieDimension[] | undefined`

:::note{title=Beschreibung}
Dimensionen

Alle Dimensionen des Donut-Diagramms werden mit Kennzahlnamen (wenn mehrere Kennzahlen vorhanden sind) zu 1 Dimension zusammengeführt, dem Winkel des Kreisdiagramms zugeordnet und als Legendeneinträge angezeigt.
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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title=Beschreibung}
Kanal, dem die Dimension zugeordnet wird

\- color: unterstützt die Zuordnung mehrerer Dimensionen zum Farbkanal

\- detail: unterstützt die Zuordnung mehrerer Dimensionen zum Detailkanal

\- tooltip: unterstützt das Zuordnen mehrerer Dimensionen zum Tooltip-Kanal

\- label: unterstützt das Zuordnen mehrerer Dimensionen zum Beschriftungskanal

\- row: unterstützt die Zuordnung mehrerer Dimensionen zum Zeilenkanal

\- column: unterstützt die Zuordnung mehrerer Dimensionen zum Spaltenkanal
:::


## measures

**Type:** `PieMeasure[] | undefined`

:::note{title=Beschreibung}
Kennzahlen

Alle Kennzahlen des Donut-Diagramms werden automatisch zu einer Kennzahl zusammengeführt und dem Radius des Kreisdiagramms zugeordnet. Wenn mehrere Kennzahlen vorhanden sind, werden Kennzahlnamen mit den übrigen Dimensionen zusammengeführt und als Legendeneinträge angezeigt.
:::

**Beispiel**
[{id: 'value', alias: 'Wertanteil', format: 'percent'}]




### id

**Type:** `string`

:::note{title=Beschreibung}
Kennzahl-ID. Darf nicht doppelt vorkommen
:::

### alias

**Type:** `string | undefined`

:::note{title=Beschreibung}
Kennzahl-Alias. Duplikate sind erlaubt. Wenn nicht angegeben, verwendet alias die id
:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Automatische Zahlenformatierung, standardmäßig aktiviert und mit höchster Priorität

Wenn autoFormat=true ist, überschreibt es alle numFormat-Konfigurationen

Wenn aktiviert, wählen Diagrammbeschriftungen und Tooltips anhand von Kennzahlwerten und Locale automatisch ein passendes Format

Formatierungsregeln: Dezimalzahlen mit aktivierter compact notation, mindestens 0 und höchstens 2 Dezimalstellen, automatische Rundung, umgesetzt mit dem Browser-Intl.NumberFormat

Beispiel:

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K
:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Beschreibung}
Benutzerdefinierte Zahlenformatierung für Kennzahlen, automatisch auf label und tooltip angewendet

Hinweis: Um benutzerdefinierte Formatierung zu verwenden, autoFormat=false explizit setzen; andernfalls überschreibt autoFormat diese Konfiguration
:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Zahlenformattyp. Unterstützt Zahl (dezimal), Prozent (%), Promille (‰) und wissenschaftliche Notation
:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Zahlenformatierungsverhältnis. Darf nicht 0 sein
:::

**Beispiel**
\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zahlenformatierungssymbol, z. B. % oder ‰
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
Suffix der Zahlenformatierung
:::

#### prefix

**Type:** `string | undefined`

:::note{title=Beschreibung}
Präfix der Zahlenformatierung
:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Dezimalstellen für Zahlenformatierung, verwendet minimumFractionDigits und maximumFractionDigits aus Browser Intl.NumberFormat. Niedrigere Priorität als significantDigits
:::

**Beispiel**
\- 1234.5678 wird zu 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Signifikante Stellen für Zahlenformatierung, verwendet minimumSignificantDigits und maximumSignificantDigits aus Browser Intl.NumberFormat. Höhere Priorität als fractionDigits
:::

**Beispiel**
\- 1234.5678 wird zu 1000, significantDigits:1
\- 1234.5678 wird zu 1200, significantDigits:2
\- 1234.5678 wird zu 1230, significantDigits:3
\- 1234.5678 wird zu 1234, significantDigits:4
\- 1234.5678 wird zu 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}
Rundungspriorität der Zahlenformatierung, wenn significantDigits und fractionDigits gleichzeitig gesetzt sind; verwendet Browser Intl.NumberFormat mit denselben Regeln wie Intl.NumberFormat roundingPriority
:::

**Beispiel**
\- 1234.5678 wird zu 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 wird zu 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus der Zahlenformatierung; verwendet Browser Intl.NumberFormat mit denselben Regeln wie Intl.NumberFormat roundingMode
:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Zahlenformattyp. Unterstützt Zahl (dezimal), Prozent (%), Promille (‰) und wissenschaftliche Notation
:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Zahlenformatierungsverhältnis. Darf nicht 0 sein
:::

**Beispiel**
\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zahlenformatierungssymbol, z. B. % oder ‰
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
Suffix der Zahlenformatierung
:::

#### prefix

**Type:** `string | undefined`

:::note{title=Beschreibung}
Präfix der Zahlenformatierung
:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Dezimalstellen für Zahlenformatierung, verwendet minimumFractionDigits und maximumFractionDigits aus Browser Intl.NumberFormat. Niedrigere Priorität als significantDigits
:::

**Beispiel**
\- 1234.5678 wird zu 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Signifikante Stellen für Zahlenformatierung, verwendet minimumSignificantDigits und maximumSignificantDigits aus Browser Intl.NumberFormat. Höhere Priorität als fractionDigits
:::

**Beispiel**
\- 1234.5678 wird zu 1000, significantDigits:1
\- 1234.5678 wird zu 1200, significantDigits:2
\- 1234.5678 wird zu 1230, significantDigits:3
\- 1234.5678 wird zu 1234, significantDigits:4
\- 1234.5678 wird zu 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}
Rundungspriorität der Zahlenformatierung, wenn significantDigits und fractionDigits gleichzeitig gesetzt sind; verwendet Browser Intl.NumberFormat mit denselben Regeln wie Intl.NumberFormat roundingPriority
:::

**Beispiel**
\- 1234.5678 wird zu 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 wird zu 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus der Zahlenformatierung; verwendet Browser Intl.NumberFormat mit denselben Regeln wie Intl.NumberFormat roundingMode
:::

### encoding

**Type:** `"color" | "tooltip" | "label" | "angle" | undefined`

:::note{title=Beschreibung}
Kanal, dem die Kennzahl zugeordnet wird

\- angle: Winkel, dem die Kennzahl zugeordnet wird

\- color: Kennzahl wird dem Farbkanal zugeordnet

\- label: Kennzahl, die dem Beschriftungskanal zugeordnet wird

\- tooltip: Kennzahl, die dem Tooltip-Kanal zugeordnet wird
:::

### parentId

**Type:** `string | undefined`

:::note{title=Beschreibung}
In flacher Kennzahlkonfiguration wird eine baumförmige Kennzahlgruppe aufgebaut. parentId verweist auf die id der übergeordneten Kennzahlgruppe und dient zum Aufbau des Kennzahlbaums
:::

:::tip{title=Tip}
Es gibt zwei Formen der Kennzahlbaum-Konfiguration: direkt einen Kennzahlbaum mit children konfigurieren oder eine flache Kennzahlliste mit parentId konfigurieren. Beide Formen können nicht gleichzeitig verwendet werden.
:::


## page

**Type:** `Page | undefined`

:::note{title=Beschreibung}
Paginierungskonfiguration. Gibt den Feldnamen für die Paginierung an; dieser muss eine Dimension sein.
:::


### field

**Type:** `string`

:::note{title=Beschreibung}
Paginierungsfeld; gibt den Feldnamen für die Paginierung an und muss eine Dimension sein
:::

### currentValue

**Type:** `string`

:::note{title=Beschreibung}
Aktueller Paginierungswert; gibt den Wert zur Bestimmung der aktuellen Seite an
:::

**Beispiel**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Beschreibung}
Hintergrundfarbe des Diagramms



Die Hintergrundfarbe kann ein Farbstring sein (z. B. 'red', 'blue') oder ein hex-, rgb- oder rgba-Wert (z. B. '#ff0000', 'rgba(255,0,0,0.5)')
:::


## color

**Type:** `Color | undefined`

:::note{title=Beschreibung}
Farben

Farbkonfiguration zur Definition des Farbschemas des Diagramms, einschließlich Farbliste, Farbzuordnung, Farbverlauf usw.
:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Beschreibung}
Diskretes Farbschema zur Definition der Farben verschiedener Elemente im Diagramm
:::

**Beispiel**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Beschreibung}
Lineares Farbverlaufsschema zur Definition der Farben verschiedener Elemente im Diagramm
:::

**Beispiel**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Beschreibung}
Farbzuordnung, ordnet Datenwerte konkreten Farben zu
:::

**Beispiel**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Positiv/Negativ-Farbkonfiguration; definiert die Farbe positiver Werte im Diagramm
:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Positiv/Negativ-Farbkonfiguration; definiert die Farbe negativer Werte im Diagramm
:::


## label

**Type:** `PieLabel | undefined`

:::note{title=Beschreibung}
Beschriftung

Beschriftungskonfiguration zum Definieren der Datenbeschriftungen des Diagramms, einschließlich Position, Format und Stil.
:::


### enable

**Type:** `false | true`

:::note{title=Beschreibung}
Ob Beschriftungen aktiviert sind
:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen umbrochen werden
:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen Kennzahlwerte anzeigen

In Szenarien mit mehreren Kennzahlen besteht kein Risiko widersprüchlicher Werte, da alle zeichnungsbezogenen Kennzahlen durch `foldMeasures` verarbeitet und zu einer Kennzahl zusammengeführt werden, die einen Datenpunkt repräsentiert.

Hinweis: encoding.label hat höhere Priorität; diese Konfiguration beeinflusst encoding.label nicht
:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen Kennzahlwerte als Prozentsatz anzeigen

In Szenarien mit mehreren Kennzahlen besteht kein Risiko widersprüchlicher Werte, da alle zeichnungsbezogenen Kennzahlen durch `foldMeasures` verarbeitet und zu einer Kennzahl zusammengeführt werden, die einen Datenpunkt repräsentiert.

Hinweis: encoding.label hat höhere Priorität; diese Konfiguration beeinflusst encoding.label nicht
:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen Dimensionslabels anzeigen

Zeigt alle Dimensionslabels an

Hinweis: encoding.label hat höhere Priorität; diese Konfiguration beeinflusst encoding.label nicht
:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Beschriftungswerte automatisch formatiert werden. Wenn autoFormat true ist, wird numFormat ignoriert
:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Beschreibung}
Formatierungskonfiguration für Beschriftungswerte. Sie wird mit `format` in `measure` zusammengeführt; `format` in `measure` hat höhere Priorität. numFormat hat niedrigere Priorität als autoFormat
:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Zahlenformattyp. Unterstützt Zahl (dezimal), Prozent (%), Promille (‰) und wissenschaftliche Notation
:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Zahlenformatierungsverhältnis. Darf nicht 0 sein
:::

**Beispiel**
\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zahlenformatierungssymbol, z. B. % oder ‰
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
Suffix der Zahlenformatierung
:::

#### prefix

**Type:** `string | undefined`

:::note{title=Beschreibung}
Präfix der Zahlenformatierung
:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Dezimalstellen für Zahlenformatierung, verwendet minimumFractionDigits und maximumFractionDigits aus Browser Intl.NumberFormat. Niedrigere Priorität als significantDigits
:::

**Beispiel**
\- 1234.5678 wird zu 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Signifikante Stellen für Zahlenformatierung, verwendet minimumSignificantDigits und maximumSignificantDigits aus Browser Intl.NumberFormat. Höhere Priorität als fractionDigits
:::

**Beispiel**
\- 1234.5678 wird zu 1000, significantDigits:1
\- 1234.5678 wird zu 1200, significantDigits:2
\- 1234.5678 wird zu 1230, significantDigits:3
\- 1234.5678 wird zu 1234, significantDigits:4
\- 1234.5678 wird zu 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}
Rundungspriorität der Zahlenformatierung, wenn significantDigits und fractionDigits gleichzeitig gesetzt sind; verwendet Browser Intl.NumberFormat mit denselben Regeln wie Intl.NumberFormat roundingPriority
:::

**Beispiel**
\- 1234.5678 wird zu 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 wird zu 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus der Zahlenformatierung; verwendet Browser Intl.NumberFormat mit denselben Regeln wie Intl.NumberFormat roundingMode
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
Hintergrundfarbe der Beschriftung
:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Beschreibung}
Strichfarbe der Beschriftung
:::

### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Schriftfarbe der Beschriftung
:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Schriftfarbe der Beschriftung automatisch anhand der Markierungsfarbe invertiert wird
:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Beschreibung}
Position der Beschriftung
:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Beschriftungsüberlappungen vermieden werden
:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
Beschriftungsfilter. Standardmäßig ist die Bedingungsverknüpfung zwischen selectors OR
:::


#### field

**Type:** `string`

:::note{title=Beschreibung}
Dimensionsfeld, die id eines Eintrags in dimensions
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

\- in: wählt Datenpunkte aus, deren Dimensionsfeldwert in value enthalten ist

\- not in: wählt Datenpunkte aus, deren Dimensionsfeldwert nicht in value enthalten ist
:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

\- in: wählt Datenpunkte aus, deren Dimensionsfeldwert in value enthalten ist

\- not in: wählt Datenpunkte aus, deren Dimensionsfeldwert nicht in value enthalten ist

identisch mit operator
:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wählt Werte des Dimensionsfelds in Datenpunkten aus. Arrays werden unterstützt
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}
Dynamischer Filter (Ausführung von KI-generiertem Code)

Implementiert komplexe Datenfilterlogik durch KI-generierten JavaScript-Code

Kernfunktionen:

\- Unterstützt beliebig komplexe Datenfilterbedingungen

\- Verwendet eingebaute Hilfsfunktionen für Datenoperationen

\- Wird sicher in der Browserumgebung ausgeführt (Web-Worker-Sandbox)

Umgebungsanforderung: nur in Browserumgebungen unterstützt; Node.js-Umgebungen verwenden fallback

Hinweis: selector und dynamicFilter können nicht gleichzeitig verwendet werden. dynamicFilter hat höhere Priorität

Dynamische Filterkonfiguration für Diagramme

Filtert Diagramm-Markierungen (Balken, Punkte usw.) mit KI-generiertem JavaScript-Code
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}
Beschreibung der Filteranforderung des Benutzers (natürliche Sprache)
:::

**Beispiel**
"Spalten hervorheben, deren Umsatz größer als 1000 ist"

"Spalte mit der höchsten Gewinnmarge je Region hervorheben"



#### code

**Type:** `string`

:::note{title=Beschreibung}
AI-generierter JavaScript-Filtercode

\- Es dürfen nur eingebaute Hilfsfunktionen verwendet werden (Zugriff über _ oder R)

\- Eingabeparameter: data (Array), jedes item enthält das Feld __row_index als Zeilennummer

\- Muss ein Array aus Zeilenindex- und Feldkombinationen zurückgeben: Array<{ __row_index: number, field: string }>

\- __row_index ist die Zeilennummer des ursprünglichen Datenpunkts, field ist das hervorzuhebende Feld

\- Verboten: eval, Function, asynchrone Operationen, DOM-APIs, Netzwerkanfragen
:::

**Beispiel**
Das Feld sales von Datenzeilen hervorheben, deren Umsatz größer als 1000 ist
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Datenzeile mit der höchsten Gewinnmarge je Region hervorheben
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

Datenzeilen hervorheben, die mehrere Filterbedingungen erfüllen
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
Fallback, wenn Codeausführung fehlschlägt oder die Umgebung nicht unterstützt wird
:::


##### field

**Type:** `string`

:::note{title=Beschreibung}
Dimensionsfeld, die id eines Eintrags in dimensions
:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

\- in: wählt Datenpunkte aus, deren Dimensionsfeldwert in value enthalten ist

\- not in: wählt Datenpunkte aus, deren Dimensionsfeldwert nicht in value enthalten ist
:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

\- in: wählt Datenpunkte aus, deren Dimensionsfeldwert in value enthalten ist

\- not in: wählt Datenpunkte aus, deren Dimensionsfeldwert nicht in value enthalten ist

identisch mit operator
:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wählt Werte des Dimensionsfelds in Datenpunkten aus. Arrays werden unterstützt
:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Beschreibung}
Ausführungsergebnis des dynamischen Filters (Laufzeitfeld)

Wird in prepare() geschrieben und ist zur Laufzeit schreibgeschützt
:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### labelLayout

**Type:** `"arc" | "labelLine" | "edge" | undefined`

:::note{title=Beschreibung}
Layoutmodus der Beschriftungen; gilt nur für Kreis- und Donut-Diagramme und nur wenn `labelPosition` auf `outside` gesetzt ist

\- arc: Beschriftungen entlang des Bogens anordnen

\- labelLine: Beschriftungen beidseitig ausrichten und Sektor-Markierung sowie Beschriftung über Führungslinien verbinden

\- edge: Beschriftungen beidseitig ausrichten, Sektor-Markierung und Beschriftung über Führungslinien verbinden und nahe an die beiden Diagrammränder setzen
:::


## legend

**Type:** `Legend | undefined`

:::note{title=Beschreibung}
Legende

Legendenkonfiguration zum Definieren der Diagrammlegende, einschließlich Position, Format und Stil.
:::


### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Legende aktiviert ist
:::

**Beispiel**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob der Legendenrahmen aktiviert ist
:::

:::warning{title=Warning}
Gilt nur für diskrete Legenden
:::

**Beispiel**
border: true



### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Schriftfarbe der Legende
:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe des Pager-Icons
:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe des deaktivierten Pager-Icons
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
Schriftfarbe der Legende
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
Gilt nur für diskrete Legenden
:::

**Beispiel**
shapeType: 'circle'



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
Maximale Spalten- oder Zeilenzahl bei vielen Legendeneinträgen

Wenn position horizontal ist (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), steuert maxSize die Anzahl der angezeigten Spalten

Wenn position vertikal ist (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), steuert maxSize die Anzahl der angezeigten Zeilen
:::

:::warning{title=Warning}
Gilt nur für diskrete Legenden
:::

**Beispiel**
maxSize: 2




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Beschreibung}
Tooltip

Tooltip-Konfiguration zum Definieren der Diagramm-Tooltips, einschließlich Position, Format und Stil.
:::


### enable

**Type:** `false | true`

:::note{title=Beschreibung}
Ob Tooltip-Informationen aktiviert sind
:::


## brush

**Type:** `Brush | undefined`

:::note{title=Beschreibung}
Brush-Auswahl

Brush-Konfiguration zum Aktivieren oder Deaktivieren der Brush-Auswahl.

Diagrammkonfiguration für Brush-Auswahl
:::


### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Brush-Auswahl aktiviert ist
:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Beschreibung}
Brush-Typ

Definiert Form und Richtung der Brush-Auswahl.

\- `rect`: rechteckige Brush-Auswahl, wählt gleichzeitig in X- und Y-Richtung aus

\- `polygon`: polygonale Brush-Auswahl, zeichnet durch Klicken mehrerer Punkte ein beliebiges Polygon

\- `x`: Brush-Auswahl in X-Achsenrichtung, nur in X-Richtung; Y-Richtung bleibt uneingeschränkt

\- `y`: Brush-Auswahl in Y-Achsenrichtung, nur in Y-Richtung; X-Richtung bleibt uneingeschränkt
:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Beschreibung}
Brush-Modus, Einzel- oder Mehrfachauswahl

Definiert den Auswahlmodus.

\- `single`: Einzelauswahlmodus; jeweils nur ein Brush-Bereich

\- `multiple`: Mehrfachauswahlmodus; mehrere Brush-Bereiche können gleichzeitig bestehen
:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob der Brush-Bereich nach dem Ende der Auswahl gelöscht wird
:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Beschreibung}
Stil für Daten innerhalb des Brush-Bereichs

Definiert den Stil ausgewählter Datenpunkte
:::


#### opacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
Deckkraft

Deckkraft ausgewählter Datenpunkte, Wertebereich 0 bis 1
:::

#### stroke

**Type:** `string | undefined`

:::note{title=Beschreibung}
Strichfarbe
:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Strichbreite
:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Beschreibung}
Stil für Daten außerhalb des Brush-Bereichs

Definiert den Stil nicht ausgewählter Datenpunkte
:::


#### opacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
Deckkraft

Deckkraft nicht ausgewählter Datenpunkte, Wertebereich 0 bis 1
:::

#### stroke

**Type:** `string | undefined`

:::note{title=Beschreibung}
Strichfarbe
:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Strichbreite
:::


## animation

**Type:** `PieLikeAnimation | undefined`

:::note{title=Beschreibung}
Animationskonfiguration

Diagramm-Animationskonfiguration; verfügbare Effekte sind durch den Diagrammtyp eingeschränkt
:::


### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Animationen für Kreis-/Donut-/Rose-Diagramme aktiviert werden
:::

### params

**Type:** `PieLikeAnimationParams | undefined`

:::note{title=Beschreibung}
Animationsparameter für Kreis-/Donut-/Rose-Diagramme
:::


#### appear

**Type:** `PieLikeAppearAnimation | undefined`

:::note{title=Beschreibung}
Konfiguration der Eingangsanimation für Kreis-/Donut-/Rose-Diagramme
:::


##### effects

**Type:** `("radial" | "scale")[] | undefined`

:::note{title=Beschreibung}
Eingangseffekte für Kreis-/Donut-/Rose-Diagramme; unterstützt radiale und Skalierungsanimationen
:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die aktuelle Animationsphase aktiviert ist
:::

##### ease

**Type:** `string | undefined`

:::note{title=Beschreibung}
Animation-Easing-Funktion
:::

##### duration

**Type:** `number | undefined`

:::note{title=Beschreibung}
Animationsdauer in Millisekunden
:::

##### color

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hervorhebungs- oder Atmosphärenfarbe der Animation
:::

#### update

**Type:** `PieLikeUpdateAnimation | undefined`

:::note{title=Beschreibung}
Konfiguration der Aktualisierungsanimation für Kreis-/Donut-/Rose-Diagramme
:::


##### effects

**Type:** `"radial"[] | undefined`

:::note{title=Beschreibung}
Aktualisierungseffekt für Kreis-/Donut-/Rose-Diagramme; unterstützt radiale Animation
:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die aktuelle Animationsphase aktiviert ist
:::

##### ease

**Type:** `string | undefined`

:::note{title=Beschreibung}
Animation-Easing-Funktion
:::

##### duration

**Type:** `number | undefined`

:::note{title=Beschreibung}
Animationsdauer in Millisekunden
:::

##### color

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hervorhebungs- oder Atmosphärenfarbe der Animation
:::

#### loop

**Type:** `PieLikeAnimationLoop | undefined`

:::note{title=Beschreibung}
Konfiguration der Schleifenanimation für Kreis-/Donut-/Rose-Diagramme
:::


##### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Loop-Animation aktiviert ist
:::

##### interval

**Type:** `number | undefined`

:::note{title=Beschreibung}
Loop-Animationsintervall in Millisekunden
:::

##### loop

**Type:** `PieLikeLoopAnimation | undefined`

:::note{title=Beschreibung}
Konfiguration der Schleifenanimation für Kreis-/Donut-/Rose-Diagramme
:::


###### effects

**Type:** `PieLikeLoopEffect[] | undefined`

:::note{title=Beschreibung}
Schleifeneffekt für Kreis-/Donut-/Rose-Diagramme
:::

###### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die aktuelle Animationsphase aktiviert ist
:::

###### ease

**Type:** `string | undefined`

:::note{title=Beschreibung}
Animation-Easing-Funktion
:::

###### duration

**Type:** `number | undefined`

:::note{title=Beschreibung}
Animationsdauer in Millisekunden
:::

###### color

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hervorhebungs- oder Atmosphärenfarbe der Animation
:::

##### atmosphere

**Type:** `NoEffectAtmosphereConfig | undefined`

:::note{title=Beschreibung}
Konfiguration der Atmosphäre-Animation für Kreis-/Donut-/Rose-Diagramme
:::


###### ease

**Type:** `string | undefined`

:::note{title=Beschreibung}
Easing-Funktion der Atmosphärenanimation
:::

###### color

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe der Atmosphärenanimation
:::


## theme

**Type:** `Theme | undefined`

:::note{title=Beschreibung}
Diagrammthema. Das Thema ist eine Funktionskonfiguration mit niedrigerer Priorität und enthält gemeinsame Konfigurationen für alle Diagrammtypen sowie gemeinsame Konfigurationen für einzelne Diagrammtypen

Eingebaut sind die Themen light und dark. Benutzer können Themen über Builder anpassen

Thema

Eingebaut sind light und dark. Neue Themen können über registerTheme angepasst werden.
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
Sprache

Sprachkonfiguration des Diagramms. Unterstützt 'zh-CN' und 'en-US'; alternativ kann intl.setLocale('zh-CN') verwendet werden
:::
