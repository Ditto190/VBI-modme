# Radar

:::info{title=Recommendation}
\- Recommended field configuration: `1` measure and `1` dimension

\- Supports data reshaping: at least `1` measure and `0` dimensions

:::

:::info{title=Encoding Mapping}
Radar charts support the following visual channels:

`angle`  : Angle channel, supports `multiple dimensions`, mapped to the angle axis by dimension value

`radius` : Radius channel, supports `multiple measures`, mapped to the radius axis by measure value

`color`  : Color channel, supports `multiple dimensions` or `one measure`; dimension colors distinguish data series, while measure colors linearly map measure values to graphic colors

`tooltip`: Tooltip channel, supports `multiple dimensions` and `multiple measures`, shown when hovering over data points

`label`  : Label channel, supports `multiple dimensions` and `multiple measures`, displayed as data labels on data points

:::

:::note{title=Description}
Radar chart, suitable for comparative analysis of multidimensional data, showing value distribution across dimensions through a multi-axis coordinate system

Anwendungsszenarien:

\- Compare overall performance across multidimensional data

\- Evaluate multiple objects across multiple measures

\- Show multidimensional features of categorical data

:::

:::warning{title=Warning}
Data requirements:

\- At least one numeric field (measure)

\- The first dimension becomes the radar axes; other dimensions are compared as different series

\- Supports displaying multiple measures as separate series

Features enabled by default:

\- Legend, radar coordinate system, data labels, tooltip, and value scaling are enabled by default

:::


## chartType

**Type:** `"radar"`

:::note{title=Description}
Radar chart



Radar chart, showing multidimensional comparison through a multi-axis coordinate system

:::

**Example**
'radar'




## dataset

**Type:** `Record[]`

:::note{title=Description}
Datensatz



An aggregated dataset that conforms to the TidyData specification. It defines the chart data source and structure. User input does not need preprocessing because VSeed reshapes data automatically. Radar chart data is eventually converted to two dimensions and one measure.

:::

**Example**
[{month:'Jan', value:100}, {month:'Feb', value:150}, {month:'Mar', value:120}]




## dimensions

**Type:** `RadarDimension[] | undefined`

:::note{title=Description}
Die erste Dimension wird der X-Achse zugeordnet; die verbleibenden Dimensionen werden mit Kennzahlnamen (wenn mehrere Kennzahlen vorhanden sind) zusammengeführt und als Legendeneinträge angezeigt.



The first dimension of a radar chart is mapped to the angle axis; the remaining dimensions are merged with measure names when multiple measures exist and displayed as legend items.

:::

**Example**
[{id: 'category', alias: 'Category'}]




### id

**Type:** `string`

:::note{title=Description}
Feld-ID, die der Dimension entspricht

:::

### alias

**Type:** `string | undefined`

:::note{title=Description}
Dimensionsalias

