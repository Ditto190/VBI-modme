# RaceBar

:::note{title=Beschreibung}
Dynamisches Balkendiagramm (Race Bar Chart)

Geeignet zur Darstellung von Rangänderungen von Daten im Zeitverlauf

:::


## chartType

**Type:** `"raceBar"`

:::note{title=Beschreibung}
Dynamisches Balkendiagramm, geeignet zur Darstellung von Rangänderungen von Daten im Zeitverlauf

:::


## dataset

**Type:** `Record[]`

:::note{title=Beschreibung}
Datenquelle

:::


## dimensions

**Type:** `RaceBarDimension[] | undefined`

:::note{title=Beschreibung}
Die erste Dimension wird der X-Achse zugeordnet; die verbleibenden Dimensionen werden mit Kennzahlnamen (wenn mehrere Kennzahlen vorhanden sind) zusammengeführt und als Legendeneinträge angezeigt.

:::


### id

**Type:** `string`

:::note{title=Beschreibung}
Feld-ID, die der Dimension entspricht

:::

### alias

**Type:** `string | undefined`

:::note{title=Beschreibung}
Dimensionsalias

:::

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=Beschreibung}
Datumsformatkonfiguration der Dimension

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=Beschreibung}
Zeitgranularitat, bestimmt die Genauigkeit der Datumsanzeige

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "yAxis" | "player" | undefined`

:::note{title=Beschreibung}
Kanal, dem die Dimension zugeordnet wird

\- player: unterstützt das Zuordnen mehrerer Dimensionen zum Wiedergabekanal

\- yAxis: unterstützt die Zuordnung mehrerer Dimensionen zur Y-Achse

\- color: unterstützt die Zuordnung mehrerer Dimensionen zum Farbkanal

\- detail: unterstützt die Zuordnung mehrerer Dimensionen zum Detailkanal

\- tooltip: unterstützt die Zuordnung mehrerer Dimensionen zum Tooltip-Kanal

\- label: unterstützt die Zuordnung mehrerer Dimensionen zum Beschriftungskanal

\- row: unterstützt die Zuordnung mehrerer Dimensionen zum Zeilenkanal

\- column: unterstützt die Zuordnung mehrerer Dimensionen zum Spaltenkanal

:::


## measures

**Type:** `RaceBarMeasure[] | undefined`

:::note{title=Beschreibung}
Kennzahlen

:::


### id

**Type:** `string`

:::note{title=Beschreibung}
Kennzahl-ID, muss eindeutig sein

:::

### alias

**Type:** `string | undefined`

:::note{title=Beschreibung}
Alias der Kennzahl, Duplikate sind zulässig; wenn nicht gesetzt, wird die ID als Alias verwendet

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Automatische Zahlenformatierung, standardmassig aktiviert, mit hochster Prioritat

Wenn autoFormat=true ist, werden alle numFormat-Konfigurationen überschrieben.

Nach der Aktivierung wahlen Datenbeschriftungen und Tooltips des Diagramms automatisch ein passendes Format basierend auf Kennzahlwerten und Locale.

Formatierungsregeln: Dezimalzahlen, kompakte Schreibweise aktiviert, mindestens 0 und hochstens 2 Dezimalstellen, automatische Rundung, Umsetzung uber Intl.NumberFormat des Browsers.

Zum Beispiel:

\- locale=zh-CN: 749740.264 → 74.45~74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Beschreibung}
Benutzerdefinierte Zahlenformatierung fur Kennzahlen; wird automatisch auf Beschriftungen und Tooltips angewendet.

Hinweis: Um benutzerdefinierte Formatierung zu verwenden, muss autoFormat explizit auf false gesetzt werden; andernfalls uberschreibt autoFormat diese Konfiguration.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Zahlenformattyp, unterstutzt: decimal, percent (%), permille (‰), wissenschaftliche Notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Verhältnis der Zahlenformatierung, darf nicht 0 sein

:::

**Beispiel**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zahlenformatsymbol, z. B. %, ‰

:::

**Beispiel**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Tausendertrennzeichen fur Zahlenformatierung

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
Dezimalstellen fur die Zahlenformatierung, verwendet minimumFractionDigits und maximumFractionDigits von Intl.NumberFormat des Browsers; niedrigere Prioritat als significantDigits.

:::

**Beispiel**
\- 1234.5678 converted to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Signifikante Stellen fur die Zahlenformatierung, verwendet minimumSignificantDigits und maximumSignificantDigits von Intl.NumberFormat des Browsers; hohere Prioritat als fractionDigits.

:::

**Beispiel**
\- 1234.5678 converted to 1000, significantDigits:1
\- 1234.5678 converted to 1200, significantDigits:2
\- 1234.5678 converted to 1230, significantDigits:3
\- 1234.5678 converted to 1234, significantDigits:4
\- 1234.5678 converted to 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}
Rundungsprioritat, wenn sowohl significantDigits als auch fractionDigits gesetzt sind; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie roundingPriority von Intl.NumberFormat.

:::

**Beispiel**
\- 1234.5678 converted to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converted to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus fur die Zahlenformatierung, verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie roundingMode von Intl.NumberFormat.

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Zahlenformattyp, unterstutzt: decimal, percent (%), permille (‰), wissenschaftliche Notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Verhältnis der Zahlenformatierung, darf nicht 0 sein

:::

**Beispiel**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zahlenformatsymbol, z. B. %, ‰

:::

**Beispiel**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Tausendertrennzeichen fur Zahlenformatierung

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
Dezimalstellen fur die Zahlenformatierung, verwendet minimumFractionDigits und maximumFractionDigits von Intl.NumberFormat des Browsers; niedrigere Prioritat als significantDigits.

:::

**Beispiel**
\- 1234.5678 converted to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Signifikante Stellen fur die Zahlenformatierung, verwendet minimumSignificantDigits und maximumSignificantDigits von Intl.NumberFormat des Browsers; hohere Prioritat als fractionDigits.

:::

**Beispiel**
\- 1234.5678 converted to 1000, significantDigits:1
\- 1234.5678 converted to 1200, significantDigits:2
\- 1234.5678 converted to 1230, significantDigits:3
\- 1234.5678 converted to 1234, significantDigits:4
\- 1234.5678 converted to 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}
Rundungsprioritat, wenn sowohl significantDigits als auch fractionDigits gesetzt sind; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie roundingPriority von Intl.NumberFormat.

:::

**Beispiel**
\- 1234.5678 converted to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converted to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus fur die Zahlenformatierung, verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie roundingMode von Intl.NumberFormat.

:::

### encoding

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | undefined`

