export const usage = () =>
  `
Usage:
  vbi chart list|get|create|update|remove
  vbi insight list|get|create|update|remove
  vbi report list|get|create|update|remove|snapshot
  vbi report page add|update|remove|reorder

Examples:
  vbi chart create --name Revenue
  vbi insight update <id> --content "Quarterly summary"
  vbi report page reorder <reportId> --page-ids page-2,page-1

Environment:
  VBI_API_BASE_URL   Backend API base URL, defaults to http://localhost:3030/api/v1
`.trim()
