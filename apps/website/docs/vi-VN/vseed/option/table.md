# Table

:::info{title=Khuyến nghị}
\- Cấu hình trường đề xuất: `bất kỳ` chỉ số, `bất kỳ` chiều

\- Hỗ trợ tái cấu trúc dữ liệu: ít nhất `bất kỳ` chỉ số, `bất kỳ` chiều

:::

:::info{title=Ánh xạ mã hóa}
Chỉ hỗ trợ cấu hình cây chiều và cây chỉ số; mặc định encoding vào cột.

:::

:::note{title=Mô tả}
Bảng phù hợp với các kịch bản hiển thị dữ liệu chi tiết, có hàng và cột rõ ràng để dễ xem các giá trị cụ thể.

Kịch bản áp dụng:

\- Hiển thị bản ghi dữ liệu chi tiết

\- So sánh chính xác các mục dữ liệu

\- Hiển thị thuộc tính của nhiều chiều

:::

:::warning{title=Cảnh báo}
Yêu cầu dữ liệu:

\- Ít nhất 1 trường chiều

\- Ít nhất 1 trường chỉ số

\- Các trường chiều sẽ được dùng làm tiêu đề cột của bảng

Tính năng được bật mặc định:

\- Sắp xếp, lọc và phân trang được bật mặc định

:::


## chartType

**Type:** `"table"`

:::note{title=Mô tả}
Thành phần bảng tiêu chuẩn để hiển thị dữ liệu chi tiết

:::

**Ví dụ**
'table'




## dataset

**Type:** `Record[]`

:::note{title=Mô tả}
Dataset đã tổng hợp và tuân theo đặc tả TidyData, dùng để xác định nguồn dữ liệu và cấu trúc của biểu đồ. Dataset do người dùng cung cấp không cần tiền xử lý; mỗi trường tương ứng với một cột và mỗi bản ghi tương ứng với một hàng.

:::

**Ví dụ**
[{id: 1, name: "A", value: 100}, {id: 2, name: "B", value: 200}]




## dimensions

**Type:** `DimensionTree | undefined`

:::note{title=Mô tả}
Mỗi chiều trong bảng tương ứng với một cột.

:::

**Ví dụ**
[{id: "name", alias: "Name"}]




### id

**Type:** `string`

### alias

**Type:** `string | undefined`

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=Mô tả}
Cấu hình định dạng ngày của chiều

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=Mô tả}
Độ chi tiết thời gian, quyết định độ chính xác hiển thị ngày

:::

### encoding

**Type:** `"row" | "column" | undefined`

:::note{title=Mô tả}
Kênh mà chiều được ánh xạ tới

\- row: hỗ trợ ánh xạ nhiều chiều tới kênh hàng

\- column: hỗ trợ ánh xạ nhiều chiều tới kênh cột

:::

### children

**Type:** `(TableDimension | DimensionGroup)[] | undefined`


#### id

**Type:** `string`

#### alias

**Type:** `string | undefined`

#### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=Mô tả}
Cấu hình định dạng ngày của chiều

:::


##### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=Mô tả}
Độ chi tiết thời gian, quyết định độ chính xác hiển thị ngày

:::

#### encoding

**Type:** `"row" | "column" | undefined`

:::note{title=Mô tả}
Kênh mà chiều được ánh xạ tới

\- row: hỗ trợ ánh xạ nhiều chiều tới kênh hàng

\- column: hỗ trợ ánh xạ nhiều chiều tới kênh cột

:::


## measures

**Type:** `MeasureTree | undefined`

:::note{title=Mô tả}
Mỗi chỉ số trong bảng tương ứng với một hàng và hỗ trợ sẵn tổ hợp chỉ số.

:::

**Ví dụ**
[{id: "value", alias: "Value"}]




### id

**Type:** `string`

:::note{title=Mô tả}
ID nhóm chỉ số, phải duy nhất.

:::

### alias

**Type:** `string | undefined`

:::note{title=Mô tả}
Alias nhóm chỉ số, có thể trùng; nếu không đặt thì mặc định là ID.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Định dạng số tự động, bật mặc định, ưu tiên cao nhất

Khi autoFormat=true, toàn bộ cấu hình numFormat sẽ bị ghi đè