:::note{title=Beschreibung}
Kanal, dem die Kennzahl zugeordnet wird

\- xAxis: Measure mapped to the X-axis

\- detail: Measure mapped to the detail channel

\- color: Measure mapped to the color channel

\- label: Measure mapped to the label channel

\- tooltip: Measure mapped to the tooltip channel

:::

### parentId

**Type:** `string | undefined`

:::note{title=Beschreibung}
Erstellt eine baumformige Kennzahlgruppe in flacher Kennzahlkonfiguration. parentId verweist auf die ID der ubergeordneten Kennzahlgruppe und dient zum Aufbau des Kennzahlbaums.

:::

:::tip{title=Tip}
Es gibt zwei Moglichkeiten, den Kennzahlbaum zu konfigurieren: Option 1 konfiguriert direkt einen Kennzahlbaum mit children; Option 2 konfiguriert eine flache Kennzahlliste mit parentId. Beide Methoden konnen nicht gleichzeitig verwendet werden.

:::


## player

**Type:** `Player | undefined`

:::note{title=Beschreibung}
Player-Konfiguration zur Angabe der Zeitdimension; Kernkonfiguration des dynamischen Balkendiagramms



Player-Konfiguration zur Angabe des abzuspielenden Feldnamens; muss eine Dimension sein

:::

:::warning{title=Warning}
Diese Funktion unterstützt keine Diagrammtypen wie table, pivotTable, dualAxis, histogram, boxPlot usw. und kann nicht bei aktivierter Kennzahlenkombination oder Zeilen-/Spalten-Pivot verwendet werden

:::


### maxCount

**Type:** `number | false | undefined`

:::note{title=Beschreibung}
Maximale Wiedergabeanzahl; Daten oberhalb dieser Anzahl werden abgeschnitten. false bedeutet keine Begrenzung

:::

### interval

**Type:** `number | undefined`

:::note{title=Beschreibung}
Wiedergabeintervall, Einheit ms

:::

### autoPlay

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob automatisch abgespielt wird

:::

### loop

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Wiedergabe in Schleife erfolgt

:::

### position

**Type:** `"left" | "top" | "right" | "bottom" | undefined`

:::note{title=Beschreibung}
Player-Position

:::

### railColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Spurfarbe der Player-Fortschrittsleiste

:::

### fontFamily

**Type:** `string | undefined`

:::note{title=Beschreibung}
Player-Textschriftart

:::

### fontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Player-Textschriftgröße

:::

### trackColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Fortschrittsfarbe der Player-Fortschrittsleiste

:::

### sliderHandleColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Sliderfarbe der Player-Fortschrittsleiste

:::

### sliderHandleBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Rahmenfarbe des Sliders der Player-Fortschrittsleiste

:::

### startButtonColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe der Starttaste des Players

:::

### pauseButtonColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe der Pausentaste des Players

:::

### backwardButtonColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe der Zurück-Taste des Players

:::

### forwardButtonColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe der Vorwärts-Taste des Players

:::


## sort

**Type:** `Sort | undefined`

:::note{title=Beschreibung}
Sortierkonfiguration; dynamische Balkendiagramme müssen normalerweise dynamisch nach Werten sortieren





:::

**Beispiel**
Hinweis: selector und dynamicFilter konnen nicht gleichzeitig verwendet werden; dynamicFilter hat hohere Prioritat.

Konfiguration des dynamischen Diagrammfilters.





### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Beschreibung}

:::

**Beispiel**
Beschreibung der Filteranforderung des Benutzers (natürliche Sprache).



### orderBy

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**





### customOrder

**Type:** `string[] | undefined`

:::note{title=Beschreibung}
\- `__row_index` steht fur die Zeilennummer des ursprunglichen Datenelements, `field` fur das hervorzuhebende Feld.

:::


## page

**Type:** `Page | undefined`

:::note{title=Beschreibung}


:::


### field

**Type:** `string`

:::note{title=Beschreibung}
Paginierungsfeld; legt den Feldnamen für die Paginierung fest und muss eine Dimension sein.

:::

### currentValue

**Type:** `string`

:::note{title=Beschreibung}
Aktueller Paginierungswert; legt den Wert fest, mit dem die aktuelle Seite bestimmt wird.

:::

**Beispiel**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Beschreibung}
Hintergrundfarbe

:::


## color

**Type:** `Color | undefined`

:::note{title=Beschreibung}
Farbkonfiguration

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
Lineares Verlaufsfarbschema zur Definition der Farben verschiedener Elemente im Diagramm.

:::

**Beispiel**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Beschreibung}
Farbzuordnung, mit der Datenwerte bestimmten Farben zugeordnet werden.

:::

**Beispiel**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Positiv/Negativ-Farbkonfiguration; definiert die Farbe für positive Werte im Diagramm.

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Positiv/Negativ-Farbkonfiguration; definiert die Farbe für negative Werte im Diagramm.

:::


## label

**Type:** `Label | undefined`

:::note{title=Beschreibung}
Beschriftungskonfiguration

:::


### enable

**Type:** `false | true`

:::note{title=Beschreibung}
Ob die Beschriftungsfunktion aktiviert ist.

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen in die nächste Zeile umbrechen.

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen Kennzahlwerte anzeigen.

In Szenarien mit mehreren Kennzahlen müssen keine widersprüchlichen Werte befürchtet werden, da alle darstellungsbezogenen Kennzahlen durch `foldMeasures` verarbeitet und zu einer Kennzahl zusammengeführt werden, die einen einzelnen Datenpunkt repräsentiert.

Hinweis: Das label in encoding hat eine hohere Prioritat; diese Konfiguration beeinflusst das label in encoding nicht.

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen Kennzahlwerte als Prozentwerte anzeigen.

In Szenarien mit mehreren Kennzahlen müssen keine widersprüchlichen Werte befürchtet werden, da alle darstellungsbezogenen Kennzahlen durch `foldMeasures` verarbeitet und zu einer Kennzahl zusammengeführt werden, die einen einzelnen Datenpunkt repräsentiert.

Hinweis: Das label in encoding hat eine hohere Prioritat; diese Konfiguration beeinflusst das label in encoding nicht.

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen Dimensionslabels anzeigen.

Zeigt alle Dimensionsbeschriftungen an.

Hinweis: Das label in encoding hat eine hohere Prioritat; diese Konfiguration beeinflusst das label in encoding nicht.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Beschriftungswerte automatisch formatiert werden; wenn autoFormat true ist, wird die numFormat-Konfiguration ignoriert.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Beschreibung}
Formatkonfiguration fur Beschriftungswerte; wird mit `format` in `measure` zusammengefuhrt, wobei `format` in `measure` hohere Prioritat hat. numFormat hat eine niedrigere Prioritat als autoFormat.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Zahlenformattyp, unterstutzt: decimal, percent (%), permille (‰), wissenschaftliche Notation.

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Zahlenformat-Verhaltnis, darf nicht 0 sein.

:::

**Beispiel**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Zahlenformatsymbol, z. B. %, ‰

:::

**Beispiel**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Tausendertrennzeichen fur Zahlenformatierung.

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Beschreibung}
Suffix des Zahlenformats.

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Beschreibung}
Prafix des Zahlenformats.

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Dezimalstellen fur die Zahlenformatierung, verwendet minimumFractionDigits und maximumFractionDigits von Intl.NumberFormat des Browsers; niedrigere Prioritat als significantDigits.

