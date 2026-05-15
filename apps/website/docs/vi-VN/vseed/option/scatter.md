# Scatter

:::info{title=Recommendation}
\- Recommended field configuration: `2` measures and `1` dimension

\- Supports data reshaping: at least `1` measure and `0` dimensions

:::

:::info{title=Encoding Mapping}
Scatter charts support the following visual channels:

`xAxis`  : X-axis channel, supports `multiple measures`, mapped to the X-axis by measure value

`yAxis`  : Y-axis channel, supports `multiple measures`, mapped to the Y-axis by measure value

`color`  : Color channel, supports `multiple dimensions` or `one measure`; dimension colors distinguish data series, while measure colors linearly map measure values to graphic colors

`tooltip`: Tooltip channel, supports `multiple dimensions` and `multiple measures`, shown when hovering over data points

`label`  : Label channel, supports `multiple dimensions` and `multiple measures`, displayed as data labels on data points

:::

:::note{title=Mo ta}
Scatter chart, suitable for showing data distribution with point positions representing data values

Tinh huong su dung:

\- Analyze distribution characteristics such as central tendency, range, and outliers

:::

:::warning{title=Warning}
Data requirements:

\- At least two numeric fields (measures)

\- The first measure field is placed on the X-axis, and the remaining measures are merged and mapped to the Y-axis

\- Measure names and dimension names are merged and displayed as legend items

Features enabled by default:

\- Legend, axes, data point markers, tooltips, and trend lines are enabled by default

:::


## chartType

**Type:** `"scatter"`

:::note{title=Mo ta}
Bieu do phan tan



Scatter chart, suitable for showing data distribution with point positions representing data values

:::

**Vi du**
'scatter'




## dataset

**Type:** `Record[]`

:::note{title=Mo ta}
Tap du lieu



An aggregated dataset that conforms to the TidyData specification. It defines the chart data source and structure. User input does not need preprocessing because VSeed reshapes data automatically. Scatter chart data is eventually converted to two dimensions and one measure.

:::

**Vi du**
[{month:'Thang 1', value:100}, {month:'Thang 2', value:150}, {month:'Thang 3', value:120}]




## dimensions

**Type:** `ScatterDimension[] | undefined`

:::note{title=Mo ta}
Chiều đầu tiên được ánh xạ tới trục X; các chiều còn lại được gộp với tên chỉ số (khi có nhiều chỉ số) và hiển thị dưới dạng mục chú giải.



The first dimension in a scatter chart is mapped to the X-axis; the remaining dimensions are merged with measure names when multiple measures exist and displayed as legend items

:::

**Vi du**
[{id: "month", alias: "Thang"}]




### id

**Type:** `string`

:::note{title=Mo ta}
ID trường tương ứng với chiều

:::

### alias

**Type:** `string | undefined`

:::note{title=Mo ta}
Bí danh chiều

:::

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=Mo ta}
Cấu hình định dạng ngày của chiều

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=Mo ta}
Độ hạt thời gian, quyết định độ chính xác khi hiển thị ngày

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title=Mo ta}
Kênh mà chiều được ánh xạ tới

\- color: hỗ trợ ánh xạ nhiều chiều tới kênh màu

\- detail: hỗ trợ ánh xạ nhiều chiều tới kênh chi tiết

\- tooltip: hỗ trợ ánh xạ nhiều chiều vào kênh tooltip

\- label: hỗ trợ ánh xạ nhiều chiều vào kênh nhãn

\- row: hỗ trợ ánh xạ nhiều chiều tới kênh hàng

\- column: hỗ trợ ánh xạ nhiều chiều tới kênh cột

:::


## measures

**Type:** `ScatterMeasure[] | undefined`

:::note{title=Mo ta}
Scatter chart measures

:::

**Vi du**
[
  {
    id: 'profit', alias: 'Loi nhuan', encoding: 'xAxis'
  },
  {
    id: 'sales', alias: 'Doanh so', encoding: 'yAxis'
  }
]




### id

**Type:** `string`

:::note{title=Mo ta}
ID chỉ số, không được trùng lặp

:::

### alias

**Type:** `string | undefined`

:::note{title=Mo ta}
Bí danh chỉ số, cho phép trùng lặp; nếu không đặt, alias mặc định là id

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Định dạng số tự động, bật mặc định, có độ ưu tiên cao nhất

Khi autoFormat=true, toàn bộ cấu hình numFormat sẽ bị ghi đè

Khi bật, nhãn dữ liệu và tooltip của biểu đồ sẽ tự động chọn định dạng phù hợp theo giá trị chỉ số và locale

Quy tắc định dạng: số thập phân bật compact notation, tối thiểu 0 chữ số thập phân, tối đa 2 chữ số thập phân, tự động làm tròn, dùng Intl.NumberFormat của trình duyệt

Ví dụ:

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mo ta}
Định dạng số tùy chỉnh cho chỉ số; tự động áp dụng cho nhãn và tooltip

Lưu ý: để dùng định dạng tùy chỉnh, cần đặt rõ autoFormat=false; nếu không autoFormat sẽ ghi đè cấu hình này

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mo ta}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mo ta}


:::

**Vi du**





#### symbol

**Type:** `string | undefined`

:::note{title=Mo ta}