Khi bật, nhãn dữ liệu và tooltip của biểu đồ sẽ tự động chọn định dạng phù hợp dựa trên giá trị chỉ số và locale

Quy tắc định dạng: số thập phân bật ký hiệu rút gọn, tối thiểu 0 chữ số thập phân, tối đa 2 chữ số thập phân, tự động làm tròn, dùng triển khai Intl.NumberFormat của trình duyệt

Ví dụ:

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mô tả}
Định dạng số tùy chỉnh cho chỉ số; tự động áp dụng cho label và tooltip

Lưu ý: Để sử dụng định dạng tùy chỉnh, phải đặt rõ autoFormat=false; nếu không autoFormat sẽ ghi đè cấu hình này

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mô tả}
Loại định dạng số. Hỗ trợ số (thập phân), phần trăm (%), phần nghìn (‰) và ký hiệu khoa học

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mô tả}
Tỷ lệ định dạng số, không được bằng 0

:::

**Ví dụ**
\- 100000 được chuyển thành 10万, ratio:10000, symbol:"万"
\- 100000 được chuyển thành 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Mô tả}
Ký hiệu định dạng số, ví dụ %, ‰

:::

**Ví dụ**
\- 100000 được chuyển thành 10万, ratio:10000, symbol:"万"
\- 100000 được chuyển thành 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Dấu phân tách hàng nghìn cho định dạng số

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Mô tả}
Hậu tố định dạng số

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Mô tả}
Tiền tố định dạng số

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
Số chữ số thập phân cho định dạng số, dùng minimumFractionDigits và maximumFractionDigits của Intl.NumberFormat trên trình duyệt; ưu tiên thấp hơn significantDigits

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
Chữ số có nghĩa cho định dạng số, dùng minimumSignificantDigits và maximumSignificantDigits của Intl.NumberFormat trên trình duyệt; ưu tiên cao hơn fractionDigits

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1000, significantDigits:1
\- 1234.5678 được chuyển thành 1200, significantDigits:2
\- 1234.5678 được chuyển thành 1230, significantDigits:3
\- 1234.5678 được chuyển thành 1234, significantDigits:4
\- 1234.5678 được chuyển thành 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mô tả}
Ưu tiên làm tròn khi định dạng số nếu đồng thời đặt significantDigits và fractionDigits; dùng Intl.NumberFormat của trình duyệt và tuân theo cùng quy tắc với roundingPriority

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 được chuyển thành 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Chế độ làm tròn khi định dạng số, dùng Intl.NumberFormat của trình duyệt và tuân theo cùng quy tắc với roundingMode

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mô tả}
Loại định dạng số. Hỗ trợ số (thập phân), phần trăm (%), phần nghìn (‰) và ký hiệu khoa học

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mô tả}
Tỷ lệ định dạng số, không được bằng 0

:::

**Ví dụ**
\- 100000 được chuyển thành 10万, ratio:10000, symbol:"万"
\- 100000 được chuyển thành 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Mô tả}
Ký hiệu định dạng số, ví dụ %, ‰

:::

**Ví dụ**
\- 100000 được chuyển thành 10万, ratio:10000, symbol:"万"
\- 100000 được chuyển thành 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Dấu phân tách hàng nghìn cho định dạng số

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Mô tả}
Hậu tố định dạng số

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Mô tả}
Tiền tố định dạng số

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
Số chữ số thập phân cho định dạng số, dùng minimumFractionDigits và maximumFractionDigits của Intl.NumberFormat trên trình duyệt; ưu tiên thấp hơn significantDigits

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
Chữ số có nghĩa cho định dạng số, dùng minimumSignificantDigits và maximumSignificantDigits của Intl.NumberFormat trên trình duyệt; ưu tiên cao hơn fractionDigits

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1000, significantDigits:1
\- 1234.5678 được chuyển thành 1200, significantDigits:2
\- 1234.5678 được chuyển thành 1230, significantDigits:3
\- 1234.5678 được chuyển thành 1234, significantDigits:4
\- 1234.5678 được chuyển thành 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mô tả}
Ưu tiên làm tròn khi định dạng số nếu đồng thời đặt significantDigits và fractionDigits; dùng Intl.NumberFormat của trình duyệt và tuân theo cùng quy tắc với roundingPriority

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 được chuyển thành 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Chế độ làm tròn khi định dạng số, dùng Intl.NumberFormat của trình duyệt và tuân theo cùng quy tắc với roundingMode

