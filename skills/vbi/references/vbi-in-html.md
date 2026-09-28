# 在 HTML 中使用 VBI

适用于不使用框架、npm 安装或本地打包工具的单页 HTML。用浏览器原生 `<script type="module">`，通过 jsDelivr 的 npm ESM 入口导入 `@visactor/vbi` 的命名导出 `VBI`。

## 最小用法

```html
<!doctype html>
<html lang="zh-CN">
  <meta charset="utf-8" />
  <title>VBI ESM</title>
  <pre id="output">加载中…</pre>
  <script type="module">
    import { VBI } from 'https://cdn.jsdelivr.net/npm/@visactor/vbi@0.6.0/+esm'

    const builder = VBI.chart.create(VBI.chart.createEmpty('sales'))
    builder.chartType.changeChartType('column')
    builder.dimensions.add('region', (node) => node.setAlias('地区'))
    builder.measures.add('sales', (node) => node.setAlias('销售额').setAggregate({ func: 'sum' }))

    document.querySelector('#output').textContent = JSON.stringify(
      { dsl: builder.build(), query: builder.buildVQuery() },
      null,
      2,
    )
  </script>
</html>
```

这段代码只构建图表 DSL 和查询 DSL，因此不需要注册连接器。`VBI.chart.createEmpty()` 返回初始 DSL，`VBI.chart.create()` 将其转成 Builder；维度、度量、聚合与图表类型都通过 Builder 配置。

`VBI` 是模块内导入的对象，不会自动成为 `window.VBI`。普通 `<script src="…">` 不能代替 ESM 导入；单独写 `<script type="module" src="…">` 也不会把导出注入另一个脚本的作用域。

## 完整示例：查询并渲染柱状图

以下四个包各自负责一个环节：

| 包                 | 职责                                            |
| ------------------ | ----------------------------------------------- |
| `@visactor/vbi`    | 管理图表 DSL，通过 Builder 生成查询和 VSeed DSL |
| `@visactor/vquery` | 执行本地数据的分组、聚合等查询                  |
| `@visactor/vseed`  | 把 VSeed DSL 转成图表配置                       |
| `@visactor/vchart` | 把图表配置渲染到 HTML 容器                      |

保存下面的内容为 `index.html`。示例显式选择 VQuery 的浏览器入口，数据直接写在 HTML 中。

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>在 HTML 中使用 VBI</title>
    <style>
      body {
        font-family: sans-serif;
        margin: 24px;
      }
      #chart {
        height: 360px;
      }
      pre {
        white-space: pre-wrap;
      }
    </style>
  </head>
  <body>
    <h1>各地区销售额</h1>
    <p id="status">正在加载模块…</p>
    <div id="chart"></div>
    <details>
      <summary>查看 DSL 和查询结果</summary>
      <pre id="output"></pre>
    </details>
    <script type="module">
      import { VBI } from 'https://cdn.jsdelivr.net/npm/@visactor/vbi@0.6.0/+esm'
      import { VQuery } from 'https://cdn.jsdelivr.net/npm/@visactor/vquery@0.6.0/dist/browser/esm/browser.js/+esm'
      import { Builder, registerAll } from 'https://cdn.jsdelivr.net/npm/@visactor/vseed@0.6.0/+esm'
      import VChart from 'https://cdn.jsdelivr.net/npm/@visactor/vchart@2.0.23-alpha.6/+esm'

      const status = document.querySelector('#status')
      try {
        registerAll()
        const connectorId = 'vbi-html-sales'
        const schema = [
          { name: 'region', type: 'string' },
          { name: 'sales', type: 'number' },
        ]
        const vquery = new VQuery()
        const source = {
          type: 'json',
          rawDataset: [
            { region: '华东', sales: 100 },
            { region: '华东', sales: 200 },
            { region: '华北', sales: 150 },
          ],
        }
        if (await vquery.hasDataset(connectorId)) {
          await vquery.updateDatasetSource(connectorId, schema, source)
        } else {
          await vquery.createDataset(connectorId, schema, source)
        }
        VBI.connectors.register(connectorId, {
          discoverSchema: async () => schema,
          query: async ({ queryDSL }) => {
            const dataset = await vquery.connectDataset(connectorId)
            try {
              return await dataset.query(queryDSL)
            } finally {
              await dataset.disconnect()
            }
          },
        })

        const builder = VBI.chart.create(VBI.chart.createEmpty(connectorId))
        builder.chartType.changeChartType('column')
        builder.dimensions.add('region', (node) => node.setAlias('地区'))
        builder.measures.add('sales', (node) => node.setAlias('销售额').setAggregate({ func: 'sum' }))
        const vbiDSL = builder.build()
        const queryDSL = builder.buildVQuery()
        const vseed = await builder.buildVSeed()
        const spec = Builder.from(vseed).build()
        const chart = new VChart(spec, { dom: document.querySelector('#chart') })
        chart.renderSync()
        document.querySelector('#output').textContent = JSON.stringify(
          { vbiDSL, queryDSL, dataset: vseed.dataset },
          null,
          2,
        )
        status.textContent = '加载成功'
        window.addEventListener('pagehide', () => chart.release(), { once: true })
      } catch (error) {
        status.textContent = `运行失败：${error.message}`
        console.error(error)
      }
    </script>
  </body>