:::

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=Description}
Datumsformatkonfiguration der Dimension

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=Description}
Zeitgranularitat, bestimmt die Genauigkeit der Datumsanzeige

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "angle" | undefined`

:::note{title=Description}
Kanal, dem die Dimension zugeordnet wird

\- angle: supports mapping multiple dimensions to the angle channel

\- color: unterstützt die Zuordnung mehrerer Dimensionen zum Farbkanal

\- detail: unterstützt die Zuordnung mehrerer Dimensionen zum Detailkanal

\- tooltip: unterstützt die Zuordnung mehrerer Dimensionen zum Tooltip-Kanal

\- label: unterstützt die Zuordnung mehrerer Dimensionen zum Beschriftungskanal

\- row: unterstützt die Zuordnung mehrerer Dimensionen zum Zeilenkanal

\- column: unterstützt die Zuordnung mehrerer Dimensionen zum Spaltenkanal

:::


## measures

**Type:** `RadarMeasure[] | undefined`

:::note{title=Description}
Kennzahlen



Radar chart measures are automatically merged into one measure and mapped to the radius axis. When multiple measures exist, measure names are merged with other dimensions and displayed as legend items.

:::

**Example**
[{id: 'value', alias: 'Value'}]




### id

**Type:** `string`

:::note{title=Description}
Kennzahl-ID, muss eindeutig sein

:::

### alias

**Type:** `string | undefined`

:::note{title=Description}
Alias der Kennzahl, Duplikate sind zulässig; wenn nicht gesetzt, wird die ID als Alias verwendet

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
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

:::note{title=Description}
Benutzerdefinierte Zahlenformatierung fur Kennzahlen; wird automatisch auf Beschriftungen und Tooltips angewendet.

Hinweis: Um benutzerdefinierte Formatierung zu verwenden, muss autoFormat explizit auf false gesetzt werden; andernfalls uberschreibt autoFormat diese Konfiguration.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Zahlenformatierungsverhältnis, darf nicht 0 sein

:::

**Example**

Maximale Länge für Beschriftungsbegrenzung. Wenn die Textlänge diesen Wert überschreitet, wird sie mit Auslassungspunkten gekürzt und beim Hover sichtbar (nur für Kategorieachsen wirksam).



#### symbol

**Type:** `string | undefined`

:::note{title=Description}


:::

**Example**

Maximale Länge für Beschriftungsbegrenzung. Wenn die Textlänge diesen Wert überschreitet, wird sie mit Auslassungspunkten gekürzt und beim Hover sichtbar (nur für Kategorieachsen wirksam).



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}
**Type:** `string | undefined`

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Description}
**Type:** `number | undefined`

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}
**Type:** `number[] | undefined`

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}
**Type:** `{ duration?: number; easing?: string; } | undefined`

:::

**Example**
Beschriftung font weight


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)

**Type:** `number | undefined`



#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
**Type:** `string | undefined`

:::

**Example**



**Type:** `boolean | undefined`

**Type:** `YBandAxis | undefined`

\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}


:::

**Example**

Achsenlinie width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Rundungsmodus der Zahlenformatierung; wird mit Intl.NumberFormat des Browsers formatiert, Regeln entsprechen roundingMode in Intl.NumberFormat

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Zahlenformatierungsverhältnis, darf nicht 0 sein

:::

**Example**

Maximale Länge für Beschriftungsbegrenzung. Wenn die Textlänge diesen Wert überschreitet, wird sie mit Auslassungspunkten gekürzt und beim Hover sichtbar (nur für Kategorieachsen wirksam).



#### symbol

**Type:** `string | undefined`

:::note{title=Description}


:::

**Example**

Maximale Länge für Beschriftungsbegrenzung. Wenn die Textlänge diesen Wert überschreitet, wird sie mit Auslassungspunkten gekürzt und beim Hover sichtbar (nur für Kategorieachsen wirksam).



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}
**Type:** `string | undefined`

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Description}
**Type:** `number | undefined`

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}
**Type:** `number[] | undefined`

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}
**Type:** `{ duration?: number; easing?: string; } | undefined`

:::

**Example**
Beschriftung font weight


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)

**Type:** `number | undefined`



#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
**Type:** `string | undefined`

:::

**Example**



**Type:** `boolean | undefined`

**Type:** `YBandAxis | undefined`

\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}


:::

**Example**

Achsenlinie width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Rundungsmodus der Zahlenformatierung; wird mit Intl.NumberFormat des Browsers formatiert, Regeln entsprechen roundingMode in Intl.NumberFormat

:::

### encoding

**Type:** `"color" | "tooltip" | "label" | "radius" | undefined`

:::note{title=Description}
Kanal, dem die Kennzahl zugeordnet wird

\- radius: radius mapped from the measure

\- color: Measure mapped to the color channel

\- label: Measure mapped to the label channel

\- tooltip: Measure mapped to the tooltip channel

:::

### parentId

**Type:** `string | undefined`

:::note{title=Description}
Erstellt eine baumformige Kennzahlgruppe in flacher Kennzahlkonfiguration. parentId verweist auf die ID der ubergeordneten Kennzahlgruppe und dient zum Aufbau des Kennzahlbaums.

:::

:::tip{title=Tip}
Es gibt zwei Moglichkeiten, den Kennzahlbaum zu konfigurieren: Option 1 konfiguriert direkt einen Kennzahlbaum mit children; Option 2 konfiguriert eine flache Kennzahlliste mit parentId. Beide Methoden konnen nicht gleichzeitig verwendet werden.

:::


## page

**Type:** `Page | undefined`

:::note{title=Description}
Paging configuration, used to specify the paging field name; it must be a dimension

:::


### field

**Type:** `string`

:::note{title=Description}
Paginierungsfeld; legt den Feldnamen für die Paginierung fest und muss eine Dimension sein.

:::

### currentValue

**Type:** `string`

:::note{title=Description}
Aktueller Paginierungswert; legt den Wert fest, mit dem die aktuelle Seite bestimmt wird.

:::

**Example**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Description}
Chart background color



The background color can be a color string such as 'red' or 'blue', or hex, rgb, or rgba values such as '#ff0000' and 'rgba(255,0,0,0.5)'

:::


## color

**Type:** `Color | undefined`

:::note{title=Description}
Farbe



Color configuration, used to define chart color schemes including color lists, color mappings, and gradients.

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Description}
Diskretes Farbschema zur Definition der Farben verschiedener Elemente im Diagramm.

:::

**Example**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Description}
Lineares Verlaufsfarbschema zur Definition der Farben verschiedener Elemente im Diagramm.

:::

**Example**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Description}
Farbzuordnung, mit der Datenwerte bestimmten Farben zugeordnet werden.

:::

**Example**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Description}
Positiv/Negativ-Farbkonfiguration; definiert die Farbe für positive Werte im Diagramm.

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Description}
Positiv/Negativ-Farbkonfiguration; definiert die Farbe für negative Werte im Diagramm.

:::


## label

**Type:** `Label | undefined`

:::note{title=Description}
Beschriftung



Label configuration, used to define data label position, format, style, and related settings.

:::


### enable

**Type:** `false | true`

:::note{title=Description}
Ob die Beschriftungsfunktion aktiviert ist.

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Description}
Ob Beschriftungen in die nächste Zeile umbrechen.

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Description}
Ob Beschriftungen Kennzahlwerte anzeigen.

In Szenarien mit mehreren Kennzahlen müssen keine widersprüchlichen Werte befürchtet werden, da alle darstellungsbezogenen Kennzahlen durch `foldMeasures` verarbeitet und zu einer Kennzahl zusammengeführt werden, die einen einzelnen Datenpunkt repräsentiert.

Hinweis: Das label in encoding hat eine hohere Prioritat; diese Konfiguration beeinflusst das label in encoding nicht.

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Description}
Ob Beschriftungen Kennzahlwerte als Prozentwerte anzeigen.

In Szenarien mit mehreren Kennzahlen müssen keine widersprüchlichen Werte befürchtet werden, da alle darstellungsbezogenen Kennzahlen durch `foldMeasures` verarbeitet und zu einer Kennzahl zusammengeführt werden, die einen einzelnen Datenpunkt repräsentiert.

Hinweis: Das label in encoding hat eine hohere Prioritat; diese Konfiguration beeinflusst das label in encoding nicht.

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Description}
Ob Beschriftungen Dimensionslabels anzeigen.

Zeigt alle Dimensionsbeschriftungen an.

Hinweis: Das label in encoding hat eine hohere Prioritat; diese Konfiguration beeinflusst das label in encoding nicht.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Ob Beschriftungswerte automatisch formatiert werden; wenn autoFormat true ist, wird die numFormat-Konfiguration ignoriert.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Formatkonfiguration fur Beschriftungswerte; wird mit `format` in `measure` zusammengefuhrt, wobei `format` in `measure` hohere Prioritat hat. numFormat hat eine niedrigere Prioritat als autoFormat.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Zahlenformatierungsverhältnis, darf nicht 0 sein

:::

**Example**

Maximale Länge für Beschriftungsbegrenzung. Wenn die Textlänge diesen Wert überschreitet, wird sie mit Auslassungspunkten gekürzt und beim Hover sichtbar (nur für Kategorieachsen wirksam).



#### symbol

**Type:** `string | undefined`

:::note{title=Description}


:::

**Example**

Maximale Länge für Beschriftungsbegrenzung. Wenn die Textlänge diesen Wert überschreitet, wird sie mit Auslassungspunkten gekürzt und beim Hover sichtbar (nur für Kategorieachsen wirksam).



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}
**Type:** `string | undefined`

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Description}
**Type:** `number | undefined`

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}
**Type:** `number[] | undefined`

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}
**Type:** `{ duration?: number; easing?: string; } | undefined`

:::

**Example**
Beschriftung font weight


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)

**Type:** `number | undefined`



#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
**Type:** `string | undefined`

:::

**Example**



**Type:** `boolean | undefined`

**Type:** `YBandAxis | undefined`

\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}


:::

**Example**

Achsenlinie width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Rundungsmodus der Zahlenformatierung; wird mit Intl.NumberFormat des Browsers formatiert, Regeln entsprechen roundingMode in Intl.NumberFormat

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}


:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Description}
Maximale Hohe des Rechtecks; kann ein Pixelwert oder eine Prozentzeichenfolge sein.

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Hintergrundfarbe der Beschriftung

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Description}
Strichfarbe der Beschriftung

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Schriftfarbe der Beschriftung

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Description}
Ob die Schriftfarbe der Beschriftung basierend auf der Elementfarbe automatisch invertiert wird.

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Description}
Beschriftungsposition

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Description}
Ob die Behandlung von Beschriftungsuberlappungen aktiviert ist.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Beschriftungsauswahl; Bedingungen zwischen Selektoren sind standardmassig OR.

:::


#### field

**Type:** `string`

:::note{title=Description}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.

**Type:** `number | undefined`



:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.

**Type:** `number | undefined`



same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
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

:::note{title=Description}


:::

**Example**
"Balken mit Umsatz über 1000 hervorheben"

"Balken mit der höchsten Gewinnrate in jeder Region hervorheben"



#### code

**Type:** `string`

:::note{title=Description}
Operator



\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert nicht im Wert enthalten ist



Horizontaler Versatz des Anmerkungspunkts in Pixeln. Wenn der Punkt links liegt (Start der Kategorieachse), wird ein positiver Wert empfohlen; wenn er rechts liegt (Ende der Kategorieachse), ein negativer Wert.

Ein negativer Wert verschiebt die gesamte Komponente nach links (z. B. -10).

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::

**Example**
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

:::note{title=Description}


:::


##### field

**Type:** `string`

:::note{title=Description}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.

**Type:** `number | undefined`



:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.

**Type:** `number | undefined`



same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert NICHT in der Werteliste enthalten ist.



Textfarbe

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`


