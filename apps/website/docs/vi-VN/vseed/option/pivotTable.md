# PivotTable

:::info{title=Khuyến nghị}
- Cấu hình trường khuyến nghị: `1` chỉ số, `1` chiều
- Hỗ trợ Data Reshape: ít nhất `1` chỉ số, `0` chiều
:::

:::info{title=Ánh xạ mã hóa}
Bảng pivot hỗ trợ các kênh trực quan sau:

`row`    : chiều hàng, hỗ trợ `nhiều chiều`, nhóm dữ liệu theo giá trị chiều trên hàng.

`column` : chiều cột, hỗ trợ `nhiều chiều`, nhóm dữ liệu theo giá trị chiều trên cột.

`detail` : kênh chi tiết, hỗ trợ `nhiều chỉ số`, hiển thị giá trị chỉ số trong ô.

:::

:::note{title=Mô tả}
Bảng pivot phù hợp với phân tích chéo dữ liệu đa chiều, cho phép cấu hình linh hoạt chiều hàng/cột và cách tính chỉ số.

Tình huống phù hợp:

- Phân tích thống kê đa chiều phức tạp.
- Drill-down dữ liệu và hiển thị tổng hợp.
- Tạo báo cáo nghiệp vụ và khám phá dữ liệu.

:::

:::warning{title=Warning}
Yêu cầu dữ liệu:

- Cần ít nhất 1 chiều hàng, 1 chiều cột hoặc 1 chỉ số.
- Dữ liệu phải được tổng hợp trước.
- Dữ liệu phải có thể được nhóm.

Tính năng bật mặc định:

- Sắp xếp hàng/cột, lọc dữ liệu, tính tổng hợp/tổng phụ và hiển thị tổng phụ/tổng cộng được bật mặc định.

:::


## chartType

**Type:** `"pivotTable"`

:::note{title=Mô tả}
Bảng pivot phù hợp với các tình huống phân tích chéo dữ liệu đa chiều.

:::

**Ví dụ**
'pivotTable'




## dataset

**Type:** `Record[]`

:::note{title=Mô tả}
Tập dữ liệu tuân theo đặc tả TidyData và đã được tổng hợp, dùng để định nghĩa nguồn và cấu trúc dữ liệu của biểu đồ. Dữ liệu người dùng nhập không cần tiền xử lý; VSeed có khả năng Data Reshape mạnh để tự động xử lý định dạng. Dữ liệu Pivot Table cuối cùng được chuyển thành cấu trúc cây tương ứng, nên không cần xử lý thủ công.

:::

**Ví dụ**
[{region:'East China', product:'A', sales:1000}, {region:'East China', product:'B', sales:1500}]




## dimensions

**Type:** `TableDimension[] | undefined`

:::note{title=Mô tả}
Chiều hàng và chiều cột của Pivot Table. Dữ liệu được tự động xử lý thành cấu trúc cây và ánh xạ vào trục hàng và cột.

:::

**Ví dụ**
[{id: 'region', alias: 'Region', isRow: true}, {id: 'product', alias: 'Product', isColumn: true}]




### id

**Type:** `string`

:::note{title=Mô tả}
ID trường tương ứng với chiều

:::

### alias

**Type:** `string | undefined`

:::note{title=Mô tả}
Bí danh chiều

:::

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=Mô tả}
Cấu hình định dạng ngày của chiều

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=Mô tả}
Độ hạt thời gian, quyết định độ chính xác khi hiển thị ngày

:::

### encoding

**Type:** `"row" | "column" | undefined`

:::note{title=Mô tả}
Kênh mà chiều được ánh xạ tới:

- row: hỗ trợ ánh xạ nhiều chiều vào kênh hàng

- column: hỗ trợ ánh xạ nhiều chiều vào kênh cột

:::


## measures

**Type:** `TableMeasure[] | undefined`

:::note{title=Mô tả}
Bảng pivot hỗ trợ nhiều chỉ số theo chiều.

:::

**Ví dụ**
[{id: 'sales', alias: 'Sales', aggregation: 'sum'}]




### id

**Type:** `string`

:::note{title=Mô tả}
ID chỉ số, không được trùng lặp

:::

### alias

**Type:** `string | undefined`

:::note{title=Mô tả}
Bí danh chỉ số, cho phép trùng lặp; nếu không đặt, alias mặc định là id

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Định dạng số tự động, bật mặc định, có độ ưu tiên cao nhất.

Khi autoFormat=true, toàn bộ cấu hình numFormat sẽ bị ghi đè.