:::

**Beispiel**
\- 1234.5678 converted to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}
Signifikante Stellen fur die Zahlenformatierung, verwendet minimumSignificantDigits und maximumSignificantDigits von Intl.NumberFormat des Browsers; hohere Prioritat als fractionDigits.

:::

**Beispiel**
\- 1234.5678 converted to 1000, significantDigits:1
\- 1234.5678 converted to 1200, significantDigits:2
\- 1234.5678 converted to 1230, significantDigits:3
\- 1234.5678 converted to 1234, significantDigits:4
\- 1234.5678 converted to 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}
Rundungsprioritat, wenn sowohl significantDigits als auch fractionDigits gesetzt sind; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie roundingPriority von Intl.NumberFormat.

:::

**Beispiel**
\- 1234.5678 converted to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converted to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus fur die Zahlenformatierung, verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie roundingMode von Intl.NumberFormat.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Beschriftung font size

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Beschreibung}
Beschriftung font weight

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
Ob die Schriftfarbe der Beschriftung basierend auf der Elementfarbe automatisch invertiert wird.

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Beschreibung}
Beschriftungsposition

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Behandlung von Beschriftungsuberlappungen aktiviert ist.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
Beschriftungsauswahl; Bedingungen zwischen Selektoren sind standardmassig OR.

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

\- in: Wahlt Datenelemente aus, deren Dimensionsfeldwert in der Werteliste enthalten ist.

\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert NICHT in der Werteliste enthalten ist.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

\- in: Wahlt Datenelemente aus, deren Dimensionsfeldwert in der Werteliste enthalten ist.

\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert NICHT in der Werteliste enthalten ist.

Gleich wie operator.

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Ausgewahlte Dimensionsfeldwerte; unterstutzt Arrays.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}
Dynamischer Filter (Ausfuhrung KI-generierten Codes)



Implementiert komplexe Datenfilterlogik über KI-generierten JavaScript-Code.



Kernfunktionen:

\- Unterstutzt beliebig komplexe Datenfilterbedingungen.

\- Verwendet integrierte Hilfsfunktionen zur Datenmanipulation.

\- Wird sicher in der Browserumgebung ausgefuhrt (Web-Worker-Sandbox).



Umgebungsanforderungen: Unterstutzt nur Browserumgebungen; in Node.js-Umgebungen wird ein Fallback verwendet.



Hinweis: selector und dynamicFilter konnen nicht gleichzeitig verwendet werden; dynamicFilter hat hohere Prioritat.



Konfiguration des dynamischen Diagrammfilters.



Filtert Diagramm-Markierungen (Balken, Punkte usw.) uber KI-generierten JavaScript-Code.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}
Beschreibung der Filteranforderung des Benutzers (natürliche Sprache).

:::

**Beispiel**
"Balken mit Umsatz über 1000 hervorheben"

"Balken mit der höchsten Gewinnrate in jeder Region hervorheben"



#### code

**Type:** `string`

:::note{title=Beschreibung}
KI-generierter JavaScript-Filtercode.



\- Nur integrierte Hilfsfunktionen verwenden (Zugriff uber _ oder R).

\- Eingabeparameter: data (Array), jedes Element enthalt das Feld `__row_index`, das die Zeilennummer darstellt.

\- Muss ein Array aus Zeilenindex- und Feldkombinationen zuruckgeben: `Array<{ __row_index: number, field: string }>`.

\- `__row_index` steht fur die Zeilennummer des ursprunglichen Datenelements, `field` fur das hervorzuhebende Feld.

\- Verboten: eval, Function, asynchrone Operationen, DOM-API, Netzwerkanfragen.

:::

**Beispiel**
Highlight the `sales` field of data items where sales are greater than 1000:
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Highlight the data item with the highest profit margin in each region:
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

Highlight data items based on multiple filtering conditions:
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
Fallback-Strategie, wenn die Codeausfuhrung fehlschlagt oder die Umgebung nicht unterstutzt wird.

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

\- in: Wahlt Datenelemente aus, deren Dimensionsfeldwert in der Werteliste enthalten ist.

\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert NICHT in der Werteliste enthalten ist.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

\- in: Wahlt Datenelemente aus, deren Dimensionsfeldwert in der Werteliste enthalten ist.

\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert NICHT in der Werteliste enthalten ist.

Gleich wie operator.

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Ausgewahlte Dimensionsfeldwerte; unterstutzt Arrays.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Beschreibung}
Ausfuhrungsergebnis des dynamischen Filters (Laufzeitfeld).



Wird wahrend der prepare()-Phase geschrieben; zur Laufzeit schreibgeschutzt.

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
Legendenkonfiguration

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
Ob der Legendenrahmen aktiviert ist.

