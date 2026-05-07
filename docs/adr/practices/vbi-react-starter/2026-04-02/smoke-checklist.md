# Smoke Checklist: vbi-react Starter Demo

Updated: 2026-04-02
Scope: `practices/vbi-react-starter/src/**`

## Environment Setup

```bash
pnpm --filter=vbi-react-starter run test
pnpm --filter=vbi-react-starter run lint
pnpm --filter=website run build
```

Passing criteria:

- All commands exit with code = 0.
- The website build output includes the starter practice page.

## Manual Smoke Items

### 1. Desktop Viewport (1440x900)

- [ ] Open the starter demo page.
- [ ] After clicking `Load demo data`, the status area shows successful loading and row count.
- [ ] After adding dimensions and measures in the field panel, the main area renders the chart successfully.
- [ ] Switching `ChartTypeSelector` does not throw errors, and the chart updates correctly.

### 2. Narrow Viewport (390x844)

- [ ] Top bar buttons do not overlap, and key actions are clickable.
- [ ] `Show fields` / `Hide fields` toggles the left field panel visibility.
- [ ] After the field panel is collapsed, the main chart area remains viewable and interactive.

### 3. Error Path

- [ ] Uploading an invalid CSV shows an error-state message.
- [ ] After the error, clicking `Load demo data` still restores the usable state.
- [ ] The collapsed DSL panel can be expanded to inspect the current snapshot.

## Record Template

Executor: `<name>`
Execution time: `<YYYY-MM-DD HH:mm>`
Conclusion: `<PASS / FAIL>`
Notes: `<issue description and reproduction steps>`
