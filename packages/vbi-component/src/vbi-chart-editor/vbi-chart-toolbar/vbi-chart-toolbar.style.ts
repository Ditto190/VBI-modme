import { css, type CSSResultGroup } from 'lit'
import { defaultStyles } from 'src/shared/styles'

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      display: block;
      max-width: 100%;
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    .toolbar {
      --toolbar-bg-start: rgba(248, 250, 252, 0.96);
      --toolbar-bg-end: rgba(255, 255, 255, 0.98);
      --toolbar-border: #e5e7eb;
      --toolbar-button-bg: #ffffff;
      --toolbar-button-border: #d7dce3;
      --toolbar-button-hover: #1677ff;
      --toolbar-button-selected-bg: #e6f4ff;
      --toolbar-button-selected-border: #91caff;
      --toolbar-icon: #3f4652;
      --toolbar-muted: #8a929f;
      --toolbar-text: #222832;
      background: linear-gradient(90deg, var(--toolbar-bg-start) 0%, var(--toolbar-bg-end) 100%);
      border: 1px solid var(--vbi-chart-toolbar-border, transparent);
      color: var(--toolbar-text);
      overflow-x: auto;
      padding: var(--vbi-chart-toolbar-padding, 4px 6px);
      scrollbar-width: thin;
      width: 100%;
    }

    .toolbar--dark {
      --toolbar-bg-start: rgba(17, 24, 39, 0.96);
      --toolbar-bg-end: rgba(24, 32, 46, 0.92);
      --toolbar-border: rgba(148, 163, 184, 0.24);
      --toolbar-button-bg: rgba(255, 255, 255, 0.08);
      --toolbar-button-border: rgba(203, 213, 225, 0.28);
      --toolbar-button-hover: #69b1ff;
      --toolbar-button-selected-bg: rgba(64, 150, 255, 0.22);
      --toolbar-button-selected-border: rgba(105, 177, 255, 0.72);
      --toolbar-icon: #d8dee9;
      --toolbar-muted: #9aa7b7;
      --toolbar-text: #f6f7fb;
    }

    .toolbar__inner {
      align-items: center;
      display: flex;
      gap: 12px;
      justify-content: space-between;
      min-width: max-content;
    }

    .toolbar__group {
      align-items: center;
      display: inline-flex;
      flex: 0 0 auto;
      gap: 6px;
      white-space: nowrap;
    }

    .button-group,
    .theme-switch {
      align-items: center;
      display: inline-flex;
      flex: 0 0 auto;
    }

    .button-group {
      border-radius: 6px;
      overflow: hidden;
    }

    .divider {
      background: var(--toolbar-border);
      display: inline-block;
      flex: 0 0 auto;
      height: 16px;
      width: 1px;
    }

    button,
    input {
      color: inherit;
      font: inherit;
    }

    .icon-button,
    .theme-option {
      align-items: center;
      appearance: none;
      background: var(--toolbar-button-bg);
      border: 1px solid var(--toolbar-button-border);
      color: var(--toolbar-icon);
      cursor: pointer;
      display: inline-flex;
      height: 24px;
      justify-content: center;
      line-height: 1;
      margin: 0;
      outline: none;
      padding: 0;
      transition:
        background-color 0.16s ease,
        border-color 0.16s ease,
        color 0.16s ease;
      width: 26px;
    }

    .icon-button:first-child {
      border-bottom-left-radius: 6px;
      border-top-left-radius: 6px;
      border-right-width: 0;
    }

    .icon-button:last-child {
      border-bottom-right-radius: 6px;
      border-top-right-radius: 6px;
    }

    .icon-button:hover:not(:disabled),
    .icon-button:focus-visible:not(:disabled),
    .theme-option:hover,
    .theme-option:focus-visible {
      border-color: var(--toolbar-button-hover);
      color: var(--toolbar-button-hover);
      position: relative;
      z-index: 1;
    }

    .icon-button:focus-visible,
    .theme-option:focus-visible,
    .limit-input:focus-visible {
      box-shadow: 0 0 0 2px color-mix(in srgb, var(--toolbar-button-hover) 16%, transparent);
    }

    .icon-button:disabled {
      color: var(--toolbar-muted);
      cursor: not-allowed;
      opacity: 0.56;
    }

    .toolbar-icon {
      align-items: center;
      display: inline-flex;
      height: 14px;
      justify-content: center;
      width: 14px;
    }

    .toolbar-icon svg {
      display: block;
      fill: none;
      height: 14px;
      stroke: currentColor;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 1.8;
      width: 14px;
    }

    .limit-control {
      align-items: center;
      display: inline-flex;
      position: relative;
    }

    .limit-input {
      appearance: textfield;
      background: var(--toolbar-button-bg);
      border: 1px solid var(--toolbar-button-border);
      border-radius: 6px;
      color: var(--toolbar-text);
      height: 24px;
      line-height: 22px;
      outline: none;
      padding: 0 22px 0 8px;
      transition:
        border-color 0.16s ease,
        box-shadow 0.16s ease;
      width: 96px;
    }

    .limit-input::-webkit-outer-spin-button,
    .limit-input::-webkit-inner-spin-button {
      appearance: none;
      margin: 0;
    }

    .limit-input:hover,
    .limit-input:focus-visible {
      border-color: var(--toolbar-button-hover);
    }

    .limit-info {
      color: var(--toolbar-muted);
      display: inline-flex;
      inset-inline-end: 7px;
      pointer-events: none;
      position: absolute;
    }

    .theme-switch {
      background: color-mix(in srgb, var(--toolbar-button-bg) 84%, transparent);
      border: 1px solid var(--toolbar-button-border);
      border-radius: 6px;
      gap: 2px;
      padding: 1px;
    }

    .theme-option {
      background: transparent;
      border-color: transparent;
      border-radius: 4px;
      height: 22px;
      width: 24px;
    }

    .theme-option--selected {
      background: var(--toolbar-button-selected-bg);
      border-color: var(--toolbar-button-selected-border);
      color: var(--toolbar-button-hover);
    }

    .sr-only {
      clip: rect(0 0 0 0);
      border: 0;
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      white-space: nowrap;
      width: 1px;
    }

    @supports not (color: color-mix(in srgb, #000 50%, transparent)) {
      .icon-button:focus-visible,
      .theme-option:focus-visible,
      .limit-input:focus-visible {
        box-shadow: 0 0 0 2px rgba(22, 119, 255, 0.16);
      }

      .theme-switch {
        background: var(--toolbar-button-bg);
      }
    }
  `,
]

export default styles
