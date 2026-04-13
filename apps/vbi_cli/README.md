# vbi_cli

Headless BI CLI built on `@visactor/vbi-provider`.

## Usage

Set `VBI_API_BASE_URL` if backend is not running on `http://localhost:3030/api/v1`.

```bash
pnpm --filter=vbi_cli run build
node apps/vbi_cli/dist/cli.js chart list
node apps/vbi_cli/dist/cli.js report page reorder <reportId> --page-ids page-2,page-1
```

## Commands

```bash
vbi chart list
vbi chart get <chartId>
vbi chart create --name Revenue
vbi chart update <chartId> --name RevenueV2
vbi chart remove <chartId>

vbi insight list
vbi insight get <insightId>
vbi insight create --name Summary --content "Quarterly summary"
vbi insight update <insightId> --content "Updated summary"
vbi insight remove <insightId>

vbi report list
vbi report get <reportId>
vbi report create --name Review
vbi report update <reportId> --name ReviewV2
vbi report remove <reportId>
vbi report snapshot <reportId>

vbi report page add <reportId> --title "Page 2"
vbi report page update <reportId> <pageId> --title "Overview" --chart-id <chartId> --insight-id <insightId>
vbi report page remove <reportId> <pageId>
vbi report page reorder <reportId> --page-ids page-2,page-1
```

All commands return JSON to stdout and use the SDK remote Provider runtime internally.