:::

### encoding

**Type:** `"column" | undefined`

:::note{title=Mô tả}
Kênh mà chỉ số được ánh xạ tới

\- column: cột chỉ số

:::

### parentId

**Type:** `string | undefined`

:::note{title=Mô tả}
Ở dạng cấu hình chỉ số phẳng, xây dựng nhóm chỉ số dạng cây. parentId trỏ tới id của nhóm chỉ số cha, dùng để xây dựng cây chỉ số

:::

:::tip{title=Gợi ý}
Có hai cách cấu hình cây chỉ số: Cách 1 là cấu hình trực tiếp cây chỉ số với children; Cách 2 là cấu hình danh sách chỉ số phẳng với parentId. Hai cách này không thể dùng đồng thời

:::

### children

**Type:** `(TableMeasure | MeasureGroup)[] | undefined`

:::note{title=Mô tả}
Các chỉ số con hoặc nhóm chỉ số trong nhóm chỉ số.

:::


## page

**Type:** `Page | undefined`

:::note{title=Mô tả}
Cấu hình phân trang, dùng để chỉ định tên trường phân trang; trường này phải là chiều.

:::


### field

**Type:** `string`

:::note{title=Mô tả}
Trường phân trang; chỉ định tên trường cho phân trang, phải là một chiều

:::

### currentValue

**Type:** `string`

:::note{title=Mô tả}
Giá trị phân trang hiện tại; chỉ định giá trị dùng để xác định trang hiện tại

:::

**Ví dụ**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Mô tả}
Màu nền có thể là chuỗi màu (ví dụ 'red', 'blue'), hoặc giá trị hex, rgb, rgba (ví dụ '#ff0000', 'rgba(255,0,0,0.5)')

:::


## borderColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu viền bảng

:::


## bodyFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Cỡ chữ phần thân bảng

:::


## bodyFontColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu chữ phần thân bảng

:::


## bodyBackgroundColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nền phần thân bảng

:::


## headerFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Header font size

:::


## headerFontColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu chữ header

:::


## headerBackgroundColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nền header

:::


## hoverHeaderBackgroundColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Background color when the mouse hovers over a header cell, used to highlight the hovered cell.

:::


## hoverHeaderInlineBackgroundColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nền của toàn bộ hàng khi di chuột lên tiêu đề, dùng để làm nổi bật hàng đang hover.

:::


## selectedBorderColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Border color for selected cells, used to highlight the selection.

:::


## selectedBackgroundColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Background color for selected cells, used to highlight the selection.

:::


## bodyCellStyle

**Type:** `BodyCellStyle | BodyCellStyle[] | undefined`

:::note{title=Mô tả}
Đặt kiểu đặc biệt cho các ô trong phần thân bảng.

:::


### selector

**Type:** `Selector | Selectors | FieldSelector | undefined`

:::note{title=Mô tả}
Selector dữ liệu

Nếu cấu hình selector, nó cung cấp bốn loại khả năng khớp dữ liệu: selector số, selector dữ liệu cục bộ, selector chiều có điều kiện và selector chỉ số có điều kiện.

Nếu không cấu hình selector, kiểu dáng sẽ có hiệu lực toàn cục.

Lưu ý: selector và dynamicFilter không thể dùng đồng thời; dynamicFilter có độ ưu tiên cao hơn.

:::

**Ví dụ**
Selector số
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

Selector dữ liệu cục bộ
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

Selector chiều có điều kiện
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

Selector chỉ số có điều kiện
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

Lọc cột theo trường
selector = {
field: 'category'
}
selector = {
field: ['category', 'profit']
}




#### field

**Type:** `string | string[]`

:::note{title=Mô tả}
Tên trường, có thể là một trường đơn hoặc mảng nhiều trường.

:::

**Ví dụ**
Trường đơn
field: 'sales'

Nhiều trường
field: ['sales', 'profit', 'revenue']



#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

\- in: Chọn các mục dữ liệu có giá trị trường chiều nằm trong mảng value.

\- not in: Chọn các mục dữ liệu có giá trị trường chiều không nằm trong mảng value.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

\- in: Chọn các mục dữ liệu có giá trị trường chiều nằm trong mảng value.

