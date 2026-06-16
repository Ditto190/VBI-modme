import { css, type CSSResultGroup } from 'lit'
import { defaultStyles } from 'src/shared/styles'

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      display: flex;
      flex-direction: column;
      border: 1px solid var(--wa-color-neutral-border-normal);
      border-radius: var(--wa-border-radius-l);
      background: var(--wa-color-surface-raised);
      overflow: hidden;
    }

    /* ── Header ── */

    .fields-header {
      padding: var(--wa-space-xs) var(--wa-space-s);
    }

    .fields-header__title {
      font-size: var(--wa-font-size-s);
      margin: 0;
    }

    .fields-header__divider {
      --color: var(--wa-color-neutral-border-normal);
      --spacing: 0;
    }

    /* ── Search row ── */

    .fields-search {
      display: flex;
      gap: var(--wa-space-xs);
      padding: var(--wa-space-s) var(--wa-space-xs);
    }

    .fields-search wa-input {
      flex: 1 1 0;
      min-width: 0;
    }

    .fields-search wa-input::part(base) {
      font-size: var(--wa-font-size-xs);
    }

    /* ── Scrollable area ── */

    .fields-scroll {
      display: flex;
      flex-direction: column;
      flex: 1 1 auto;
      overflow-y: auto;
      padding: var(--wa-space-xs) var(--wa-space-s) var(--wa-space-s);
      gap: var(--wa-space-s);
    }

    /* ── Section (Dimensions / Measures) ── */

    .fields-section {
      display: flex;
      flex-direction: column;
      gap: var(--wa-space-2xs);
    }

    .fields-section__label {
      font-size: var(--wa-font-size-xs);
      font-weight: var(--wa-font-weight-bold);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--wa-color-neutral-on-subtle);
      margin: 0;
    }

    /* ── Field item ── */

    .fields-list {
      display: flex;
      flex-direction: column;
      gap: var(--wa-space-3xs);
    }

    .field-item {
      display: flex;
      align-items: center;
      gap: var(--wa-space-s);
      padding: var(--wa-space-2xs) var(--wa-space-xs);
      border-radius: var(--wa-border-radius-m);
      cursor: grab;
      user-select: none;
      transition: background var(--wa-transition-fast);
      border-width: 1px;
      border-style: solid;
      border-color: transparent;
    }

    .field-item:hover {
      background: var(--wa-color-brand-fill-quiet);
      border-color: var(--wa-color-brand-border-normal);
    }

    .field-item:active {
      cursor: grabbing;
    }

    .field-item--dragging {
      opacity: 0.45;
    }

    .field-item__icon {
      flex: 0 0 auto;
      font-size: var(--wa-font-size-xs);
    }

    .field-item__icon--dimension {
      color: var(--wa-color-brand-on-normal);
    }

    .field-item__icon--measure {
      color: var(--wa-color-success-on-normal);
    }

    .field-item__name {
      font-size: var(--wa-font-size-xs);
      line-height: var(--wa-line-height-normal);
      color: var(--wa-color-neutral-on-normal);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* ── Divider ── */

    wa-divider {
      --spacing: var(--wa-space-xs);
      --color: var(--wa-color-neutral-border-subtle);
    }
  `,
]

export default styles