Khi bật, nhãn dữ liệu và tooltip của biểu đồ sẽ tự động chọn định dạng phù hợp theo giá trị chỉ số và locale.

Quy tắc định dạng: số thập phân bật compact notation, tối thiểu 0 chữ số thập phân, tối đa 2 chữ số thập phân, tự động làm tròn, dùng Intl.NumberFormat của trình duyệt.

Ví dụ:

- locale=zh-CN: 749740.264 → 74.45~74.45万

- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mô tả}
Định dạng số tùy chỉnh cho chỉ số; tự động áp dụng cho nhãn và tooltip.

Lưu ý: để dùng định dạng tùy chỉnh, cần đặt rõ autoFormat=false; nếu không autoFormat sẽ ghi đè cấu hình này.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mô tả}
Kiểu định dạng số, hỗ trợ: số (thập phân), phần trăm (%), phần nghìn (‰), ký hiệu khoa học

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mô tả}
Tỷ lệ định dạng số, không được là 0

:::

**Ví dụ**
- 100000 được chuyển thành 10W , ratio:10000, symbol:"W"
- 100000 được chuyển thành 10K , ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Mô tả}
Ký hiệu định dạng số, ví dụ %, ‰

:::

**Ví dụ**
- 100000 được chuyển thành 10W , ratio:10000, symbol:"W"
- 100000 được chuyển thành 10K , ratio:1000, symbol:"K"



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
Số chữ số thập phân cho định dạng số, dùng minimumFractionDigits và maximumFractionDigits của Intl.NumberFormat trong trình duyệt; ưu tiên thấp hơn significantDigits.

:::

**Ví dụ**
- 1234.5678 được chuyển thành 1235 , fractionDigits:0 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1234.6 , fractionDigits:1 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1234.57 , fractionDigits:2 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1230.568 , fractionDigits:3 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1234.5678 , fractionDigits:4 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1234.56780 , fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
Chữ số có nghĩa cho định dạng số, dùng minimumSignificantDigits và maximumSignificantDigits của Intl.NumberFormat trong trình duyệt; ưu tiên cao hơn fractionDigits.

:::

**Ví dụ**
- 1234.5678 được chuyển thành 1000 , significantDigits:1
- 1234.5678 được chuyển thành 1200 , significantDigits:2
- 1234.5678 được chuyển thành 1230 , significantDigits:3
- 1234.5678 được chuyển thành 1234 , significantDigits:4
- 1234.5678 được chuyển thành 1234.6 , significantDigits:5 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1234.57 , significantDigits:6 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1234.568 , significantDigits:7 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1234.5678 , significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mô tả}
Ưu tiên làm tròn khi cả significantDigits và fractionDigits đều được đặt; dùng Intl.NumberFormat của trình duyệt và tuân theo quy tắc giống roundingPriority.

:::

**Ví dụ**
- 1234.5678 được chuyển thành 1230 , significantDigits:3 (roundingPriority:lessPrecision)
- 1234.5678 được chuyển thành 1234.5678 , significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Chế độ làm tròn cho định dạng số, dùng Intl.NumberFormat của trình duyệt và tuân theo quy tắc giống roundingMode.

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mô tả}
Kiểu định dạng số, hỗ trợ: số (thập phân), phần trăm (%), phần nghìn (‰), ký hiệu khoa học

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mô tả}
Tỷ lệ định dạng số, không được là 0

:::

**Ví dụ**
- 100000 được chuyển thành 10W , ratio:10000, symbol:"W"
- 100000 được chuyển thành 10K , ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Mô tả}
Ký hiệu định dạng số, ví dụ %, ‰

:::

**Ví dụ**
- 100000 được chuyển thành 10W , ratio:10000, symbol:"W"
- 100000 được chuyển thành 10K , ratio:1000, symbol:"K"



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
Số chữ số thập phân cho định dạng số, dùng minimumFractionDigits và maximumFractionDigits của Intl.NumberFormat trong trình duyệt; ưu tiên thấp hơn significantDigits.

:::

**Ví dụ**
- 1234.5678 được chuyển thành 1235 , fractionDigits:0 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1234.6 , fractionDigits:1 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1234.57 , fractionDigits:2 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1230.568 , fractionDigits:3 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1234.5678 , fractionDigits:4 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1234.56780 , fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
Chữ số có nghĩa cho định dạng số, dùng minimumSignificantDigits và maximumSignificantDigits của Intl.NumberFormat trong trình duyệt; ưu tiên cao hơn fractionDigits.