\- not in: Chọn các mục dữ liệu có giá trị trường chiều không nằm trong mảng value.

giống operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Chọn giá trị trường chiều; hỗ trợ mảng.

:::

### dynamicFilter

**Type:** `TableDynamicFilter | undefined`

:::note{title=Mô tả}
Bộ lọc động (điều khiển bằng code)



Triển khai logic lọc dữ liệu phức tạp bằng mã JavaScript do AI tạo.

Phù hợp với các trường hợp selector tĩnh khó biểu đạt, chẳng hạn Top N, phân tích thống kê và điều kiện phức tạp.



Khả năng cốt lõi:

\- Hỗ trợ điều kiện lọc dữ liệu phức tạp tùy ý.

\- Sử dụng hàm tiện ích tích hợp để thao tác dữ liệu.

\- Thực thi an toàn trong môi trường trình duyệt (sandbox Web Worker).



Yêu cầu môi trường: chỉ hỗ trợ môi trường trình duyệt; môi trường Node.js sẽ dùng fallback.



Lưu ý: selector và dynamicFilter không thể dùng đồng thời; dynamicFilter có độ ưu tiên cao hơn.



Cấu hình bộ lọc động của bảng



Triển khai lọc chính xác ở cấp ô trong bảng bằng mã JavaScript do AI tạo.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Mô tả}
Mô tả yêu cầu lọc của người dùng (ngôn ngữ tự nhiên).

:::

**Ví dụ**
"Highlight các ô có doanh số lớn hơn 1000"

"Highlight ô có giá trị lớn nhất trong mỗi hàng"



#### code

**Type:** `string`

:::note{title=Mô tả}
Mã JavaScript lọc do AI tạo.



\- Chỉ được dùng các hàm tiện ích tích hợp (truy cập qua _ hoặc R).

\- Tham số đầu vào: data (array), mỗi item có trường _index biểu thị số hàng.

\- Phải trả về một mảng selector ô: Array<{ __row_index: number, field: string }>.

\- Khi field là "*", nghĩa là highlight toàn bộ hàng.

\- Cấm: eval, Function, thao tác bất đồng bộ, DOM API và yêu cầu mạng.

:::