:::

**Vi du**





#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

#### suffix

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

#### prefix

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Mo ta}

:::

**Vi du**


Hàm easing của hoạt ảnh






#### significantDigits

**Type:** `number | undefined`

:::note{title=Mo ta}
Cấu hình sắp xếp trục phân loại, hỗ trợ sắp xếp theo dimension hoặc measure, và thứ tự tùy chỉnh

:::

**Vi du**
sort: {
  orderBy: 'profit',
  order: 'asc',
}
sort: {
  customOrder:['2019', '2020', '2021']
}




#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mo ta}


:::

**Vi du**
Thứ tự sắp xếp, giá trị tùy chọn là 'asc' hoặc 'desc'




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mo ta}


:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mo ta}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mo ta}


:::

**Vi du**





#### symbol

**Type:** `string | undefined`

:::note{title=Mo ta}

:::

**Vi du**





#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

#### suffix

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

#### prefix

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Mo ta}

:::

**Vi du**


Hàm easing của hoạt ảnh






#### significantDigits

**Type:** `number | undefined`

:::note{title=Mo ta}
Cấu hình sắp xếp trục phân loại, hỗ trợ sắp xếp theo dimension hoặc measure, và thứ tự tùy chỉnh

:::

**Vi du**
sort: {
  orderBy: 'profit',
  order: 'asc',
}
sort: {
  customOrder:['2019', '2020', '2021']
}




#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mo ta}


:::

**Vi du**
Thứ tự sắp xếp, giá trị tùy chọn là 'asc' hoặc 'desc'




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mo ta}


:::

### encoding

**Type:** `"xAxis" | "color" | "tooltip" | "label" | "yAxis" | "size" | undefined`

:::note{title=Mo ta}
Kênh mà chỉ số được ánh xạ tới

\- xAxis: Measure mapped to the X-axis

\- yAxis: chỉ số được ánh xạ tới trục y

\- size: size mapped from the measure

\- color: chỉ số được ánh xạ tới kênh màu

\- label: chỉ số được ánh xạ vào kênh nhãn

\- tooltip: chỉ số được ánh xạ vào kênh tooltip

:::

### parentId

**Type:** `string | undefined`

:::note{title=Mo ta}
Ở dạng cấu hình chỉ số phẳng, xây dựng nhóm chỉ số dạng cây. parentId trỏ tới id của nhóm chỉ số cha và dùng để xây dựng cây chỉ số

:::

:::tip{title=Tip}
Có hai cách cấu hình cây chỉ số: Cách 1 cấu hình trực tiếp cây chỉ số với children; Cách 2 cấu hình danh sách chỉ số phẳng với parentId. Hai cách này không thể dùng đồng thời

:::


## page

**Type:** `Page | undefined`

:::note{title=Mo ta}
Paging configuration, used to specify the paging field name; it must be a dimension

:::


### field

**Type:** `string`

:::note{title=Mo ta}


:::

### currentValue

**Type:** `string`

:::note{title=Mo ta}


:::

**Vi du**
'2023\-01\-01'




## size

**Type:** `number | number[] | undefined`

:::note{title=Mo ta}
Scatter chart measure size, used to define the size or size range of data points

\- If the size range is a number such as 10, the data point size is fixed at 10

\- If the size range is a two-item array such as [10, 40], the data point size ranges from 10 to 40

\- Mutually exclusive with sizeRange; lower priority than size

:::


## sizeRange

**Type:** `number | number[] | undefined`

:::note{title=Mo ta}
Scatter chart measure size range, used to define the size range of data points,

\- If the size range is a two-item array such as [10, 40], the data point size ranges from 10 to 40

\- If the size range is a number such as 10, the data point size is fixed at 10

\- Mutually exclusive with sizeRange; higher priority than size

:::


## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Mo ta}
Chart background color



The background color can be a color string such as 'red' or 'blue', or hex, rgb, or rgba values such as '#ff0000' and 'rgba(255,0,0,0.5)'

:::


## color

**Type:** `Color | undefined`

:::note{title=Mo ta}
Mau



Color configuration, used to define chart color schemes including color lists, color mappings, and gradients.

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Mo ta}


:::

**Vi du**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Mo ta}


:::

**Vi du**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Mo ta}


:::

**Vi du**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Mo ta}


:::


## label

**Type:** `Label | undefined`

:::note{title=Mo ta}
Nhan



Label configuration, used to define data label position, format, style, and related settings.

:::


### enable

**Type:** `false | true`

:::note{title=Mo ta}


:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Mo ta}






:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Mo ta}






:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Mo ta}






:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mo ta}


:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mo ta}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mo ta}


:::

**Vi du**





#### symbol

**Type:** `string | undefined`

:::note{title=Mo ta}

:::

**Vi du**





#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

#### suffix

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

#### prefix

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Mo ta}

:::

**Vi du**


Hàm easing của hoạt ảnh






#### significantDigits

**Type:** `number | undefined`

:::note{title=Mo ta}
Cấu hình sắp xếp trục phân loại, hỗ trợ sắp xếp theo dimension hoặc measure, và thứ tự tùy chỉnh

:::

**Vi du**
sort: {
  orderBy: 'profit',
  order: 'asc',
}
sort: {
  customOrder:['2019', '2020', '2021']
}