## legend

**Type:** `Legend | undefined`

:::note{title=Description}
Legende



Legend configuration, used to define legend position, format, style, and related settings.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Ob die Legendenfunktion aktiviert ist.

:::

**Example**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=Description}
Ob der Legendenrahmen aktiviert ist.

:::

:::warning{title=Warning}
Gilt nur fur diskrete Legenden.

:::

**Example**
border: true



### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Schriftfarbe der Legende.

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Description}
Farbe des Paginationssymbols.

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Description}
Farbe des deaktivierten/ausgegrauten Paginationssymbols.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Schriftgröße der Legende.

:::

**Example**
labelFontSize: 10



### labelFontColor

**Type:** `string | undefined`

:::note{title=Description}
Schriftfarbe der Legende.

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Description}
Schriftstärke der Legende.

:::

**Example**
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Description}
Formtyp der Legende.

:::

:::warning{title=Warning}
Gilt nur fur diskrete Legenden.

:::

**Example**
shapeType: 'circle'



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Description}
Legendenposition

:::

**Example**
position: 'rightTop'



### maxSize

**Type:** `number | undefined`

:::note{title=Description}
Maximale Anzahl von Spalten oder Zeilen bei vielen Legendeneintragen.

Wenn position horizontal ist (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), steuert maxSize die Anzahl der angezeigten Spalten.

