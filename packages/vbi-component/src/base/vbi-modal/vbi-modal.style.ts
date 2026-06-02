import { css, type CSSResultGroup } from 'lit'
import { defaultStyles } from 'src/shared/styles'

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    /* ── Host ────────────────────────────────────────── */

    :host {
      font-size: var(--vbi-modal-font-size, 14px);
      line-height: var(--vbi-modal-line-height, 1.5714285714);
    }

    /* ── Root ────────────────────────────────────────── */

    .vbi-modal__root {
      inset: var(--vbi-modal-root-inset, 0);
      position: var(--vbi-modal-root-position, fixed);
      z-index: var(--vbi-modal-root-z-index, 1000);
    }

    .vbi-modal__root--hidden {
      pointer-events: var(--vbi-modal-root-hidden-pointer-events, none);
      visibility: var(--vbi-modal-root-hidden-visibility, hidden);
    }

    /* ── Mask ────────────────────────────────────────── */

    .vbi-modal__mask {
      background: var(--vbi-modal-mask-bg, rgba(0, 0, 0, 0.45));
      inset: var(--vbi-modal-mask-inset, 0);
      position: var(--vbi-modal-mask-position, fixed);
      z-index: var(--vbi-modal-mask-z-index, 1000);
    }

    .vbi-modal__mask--visible {
      animation: var(--vbi-modal-mask-in-animation, vbi-modal-fade-in 0.2s cubic-bezier(0.3, 1.3, 0.3, 1));
      opacity: var(--vbi-modal-mask-visible-opacity, 1);
    }

    .vbi-modal__mask--hidden {
      animation: var(--vbi-modal-mask-out-animation, vbi-modal-fade-out 0.2s cubic-bezier(0.3, 1.3, 0.3, 1));
      opacity: var(--vbi-modal-mask-hidden-opacity, 0);
    }

    /* ── Wrap ────────────────────────────────────────── */

    .vbi-modal__wrap {
      align-items: var(--vbi-modal-wrap-align-items, center);
      display: var(--vbi-modal-wrap-display, flex);
      inset: var(--vbi-modal-wrap-inset, 0);
      justify-content: var(--vbi-modal-wrap-justify-content, center);
      overflow: var(--vbi-modal-wrap-overflow, auto);
      outline: var(--vbi-modal-wrap-outline, 0);
      padding: var(--vbi-modal-wrap-padding, 16px 0);
      position: var(--vbi-modal-wrap-position, fixed);
      z-index: var(--vbi-modal-wrap-z-index, 1000);
    }

    /* ── Modal ───────────────────────────────────────── */

    .vbi-modal {
      background: var(--vbi-modal-bg, #ffffff);
      border-radius: var(--vbi-modal-radius, 8px);
      box-shadow: var(
        --vbi-modal-shadow,
        0 6px 16px 0 rgba(0, 0, 0, 0.08),
        0 3px 6px -4px rgba(0, 0, 0, 0.12),
        0 9px 28px 8px rgba(0, 0, 0, 0.05)
      );
      color: var(--vbi-modal-color, rgba(0, 0, 0, 0.88));
      display: var(--vbi-modal-display, flex);
      flex-direction: var(--vbi-modal-flex-direction, column);
      margin: var(--vbi-modal-margin, 0 auto);
      max-height: var(--vbi-modal-max-height, calc(100vh - 32px));
      max-width: var(--vbi-modal-max-width, calc(100vw - 32px));
      outline: var(--vbi-modal-outline, none);
      pointer-events: var(--vbi-modal-pointer-events, auto);
      position: var(--vbi-modal-position, relative);
      width: var(--vbi-modal-width, 520px);
    }

    .vbi-modal--visible {
      animation: var(--vbi-modal-in-animation, vbi-modal-zoom-in 0.2s cubic-bezier(0.3, 1.3, 0.3, 1));
    }

    .vbi-modal--hidden {
      animation: var(--vbi-modal-out-animation, vbi-modal-zoom-out 0.2s cubic-bezier(0.3, 1.3, 0.3, 1));
    }

    /* ── Close button ───────────────────────────────── */

    .vbi-modal__close {
      align-items: var(--vbi-modal-close-align-items, center);
      background: var(--vbi-modal-close-bg, transparent);
      border: var(--vbi-modal-close-border, none);
      border-radius: var(--vbi-modal-close-radius, 4px);
      color: var(--vbi-modal-close-color, rgba(0, 0, 0, 0.45));
      cursor: var(--vbi-modal-close-cursor, pointer);
      display: var(--vbi-modal-close-display, flex);
      font-size: var(--vbi-modal-close-font-size, 16px);
      height: var(--vbi-modal-close-height, 22px);
      justify-content: var(--vbi-modal-close-justify-content, center);
      line-height: var(--vbi-modal-close-line-height, 1);
      outline: var(--vbi-modal-close-outline, none);
      padding: var(--vbi-modal-close-padding, 0);
      position: var(--vbi-modal-close-position, absolute);
      right: var(--vbi-modal-close-right, 16px);
      top: var(--vbi-modal-close-top, 16px);
      transition: var(--vbi-modal-close-transition, color 0.2s, background 0.2s);
      width: var(--vbi-modal-close-width, 22px);
      z-index: var(--vbi-modal-close-z-index, 1);
    }

    .vbi-modal__close:hover {
      background: var(--vbi-modal-close-hover-bg, rgba(0, 0, 0, 0.06));
      color: var(--vbi-modal-close-hover-color, rgba(0, 0, 0, 0.88));
    }

    .vbi-modal__close:active {
      background: var(--vbi-modal-close-active-bg, rgba(0, 0, 0, 0.1));
      color: var(--vbi-modal-close-active-color, rgba(0, 0, 0, 0.88));
    }

    .vbi-modal__close-icon {
      display: var(--vbi-modal-close-icon-display, block);
      fill: var(--vbi-modal-close-icon-fill, none);
      height: var(--vbi-modal-close-icon-height, 1em);
      stroke: var(--vbi-modal-close-icon-stroke, currentColor);
      stroke-linecap: var(--vbi-modal-close-icon-stroke-linecap, round);
      stroke-linejoin: var(--vbi-modal-close-icon-stroke-linejoin, round);
      stroke-width: var(--vbi-modal-close-icon-stroke-width, 2);
      width: var(--vbi-modal-close-icon-width, 1em);
    }

    /* ── Header ──────────────────────────────────────── */

    .vbi-modal__header {
      align-items: var(--vbi-modal-header-align-items, center);
      border-bottom: var(--vbi-modal-header-border-bottom, none);
      display: var(--vbi-modal-header-display, flex);
      padding: var(--vbi-modal-header-padding, 16px 24px);
    }

    .vbi-modal__title {
      color: var(--vbi-modal-title-color, rgba(0, 0, 0, 0.88));
      flex: var(--vbi-modal-title-flex, 1);
      font-size: var(--vbi-modal-title-font-size, 16px);
      font-weight: var(--vbi-modal-title-font-weight, 600);
      line-height: var(--vbi-modal-title-line-height, 1.5);
      margin: var(--vbi-modal-title-margin, 0);
      overflow: var(--vbi-modal-title-overflow, hidden);
      text-overflow: var(--vbi-modal-title-text-overflow, ellipsis);
      white-space: var(--vbi-modal-title-white-space, nowrap);
      word-wrap: var(--vbi-modal-title-word-wrap, break-word);
    }

    /* ── Body ────────────────────────────────────────── */

    .vbi-modal__body {
      flex: var(--vbi-modal-body-flex, 1 1 auto);
      font-size: var(--vbi-modal-body-font-size, 14px);
      overflow: var(--vbi-modal-body-overflow, auto);
      padding: var(--vbi-modal-body-padding, 8px 24px);
      word-wrap: var(--vbi-modal-body-word-wrap, break-word);
    }

    /* ── Footer ──────────────────────────────────────── */

    .vbi-modal__footer {
      display: var(--vbi-modal-footer-display, flex);
      gap: var(--vbi-modal-footer-gap, 8px);
      justify-content: var(--vbi-modal-footer-justify-content, flex-end);
      padding: var(--vbi-modal-footer-padding, 12px 24px 16px);
    }

    /* ── Size: small ─────────────────────────────────── */

    .vbi-modal--size-small {
      --vbi-modal-width: var(--vbi-modal-size-small-width, 416px);
    }

    /* ── Size: large ─────────────────────────────────── */

    .vbi-modal--size-large {
      --vbi-modal-width: var(--vbi-modal-size-large-width, 800px);
    }

    /* ── Modifier: fullscreen ────────────────────────── */

    .vbi-modal--fullscreen {
      border-radius: var(--vbi-modal-fullscreen-radius, 0);
      height: var(--vbi-modal-fullscreen-height, 100vh);
      max-height: var(--vbi-modal-fullscreen-max-height, 100vh);
      max-width: var(--vbi-modal-fullscreen-max-width, 100vw);
      width: var(--vbi-modal-fullscreen-width, 100vw);
    }

    /* ── Confirm variant ─────────────────────────────── */

    .vbi-modal__confirm-body {
      align-items: var(--vbi-modal-confirm-body-align-items, flex-start);
      display: var(--vbi-modal-confirm-body-display, flex);
      gap: var(--vbi-modal-confirm-body-gap, 12px);
      padding: var(--vbi-modal-confirm-body-padding, 20px 24px 12px);
    }

    .vbi-modal__confirm-icon {
      color: var(--vbi-modal-confirm-icon-color, #faad14);
      flex-shrink: var(--vbi-modal-confirm-icon-flex-shrink, 0);
      font-size: var(--vbi-modal-confirm-icon-font-size, 22px);
      line-height: var(--vbi-modal-confirm-icon-line-height, 1);
    }

    .vbi-modal__confirm-icon--info {
      color: var(--vbi-modal-confirm-icon-info-color, #1677ff);
    }

    .vbi-modal__confirm-icon--success {
      color: var(--vbi-modal-confirm-icon-success-color, #52c41a);
    }

    .vbi-modal__confirm-icon--error {
      color: var(--vbi-modal-confirm-icon-error-color, #ff4d4f);
    }

    .vbi-modal__confirm-icon--warning {
      color: var(--vbi-modal-confirm-icon-warning-color, #faad14);
    }

    .vbi-modal__confirm-content {
      flex: var(--vbi-modal-confirm-content-flex, 1);
    }

    .vbi-modal__confirm-title {
      color: var(--vbi-modal-confirm-title-color, rgba(0, 0, 0, 0.88));
      font-size: var(--vbi-modal-confirm-title-font-size, 16px);
      font-weight: var(--vbi-modal-confirm-title-font-weight, 600);
      line-height: var(--vbi-modal-confirm-title-line-height, 1.5);
    }

    .vbi-modal__confirm-description {
      color: var(--vbi-modal-confirm-description-color, rgba(0, 0, 0, 0.65));
      font-size: var(--vbi-modal-confirm-description-font-size, 14px);
      margin-top: var(--vbi-modal-confirm-description-margin-top, 8px);
    }

    /* ── Animations ──────────────────────────────────── */

    @keyframes vbi-modal-zoom-in {
      from {
        opacity: 0;
        transform: scale(0.8);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes vbi-modal-zoom-out {
      from {
        opacity: 1;
        transform: scale(1);
      }
      to {
        opacity: 0;
        transform: scale(0.8);
      }
    }

    @keyframes vbi-modal-fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes vbi-modal-fade-out {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
  `,
]

export default styles
