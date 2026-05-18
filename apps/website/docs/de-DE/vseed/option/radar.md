# Radar

:::info{title=Empfehlung}
\- Empfohlene Feldkonfiguration: `1` Kennzahl, `1` Dimension

\- Unterstützt Datenumformung: mindestens `1` Kennzahl, `0` Dimensionen

:::

:::info{title=Encoding-Zuordnung}
Radardiagramme unterstützen die folgenden visuellen Kanäle:

`angle`  : Winkelkanal, unterstützt `mehrere Dimensionen`; Dimensionswerte werden der Winkelachse zugeordnet

`radius` : Radiuskanal, unterstützt `mehrere Kennzahlen`; Kennzahlwerte werden der Radiusachse zugeordnet

`color`  : Farbkanal, unterstützt `mehrere Dimensionen` oder `eine Kennzahl`; Dimensionsfarben unterscheiden Datenreihen, Kennzahlfarben bilden Kennzahlwerte linear auf Grafikfarben ab

`tooltip`: Tooltip-Kanal, unterstützt `mehrere Dimensionen` und `mehrere Kennzahlen`; wird beim Hover über Datenpunkte angezeigt

`label`  : Beschriftungskanal, unterstützt `mehrere Dimensionen` und `mehrere Kennzahlen`; wird als Datenlabel auf Datenpunkten angezeigt

:::

:::note{title=Beschreibung}
Radardiagramm, geeignet für die vergleichende Analyse multidimensionaler Daten; zeigt die Werteverteilung über Dimensionen in einem Mehrachsen-Koordinatensystem

Anwendungsszenarien:

\- Gesamtleistung über mehrere Dimensionen vergleichen

\- Leistungsbewertung mehrerer Objekte anhand mehrerer Kennzahlen

\- Mehrdimensionale Merkmale kategorischer Daten darstellen

:::

:::warning{title=Warning}
Datenanforderungen:

\- Mindestens ein numerisches Feld (Kennzahl)

\- Die erste Dimension bildet die Achsen des Radardiagramms; andere Dimensionen werden als unterschiedliche Reihen verglichen

\- Mehrere Kennzahlen können jeweils als separate Reihen angezeigt werden

Standardmäßig aktivierte Funktionen:

\- Legende, Radarkoordinatensystem, Datenbeschriftungen, Tooltip und Wertskalierung sind standardmäßig aktiviert

:::


## chartType

**Type:** `"radar"`

:::note{title=Beschreibung}
Radardiagramm



Radardiagramm, das multidimensionale Vergleiche über ein Mehrachsen-Koordinatensystem darstellt

:::

**Beispiel**
'radar'




## dataset

**Type:** `Record[]`

:::note{title=Beschreibung}
Datensatz



Ein bereits aggregierter Datensatz gemäß TidyData-Spezifikation. Er definiert Datenquelle und Struktur des Diagramms. Benutzerdaten müssen nicht vorverarbeitet werden, da VSeed die Daten automatisch umformt. Radardiagrammdaten werden letztlich in zwei Dimensionen und eine Kennzahl umgewandelt.

:::

**Beispiel**
[{month:'Jan', value:100}, {month:'Feb', value:150}, {month:'Mar', value:120}]




## dimensions

**Type:** `RadarDimension[] | undefined`

:::note{title=Beschreibung}
Dimensionen

Die erste Dimension des Radardiagramms wird der Winkelachse zugeordnet; die übrigen Dimensionen werden bei mehreren Kennzahlen mit Kennzahlnamen zusammengeführt und als Legendeneinträge angezeigt.

:::

