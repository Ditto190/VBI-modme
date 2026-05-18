# Sankey

:::info{title=Encoding-Zuordnung}
Das Sankey-Diagramm unterstützt die folgenden visuellen Kanäle:

`source`: Quellkanal, unterstützt `mehrere Dimensionen`

`target`: Zielkanal, unterstützt `mehrere Dimensionen`

`color`: Farbkanal, unterstützt `mehrere Dimensionen`

`size`: Größenkanal, unterstützt `eine Kennzahl`

`label`: Label-Kanal, unterstützt `mehrere Dimensionen` und `mehrere Kennzahlen`

`tooltip`: Tooltip-Kanal, unterstützt `mehrere Dimensionen` und `mehrere Kennzahlen`

:::

:::note{title=Beschreibung}
Ein Sankey-Diagramm zeigt Flussbeziehungen von source zu target; die Breite der Verbindung stellt die Flussgröße dar

Geeignete Szenarien:

\- Darstellung von Flussbeziehungen in einer regulären node-link-Struktur

\- Darstellung von Pfadübergängen nach dem Zusammenfügen mehrerer source-Dimensionen und mehrerer target-Dimensionen

:::

:::warning{title=Warning}
Datenanforderungen:

\- Mindestens 1 source-Dimension oder Standarddimension, die source zugeordnet werden kann

\- Mindestens 1 target-Dimension

\- Mindestens 1 numerisches Feld (Kennzahl) zur Abbildung der Flussgröße

\- Die advanced pipeline muss tidyData in eine reguläre source / target / value-Struktur umwandeln, die sankey verarbeiten kann

:::


## chartType

**Type:** `"sankey"`

:::note{title=Beschreibung}
Sankey-Diagramm



Sankey-Diagramm, zeigt reguläre source-target-Flussbeziehungen und Flussgrößen

:::

**Beispiel**
'sankey'




## dataset

**Type:** `Record[]`

:::note{title=Beschreibung}
Datensatz

Ein bereits aggregierter Datensatz gemäß TidyData-Spezifikation, der Datenquelle und Struktur des Diagramms definiert

:::

**Beispiel**
[{fromRegion: 'Nordchina', toRegion: 'Ostchina', value: 30}]




## dimensions

**Type:** `SankeyDimension[] | undefined`

:::note{title=Beschreibung}
Dimensionen

Dimensionskonfiguration zur Definition der source / target-Knotenstruktur; unterstützt die Kanäle source / target / color / detail / label / tooltip / row / column

:::