:::

**Ví dụ**
- 1234.5678 được chuyển thành 1000 , significantDigits:1
- 1234.5678 được chuyển thành 1200 , significantDigits:2
- 1234.5678 được chuyển thành 1230 , significantDigits:3
- 1234.5678 được chuyển thành 1234 , significantDigits:4
- 1234.5678 được chuyển thành 1234.6 , significantDigits:5 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1234.57 , significantDigits:6 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1234.568 , significantDigits:7 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1234.5678 , significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mô tả}
Ưu tiên làm tròn khi cả significantDigits và fractionDigits đều được đặt; dùng Intl.NumberFormat của trình duyệt và tuân theo quy tắc giống roundingPriority.

:::

**Ví dụ**
- 1234.5678 được chuyển thành 1230 , significantDigits:3 (roundingPriority:lessPrecision)
- 1234.5678 được chuyển thành 1234.5678 , significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Chế độ làm tròn cho định dạng số, dùng Intl.NumberFormat của trình duyệt và tuân theo quy tắc giống roundingMode.

:::

### encoding

**Type:** `"column" | undefined`

:::note{title=Mô tả}
Kênh mà chỉ số được ánh xạ tới:

- column: cột chỉ số

:::

### parentId

**Type:** `string | undefined`

:::note{title=Mô tả}
Trong cấu hình chỉ số phẳng, xây dựng cấu trúc chỉ số dạng cây. parentId trỏ tới ID của nhóm chỉ số cha và dùng để xây dựng phân cấp.

:::

:::tip{title=Tip}
Có hai cách cấu hình cây chỉ số: Cách 1 cấu hình trực tiếp cây chỉ số với children; Cách 2 cung cấp danh sách chỉ số phẳng với parentId. Hai cách này không thể dùng đồng thời.

:::


## page

**Type:** `Page | undefined`

:::note{title=Mô tả}
Cấu hình phân trang. Chỉ định tên trường phân trang, trường này phải là một chiều.

:::


### field

**Type:** `string`

:::note{title=Mô tả}
Trường phân trang; chỉ định tên trường cho phân trang, phải là một chiều.

:::

### currentValue

**Type:** `string`

:::note{title=Mô tả}
Giá trị phân trang hiện tại; chỉ định giá trị dùng để xác định trang hiện tại.

:::

**Ví dụ**
'2023-01-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Mô tả}
Màu nền biểu đồ. Mặc định là trong suốt. Có thể là chuỗi màu (ví dụ 'red', 'blue') hoặc giá trị hex, rgb, rgba (ví dụ '#ff0000', 'rgba(255,0,0,0.5)').

:::


## borderColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu viền của bảng.

:::


## bodyFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Cỡ chữ phần thân bảng.

:::


## bodyFontColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu chữ phần thân bảng.

:::


## bodyBackgroundColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nền phần thân bảng.

:::


## headerFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Cỡ chữ tiêu đề hàng và cột.

:::


## headerFontColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu chữ tiêu đề hàng và cột.

:::


## headerBackgroundColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nền tiêu đề hàng và cột.

:::


## hoverHeaderBackgroundColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nền khi hover trên ô tiêu đề hàng hoặc cột, dùng để làm nổi bật ô tại giao điểm của hàng và cột đang hover.

:::


## hoverHeaderInlineBackgroundColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nền khi hover trên ô tiêu đề hàng hoặc cột, dùng để làm nổi bật tất cả ô trong hàng và cột đang hover.

:::


## selectedBorderColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu viền của ô được chọn, dùng để làm nổi bật.

:::


## selectedBackgroundColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nền của ô được chọn, dùng để làm nổi bật.

:::


## bodyCellStyle

**Type:** `BodyCellStyle | BodyCellStyle[] | undefined`

:::note{title=Mô tả}
Đặt kiểu đặc biệt cho các ô trong phần thân bảng.

:::


### selector

**Type:** `Selector | Selectors | FieldSelector | undefined`

:::note{title=Mô tả}
Selector dữ liệu.

Nếu cấu hình `selector`, nó cung cấp bốn khả năng khớp dữ liệu: selector số, selector dữ liệu cục bộ, selector chiều có điều kiện và selector chỉ số có điều kiện.

Nếu không cấu hình `selector`, kiểu sẽ áp dụng toàn cục.

Lưu ý: `selector` và `dynamicFilter` không thể dùng đồng thời; `dynamicFilter` có ưu tiên cao hơn.

:::

