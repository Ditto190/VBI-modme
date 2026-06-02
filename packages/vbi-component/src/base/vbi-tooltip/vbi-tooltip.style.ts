import { css, type CSSResultGroup } from 'lit'
import { defaultStyles } from 'src/shared/styles'

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    /* ── Host ────────────────────────────────────────── */

    :host {
      display: var(--vbi-tooltip-host-display, inline-block);
      position: var(--vbi-tooltip-host-position, relative);
    }

    /* ── Trigger ─────────────────────────────────────── */

    .vbi-tooltip__trigger {
      display: var(--vbi-tooltip-trigger-display, inline-flex);
    }

    /* ── Popup ───────────────────────────────────────── */

    .vbi-tooltip__popup {
      background: var(--vbi-tooltip-bg, rgba(0, 0, 0, 0.85));
      border-radius: var(--vbi-tooltip-radius, 6px);
      box-shadow: var(
        --vbi-tooltip-shadow,
        0 6px 16px 0 rgba(0, 0, 0, 0.08),
        0 3px 6px -4px rgba(0, 0, 0, 0.12),
        0 9px 28px 8px rgba(0, 0, 0, 0.05)
      );
      color: var(--vbi-tooltip-color, #ffffff);
      font-size: var(--vbi-tooltip-font-size, 14px);
      line-height: var(--vbi-tooltip-line-height, 1.5714285714);
      max-width: var(--vbi-tooltip-max-width, 250px);
      min-height: var(--vbi-tooltip-min-height, 32px);
      padding: var(--vbi-tooltip-padding, 6px 8px);
      pointer-events: var(--vbi-tooltip-pointer-events, none);
      position: var(--vbi-tooltip-position, absolute);
      text-align: var(--vbi-tooltip-text-align, start);
      white-space: var(--vbi-tooltip-white-space, normal);
      width: var(--vbi-tooltip-width, max-content);
      word-wrap: var(--vbi-tooltip-word-wrap, break-word);
      z-index: var(--vbi-tooltip-z-index, 1070);
    }

    /* ── Visibility ──────────────────────────────────── */

    .vbi-tooltip__popup--hidden {
      opacity: var(--vbi-tooltip-hidden-opacity, 0);
      visibility: var(--vbi-tooltip-hidden-visibility, hidden);
    }

    .vbi-tooltip__popup--visible {
      opacity: var(--vbi-tooltip-visible-opacity, 1);
      transition: var(--vbi-tooltip-transition, opacity 0.1s cubic-bezier(0.645, 0.045, 0.355, 1));
      visibility: var(--vbi-tooltip-visible-visibility, visible);
    }

    /* ── Arrow ───────────────────────────────────────── */

    .vbi-tooltip__arrow {
      height: var(--vbi-tooltip-arrow-size, 8px);
      position: var(--vbi-tooltip-arrow-position, absolute);
      width: var(--vbi-tooltip-arrow-size, 8px);
    }

    .vbi-tooltip__arrow::after {
      background: var(--vbi-tooltip-arrow-bg, rgba(0, 0, 0, 0.85));
      content: '';
      display: var(--vbi-tooltip-arrow-display, block);
      height: var(--vbi-tooltip-arrow-size, 8px);
      position: var(--vbi-tooltip-arrow-inner-position, absolute);
      transform: var(--vbi-tooltip-arrow-transform, rotate(45deg));
      width: var(--vbi-tooltip-arrow-size, 8px);
    }

    .vbi-tooltip__arrow--hidden {
      display: var(--vbi-tooltip-arrow-hidden-display, none);
    }

    /* ── Placement: top ──────────────────────────────── */

    .vbi-tooltip__popup--top {
      bottom: var(--vbi-tooltip-top-bottom, 100%);
      left: var(--vbi-tooltip-top-left, 50%);
      margin-bottom: var(--vbi-tooltip-top-margin, 8px);
      transform: var(--vbi-tooltip-top-transform, translateX(-50%));
    }

    .vbi-tooltip__popup--top .vbi-tooltip__arrow {
      bottom: var(--vbi-tooltip-top-arrow-bottom, -4px);
      left: var(--vbi-tooltip-top-arrow-left, 50%);
      transform: var(--vbi-tooltip-top-arrow-transform, translateX(-50%));
    }

    /* ── Placement: bottom ───────────────────────────── */

    .vbi-tooltip__popup--bottom {
      left: var(--vbi-tooltip-bottom-left, 50%);
      margin-top: var(--vbi-tooltip-bottom-margin, 8px);
      top: var(--vbi-tooltip-bottom-top, 100%);
      transform: var(--vbi-tooltip-bottom-transform, translateX(-50%));
    }

    .vbi-tooltip__popup--bottom .vbi-tooltip__arrow {
      left: var(--vbi-tooltip-bottom-arrow-left, 50%);
      top: var(--vbi-tooltip-bottom-arrow-top, -4px);
      transform: var(--vbi-tooltip-bottom-arrow-transform, translateX(-50%));
    }

    /* ── Placement: left ─────────────────────────────── */

    .vbi-tooltip__popup--left {
      margin-right: var(--vbi-tooltip-left-margin, 8px);
      right: var(--vbi-tooltip-left-right, 100%);
      top: var(--vbi-tooltip-left-top, 50%);
      transform: var(--vbi-tooltip-left-transform, translateY(-50%));
    }

    .vbi-tooltip__popup--left .vbi-tooltip__arrow {
      right: var(--vbi-tooltip-left-arrow-right, -4px);
      top: var(--vbi-tooltip-left-arrow-top, 50%);
      transform: var(--vbi-tooltip-left-arrow-transform, translateY(-50%));
    }

    /* ── Placement: right ────────────────────────────── */

    .vbi-tooltip__popup--right {
      left: var(--vbi-tooltip-right-left, 100%);
      margin-left: var(--vbi-tooltip-right-margin, 8px);
      top: var(--vbi-tooltip-right-top, 50%);
      transform: var(--vbi-tooltip-right-transform, translateY(-50%));
    }

    .vbi-tooltip__popup--right .vbi-tooltip__arrow {
      left: var(--vbi-tooltip-right-arrow-left, -4px);
      top: var(--vbi-tooltip-right-arrow-top, 50%);
      transform: var(--vbi-tooltip-right-arrow-transform, translateY(-50%));
    }

    /* ── Modifier: dark ──────────────────────────────── */

    .vbi-tooltip__popup--dark {
      --vbi-tooltip-bg: var(--vbi-tooltip-dark-bg, #ffffff);
      --vbi-tooltip-color: var(--vbi-tooltip-dark-color, rgba(0, 0, 0, 0.88));
      --vbi-tooltip-shadow: var(
        --vbi-tooltip-dark-shadow,
        0 6px 16px 0 rgba(0, 0, 0, 0.08),
        0 3px 6px -4px rgba(0, 0, 0, 0.12),
        0 9px 28px 8px rgba(0, 0, 0, 0.05)
      );
    }

    .vbi-tooltip__popup--dark .vbi-tooltip__arrow::after {
      --vbi-tooltip-arrow-bg: var(--vbi-tooltip-dark-arrow-bg, #ffffff);
    }
  `,
]

export default styles