:::

:::warning{title=Warning}
Gilt nur fur diskrete Legenden.

:::

**Beispiel**
Schriftstärke der Legende



### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Schriftfarbe der Legende.

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe des Paginationssymbols.

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe des deaktivierten/ausgegrauten Paginationssymbols.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Schriftgröße der Legende.

:::

**Beispiel**




### labelFontColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Schriftfarbe der Legende.

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Beschreibung}
Schriftstärke der Legende.

:::

**Beispiel**




### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Beschreibung}
Formtyp der Legende.

:::

:::warning{title=Warning}
Gilt nur fur diskrete Legenden.

:::

**Beispiel**
Brush



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Beschreibung}
Legendenposition

:::

**Beispiel**




### maxSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Maximale Anzahl von Spalten oder Zeilen bei vielen Legendeneintragen.

Wenn position horizontal ist (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), steuert maxSize die Anzahl der angezeigten Spalten.

Wenn position vertikal ist (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), steuert maxSize die Anzahl der angezeigten Zeilen.

:::

:::warning{title=Warning}
Gilt nur fur diskrete Legenden.

:::

**Beispiel**
Brush-Modus; definiert, ob ein einzelner oder mehrere Bereiche ausgewählt werden können.




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Beschreibung}
Tooltip-Konfiguration

:::


### enable

**Type:** `false | true`

:::note{title=Beschreibung}


:::


## brush

**Type:** `Brush | undefined`

:::note{title=Beschreibung}
Brush-Auswahlkonfiguration



\- `y`: Y-Achsen-Brush; wahlt nur in Y-Achsenrichtung, auf der X-Achse uneingeschrankt.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Beschreibung}












:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Beschreibung}








:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Beschreibung}






:::


#### opacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
Stil fur Daten, die vom Brush NICHT ausgewahlt wurden.



Definiert den Stil der Datenpunkte ausserhalb der Auswahl.

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Beschreibung}
X-Achse, Kategorieachse, X-Achsenkonfiguration; definiert die X-Achse des Diagramms einschliesslich Position, Format, Stil usw.





:::


#### opacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
\- 100000 wird zu 10W konvertiert, ratio:10000, symbol:"W"





:::

#### stroke

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}

:::


## xAxis

**Type:** `XLinearAxis | undefined`

:::note{title=Beschreibung}
X-Achsenkonfiguration; numerische Achse zur Anzeige von Kennzahlwerten

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Achsenlinie color

:::

### min

**Type:** `number | undefined`

:::note{title=Beschreibung}
Achsenlinie width

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Beschreibung}
X-Achsen-Ticks

:::

### log

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob eine logarithmische Achse verwendet wird; gilt nur für numerische Achsen

:::

### logBase

**Type:** `number | undefined`

:::note{title=Beschreibung}
Easing-Funktion der Animation.

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Y-Achsen-Einstellung (Kategorieachse) zur Definition der Y-Achse, einschließlich Position, Format, Stil usw.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Achse sichtbar ist.

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Beschreibung}


:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Zahlenformatierungsverhältnis, darf nicht 0 sein

:::

**Beispiel**
Winkelbereich für automatische Rotation, wenn aktiviert (nur für Kategorieachsen wirksam).




#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**

Maximale Länge für Beschriftungsbegrenzung. Wenn die Textlänge diesen Wert überschreitet, wird sie mit Auslassungspunkten gekürzt und beim Hover sichtbar (nur für Kategorieachsen wirksam).



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Beschreibung}

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Beschreibung}

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Beschreibung}

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}

:::

**Beispiel**
Beschriftung font weight


\- 1234.5678 wird zu 1230.568 konvertiert, fractionDigits:3 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}

:::

**Beispiel**





\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**

Achsenlinie width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus der Zahlenformatierung; wird mit Intl.NumberFormat des Browsers formatiert, Regeln entsprechen roundingMode in Intl.NumberFormat

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Beschreibung}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Beschreibung}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Beschreibung}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
\- 1234.5678 wird zu 1234.5678 konvertiert, fractionDigits:4 (roundingMode:halfCeil)

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Beschreibung}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

#### titleText

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Beschreibung}

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
Beschriftung der X-Achsen-Ticks

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Beschreibung}


:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Beschreibung}

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Beschreibung}

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Beschreibung}

:::


#### duration

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

#### easing

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::


## yAxis

**Type:** `YBandAxis | undefined`

:::note{title=Beschreibung}
Y-Achsenkonfiguration; Kategorieachse zur Anzeige von Dimensionswerten, Balken sind vertikal angeordnet

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
sortLegend: {

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=Beschreibung}






:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=Beschreibung}

:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=Beschreibung}
'dark'

:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Beschreibung}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
value: 'tool'

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
Maximale Hohe des Rechtecks; kann ein Pixelwert oder eine Prozentzeichenfolge sein.

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Beschreibung}
**Beispiel**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
\- orderBy:'date'

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Beschreibung}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Legenden-Sortierkonfiguration; unterstutzt Sortierung nach Dimensionen oder Kennzahlen sowie benutzerdefinierte Sortierreihenfolgen; das sort-Array folgt der Reihenfolge von links nach rechts oder von oben nach unten.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
sortLegend: {

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Beschreibung}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

#### titleText

**Type:** `string | undefined`

:::note{title=Beschreibung}

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Benutzerdefinierte Sortierreihenfolge; diese Reihenfolge wird direkt auf die Legende angewendet. Aufsteigend folgt links-nach-rechts oder oben-nach-unten; absteigend folgt rechts-nach-links oder unten-nach-oben.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}
  ])

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Beschreibung}
Enthalt die integrierten Themes `light` und `dark`. Benutzerdefinierte Themes konnen uber `registerTheme` hinzugefugt werden.

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
- not in: Wählt Datenelemente aus, bei denen der Dimensionsfeldwert nicht im `value`-Array enthalten ist.

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Beschreibung}
Unterstutzt globale Stile oder bedingte Stilkonfigurationen.

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Beschreibung}


:::


#### duration

**Type:** `number | undefined`

:::note{title=Beschreibung}

:::

#### easing

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::


## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title=Beschreibung}
Konfiguration des horizontalen Tooltips



selector = {

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

### rectColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
operator: 'between'

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
solid

:::


## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note{title=Beschreibung}
Gestapelte Rundungen

:::


## barMaxWidth

**Type:** `string | number | undefined`

:::note{title=Beschreibung}
Maximale Höhe des Rechtecks

:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=Beschreibung}
Legenden-Sortierkonfiguration



Dynamische Filtereinstellung des Diagramms: Filtert Diagrammmarken (Balken, Punkte usw.) über KI-generierten JavaScript-Code.

:::

**Beispiel**
);


Highlight data items based on multiple filtering conditions:




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Beschreibung}
])

:::

**Beispiel**




### orderBy

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**

  __row_index: item.__row_index,



### customOrder

**Type:** `string[] | undefined`

:::note{title=Beschreibung}
  _.maxBy(group, item => item.profit / item.sales)

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Beschreibung}
Operator



\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert NICHT in der Werteliste enthalten ist.

:::


### length

**Type:** `number`

### brand

**Type:** `brand`


## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note{title=Beschreibung}
Balkendiagramm-Stilkonfiguration

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
- not in: Wählt Datenelemente aus, bei denen der Dimensionsfeldwert nicht im `value`-Array enthalten ist.






:::

**Beispiel**
Strichfarbe des Balken-Primitives (Rechteck)




Ausführungsergebnis des dynamischen Filters (Laufzeitfeld)



field: 'category',
operator: 'in',
value: 'tool'
}
field: 'category',
operator: 'not in',
value: 'book'
}


field: 'profit',
operator: '>=',
value: 100
}
field: 'profit',
operator: 'between'
value: [100, 300]
}




#### field

**Type:** `string`

:::note{title=Beschreibung}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}






:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}






:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Selektor fur Anmerkungspunkte, wird zum Auswahlen von Datenpunkten verwendet.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}
- center: Text ist am Punkt zentriert.









Operator

\- in: Wahlt Datenelemente aus, deren Dimensionsfeldwert in der Werteliste enthalten ist.

\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert NICHT in der Werteliste enthalten ist.


















:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
"Balken mit Umsatz über 1000 hervorheben"

"Balken mit der höchsten Gewinnrate in jeder Region hervorheben"



#### code

**Type:** `string`

:::note{title=Beschreibung}













:::

**Beispiel**