Wenn position vertikal ist (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), steuert maxSize die Anzahl der angezeigten Zeilen.

:::

:::warning{title=Warning}
Gilt nur fur diskrete Legenden.

:::

**Example**
maxSize: 2




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Description}
Tooltip



Tooltip configuration, used to define tooltip position, format, style, and related settings.

:::


### enable

**Type:** `false | true`

:::note{title=Description}


:::


## brush

**Type:** `Brush | undefined`

:::note{title=Description}
Brush-Auswahl



Brush selection configuration, used to enable or disable brush selection.



\- `y`: Y-Achsen-Brush; wahlt nur in Y-Achsenrichtung, auf der X-Achse uneingeschrankt.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}


:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Description}
**Type:** `XLinearAxis | undefined`



**Type:** `boolean | undefined`









:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Description}




**Type:** `number | boolean | undefined`

**Type:** `number | undefined`



:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Description}


:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Description}






:::


#### opacity

**Type:** `number | undefined`

:::note{title=Description}
\- 100000 wird zu 10W konvertiert, ratio:10000, symbol:"W"



Definiert den Stil der Datenpunkte ausserhalb der Auswahl.

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Description}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
**Type:** `boolean | undefined`

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
X-Achse, Kategorieachse, X-Achsenkonfiguration; definiert die X-Achse des Diagramms einschliesslich Position, Format, Stil usw.





:::


#### opacity

**Type:** `number | undefined`

:::note{title=Description}
\- 100000 wird zu 10W konvertiert, ratio:10000, symbol:"W"





:::

#### stroke

**Type:** `string | undefined`

