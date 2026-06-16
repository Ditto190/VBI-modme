import { css, type CSSResultGroup } from 'lit'
import { defaultStyles } from 'src/shared/styles'

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      display: block;
    }

    .shelf-panel {
      display: flex;
      flex-direction: column;
      gap: var(--wa-space-xs);
      border: 1px solid var(--wa-color-neutral-border-normal);
      border-radius: var(--wa-border-radius-l);
      background: var(--wa-color-surface-raised);
      padding: var(--wa-space-xs);
    }

    .shelf-header {
      display: flex;
      align-items: center;
      gap: var(--wa-space-xs);
      min-height: 24px;
      padding-inline: var(--wa-space-2xs);
    }

    .shelf-header__title {
      color: var(--wa-color-neutral-on-normal);
      font-size: var(--wa-font-size-s);
      font-weight: var(--wa-font-weight-bold);
      margin: 0;
    }

    .shelf-header__spacer {
      flex: 1;
    }

    .shelf-header__actions {
      display: flex;
      gap: var(--wa-space-3xs);
    }

    .shelf-header__action::part(base) {
      width: 22px;
      min-height: 22px;
      padding: 0;
    }

    .shelf-drop-zone {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--wa-space-2xs);
      min-height: 40px;
      padding: var(--wa-space-xs);
      border: 1px dashed var(--wa-color-neutral-border-normal);
      border-radius: var(--wa-border-radius-m);
      background: var(--wa-color-surface-default);
      transition:
        background var(--wa-transition-fast),
        border-color var(--wa-transition-fast),
        box-shadow var(--wa-transition-fast);
    }

    .shelf-drop-zone--active {
      border-color: var(--wa-color-brand-border-normal);
      background: var(--wa-color-brand-fill-quiet);
    }

    .shelf-drop-zone--over {
      border-style: solid;
      box-shadow: inset 0 0 0 1px var(--wa-color-brand-border-normal);
    }

    .shelf-empty {
      color: var(--wa-color-neutral-on-subtle);
      font-size: var(--wa-font-size-xs);
    }

    /* ── Shelf tokens ─────────────────────────────────────────── */

    .shelf-token {
      display: inline-flex;
      align-items: center;
      gap: var(--wa-space-2xs);
      max-width: 100%;
      min-height: 24px;
      padding: var(--wa-space-3xs) var(--wa-space-2xs);
      border: 1px solid #c8efbb;
      border-radius: var(--wa-border-radius-m);
      background: var(--wa-color-surface-raised);
      color: #389e0d;
      font-size: var(--wa-font-size-xs);
      cursor: pointer;
      transition:
        border-color var(--wa-transition-fast),
        background var(--wa-transition-fast);
    }

    .shelf-token:hover {
      border-color: #389e0d;
      background: #eef9e6;
    }

    .shelf-token--editing {
      border-color: #389e0d;
      background: #eef9e6;
      box-shadow: 0 0 0 1px #389e0d;
    }

    .shelf-token__icon {
      flex: 0 0 auto;
      color: #389e0d;
      font-size: var(--wa-font-size-xs);
    }

    .shelf-token__text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .shelf-token__remove::part(base) {
      width: 18px;
      min-height: 18px;
      padding: 0;
      color: #389e0d;
    }

    /* ── Popover editor ────────────────────────────────────────── */

    .shelf-popover-anchor {
      display: inline-flex;
      position: relative;
    }

    .shelf-popover {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 1000;
      margin-top: var(--wa-space-2xs);
      padding: var(--wa-space-s);
      border: 1px solid var(--wa-color-neutral-border-normal);
      border-radius: var(--wa-border-radius-l);
      background: var(--wa-color-surface-raised);
      box-shadow:
        0 4px 16px rgba(0, 0, 0, 0.08),
        0 2px 4px rgba(0, 0, 0, 0.04);
      min-width: 200px;
    }

    .editor-form {
      display: flex;
      flex-direction: column;
      gap: var(--wa-space-s);
    }

    .editor-field-group {
      display: flex;
      flex-direction: column;
      gap: var(--wa-space-3xs);
    }

    .editor-label {
      color: var(--wa-color-neutral-on-subtle);
      font-size: var(--wa-font-size-xs);
      font-weight: var(--wa-font-weight-medium);
    }

    .editor-actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--wa-space-xs);
      margin-top: var(--wa-space-xs);
    }
  `,
]

export default styles
