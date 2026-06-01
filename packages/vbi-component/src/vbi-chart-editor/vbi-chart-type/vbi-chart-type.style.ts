import { css, type CSSResultGroup } from 'lit'
import { defaultStyles } from 'src/shared/styles'

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      display: inline-block;
      font-family: var(--vbi-chart-type-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
      max-width: 100%;
    }

    .chart-type {
      display: block;
      max-width: 100%;
      position: relative;
    }

    .trigger,
    .card {
      appearance: none;
      box-sizing: border-box;
      font: inherit;
      outline: none;
    }

    .trigger {
      align-items: center;
      background: var(--vbi-chart-type-bg, #ffffff);
      border: 1px solid var(--vbi-chart-type-border, #d9d9d9);
      border-radius: var(--vbi-chart-type-radius-lg, 8px);
      color: var(--vbi-chart-type-text, rgba(0, 0, 0, 0.88));
      cursor: pointer;
      display: flex;
      gap: 12px;
      justify-content: space-between;
      max-width: 100%;
      min-height: 64px;
      padding: 12px 14px;
      transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;
      width: 100%;
    }

    .trigger:hover,
    .trigger:focus-visible {
      border-color: var(--vbi-chart-type-primary, #1677ff);
    }

    .trigger:focus-visible {
      box-shadow: 0 0 0 2px color-mix(in srgb, var(--vbi-chart-type-primary, #1677ff) 16%, transparent);
    }

    .trigger--compact {
      gap: 6px;
      height: 28px;
      min-height: 28px;
      padding: 0 8px;
      width: 128px;
    }

    .trigger--without-text {
      justify-content: center;
      padding: 0 7px;
      width: 32px;
    }

    .trigger > .chart-icon {
      background: var(--vbi-chart-type-primary-bg, #e6f4ff);
      border-radius: var(--vbi-chart-type-radius, 6px);
      color: var(--vbi-chart-type-primary, #1677ff);
      flex: 0 0 auto;
      height: 38px;
      width: 38px;
    }

    .trigger--compact > .chart-icon {
      height: 18px;
      width: 18px;
    }

    .trigger__content {
      align-items: flex-start;
      display: flex;
      flex: 1 1 auto;
      flex-direction: column;
      min-width: 0;
      text-align: left;
    }

    .trigger__label {
      color: var(--vbi-chart-type-text, rgba(0, 0, 0, 0.88));
      font-size: 13px;
      font-weight: 600;
      line-height: 1.2;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .trigger--compact .trigger__label {
      font-size: 12px;
    }

    .trigger__description {
      color: var(--vbi-chart-type-text-secondary, rgba(0, 0, 0, 0.45));
      font-size: 12px;
      line-height: 1.4;
      white-space: normal;
    }

    .chart-icon {
      align-items: center;
      display: inline-flex;
      justify-content: center;
    }

    .chart-icon svg {
      display: block;
      fill: none;
      height: 1em;
      stroke: currentColor;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 1.8;
      width: 1em;
    }

    .chart-icon path,
    .chart-icon circle {
      vector-effect: non-scaling-stroke;
    }

    .panel {
      background: var(--vbi-chart-type-bg, #ffffff);
      border-radius: var(--vbi-chart-type-radius-lg, 8px);
      box-shadow: var(
        --vbi-chart-type-shadow,
        0 6px 16px rgba(0, 0, 0, 0.08),
        0 3px 6px -4px rgba(0, 0, 0, 0.12),
        0 9px 28px 8px rgba(0, 0, 0, 0.05)
      );
      box-sizing: border-box;
      left: 0;
      margin-top: 6px;
      max-height: min(58vh, 420px);
      max-width: calc(100vw - 24px);
      overflow-y: auto;
      padding: 14px;
      position: absolute;
      top: 100%;
      width: min(540px, calc(100vw - 24px));
      z-index: 1000;
    }

    .panel__title {
      color: var(--vbi-chart-type-text, rgba(0, 0, 0, 0.88));
      font-size: 13px;
      font-weight: 600;
      line-height: 1.4;
      margin-bottom: 10px;
    }

    .panel__groups {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .group__heading {
      color: var(--vbi-chart-type-text, rgba(0, 0, 0, 0.88));
      font-size: 11px;
      font-weight: 600;
      line-height: 1.4;
      margin-bottom: 6px;
    }

    .group__grid {
      display: grid;
      gap: 6px;
      grid-auto-rows: 64px;
      grid-template-columns: repeat(auto-fill, 96px);
      justify-content: start;
    }

    .card {
      align-items: center;
      background: var(--vbi-chart-type-bg, #ffffff);
      border: 1px solid var(--vbi-chart-type-border-secondary, #f0f0f0);
      border-radius: var(--vbi-chart-type-radius, 6px);
      box-shadow: none;
      color: var(--vbi-chart-type-text, rgba(0, 0, 0, 0.88));
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 6px;
      height: 64px;
      justify-content: center;
      padding: 8px 6px;
      text-align: center;
      transition:
        border-color 0.2s ease,
        background-color 0.2s ease,
        color 0.2s ease;
      width: 96px;
    }

    .card:hover,
    .card:focus-visible {
      border-color: var(--vbi-chart-type-primary-border, #91caff);
      color: var(--vbi-chart-type-primary, #1677ff);
    }

    .card:focus-visible {
      box-shadow: 0 0 0 2px color-mix(in srgb, var(--vbi-chart-type-primary, #1677ff) 16%, transparent);
    }

    .card[data-selected] {
      background: var(--vbi-chart-type-primary-bg, #e6f4ff);
      border-color: var(--vbi-chart-type-primary-border, #91caff);
      color: var(--vbi-chart-type-primary, #1677ff);
    }

    .card > .chart-icon {
      flex-shrink: 0;
      font-size: 13px;
      height: 20px;
      width: 20px;
    }

    .card__label {
      font-size: 11px;
      font-weight: 600;
      line-height: 1.2;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
    }

    .panel__empty {
      color: var(--vbi-chart-type-text-secondary, rgba(0, 0, 0, 0.45));
      font-size: 12px;
      line-height: 1.4;
      padding: 6px 0;
    }

    @supports not (color: color-mix(in srgb, #000 50%, transparent)) {
      .trigger:focus-visible,
      .card:focus-visible {
        box-shadow: 0 0 0 2px rgba(22, 119, 255, 0.16);
      }
    }
  `,
]

export default styles