:::note{title=Description}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
**Type:** `boolean | undefined`

:::


## animation

**Type:** `RadarAnimation | undefined`

:::note{title=Description}
Animationskonfiguration



Chart animation configuration; available effects are constrained by chart type

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether radar chart animation is enabled

:::

### params

**Type:** `RadarAnimationParams | undefined`

:::note{title=Description}
Radar chart animation parameters

:::


#### appear

**Type:** `RadarAppearAnimation | undefined`

:::note{title=Description}
Radar chart appear animation configuration

:::


##### effects

**Type:** `("radial" | "scale")[] | undefined`

:::note{title=Description}
Radar chart appear effects, supporting radial and scale animations

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the current animation stage is enabled

:::

##### ease

**Type:** `string | undefined`

:::note{title=Description}
Animation easing function

:::

##### duration

**Type:** `number | undefined`

:::note{title=Description}
Animation duration, in milliseconds

:::

##### color

**Type:** `string | undefined`

:::note{title=Description}
Animation highlight or atmosphere color

:::

#### update

**Type:** `RadarUpdateAnimation | undefined`

:::note{title=Description}
Radar chart update animation configuration

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=Description}
Radar chart update effects, supporting grow animation

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the current animation stage is enabled

:::

##### ease

**Type:** `string | undefined`

:::note{title=Description}
Animation easing function

:::

##### duration

**Type:** `number | undefined`

:::note{title=Description}
Animation duration, in milliseconds

:::

##### color

**Type:** `string | undefined`

:::note{title=Description}
Animation highlight or atmosphere color

:::

#### loop

**Type:** `RadarAnimationLoop | undefined`

:::note{title=Description}
Radar chart loop animation configuration

:::


##### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether loop animation is enabled

:::

##### interval

**Type:** `number | undefined`

:::note{title=Description}
Loop animation interval, in milliseconds

:::

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title=Description}
Radar chart atmosphere animation configuration

:::


###### ease

**Type:** `string | undefined`

:::note{title=Description}
Atmosphere animation easing function

:::

###### color

**Type:** `string | undefined`

:::note{title=Description}
Atmosphere animation color

:::

###### effect

**Type:** `PointAtmosphereEffect | undefined`

:::note{title=Description}
Atmosphere animation effect, supporting ripple, visibility, and breathing effects

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Description}
Chart theme. Theme is a lower-priority functional configuration that includes common settings shared by all chart types and by a single chart type.



Two built-in themes are provided: light and dark. Users can customize themes through Builder.



Operator



\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert NICHT in der Werteliste enthalten ist.

:::

**Example**
'dark'

'light'

'customThemeName'




### length

**Type:** `number`

### brand

**Type:** `brand`


## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note{title=Description}
Point mark style configuration, used to define point mark color, border, and related settings.

Supports global style or conditional style configuration

Datenfilter

**Type:** `string | undefined`



:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
- not in: Wählt Datenelemente aus, bei denen der Dimensionsfeldwert nicht im `value`-Array enthalten ist.



**Type:** `string | undefined`



:::

**Example**
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

:::note{title=Description}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.

**Type:** `number | undefined`



:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.

**Type:** `number | undefined`



same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
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

:::note{title=Description}


:::

**Example**
"Balken mit Umsatz über 1000 hervorheben"

"Balken mit der höchsten Gewinnrate in jeder Region hervorheben"



#### code

**Type:** `string`

:::note{title=Description}
Operator



\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert nicht im Wert enthalten ist



Horizontaler Versatz des Anmerkungspunkts in Pixeln. Wenn der Punkt links liegt (Start der Kategorieachse), wird ein positiver Wert empfohlen; wenn er rechts liegt (Ende der Kategorieachse), ein negativer Wert.

Ein negativer Wert verschiebt die gesamte Komponente nach links (z. B. -10).

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::

**Example**
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

:::note{title=Description}


:::


##### field

**Type:** `string`

:::note{title=Description}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.

**Type:** `number | undefined`



:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.

**Type:** `number | undefined`



same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert NICHT in der Werteliste enthalten ist.



Textfarbe

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### pointVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Ob Punkte sichtbar sind

:::

### pointSize

**Type:** `number | undefined`

:::note{title=Description}
Punktgroesse



Punktgroesse

:::

### pointColor

**Type:** `string | undefined`

:::note{title=Description}
Farbe der Punktmarke



Farbe der Punktmarke

:::

### pointColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
Deckkraft der Punktmarkenfarbe