#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mo ta}


:::

**Vi du**
Thứ tự sắp xếp, giá trị tùy chọn là 'asc' hoặc 'desc'




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mo ta}


:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
  orderBy: 'profit',

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Mo ta}
or

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

### labelColor

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Mo ta}


:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mo ta}


:::


#### field

**Type:** `string`

:::note{title=Mo ta}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
**Ví dụ**




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
**Ví dụ**




same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mo ta}




Màu nét nền













'red'











Bán kính bo góc nền

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

**Vi du**
"To sang cac muc du lieu co doanh so lon hon 1000"

"To sang muc du lieu co ty suat loi nhuan cao nhat trong moi khu vuc"



#### code

**Type:** `string`

:::note{title=Mo ta}
Toán tử



\- not in: Chọn các mục dữ liệu có giá trị trường dimension không nằm trong value

**Ví dụ**






:::

**Vi du**
To sang truong sales cua cac muc du lieu co doanh so lon hon 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

To sang muc du lieu co ty suat loi nhuan cao nhat trong moi khu vuc
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

To sang cac muc du lieu duoc loc theo nhieu dieu kien
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

:::note{title=Mo ta}


:::


##### field

**Type:** `string`

:::note{title=Mo ta}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
**Ví dụ**




:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
**Ví dụ**




same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Mo ta}




