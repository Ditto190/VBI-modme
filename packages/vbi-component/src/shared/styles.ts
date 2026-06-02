import { css } from 'lit'

export const defaultStyles = css`
  :host {
    font-family: var(--vbi-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
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
