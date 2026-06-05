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
`