```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

"Highlight the bar with the highest profit margin in each region"
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
const grouped = _.groupBy(data, 'area');

:::


##### field

**Type:** `string`

:::note{title=Beschreibung}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
_.map(filtered, item => [

{ __row_index: item.__row_index, field: 'sales' }

);

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Fester X-Wert für die vertikale Annotationslinie. Wenn die Kategorieachse in X-Richtung liegt, kann ein Dimensionswert eingegeben werden; wenn eine numerische Achse in X-Richtung liegt, kann ein konkreter Zahlenwert verwendet werden.






:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Nur in Browserumgebungen unterstützt (erfordert Web Worker).

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Beschreibung}
\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert NICHT in der Werteliste enthalten ist.



\- in: Wahlt Datenelemente aus, deren Dimensionsfeldwert im Wert enthalten ist

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


:::

### barColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Wird wahrend der prepare()-Phase geschrieben; zur Laufzeit schreibgeschutzt.

:::

### barColorOpacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
const avgSales = _.meanBy(data, 'sales');

:::

### barBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

### barBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
'Anmerkungstext'

:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Beschreibung}
Textfarbe.

:::

**Beispiel**
'red'







### barBorderOpacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Beispiel**





:::

**Beispiel**
Anmerkungstext.

[0, 0, 10, 10]



### barRadius

**Type:** `number | number[] | undefined`


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Beschreibung}
Markierungspunkt-Konfiguration

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}


:::


#### field

**Type:** `string`

:::note{title=Beschreibung}

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
bottom: Text liegt uber dem Anmerkungspunkt, die Unterkante ist am Punkt ausgerichtet.

Empfohlen ist 'top', damit der Text vollstandig im sichtbaren Diagrammbereich angezeigt wird.

**Beispiel**

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}






true

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Hintergrundfarbe.

:::

### measureId

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}
**Beispiel**









Rahmenbreite des Hintergrunds.

Sichtbarkeit der Linie.

**Beispiel**









Eckenradius des Hintergrundrahmens.



**Beispiel**





:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
"Balken mit Umsatz über 1000 hervorheben"

"Balken mit der höchsten Gewinnrate in jeder Region hervorheben"



#### code

**Type:** `string`

:::note{title=Beschreibung}








Horizontaler Versatz des Anmerkungspunkts in Pixeln. Wenn der Punkt links liegt (Start der Kategorieachse), wird ein positiver Wert empfohlen; wenn er rechts liegt (Ende der Kategorieachse), ein negativer Wert.

Ein negativer Wert verschiebt die gesamte Komponente nach links (z. B. -10).

Ein positiver Wert verschiebt die gesamte Komponente nach rechts (z. B. 10).

:::

**Beispiel**
offsetX: 5 (die gesamte Komponente verschiebt sich um 5 Pixel nach rechts)
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```


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


:::


##### field

**Type:** `string`

:::note{title=Beschreibung}
"Den hochsten Verkaufswert als Referenz fur die Anmerkungslinie abrufen"

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}


KI-generierter JavaScript-Filtercode.

\- Nur integrierte Hilfsfunktionen verwenden (Zugriff uber _ oder R).

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}




Den maximalen Verkaufswert als Wert der Anmerkungslinie abrufen:

const maxSales = _.maxBy(data, 'sales')?.sales;

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Beschreibung}
Beschreibung der Filteranforderung des Benutzers (natürliche Sprache).



);

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
Wird wahrend der prepare()-Phase geschrieben; zur Laufzeit schreibgeschutzt.

:::

**Beispiel**
'Markierungstext'



### textColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**




### textFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**




### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Beschreibung}




Schriftgrosse des Textes.


**Beispiel**

:::

**Beispiel**
'right' Text befindet sich links vom Markierungspunkt



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Beschreibung}
**Beispiel**









:::

**Beispiel**
'top' Text befindet sich unterhalb des Markierungspunkts



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
**Beispiel**

:::

**Beispiel**




### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
top: Text liegt unter der Referenzlinie, die Oberkante ist am Ende der (vertikalen) Anmerkungslinie ausgerichtet.

:::

**Beispiel**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**




### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**




### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**




### offsetY

**Type:** `number | undefined`

:::note{title=Beschreibung}




Ob der Hintergrund sichtbar ist.

:::

**Beispiel**
true



### offsetX

**Type:** `number | undefined`

:::note{title=Beschreibung}
Hintergrundfarbe.


**Beispiel**

:::

**Beispiel**
2




## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Beschreibung}
Numerische Markierungslinie

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Beschreibung}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Beschreibung}




Eckenradius des Hintergrundrahmens.

Sichtbarkeit der Linie.





:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
"Höchsten Umsatzwert als Referenz für die Markierungslinie abrufen"

"Durchschnittlichen Umsatz für die Markierungslinie berechnen"



#### code

**Type:** `string`

:::note{title=Beschreibung}











Dynamischer Filter (Ausfuhrung KI-generierten Codes)

:::

**Beispiel**

```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```


