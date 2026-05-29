import { css, type CSSResultGroup } from 'lit'
import { defaultStyles } from 'src/shared/styles'

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    /* ── Host ────────────────────────────────────────── */

    :host {
      display: var(--vbi-button-host-display, inline-block);
      font-family: var(--vbi-button-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    }

    :host([hidden]) {
      display: var(--vbi-button-host-hidden-display, none);
    }

    /* ── Base ────────────────────────────────────────── */

    .vbi-button {
      align-items: var(--vbi-button-align-items, center);
      background: var(--vbi-button-bg, #ffffff);
      border-color: var(--vbi-button-border, #d9d9d9);
      border-style: var(--vbi-button-border-style, solid);
      border-width: var(--vbi-button-border-width, 1px);
      border-radius: var(--vbi-button-radius, 6px);
      box-shadow: var(--vbi-button-shadow, 0 2px 0 rgba(0, 0, 0, 0.02));
      color: var(--vbi-button-color, rgba(0, 0, 0, 0.88));
      cursor: var(--vbi-button-cursor, pointer);
      display: var(--vbi-button-display, inline-flex);
      font-size: var(--vbi-button-font-size, 14px);
      font-weight: var(--vbi-button-font-weight, 400);
      gap: var(--vbi-button-gap, 8px);
      justify-content: var(--vbi-button-justify-content, center);
      line-height: var(--vbi-button-line-height, 1.5714285714);
      outline: var(--vbi-button-outline, none);
      padding: var(--vbi-button-padding, 4px 15px);
      position: var(--vbi-button-position, relative);
      text-decoration: var(--vbi-button-text-decoration, none);
      touch-action: var(--vbi-button-touch-action, manipulation);
      transition: var(--vbi-button-transition, all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1));
      user-select: var(--vbi-button-user-select, none);
      white-space: var(--vbi-button-white-space, nowrap);
    }

    .vbi-button:hover {
      border-color: var(--vbi-button-hover-border, #4096ff);
      color: var(--vbi-button-hover-color, #4096ff);
    }

    .vbi-button:active {
      border-color: var(--vbi-button-active-border, #0958d9);
      color: var(--vbi-button-active-color, #0958d9);
    }

    .vbi-button:disabled,
    .vbi-button.vbi-button--loading {
      cursor: var(--vbi-button-disabled-cursor, not-allowed);
      opacity: var(--vbi-button-disabled-opacity, 0.65);
      pointer-events: var(--vbi-button-disabled-pointer-events, none);
    }

    /* ── Type: primary ──────────────────────────────── */

    .vbi-button--primary {
      --vbi-button-bg: var(--vbi-button-primary-bg, #1677ff);
      --vbi-button-border: var(--vbi-button-primary-border, #1677ff);
      --vbi-button-color: var(--vbi-button-primary-color, #ffffff);
      --vbi-button-shadow: var(--vbi-button-primary-shadow, 0 2px 0 rgba(5, 145, 255, 0.1));
      --vbi-button-hover-border: var(--vbi-button-primary-hover-border, #69b1ff);
      --vbi-button-hover-color: var(--vbi-button-primary-hover-color, #ffffff);
      --vbi-button-active-border: var(--vbi-button-primary-active-border, #003eb3);
      --vbi-button-active-color: var(--vbi-button-primary-active-color, #ffffff);
    }

    .vbi-button--primary:hover {
      background: var(--vbi-button-primary-hover-bg, #4096ff);
      box-shadow: var(--vbi-button-primary-hover-shadow, 0 4px 10px rgba(22, 119, 255, 0.28));
    }

    .vbi-button--primary:active {
      background: var(--vbi-button-primary-active-bg, #0958d9);
      box-shadow: var(--vbi-button-primary-active-shadow, 0 2px 6px rgba(9, 88, 217, 0.28));
    }

    /* ── Type: dashed ───────────────────────────────── */

    .vbi-button--dashed {
      border-style: var(--vbi-button-dashed-border-style, dashed);
    }

    /* ── Type: text ─────────────────────────────────── */

    .vbi-button--text {
      --vbi-button-bg: var(--vbi-button-text-bg, transparent);
      --vbi-button-border: var(--vbi-button-text-border, transparent);
      --vbi-button-shadow: var(--vbi-button-text-shadow, none);
      padding-inline: var(--vbi-button-text-padding-inline, 4px);
    }

    .vbi-button--text:hover {
      background: var(--vbi-button-text-hover-bg, rgba(0, 0, 0, 0.06));
      color: var(--vbi-button-text-hover-color, rgba(0, 0, 0, 0.88));
    }

    .vbi-button--text:active {
      background: var(--vbi-button-text-active-bg, rgba(0, 0, 0, 0.15));
      color: var(--vbi-button-text-active-color, rgba(0, 0, 0, 0.88));
    }

    .vbi-button--text.vbi-button--danger:hover {
      background: var(--vbi-button-text-danger-hover-bg, rgba(255, 77, 79, 0.12));
      color: var(--vbi-button-color, #ff4d4f);
    }

    .vbi-button--text.vbi-button--danger:active {
      background: var(--vbi-button-text-danger-active-bg, rgba(255, 77, 79, 0.2));
      color: var(--vbi-button-active-color, #d9363e);
    }

    .vbi-button--text.vbi-button--dark {
      --vbi-button-bg: var(--vbi-button-text-dark-bg, transparent);
      --vbi-button-border: var(--vbi-button-text-dark-border, transparent);
      --vbi-button-shadow: var(--vbi-button-text-dark-shadow, none);
      --vbi-button-color: var(--vbi-button-text-dark-color, rgba(255, 255, 255, 0.88));
      --vbi-button-hover-color: var(--vbi-button-text-dark-hover-color, #ffffff);
      --vbi-button-active-color: var(--vbi-button-text-dark-active-color, #ffffff);
    }

    .vbi-button--text.vbi-button--dark:hover {
      background: var(--vbi-button-text-dark-hover-bg, rgba(255, 255, 255, 0.16));
      border-color: var(--vbi-button-text-dark-hover-border, transparent);
      color: var(--vbi-button-hover-color, #ffffff);
    }

    .vbi-button--text.vbi-button--dark:active {
      background: var(--vbi-button-text-dark-active-bg, rgba(255, 255, 255, 0.24));
      border-color: var(--vbi-button-text-dark-active-border, transparent);
      color: var(--vbi-button-active-color, #ffffff);
    }

    /* ── Modifier: danger ───────────────────────────── */

    .vbi-button--danger {
      --vbi-button-color: var(--vbi-button-danger-color, #ff4d4f);
      --vbi-button-hover-color: var(--vbi-button-danger-hover-color, #ff7875);
      --vbi-button-active-color: var(--vbi-button-danger-active-color, #d9363e);
      --vbi-button-hover-border: var(--vbi-button-danger-hover-border, #ff7875);
      --vbi-button-active-border: var(--vbi-button-danger-active-border, #d9363e);
    }

    .vbi-button--primary.vbi-button--danger {
      --vbi-button-bg: var(--vbi-button-primary-danger-bg, #ff4d4f);
      --vbi-button-border: var(--vbi-button-primary-danger-border, #ff4d4f);
      --vbi-button-color: var(--vbi-button-primary-danger-color, #ffffff);
      --vbi-button-hover-border: var(--vbi-button-primary-danger-hover-border, #ff7875);
      --vbi-button-hover-color: var(--vbi-button-primary-danger-hover-color, #ffffff);
      --vbi-button-active-border: var(--vbi-button-primary-danger-active-border, #d9363e);
      --vbi-button-active-color: var(--vbi-button-primary-danger-active-color, #ffffff);
    }

    .vbi-button--primary.vbi-button--danger:hover {
      background: var(--vbi-button-primary-danger-hover-bg, #ff7875);
      box-shadow: var(--vbi-button-primary-danger-hover-shadow, 0 4px 10px rgba(255, 77, 79, 0.3));
    }

    .vbi-button--primary.vbi-button--danger:active {
      background: var(--vbi-button-primary-danger-active-bg, #d9363e);
      box-shadow: var(--vbi-button-primary-danger-active-shadow, 0 2px 6px rgba(217, 54, 62, 0.3));
    }

    /* ── Modifier: dark ─────────────────────────────── */

    .vbi-button.vbi-button--dark {
      --vbi-button-bg: var(--vbi-button-dark-bg, #141414);
      --vbi-button-border: var(--vbi-button-dark-border, #141414);
      --vbi-button-color: var(--vbi-button-dark-color, #ffffff);
      --vbi-button-shadow: var(--vbi-button-dark-shadow, none);
      --vbi-button-hover-border: var(--vbi-button-dark-hover-border, #434343);
      --vbi-button-hover-color: var(--vbi-button-dark-hover-color, #ffffff);
      --vbi-button-active-border: var(--vbi-button-dark-active-border, #000000);
      --vbi-button-active-color: var(--vbi-button-dark-active-color, #ffffff);
    }

    /* ── Size ────────────────────────────────────────── */

    .vbi-button--size-small {
      font-size: var(--vbi-button-size-small-font-size, 14px);
      min-height: var(--vbi-button-size-small-min-height, 24px);
      padding: var(--vbi-button-size-small-padding, 0 7px);
    }

    .vbi-button--size-middle {
      min-height: var(--vbi-button-size-middle-min-height, 32px);
      padding: var(--vbi-button-size-middle-padding, 4px 15px);
    }

    .vbi-button--size-large {
      font-size: var(--vbi-button-size-large-font-size, 16px);
      min-height: var(--vbi-button-size-large-min-height, 40px);
      padding: var(--vbi-button-size-large-padding, 7px 15px);
    }

    /* ── Shape ───────────────────────────────────────── */

    .vbi-button--shape-round {
      border-radius: var(--vbi-button-shape-round-radius, 999px);
    }

    .vbi-button--shape-circle {
      border-radius: var(--vbi-button-shape-circle-radius, 999px);
      padding-inline: var(--vbi-button-shape-circle-padding-inline, 0);
      width: var(--vbi-button-shape-circle-width, 32px);
    }

    .vbi-button--shape-circle.vbi-button--size-small {
      width: var(--vbi-button-shape-circle-small-width, 24px);
    }

    .vbi-button--shape-circle.vbi-button--size-large {
      width: var(--vbi-button-shape-circle-large-width, 40px);
    }

    /* ── Layout: block ──────────────────────────────── */

    .vbi-button--block {
      display: var(--vbi-button-block-display, flex);
      width: var(--vbi-button-block-width, 100%);
    }

    /* ── Inner elements ─────────────────────────────── */

    .vbi-content {
      align-items: var(--vbi-button-content-align-items, center);
      display: var(--vbi-button-content-display, inline-flex);
      gap: var(--vbi-button-content-gap, 8px);
      justify-content: var(--vbi-button-content-justify-content, center);
      min-width: var(--vbi-button-content-min-width, 0);
    }

    .vbi-label {
      overflow: var(--vbi-button-label-overflow, hidden);
      text-overflow: var(--vbi-button-label-text-overflow, ellipsis);
    }

    .vbi-spinner {
      animation: spin var(--vbi-button-spinner-duration, 0.7s) var(--vbi-button-spinner-timing-function, linear)
        var(--vbi-button-spinner-iteration-count, infinite);
      border-color: var(--vbi-button-spinner-border-color, currentColor);
      border-style: var(--vbi-button-spinner-border-style, solid);
      border-width: var(--vbi-button-spinner-border-width, 2px);
      border-right-color: var(--vbi-button-spinner-border-right-color, transparent);
      border-radius: var(--vbi-button-spinner-radius, 50%);
      display: var(--vbi-button-spinner-display, inline-block);
      height: var(--vbi-button-spinner-size, 12px);
      width: var(--vbi-button-spinner-size, 12px);
    }

    @keyframes spin {
      to {
        transform: rotate(var(--vbi-button-spinner-rotate, 360deg));
      }
    }
  `,
]

export default styles
