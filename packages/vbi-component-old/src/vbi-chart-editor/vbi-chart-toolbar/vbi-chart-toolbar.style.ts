import { css, type CSSResultGroup } from 'lit'
import { defaultStyles } from 'src/shared/styles'

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      display: block;
      overflow-x: auto;
    }

    .toolbar {
      background: var(--wa-color-surface-lowered);
      border-radius: var(--wa-border-radius-l);
      display: flex;
      gap: var(--wa-space-s);
      justify-content: space-between;
      min-width: max-content;
      padding: var(--wa-space-xs) var(--wa-space-s);
    }

    .toolbar__left {
      display: flex;
      flex: 0 0 auto;
      gap: var(--wa-space-s);
    }

    .toolbar__right {
      flex: 0 0 auto;
    }

    .history-button::part(base) {
      background: var(--wa-color-surface-raised);
    }

    .history-button:hover::part(base),
    .history-button:focus-visible::part(base) {
      background: var(--wa-color-brand-fill-quiet);
      border-color: var(--wa-color-brand-border-normal);
      color: var(--wa-color-brand-on-quiet);
    }

    .toolbar-tooltip-text {
      font-size: var(--wa-font-size-xs);
      margin: 0;
    }
  `,
]

export default styles