Deckkraft der Punktmarkenfarbe

:::

### pointBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Rahmenfarbe der Punktmarke



Rahmenfarbe der Punktmarke

:::

### pointBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Rahmenbreite der Punktmarke



Rahmenbreite der Punktmarke

:::

### pointBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Rahmenstil der Punktmarke



Rahmenstil der Punktmarke

:::

**Example**
solid

dashed

dotted




## lineStyle

**Type:** `LineStyle | LineStyle[] | undefined`

:::note{title=Description}
Line mark style configuration, used to define line mark color, opacity, curve, and related settings.

Supports global style or conditional style configuration

Datenfilter

**Type:** `string | undefined`



:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
- not in: Wählt Datenelemente aus, bei denen der Dimensionsfeldwert nicht im `value`-Array enthalten ist.



**Type:** `string | undefined`



:::

**Example**
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

:::note{title=Description}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.

**Type:** `number | undefined`



:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.

**Type:** `number | undefined`



same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
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

:::note{title=Description}


:::

**Example**
"Balken mit Umsatz über 1000 hervorheben"

"Balken mit der höchsten Gewinnrate in jeder Region hervorheben"



#### code

**Type:** `string`

:::note{title=Description}
Operator



\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert nicht im Wert enthalten ist



Horizontaler Versatz des Anmerkungspunkts in Pixeln. Wenn der Punkt links liegt (Start der Kategorieachse), wird ein positiver Wert empfohlen; wenn er rechts liegt (Ende der Kategorieachse), ein negativer Wert.

Ein negativer Wert verschiebt die gesamte Komponente nach links (z. B. -10).

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::

**Example**
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

:::note{title=Description}


:::


##### field

**Type:** `string`

:::note{title=Description}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.

**Type:** `number | undefined`



:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.

**Type:** `number | undefined`



same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert NICHT in der Werteliste enthalten ist.



Textfarbe

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### lineVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Ob Liniensegmente sichtbar sind

:::

### lineSmooth

**Type:** `boolean | undefined`

:::note{title=Description}
Ob Liniensegmente geglaettet werden

:::

### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Farbe des Liniensegments

:::

### lineColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
Deckkraft der Liniensegmentfarbe

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Breite des Liniensegments

:::

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Liniensegmentstil

:::

**Example**
`lineStyle: 'solid'`




## areaStyle

**Type:** `AreaStyle | AreaStyle[] | undefined`

:::note{title=Description}
Area mark style configuration, used to define area mark color, opacity, border, and related settings.

Supports global style or conditional style configuration

Datenfilter

**Type:** `string | undefined`



:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
- not in: Wählt Datenelemente aus, bei denen der Dimensionsfeldwert nicht im `value`-Array enthalten ist.



**Type:** `string | undefined`



:::

**Example**
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

:::note{title=Description}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.

**Type:** `number | undefined`



:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.

**Type:** `number | undefined`



same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
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

:::note{title=Description}


:::

**Example**
"Balken mit Umsatz über 1000 hervorheben"

"Balken mit der höchsten Gewinnrate in jeder Region hervorheben"



#### code

**Type:** `string`

:::note{title=Description}
Operator



\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert nicht im Wert enthalten ist



Horizontaler Versatz des Anmerkungspunkts in Pixeln. Wenn der Punkt links liegt (Start der Kategorieachse), wird ein positiver Wert empfohlen; wenn er rechts liegt (Ende der Kategorieachse), ein negativer Wert.

Ein negativer Wert verschiebt die gesamte Komponente nach links (z. B. -10).

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::

**Example**
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

:::note{title=Description}


:::


##### field

**Type:** `string`

:::note{title=Description}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.

**Type:** `number | undefined`



:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Ob Beschriftungen angezeigt werden, die dem Crosshair entsprechen.

**Type:** `number | undefined`



same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
\- not in: Wahlt Datenelemente aus, deren Dimensionsfeldwert NICHT in der Werteliste enthalten ist.



Textfarbe

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### areaVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the area mark is visible



Whether the area mark is visible

:::

### areaColor

**Type:** `string | undefined`

:::note{title=Description}
Area mark color



Area mark color

:::

### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
Area mark color opacity



Area mark color opacity

:::


## locale

**Type:** `Locale | undefined`

:::note{title=Description}
Sprache



Chart language configuration. Supports 'zh\-CN' and 'en\-US'. You can also call intl.setLocale('zh\-CN') to set the language.

:::