**Ví dụ**
Selector số:
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

Selector dữ liệu cục bộ:
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

Selector chiều có điều kiện:
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

Selector chỉ số có điều kiện:
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

Bộ lọc cột trường:
selector = {
field: 'category'
}
selector = {
field: ['category', 'profit']
}




#### field

**Type:** `string | string[]`

:::note{title=Mô tả}
Tên trường; có thể là một trường đơn hoặc mảng trường.

:::

**Ví dụ**
Trường đơn:
field: 'sales'

Nhiều trường:
field: ['sales', 'profit', 'revenue']



#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử:

- in: Chọn các mục dữ liệu có giá trị trường chiều nằm trong danh sách 'value'.

- not in: Chọn các mục dữ liệu có giá trị trường chiều không nằm trong danh sách 'value'.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử:

- in: Chọn các mục dữ liệu có giá trị trường chiều nằm trong danh sách 'value'.

- not in: Chọn các mục dữ liệu có giá trị trường chiều không nằm trong danh sách 'value'.

Giống operator.

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Giá trị chiều cần chọn; hỗ trợ mảng.

:::

### dynamicFilter

**Type:** `TableDynamicFilter | undefined`

:::note{title=Mô tả}
Bộ lọc động (điều khiển bằng mã).

Triển khai logic lọc dữ liệu phức tạp bằng mã JavaScript do AI tạo.
Phù hợp với Top N, phân tích thống kê, điều kiện phức tạp và các tình huống mà selector tĩnh không đủ.

Khả năng cốt lõi:

- Hỗ trợ mọi điều kiện lọc dữ liệu phức tạp.

- Sử dụng các hàm tiện ích tích hợp cho thao tác dữ liệu.

- Thực thi an toàn trong môi trường trình duyệt (sandbox Web Worker).

Yêu cầu: chỉ hỗ trợ môi trường trình duyệt; môi trường Node.js sẽ dùng fallback.

Lưu ý: `selector` và `dynamicFilter` không thể dùng đồng thời; `dynamicFilter` có ưu tiên cao hơn.

Cấu hình bộ lọc động của bảng.

Triển khai lọc chính xác ở cấp ô bằng mã JavaScript do AI tạo.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Mô tả}
Mô tả yêu cầu lọc của người dùng (ngôn ngữ tự nhiên).

:::

**Ví dụ**
"Làm nổi bật các ô có doanh số lớn hơn 1000."

"Làm nổi bật ô có giá trị lớn nhất trong mỗi hàng."



#### code

**Type:** `string`

:::note{title=Mô tả}
Mã JavaScript lọc do AI tạo.

- Chỉ được dùng các hàm tiện ích tích hợp (truy cập qua _ hoặc R).

- Tham số đầu vào: data (mảng); mỗi mục có trường `_index` biểu thị số dòng.

- Phải trả về mảng selector ô: Array<{ __row_index: number, field: string }>.

- Khi `field` là "*", toàn bộ hàng sẽ được làm nổi bật.

- Bị cấm: eval, Function, thao tác bất đồng bộ, DOM API, yêu cầu mạng.

:::