</html>
```

在 `index.html` 所在目录启动静态服务器，例如已安装 Python 3 时：

```bash
python3 -m http.server 8080
```

打开 [http://localhost:8080](http://localhost:8080)。页面应显示两根柱子：华东为 `100 + 200 = 300`，华北为 `150`。展开“查看 DSL 和查询结果”可检查生成的配置和实际聚合结果。浏览器需要能访问 `cdn.jsdelivr.net`。

## 接入要点

- `builder.build()` 返回可序列化保存的图表 DSL；恢复时使用 `VBI.chart.create(savedDSL)`。数据连接器由运行环境注册，不随 DSL 自动保存。
- `builder.buildVQuery()` 只生成查询；`await builder.buildVSeed()` 会调用连接器的 `discoverSchema()` 和 `query()`，因此此前必须注册与 `connectorId` 相同的连接器。
- 连接器需要执行传入的 `queryDSL`。本例委托 VQuery 实现，不在页面里手写聚合逻辑。查询结果的列名是生成的维度、度量 ID，需保留这些列名供 VSeed 使用。
- VQuery 的浏览器实现使用 IndexedDB 保存数据。本例通过 `hasDataset()` 在首次加载时创建数据集，刷新时用 `updateDatasetSource()` 更新，避免重复创建同名数据集。
- `registerAll()` 注册 VSeed 的构建能力，在调用 `Builder.from(vseed).build()` 之前执行。VBI 自身不负责 DOM 渲染。
- 使用固定版本的 `+esm` URL。[jsDelivr 的 ESM 服务](https://www.jsdelivr.com/esm)将 npm 包和依赖转换为浏览器可加载的模块。原始 `dist/index.js` 仍含 `yjs` 等裸模块说明符，浏览器直接加载时还需要完整的 import map；不能仅因文件含有 `import` 就把它当成可独立加载的浏览器入口。

更多操作见 [VBI API](api/vbi.md)、[chartBuilder API](api/chart-builder.md)。

## 三个可运行示例

每个示例都是独立 HTML，包含样式、固定演示数据和 ESM 脚本，仍需联网加载 npm 模块。大屏示例需一并保留相邻的 `assets/large-screen-live-preview.png` 场景图片；另外两个示例复制单个 HTML 即可运行。

| 示例                                                      | 交互与用途                                                                                                           |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| [大屏 dashboard](../examples/large-screen-dashboard.html) | 深青色三栏直播大屏，镜像条图、双层环图、双轴柱线图、核心指标和商品排行；地区筛选、趋势时段、错峰入场、全屏、导出配置 |
| [轻量 dashboard](../examples/lightweight-dashboard.html)  | 左侧主指标卡与右侧三张小卡，薄荷绿趋势、订单占比、可展开区域明细；7/12/30 天切换、错峰入场、导出配置                 |
| [精致 chart](../examples/polished-chart.html)             | 暖色营收图表，日均与峰值摘要；7/30 天切换、趋势/柱状切换、导出配置                                                   |

在仓库根目录运行：

```bash
python3 -m http.server 8080 --directory skills/vbi/examples
```

然后打开 [示例目录](http://localhost:8080/)，选择相应 HTML。页面中的“近 7 天”固定指演示数据的 `2026-09-24` 至 `2026-09-30`，不随系统日期变化。三个示例使用一致的销售明细：全月合计 `¥3,134,979`，近 7 天合计 `¥846,865`。大屏总览保持全月口径，筛选华东后显示 `¥899,697`，趋势时段切换不改变总览。

两个 dashboard 使用 `VBI.dashboard` 管理图表引用和 `lg` / `xs` 布局，HTML 只把布局映射为 CSS Grid。筛选通过各图表的 `whereFilter` Builder 执行，统计查询由 VQuery 完成。图表外观通过 VSeed 顶层的 `color`、`label`、`legend` 等属性配置。

大屏采用左侧三块分析、中央销售总额与六项指标、右侧直播示意画面及排行的三栏布局，底部中央放置趋势图。7 个组件的布局和资源引用保存在 dashboard DSL 中；直播画面通过 insight 资源引用本地图片。镜像条图将同一个查询结果的场次、收入分别渲染，环图将收入和消费人次渲染为两个同色环；渐变、双轴单位和细线装饰由渲染层处理。收入图例、环图扇区使用相同顺序，单位分别明确为万元、人次或百分比。

大屏的地区筛选作用于全部数据组件，趋势的 7/30 天切换只作用于趋势图。平均转化率是当天各地区、渠道记录转化率的算术平均；消费渗透率则用总消费人次除以总观看人次，人均观看用总观看分钟除以总观看人次。顶部时钟显示当前本地时间，数据日期始终是 2026 年 9 月。首次渲染后，标题、面板、指标和排行共 25 个组件按约 85ms 间隔逐个淡入上移，筛选和缩放不重播；`prefers-reduced-motion: reduce` 时直接显示。直播图片为 AI 生成的场景示意，生成提示保存在 [素材提示文件](../examples/assets/large-screen-live-preview.prompt.txt)。

轻量 dashboard 的销售、订单和利润变化均与前一等长周期比较，演示数据额外包含 8 月 2 日至 31 日，供全月比较使用。环形指标表示所选时段的线上商城订单占比；迷你柱图显示最近七天的毛利润，纵轴从零开始。

轻量示例首次加载数据后，标题、指标卡、辅助指标和区域明细按 95ms 间隔依次淡入上移；日期切换只更新数据。卡片支持随指针或触摸位置轻微倾斜和径向高光，移开或松手后以弹簧阻尼回正。入场使用外层容器，倾斜使用内层卡片，避免覆盖彼此的 `transform`。启用 `prefers-reduced-motion: reduce` 时，组件直接显示并关闭倾斜和动画；触摸操作保留页面滚动。

“下载配置”导出业务 DSL：dashboard 示例包含 `dashboard` 和 `resources`，单图示例包含 `chart`。恢复 dashboard 时先注册资源，再创建 Builder：

```javascript
VBI.resources.register({
  charts: Object.values(saved.resources.charts),
  insights: Object.values(saved.resources.insights),
})
const dashboard = VBI.dashboard.create(saved.dashboard)
```

导出文件不包含数据和连接器；查询前仍需注册对应的 `connectorId`。页面重新加载时会用固定演示数据初始化，并回到默认筛选。图表替换时释放旧的 VChart 实例，窗口尺寸变化时按容器实际宽高调用 `resize(width, height)`。

## 实验记录

先在本地 HTTP 页面中用 Chrome 153 实验，再编写本文。实测版本为 VBI、VQuery、VSeed `0.6.0`，VChart `2.0.23-alpha.6`。

- jsDelivr `+esm`：完成模块加载、Builder 配置、分组求和、图表渲染，并通过页面刷新和展开查询结果的复验。结果为华东 `300`、华北 `150`，未出现浏览器运行错误。
- 直接使用 `https://esm.sh/@visactor/vbi@0.6.0`：本次实验在传递依赖加载阶段出现 `getContextFont` 命名导出缺失，因此示例采用已通过验证的 jsDelivr 入口。更换 CDN、版本或参数后需重新验证整个流程。
- 三个独立示例：通过桌面和 390px 窄屏渲染、筛选、JSON 导出、刷新验证；dashboard 的导出 DSL 可在独立 VBI 实例中恢复资源引用和布局，大屏全屏切换及单图类型切换通过，未出现控制台错误。
- 轻量指标卡改版：通过 320–1440px 布局、7/12/30 天切换、区域明细键盘展开、配置导出与恢复、刷新和 `file://` 直接打开验证。确认 10 个组件按 95ms 错峰入场，日期切换不重播；指针倾斜、触摸松手回正、页面滚动和减少动态效果模式均通过，未出现控制台错误。
- 大屏参考图改版：先验证已发布 ESM 的镜像条图、双层环图和双轴柱线配置，再实现三栏页面。通过 320–2048px 布局、地区筛选、趋势 7/30 天切换、全屏、刷新、配置导出与独立资源恢复；确认 25 个组件有不同的入场延迟，筛选和缩放不重播，减少动态效果时直接显示，未出现控制台错误。
