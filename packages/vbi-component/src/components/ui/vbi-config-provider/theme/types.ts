export interface ThemeTokens {
  // Base Colors
  colorBase100?: string
  colorBase200?: string
  colorBase300?: string
  colorBaseContent?: string

  // Brand Colors
  colorPrimary?: string
  colorPrimaryContent?: string
  colorSecondary?: string
  colorSecondaryContent?: string
  colorAccent?: string
  colorAccentContent?: string

  // Neutral Colors
  colorNeutral?: string
  colorNeutralContent?: string

  // Status Colors
  colorInfo?: string
  colorInfoContent?: string
  colorSuccess?: string
  colorSuccessContent?: string
  colorWarning?: string
  colorWarningContent?: string
  colorError?: string
  colorErrorContent?: string

  // Dimensions & Shapes
  radiusSelector?: string
  radiusField?: string
  radiusBox?: string
  sizeSelector?: string
  sizeField?: string
  sizeBase?: string
  border?: string
  depth?: number | string
  noise?: number | string
}

export interface ThemeConfig {
  tokens?: ThemeTokens
}
