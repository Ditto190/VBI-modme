import { css } from 'lit'

export const defaultStyles = css`
  :host {
    box-sizing: border-box;
    font-family: var(--vbi-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  :host([hidden]) {
    display: none;
  }

  :host([disabled]),
  :host(:disabled) {
    cursor: not-allowed;
    pointer-events: none;
  }

  :host,
  * {
    scrollbar-color: var(--wa-color-neutral-border-normal) transparent;
    scrollbar-width: thin;
  }

  :host::-webkit-scrollbar,
  *::-webkit-scrollbar {
    height: var(--wa-space-2xs);
    width: var(--wa-space-2xs);
  }

  :host::-webkit-scrollbar-track,
  *::-webkit-scrollbar-track {
    background: transparent;
  }

  :host::-webkit-scrollbar-thumb,
  *::-webkit-scrollbar-thumb {
    background: var(--wa-color-neutral-border-normal);
    border-radius: var(--wa-border-radius-pill);
  }
`