**Ví dụ**
Top N filtering
dynamicFilter = {
type: 'row\-with\-field',
description: 'Làm nổi bật 3 sản phẩm có doanh số cao nhất',
code: `
const sorted = _.sortBy(data, 'sales');
const reversed = [...sorted].reverse();
const result = _.take(reversed, 3);
return _.flatten(
_.map(result, item => [
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

Lọc nhiều điều kiện
dynamicFilter = {
type: 'row\-with\-field',
description: 'Highlight products with profit margin > 20% and sales > 5000',
code: `
const matched = _.filter(data, item => {
const profitRate = (item.profit / item.sales) * 100;
return profitRate > 20 && item.sales > 5000;
});
return _.flatten(
_.map(matched, item => [
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

Lọc theo giá trị tương đối
dynamicFilter = {   *
type: 'row\-with\-field',
description: 'Làm nổi bật sản phẩm có doanh số cao hơn trung bình',
code: `
const avgSales = _.meanBy(data, 'sales');
const matched = _.filter(data, item => item.sales > avgSales);
return _.flatten(
_.map(matched, item => [
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

Grouped filtering
dynamicFilter = {
type: 'row\-with\-field',
description: 'Highlight the product with the highest sales in each region',
code: `
const grouped = _.groupBy(data, 'region');
const topByRegion = _.map(_.values(grouped), group => _.maxBy(group, 'sales'));
return _.flatten(
_.map(topByRegion, item => [
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

Làm nổi bật toàn bộ hàng
dynamicFilter = {
description: 'Highlight rows where sales are greater than profit',
code: `
const matched = _.filter(data, item => item.sales > item.profit);
return matched.map(item => ({
__row_index: item._index,
field: '*'
}));
`,
enabled: true
}



#### fallback

**Type:** `Selector | Selectors | undefined`

:::note{title=Mô tả}
Phương án fallback khi thực thi mã thất bại hoặc môi trường không được hỗ trợ.

:::


##### field

**Type:** `string`

:::note{title=Mô tả}
Trường chiều; ID của một mục trong chiềus.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

\- in: Chọn các mục dữ liệu có giá trị trường chiều nằm trong mảng value.

\- not in: Chọn các mục dữ liệu có giá trị trường chiều không nằm trong mảng value.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

\- in: Chọn các mục dữ liệu có giá trị trường chiều nằm trong mảng value.

\- not in: Chọn các mục dữ liệu có giá trị trường chiều không nằm trong mảng value.

giống operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Chọn giá trị trường chiều; hỗ trợ mảng.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Mô tả}
Kết quả thực thi bộ lọc động (trường runtime)



Được ghi trong giai đoạn prepare(); chỉ đọc khi runtime

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### backgroundColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nền ô

:::

### enableBackgroundColorScale

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật cấu hình color scale cho màu nền hay không

:::

### backgroundColorScale

**Type:** `{ minValue?: number; maxValue?: number; minColor: string; maxColor: string; } | undefined`

:::note{title=Mô tả}
Ánh xạ color scale cho màu nền ô; ưu tiên cao hơn backgroundColor

:::


#### minValue

**Type:** `number | undefined`

:::note{title=Mô tả}
Giá trị tối thiểu; nếu không cấu hình thì mặc định dùng giá trị tối thiểu trong cột dữ liệu hiện tại

:::

#### maxValue

**Type:** `number | undefined`

:::note{title=Mô tả}
Giá trị tối đa; nếu không cấu hình thì mặc định dùng giá trị tối đa trong cột dữ liệu hiện tại

:::

#### minColor

**Type:** `string`

:::note{title=Mô tả}
Màu tương ứng với giá trị nhỏ nhất

:::

#### maxColor

**Type:** `string`

:::note{title=Mô tả}
Màu tương ứng với giá trị lớn nhất

:::

### enableProgressBar

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật tính năng thanh tiến trình (thanh thể hiện kích thước tương đối của giá trị ô) hay không; mặc định tắt

:::

### barPositiveColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu thanh tiến trình khi giá trị ô là dương

:::

### barNegativeColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu thanh tiến trình khi giá trị ô là âm

:::

### barMin

**Type:** `number | undefined`

:::note{title=Mô tả}
Giá trị nhỏ nhất của thanh tiến trình



Tự động tính giá trị tối thiểu của cột nếu không cấu hình

:::

### barMax

**Type:** `number | undefined`

:::note{title=Mô tả}
Giá trị lớn nhất của thanh tiến trình



Tự động tính giá trị tối đa của cột nếu không cấu hình

:::

### textColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu chữ trong ô

:::

### textFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Cỡ chữ trong ô

:::

### borderColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu viền ô

:::

### borderLineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ rộng đường viền ô

:::


## totals

**Type:** `TotalType | undefined`

:::note{title=Mô tả}
Loại hàng tổng hợp cần hiển thị; chỉ áp dụng cho các cột chỉ số

\- 'sum': Hiển thị hàng tổng

\- 'avg': Hiển thị hàng trung bình

\- 'max': Hiển thị hàng tối đa

\- 'min': Hiển thị hàng tối thiểu

\- 'count': Hiển thị hàng đếm



Loại hàng tổng hợp của bảng

\- 'sum': Tổng

\- 'avg': Trung bình

\- 'max': Tối đa

\- 'min': Tối thiểu

\- 'count': Số lượng

:::

**Ví dụ**
'sum'




## theme

**Type:** `Theme | undefined`

:::note{title=Mô tả}
Chủ đề của biểu đồ. Chủ đề là cấu hình chức năng có mức ưu tiên thấp hơn, bao gồm cấu hình chung dùng cho mọi loại biểu đồ và cấu hình riêng cho một loại biểu đồ. Có sẵn hai chủ đề light và dark; người dùng có thể tùy chỉnh chủ đề thông qua Builder.



Chủ đề



Có sẵn hai chủ đề light và dark; chủ đề mới có thể được tùy chỉnh bằng registerTheme.

:::

**Ví dụ**
'dark'

'light'

'customThemeName'




### length

**Type:** `number`

### brand

**Type:** `brand`


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Mô tả}
Cấu hình ngôn ngữ biểu đồ; hỗ trợ 'zh-CN' và 'en-US'. Ngoài ra có thể đặt ngôn ngữ bằng phương thức intl.setLocale('zh-CN').

:::
