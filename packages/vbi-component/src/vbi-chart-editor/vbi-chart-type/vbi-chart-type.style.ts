import { css, type CSSResultGroup } from 'lit'
import { defaultStyles } from 'src/shared/styles'

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      display: inline-block;
      max-width: 100%;
    }

    .truncate-label {
      max-width: 100%;
    }

    .truncate-label::part(label) {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .chart-type-popover {
      --max-width: var(--vbi-chart-type-panel-width, 45rem);
    }

    .chart-type-popover::part(body) {
      box-sizing: border-box;
      width: min(var(--vbi-chart-type-panel-width, 45rem), calc(100vw - (var(--wa-space-m, 1rem) * 2)));
      padding: 0;
    }

    .chart-type-header {
      border-bottom: var(--wa-border-width-s) solid var(--wa-color-neutral-border-normal);
      margin: 0;
      padding: var(--wa-space-s) var(--wa-space-m);
      font-size: var(--wa-font-size-s);
    }

    .chart-type-scroll {
      display: grid;
      gap: var(--wa-space-l);
      max-block-size: min(32rem, calc(100vh - 14rem));
      overflow-y: auto;
      padding: var(--wa-space-s) var(--wa-space-m);
      scrollbar-color: var(--wa-color-neutral-border-normal) transparent;
      scrollbar-width: thin;
    }
    .chart-type-scroll::-webkit-scrollbar {
      width: var(--wa-space-2xs);
    }
    .chart-type-scroll::-webkit-scrollbar-track {
      background: transparent;
    }
    .chart-type-scroll::-webkit-scrollbar-thumb {
      background: var(--wa-color-neutral-border-normal);
      border-radius: var(--wa-border-radius-pill);
    }

    .chart-type-group {
      display: grid;
      gap: var(--wa-space-s);
    }

    .chart-type-heading {
      margin: 0;
      font-size: var(--wa-font-size-xs);
    }

    .chart-type-grid {
      display: grid;
      gap: var(--wa-space-xs);
      grid-template-columns: repeat(
        auto-fill,
        minmax(min(max(6rem, calc((100% - (var(--wa-space-xs) * 4)) / 5)), 100%), 1fr)
      );
    }

    .chart-type-empty {
      margin: 0;
      font-size: var(--wa-font-size-xs);
    }
  `,
]

export default styles