Màu văn bản

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`


## legend

**Type:** `Legend | undefined`

:::note{title=Mo ta}
Chu giai



Legend configuration, used to define legend position, format, style, and related settings.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

**Vi du**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

:::warning{title=Warning}


:::

**Vi du**
border: true



### labelColor

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}


:::

**Vi du**
labelFontSize: 10



### labelFontColor

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Mo ta}


:::

**Vi du**
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Mo ta}


:::

:::warning{title=Warning}


:::

**Vi du**
shapeType: 'circle'



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Mo ta}


:::

**Vi du**
position: 'rightTop'



### maxSize

**Type:** `number | undefined`

:::note{title=Mo ta}






:::

:::warning{title=Warning}


:::

**Vi du**
maxSize: 2




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Mo ta}
Tooltip



Tooltip configuration, used to define tooltip position, format, style, and related settings.

:::


### enable

**Type:** `false | true`

:::note{title=Mo ta}


:::


## brush

**Type:** `Brush | undefined`

:::note{title=Mo ta}
Chon bang brush



Brush selection configuration, used to enable or disable brush selection.



Chế độ chọn brush: đơn hoặc nhiều

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Mo ta}












:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Mo ta}
Độ mờ of selected data points, range 0-1







:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Mo ta}






:::


#### opacity

**Type:** `number | undefined`

:::note{title=Mo ta}
\- 100000 được chuyển thành 10W, ratio:10000, symbol:"W"





:::

#### stroke

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mo ta}

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Mo ta}
Trục X, trục phân loại, cấu hình trục X; định nghĩa trục X của biểu đồ, bao gồm vị trí, định dạng, kiểu dáng, v.v.





:::


#### opacity

**Type:** `number | undefined`

:::note{title=Mo ta}
\- 100000 được chuyển thành 10W, ratio:10000, symbol:"W"





:::

#### stroke

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mo ta}

:::


## animation

**Type:** `ScatterAnimation | undefined`

:::note{title=Mo ta}
Cau hinh hoat anh



Chart animation configuration; available effects are constrained by chart type

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether scatter chart animation is enabled

:::

### params

**Type:** `ScatterAnimationParams | undefined`

:::note{title=Mo ta}
Scatter chart animation parameters

:::


#### appear

**Type:** `ScatterAppearAnimation | undefined`

:::note{title=Mo ta}
Scatter chart appear animation configuration

:::


##### effects

**Type:** `("growth" | "scale")[] | undefined`

:::note{title=Mo ta}
Scatter chart appear effects, supporting grow and scale animations

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether the current animation stage is enabled

:::

##### ease

**Type:** `string | undefined`

:::note{title=Mo ta}
Animation easing function

:::

##### duration

**Type:** `number | undefined`

:::note{title=Mo ta}
Animation duration, in milliseconds

:::

##### color

**Type:** `string | undefined`

:::note{title=Mo ta}
Animation highlight or atmosphere color

:::

#### update

**Type:** `ScatterUpdateAnimation | undefined`

:::note{title=Mo ta}
Scatter chart update animation configuration

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=Mo ta}
Scatter chart update effects, supporting grow animation

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether the current animation stage is enabled

:::

##### ease

**Type:** `string | undefined`

:::note{title=Mo ta}
Animation easing function

:::

##### duration

**Type:** `number | undefined`

:::note{title=Mo ta}
Animation duration, in milliseconds

:::

##### color

**Type:** `string | undefined`

:::note{title=Mo ta}
Animation highlight or atmosphere color

:::

#### loop

**Type:** `ScatterAnimationLoop | undefined`

:::note{title=Mo ta}
Scatter chart loop animation configuration

:::


##### enable

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether loop animation is enabled

:::

##### interval

**Type:** `number | undefined`

:::note{title=Mo ta}
Loop animation interval, in milliseconds

:::

##### loop

**Type:** `ScatterLoopAnimation | undefined`

:::note{title=Mo ta}
Scatter chart loop animation configuration

:::


###### effects

**Type:** `ScatterLoopEffect[] | undefined`

:::note{title=Mo ta}
Scatter chart loop effect

:::

###### enable

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether the current animation stage is enabled

:::

###### ease

**Type:** `string | undefined`

:::note{title=Mo ta}
Animation easing function

:::

###### duration

**Type:** `number | undefined`

:::note{title=Mo ta}
Animation duration, in milliseconds

:::

###### color

**Type:** `string | undefined`

:::note{title=Mo ta}
Animation highlight or atmosphere color

:::

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title=Mo ta}
Scatter chart atmosphere animation configuration

:::


###### ease

**Type:** `string | undefined`

:::note{title=Mo ta}
Atmosphere animation easing function

:::

###### color

**Type:** `string | undefined`

:::note{title=Mo ta}
Atmosphere animation color

:::

###### effect

**Type:** `PointAtmosphereEffect | undefined`

:::note{title=Mo ta}
Atmosphere animation effect, supporting ripple, visibility, and breathing effects

:::


## xAxis

**Type:** `XLinearAxis | undefined`

:::note{title=Mo ta}
Truc X



Numeric axis. X-axis configuration used to define position, format, style, and related settings.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}

:::

### min

**Type:** `number | undefined`

:::note{title=Mo ta}
Đường trục width

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Mo ta}
Tick trục X

:::

### log

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Có sử dụng trục logarit hay không, chỉ có hiệu lực với trục số

:::

### logBase

**Type:** `number | undefined`

:::note{title=Mo ta}
Hàm easing của hoạt ảnh.

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Cấu hình trục Y (trục danh mục) dùng để định nghĩa trục Y, bao gồm vị trí, định dạng, kiểu dáng, v.v.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Mo ta}
sortLegend: {

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mo ta}


:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mo ta}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mo ta}


:::

**Vi du**





#### symbol

**Type:** `string | undefined`

:::note{title=Mo ta}

:::

**Vi du**





#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

#### suffix

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

#### prefix

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Mo ta}

:::

**Vi du**


Hàm easing của hoạt ảnh






#### significantDigits

**Type:** `number | undefined`

:::note{title=Mo ta}
Cấu hình sắp xếp trục phân loại, hỗ trợ sắp xếp theo dimension hoặc measure, và thứ tự tùy chỉnh

:::

**Vi du**
sort: {
  orderBy: 'profit',
  order: 'asc',
}
sort: {
  customOrder:['2019', '2020', '2021']
}




#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mo ta}


:::

**Vi du**
Thứ tự sắp xếp, giá trị tùy chọn là 'asc' hoặc 'desc'




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mo ta}


:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Mo ta}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Mo ta}
value: 'tool'

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
  orderBy: 'profit',

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
or

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Mo ta}


:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
\- orderBy:'date'

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Mo ta}

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mo ta}


:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Mo ta}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Cấu hình sắp xếp chú giải; hỗ trợ sắp xếp theo dimension hoặc measure, cũng như thứ tự tùy chỉnh; mảng sort tuân theo thứ tự từ trái sang phải hoặc từ trên xuống dưới.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Mo ta}
sortLegend: {

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Mo ta}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

#### titleText

**Type:** `string | undefined`

:::note{title=Mo ta}

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Mo ta}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
Thứ tự sắp xếp tùy chỉnh; thứ tự này được áp dụng trực tiếp cho chú giải. Tăng dần theo trái-sang-phải hoặc trên-xuống-dưới; giảm dần theo phải-sang-trái hoặc dưới-lên-trên.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
  ])

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Mo ta}
Bao gồm các theme tích hợp `light` và `dark`. Có thể thêm theme tùy chỉnh qua `registerTheme`.

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
- not in: Chọn các mục dữ liệu có giá trị trường chiều không nằm trong mảng `value`.

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Mo ta}
Hỗ trợ kiểu toàn cục hoặc cấu hình kiểu có điều kiện.

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Mo ta}


:::


#### duration

**Type:** `number | undefined`

:::note{title=Mo ta}

:::

#### easing

**Type:** `string | undefined`

:::note{title=Mo ta}


:::


## yAxis

**Type:** `YLinearAxis | undefined`

:::note{title=Mo ta}
Truc Y



Numeric axis. Y-axis configuration used to define position, format, style, and related settings.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}

:::

### min

**Type:** `number | undefined`

:::note{title=Mo ta}
Đường trục width

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Mo ta}
Tick trục X

:::

### log

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Có sử dụng trục logarit hay không, chỉ có hiệu lực với trục số

:::

### logBase

**Type:** `number | undefined`

:::note{title=Mo ta}
Hàm easing của hoạt ảnh.

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Cấu hình trục Y (trục danh mục) dùng để định nghĩa trục Y, bao gồm vị trí, định dạng, kiểu dáng, v.v.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Mo ta}
sortLegend: {

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mo ta}


:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mo ta}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mo ta}


:::

**Vi du**





#### symbol

**Type:** `string | undefined`

:::note{title=Mo ta}

:::

**Vi du**





#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

#### suffix

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

#### prefix

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Mo ta}

:::

**Vi du**


Hàm easing của hoạt ảnh






#### significantDigits

**Type:** `number | undefined`

:::note{title=Mo ta}
Cấu hình sắp xếp trục phân loại, hỗ trợ sắp xếp theo dimension hoặc measure, và thứ tự tùy chỉnh

:::

**Vi du**
sort: {
  orderBy: 'profit',
  order: 'asc',
}
sort: {
  customOrder:['2019', '2020', '2021']
}




#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mo ta}


:::

**Vi du**
Thứ tự sắp xếp, giá trị tùy chọn là 'asc' hoặc 'desc'




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mo ta}


:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Mo ta}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Mo ta}
value: 'tool'

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
  orderBy: 'profit',

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
or

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Mo ta}


:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
\- orderBy:'date'

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Mo ta}

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mo ta}


:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Mo ta}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Cấu hình sắp xếp chú giải; hỗ trợ sắp xếp theo dimension hoặc measure, cũng như thứ tự tùy chỉnh; mảng sort tuân theo thứ tự từ trái sang phải hoặc từ trên xuống dưới.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Mo ta}
sortLegend: {

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Mo ta}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

#### titleText

**Type:** `string | undefined`

:::note{title=Mo ta}

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Mo ta}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
Thứ tự sắp xếp tùy chỉnh; thứ tự này được áp dụng trực tiếp cho chú giải. Tăng dần theo trái-sang-phải hoặc trên-xuống-dưới; giảm dần theo phải-sang-trái hoặc dưới-lên-trên.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
  ])

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Mo ta}
Bao gồm các theme tích hợp `light` và `dark`. Có thể thêm theme tùy chỉnh qua `registerTheme`.

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
- not in: Chọn các mục dữ liệu có giá trị trường chiều không nằm trong mảng `value`.

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Mo ta}
Hỗ trợ kiểu toàn cục hoặc cấu hình kiểu có điều kiện.

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Mo ta}


:::


#### duration

**Type:** `number | undefined`

:::note{title=Mo ta}

:::

#### easing

**Type:** `string | undefined`

:::note{title=Mo ta}


:::


## crosshairLine

**Type:** `CrosshairLine | undefined`

:::note{title=Mo ta}
Duong goi y doc



Vertical guide line shown when the mouse moves over the chart



Cau hinh duong crosshair, la loai cau hinh de hien thi duong crosshair (duong goi y) trong bieu do

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Co hien thi duong crosshair hay khong

:::

### lineColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Mau duong crosshair

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Mau nhan duong crosshair

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Whether the crosshair line label is shown

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Mau nen nhan duong crosshair

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Mo ta}
Chart theme. Theme is a lower-priority functional configuration that includes common settings shared by all chart types and by a single chart type.



Two built-in themes are provided: light and dark. Users can customize themes through Builder.



const maxItems = _.map(grouped, group =>



_.map(maxItems, item => [

:::

**Vi du**
'dark'

'light'

'customThemeName'




### length

**Type:** `number`

### brand

**Type:** `brand`


## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note{title=Mo ta}
Kieu dau diem



Point mark style configuration, used to define point mark color, border, and related settings.

Supports global style or conditional style configuration

Bo loc du lieu




:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mo ta}
- not in: Chọn các mục dữ liệu có giá trị trường chiều không nằm trong mảng `value`.






:::

**Vi du**
Màu nét primitive cột (hình chữ nhật)
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

:::note{title=Mo ta}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
**Ví dụ**




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
**Ví dụ**




same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mo ta}




Màu nét nền















'red'











Bán kính bo góc nền

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

**Vi du**
"To sang cac muc du lieu co doanh so lon hon 1000"

"To sang muc du lieu co ty suat loi nhuan cao nhat trong moi khu vuc"



#### code

**Type:** `string`

:::note{title=Mo ta}
Toán tử



\- not in: Chọn các mục dữ liệu có giá trị trường dimension không nằm trong value

**Ví dụ**






:::

**Vi du**
To sang truong sales cua cac muc du lieu co doanh so lon hon 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

To sang muc du lieu co ty suat loi nhuan cao nhat trong moi khu vuc
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

To sang cac muc du lieu duoc loc theo nhieu dieu kien
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

:::note{title=Mo ta}


:::


##### field

**Type:** `string`

:::note{title=Mo ta}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
**Ví dụ**




:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
**Ví dụ**




same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Mo ta}




Màu văn bản

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### pointVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Diem co hien thi hay khong

:::

### pointSize

**Type:** `number | undefined`

:::note{title=Mo ta}
Kich thuoc diem



Kich thuoc diem

:::

### pointColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Mau dau diem



Mau dau diem

:::

### pointColorOpacity

**Type:** `number | undefined`

:::note{title=Mo ta}
Do trong suot mau dau diem



Do trong suot mau dau diem

:::

### pointBorderColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Mau vien dau diem



Mau vien dau diem

:::

### pointBorderWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
Do rong vien dau diem



Do rong vien dau diem

:::

### pointBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Mo ta}
Kieu vien dau diem



Kieu vien dau diem

:::

**Vi du**
solid

dashed

dotted




## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Mo ta}
Diem chu thich



Annotation point configuration. Defines chart annotation points based on selected data, including position, format, style, and related settings.

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mo ta}


:::


#### field

**Type:** `string`

:::note{title=Mo ta}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
**Ví dụ**




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
**Ví dụ**




same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}


:::

### measureId

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mo ta}




Màu nét nền















'red'











Bán kính bo góc nền

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

**Vi du**
"To sang cac muc du lieu co doanh so lon hon 1000"

"To sang muc du lieu co ty suat loi nhuan cao nhat trong moi khu vuc"



#### code

**Type:** `string`

:::note{title=Mo ta}
Toán tử



\- not in: Chọn các mục dữ liệu có giá trị trường dimension không nằm trong value

**Ví dụ**






:::

**Vi du**
To sang truong sales cua cac muc du lieu co doanh so lon hon 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

To sang muc du lieu co ty suat loi nhuan cao nhat trong moi khu vuc
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

To sang cac muc du lieu duoc loc theo nhieu dieu kien
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

:::note{title=Mo ta}


:::


##### field

**Type:** `string`

:::note{title=Mo ta}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
**Ví dụ**




:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
**Ví dụ**




same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Mo ta}




Màu văn bản

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Mo ta}
'red'

:::

**Vi du**
'Văn bản đánh dấu'



### textColor

**Type:** `string | undefined`

:::note{title=Mo ta}
4

:::

**Vi du**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
[2, 2]

:::

**Vi du**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
0

:::

**Vi du**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Mo ta}




Cỡ chữ văn bản.


**Ví dụ**

:::

**Vi du**
'right' Văn bản nằm bên trái điểm đánh dấu



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mo ta}
**Ví dụ**









:::

**Vi du**
'top' Văn bản nằm phía dưới điểm đánh dấu



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

**Vi du**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Mo ta}

:::

**Vi du**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Màu văn bản

:::

**Vi du**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::

**Vi du**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::

**Vi du**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Mo ta}
Padding nền

:::

**Vi du**
4



### offsetY

**Type:** `number | undefined`

:::note{title=Mo ta}




Nền có hiển thị hay không.

:::

**Vi du**
true



### offsetX

**Type:** `number | undefined`

:::note{title=Mo ta}
Màu nền.


**Ví dụ**

:::

**Vi du**
2




## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Mo ta}
Duong chu thich doc



Numeric annotation line, including average, maximum, and minimum lines. Displayed vertically and configurable by position and style. Use this configuration to draw annotation lines for numeric values such as X-axis measure averages.

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Mo ta}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Mo ta}












:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

**Vi du**
"Lấy giá trị doanh số cao nhất làm tham chiếu cho đường đánh dấu"

"Tính doanh số trung bình cho đường đánh dấu"



#### code

**Type:** `string`

:::note{title=Mo ta}
Toán tử



\- not in: Chọn các mục dữ liệu có giá trị trường dimension không nằm trong value







:::

**Vi du**

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

:::note{title=Mo ta}


:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Mo ta}




Màu văn bản

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Mo ta}
'red'

:::

**Vi du**
'Văn bản đánh dấu'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Mo ta}
Các giá trị trường dimension đã chọn; hỗ trợ mảng.

:::

**Vi du**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Mo ta}
4

:::

**Vi du**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
[2, 2]

:::

**Vi du**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
0

:::

**Vi du**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Mo ta}
left: Văn bản nằm bên phải vùng chú thích, mép trái căn với vùng.

center: Văn bản được căn giữa trong vùng chú thích.

Màu văn bản.


**Ví dụ**

:::

**Vi du**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mo ta}
middle: Văn bản được căn giữa theo chiều dọc trong vùng chú thích.









:::

**Vi du**
'top'



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

**Vi du**
true



### lineColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Màu viền vùng chú thích.

:::

**Vi du**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
Độ rộng viền vùng chú thích.

:::

**Vi du**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Mo ta}
Bán kính bo góc viền vùng chú thích.

:::

**Vi du**
'solid'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

**Vi du**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Mo ta}

:::

**Vi du**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Màu văn bản

:::

**Vi du**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::

**Vi du**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::

**Vi du**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Mo ta}
Padding nền

:::

**Vi du**
4




## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=Mo ta}
Duong chu thich ngang



Numeric annotation line, including average, maximum, and minimum lines. Displayed vertically and configurable by position and style. Use this configuration to draw annotation lines for numeric values such as Y-axis measure averages.

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Mo ta}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Mo ta}












:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

**Vi du**
"Lấy giá trị doanh số cao nhất làm tham chiếu cho đường đánh dấu"

"Tính doanh số trung bình cho đường đánh dấu"



#### code

**Type:** `string`

:::note{title=Mo ta}
Toán tử



\- not in: Chọn các mục dữ liệu có giá trị trường dimension không nằm trong value







:::

**Vi du**

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

:::note{title=Mo ta}


:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Mo ta}




Màu văn bản

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Mo ta}
'red'

:::

**Vi du**
'Văn bản đánh dấu'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Mo ta}
2





:::

**Vi du**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Mo ta}
4

:::

**Vi du**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
[2, 2]

:::

**Vi du**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
0

:::

**Vi du**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Mo ta}
left: Văn bản nằm bên phải vùng chú thích, mép trái căn với vùng.

center: Văn bản được căn giữa trong vùng chú thích.



**Ví dụ**



:::

**Vi du**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mo ta}
middle: Văn bản được căn giữa theo chiều dọc trong vùng chú thích.



màu nét nền

**Ví dụ**



:::

**Vi du**
'top'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

**Vi du**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Mo ta}

:::

**Vi du**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Màu văn bản

:::

**Vi du**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
**Ví dụ**



**Ví dụ**

:::

**Vi du**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::

**Vi du**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Mo ta}
Padding nền

:::

**Vi du**
4



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}






:::

**Vi du**
true



### lineColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Màu viền vùng chú thích.

:::

**Vi du**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
Độ rộng viền vùng chú thích.

:::

**Vi du**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Mo ta}
Bán kính bo góc viền vùng chú thích.

:::

**Vi du**
'solid'



### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=Mo ta}
Kiểu gạch của viền vùng chú thích.

:::


#### positiveColor

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=Mo ta}
0

:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Mo ta}
Vung chu thich



Annotation region configuration. Defines chart annotation regions based on selected data, including position, style, and related settings.

:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Mo ta}
Có bật chức năng liên kết dimension khi biểu đồ bật perspective hoặc khi các measure được gộp hay không.

:::


#### field

**Type:** `string`

:::note{title=Mo ta}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
**Ví dụ**




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
**Ví dụ**




same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}


:::

### text

**Type:** `string | string[] | undefined`

:::note{title=Mo ta}
'red'

:::

**Vi du**
'Văn bản đánh dấu'



### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title=Mo ta}
2

:::

**Vi du**
'top'



### textColor

**Type:** `string | undefined`

:::note{title=Mo ta}
4

:::

**Vi du**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
[2, 2]

:::

**Vi du**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
0

:::

**Vi du**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Mo ta}
Cấu hình đường hồi quy đa thức, bao gồm bậc đa thức, kiểu đường hồi quy, v.v.

Nên đặt thành 'center' để đảm bảo văn bản nằm ở giữa vùng đánh dấu







:::

**Vi du**
'center' Văn bản nằm ở giữa vùng đánh dấu



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mo ta}








Bậc của hồi quy đa thức

:::

**Vi du**
'top' Văn bản nằm phía dưới vùng đánh dấu



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

**Vi du**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Mo ta}

:::

**Vi du**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Màu văn bản



Màu văn bản

:::

**Vi du**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::

**Vi du**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Mo ta}
**Ví dụ**



**Ví dụ**

:::

**Vi du**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Mo ta}
Padding nền

:::

**Vi du**
4



### areaColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Màu vùng đánh dấu

:::

**Vi du**
'red'



### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Mo ta}


:::

**Vi du**
0.5



### areaBorderColor

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

**Vi du**
'red'



### areaBorderWidth

**Type:** `number | undefined`

:::note{title=Mo ta}


:::

**Vi du**
2



### areaBorderRadius

**Type:** `number | undefined`

:::note{title=Mo ta}


:::

**Vi du**
4



### areaLineDash

**Type:** `number[] | undefined`

:::note{title=Mo ta}


:::

**Vi du**
[2, 2]



### outerPadding

**Type:** `number | undefined`

:::note{title=Mo ta}
Lề của vùng đánh dấu

:::

**Vi du**
0




## linearRegressionLine

**Type:** `LinearRegressionLine | LinearRegressionLine[] | undefined`

:::note{title=Mo ta}
Duong hoi quy tuyen tinh



Linear regression line configuration, including line style and related settings.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Co bat hay khong

:::

### color

**Type:** `string | undefined`

:::note{title=Mo ta}
Mau duong hoi quy

Sets the regression line color. If unset, the chart primary color is used by default.

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
Do rong duong hoi quy

Sets the regression line width in pixels. The default value is 1.

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=Mo ta}
Kieu duong hoi quy

Sets the regression line style, such as solid or dashed. The default is solid.

:::

### text

**Type:** `string | undefined`

:::note{title=Mo ta}
Van ban nhan duong hoi quy

Sets the regression line label text. An empty string means no label is shown.

:::

### textColor

**Type:** `string | undefined`

:::note{title=Mo ta}
4

:::

**Vi du**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
[2, 2]

:::

**Vi du**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
0

:::

**Vi du**
400



### confidenceIntervalVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Co hien thi khoang tin cay hay khong

:::

### confidenceLevel

**Type:** `number | undefined`

:::note{title=Mo ta}
Confidence interval value setting. The default confidence level is 95%.

:::

### confidenceIntervalColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Mau khoang tin cay

:::

### confidenceIntervalOpacity

**Type:** `number | undefined`

:::note{title=Mo ta}
Do trong suot khoang tin cay

:::

**Vi du**
0.5



### shadowBlur

**Type:** `number | undefined`

:::note{title=Mo ta}
Graphic blur effect strength

:::

**Vi du**
0



### shadowColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Graphic shadow color

:::

**Vi du**
'#FFFFFF4D'



### shadowOffsetX

**Type:** `number | undefined`

:::note{title=Mo ta}
Horizontal shadow offset distance

:::

**Vi du**
0



### shadowOffsetY

**Type:** `number | undefined`

:::note{title=Mo ta}
Vertical shadow offset distance

:::

**Vi du**
1




## lowessRegressionLine

**Type:** `LowessRegressionLine | LowessRegressionLine[] | undefined`

:::note{title=Mo ta}
Locally weighted regression line configuration item



Locally weighted regression line configuration, including line style and related settings.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Co bat hay khong

:::

### color

**Type:** `string | undefined`

:::note{title=Mo ta}
Mau duong hoi quy

Sets the regression line color. If unset, the chart primary color is used by default.

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
Do rong duong hoi quy

Sets the regression line width in pixels. The default value is 1.

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=Mo ta}
Kieu duong hoi quy

Sets the regression line style, such as solid or dashed. The default is solid.

:::

### text

**Type:** `string | undefined`

:::note{title=Mo ta}
Van ban nhan duong hoi quy

Sets the regression line label text. An empty string means no label is shown.

:::

### textColor

**Type:** `string | undefined`

:::note{title=Mo ta}
4

:::

**Vi du**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
[2, 2]

:::

**Vi du**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
0

:::

**Vi du**
400



### confidenceIntervalVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Co hien thi khoang tin cay hay khong

:::

### confidenceLevel

**Type:** `number | undefined`

:::note{title=Mo ta}
Confidence interval value setting. The default confidence level is 95%.

:::

### confidenceIntervalColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Mau khoang tin cay

:::

### confidenceIntervalOpacity

**Type:** `number | undefined`

:::note{title=Mo ta}
Do trong suot khoang tin cay

:::

**Vi du**
0.5




## polynomialRegressionLine

**Type:** `PolynomialRegressionLine | PolynomialRegressionLine[] | undefined`

:::note{title=Mo ta}
Duong hoi quy da thuc



Polynomial regression line configuration, including polynomial order, line style, and related settings.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Co bat hay khong

:::

### color

**Type:** `string | undefined`

:::note{title=Mo ta}
Mau duong hoi quy

Sets the regression line color. If unset, the chart primary color is used by default.

:::

### degree

**Type:** `number | undefined`

:::note{title=Mo ta}
Polynomial regression order

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
Do rong duong hoi quy

Sets the regression line width in pixels. The default value is 1.

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=Mo ta}
Kieu duong hoi quy

Sets the regression line style, such as solid or dashed. The default is solid.

:::

### text

**Type:** `string | undefined`

:::note{title=Mo ta}
Van ban nhan duong hoi quy

Sets the regression line label text. An empty string means no label is shown.

:::

### textColor

**Type:** `string | undefined`

:::note{title=Mo ta}
4

:::

**Vi du**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
[2, 2]

:::

**Vi du**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
0

:::

**Vi du**
400



### confidenceIntervalVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Co hien thi khoang tin cay hay khong

:::

### confidenceLevel

**Type:** `number | undefined`

:::note{title=Mo ta}
Confidence interval value setting. The default confidence level is 95%.

:::

### confidenceIntervalColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Mau khoang tin cay

:::

### confidenceIntervalOpacity

**Type:** `number | undefined`

:::note{title=Mo ta}
Do trong suot khoang tin cay

:::

**Vi du**
0.5




## logisticRegressionLine

**Type:** `LogisticRegressionLine | LogisticRegressionLine[] | undefined`

:::note{title=Mo ta}
Duong hoi quy logistic



Logistic regression line configuration, including line style and related settings.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Co bat hay khong

:::

### color

**Type:** `string | undefined`

:::note{title=Mo ta}
Mau duong hoi quy

Sets the regression line color. If unset, the chart primary color is used by default.

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
Do rong duong hoi quy

Sets the regression line width in pixels. The default value is 1.

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=Mo ta}
Kieu duong hoi quy

Sets the regression line style, such as solid or dashed. The default is solid.

:::

### text

**Type:** `string | undefined`

:::note{title=Mo ta}
Van ban nhan duong hoi quy

Sets the regression line label text. An empty string means no label is shown.

:::

### textColor

**Type:** `string | undefined`

:::note{title=Mo ta}
4

:::

**Vi du**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
[2, 2]

:::

**Vi du**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
0

:::

**Vi du**
400



### confidenceIntervalVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Co hien thi khoang tin cay hay khong

:::

### confidenceLevel

**Type:** `number | undefined`

:::note{title=Mo ta}
Confidence interval value setting. The default confidence level is 95%.

:::

### confidenceIntervalColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Mau khoang tin cay

:::

### confidenceIntervalOpacity

**Type:** `number | undefined`

:::note{title=Mo ta}
Do trong suot khoang tin cay

:::

**Vi du**
0.5




## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=Mo ta}
Whether to enable dimension linkage when pivot or measure grouping is enabled on the chart

When hovering over a dimension value, highlight data with the same dimension value in other charts



Cấu hình liên kết chiều của biểu đồ pivot

:::


### enable

**Type:** `false | true`

:::note{title=Mo ta}
Có bật liên kết chiều của biểu đồ pivot hay không

:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Có hiển thị thông tin Tooltip của các biểu đồ con tương ứng với tất cả các chiều hay không

:::

### showLabel

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Có hiển thị nhãn tương ứng với crosshair hay không

:::


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Mo ta}
Ngon ngu



Chart language configuration. Supports 'zh\-CN' and 'en\-US'. You can also call intl.setLocale('zh\-CN') to set the language.

:::

