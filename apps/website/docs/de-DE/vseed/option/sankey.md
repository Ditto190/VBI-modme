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
Zeitgranularität; bestimmt die Genauigkeit der Datumsanzeige

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

\- row: unterstützt das Zuordnen mehrerer Dimensionen zum Zeilenkanal, verwendet für pivot charts

\- column: unterstützt das Zuordnen mehrerer Dimensionen zum Spaltenkanal, verwendet für pivot charts

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
Kennzahl-ID, muss eindeutig sein

:::

### alias

**Type:** `string | undefined`

:::note{title=Beschreibung}
Kennzahlalias, Duplikate sind erlaubt; wenn nicht gesetzt, entspricht alias der id

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Beschreibung}
Automatische Zahlenformatierung, standardmäßig aktiviert, höchste Priorität

Wenn autoFormat=true ist, werden alle numFormat-Konfigurationen überschrieben

Wenn aktiviert, wählen Diagramm-Datenbeschriftungen und Tooltips automatisch die passende Formatierung anhand von Kennzahlwerten und Gebietsschema aus

Formatierungsregeln: Dezimalzahlen mit aktivierter compact notation, mindestens 0 und höchstens 2 Dezimalstellen, automatische Rundung, umgesetzt mit Intl.NumberFormat des Browsers

Zum Beispiel:

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Beschreibung}
Benutzerdefinierte Zahlenformatierung für Kennzahlen; wird automatisch auf Beschriftungen und Tooltips angewendet

Hinweis: Für benutzerdefinierte Formatierung muss autoFormat=false explizit gesetzt werden; andernfalls überschreibt autoFormat diese Konfiguration

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Zahlenformattyp, unterstützt: Zahl (Dezimal), Prozent (%), Promille (‰), wissenschaftliche Notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Verhältnis der Zahlenformatierung, darf nicht 0 sein

:::

**Beispiel**
\- 100000 wird zu 10W konvertiert, ratio:10000, symbol:"W"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Symbol der Zahlenformatierung, z. B. %, ‰

:::

**Beispiel**
\- 100000 wird zu 10W konvertiert, ratio:10000, symbol:"W"
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
Dezimalstellen für die Zahlenformatierung; verwendet minimumFractionDigits und maximumFractionDigits von Intl.NumberFormat im Browser; niedrigere Priorität als significantDigits

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
Signifikante Stellen für die Zahlenformatierung; verwendet minimumSignificantDigits und maximumSignificantDigits von Intl.NumberFormat im Browser; höhere Priorität als fractionDigits

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
Rundungspriorität der Zahlenformatierung, wenn sowohl significantDigits als auch fractionDigits gesetzt sind; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie dessen roundingPriority

:::

**Beispiel**
\- 1234.5678 wird zu 1230 konvertiert, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus der Zahlenformatierung; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie dessen roundingMode

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Beschreibung}
Zahlenformattyp, unterstützt: Zahl (Dezimal), Prozent (%), Promille (‰), wissenschaftliche Notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Beschreibung}
Verhältnis der Zahlenformatierung, darf nicht 0 sein

:::

**Beispiel**
\- 100000 wird zu 10W konvertiert, ratio:10000, symbol:"W"
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}
Symbol der Zahlenformatierung, z. B. %, ‰

:::

**Beispiel**
\- 100000 wird zu 10W konvertiert, ratio:10000, symbol:"W"
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
Dezimalstellen für die Zahlenformatierung; verwendet minimumFractionDigits und maximumFractionDigits von Intl.NumberFormat im Browser; niedrigere Priorität als significantDigits

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
Signifikante Stellen für die Zahlenformatierung; verwendet minimumSignificantDigits und maximumSignificantDigits von Intl.NumberFormat im Browser; höhere Priorität als fractionDigits

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
Rundungspriorität der Zahlenformatierung, wenn sowohl significantDigits als auch fractionDigits gesetzt sind; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie dessen roundingPriority

:::

**Beispiel**
\- 1234.5678 wird zu 1230 konvertiert, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}
Rundungsmodus der Zahlenformatierung; verwendet Intl.NumberFormat des Browsers und folgt denselben Regeln wie dessen roundingMode

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
Es gibt zwei Möglichkeiten, den Kennzahlbaum zu konfigurieren: Option 1 konfiguriert den Kennzahlbaum direkt mit children; Option 2 konfiguriert eine flache Kennzahlliste mit parentId. Beide Methoden können nicht gleichzeitig verwendet werden

:::


## page

**Type:** `Page | undefined`

:::note{title=Beschreibung}




Legt den Feldnamen für die Paginierung fest; muss eine Dimension sein

:::


### field

**Type:** `string`

:::note{title=Beschreibung}
Beschreibung der Filteranforderung des Benutzers (natürliche Sprache)


:::

### currentValue

**Type:** `string`

:::note{title=Beschreibung}
Von der KI generierter JavaScript-Filtercode

\- Es dürfen nur integrierte Hilfsfunktionen verwendet werden (Zugriff über _ oder R)

\- Eingabeparameter: data (Array); jedes item enthält das Feld __row_index für die Zeilennummer

\- Muss ein Array aus Zeilenindex- und Feldkombinationen zurückgeben: Array<{ __row_index: number, field: string }>

\- __row_index steht für die Zeilennummer des ursprünglichen Dateneintrags, field für das hervorzuhebende Feld

\- Verboten: eval, Function, asynchrone Operationen, DOM API, Netzwerkanfragen


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


:::

**Beispiel**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


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


:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Beschreibung}






:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Beschreibung}






:::

### showDimension

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


:::

**Beispiel**
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"




#### symbol

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
\- 100000 wird zu 10K konvertiert, ratio:1000, symbol:"K"




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
\- 1234.5678 wird zu 1234.6 konvertiert, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.57 konvertiert, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1230.568 konvertiert, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.5678 konvertiert, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 wird zu 1234.56780 konvertiert, fractionDigits:5 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=Beschreibung}


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


:::

**Beispiel**
\- 1234.5678 wird zu 1234.5678 konvertiert, significantDigits:3 (roundingPriority:morePrecision)




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Beschreibung}


:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Beschreibung}


:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Beschreibung}


:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


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






:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}








:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Beschreibung}
































:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**
"Balken mit Umsatz über 1000 hervorheben"

"Balken mit der höchsten Gewinnmarge je Region hervorheben"



#### code

**Type:** `string`

:::note{title=Beschreibung}














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


:::


##### field

**Type:** `string`

:::note{title=Beschreibung}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}






:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Beschreibung}








:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Beschreibung}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Beschreibung}






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


:::

**Beispiel**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=Beschreibung}


:::

:::warning{title=Warning}


:::

**Beispiel**




### labelColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**




### labelFontColor

**Type:** `string | undefined`

:::note{title=Beschreibung}


:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**




### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Beschreibung}


:::

:::warning{title=Warning}


:::

**Beispiel**




### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Beschreibung}


:::

**Beispiel**




### maxSize

**Type:** `number | undefined`

:::note{title=Beschreibung}






:::

:::warning{title=Warning}


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


:::


## theme

**Type:** `Theme | undefined`

:::note{title=Beschreibung}
Diagramm-Theme

Theme

Integrierte Themes light und dark; neue Themes können über registerTheme angepasst werden.

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
