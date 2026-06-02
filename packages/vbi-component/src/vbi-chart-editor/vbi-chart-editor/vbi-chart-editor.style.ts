import { css, type CSSResultGroup } from 'lit'
import { defaultStyles } from 'src/shared/styles'

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      --vbi-border: #e6e8ec;
      --vbi-text: #2f3137;
      --vbi-muted: #9aa0ab;
      --vbi-blue: #2f7bff;
      display: block;
      box-sizing: border-box;
      color: var(--vbi-text);
      height: 100%;
      min-height: 640px;
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    .layout {
      background: #fff;
      border: 1px solid var(--vbi-border);
      border-radius: 12px;
      display: grid;
      gap: 8px;
      grid-template-areas:
        'toolbar toolbar'
        'sidebar main';
      grid-template-columns: 236px 1fr;
      grid-template-rows: auto 1fr;
      height: 100%;
      padding: 10px;
    }

    .sidebar {
      border: 1px solid var(--vbi-border);
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      grid-area: sidebar;
      min-height: 0;
      overflow: hidden;
    }

    .panel-title {
      border-bottom: 1px solid var(--vbi-border);
      font-size: 22px;
      line-height: 1;
      padding: 10px 12px;
    }

    .search-row {
      align-items: center;
      display: flex;
      gap: 8px;
      padding: 8px 10px;
    }

    .search-input {
      border: 1px solid #cfd5de;
      border-radius: 7px;
      color: #7f8694;
      flex: 1;
      font-size: 14px;
      padding: 6px 8px;
    }

    .search-icon {
      color: #b1b6bf;
      font-size: 12px;
    }

    .fields {
      min-height: 0;
      overflow: auto;
      padding: 0 10px 10px;
    }

    .group-label {
      color: var(--vbi-muted);
      font-size: 13px;
      margin: 2px 0 6px;
    }

    .field-item {
      font-size: 14px;
      line-height: 30px;
      white-space: nowrap;
    }

    .field-item span:first-child {
      color: #3d86ff;
      display: inline-block;
      font-weight: 600;
      margin-right: 8px;
      width: 14px;
    }

    .field-item.measure span:first-child {
      color: #5fb04f;
    }

    .split {
      border-top: 1px solid var(--vbi-border);
      margin: 10px 0;
    }

    .main {
      display: grid;
      gap: 8px;
      grid-area: main;
      grid-template-rows: 140px 1fr;
      min-height: 0;
    }

    .shelves,
    .canvas {
      border: 1px solid var(--vbi-border);
      border-radius: 10px;
      overflow: hidden;
    }

    .shelf-row {
      align-items: center;
      border-bottom: 1px solid var(--vbi-border);
      display: flex;
      gap: 10px;
      min-height: 34px;
      padding: 0 12px;
    }

    .shelf-row:last-child {
      border-bottom: 0;
    }

    .shelf-name {
      color: #5f6570;
      min-width: 80px;
    }

    .shelf-hint {
      color: #c0c4cc;
      font-size: 13px;
    }

    .badge {
      border: 1px solid #f4bb68;
      border-radius: 10px;
      color: #c47811;
      font-size: 11px;
      line-height: 18px;
      padding: 0 6px;
    }

    .badge.blue {
      border-color: #6dd3e3;
      color: #1f9bb2;
    }

    .canvas {
      align-items: center;
      color: #8c919c;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .canvas__title {
      color: #1f2430;
      font-size: 26px;
      margin-bottom: 8px;
    }

    @media (max-width: 900px) {
      .layout {
        grid-template-areas:
          'toolbar'
          'sidebar'
          'main';
        grid-template-columns: 1fr;
        grid-template-rows: auto 320px 1fr;
      }
    }
  `,
]

export default styles
