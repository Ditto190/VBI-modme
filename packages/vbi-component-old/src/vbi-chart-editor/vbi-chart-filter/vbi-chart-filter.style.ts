import { css } from 'lit'

export const vbiChartFilterStyle = css`
  :host {
    display: block;
    width: 100%;
    box-sizing: border-box;
    font-family: var(--wa-font-sans);
  }

  .filter-panel {
    border: 1px solid var(--wa-color-neutral-200);
    border-radius: var(--wa-border-radius-medium);
    background: var(--wa-color-neutral-0);
    padding: var(--wa-spacing-small);
  }

  .filter-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--wa-spacing-small);
    font-weight: var(--wa-font-weight-semibold);
  }

  .filter-title {
    font-size: var(--wa-font-size-small);
    color: var(--wa-color-neutral-700);
    text-transform: uppercase;
  }

  .filter-actions {
    display: flex;
    gap: var(--wa-spacing-2x-small);
  }

  .filter-list {
    display: flex;
    flex-direction: column;
    gap: var(--wa-spacing-small);
  }

  .filter-item {
    display: flex;
    align-items: flex-start;
    gap: var(--wa-spacing-small);
    padding: var(--wa-spacing-small);
    background: var(--wa-color-neutral-50);
    border: 1px solid var(--wa-color-neutral-200);
    border-radius: var(--wa-border-radius-medium);
    position: relative;
  }

  .filter-item-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--wa-spacing-2x-small);
  }

  .filter-item-text {
    font-size: var(--wa-font-size-small);
    color: var(--wa-color-neutral-900);
  }

  .filter-item-remove {
    cursor: pointer;
    color: var(--wa-color-neutral-500);
  }
  .filter-item-remove:hover {
    color: var(--wa-color-danger-600);
  }

  .filter-empty {
    text-align: center;
    padding: var(--wa-spacing-large);
    color: var(--wa-color-neutral-500);
    font-size: var(--wa-font-size-small);
    background: var(--wa-color-neutral-50);
    border: 1px dashed var(--wa-color-neutral-300);
    border-radius: var(--wa-border-radius-medium);
  }

  .filter-form {
    display: flex;
    flex-direction: column;
    gap: var(--wa-spacing-small);
    padding: var(--wa-spacing-medium);
    min-width: 300px;
    background: var(--wa-color-neutral-0);
    border: 1px solid var(--wa-color-neutral-200);
    border-radius: var(--wa-border-radius-medium);
    box-shadow: var(--wa-shadow-medium);
  }

  .form-row {
    display: flex;
    flex-direction: column;
    gap: var(--wa-spacing-2x-small);
  }

  .form-row-horizontal {
    display: flex;
    gap: var(--wa-spacing-small);
    align-items: center;
  }

  .form-row-horizontal > * {
    flex: 1;
  }

  .form-label {
    font-size: var(--wa-font-size-small);
    color: var(--wa-color-neutral-700);
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--wa-spacing-small);
    margin-top: var(--wa-spacing-small);
  }

  wa-select,
  wa-input,
  wa-button {
    width: 100%;
  }

  .operator-toggle {
    margin-bottom: var(--wa-spacing-small);
  }
`