**Ví dụ**
Bộ lọc Top N:
dynamicFilter = {
type: 'row-with-field',
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

Bộ lọc nhiều điều kiện:
dynamicFilter = {
type: 'row-with-field',
description: 'Làm nổi bật sản phẩm có biên lợi nhuận > 20% và doanh số > 5000',
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

Bộ lọc giá trị tương đối:
dynamicFilter = {
type: 'row-with-field',
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

Bộ lọc theo nhóm:
dynamicFilter = {
type: 'row-with-field',
description: 'Làm nổi bật sản phẩm bán chạy nhất trong mỗi khu vực',
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

Làm nổi bật toàn bộ hàng:
dynamicFilter = {
description: 'Làm nổi bật các hàng có doanh số vượt lợi nhuận',
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
ID trường chiều.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử:

- in: Chọn các mục dữ liệu có giá trị trường chiều nằm trong danh sách 'value'.

- not in: Chọn các mục dữ liệu có giá trị trường chiều không nằm trong danh sách 'value'.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử:

- in: Chọn các mục dữ liệu có giá trị trường chiều nằm trong danh sách 'value'.

- not in: Chọn các mục dữ liệu có giá trị trường chiều không nằm trong danh sách 'value'.

Giống operator.

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Giá trị chiều cần chọn; hỗ trợ mảng.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Mô tả}
Kết quả thực thi bộ lọc động (trường runtime). Được ghi trong giai đoạn `prepare()`; chỉ đọc khi runtime.

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
Màu nền ô.

:::

### enableBackgroundColorScale

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật thang màu cho nền ô hay không.

:::

### backgroundColorScale

**Type:** `{ minValue?: number; maxValue?: number; minColor: string; maxColor: string; } | undefined`

:::note{title=Mô tả}
Ánh xạ thang màu nền ô; có ưu tiên cao hơn `backgroundColor`.

:::


#### minValue

**Type:** `number | undefined`

:::note{title=Mô tả}
Giá trị nhỏ nhất; nếu không cấu hình, mặc định là giá trị nhỏ nhất trong cột dữ liệu hiện tại.

:::

#### maxValue

**Type:** `number | undefined`

:::note{title=Mô tả}
Giá trị lớn nhất; nếu không cấu hình, mặc định là giá trị lớn nhất trong cột dữ liệu hiện tại.

:::

#### minColor

**Type:** `string`

:::note{title=Mô tả}
Màu tương ứng với giá trị nhỏ nhất.

:::

#### maxColor

**Type:** `string`

:::note{title=Mô tả}
Màu tương ứng với giá trị lớn nhất.

:::

### enableProgressBar

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật thanh tiến trình nền (thanh phản ánh độ lớn của ô) hay không. Mặc định tắt.

:::

### barPositiveColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu của thanh nền khi giá trị ô là số dương.

:::

### barNegativeColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu của thanh nền khi giá trị ô là số âm.

:::

### barMin

**Type:** `number | undefined`

:::note{title=Mô tả}
Giá trị nhỏ nhất cho thanh tiến trình.
Nếu không cấu hình, tự động tính từ giá trị nhỏ nhất của cột.

:::

### barMax

**Type:** `number | undefined`

:::note{title=Mô tả}
Giá trị lớn nhất cho thanh tiến trình.
Nếu không cấu hình, tự động tính từ giá trị lớn nhất của cột.

:::

### textColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu chữ của ô.

:::

### textFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Cỡ chữ của ô.

:::

### borderColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu viền của ô.

:::

### borderLineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ rộng đường viền ô.

:::


## indicatorsAsCol

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Chỉ số có hiển thị thành cột hay không. Khi `true`, chỉ số mở rộng theo chiều ngang (cột); khi `false`, mở rộng theo chiều dọc (hàng).

:::

**Ví dụ**
true




## totals

**Type:** `PivotTableTotals | undefined`

:::note{title=Mô tả}
Cấu hình tổng cộng và tổng phụ cho Pivot Table.

:::

**Ví dụ**
{ row: { showGrandTotals: true, showSubTotals: true, subTotalsDimensions: ['category'] } }




### row

**Type:** `RowOrColumnTotalConfig | undefined`

:::note{title=Mô tả}
Cấu hình tổng cộng và tổng phụ cho hàng.

:::


#### showGrandTotals

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị tổng cộng (hàng/cột tổng) hay không.

:::

#### showSubTotals

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị tổng phụ hay không.

:::

#### subTotalsDimensions

**Type:** `string[] | undefined`

:::note{title=Mô tả}
Chiều dùng cho tổng phụ; nhóm tổng phụ theo các chiều này.

:::

**Ví dụ**
['category', 'region']



### column

**Type:** `RowOrColumnTotalConfig | undefined`

:::note{title=Mô tả}
Cấu hình tổng cộng và tổng phụ cho cột.

:::


#### showGrandTotals

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị tổng cộng (hàng/cột tổng) hay không.

:::

#### showSubTotals

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị tổng phụ hay không.

:::

#### subTotalsDimensions

**Type:** `string[] | undefined`

:::note{title=Mô tả}
Chiều dùng cho tổng phụ; nhóm tổng phụ theo các chiều này.

:::

**Ví dụ**
['category', 'region']




## theme

**Type:** `Theme | undefined`

:::note{title=Mô tả}
Theme biểu đồ. Theme là cấu hình có ưu tiên thấp hơn, chứa thiết lập chung dùng cho mọi loại biểu đồ và thiết lập riêng dùng trong một nhóm biểu đồ.

Theme sáng và tối được tích hợp; người dùng có thể định nghĩa theme tùy chỉnh thông qua Builder.

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
Locale. Cấu hình ngôn ngữ biểu đồ; hỗ trợ 'zh-CN' và 'en-US'. Hoặc gọi `intl.setLocale('zh-CN')` để đặt ngôn ngữ.

:::