**Beispiel**
[{id: 'fromRegion', alias: 'Quellregion'}, {id: 'toRegion', alias: 'Zielregion', encoding: 'target'}]




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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "source" | "target" | undefined`

:::note{title=Beschreibung}
Kanal, dem die Dimension zugeordnet wird

\- source: unterstützt das Zuordnen mehrerer Dimensionen zum source-Kanal; in der advanced-Phase werden sie zu einem Upstream-Knotenpfad zusammengefügt

\- target: unterstützt das Zuordnen mehrerer Dimensionen zum target-Kanal; in der advanced-Phase werden sie zu einem Downstream-Knotenpfad zusammengefügt

\- color: unterstützt das Zuordnen mehrerer Dimensionen zum Farbkanal, um den Farbkategorieschlüssel für sankey zu erzeugen

\- detail: unterstützt das Zuordnen mehrerer Dimensionen zum Detailkanal

\- label: unterstützt das Zuordnen mehrerer Dimensionen zum Beschriftungskanal

\- tooltip: unterstützt das Zuordnen mehrerer Dimensionen zum Tooltip-Kanal

\- row: unterstützt das Zuordnen mehrerer Dimensionen zum Zeilenkanal, verwendet für Pivot-Diagramme

\- column: unterstützt das Zuordnen mehrerer Dimensionen zum Spaltenkanal, verwendet für Pivot-Diagramme

:::


## measures

**Type:** `SankeyMeasure[] | undefined`

:::note{title=Beschreibung}
Kennzahlen



Kennzahlkonfiguration zur Definition der Flussgröße; unterstützt die Kanäle size / detail / label / tooltip

:::

**Beispiel**
[{id: 'sales', alias: 'Umsatz'}]




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
\- 100000 wird zu 10万, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zahlenformatierungssymbol, z. B. % oder ‰
:::

**Beispiel**
\- 100000 wird zu 10万, ratio:10000, symbol:"万"
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
\- 1234.5678 wird zu 1235 konvertiert, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.6 konvertiert, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.57 konvertiert, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1230.568 konvertiert, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.5678 konvertiert, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.56780 konvertiert, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Signifikante Stellen für Zahlenformatierung, verwendet minimumSignificantDigits und maximumSignificantDigits aus Browser Intl.NumberFormat. Höhere Priorität als fractionDigits
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
Rundungspriorität der Zahlenformatierung, wenn significantDigits und fractionDigits gleichzeitig gesetzt sind; verwendet Browser Intl.NumberFormat mit denselben Regeln wie Intl.NumberFormat roundingPriority
:::

**Beispiel**
\- 1234.5678 wird zu 1230 konvertiert, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:3 (roundingPriority:morePrecision)



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
\- 100000 wird zu 10万, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zahlenformatierungssymbol, z. B. % oder ‰
:::

**Beispiel**
\- 100000 wird zu 10万, ratio:10000, symbol:"万"
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
\- 1234.5678 wird zu 1235 konvertiert, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.6 konvertiert, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.57 konvertiert, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1230.568 konvertiert, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.5678 konvertiert, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.56780 konvertiert, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Signifikante Stellen für Zahlenformatierung, verwendet minimumSignificantDigits und maximumSignificantDigits aus Browser Intl.NumberFormat. Höhere Priorität als fractionDigits
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
Rundungspriorität der Zahlenformatierung, wenn significantDigits und fractionDigits gleichzeitig gesetzt sind; verwendet Browser Intl.NumberFormat mit denselben Regeln wie Intl.NumberFormat roundingPriority
:::

**Beispiel**
\- 1234.5678 wird zu 1230 konvertiert, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus der Zahlenformatierung; verwendet Browser Intl.NumberFormat mit denselben Regeln wie Intl.NumberFormat roundingMode
:::

### encoding

**Type:** `"detail" | "tooltip" | "label" | "size" | undefined`

:::note{title=Beschreibung}
Kanal, dem die Kennzahl zugeordnet wird

\- size: Kennzahl, die dem Kanal für Kantenbreite / Flussgröße zugeordnet wird

\- detail: Kennzahl, die dem Detailkanal zugeordnet wird

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




Legt den Feldnamen für die Paginierung fest; muss eine Dimension sein

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




Die Hintergrundfarbe kann eine Farbzeichenfolge wie 'red' oder 'blue' sein, aber auch hex, rgb oder rgba, z. B. '#ff0000' oder 'rgba(255,0,0,0.5)'

:::


## color

**Type:** `Color | undefined`

:::note{title=Beschreibung}
Farbe



Farbkonfiguration zur Definition des Farbschemas des Diagramms, einschließlich Farbliste, Farbzuordnung, Farbverläufen usw.

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

**Type:** `Label | undefined`

:::note{title=Beschreibung}
Beschriftungskonfiguration für Diagramm-Datenbeschriftungen, einschließlich Position, Format und Stil.



Beschriftungskonfiguration zur Definition der Datenlabels des Diagramms, einschließlich Position, Format, Stil usw.

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
\- 100000 wird zu 10万, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"




#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zahlenformatierungssymbol, z. B. % oder ‰
:::

**Beispiel**
\- 100000 wird zu 10万, ratio:10000, symbol:"万"
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
\- 1234.5678 wird zu 1234.6 konvertiert, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.57 konvertiert, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1230.568 konvertiert, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.5678 konvertiert, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.56780 konvertiert, fractionDigits:5 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Signifikante Stellen für Zahlenformatierung, verwendet minimumSignificantDigits und maximumSignificantDigits aus Browser Intl.NumberFormat. Höhere Priorität als fractionDigits
:::

**Beispiel**
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
Rundungspriorität der Zahlenformatierung, wenn significantDigits und fractionDigits gleichzeitig gesetzt sind; verwendet Browser Intl.NumberFormat mit denselben Regeln wie Intl.NumberFormat roundingPriority
:::

**Beispiel**
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:3 (roundingPriority:morePrecision)




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
Dynamischer Filter (Ausführung von AI-generiertem Code)

Implementiert komplexe Datenfilterlogik durch AI-generierten JavaScript-Code

Kernfunktionen:

\- Unterstützt beliebig komplexe Datenfilterbedingungen

\- Verwendet eingebaute Hilfsfunktionen für Datenoperationen

\- Sichere Ausführung im Browser (Web-Worker-Sandbox)

Umgebungsanforderung: nur in Browserumgebungen unterstützt; Node.js-Umgebungen verwenden fallback

Hinweis: selector und dynamicFilter können nicht gleichzeitig verwendet werden. dynamicFilter hat höhere Priorität

Dynamische Filterkonfiguration für Diagramme

Filtert Diagramm-Markierungen (Balken, Punkte usw.) mit AI-generiertem JavaScript-Code
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}
Beschreibung der Filteranforderung des Benutzers (natürliche Sprache)
:::

**Beispiel**
"Balken mit Umsatz über 1000 hervorheben"

"Balken mit der höchsten Gewinnmarge je Region hervorheben"



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
Das Feld sales für Dateneinträge mit sales über 1000 hervorheben
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Dateneinträge mit der höchsten Gewinnmarge je Region hervorheben
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

Dateneinträge mit mehreren Filterbedingungen hervorheben
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


## legend

**Type:** `Legend | undefined`

:::note{title=Beschreibung}




Legendenkonfiguration zur Definition von Anzeige, Position und Stil der Farblegende des Sankey-Diagramms

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
Nur für diskrete Legenden wirksam
:::

**Beispiel**




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




### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Beschreibung}
Legendenform
:::

:::warning{title=Warning}
Nur für diskrete Legenden wirksam
:::

**Beispiel**




### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Beschreibung}
Legendenposition
:::

**Beispiel**




### maxSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Maximale Spalten- oder Zeilenzahl bei vielen Legendeneinträgen

Wenn position horizontal ist (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), steuert maxSize die Anzahl der angezeigten Spalten

Wenn position vertikal ist (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), steuert maxSize die Anzahl der angezeigten Zeilen
:::

:::warning{title=Warning}
Nur für diskrete Legenden wirksam
:::

**Beispiel**





## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Beschreibung}




Tooltip-Konfiguration zur Definition der Tooltip-Informationen des Diagramms, einschließlich Inhalt, Format, Stil usw.

:::


### enable

**Type:** `false | true`

:::note{title=Beschreibung}
Ob Tooltip-Informationen aktiviert sind
:::


## theme

**Type:** `Theme | undefined`

:::note{title=Beschreibung}
Diagrammthema



Thema



Zwei integrierte Themen stehen bereit: light und dark; neue Themen können über registerTheme angepasst werden.
:::


### length

**Type:** `number`

### brand

**Type:** `brand`


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Beschreibung}
Sprache



Sprachkonfiguration des Diagramms; unterstützt 'zh\-CN' und 'en\-US'

:::