```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

**Beispiel**
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
\- Eingabeparameter: data (Array).

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Beschreibung}




const maxSales = _.maxBy(data, 'sales')?.sales;

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
'Markierungstext'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Beschreibung}
Ausgewahlte Dimensionsfeldwerte; unterstutzt Arrays.

:::

**Beispiel**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
'Annotationstext'

:::

**Beispiel**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**




### textFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**




### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Beschreibung}




Textfarbe.


**Beispiel**

:::

**Beispiel**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Beschreibung}
**Beispiel**









:::

**Beispiel**
'top'



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**




### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
**Beispiel**

:::

**Beispiel**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
top: Text liegt unter der Referenzlinie, die Oberkante ist an der (horizontalen) Anmerkungslinie ausgerichtet.

:::

**Beispiel**




### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
'solid'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**




### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**




### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**




### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**





## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=Beschreibung}
Markierungslinie für Dimensionswerte

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Beschreibung}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Beschreibung}
**Beispiel**











:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
"Höchsten Umsatzwert als Referenz für die Markierungslinie abrufen"

"Durchschnittlichen Umsatz für die Markierungslinie berechnen"



#### code

**Type:** `string`

:::note{title=Beschreibung}
Operator



\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert nicht im Wert enthalten ist







:::

**Beispiel**

```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```


```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```


```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```


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


:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Beschreibung}
\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert NICHT in der Werteliste enthalten ist.



Textfarbe

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Beschreibung}
**Beispiel**

:::

**Beispiel**
'Markierungstext'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Beschreibung}
**Beispiel**





:::

**Beispiel**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**



### textFontWeight

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Beschreibung}
left: Text befindet sich rechts vom Anmerkungsbereich, die linke Kante ist am Bereich ausgerichtet.

center: Text wird im Anmerkungsbereich zentriert.



**Beispiel**



:::

**Beispiel**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Beschreibung}
middle: Text wird vertikal im Anmerkungsbereich zentriert.

bottom: Text befindet sich am oberen Rand des Anmerkungsbereichs, die Unterkante ist am Bereich ausgerichtet.

Strichfarbe des Hintergrunds

**Beispiel**



:::

**Beispiel**
'top'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}






:::

**Beispiel**




### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**




### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**




### lineVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}






:::

**Beispiel**
0.5



### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Rahmenfarbe des Anmerkungsbereichs.

:::

**Beispiel**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Rahmenbreite des Anmerkungsbereichs.

:::

**Beispiel**




### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Beschreibung}
Eckenradius des Rahmens des Anmerkungsbereichs.

:::

**Beispiel**
'solid'



### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=Beschreibung}
Strichelstil des Rahmens des Anmerkungsbereichs.

:::


#### positiveColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
0

:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Beschreibung}
Markierungsbereich-Konfiguration

:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Beschreibung}
Ob die Dimensionsverknupfung aktiviert wird, wenn im Diagramm Perspektive aktiviert ist oder Kennzahlen kombiniert sind.

:::


#### field

**Type:** `string`

:::note{title=Beschreibung}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}




Ob Tooltips fur alle dimensionsbezogenen Unterdiagramme angezeigt werden.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.






:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}


:::

### text

**Type:** `string | string[] | undefined`

:::note{title=Beschreibung}
'red'

:::

**Beispiel**
'Markierungstext'



### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title=Beschreibung}
2

:::

**Beispiel**
'top'



### textColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
4

:::

**Beispiel**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
[2, 2]

:::

**Beispiel**




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
Konfiguration der polynomialen Regressionslinie, einschliesslich Polynomordnung, Stil der Regressionslinie usw.

Es wird empfohlen, 'center' zu setzen, damit der Text in der Mitte des Markierungsbereichs liegt







:::

**Beispiel**
'center' Text befindet sich in der Mitte des Markierungsbereichs



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Beschreibung}








Ordnung der polynomialen Regression

:::

**Beispiel**
'top' Text befindet sich am unteren Rand des Markierungsbereichs



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}

:::

**Beispiel**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Textfarbe



Textfarbe

:::

**Beispiel**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Beispiel**

:::

**Beispiel**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}
**Beispiel**



**Beispiel**

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
Farbe des Markierungsbereichs

:::

**Beispiel**
'red'



### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
0.5



### areaBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
'red'



### areaBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**




### areaBorderRadius

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**



### areaLineDash

**Type:** `number[] | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
[2, 2]



### outerPadding

**Type:** `number | undefined`

:::note{title=Beschreibung}
Randabstand des Markierungsbereichs

:::

**Beispiel**
0




## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=Beschreibung}
Dimensionsverknüpfungskonfiguration



Konfiguration der Dimensionsverknüpfung für Pivot-Diagramme

:::


### enable

**Type:** `false | true`

:::note{title=Beschreibung}
Ob die Dimensionsverknüpfung für Pivot-Diagramme aktiviert wird

:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Tooltip-Informationen für die Unterdiagramme aller entsprechenden Dimensionen angezeigt werden

:::

### showLabel

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob das zum crosshair gehörende Label angezeigt wird

:::


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Beschreibung}
Sprachkonfiguration

:::