**Beispiel**
[{id: 'category', alias: 'Kategorie'}]




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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "angle" | undefined`

:::note{title=Beschreibung}
Kanal, dem die Dimension zugeordnet wird

\- angle: unterstützt die Zuordnung mehrerer Dimensionen zum Winkelkanal

\- color: unterstützt die Zuordnung mehrerer Dimensionen zum Farbkanal

\- detail: unterstützt die Zuordnung mehrerer Dimensionen zum Detailkanal

\- tooltip: unterstützt die Zuordnung mehrerer Dimensionen zum Tooltip-Kanal

\- label: unterstützt die Zuordnung mehrerer Dimensionen zum Beschriftungskanal

\- row: unterstützt die Zuordnung mehrerer Dimensionen zum Zeilenkanal

\- column: unterstützt die Zuordnung mehrerer Dimensionen zum Spaltenkanal

:::


## measures

**Type:** `RadarMeasure[] | undefined`

:::note{title=Beschreibung}
Kennzahlen



Die Kennzahlen des Radardiagramms werden automatisch zu einer Kennzahl zusammengeführt und der Radiusachse zugeordnet. Wenn mehrere Kennzahlen vorhanden sind, werden Kennzahlnamen mit den übrigen Dimensionen zusammengeführt und als Legendeneinträge angezeigt.

:::

**Beispiel**
[{id: 'value', alias: 'Value'}]




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
Automatische Zahlenformatierung, standardmäßig aktiviert, mit höchster Priorität

Wenn autoFormat=true ist, werden alle numFormat-Konfigurationen überschrieben.

Nach der Aktivierung wahlen Datenbeschriftungen und Tooltips des Diagramms automatisch ein passendes Format basierend auf Kennzahlwerten und Locale.

Formatierungsregeln: Dezimalzahlen, kompakte Schreibweise aktiviert, mindestens 0 und hochstens 2 Dezimalstellen, automatische Rundung, Umsetzung uber Intl.NumberFormat des Browsers.

Zum Beispiel:

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Beschreibung}
Benutzerdefinierte Zahlenformatierung für Kennzahlen; wird automatisch auf Beschriftungen und Tooltips angewendet.

Hinweis: Um benutzerdefinierte Formatierung zu verwenden, muss autoFormat explizit auf false gesetzt werden; andernfalls überschreibt autoFormat diese Konfiguration.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Zahlenformatierungstyp; unterstützt Zahl (Dezimal), Prozent (%), Promille (‰) und wissenschaftliche Notation
:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Zahlenformatierungsverhältnis, darf nicht 0 sein

:::

**Beispiel**

\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Symbol der Zahlenformatierung, z. B. %, ‰
:::

**Beispiel**

\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Tausendertrennzeichen für die Zahlenformatierung
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
Dezimalstellen der Zahlenformatierung; verwendet minimumFractionDigits und maximumFractionDigits von Intl.NumberFormat im Browser. Hat niedrigere Priorität als significantDigits
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
Signifikante Stellen der Zahlenformatierung; verwendet minimumSignificantDigits und maximumSignificantDigits von Intl.NumberFormat im Browser. Hat höhere Priorität als fractionDigits
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
Rundungspriorität der Zahlenformatierung, wenn significantDigits und fractionDigits gleichzeitig gesetzt sind. Verwendet Intl.NumberFormat im Browser und folgt den roundingPriority-Regeln von Intl.NumberFormat
:::

**Beispiel**
\- 1234.5678 wird zu 1230 konvertiert, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:3 (roundingPriority:morePrecision)




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus der Zahlenformatierung; wird mit Intl.NumberFormat des Browsers formatiert, Regeln entsprechen roundingMode in Intl.NumberFormat

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Zahlenformatierungstyp; unterstützt Zahl (Dezimal), Prozent (%), Promille (‰) und wissenschaftliche Notation
:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Zahlenformatierungsverhältnis, darf nicht 0 sein

:::

**Beispiel**

\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Symbol der Zahlenformatierung, z. B. %, ‰
:::

**Beispiel**

\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Tausendertrennzeichen für die Zahlenformatierung
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
Dezimalstellen der Zahlenformatierung; verwendet minimumFractionDigits und maximumFractionDigits von Intl.NumberFormat im Browser. Hat niedrigere Priorität als significantDigits
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
Signifikante Stellen der Zahlenformatierung; verwendet minimumSignificantDigits und maximumSignificantDigits von Intl.NumberFormat im Browser. Hat höhere Priorität als fractionDigits
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
Rundungspriorität der Zahlenformatierung, wenn significantDigits und fractionDigits gleichzeitig gesetzt sind. Verwendet Intl.NumberFormat im Browser und folgt den roundingPriority-Regeln von Intl.NumberFormat
:::

**Beispiel**
\- 1234.5678 wird zu 1230 konvertiert, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:3 (roundingPriority:morePrecision)




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus der Zahlenformatierung; wird mit Intl.NumberFormat des Browsers formatiert, Regeln entsprechen roundingMode in Intl.NumberFormat

:::

### encoding

**Type:** `"color" | "tooltip" | "label" | "radius" | undefined`

:::note{title=Beschreibung}
Kanal, dem die Kennzahl zugeordnet wird

\- radius: Aus der Kennzahl auf den Radius gemappt

\- color: Kennzahl, die dem Farbkanal zugeordnet wird

\- label: Kennzahl, die dem Beschriftungskanal zugeordnet wird

\- tooltip: Kennzahl, die dem Tooltip-Kanal zugeordnet wird

:::

### parentId

**Type:** `string | undefined`

:::note{title=Beschreibung}
Erstellt eine baumformige Kennzahlgruppe in flacher Kennzahlkonfiguration. parentId verweist auf die ID der ubergeordneten Kennzahlgruppe und dient zum Aufbau des Kennzahlbaums.

:::

:::tip{title=Tip}
Es gibt zwei Formen der Kennzahlbaum-Konfiguration: direkt einen Kennzahlbaum mit children konfigurieren oder eine flache Kennzahlliste mit parentId konfigurieren. Beide Formen können nicht gleichzeitig verwendet werden.

:::


## page

**Type:** `Page | undefined`

:::note{title=Beschreibung}
Paging configuration, used to specify the paging field name; it must be a dimension

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
Hintergrundfarbe des Diagramms

Die Hintergrundfarbe kann eine Farbzeichenfolge wie 'red' oder 'blue' sein oder ein hex-, rgb- bzw. rgba-Wert wie '#ff0000' oder 'rgba(255,0,0,0.5)'.
:::


## color

**Type:** `Color | undefined`

:::note{title=Beschreibung}
Farbe



Farbkonfiguration zur Definition des Farbschemas des Diagramms, einschliesslich Farblisten, Farbzuordnungen und Farbverlaeufen.

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
Beschriftung



Beschriftungskonfiguration zur Definition von Position, Format, Stil und weiteren Einstellungen der Datenbeschriftungen.

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

Hinweis: Das label in encoding hat eine höhere Priorität; diese Konfiguration beeinflusst das label in encoding nicht.

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen Kennzahlwerte als Prozentwerte anzeigen.

In Szenarien mit mehreren Kennzahlen müssen keine widersprüchlichen Werte befürchtet werden, da alle darstellungsbezogenen Kennzahlen durch `foldMeasures` verarbeitet und zu einer Kennzahl zusammengeführt werden, die einen einzelnen Datenpunkt repräsentiert.

Hinweis: Das label in encoding hat eine höhere Priorität; diese Konfiguration beeinflusst das label in encoding nicht.

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen Dimensionslabels anzeigen.

Zeigt alle Dimensionsbeschriftungen an.

Hinweis: Das label in encoding hat eine höhere Priorität; diese Konfiguration beeinflusst das label in encoding nicht.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Beschriftungswerte automatisch formatiert werden; wenn autoFormat true ist, wird die numFormat-Konfiguration ignoriert.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Beschreibung}
Formatkonfiguration für Beschriftungswerte; wird mit `format` in `measure` zusammengeführt, wobei `format` in `measure` höhere Priorität hat. numFormat hat eine niedrigere Priorität als autoFormat.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Zahlenformatierungstyp; unterstützt Zahl (Dezimal), Prozent (%), Promille (‰) und wissenschaftliche Notation
:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Zahlenformatierungsverhältnis, darf nicht 0 sein

:::

**Beispiel**

\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Symbol der Zahlenformatierung, z. B. %, ‰
:::

**Beispiel**

\- 100000 wird zu 10万 konvertiert, ratio:10000, symbol:"万"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Tausendertrennzeichen für die Zahlenformatierung
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
Dezimalstellen der Zahlenformatierung; verwendet minimumFractionDigits und maximumFractionDigits von Intl.NumberFormat im Browser. Hat niedrigere Priorität als significantDigits
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
Signifikante Stellen der Zahlenformatierung; verwendet minimumSignificantDigits und maximumSignificantDigits von Intl.NumberFormat im Browser. Hat höhere Priorität als fractionDigits
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
Rundungspriorität der Zahlenformatierung, wenn significantDigits und fractionDigits gleichzeitig gesetzt sind. Verwendet Intl.NumberFormat im Browser und folgt den roundingPriority-Regeln von Intl.NumberFormat
:::

**Beispiel**
\- 1234.5678 wird zu 1230 konvertiert, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:3 (roundingPriority:morePrecision)




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus der Zahlenformatierung; wird mit Intl.NumberFormat des Browsers formatiert, Regeln entsprechen roundingMode in Intl.NumberFormat

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Schriftgröße der Beschriftung
:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Beschreibung}
Maximale Hohe des Rechtecks; kann ein Pixelwert oder eine Prozentzeichenfolge sein.

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
Beschriftungsauswahl; Bedingungen zwischen Selektoren sind standardmäßig OR.

:::


#### field

**Type:** `string`

:::note{title=Beschreibung}
Dimensionsfeld, die id eines Elements in dimensions
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.




wie operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wert des Dimensionsfelds im Datenelement auswählen; Arrays werden unterstützt
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}
Dynamischer Filter (Ausführung von KI-generiertem Code)

Implementiert komplexe Datenfilterlogik mit KI-generiertem JavaScript-Code

Kernfunktionen:

- Unterstützt beliebig komplexe Datenfilterbedingungen

- Verwendet integrierte Hilfsfunktionen für Datenoperationen

- Sichere Ausführung in der Browserumgebung (Web-Worker-Sandbox)

Umgebungsanforderung: Nur Browserumgebungen werden unterstützt; in Node.js wird fallback verwendet

Hinweis: selector und dynamicFilter können nicht gleichzeitig verwendet werden; dynamicFilter hat höhere Priorität

Konfiguration des dynamischen Diagrammfilters

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
"Balken mit Umsatz über 1000 hervorheben"

"Den Balken mit der höchsten Gewinnrate je Region hervorheben"


#### code

**Type:** `string`

:::note{title=Beschreibung}
KI-generierter JavaScript-Filtercode

- Es dürfen nur integrierte Hilfsfunktionen verwendet werden (Zugriff über _ oder R)

- Eingabeparameter: data (Array); jedes item enthält __row_index als Zeilennummer

- Muss ein Array aus Zeilenindex- und Feldkombinationen zurückgeben: Array<{ __row_index: number, field: string }>

- __row_index steht für die Zeilennummer des ursprünglichen Dateneintrags, field für das hervorzuhebende Feld

- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen

:::

**Beispiel**
Das sales-Feld von Dateneinträgen mit sales über 1000 hervorheben
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Den Dateneintrag mit der höchsten Gewinnrate je Region hervorheben
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

Dateneinträge hervorheben, die mehrere Bedingungen erfüllen
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
Dimensionsfeld, die id eines Eintrags in dimensions

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

- in: Wählt Dateneinträge aus, deren Dimensionsfeldwert in value enthalten ist

- not in: Wählt Dateneinträge aus, deren Dimensionsfeldwert nicht in value enthalten ist

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

- in: Wählt Dateneinträge aus, deren Dimensionsfeldwert in value enthalten ist

- not in: Wählt Dateneinträge aus, deren Dimensionsfeldwert nicht in value enthalten ist

entspricht operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wählt den Wert des Dimensionsfelds im Dateneintrag aus; Arrays werden unterstützt

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
Legende



Legendenkonfiguration zur Definition von Position, Format, Stil und weiteren Einstellungen der Legende.

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
Gilt nur für diskrete Legenden.

:::

**Beispiel**
border: true



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
labelFontSize: 10



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
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Beschreibung}
Formtyp der Legende.

:::

:::warning{title=Warning}
Gilt nur für diskrete Legenden.

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
Maximale Anzahl von Spalten oder Zeilen bei vielen Legendeneintragen.

Wenn position horizontal ist (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), steuert maxSize die Anzahl der angezeigten Spalten.

Wenn position vertikal ist (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), steuert maxSize die Anzahl der angezeigten Zeilen.

:::

:::warning{title=Warning}
Gilt nur für diskrete Legenden.

:::

**Beispiel**
maxSize: 2




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Beschreibung}
Tooltip



Tooltip-Konfiguration zur Definition von Position, Format, Stil und weiteren Einstellungen der Tooltips.

:::


### enable

**Type:** `false | true`

:::note{title=Beschreibung}
Ob die Tooltip-Funktion aktiviert ist
:::


## brush

**Type:** `Brush | undefined`

:::note{title=Beschreibung}
Brush-Auswahl



Brush selection configuration, used to enable or disable brush selection.



\- `y`: Y-Achsen-Brush; wahlt nur in Y-Achsenrichtung, auf der X-Achse uneingeschrankt.

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
Auswahlmodus: Einzel- oder Mehrfachauswahl



Definiert den Brush-Auswahlmodus

\- `single`: Einzelauswahlmodus, es kann jeweils nur ein Brush-Auswahlrahmen existieren

\- `multiple`: Mehrfachauswahlmodus, mehrere Brush-Auswahlrahmen können gleichzeitig existieren
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
\-  100000 wird zu 10万, ratio:10000, symbol:"万"



Definiert den Stil der Datenpunkte ausserhalb der Auswahl.

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
X-Achse, Kategorieachse, X-Achsenkonfiguration; definiert die X-Achse des Diagramms einschliesslich Position, Format, Stil usw.





:::


#### opacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
\-  100000 wird zu 10万, ratio:10000, symbol:"万"





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

**Type:** `RadarAnimation | undefined`

:::note{title=Beschreibung}
Animationskonfiguration



Diagrammanimationskonfiguration; verfuegbare Effekte sind durch den Diagrammtyp eingeschraenkt

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Radar-Diagrammanimation aktiviert ist

:::

### params

**Type:** `RadarAnimationParams | undefined`

:::note{title=Beschreibung}
Animationsparameter des Radar-Diagramms

:::


#### appear

**Type:** `RadarAppearAnimation | undefined`

:::note{title=Beschreibung}
Konfiguration der Eintrittsanimation des Radar-Diagramms

:::


##### effects

**Type:** `("radial" | "scale")[] | undefined`

:::note{title=Beschreibung}
Eintrittseffekte des Radar-Diagramms, unterstuetzt radiale und Skalierungsanimationen

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die aktuelle Animationsphase aktiviert ist

:::

##### ease

**Type:** `string | undefined`

:::note{title=Beschreibung}
Easing-Funktion der Animation

:::

##### duration

**Type:** `number | undefined`

:::note{title=Beschreibung}
Animationsdauer in Millisekunden

:::

##### color

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hervorhebungs- oder Atmosphaerenfarbe der Animation

:::

#### update

**Type:** `RadarUpdateAnimation | undefined`

:::note{title=Beschreibung}
Konfiguration der Aktualisierungsanimation des Radar-Diagramms

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=Beschreibung}
Aktualisierungseffekte des Radar-Diagramms, unterstuetzt Wachstumsanimation

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die aktuelle Animationsphase aktiviert ist

:::

##### ease

**Type:** `string | undefined`

:::note{title=Beschreibung}
Easing-Funktion der Animation

:::

##### duration

**Type:** `number | undefined`

:::note{title=Beschreibung}
Animationsdauer in Millisekunden

:::

##### color

**Type:** `string | undefined`

:::note{title=Beschreibung}
Hervorhebungs- oder Atmosphaerenfarbe der Animation

:::

#### loop

**Type:** `RadarAnimationLoop | undefined`

:::note{title=Beschreibung}
Konfiguration der Schleifenanimation des Radar-Diagramms

:::


##### enable

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob die Schleifenanimation aktiviert ist

:::

##### interval

**Type:** `number | undefined`

:::note{title=Beschreibung}
Intervall der Schleifenanimation in Millisekunden

:::

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title=Beschreibung}
Radardiagramm atmosphere animation configuration

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

###### effect

**Type:** `PointAtmosphereEffect | undefined`

:::note{title=Beschreibung}
Atmosphärenanimationseffekt; unterstützt Wellen-, Sichtbarkeits- und Atmungseffekte

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Beschreibung}
Diagrammthema. Das Thema ist eine funktionale Konfiguration mit niedrigerer Priorität und enthält allgemeine Einstellungen für alle Diagrammtypen sowie Einstellungen für einen einzelnen Diagrammtyp.



Zwei integrierte Themen stehen bereit: light und dark. Benutzer können Themen über Builder anpassen.



Thema



Zwei integrierte Themen stehen bereit: light und dark; neue Themen können über registerTheme angepasst werden.
:::

**Beispiel**
'dark'

'light'

'customThemeName'




### length

**Type:** `number`

### brand

**Type:** `brand`


## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note{title=Beschreibung}
Stilkonfiguration für Punktmarkierungen; definiert Farbe, Rahmen und zugehörige Einstellungen der Punktmarkierung.

Unterstützt globale Stilkonfiguration oder bedingte Stilkonfiguration

Datenfilter




:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
- not in: Wählt Datenelemente aus, bei denen der Dimensionsfeldwert nicht im `value`-Array enthalten ist.






:::

**Beispiel**
Strichfarbe des Balken-Primitives (Rechteck)
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]


selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]


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
Dimensionsfeld, die id eines Elements in dimensions
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.




wie operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wert des Dimensionsfelds im Datenelement auswählen; Arrays werden unterstützt
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}
Dynamischer Filter (Ausführung von KI-generiertem Code)

Implementiert komplexe Datenfilterlogik mit KI-generiertem JavaScript-Code

Geeignet für Szenarien, die mit statischen Selektoren schwer auszudrücken sind, z. B. Top N, statistische Analysen und komplexe Bedingungen

Kernfunktionen:

- Unterstützt beliebig komplexe Datenfilterbedingungen

- Verwendet integrierte Hilfsfunktionen für Datenoperationen

- Sichere Ausführung in der Browserumgebung (Web-Worker-Sandbox)

Umgebungsanforderung: Nur Browserumgebungen werden unterstützt; in Node.js wird fallback verwendet

Hinweis: selector und dynamicFilter können nicht gleichzeitig verwendet werden; dynamicFilter hat höhere Priorität

Konfiguration des dynamischen Diagrammfilters

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
"Balken mit Umsatz über 1000 hervorheben"

"Den Balken mit der höchsten Gewinnrate je Region hervorheben"


#### code

**Type:** `string`

:::note{title=Beschreibung}
KI-generierter JavaScript-Filtercode

- Es dürfen nur integrierte Hilfsfunktionen verwendet werden (Zugriff über _ oder R)

- Eingabeparameter: data (Array); jedes item enthält __row_index als Zeilennummer

- Muss ein Array aus Zeilenindex- und Feldkombinationen zurückgeben: Array<{ __row_index: number, field: string }>

- __row_index steht für die Zeilennummer des ursprünglichen Dateneintrags, field für das hervorzuhebende Feld

- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen

:::

**Beispiel**
Das sales-Feld von Dateneinträgen mit sales über 1000 hervorheben
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Den Dateneintrag mit der höchsten Gewinnrate je Region hervorheben
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

Dateneinträge hervorheben, die mehrere Bedingungen erfüllen
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
Dimensionsfeld, die id eines Eintrags in dimensions

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

- in: Wählt Dateneinträge aus, deren Dimensionsfeldwert in value enthalten ist

- not in: Wählt Dateneinträge aus, deren Dimensionsfeldwert nicht in value enthalten ist

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

- in: Wählt Dateneinträge aus, deren Dimensionsfeldwert in value enthalten ist

- not in: Wählt Dateneinträge aus, deren Dimensionsfeldwert nicht in value enthalten ist

entspricht operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wählt den Wert des Dimensionsfelds im Dateneintrag aus; Arrays werden unterstützt

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

### pointVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Punkte sichtbar sind

:::

### pointSize

**Type:** `number | undefined`

:::note{title=Beschreibung}
Punktgroesse



Punktgroesse

:::

### pointColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe der Punktmarke



Farbe der Punktmarke

:::

### pointColorOpacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
Deckkraft der Punktmarkenfarbe



Deckkraft der Punktmarkenfarbe

:::

### pointBorderColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Rahmenfarbe der Punktmarke



Rahmenfarbe der Punktmarke

:::

### pointBorderWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Rahmenbreite der Punktmarke



Rahmenbreite der Punktmarke

:::

### pointBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Beschreibung}
Rahmenstil der Punktmarke



Rahmenstil der Punktmarke

:::

**Beispiel**
solid

dashed

dotted




## lineStyle

**Type:** `LineStyle | LineStyle[] | undefined`

:::note{title=Beschreibung}
Line mark style configuration, used to define line mark color, opacity, curve, and related settings.

Unterstützt globale Stilkonfiguration oder bedingte Stilkonfiguration

Datenfilter




:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
- not in: Wählt Datenelemente aus, bei denen der Dimensionsfeldwert nicht im `value`-Array enthalten ist.






:::

**Beispiel**
Strichfarbe des Balken-Primitives (Rechteck)
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]


selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]


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
Dimensionsfeld, die id eines Elements in dimensions
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.




wie operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wert des Dimensionsfelds im Datenelement auswählen; Arrays werden unterstützt
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}
Dynamischer Filter (Ausführung von KI-generiertem Code)

Implementiert komplexe Datenfilterlogik mit KI-generiertem JavaScript-Code

Geeignet für Szenarien, die mit statischen Selektoren schwer auszudrücken sind, z. B. Top N, statistische Analysen und komplexe Bedingungen

Kernfunktionen:

- Unterstützt beliebig komplexe Datenfilterbedingungen

- Verwendet integrierte Hilfsfunktionen für Datenoperationen

- Sichere Ausführung in der Browserumgebung (Web-Worker-Sandbox)

Umgebungsanforderung: Nur Browserumgebungen werden unterstützt; in Node.js wird fallback verwendet

Hinweis: selector und dynamicFilter können nicht gleichzeitig verwendet werden; dynamicFilter hat höhere Priorität

Konfiguration des dynamischen Diagrammfilters

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
"Balken mit Umsatz über 1000 hervorheben"

"Den Balken mit der höchsten Gewinnrate je Region hervorheben"


#### code

**Type:** `string`

:::note{title=Beschreibung}
KI-generierter JavaScript-Filtercode

- Es dürfen nur integrierte Hilfsfunktionen verwendet werden (Zugriff über _ oder R)

- Eingabeparameter: data (Array); jedes item enthält __row_index als Zeilennummer

- Muss ein Array aus Zeilenindex- und Feldkombinationen zurückgeben: Array<{ __row_index: number, field: string }>

- __row_index steht für die Zeilennummer des ursprünglichen Dateneintrags, field für das hervorzuhebende Feld

- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen

:::

**Beispiel**
Das sales-Feld von Dateneinträgen mit sales über 1000 hervorheben
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Den Dateneintrag mit der höchsten Gewinnrate je Region hervorheben
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

Dateneinträge hervorheben, die mehrere Bedingungen erfüllen
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
Dimensionsfeld, die id eines Eintrags in dimensions

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

- in: Wählt Dateneinträge aus, deren Dimensionsfeldwert in value enthalten ist

- not in: Wählt Dateneinträge aus, deren Dimensionsfeldwert nicht in value enthalten ist

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

- in: Wählt Dateneinträge aus, deren Dimensionsfeldwert in value enthalten ist

- not in: Wählt Dateneinträge aus, deren Dimensionsfeldwert nicht in value enthalten ist

entspricht operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wählt den Wert des Dimensionsfelds im Dateneintrag aus; Arrays werden unterstützt

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

### lineVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Liniensegmente sichtbar sind

:::

### lineSmooth

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob Liniensegmente geglaettet werden

:::

### lineColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Farbe des Liniensegments

:::

### lineColorOpacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
Deckkraft der Liniensegmentfarbe

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Beschreibung}
Breite des Liniensegments

:::

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Beschreibung}
Liniensegmentstil

:::

**Beispiel**
`lineStyle: 'solid'`




## areaStyle

**Type:** `AreaStyle | AreaStyle[] | undefined`

:::note{title=Beschreibung}
Area mark style configuration, used to define area mark color, opacity, border, and related settings.

Unterstützt globale Stilkonfiguration oder bedingte Stilkonfiguration

Datenfilter




:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Beschreibung}
- not in: Wählt Datenelemente aus, bei denen der Dimensionsfeldwert nicht im `value`-Array enthalten ist.






:::

**Beispiel**
Strichfarbe des Balken-Primitives (Rechteck)
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]


selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]


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
Dimensionsfeld, die id eines Elements in dimensions
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.




wie operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wert des Dimensionsfelds im Datenelement auswählen; Arrays werden unterstützt
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}
Dynamischer Filter (Ausführung von KI-generiertem Code)

Implementiert komplexe Datenfilterlogik mit KI-generiertem JavaScript-Code

Geeignet für Szenarien, die mit statischen Selektoren schwer auszudrücken sind, z. B. Top N, statistische Analysen und komplexe Bedingungen

Kernfunktionen:

- Unterstützt beliebig komplexe Datenfilterbedingungen

- Verwendet integrierte Hilfsfunktionen für Datenoperationen

- Sichere Ausführung in der Browserumgebung (Web-Worker-Sandbox)

Umgebungsanforderung: Nur Browserumgebungen werden unterstützt; in Node.js wird fallback verwendet

Hinweis: selector und dynamicFilter können nicht gleichzeitig verwendet werden; dynamicFilter hat höhere Priorität

Konfiguration des dynamischen Diagrammfilters

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
"Balken mit Umsatz über 1000 hervorheben"

"Den Balken mit der höchsten Gewinnrate je Region hervorheben"


#### code

**Type:** `string`

:::note{title=Beschreibung}
KI-generierter JavaScript-Filtercode

- Es dürfen nur integrierte Hilfsfunktionen verwendet werden (Zugriff über _ oder R)

- Eingabeparameter: data (Array); jedes item enthält __row_index als Zeilennummer

- Muss ein Array aus Zeilenindex- und Feldkombinationen zurückgeben: Array<{ __row_index: number, field: string }>

- __row_index steht für die Zeilennummer des ursprünglichen Dateneintrags, field für das hervorzuhebende Feld

- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen

:::

**Beispiel**
Das sales-Feld von Dateneinträgen mit sales über 1000 hervorheben
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Den Dateneintrag mit der höchsten Gewinnrate je Region hervorheben
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

Dateneinträge hervorheben, die mehrere Bedingungen erfüllen
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
Dimensionsfeld, die id eines Eintrags in dimensions

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

- in: Wählt Dateneinträge aus, deren Dimensionsfeldwert in value enthalten ist

- not in: Wählt Dateneinträge aus, deren Dimensionsfeldwert nicht in value enthalten ist

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}
Operator

- in: Wählt Dateneinträge aus, deren Dimensionsfeldwert in value enthalten ist

- not in: Wählt Dateneinträge aus, deren Dimensionsfeldwert nicht in value enthalten ist

entspricht operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}
Wählt den Wert des Dimensionsfelds im Dateneintrag aus; Arrays werden unterstützt

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

### areaVisible

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Ob das Flaechenelement sichtbar ist



Ob das Flaechenelement sichtbar ist

:::

### areaColor

**Type:** `string | undefined`

:::note{title=Beschreibung}
Area mark color



Area mark color

:::

### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Beschreibung}
Area mark color opacity



Area mark color opacity

:::


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Beschreibung}
Sprache



Chart language configuration. Supports 'zh\-CN' and 'en\-US'. You can also call intl.setLocale('zh\-CN') to set the language.

:::
