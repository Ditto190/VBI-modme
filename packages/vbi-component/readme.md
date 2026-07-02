# @visactor/vbi-component

A shared Web Component library for **VBI (VisActor Business Intelligence)**, built using [Stencil](https://stenciljs.com/).

Since these are standard Web Components, they can be consumed in any major frontend framework (React, Vue, Angular, Svelte) or directly in vanilla HTML/JavaScript.

---

## Installation

Install the package via npm or pnpm:

```bash
pnpm add @visactor/vbi-component
```

---

## Usage

To register and use the Web Components in your project (e.g., React, Vue, or Vanilla JS), import the package directly at your project's entry point file (such as `main.ts`, `index.tsx`, or `app.tsx`):

### 1. In React / Vue / Angular / Svelte Applications

```typescript
import '@visactor/vbi-component'
```

### 2. Direct Usage in HTML (Script Tag)

If using in static HTML files or applications without a bundler, you can directly embed the script via `<script>` tags:

```html
<!-- For browsers supporting ES Modules -->
<script type="module" src="node_modules/@visactor/vbi-component/dist/vbi-component/vbi-component.esm.js"></script>

<!-- Fallback for older browsers -->
<script nomodule src="node_modules/@visactor/vbi-component/dist/vbi-component/vbi-component.js"></script>
```

Once registered, custom elements like `<vbi-config-provider>` and `<vbi-button>` will be ready to use in your DOM.

---

## Components

Below is the list of available web components in this library and their detailed documentation:

### UI Components

| Component               | Documentation                                                  | Description                                                                      |
| :---------------------- | :------------------------------------------------------------- | :------------------------------------------------------------------------------- |
| `<vbi-config-provider>` | [readme.md](./src/components/ui/vbi-config-provider/readme.md) | Root configuration provider managing theme and coordinating the VBI store state. |
| `<vbi-button>`          | [readme.md](./src/components/ui/vbi-button/readme.md)          | Basic button component.                                                          |
| `<vbi-dropdown>`        | [readme.md](./src/components/ui/vbi-dropdown/readme.md)        | Dropdown menu component.                                                         |
| `<vbi-icon>`            | [readme.md](./src/components/ui/vbi-icon/readme.md)            | Icon component.                                                                  |
| `<vbi-input>`           | [readme.md](./src/components/ui/vbi-input/readme.md)           | Input field component.                                                           |
| `<vbi-join>`            | [readme.md](./src/components/ui/vbi-join/readme.md)            | Join layout component.                                                           |
| `<vbi-loading>`         | [readme.md](./src/components/ui/vbi-loading/readme.md)         | Loading indicator component.                                                     |
| `<vbi-tooltip>`         | [readme.md](./src/components/ui/vbi-tooltip/readme.md)         | Tooltip component.                                                               |

### Chart Components

| Component             | Documentation                                                   | Description                   |
| :-------------------- | :-------------------------------------------------------------- | :---------------------------- |
| `<vbi-chart-editor>`  | [readme.md](./src/components/chart/vbi-chart-editor/readme.md)  | Chart editor component.       |
| `<vbi-chart-toolbar>` | [readme.md](./src/components/chart/vbi-chart-toolbar/readme.md) | Toolbar for chart operations. |

---

## Development

Run the following commands from the `packages/vbi-component` folder:

### Local Dev Server

Build and run the components locally with hot reloading:

```bash
pnpm run start
```

### Storybook

Build and preview components inside Storybook:

```bash
pnpm run build
```

```bash
pnpm run storybook
```

### Testing

Run unit/spec tests:

```bash
pnpm run test
```

Run browser/E2E tests:

```bash
pnpm run test:browser
```

### Build

Build the component library for production distribution:

```bash
pnpm run build
```
